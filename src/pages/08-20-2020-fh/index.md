---
path: "/fulton-harris"
date: 2020-08-20T17:12:33.962Z
title: "Fulton and Harris Exercises"
---

This is an (ongoing) collection of Fulton and Harris exercises that I have completed. Some of them are incomplete. Thanks, Bryan.

(1.11) 

We have that $Sym^2(V) \cong V \oplus U$, where $V$ is spanned by $\alpha^2, \beta^2$. Note that $\beta^2 \rightarrow \alpha, \alpha^2 \rightarrow \beta$. We have that $U$ is spanned by $\alpha \beta$.

We have that $Sym^3(V) \cong V \oplus U \oplus U'$. Here $V$ is spanned by $\alpha^2 \beta, \beta^2 \alpha$. We have that $U$ is spanned by $\alpha^3 + \beta^3$, and $U'$ is spanned by $\alpha^3 - \beta^3$.

(1.12)
First, we show that $R \cong V^2 \oplus U \oplus U'$. Fix a rotation $\tau = (123)$. Using the method mentioned in the book, we first find the eigenvectors of $\tau$. Note that $\tau$ permutes the elements of $S_3$ as follows: $$Id \rightarrow (123) \rightarrow (132)$$ $$ (12) \rightarrow (23) \rightarrow (32)$$
This tells us that $R \cong V' \oplus V'$ where $V'$ is a 3-dimensional vector space with the standard eigenvectors of $\mathbb{Z}/3\mathbb{Z}$ action, which we will label $1, \alpha, \beta$ in accordance with the book. Thus the eigenbasis of $R$ is $$\{ (\alpha, 0), (\beta, 0), (1, 0), (0,1), (0, \beta), (0, \alpha) \}$$ 
If we fix $\sigma = (12)$, then we see that $\sigma$ permutes the elements as follows:
$$Id \rightarrow (12)$$ $$(123) \rightarrow (13)$$ $$(132)\rightarrow (12)$$.
The corresponding action on the eigenbasis is $$(\alpha, 0) \rightarrow (0, \beta)$$ $$(\beta, 0) \rightarrow (0, \alpha)$$ $$(1, 0) \rightarrow (0, 1)$$
Thus we have two copies of $V$, one spanned by $\{ (\alpha, 0), (0, \beta) \}$ and one spanned by $\{ (\alpha, 0), (0, \beta) \}$. The subspace spanned by $(1,0), (0,1)$ breaks down into $U \oplus U'$ if we consider the vectors $(1,0) - (0,1)$ and $(1,0) + (0,1)$.

(2.2) Consider the eigenvalues of some $g \in V$, call them $\{\lambda_i\}$. Then the set $\{ \lambda_i \lambda_j \}$ is the eigenvalues of $g \in V \otimes V$. We can think of each $\lambda_i\lambda_j$ as being the  $ij$-entry of a $dim(V) \times dim(V)$ matrix.  The sum of all the matrix entries is $\chi_V^2(g)$, while the sum of the diagonal is $\chi_V(g^2)$. Now the quantity we're interested is $\chi_{Sym^2(V)}$, which is the sum of the upper triangular portion of the matrix (including the diagonal). Thus $\chi_V(g^2) +\chi_V^2(g)$ double counts the diagonal and also double counts the upper triangular portion without the diagonal (since sum of the lower portion is equal to the sum of the upper portion). This means that the final formula should be $$\frac{\chi_V(g^2) +\chi_V^2(g)}{2}$$ as desired.


(2.25) Using character theory, we get that the decomposition for vertices is $V \oplus U \oplus V' \oplus U' = V \oplus U \oplus (V \oplus U) \otimes U' = (V \oplus U) \otimes (U \oplus U')$. I don't know if this chain of operations did anything useful, but the key point I got from this was that the action on vertices is the same as the action on diagonals, except we're keeping track of flipping vertices. 

To be more explicit, if we number the vertices $v_1, v_2, \dots, v_8$ (and assume for simplicity that $v_i, v_{i+1}$ are opposing vertices), then $\{v_1 + v_2, v_3+v_4, \dots, v_7 + v_8 \}$ form a basis for the permutation representation of $S_4$, which decomposes as $U \oplus V$. This is because $v_i + v_{i+1}$ represents a diagonal, since the sum forgets about the two vertices swapping.

Then the basis for the other portion $(V \oplus U) \otimes U'$ is $\{v_1 - v_2, v_3 - v_4, \dots, v_7 - v_8 \}$. This is the portion that remembers flips. Note that $(12)$ and $(1234)$ both flip the cube, thus reversing opposing vertices. On the other hand, $(123)$ and $(12)(34)$ are both rotations along the $z$-axis, which do not change the $z$-axis orientation of vertices.

(TODO: figure out similar interpretation for edges)

(2.27) Both $U, U'$ restrict to $U$, which means that $V', V$ restrict to $V$. Curiously enough, $W$ restricts to $U' \oplus U''$.

(2.36) Use regular representation formula for order of a group to calculate this.

(3.7/3.8) Let's do the case where $n$ is odd first. The conjugacy classes are $\{Id\}, \{s\}, \{r^i, r^{-i}\}$ for all $i$. Here $s, r$ denote flipping and rotation respectively. Suppose that $V$ is some representation of $G = D_{2n}$, and split $V$ into subspaces of $\Gamma$, the cyclic subgroup of $G$. Let's fix some arbitrary subspace, say $W$. We know that it's spanned by $e$, with eigenvalue $\omega^i$ for some arbitrary $i$. 

Using the identity $rs = sr^{-1}$, we conclude that $se$ is an eigenvector of $r$ with eigenvalue $\omega^{-i}$. If $i = 0$, then $e, se$ span either $U$, $U'$ or $U \oplus U'$ (the trivial and alternating representations respectively). We can see this since $\tau$ fixes both $e, se$ in this case. So if $e$ and $se$ are linearly independent, then $e + se$ spans $U$ while $e - se$ spans $U'$. Otherwise if they are not linearly independent, then $se = \pm e$ because $s$ is an involution, yielding either $U$ or $U'$.  This is touched on in Chapter 1, but not really fleshed out.

Now if $i \neq 0$, then $e, se$ span some  non-trivial 2-dimensional representation. We will show using character theory that this representation is irreducible. We have that $\chi(r^{j}) = \omega^{ij} + \omega^{-ij}$, $\chi(Id) = 2$ and $\chi(s) = 0$ based on the previous discussion. Now let's consider $(\chi, \chi)$. There are $\frac{n-1}{2}$ conjugacy classes of $r^j$, and they each yield a value of $2(\omega^{ij} + \omega^{-ij})^2 = 2(\omega^{2ij} + \omega^{-2ij} + 2)$ for our sum. Now if we sum up all the contributions of $r^j$, we get $\sum_{j=1}^{\frac{n-1}{2}} 2(2Re(\omega^{2ij}) + 2)$, since $\omega^{2ij}$ is conjugate to $\omega^{-2ij}$. 

Now let's take a quick aside to prove that $\sum_{j=1}^{\frac{n-1}{2}} Re(\omega^{2ij}) = -\frac{1}{2}$. First, note that $\sum_{j=0}^{n-1} \omega^{ij} = 0$, since $\omega^{ij}$ satisfies the polynomial $1 + x + x^2 + \dots x^{n-1}$. Thus we have that $\sum_{j=1}^{n-1} \omega^{ij} = -1$. We can rewrite this sum as $\sum_{j=1}^{n-1} \omega^{ij} = \sum_{j=1}^{\frac{n-1}{2}} \omega^{2ij} + \sum_{j=1}^{\frac{n-1}{2}} \omega^{-2ij} = a + \bar{a}$. This last portion shows that the two sums are conjugate. To see how breaking this sum is valid, note that $\omega^{-2ij} = \omega^{ni-2ij} = \omega^{i(n-2j)}$, and $n - 2j$ runs through all odd numbers from 1 to $n$ as $j$ increments.  Thus $2Re(\sum_{j=1}^{\frac{n-1}{2}} \omega^{2ij}) = -1$, so $\sum_{j=1}^{\frac{n-1}{2}} Re(\omega^{2ij}) = -\frac{1}{2}$. 

Now this means that $\sum_{j=1}^{\frac{n-1}{2}} 2(2Re(\omega^{2ij}) + 2) = -2 + 4(\frac{n-1}{2}) = 2n - 4$. If we add the contribution of $\chi(Id)$, and divide by $|G| = 2n$, we get that $(\chi, \chi) = 1$, as desired. 

There is a distinct irreducible 2-dimensional representation for each conjugacy class of $r^j$. We can check if these are all the representations by using the regular representation formula; we have that $(\frac{n-1}{2})2^2 + 2 = 2n = |G|$ as desired.

The analysis for the even case is quite similar, except $\{s\}$ splits into two conjugacy classes, $\{s\}$ and $\{rs\}$. This means that there is an extra irreducible representation. Again, run the same analysis, but this time the sum of $r^j$ contributions is $4 + \sum_{j=1}^{n/2-1} 2(2Re(\omega^{2i}) + 2)$, since the conjugacy class of $r^{\frac{n}{2}}$ only contains 1 element. Fortunately, we have that $\omega^{2i} + \omega^{4i} + \dots + \omega^{ni} = 0$ in the even case (since $\omega^i$ satisifies the polynomial $\frac{x^n-1}{x^2 - 1}$). Thus $4 + \sum_{j=1}^{n/2-1} 2(2Re(\omega^{2i}) + 2) = 0 + 4(\frac{n}{2} - 1) = 2n -4$. If we add the contribution of the identity character, we get the desired result. Note that $\chi(s) = \chi(rs) = 0$. 

Thus we have an irreducible representation for each $i$ such that $\omega^i \neq \omega^{-i}$. In the case that $i=0$, we get $U, U'$ as before. However, if $i = \frac{n}{2}$, then $r = -1$ and the two dimensional representation splits into two more one dimensional representations $U'', U'''$. You can calculate these by observing the effect of $r, s$ on $e +  se$ and $e - se$ respectively. I was originally tripped up because both of these representations look like the alternating representation, but they are not the same.  

(3.26) First, for $g = \alpha x + \beta$, denote $g(\alpha) = \alpha$. We can calculate the conjugacy classes of $G$ quickly by first observing that $h(\alpha) = g^{-1}hg(\alpha)$ for all $g,h \in G$. Thus there must be at least 3 conjugacy classes, based on $\alpha = 1,2,4$.  Note that $\{ h \mid h(\alpha) = 2\}$ and $\{ h \mid h(\alpha) = 4\}$ each constitute their own conjugacy classes, by conjugating $\alpha x + 1$ with $x + a$ for all $a \in \mathbb{F}_7$. Things break down when we consider the case $\alpha = 1$. We can't use the same trick as before because all elements of the form $x + a$ commute with each other. If we conjugate with the other remaining elements, we find 3 more conjugacy classes: $$\{x\}, \{x+1, x+2, x+4\}, \{x+3, x+5, x+6\}$$
Now that we know there are 5 conjugacy classes, a quick brute force inspection reveals that the only possible dimensions for irreducible representations is $3^2 + 3^2 + 1^2 + 1^2 + 1^2 = 21$.

The first irreducible representation can be found by examining the representation induced by the subgroup $\{x + a \mid a \in \mathbb{F}_7 \} = \mathbb{Z}/7\mathbb{Z}$. If we consider the 1-dimensional rep spanned by $v$, an eigenvector of $\omega_7$, then the induced representation is spanned by $\{v, 2x(v), 4x(v)\}$.  There's a lot of tedious calculation to done, but we can verify that the character of this representation $V$ is 
$\chi(x+1) = \omega + \omega^2 + \omega^4, \chi(x+3) = \omega^3 + \omega^5 + \omega^6, \chi(2x) =0,\chi(4x) =0$.

We can check using the inner product as well that this is irreducible.

Next we consider the 7-dimensional representation induced by $\mathbb{Z}/3\mathbb{Z}$. The character of this representation is $\chi(x+1) = \chi(x+3) = 0$, $\chi(2x) = \omega_3$, $\chi(4x) = \omega_3^2$. We can check by inner product that $V$ is present here. There is an irreducible 1-dimensional rep $U$ here, generated by $\sum (x+a)v$. This realization was just a bit of guesswork, and the character is $\chi(x+1) = \chi(x+3) = 0$, $\chi(2x) = \omega_3$, $\chi(4x) = \omega_3^2$.

Now that we know two of the 3 irreps, we can find the last one by subtracting characters. We get that $\chi_{V'} = -\chi_V$ (all except for the identity element), where $V'$ is the remaining representation.

Now that we have 4 of the five characters (if we include the trivial representation), we can use the Fourier inversion formula to find the last one. Its character is $\chi(x+1) = \chi(x+3) = -1$, $\chi(2x) = \omega_3^2$, $\chi(4x) = \omega_3$.


	