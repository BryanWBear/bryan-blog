---
path: "/post-1"
date: 2020-07-08T17:12:33.962Z
title: "The Fourier Transform: Theory to Practice"
---

# Theoretical Level

## Continuous Fourier Transform

Broadly speaking, the Fourier transform is a change of basis, from a basis of delta functions to a basis of sinusoids. It happens to be an extremely important change of basis, for many reasons, most of which I do not understand. The Fourier transform is definable on any compact group, so we will first start with the most common ones, and move to the general case.

### Case 1 - $L^2(S_1) \rightarrow L^2(\mathbb{Z})$

The Fourier transform $F$ in this case is given by $$F(f)(n) = \int_{-\infty}^{\infty} f(x)e^{2i\pi n} dx$$

where $f \in L^2(S_1)$ is an integrable periodic function and $n \in \mathbb{Z}$. There are several things to know / note here.

1. The set $\mathcal{B} = \{ e^{2\pi i n} \mid n \in \mathbb{Z}\}$ (scaling factors omitted) forms an orthonormal basis of $L^2(S_1)$. This basis is dense, meaning that we can approximate $f$ to arbitrary precision by using bigger and bigger sums.
2. The actual approximation $A$ is given by $A = \sum_{n = - \infty} F(f)(n) e^{2i\pi n}$.
3. The underlying field here is $\mathbb{C}$, however in practice we mostly care about Fourier transforms of real functions.  Since $A$ is an approximation, it will pretty much be real even if it looks complex. We can convert back and forth by using Euler's formula $e^{ix} = cos(x) + isin(x)$, and the inverted identities for $sin$ and $cos$. 


### Case 2 - $\mathbb{C}^n \rightarrow \mathbb{C}^n$

From now on, we will focus on the discrete case because it's what computers do. This section is a handwavey mnemonic. Formally, I think the way to view it is that we view each sample as $k\delta$, where $k$ is the sample value and $\delta$ is a Dirac impulse. Thus taking $N$ samples evenly spaced over $[0, 1]$ is the same as $f = \sum k_i\delta_i$, and the inner product $\int_0^1 f(x)e^{-\omega x} dx$ reduces to $\sum_i^N f(i)e^{-\omega i/N}$. 

However, this reduction suggests several things. First, if math is consistent then sampling should induce a map $\mathcal{B} \rightarrow \mathcal{B}_F$, from the continuous basis to the finite basis. To be more explicit, the map should be $$e^{2\pi ikx} \rightarrow [e^{2\pi ik \frac{1}{N}}, e^{2\pi ik \frac{2}{N}}, \dots, e^{2\pi ik \frac{N}{N}}]^T$$ Now we should check if $B_F$ is actually a basis.

Right off the bat, we know that we only need $N$ of these vectors, as we're in $\mathbb{C}^N$ now. Note that we only need $k \leq N$, since $[e^{2\pi i(N + k) \frac{1}{N}}, e^{2\pi i(N + k) \frac{2}{N}}, \dots, e^{2\pi i(N + k)  \frac{N}{N}}]^T = [e^{2\pi ik \frac{1}{N}}, e^{2\pi ik \frac{2}{N}}, \dots, e^{2\pi ik \frac{N}{N}}]^T$. Now you would expect that these vectors should be orthogonal to each other with respect to this new inner product. This implies that the new inner product should be $\frac{1}{N} \sum f \bar{g}$, so that $\langle v, v \rangle = 1$. Also we note that if $i \neq j$, then $\langle v_i, v_j \rangle$ is the component-wise sum of $v_k$ for some $k$. This means that $\sum e^{2\pi i k \frac{j}{N}} = 0$. This is in fact true, and is easier to see if we write it as $\sum \omega_N^i$, where $\omega_N$ is an $N$-th root of unity. Since $x^N - 1 = (x-1)(\sum x^i) = 0$, and $\omega_N \neq 1$ satisfies this polynomial, we have that $\sum \omega_i = 0$.

### Representation Theory Viewpoint

This section will be quite condensed, and is skippable. It's mostly a mental reminder for myself, and may be useful to those who know some representation theory. 

From a representation theory standpoint, the discrete Fourier transform is the decomposition of $R_G$, the regular representation of $G$, into irreducible representations.

The regular representation *is* the space of functions on a finite group $G$ with action given by $g\alpha(h) = \alpha(g^{-1}h)$. This isn't a deep fact, and follows from the fact that $G$ is finite and therefore $R \cong \mathbb{C}^{|G|}$. The irreps are the Fourier basis vectors so we haven't done anything here except rephrase stuff. However, the interesting bit is that this setup allows us to generalize Fourier theory to arbitrary finite groups. But before we do that, we will explicitly calculate the case $G = \mathbb{Z}/n\mathbb{Z}$, which is equivalent to the classic DFT.

### Example:   $G = \mathbb{Z}/n\mathbb{Z}$

This exercise is so "trivial" that I haven't seen it in any textbook, but I think it's still quite useful. Let's just fix $n = 4$ to make things easy to write, but our logic extends to the general case.

First, write down the regular representation. It suffices to know $\rho(1)$ since $1$ generates. We have that $$\rho(1) = \begin{bmatrix}  
0 & 0 & 0 & 1\\  
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
0 & 0 & 1 & 0\\ 
\end{bmatrix}$$

Although I like writing down matrices, there is no need to if we realize that $\rho(1)$ is a circular right-shift of a vector. Now note that $\rho(1)$ satisifies the polynomial $x^4  - 1  = 0$, so any eigenvalue should as well. Thus the candidates for eigenvalues are roots of unity $\omega^j$. In this case, $\omega = i$ but we will keep using $\omega$ since it is more evocative of the general case. Now we want to find (eigen)vectors such that right shifting is equivalent to multiplying by $\omega^j$. This is equivalent to solving the system of equations $\omega^j [a, b, c, d] = [d, a, b, c]$. We find that up to scaling, these eigenvector-eigenvalue pairs are valid.

eigenvalue | eigenvector |
-------- | ----- |
$\omega$ | $[\omega^3, \omega^2, \omega, 1]$ |
$\omega^2$ | $[\omega^6, \omega^4, \omega^2, 1]$ |
$\omega^3$ | $[\omega^9, \omega^6, \omega^3, 1]$ |
$\omega^4$ | $[\omega^{12}, \omega^8, \omega^4, 1]$ |

Thus all our candidates turned out to be actual eigenvalues. Furthermore, since $\rho(1)$ generates, all elements share the same eigenvectors. If $\lambda$ is an eigenvalue of $\rho(1)$, then $\lambda^n$ is an eigenvalue of $\rho(n)$. Since we found an eigenbasis that works for every group element, we can simultaneously diagonalize every group element. This immediately tells us that each irrep is 1-dimensional. Let's write down the eigenvalues of each group element to expose the ridiculous amount of symmetry in this example. 

eigenvector/g  | 1|  2 | 3| 4 
-------- | ----- | ------| ----- | ----- 
$[\omega^3, \omega^2, \omega, 1]$ | $\omega$ | $\omega^2$ | $\omega^3$ | $\omega^4$
$[\omega^6, \omega^4, \omega^2, 1]$ | $\omega^2$ | $\omega^4$ | $\omega^6$ | $\omega^8$
$[\omega^9, \omega^6, \omega^3, 1]$ |$\omega^3$ | $\omega^6$ | $\omega^9$ | $\omega^{12}$
$[\omega^{12}, \omega^8, \omega^4, 1]$ |$\omega^4$ | $\omega^8$ | $\omega^{12}$ | $\omega^{16}$

Each irrep is precisely a horizontal row in the above chart, since each entry is a 1-dimensional matrix corresponding to the action of a group element on the respective eigenvector. Note that these irreps are exactly the Fourier basis vectors that we derived in a hand-wavey fashion in the last section. Furthermore, since this example is so degenerate, a lot of things are the same. Most notably, the horizontal rows are also the **characters** of the irreps, since the trace of a 1-d matrix is the matrix itself. Similarly, the space of class functions on $G$ is exactly the space of all functions on $G$, since this group is abelian and therefore has no non-trivial conjugacy classes. We know that the space of class functions is endowed with the Hermitian inner product $$H(\alpha, \beta) = \frac{1}{G}\sum_g \overline{\alpha(g)}\beta(g)$$

This is precisely the inner product that we guessed in the last section. Furthermore, the characters are orthogonal with respect to this inner product. This immediately tells us that the Fourier basis vectors are orthogonal, and thus span the space of class functions / all functions. 

### General Fourier Transform

If the group $G$ is non-abelian, then things get more complicated. Since our irreps can have dimension greater than 1, the characters do not form a basis for $R$. Instead, we will outline a more general recipe for forming a basis. 

First, suppose that $H_0$ is a Hermitian inner product on $G$ (the easiest one is $Id$). Then $H = \frac{1}{|G|} \sum_g H_0(gv, gw)$  is $G$-invariant. In other words, $H(gv, gw) = H(v, w)$. Pay attention to this averaging trick, as it's a cheap way of turning a matrix into a $G$-invariant one ($G$-linear if we treat the matrix as a linear map).

We can use this inner product to turn all of our matrices into unitary ones. The algorithm is as follows. First form an orthogonal basis with respect to the new inner product. Then the matrices in terms of this new basis will be unitary because $(ge_i, ge_j) = (e_i, e_j) = \delta_{ij}$ as desired.

A neat result is the following:

**If the irreps of $G$ are represented by unitary matrices, then their matrix entries form a basis of $R$**

This is left as an exercise in Fulton and Harris, with little explanation. However, the exercise makes sense if we define "matrix entries" as maps $M_{ij}: \rho(G) \rightarrow \mathbb{C}$, where $M_{ij}(g) = g_{ij}$. This is just saying to take the $ij$-th entry of each matrix of an irrep. 

As a sanity check, we note that there are $|V|^2$ matrix entries per irrep $V$, each of dimension $|G|$. We also know that $\sum_V |V|^2 = |G|$, so all the dimensions check out.

Now we must show that these matrix entries are orthogonal. In other words, we want to show that $v_i \cdot v_j = \delta_{ij}$ for any two matrix entries $v_i, v_j$. If $M$ is a matrix, then $M_{ij}(M) = e_i^TMe_j$, where $\{e_i\}$ is the canonical basis. Thus the quantity we are interested in calculating is $$Q = \frac{1}{|G|}\sum_g (e_i^T\rho_1(g)e_j)(e_k^T\rho_2(g)^{-1}e_l)$$ for arbitrary $i,j,k,l$. By linearity, this quantity is equivalent to $$e_i^T(\frac{1}{|G|} \sum \rho_1(g) e_j e_k^T\rho_2(g)^{-1})e_l$$ By writing it like this, we see that the quantity that we're interested in is the $il$-th entry of the matrix in the parentheses, let's call it $P = \frac{1}{|G|} \sum \rho_1(g) e_j e_k^T\rho_2(g)^{-1}$. This matrix looks suspiciously like the averaging trick from above, because it is. Since $P$ is the averaged version of $e_j e_k^T$, it is a $G$-linear map. 

The analysis breaks down into cases from here. First, suppose that $\rho_1 \neq \rho_2$. Then $Q = e_i^T\textbf{0}e_j = 0$ by Schur's lemma, as desired.

Now suppose that $\rho_1 = \rho_2$. Then by Schur's lemma, we have $P = \lambda Id$ for some $\lambda$. Now let's figure out what $\lambda$ is. We have that $$dim(V) \cdot \lambda = Tr(P) = \frac{1}{|G|} \sum Tr(e_je_k^T)$$ Therefore $\lambda = 0$ if $j \neq k$ and $\lambda = \frac{1}{dim(\rho_1)}$ otherwise. Also note that if $i \neq l$, then $e_i^T(\lambda Id)e_l = 0$, as we're selecting an off-diagonal element.

To sum it up, if $\rho_1 = \rho_2, i = l, j =k$, then $$Q = \frac{1}{|G|} \sum e_i^T\rho(g) e_j e_j^T\rho(g)^{-1}e_i = \frac{1}{G} \sum g_{ij}g_{ij}^*$$ by unitarity. In this scenario, we have that $Q = \frac{1}{dim(\rho_1)}$. In any other case (taking the inner product of two different matrix entries), we have that $Q = 0$ as desired.

The Fourier transform is defined as $$\hat{\varphi}(\rho) = \sum_g \rho(g)\varphi(g)$$

Note that $\hat{\varphi}(\rho)_{ij} = \frac{1}{dim(\rho)} \langle \varphi, \rho(g)_{ij} \rangle$, which is the amount of matrix entry $ij$ present in $\varphi$, assuming that $\rho$ is in unitary form. Thus the Fourier transform encodes $\varphi$ in terms of the basis that we just derived.

Indeed, if we assumed a unitary format for all irreducible $\rho$, we would have that $$\varphi(g) = \sum_{\rho, i, j}   \frac{1}{dim(\rho)} \langle \varphi, \rho(g)^*_{ij} \rangle \rho(g)^*_{ij}$$

This is just writing the function in terms of the orthonormal basis we found. Let's dig deeper into this expression.

We then have that $$\varphi(g) = \sum_{\rho, i, j}   dim(\rho) \hat{\varphi}(\rho) \rho(g)^*_{ij} = \sum_{\rho, j}   dim(\rho) \hat{\varphi}(\rho)_j \cdot \rho(g)^*_{j} = \sum_{\rho, j}   dim(\rho) \hat{\varphi}(\rho)_j \cdot \rho(g^{-1})^T_{j}$$

Now note that $$\sum_j \hat{\varphi}(\rho)_j \cdot \rho(g^{-1})^T_{j} = tr(\rho(g^{-1}) \hat\varphi(\rho))$$

Putting it all together, we get the (unscaled) Fourier inversion formula: $$\varphi(g) = \sum_{\rho} dim(\rho) tr(\rho(g^{-1}) \hat\varphi(\rho))$$ This isn't the derivation that you would usually find, as it's much simpler to derive the inversion formula from the decomposition of the regular representation into irreducibles, which yields the two equations $|G| = \sum_{\rho} dim(\rho)$ and $0 = \sum_{\rho} dim(\rho)\chi_{\rho}(g)$.

However, I think that this derivation is more motivational than the easy one. This form of the Fourier inversion formula is more useful than the straightforward thing we started out with because it is basis-invariant.

# Algorithmic Level

We've established that the discrete Fourier transform is a linear map $M: \mathbb{C}^N \rightarrow \mathbb{C}^N$ given by the above matrix. The problem with computing this map, or any matrix multiply, is that it's $O(N^2)$ time.

We can reduce this time to $O(Nlog(N))$ using two tricks in conjuction.

**Trick 1 - Split the DFT into even and odd parts**

We have that $$\hat{f}_N(k) = \sum_{j = 0}^N f(j)\omega_N^{jk} = \sum_{j = 0}^{\frac{N}{2}} f(2j)\omega_N^{(2j)k} + \sum_{j = 0}^{\frac{N}{2}} f(2j + 1)\omega_N^{k(2j + 1)}$$

Now note that $$\omega_N^{(2j)k} = e^{\frac{2\pi i (2j) k}{N}} = e^{\frac{2\pi ijk}{\frac{N}{2}}} = \omega_{\frac{N}{2}}^{jk}$$

Substituting above, this means that $$\hat{f}_N(k) = \sum_{j = 0}^{\frac{N}{2}} f(2j)\omega_{\frac{N}{2}}^{jk}+ \omega_N^k\sum_{j = 0}^{\frac{N}{2}} f(2j + 1)\omega_{\frac{N}{2}}^{jk}$$

Essentially what trick 1 boils down to is splitting a DFT into two half sized DFT's. If we denote the function $[f(0), f(2), f(4), \dots, f(N-2)]$ as $f_{even}$ and $[f(1), f(3), f(5), \dots, f(N-1)]$ as $f_{odd}$, then the expression above builds down to: 
$$\hat{f}_N(k) = \hat{f_{even}}_{\frac{N}{2}}(k) +  \omega_N^k\hat{f_{odd}}_{\frac{N}{2}}(k)$$

**Trick 2 - Half Symmetry of DFT**

We have that $$\hat{f}_{N}(k + \frac{N}{2}) = \sum_{j = 0}^{\frac{N}{2}} f(2j)\omega_{\frac{N}{2}}^{jk}\omega_{\frac{N}{2}}^{j\frac{N}{2}} + \omega_N^{k}\omega_N^{\frac{N}{2}}\sum_{j = 0}^{\frac{N}{2}} f(2j + 1)\omega_{\frac{N}{2}}^{j\frac{N}{2}}$$ for $k < N/2$. But this is just 
$$\hat{f}_{N}(k + \frac{N}{2}) = \sum_{j = 0}^{\frac{N}{2}} f(2j)\omega_{\frac{N}{2}}^{jk} - \omega_N^k\sum_{j = 0}^{\frac{N}{2}} f(2j + 1)\omega_{\frac{N}{2}}^{jk}$$

Thus we have that:

$$\hat{f}_N(k + \frac{N}{2}) = \hat{f_{even}}_{\frac{N}{2}}(k) -  \omega_N^k\hat{f_{odd}}_{\frac{N}{2}}(k)$$

Note the similarity to the final quantity from trick 1. That sums up all that we need to exploit the symmetry of the problem. Supposing that we know $\hat{f_{even}}$ and $\hat{f_{odd}}$ for values up until $\frac{N}{2}$,  then we can calculate $\hat{f}$ in $2N$ computations ($N$ plus minus computations, and $N$ multiplications by root of unity). I guess technically the complex multiplication and addition takes more computations than that, but it only changes the scaling by a constant factor so I will ignore this.

But since $\hat{f_{even}}$ and $\hat{f_{odd}}$ are size $\frac{N}{2}$ FFT problems, we can use the same tricks to break each of those up into $\frac{N}{4}$ sized FFT problems and so on until no more reduction is possible. Let's examine the $\frac{N}{4}$ case to get a better idea of the runtime complexity. To get $\hat{f_{even}}$, we need $2\frac{N}{2}$ computations, and same for $\hat{f_{odd}}$. Thus to get both requires $2N$ computations. In general, at each level $l$ we have to compute $2^l$ pieces which each take roughly $\frac{N}{2^l}$ time to compute. So at each level, we spend roughly $N$ time, and since we're forming a binary tree of computations, there are $log_2(N)$ levels. Thus the runtime is $O(Nlog(N))$ as desired.  


# Implementation Level

Here are a few tips on stuff that took me a long time to figure out while implementing. 

1. The best way to do this in Swift is the Accelerate library. Since this is a wrapper around a lower level Objective C library, you have to pass an input pointer and an output (buffer) pointer which will be filled by the function call. All of the useful signal processing functions begin with `vDSP`. A typical example is multiplying two vectors: ```vDSP_vmul(input1, 1, input2, 1, output, 1, UInt(lengthOfInput1))```. Note the 1's, they refer to a stride parameter for each of the pointers. Usually this can just be 1.
3. If you use some variant of `vDSP_fft_zrip` to perform FFT on $N$ samples, know that you will only get $N / 2 + 1$ output samples. Because of the symmetry of the FFT, the frequencies after the Nyquist frequency are omitted. Furthermore, the Nyquist frequency is **packed into the imaginary portion of the first element** as they are both real (and the same). Maybe this is a standard for DSP but as an outsider, it was unexpected.
4. There will be a scaling factor involved. For example, `vDSP_fft_zrip` calculates 1/2 of a regular FFT for speed reasons. You will not find any of this information on the latest Apple docs. Please consult this very hidden archived doc for more information: [https://developer.apple.com/library/archive/documentation/Performance/Conceptual/vDSP_Programming_Guide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40005147](https://developer.apple.com/library/archive/documentation/Performance/Conceptual/vDSP_Programming_Guide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40005147) Seriously, it took me forever to find this.
5. In practice, you should window your samples before performing an FFT to reduce "spectral leakage." Basically if a frequency in your sample happens to be in between basis vectors, it'll spread out weird among basis vectors. Windowing reduces this effect. The window people seem to use for speech stuff is `vDSP_hann_window`.

Surprisingly, finding working code snippets was pretty hard for me, so I'll link two resources that helped me the most.

1. https://github.com/gardner-lab/syllable-detector-swift/blob/master/Common/CircularShortTimeFourierTransform.swift Not only is this a working example of complex FFT, it's also the only example I could find of using a circular buffer to process real time audio samples. They also window their samples. Very cool and useful.
2. https://edwardsamson.com/using-a-swift-accelerate-implementation-of-the-fast-fourier-transform-to-calculate-linear-autocorrelation/ I lost the second link I originally wanted post but I wish I had found this one when I was starting out. It covers all the things that are confusing for a newcomer.

Credit links:
[https://jakevdp.github.  io/blog/2013/08/28/understanding-the-fft/](https://jakevdp.github.io/blog/2013/08/28/understanding-the-fft/)

 
