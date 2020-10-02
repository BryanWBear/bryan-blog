---
path: "/tf-setup"
date: 2020-10-01T17:12:33.962Z
title: "Tensorflow 2.3.0 Docker Setup and Development on Ubuntu 18.04"
---

Since it took me a long time to figure out how to set up Tensorflow, I would like to post my specs and development flow.

Originally, I wanted to install Tensorflow using Conda, which is what I am used to with Pytorch. Turns out that Tensorflow is extremely fickle about your version of CUDA and cuDNN. I wanted to use Tensorflow 2.3.0 but I ran into a lot of issues installing the necessary CUDA 10.1.

Because of this, I ended up using the Tensorflow docker image, which turned out to be the lesser of two evils. The image I ended up using was `tensorflow/tensorflow-2.3.0-gpu-jupyter`, although I haven't used the Jupyter part yet. 

At first, it didn't seem like the image was playing well with the  `nvidia/cuda-10.0-base` image required to run it, but it turns out I just needed to add these few lines of magic:

```python
from tensorflow.compat.v1 import ConfigProto
from tensorflow.compat.v1 import InteractiveSession

config = ConfigProto()
config.gpu_options.allow_growth = True
session = InteractiveSession(config=config)
```

I have no idea why this works, but more information in this thread:
https://github.com/tensorflow/tensorflow/issues/24496

After installing the image correctly, I wrapped it in the following Dockerfile:

```dockerfile
FROM tensorflow/tensorflow:2.3.0-gpu-jupyter
COPY requirements.txt .
RUN pip install -r requirements.txt

# for logging to console 
ENV PYTHONBUFFERED=TRUE

# for tensorboard debugging
EXPOSE 6006
```

This does several things. First, I don't have to reinstall dependencies every time I boot up the container. Second, I expose the 6006 port so that I can open up Tensorboard in my browser.

The run command I use is as follows:
`sudo docker run -p 6006:6006 --gpus all -v ~/:<PATH_TO_REPO> -it <IMAGE_TAG> bash`

This maps the 6006 port of the container to my computer's 6006 port, so we can see Tensorboard. It tells the image to find GPUs for training, and mounts a volume to whatever code repo you're developing in so that changes are synced automatically. And that's pretty much it. I keep the container open and whenever I make code changes, I can rerun my scripts quickly.

To run Tensorboard, I use the following command:
`tensorboard --logdir <PATH_TO_LOGDIR> --bind_all`

For some reason, `bind_all` is important or nothing works. 