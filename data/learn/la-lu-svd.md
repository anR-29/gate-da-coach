# LU and singular value decomposition

> **Time:** ~35 min · **Pehle aana chahiye:** Gaussian elimination (row reduction), determinant, eigenvalues, orthogonal matrix ka matlab ($Q^TQ=I$) · **Day:** 20, 21

## Ye topic kyun?
"Decomposition" ka matlab hai ek matrix ko simple tukdon ke product me todna. **LU** elimination ko record kar leta hai, taaki $Ax=b$ baar-baar jaldi solve ho aur determinant muft me mile. **SVD** har matrix (square ho ya na ho) ko "rotate → stretch → rotate" me todta hai; PCA, low-rank approximation aur recommender systems isi par chalte hain. GATE DA me 1–2 marks ke sawal: LU ka koi entry ($u_{22}$, $u_{33}$, $l_{32}$) nikalo, LU kab exist karta hai, singular values nikalo, rank / Frobenius norm / $\|A\|_2$ singular values se.

## Picture se samjho

**LU:** elimination karte waqt jo multipliers use hote hain, unhe phenko mat — $L$ me likh lo. Jo upper triangular bachta hai, woh $U$.

<figure class="fig">
<svg viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg">
<text x="10" y="20" font-size="12" fill="currentColor">A</text>
<text x="10" y="45" font-size="12" fill="currentColor">[  2  1  1 ]</text>
<text x="10" y="65" font-size="12" fill="currentColor">[  4  3  3 ]</text>
<text x="10" y="85" font-size="12" fill="currentColor">[ −2  1  4 ]</text>
<text x="95" y="65" font-size="14" fill="currentColor">=</text>
<text x="115" y="20" font-size="12" style="fill:var(--mark)">L (multipliers)</text>
<text x="115" y="45" font-size="12" fill="currentColor">[  1  0  0 ]</text>
<text x="115" y="65" font-size="12" fill="currentColor">[  <tspan style="fill:var(--mark)">2</tspan>  1  0 ]</text>
<text x="115" y="85" font-size="12" fill="currentColor">[ <tspan style="fill:var(--mark)">−1</tspan>  <tspan style="fill:var(--mark)">2</tspan>  1 ]</text>
<text x="205" y="65" font-size="14" fill="currentColor">×</text>
<text x="225" y="20" font-size="12" style="fill:var(--info)">U (eliminated)</text>
<text x="225" y="45" font-size="12" fill="currentColor">[ 2  1  1 ]</text>
<text x="225" y="65" font-size="12" fill="currentColor">[ 0  1  1 ]</text>
<text x="225" y="85" font-size="12" fill="currentColor">[ 0  0  3 ]</text>
<text x="10" y="115" font-size="11" fill="currentColor">multipliers 2, −1, 2 → L ke diagonal ke neeche</text>
</svg>
<figcaption>Elimination ke multipliers L ke diagonal ke neeche baithte hain; L ka diagonal 1 hai. U wahi hai jo elimination ke baad bachta hai.</figcaption>
</figure>

Dhyan do: $L$ me diagonal par $1$ hai (isliye "unit lower triangular"). $l_{ij}$ wahi number hai jitne guna pivot row ko row $i$ se *ghatana* pada. Aur $\det A=2\cdot1\cdot3=6$ — $U$ ke diagonal ka product, kyunki row replacement det nahi badalta.

**SVD:** koi bhi $2\times2$ matrix unit circle ko ek ellipse me badal deta hai.

<figure class="fig">
<svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="70" cy="100" r="30" style="fill:none;stroke:var(--muted)" stroke-width="1.5"/>
<line x1="70" y1="100" x2="91.2" y2="78.8" style="stroke:var(--good)" stroke-width="2.5"/>
<line x1="70" y1="100" x2="91.2" y2="121.2" style="stroke:var(--mark)" stroke-width="2.5"/>
<text x="94" y="76" font-size="11" fill="currentColor">v₁</text>
<text x="94" y="132" font-size="11" fill="currentColor">v₂</text>
<text x="128" y="96" font-size="14" fill="currentColor">A →</text>
<ellipse cx="240" cy="100" rx="84.9" ry="42.4" style="fill:none;stroke:var(--muted)" stroke-width="1.5"/>
<line x1="240" y1="100" x2="324.9" y2="100" style="stroke:var(--good)" stroke-width="2.5"/>
<line x1="240" y1="100" x2="240" y2="142.4" style="stroke:var(--mark)" stroke-width="2.5"/>
<text x="268" y="92" font-size="11" fill="currentColor">σ₁ = 2.83</text>
<text x="246" y="135" font-size="11" fill="currentColor">σ₂ = 1.41</text>
<text x="70" y="160" font-size="11" text-anchor="middle" fill="currentColor">unit circle</text>
<text x="240" y="165" font-size="11" text-anchor="middle" fill="currentColor">ellipse (A = [2 2; −1 1])</text>
<text x="170" y="190" font-size="11" text-anchor="middle" fill="currentColor">A v₁ = σ₁ u₁,  A v₂ = σ₂ u₂</text>
</svg>
<figcaption>Do perpendicular directions v₁, v₂ ellipse ke do perpendicular axes par jaati hain. Axes ki half-lengths hi singular values hain.</figcaption>
</figure>

Dhyan do: ye eigenvectors jaisa nahi hai — $v_1$ ki direction badal gayi ($45°$ se horizontal). SVD sirf ye kehta hai ki input me koi perpendicular pair $v_1,v_2$ hai jo output me bhi perpendicular pair $u_1,u_2$ ban jaata hai, lengths $\sigma_1,\sigma_2$ ke saath. Sabse lamba stretch $\sigma_1$ hai, isliye $\max_{\|x\|=1}\|Ax\|=\sigma_1$.

## Concept step-by-step

### 1. LU kya hai ($2\times2$ se shuru)
**Idea:** $A=LU$, $L$ unit lower triangular, $U$ upper triangular. Elimination ka ek step: row 2 me se ($l_{21}\times$ row 1) ghatao taaki $a_{21}$ zero ho jaaye.
$$l_{21}=\frac{a_{21}}{a_{11}},\qquad u_{22}=a_{22}-l_{21}a_{12}.$$
$U$ ki pehli row = $A$ ki pehli row.

**Example:** $A=\begin{pmatrix}2&3\\4&7\end{pmatrix}$.
1. $l_{21}=4/2=2$.
2. $u_{22}=7-2\cdot3=1$.
3. $L=\begin{pmatrix}1&0\\2&1\end{pmatrix}$, $U=\begin{pmatrix}2&3\\0&1\end{pmatrix}$.
4. Check: $LU$ ka $(2,2)$ entry $=2\cdot3+1\cdot1=7$ ✓.

**Dhyan do:** $u_{22}$ me $a_{22}$ ko seedha copy mat karo, aur ghatao (add nahi). $L$ me $+2$ jaata hai, $-2$ nahi — kyunki $A=LU$ me $L$ "wapas jodne" ka kaam karta hai.

### 2. $3\times3$ LU poora
**Idea:** column by column eliminate karo. Har column me multiplier $=$ (jis entry ko zero karna hai)/(pivot).

**Example:** $A=\begin{pmatrix}2&1&1\\4&3&3\\-2&1&4\end{pmatrix}$.
1. Column 1, pivot $2$: $l_{21}=4/2=2$, $l_{31}=-2/2=-1$.
2. $R_2-2R_1=(4,3,3)-(4,2,2)=(0,1,1)$.
3. $R_3-(-1)R_1=(-2,1,4)+(2,1,1)=(0,2,5)$.
4. Column 2, pivot $1$: $l_{32}=2/1=2$; $R_3-2R_2=(0,2,5)-(0,2,2)=(0,0,3)$.
5. $U=\begin{pmatrix}2&1&1\\0&1&1\\0&0&3\end{pmatrix}$, $L=\begin{pmatrix}1&0&0\\2&1&0\\-1&2&1\end{pmatrix}$.

**Dhyan do:** $l_{32}$ *updated* row 3 se nikalta hai ($2/1$), original $a_{32}=1$ se nahi. Ye sabse common 3×3 galti hai.

### 3. $LU$ ka koi bhi entry
$(LU)_{ij}=$ (row $i$ of $L$) · (column $j$ of $U$), saare terms ke saath: $\sum_k l_{ik}u_{kj}$.

**Example:** upar wale $L,U$ se $(3,3)$: $(-1)(1)+(2)(1)+(1)(3)=-1+2+3=4=a_{33}$ ✓.

**Dhyan do:** sirf diagonal terms $l_{33}u_{33}=3$ multiply karke ruk jaana galat; row·column ke saare terms jodo, har sign ke saath.

### 4. LU kab exist karta hai (bina row swap)
**Rule:** elimination ke dauraan har pivot non-zero hona chahiye. Invertible $A$ ke liye ye equivalent hai: saare leading principal minors ($1\times1$, $2\times2$, … top-left determinants) $\ne0$. Kyun: $k$-th leading minor $=u_{11}u_{22}\cdots u_{kk}$, to koi pivot $0$ ho to woh minor $0$.

Agar beech me pivot $0$ ho aur uske neeche non-zero entry ho, to row swap karna padega: $PA=LU$ ($P$ permutation matrix).

**Example:** $\begin{pmatrix}0&1\\1&0\end{pmatrix}$: pehla pivot $0$, neeche $1$ — LU nahi (bina swap). Lekin $\begin{pmatrix}1&1\\1&1\end{pmatrix}$ singular hone ke bawajood LU rakhta hai: $l_{21}=1$, $u_{22}=1-1=0$, to $U=\begin{pmatrix}1&1\\0&0\end{pmatrix}$.

**Dhyan do:** "singular $\Rightarrow$ LU nahi" galat hai. Asli rukawat hai: zero pivot *aur* uske neeche koi non-zero jo eliminate karna ho. Aakhri pivot $0$ ho to koi dikkat nahi (bas $U$ singular hoga).

### 5. Determinant aur $Ax=b$ solve karna
- $\det A=\det L\cdot\det U=1\cdot\prod u_{ii}$ (dono triangular; $L$ ka diagonal sab $1$).
- $Ax=b\Rightarrow L(Ux)=b$. $y=Ux$ rakho: pehle $Ly=b$ (upar se neeche, forward substitution), phir $Ux=y$ (neeche se upar, back substitution).

**Example:** upar wala $A$, $b=(4,10,3)$.
1. $Ly=b$: $y_1=4$; $2y_1+y_2=10\Rightarrow y_2=2$; $-y_1+2y_2+y_3=3\Rightarrow y_3=3+4-4=3$.
2. $Ux=y$: $3x_3=3\Rightarrow x_3=1$; $x_2+x_3=2\Rightarrow x_2=1$; $2x_1+x_2+x_3=4\Rightarrow x_1=1$.
3. $x=(1,1,1)$. Check: $A(1,1,1)=(4,10,3)$ ✓. Aur $\det A=2\cdot1\cdot3=6$.

**Dhyan do:** fayda ye hai ki $L,U$ ek baar banao, phir naye $b$ ke liye sirf do triangular solves — har baar elimination nahi.

### 6. SVD: $A=U\Sigma V^T$
**Statement:** koi bhi $m\times n$ real $A$ ko likh sakte hain
$$A=U\Sigma V^T,$$
$U$ ($m\times m$) aur $V$ ($n\times n$) orthogonal, $\Sigma$ ($m\times n$) diagonal with $\sigma_1\ge\sigma_2\ge\cdots\ge0$. Ye $\sigma_i$ singular values hain. Picture: $V^T$ ghumata hai, $\Sigma$ axes ke along kheenchta hai, $U$ phir ghumata hai. Column form: $Av_i=\sigma_iu_i$.

(Notation clash: yahan $U$ orthogonal hai; LU wala $U$ alag cheez hai.)

**Dhyan do:** singular values hamesha $\ge0$ hote hain. Negative sign hota bhi to $u_i$ ko $-u_i$ karke absorb ho jaata.

### 7. Singular values kaise nikalein
$$A^TA=V\Sigma^TU^TU\Sigma V^T=V(\Sigma^T\Sigma)V^T.$$
To $A^TA$ ke eigenvalues $\sigma_i^2$ hain, eigenvectors $v_i$. Isliye
$$\sigma_i=\sqrt{\lambda_i(A^TA)}.$$
$AA^T=U(\Sigma\Sigma^T)U^T$ ke non-zero eigenvalues bhi wahi $\sigma_i^2$ hain (bas zeros ki ginti alag ho sakti hai). Jo chhota ho, uska eigen nikalo.

**Example:** $A=\begin{pmatrix}2&2\\-1&1\end{pmatrix}$.
1. $A^TA=\begin{pmatrix}4+1&4-1\\4-1&4+1\end{pmatrix}=\begin{pmatrix}5&3\\3&5\end{pmatrix}$.
2. Eigenvalues: trace $10$, det $25-9=16$: $\lambda^2-10\lambda+16=(\lambda-8)(\lambda-2)$.
3. $\sigma_1=\sqrt8=2\sqrt2\approx2.83$, $\sigma_2=\sqrt2\approx1.41$ (figure wala matrix).

**$2\times2$ shortcut:** $\sigma_1\sigma_2=|\det A|$ aur $\sigma_1^2+\sigma_2^2=\sum a_{ij}^2$. Yahan $|\det A|=2+2=4=2\sqrt2\cdot\sqrt2$ ✓, aur $4+4+1+1=10=8+2$ ✓.

**Non-square example:** $A=\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}$ ($3\times2$): $A^TA=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, eigenvalues $3,1$, to $\sigma=\sqrt3,1$. ($AA^T$ $3\times3$ hai, eigenvalues $3,1,0$.)

**Dhyan do:** square root mat bhoolo — $A^TA$ ke eigenvalues $\sigma^2$ hain, $\sigma$ nahi.

### 8. Rank, norms, determinant — sab singular values se
- $\operatorname{rank}A=$ non-zero singular values ki ginti (kyunki $U,V$ invertible hain, rank $=\operatorname{rank}\Sigma$).
- $\|A\|_2=\max_{\|x\|=1}\|Ax\|=\sigma_1$ (ellipse ka sabse lamba axis).
- Frobenius: $\|A\|_F^2=\sum_{i,j}a_{ij}^2=\operatorname{tr}(A^TA)=\sum\sigma_i^2$.
- Square $A$: $|\det A|=|\det U|\cdot\prod\sigma_i\cdot|\det V|=\prod\sigma_i$.

**Example:** $3\times3$ $A$ ke singular values $4,2,0$: rank $2$, $\|A\|_2=4$, $\|A\|_F^2=16+4+0=20$, $\det A=0$.

**Dhyan do:** $\|A\|_F^2=\sum\sigma_i^2$ (squares ka sum), $(\sum\sigma_i)^2$ nahi.

### 9. Rank-one $uv^T$ aur symmetric matrices
**Rank one:** $A=uv^T$ ($u\in\mathbb R^m$, $v\in\mathbb R^n$). $A^TA=vu^Tuv^T=\|u\|^2vv^T$, jiska non-zero eigenvalue $\|u\|^2\|v\|^2$. To
$$\sigma_1=\|u\|\,\|v\|,\quad\text{baaki sab }0.$$
Equal (ya proportional) columns wala matrix rank one hai — ek hi non-zero $\sigma$.

**Example:** $\begin{pmatrix}1&1\\1&1\\0&0\end{pmatrix}=(1,1,0)^T(1,1)$: $\sigma_1=\sqrt2\cdot\sqrt2=2$, $\sigma_2=0$.

**Symmetric:** $A=Q\Lambda Q^T$. Negative $\lambda$ ka sign $U$ me daal do, to $\sigma_i=|\lambda_i|$. Symmetric PSD me $\sigma_i=\lambda_i$.

**Dhyan do:** general matrix me $\sigma\ne|\lambda|$. $\begin{pmatrix}0&1\\0&0\end{pmatrix}$: eigenvalues $0,0$, par $A^TA=\begin{pmatrix}0&0\\0&1\end{pmatrix}$, to $\sigma=1,0$. Aur rank one ke liye $\sigma_1=\|u\|\|v\|$, jabki eigenvalue (square case me) $v^Tu$ hai — dono alag.

## Solved examples

**Example 1 (NAT, easy):** $A=\begin{pmatrix}3&2\\9&10\end{pmatrix}=LU$ ($L$ unit lower triangular). $u_{22}$ nikalo.

**Soch:** $2\times2$ LU → $l_{21}=a_{21}/a_{11}$, $u_{22}=a_{22}-l_{21}a_{12}$.

**Solution:**
1. $l_{21}=9/3=3$.
2. $u_{22}=10-3\cdot2=4$.
3. Check: $\det A=30-18=12=3\cdot4$ ✓.

**Galti kahan hoti hai:** $u_{22}=10$ (copy kar diya) ya $10+6=16$ (ghatane ki jagah jod diya). Det check dono ko pakad leta hai.

**Example 2 (MCQ, medium):** Kis matrix ka LU factorization (unit lower $L$, upper $U$) **bina row exchange ke nahi** hai?
(A) $\begin{pmatrix}1&2\\3&4\end{pmatrix}$ (B) $\begin{pmatrix}1&2&3\\2&4&1\\1&1&1\end{pmatrix}$ (C) $\begin{pmatrix}2&4\\1&2\end{pmatrix}$ (D) $\begin{pmatrix}1&1\\1&1\end{pmatrix}$

**Soch:** elimination chalao, dekho koi pivot $0$ ho aur neeche non-zero ho.

**Solution:**
1. (A) $l_{21}=3$, $u_{22}=4-6=-2\ne0$. LU hai.
2. (B) $R_2-2R_1=(0,0,-5)$, $R_3-R_1=(0,-1,-2)$. Ab column 2 ka pivot $0$ hai par neeche $-1$ hai — eliminate nahi ho sakta. LU nahi.
3. (C) $l_{21}=\frac12$, $u_{22}=2-2=0$: aakhri pivot $0$, koi problem nahi. LU hai (singular $U$).
4. (D) $u_{22}=0$, same reason. LU hai.

Answer **(B)**.

**Galti kahan hoti hai:** (C) ya (D) chunna kyunki woh singular hain ($\det=0$). Singular hona rukawat nahi; beech ka zero pivot rukawat hai. (B) ka $\det=1(4-1)-2(2-1)+3(2-4)=-5\ne0$ — invertible hai, phir bhi swap chahiye (uska $2\times2$ leading minor $4-4=0$ hai).

**Example 3 (MSQ, easy-medium):** $A=\begin{pmatrix}2&-1\\-6&5\end{pmatrix}=LU$ ($L$ unit lower). Kaunse sahi?
(A) $l_{21}=-3$ (B) $u_{22}=2$ (C) $u_{22}=8$ (D) $\det A=4$

**Soch:** $2\times2$ formula, signs dhyan se.

**Solution:**
1. $l_{21}=-6/2=-3$. (A) ✓
2. $u_{22}=5-(-3)(-1)=5-3=2$. (B) ✓, (C) ✗
3. $\det A=10-6=4=2\cdot2$. (D) ✓

Answer **(A), (B), (D)**.

**Galti kahan hoti hai:** $(-3)(-1)=+3$ ko $-3$ samajh kar $5+3=8$ — (C). Har term $l_{21}u_{12}$ ko sign ke saath likho.

**Example 4 (NAT, medium):** Doolittle LU me $u_{33}$ nikalo: $A=\begin{pmatrix}1&3&1\\2&8&4\\-1&1&6\end{pmatrix}$.

**Soch:** $3\times3$ elimination, column by column.

**Solution:**
1. $l_{21}=2$, $l_{31}=-1$.
2. $R_2-2R_1=(0,2,2)$; $R_3+R_1=(0,4,7)$.
3. $l_{32}=4/2=2$; $R_3-2R_2=(0,0,7-4)=(0,0,3)$.
4. $u_{33}=3$. Check: $\det A=1\cdot2\cdot3=6$; direct: $1(48-4)-3(12+4)+1(2+8)=44-48+10=6$ ✓.

**Galti kahan hoti hai:** $l_{32}$ original $a_{32}=1$ se lena: $l_{32}=1/2$, phir $u_{33}=7-\frac12\cdot2=6$. Updated row (4) use karo, original nahi.

**Example 5 (NAT, medium):** $A=\begin{pmatrix}3&3\\-1&1\end{pmatrix}$ ka sabse bada singular value (2 decimal).

**Soch:** "singular value" → $\sqrt{\lambda(A^TA)}$.

**Solution:**
1. $A^TA=\begin{pmatrix}9+1&9-1\\9-1&9+1\end{pmatrix}=\begin{pmatrix}10&8\\8&10\end{pmatrix}$.
2. trace $20$, det $100-64=36$: $\lambda^2-20\lambda+36=(\lambda-18)(\lambda-2)$.
3. $\sigma_1=\sqrt{18}=3\sqrt2\approx4.24$.
4. Check: $\sigma_1\sigma_2=\sqrt{36}=6=|\det A|=|3+3|$ ✓.

**Galti kahan hoti hai:** $A$ ke eigenvalues nikaal lena: trace $4$, det $6$, $\lambda^2-4\lambda+6=0$ ke roots complex aate hain — confusion. Ya square root bhool kar $18$ likhna.

**Example 6 (MSQ, hard):** $u=(2,1,2)^T$, $v=(1,-1,1,1)^T$, $A=uv^T$ ($3\times4$). Kaunse sahi?
(A) $\operatorname{rank}A=1$
(B) $\|A\|_2=6$
(C) $\sum_{i,j}a_{ij}^2=36$
(D) $A$ ke singular values $3$ aur $2$ hain.

**Soch:** rank one → ek hi non-zero $\sigma=\|u\|\|v\|$.

**Solution:**
1. Har column $u$ ka multiple → (A) ✓.
2. $\|u\|=\sqrt{4+1+4}=3$, $\|v\|=\sqrt{1+1+1+1}=2$, $\sigma_1=6$, baaki $0$.
3. (B) $\|A\|_2=\sigma_1=6$ ✓.
4. (C) $\|A\|_F^2=\sigma_1^2=36$ ✓ (direct: $\sum u_i^2\sum v_j^2=9\cdot4$).
5. (D) ✗ — $\|u\|$ aur $\|v\|$ alag singular values nahi, unka product ek singular value hai.

Answer **(A), (B), (C)**.

**Galti kahan hoti hai:** (D) — $\|u\|,\|v\|$ ko do singular values maan lena. Ya $v^Tu$ jaisa kuch nikalna (yahan $A$ square bhi nahi, eigenvalue ka sawal hi nahi).

## Confusions clear karo

**Q:** LU me $L$ ke andar multiplier $+l$ jaata hai ya $-l$?
**A:** $+l$. Elimination me $R_i\to R_i-lR_j$ kiya; $A=LU$ me $L$ ulta kaam karta hai (wapas jodta hai), isliye $L$ me $+l$.

**Q:** Kya har invertible matrix ka LU hota hai?
**A:** Bina row swap ke nahi (jaise $\begin{pmatrix}0&1\\1&0\end{pmatrix}$). Row swap allowed ho to haan: $PA=LU$ hamesha milta hai.

**Q:** Singular values aur eigenvalues me farak?
**A:** Eigenvalues: $Av=\lambda v$, same direction (sirf square matrix, complex/negative ho sakte hain). Singular values: $Av=\sigma u$, input–output directions alag, $\sigma\ge0$, har shape ke matrix ke liye. Sirf symmetric PSD me dono same.

**Q:** $A^TA$ lun ya $AA^T$?
**A:** Dono se same non-zero $\sigma^2$ milte hain. Jo chhota matrix ho woh lo ($3\times2$ $A$ ke liye $A^TA$ $2\times2$ hai).

**Q:** $3\times3$ matrix ke kitne singular values hote hain agar rank 2 hai?
**A:** Teen ($\min(m,n)$), jinme ek $0$. Rank = non-zero waale = 2.

**Q:** $\|A\|_2$ aur $\|A\|_F$ me kaunsa bada?
**A:** $\|A\|_F=\sqrt{\sum\sigma_i^2}\ge\sigma_1=\|A\|_2$. Barabar tab jab rank one ho.

## Khud try karo

**1.** $A=\begin{pmatrix}4&2\\2&5\end{pmatrix}$ ka LU: $l_{21}$ aur $u_{22}$?

<details><summary>Answer dekho</summary>

$l_{21}=2/4=0.5$, $u_{22}=5-0.5\cdot2=4$. Check: $\det=20-4=16=4\cdot4$ ✓.

</details>

**2.** $L=\begin{pmatrix}1&0&0\\3&1&0\\2&-1&1\end{pmatrix}$, $U=\begin{pmatrix}1&2&0\\0&2&1\\0&0&5\end{pmatrix}$. $A=LU$ ka $(3,2)$ entry aur $\det A$?

<details><summary>Answer dekho</summary>

Row 3 of $L$ · column 2 of $U$ $=2\cdot2+(-1)\cdot2+1\cdot0=4-2+0=2$. $\det A=1\cdot2\cdot5=10$.

</details>

**3.** $A=\begin{pmatrix}0&2\\0&0\end{pmatrix}$ ke eigenvalues aur singular values?

<details><summary>Answer dekho</summary>

Triangular, eigenvalues $0,0$. $A^TA=\begin{pmatrix}0&0\\0&4\end{pmatrix}$, eigenvalues $0,4$, to $\sigma=2,0$. Rank $1$.

</details>

**4.** $3\times3$ $A$ ke singular values $4,2,0$. $\operatorname{rank}A$, $\|A\|_F^2$, $\|A\|_2$, $|\det A|$?

<details><summary>Answer dekho</summary>

Rank $2$; $\|A\|_F^2=16+4+0=20$; $\|A\|_2=4$; $|\det A|=4\cdot2\cdot0=0$.

</details>

**5.** Symmetric $A$ ke eigenvalues $3,-5,1$. Singular values (bade se chhote)?

<details><summary>Answer dekho</summary>

$\sigma=|\lambda|$: $5,3,1$.

</details>

## Ek page me
- $A=LU$: $L$ unit lower (multipliers $l_{ij}=$ entry/pivot), $U$ = elimination ke baad ka upper triangular.
- $2\times2$: $l_{21}=a_{21}/a_{11}$, $u_{22}=a_{22}-l_{21}a_{12}$ (ghatao, copy mat karo).
- $3\times3$ me $l_{32}$ *updated* row se.
- $(LU)_{ij}=\sum_kl_{ik}u_{kj}$ — saare terms, signs ke saath.
- LU bina swap: har pivot $\ne0$ (leading minors $\ne0$); warna $PA=LU$. Singular matrix ka bhi LU ho sakta hai.
- $\det A=\prod u_{ii}$; $Ax=b$: $Ly=b$ forward, $Ux=y$ backward.
- SVD $A=U\Sigma V^T$, $U,V$ orthogonal, $\sigma_1\ge\sigma_2\ge\cdots\ge0$; $Av_i=\sigma_iu_i$.
- $\sigma_i=\sqrt{\lambda_i(A^TA)}$; $AA^T$ ke non-zero eigenvalues same.
- rank $=$ non-zero $\sigma$ ki ginti; $\|A\|_2=\sigma_1$; $\|A\|_F^2=\sum a_{ij}^2=\sum\sigma_i^2$; square: $|\det A|=\prod\sigma_i$.
- $2\times2$: $\sigma_1\sigma_2=|\det A|$, $\sigma_1^2+\sigma_2^2=\sum a_{ij}^2$.
- $uv^T$: $\sigma_1=\|u\|\|v\|$, baaki $0$. Symmetric: $\sigma=|\lambda|$; symmetric PSD: $\sigma=\lambda$.

Revision ke liye **Short note** tab dekho.
