# Eigenvalues and eigenvectors

> **Time:** ~35 min · **Pehle aana chahiye:** matrix-vector multiplication, $2\times2$ / $3\times3$ determinant, rank (pivots gin-na) · **Day:** 18, 21

## Ye topic kyun?
Ek matrix har vector ko ghumata bhi hai aur kheenchta bhi hai. Eigenvectors woh special directions hain jinhe matrix sirf kheenchta hai, aur eigenvalue batata hai kitna. PCA, Markov chains, SVD, definiteness — Data Science ka aadha linear algebra isi par khada hai. GATE DA me 1–2 marks ke sawal aate hain: trace/det se eigenvalue nikalo, $A^{-1}$ ya $A^2+I$ ke eigenvalues, rank-one matrix $uv^T$, AM vs GM aur diagonalizability, "kaunsa vector eigenvector hai".

## Picture se samjho

Matrix $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ lo aur teen vectors par lagao.

<figure class="fig">
<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="140" x2="300" y2="140" style="stroke:var(--muted)" stroke-width="1"/>
<line x1="160" y1="210" x2="160" y2="10" style="stroke:var(--muted)" stroke-width="1"/>
<line x1="90" y1="210" x2="290" y2="10" style="stroke:var(--muted)" stroke-dasharray="4 4" stroke-width="1"/>
<line x1="160" y1="140" x2="250" y2="50" style="stroke:var(--good)" stroke-width="3"/>
<line x1="160" y1="140" x2="190" y2="110" style="stroke:var(--info)" stroke-width="5"/>
<text x="255" y="48" font-size="12" fill="currentColor">Av = (3,3) = 3v</text>
<text x="196" y="122" font-size="11" fill="currentColor">v = (1,1)</text>
<line x1="160" y1="140" x2="190" y2="170" style="stroke:var(--mark)" stroke-width="4"/>
<text x="196" y="182" font-size="11" fill="currentColor">w = (1,−1), Aw = w</text>
<line x1="160" y1="140" x2="190" y2="140" style="stroke:var(--bad)" stroke-width="2"/>
<line x1="160" y1="140" x2="220" y2="110" style="stroke:var(--bad)" stroke-width="2" stroke-dasharray="5 3"/>
<text x="224" y="104" font-size="11" fill="currentColor">A(1,0) = (2,1)</text>
<text x="20" y="20" font-size="11" fill="currentColor">dashed line: v ki direction</text>
<text x="20" y="225" font-size="11" fill="currentColor">(1,0) ghoom gaya → eigenvector nahi</text>
</svg>
<figcaption>A = [2 1; 1 2]: (1,1) apni line par rehkar 3 guna hota hai, (1,−1) waisa hi rehta hai, (1,0) ki direction badal jaati hai.</figcaption>
</figure>

Dhyan do: $(1,0)$ ko $A$ ne $(2,1)$ bana diya — direction badal gayi, to ye eigenvector nahi. Lekin $v=(1,1)$ ka image $(3,3)$ usi line par hai, sirf 3 guna lamba: eigenvalue $3$. Aur $w=(1,-1)$ ka image $w$ khud hai: eigenvalue $1$ ("kheencha hi nahi"). Matrix ka poora kaam in do directions se samajh aa jaata hai: ek direction me $\times3$, doosri me $\times1$.

## Concept step-by-step

### 1. Definition
**Idea:** woh non-zero vector jiski direction $A$ lagane par nahi badalti.

$$Av=\lambda v,\qquad v\ne0.$$

$v$ = eigenvector, $\lambda$ = eigenvalue (koi bhi number, $0$ ya negative bhi). Negative $\lambda$ ka matlab: same line, ulti taraf.

**Example:** $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, $v=(1,1)$: $Av=(2+1,\,1+2)=(3,3)=3v$. To $\lambda=3$.

**Dhyan do:** $v=0$ ko kabhi eigenvector nahi maante (warna har $\lambda$ chal jaata). Lekin $\lambda=0$ bilkul allowed hai.

### 2. Eigenvalues kaise nikalte hain
**Idea:** $Av=\lambda v\iff(A-\lambda I)v=0$. Non-zero $v$ tabhi milega jab $A-\lambda I$ singular ho, yani
$$\det(A-\lambda I)=0.$$
Ye $\lambda$ me degree-$n$ polynomial hai (characteristic polynomial). Uske roots = eigenvalues. Phir har $\lambda$ ke liye $(A-\lambda I)v=0$ solve karo — woh null space eigenvectors deta hai.

**Example:** $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$.
1. $\det\begin{pmatrix}4-\lambda&1\\2&3-\lambda\end{pmatrix}=(4-\lambda)(3-\lambda)-2=\lambda^2-7\lambda+10=(\lambda-2)(\lambda-5)$.
2. Eigenvalues $2,5$.
3. $\lambda=5$: $A-5I=\begin{pmatrix}-1&1\\2&-2\end{pmatrix}$, equation $-x+y=0$, to $v=(1,1)$.
4. $\lambda=2$: $A-2I=\begin{pmatrix}2&1\\2&1\end{pmatrix}$, equation $2x+y=0$, to $v=(1,-2)$. Check: $A(1,-2)=(4-2,\,2-6)=(2,-4)=2(1,-2)$. ✓

**Dhyan do:** $A-\lambda I$ me $\lambda$ sirf diagonal se ghatta hai, har entry se nahi.

### 3. Trace = sum, det = product
$$\lambda_1+\cdots+\lambda_n=\operatorname{tr}A,\qquad\lambda_1\lambda_2\cdots\lambda_n=\det A.$$

**Kyun:** $\det(A-\lambda I)=(\lambda_1-\lambda)\cdots(\lambda_n-\lambda)$. $\lambda=0$ rakho: $\det A=\prod\lambda_i$. Aur $\lambda^{n-1}$ ka coefficient dono taraf compare karo: left side me ye sirf diagonal product $(a_{11}-\lambda)\cdots(a_{nn}-\lambda)$ se aata hai, $=(-1)^{n-1}\sum a_{ii}$; right side me $(-1)^{n-1}\sum\lambda_i$. To $\sum\lambda_i=\operatorname{tr}A$.

$2\times2$ ke liye seedha: $\lambda^2-(\operatorname{tr}A)\lambda+\det A=0$.

**$3\times3$, ek eigenvalue pata ho:** baaki do ka sum $=\operatorname{tr}A-\lambda_1$, product $=\det A/\lambda_1$. Phir ek quadratic.

**Example:** $3\times3$, $\operatorname{tr}A=7$, $\det A=8$, ek eigenvalue $1$. Baaki do: sum $7-1=6$, product $8/1=8$. To $t^2-6t+8=(t-2)(t-4)$, eigenvalues $1,2,4$. Check: $1+2+4=7$ ✓, $1\cdot2\cdot4=8$ ✓.

**Dhyan do:** har answer ko is test se cross-check karo — sum trace ke barabar aur product det ke barabar hona hi chahiye. Ye 10 second ka check bahut galtiyan pakadta hai.

### 4. Triangular matrix: diagonal hi eigenvalues
**Kyun:** triangular $A$ ke liye $A-\lambda I$ bhi triangular hai, aur triangular ka det = diagonal product $=(a_{11}-\lambda)\cdots(a_{nn}-\lambda)$. Roots: $a_{11},\ldots,a_{nn}$.

**Example:** $\begin{pmatrix}2&0&0\\5&3&0\\-1&4&3\end{pmatrix}$ ke eigenvalues $2,3,3$.

**Dhyan do:** non-triangular matrix me diagonal ≠ eigenvalues. $\begin{pmatrix}1&2\\3&2\end{pmatrix}$: trace $3$, det $2-6=-4$, $\lambda^2-3\lambda-4=(\lambda-4)(\lambda+1)$, eigenvalues $4,-1$ — $1,2$ nahi.

### 5. Transform karo, eigenvector wahi rehta hai
Agar $Av=\lambda v$:
- $A^2v=A(\lambda v)=\lambda Av=\lambda^2v$, aur aage $A^kv=\lambda^kv$.
- $A^{-1}$: $v=A^{-1}Av=\lambda A^{-1}v$, to $A^{-1}v=\frac1\lambda v$ (jab $\lambda\ne0$).
- $(A+cI)v=(\lambda+c)v$; $(cA)v=c\lambda v$; polynomial $p(A)v=p(\lambda)v$.
- $(A-cI)^{-1}v=\frac{1}{\lambda-c}v$ (jab $\lambda\ne c$).

Isse trace aur det bhi turant: $\operatorname{tr}(A^k)=\sum\lambda_i^k$, $\det(A^{-1})=\prod\frac1{\lambda_i}$.

**Example:** eigenvalues $1,2,3$. $(A-4I)^2$ ke eigenvalues: $(1-4)^2=9$, $(2-4)^2=4$, $(3-4)^2=1$. Largest $=9$ — jo sabse *chhote* $\lambda$ se aaya.

**Dhyan do:** sirf largest $\lambda$ ko transform karke answer mat do. Har eigenvalue transform karo, phir max/min/sum/product lo.

### 6. Eigenvector check karna, aur row-sum trick
**Candidate vector test:** $Av$ compute karo; agar ye $v$ ka multiple hai to $v$ eigenvector hai, aur multiple hi $\lambda$ hai. Scaled vector $2v$, $-v$ bhi eigenvectors hain (same $\lambda$).

**Row sums:** agar har row ka sum $s$ hai, to $A\mathbf 1$ (jahan $\mathbf 1=(1,\ldots,1)$) ka har entry = us row ka sum $=s$. To $A\mathbf1=s\mathbf1$: $s$ eigenvalue, $\mathbf 1$ eigenvector. Agar har *column* ka sum $s$ hai, to $A^T$ ki rows ka sum $s$ hai, to $s$ eigenvalue of $A^T$, aur $A^T$, $A$ ke eigenvalues same hote hain (same characteristic polynomial, kyunki $\det(A^T-\lambda I)=\det(A-\lambda I)$).

**Example:** $A=\begin{pmatrix}1&2&3\\3&2&1\\2&2&2\end{pmatrix}$: har row sum $6$, to $6$ eigenvalue. Trace $5$, det $=1(4-2)-2(6-2)+3(6-4)=2-8+6=0$, to $0$ bhi eigenvalue. Teesra: $5-6-0=-1$.

**Dhyan do:** column-sum wali case me eigenvector $\mathbf1$ $A^T$ ka hai, $A$ ka nahi (zaroori nahi). Sirf eigenvalue share hota hai.

### 7. Rank-one matrices $uv^T$
$u,v\in\mathbb R^n$ lo, $A=uv^T$ (ek $n\times n$ matrix, har column $u$ ka multiple).
- $Au=u(v^Tu)=(v^Tu)u$: to $u$ eigenvector, eigenvalue $v^Tu$ (ek number, dot product).
- Jo $w$ $v$ ke perpendicular hai ($v^Tw=0$), uske liye $Aw=u(v^Tw)=0$. Aise $n-1$ independent $w$ hain, to $0$ eigenvalue $n-1$ baar.
- Eigenvalues: $v^Tu,0,\ldots,0$. Check: trace $=\sum u_iv_i=v^Tu$. ✓
- Powers: $A^2=u(v^Tu)v^T=(v^Tu)A$, aur $A^k=(v^Tu)^{k-1}A$. To $\operatorname{tr}(A^k)=(v^Tu)^k$.
- Agar $v^Tu=0$: $A^2=0$, matrix nilpotent (saare eigenvalues $0$), lekin $A\ne0$.

Special cases:
- $I+xx^T$: eigenvalues $1+x^Tx$ aur $1$ ($n-1$ baar); $\det=1+x^Tx$.
- All-ones $J_n=\mathbf1\mathbf1^T$: eigenvalues $n,0,\ldots,0$. To $J_n+cI$ ke $n+c$ aur $c$ ($n-1$ baar).

**Example:** $u=(1,2,2)$, $v=(2,-1,1)$: $v^Tu=2-2+2=2$. Eigenvalues $2,0,0$. $\operatorname{tr}(A^{3})=2^3=8$.

**Dhyan do:** non-zero eigenvalue $v^Tu$ hai, $\|u\|\|v\|$ nahi ($\|u\|\|v\|$ singular value hai, woh SVD wala topic). Yahan $\|u\|\|v\|=3\sqrt6\approx7.35$, eigenvalue sirf $2$.

### 8. AM, GM aur diagonalizability
- **AM (algebraic multiplicity):** characteristic polynomial me $\lambda$ kitni baar root hai.
- **GM (geometric multiplicity):** $\lambda$ ke kitne independent eigenvectors hain $=\dim$ null space of $(A-\lambda I)$ $=n-\operatorname{rank}(A-\lambda I)$ (rank–nullity se).
- Hamesha $1\le\text{GM}\le\text{AM}$.
- **Diagonalizable** ($A=PDP^{-1}$, $D$ diagonal) $\iff$ har $\lambda$ ke liye GM = AM, yani $n$ independent eigenvectors milte hain.
- Shortcuts: saare eigenvalues distinct $\Rightarrow$ diagonalizable. Real symmetric $\Rightarrow$ hamesha diagonalizable.

<figure class="fig">
<svg viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="150" height="130" rx="8" style="fill:none;stroke:var(--good)" stroke-width="2"/>
<text x="85" y="32" font-size="13" text-anchor="middle" fill="currentColor">[2 0; 0 2]</text>
<text x="85" y="55" font-size="11" text-anchor="middle" fill="currentColor">A − 2I = [0 0; 0 0]</text>
<text x="85" y="75" font-size="11" text-anchor="middle" fill="currentColor">rank 0 → GM = 2</text>
<text x="85" y="95" font-size="11" text-anchor="middle" fill="currentColor">AM = 2</text>
<text x="85" y="122" font-size="12" text-anchor="middle" style="fill:var(--good)">diagonalizable ✓</text>
<rect x="180" y="10" width="150" height="130" rx="8" style="fill:none;stroke:var(--bad)" stroke-width="2"/>
<text x="255" y="32" font-size="13" text-anchor="middle" fill="currentColor">[2 1; 0 2]</text>
<text x="255" y="55" font-size="11" text-anchor="middle" fill="currentColor">A − 2I = [0 1; 0 0]</text>
<text x="255" y="75" font-size="11" text-anchor="middle" fill="currentColor">rank 1 → GM = 1</text>
<text x="255" y="95" font-size="11" text-anchor="middle" fill="currentColor">AM = 2</text>
<text x="255" y="122" font-size="12" text-anchor="middle" style="fill:var(--bad)">not diagonalizable ✗</text>
</svg>
<figcaption>Dono ke eigenvalues 2, 2 hain (AM = 2), par eigenvectors ki ginti (GM) alag hai.</figcaption>
</figure>

Dhyan do: dono matrices ka characteristic polynomial $(\lambda-2)^2$ same hai. Pehle me har vector eigenvector hai (plane bhar ke directions), doosre me sirf $(1,0)$ ki line. Eigenvalues dekh kar diagonalizability decide nahi hoti; repeated $\lambda$ par rank check karna padta hai.

**Example:** $A=\begin{pmatrix}3&1&1\\1&3&1\\1&1&3\end{pmatrix}$, $\lambda=2$: $A-2I$ ki saari rows $(1,1,1)$ hain, rank $1$, GM $=3-1=2$. Baaki eigenvalue: trace $9$, to $9-2-2=5$ (row sum bhi $5$ ✓).

**Dhyan do:** GM = rank nahi, GM = $n-$rank. Aur rank tab gino jab row reduce kar lo; "rows equal hain" dikh jaaye to rank 1.

## Solved examples

**Example 1 (MCQ, easy):** $\begin{pmatrix}2&3\\4&1\end{pmatrix}$ ke eigenvalues hain:
(A) $2,1$ (B) $5,-2$ (C) $-5,2$ (D) $3,-10$

**Soch:** $2\times2$ → trace aur det se quadratic.

**Solution:**
1. $\operatorname{tr}=3$, $\det=2-12=-10$.
2. $\lambda^2-3\lambda-10=0\Rightarrow(\lambda-5)(\lambda+2)=0$.
3. $\lambda=5,-2$. Check: sum $3$ ✓, product $-10$ ✓. Answer **(B)**.

**Galti kahan hoti hai:** (A) diagonal entries utha lena — matrix triangular nahi hai. (D) trace aur det ko hi eigenvalues samajhna. (C) quadratic me sign ulta karna.

**Example 2 (NAT, easy-medium):** Real $3\times3$ $A$ ka $\operatorname{tr}A=6$, $\det A=-30$, aur $3$ ek eigenvalue hai. $A$ ka sabse chhota eigenvalue?

**Soch:** "ek eigenvalue known + trace + det" → baaki do ka sum aur product.

**Solution:**
1. Baaki do ka sum $=6-3=3$.
2. Product $=-30/3=-10$.
3. $t^2-3t-10=0\Rightarrow t=5,-2$.
4. Eigenvalues $3,5,-2$; sabse chhota $-2$.

**Galti kahan hoti hai:** product ke liye $-30-3$ ya $-30\cdot3$ karna (divide ki jagah). Ya "smallest" ko magnitude me sochna aur $3$ likhna.

**Example 3 (MSQ, medium):** $3\times3$ $A$ ke eigenvalues $1,-2,4$. Kaunse sahi hain?
(A) $A$ invertible hai.
(B) $-\frac12$, $A^{-1}$ ka eigenvalue hai.
(C) $\operatorname{tr}(A^2)=9$.
(D) $A+2I$ singular hai.

**Soch:** har statement ko transformed eigenvalues se check karo.

**Solution:**
1. (A) $0$ eigenvalue nahi, $\det=1\cdot(-2)\cdot4=-8\ne0$. ✓
2. (B) $A^{-1}$ ke eigenvalues $1,-\frac12,\frac14$. ✓
3. (C) $\operatorname{tr}(A^2)=1+4+16=21\ne9$. ✗
4. (D) $A+2I$ ke eigenvalues $3,0,6$; $0$ hai, to singular. ✓

Answer **(A), (B), (D)**.

**Galti kahan hoti hai:** (C) me $(\operatorname{tr}A)^2=3^2=9$ le lena. $\operatorname{tr}(A^2)=\sum\lambda_i^2$ hai, $(\sum\lambda_i)^2$ nahi.

**Example 4 (NAT, medium):** $u=(1,-1,2)^T$, $v=(3,1,1)^T$, $A=uv^T$. $\operatorname{tr}(A^5)$ nikalo.

**Soch:** $uv^T$ → rank one → non-zero eigenvalue $v^Tu$.

**Solution:**
1. $v^Tu=3\cdot1+1\cdot(-1)+1\cdot2=4$.
2. Eigenvalues $4,0,0$; $A^5$ ke $4^5,0,0$.
3. $\operatorname{tr}(A^5)=4^5=1024$.

**Galti kahan hoti hai:** $\|u\|\|v\|=\sqrt6\cdot\sqrt{11}$ ko eigenvalue maan lena, ya $5\cdot\operatorname{tr}A=20$ likhna.

**Example 5 (NAT, medium):** $A=\begin{pmatrix}5&1&0&0\\0&5&0&0\\0&0&5&0\\0&0&0&2\end{pmatrix}$. Eigenvalue $5$ ki geometric multiplicity?

**Soch:** "GM" → $n-\operatorname{rank}(A-\lambda I)$.

**Solution:**
1. Upper triangular, to eigenvalues $5,5,5,2$; AM of $5$ $=3$.
2. $A-5I=\begin{pmatrix}0&1&0&0\\0&0&0&0\\0&0&0&0\\0&0&0&-3\end{pmatrix}$.
3. Non-zero rows: row 1 aur row 4, independent. Rank $=2$.
4. GM $=4-2=2$. (AM $3$ > GM $2$, isliye $A$ diagonalizable nahi.)

**Galti kahan hoti hai:** GM $=$ rank $=2$ — yahan coincidence se same aata hai! Lekin reasoning galat hai; agar $n=5$ hota to fark dikhta. Doosri galti: GM $=$ AM $=3$ maan lena.

**Example 6 (MSQ, hard):** $J$ ek $4\times4$ matrix hai jiski har entry $1$ hai, aur $B=J+3I$. Kaunse sahi hain?
(A) $7$, $B$ ka eigenvalue hai with eigenvector $(1,1,1,1)$.
(B) $\det B=16$.
(C) $\det B=189$.
(D) $B$ diagonalizable nahi hai kyunki eigenvalue $3$ repeat ho raha hai.

**Soch:** $J=\mathbf1\mathbf1^T$ rank one hai; $+3I$ sab eigenvalues ko $3$ se shift karta hai.

**Solution:**
1. $J$ ke eigenvalues: $\mathbf1^T\mathbf1=4$, aur $0,0,0$.
2. $B$ ke: $7,3,3,3$. Row sum bhi $4+3=7$, eigenvector $\mathbf1$. (A) ✓
3. $\det B=7\cdot3\cdot3\cdot3=189$. (C) ✓, (B) ✗.
4. $B$ symmetric hai, to hamesha diagonalizable. (D) ✗.

Answer **(A), (C)**.

**Galti kahan hoti hai:** (B) $16$ aata hai jab eigenvalues ko add kar dete ho ($7+3+3+3=16$ — ye trace hai, det nahi). (D) repeated eigenvalue dekh kar ghabra jaana; symmetric matrix me GM = AM guaranteed.

## Confusions clear karo

**Q:** Eigenvalue $0$ ho sakta hai? Eigenvector $0$?
**A:** Eigenvalue $0$ ho sakta hai (tab $A$ singular). Eigenvector kabhi $0$ nahi hota.

**Q:** Ek eigenvalue ke kitne eigenvectors hote hain?
**A:** Infinite — agar $v$ hai to $2v$, $-5v$ bhi. Isliye ham "independent eigenvectors kitne" (GM) gin-te hain. MSQ me scaled version ko bhi tick karo.

**Q:** Diagonal entries kab eigenvalues hoti hain?
**A:** Sirf triangular (upper/lower) ya diagonal matrix me. Baaki me trace–det se check karo.

**Q:** $A$ aur $A^T$ ke eigenvalues same kyun hain par eigenvectors alag?
**A:** $\det(A^T-\lambda I)=\det((A-\lambda I)^T)=\det(A-\lambda I)$, to polynomial same, roots same. Null spaces ($A-\lambda I$ vs $A^T-\lambda I$) generally alag hote hain.

**Q:** $A^2$ ke eigenvalues $\lambda^2$ hain; kya ulta bhi sach hai — $A^2$ ka har eigenvector $A$ ka bhi?
**A:** Zaroori nahi. $A=\begin{pmatrix}0&1\\1&0\end{pmatrix}$: $A^2=I$, har vector $A^2$ ka eigenvector hai, par $(1,0)$ $A$ ka eigenvector nahi.

**Q:** Repeated eigenvalue ka matlab "not diagonalizable"?
**A:** Nahi. $I$ me sab eigenvalues repeated hain, phir bhi diagonal hai. Repeat ho to GM check karo; GM = AM ho to theek.

**Q:** Rank-one $uv^T$ ka eigenvalue $u^Tv$ ya $v^Tu$?
**A:** Dono same number hain (dot product symmetric hai). Lekin $\|u\|\|v\|$ nahi.

## Khud try karo

**1.** $\begin{pmatrix}4&0&0\\7&-1&0\\2&5&6\end{pmatrix}$ ke eigenvalues?

<details><summary>Answer dekho</summary>

Lower triangular, to diagonal: $4,-1,6$. Check: trace $9=4-1+6$ ✓.

</details>

**2.** $2\times2$ $A$ ke eigenvalues $3$ aur $-2$. $\operatorname{tr}(A^2+A)$ nikalo.

<details><summary>Answer dekho</summary>

$p(\lambda)=\lambda^2+\lambda$: $p(3)=12$, $p(-2)=4-2=2$. Trace $=12+2=14$.

</details>

**3.** $x=(2,1,0,2)^T$. $I_4+xx^T$ ka sabse bada eigenvalue?

<details><summary>Answer dekho</summary>

$x^Tx=4+1+0+4=9$. Eigenvalues $1+9=10$ aur $1,1,1$. Largest $=10$.

</details>

**4.** $A=\begin{pmatrix}3&1\\0&3\end{pmatrix}$: eigenvalue $3$ ka AM, GM, aur diagonalizable?

<details><summary>Answer dekho</summary>

AM $=2$. $A-3I=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, rank $1$, GM $=2-1=1$. GM < AM, to diagonalizable nahi.

</details>

**5.** $A=\begin{pmatrix}1&2&3\\0&4&2\\5&1&0\end{pmatrix}$. Ek eigenvalue bina calculation ke batao, phir baaki do ka sum aur product.

<details><summary>Answer dekho</summary>

Har row sum $6$, to $6$ eigenvalue (eigenvector $(1,1,1)$). Trace $=5$, $\det=1(0-2)-2(0-10)+3(0-20)=-2+20-60=-42$. Baaki do: sum $5-6=-1$, product $-42/6=-7$.

</details>

## Ek page me
- $Av=\lambda v$, $v\ne0$; eigenvalues $\det(A-\lambda I)=0$ ke roots; eigenvectors $=$ null space of $A-\lambda I$.
- $\sum\lambda_i=\operatorname{tr}A$, $\prod\lambda_i=\det A$ — har answer isse cross-check karo.
- $2\times2$: $\lambda^2-(\operatorname{tr})\lambda+\det=0$. $3\times3$ me ek known: baaki ka sum $\operatorname{tr}-\lambda_1$, product $\det/\lambda_1$.
- Triangular: diagonal = eigenvalues. Baaki matrices me nahi.
- Same eigenvector: $A^k\to\lambda^k$, $A^{-1}\to1/\lambda$, $A+cI\to\lambda+c$, $cA\to c\lambda$, $(A-cI)^{-1}\to1/(\lambda-c)$, $p(A)\to p(\lambda)$.
- Har eigenvalue transform karo; max kabhi-kabhi chhote $\lambda$ se aata hai.
- Eigenvector test: $Av$ nikalo, proportional hai? Scaled vectors bhi eigenvectors.
- Row sums sab $s$ $\Rightarrow$ $s$ eigenvalue, eigenvector $\mathbf1$; column sums $s$ $\Rightarrow$ $s$ eigenvalue.
- $uv^T$: eigenvalues $v^Tu,0,\ldots,0$; $(uv^T)^k=(v^Tu)^{k-1}uv^T$; $v^Tu=0\Rightarrow$ nilpotent.
- $I+xx^T$: $1+x^Tx$ aur $1$s; $J_n$: $n$ aur $0$s.
- GM $=n-\operatorname{rank}(A-\lambda I)$, $1\le$ GM $\le$ AM; diagonalizable $\iff$ GM = AM sab ke liye; distinct ya symmetric $\Rightarrow$ diagonalizable.

Revision ke liye **Short note** tab dekho.
