---
path: "/conv"
date: 2020-08-12T17:12:33.962Z
title: "CNN is Translation Invariant"
---


Here's a short (and incomplete) 1-d argument. First we want to show that convolution is $G$-linear for $G = \mathbb{Z}/n\mathbb{Z}$. 

Fix a kernel $k \in R$ and some arbitrary $f \in R$ where $R$ is the space of functions on $G$. Then we want to show that $k * (gf) = g(k * f)$ where $g \in G$. 

We can take advantage of the fact that the Fourier Transform is an isomorphism $R \rightarrow R$. That is, the above thing is true if and only if $\widehat{k * (gf)} = \widehat{g(k * f)}$.

By the convolution theorem, we have that $\widehat{k * (gf)} = \widehat{k}\cdot \widehat{gf}$. Now let's look component-wise. We have that $\widehat{gh}(i) = \omega_n^{gi} \widehat{h}(i)$ for arbitrary $h \in R$. This is just the eigenvalue of $e_i$, the $i$-th element of the Fourier basis. 

Using this fact, we have that $$\widehat{k * (gf)} (i) = \widehat{k}\cdot \widehat{gf} (i) = \omega_n^{gi}\widehat{k} \cdot\widehat{f} (i)$$.

On the other side, we have that $$\widehat{g(k * f)} (i)=  \omega_n^{gi} \widehat{(k * f)} (i) = \omega_n^{gi}\widehat{k} \cdot\widehat{f} (i)$$.

Thus both sides are equal. Now note that RELU commutes with $g$ as well, or any component-wise function in general. Practically, this means that stacking convolutions and non-linearities onto a **shifted** input is the same as applying all those functions onto the original input, then shifting.

If we then apply something like a max-pool, which takes an element regardless of its position, then we achieve true translation invariance. 

This is a desirable quality because a classifier should output the same result for an image with a dog, and the same image with the dog in a different location.
