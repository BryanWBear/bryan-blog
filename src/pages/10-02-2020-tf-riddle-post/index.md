---
path: "/tf-riddle"
date: 2020-10-02T17:12:33.962Z
title: "Tensorflow 'Riddle'"
---

Here's a little TensorFlow riddle. After training the following ResNet, you'll observe that its training and validation accuracy are pretty much on par with a random classifier. Why does this model perform so poorly? 
```python
def  res_block(x, num_channels, s=2):
	x_skip = x
	k_size = 9

	x = Conv1D(num_channels, kernel_size=k_size, strides=s, padding='same', use_bias=False)(x) 
	x = BatchNormalization()(x)
	x = Activation(activations.relu)(x)

	x = Conv1D(num_channels, kernel_size=k_size, strides=1, padding='same',use_bias=False)(x)
	x = BatchNormalization()(x)
	x = Activation(activations.relu)(x) 

	x_skip = Conv1D(num_channels, kernel_size=1, strides=s, padding='same', use_bias=False)(x_skip)
	x_skip = BatchNormalization()(x_skip)
	x_skip = Activation(activations.relu)(x_skip)

	x = Add()([x, x_skip])
	x = Activation(activations.relu)(x)
	return x
  
def  small_resnet(n_labels):
	inp = Input(shape=(98, 64), batch_size=1)

	x = Conv1D(16, kernel_size=9, padding='same', use_bias=False)(waveform)
	x = res_block(x, 24)
	x = res_block(x, 32)
	x = AveragePooling1D(13)(x)
	x = Flatten()(x)
	x = Dense(n_labels)(x)

	model = Model(inputs=inp, outputs=x)
	return model
```

It took me way too long to figure out the answer. I thought I was going crazy. But it boils down to two things. 

1. You need to explicitly declare your last Dense layer to have a softmax activation in Tensorflow. There should be a way around this as the docs recommend against it, but I haven't found it. In Pytorch, this is not needed.
2. Once the first problem is fixed, then you'll notice high training accuracy, and terrible validation accuracy. So the problem is probably with some op that behaves differently during training and validation (assuming that your data is well-split). The only culprit which fits this description here is BatchNorm. Indeed, since BatchNorm tries to normalize your activations by the mean and variance of your batch, it's going to learn absolute garbage with a batch size of 1. Originally, the problem was more subtle than what I presented here because I was using a custom op that wouldn't work with a batch size greater than 1. Instead of fixing the op, I just set the batch size as 1 as a hack and forgot about it. 

I guess the lessons here are not to be sloppy, and also not to give up. It feels so demoralizing when your architecture looks right, but it's giving you complete garbage. Chances are though, that if it looks right then it's probably 95% right. There might just be a few mistakes that are keeping it from being fully correct. 
