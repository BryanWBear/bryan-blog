---
path: "/svd"
date: 2020-09-19T17:12:33.962Z
title: "Why SVD is Cool"
---

There are many reasons, as evidenced by the long applications section in this Wikipedia article: https://en.wikipedia.org/wiki/Singular_value_decomposition.

However, the application that is most intuitive for me is SVD for compression of neural networks. Neural networks can get quite fat, and sometimes you want to run them on mobile, or edge devices that have much less compute and storage than a server.

There are many ways to compress neural networks. One of the most popular ways, implemented in both Pytorch (beta currently) and Tensorflow, is quantization. This involves converting all of the floats to int8. Given a layer, we find the minimum and maximum values, then assign the weights some value between $0$ and $2^8$. These integers represent a discrete (or quantized) range between the minimum and maximum value. In practice there might be more complications, but this is the basic idea. By doing this, you shrink the network and also speed up the network if you're clever about implementing your multiplication. The downside is that you lose some accuracy, but it seems to be negligible.

There is another compression idea that is also powerful, but a bit more mathematically involved: Singular Value Decomposition. Given a matrix $M$, which we can view as a 2d convolution layer or dense layer, SVD yields a matrix factorization $M = UDV^T$, where $U, V$ have orthogonal columns and $D$ is diagonal. This is how SVD is usually presented, and it's really not clear why this decomposition is useful. However, there are two upshots:

1. We can view the decomposition as $M = \sum^k_i \sigma_i U_i \otimes V_i$, where $\sigma_i = D_{ii}$ and $U_i, V_i$ are columns of $U, V$ respectively. To put it into words, SVD gives us a rank-1 decomposition of $M$. This is great for saving space because you only have to remember $k(n + m)$ numbers instead of $mn$ numbers, where $n, m$ are the ranks of $U, V$. Let's say $k = 2$, $n = m = 50$, then we're storing $200$ numbers instead of $2500$. 
2. For any $l \leq k$, the sum $\sum^l_i \sigma_i U_i \otimes V_i$ is the optimal rank-1 approximation of $M$ (using $l$ rank-1 matrices) with respect to the Frobenius norm (sum of squared distance between matrices if you pretend they're vectors). This means that our decomposition doesn't have a lot of approximation error if we choose $l$ reasonably.

The idea here is pretty general: make an algorithm that can write a big matrix as a sum of simple matrices, and doesn't lose a lot of information. Many people have generalized this idea. The ones I've heard of are Tensor Train decomposition, and somewhat equivalently from the physics side, MPS (Matrix Product State). The idea is to approximate a $d$-dimensional tensor (containing $n^d$ elements) using a chain of matrices. If you draw it out, it looks something like a worm, or I guess a train. This train contains only $dnr^2$ elements, where $r$ is a parameter similar to $l$ in the previous example.  This generates good savings in space if $d$ is any remotely big number, like 4. 

Of course, the hard part is actually doing the decomposition, which I know nothing about, so I'm sorry if I butchered anything. But I'm sure we'll be seeing a lot of development in this area as the demand for running ML on edge devices grows.