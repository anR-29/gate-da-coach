# Orthogonality, projections and quadratic forms

> **Time:** ~40 min · **Pehle aana chahiye:** dot product, transpose, inverse, eigenvalues (Eigenvalues lesson), determinant · **Day:** 19, 21

## Ye topic kyun?
Data Science ka sabse common kaam hai "best approximation" dhoondhna — linear regression bhi asal me $b$ ko columns ke space par **project** karna hai. Orthogonal matrices woh transformations hain jo lengths nahi badalti (rotation, reflection), aur quadratic forms $x^TAx$ batate hain ki koi function "katori" (minimum wala) hai ya "ghode ki kaathi" (saddle). GATE DA me projection matrix ke properties, orthogonal matrix ke det/eigenvalues, definiteness test aur Rayleigh quotient ke max/min — 1–2 marks ke MCQ/MSQ/NAT — aate hain.

## Picture se samjho

Ek line (direction $a$) aur ek vector $x$ socho. $x$ ki "parchhai" line par kahan girti hai agar roshni line ke bilkul perpendicular aaye?

<figure class="fig">
<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="200" x2="300" y2="200" style="stroke:var(--muted)" stroke-width="1"/>
<line x1="40" y1="200" x2="40" y2="20" style="stroke:var(--muted)" stroke-width="1"/>
<line x1="40" y1="200" x2="290" y2="75" style="stroke:var(--muted)" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="250" y="80" font-size="12" fill="currentColor">line of a</text>
<line x1="40" y1="200" x2="120" y2="160" style="stroke:var(--info)" stroke-width="3"/>
<text x="95" y="185" font-size="12" fill="currentColor">a = (2,1)</text>
<line x1="40" y1="200" x2="160" y2="40" style="stroke:var(--good)" stroke-width="2.5"/>
<text x="120" y="38" font-size="12" fill="currentColor">x = (3,4)</text>
<line x1="40" y1="200" x2="200" y2="120" style="stroke:var(--mark)" stroke-width="3"/>
<text x="205" y="135" font-size="12" fill="currentColor">p = Px = (4,2)</text>
<line x1="200" y1="120" x2="160" y2="40" style="stroke:var(--bad)" stroke-width="2" stroke-dasharray="4 3"/>
<text x="188" y="72" font-size="12" fill="currentColor">x − p = (−1,2)</text>
<polyline points="191,124.5 186.6,115.5 195.5,111.1" style="fill:none;stroke:currentColor" stroke-width="1"/>
</svg>
<figcaption>x ka projection p line par woh point hai jahan se x tak ki doori (lal dashed) line ke perpendicular hai.</figcaption>
</figure>

Dhyan do: $p$ line par $x$ ka sabse nazdeek point hai, aur "error" $x-p$ line ke bilkul perpendicular (90°) hai. Projection ki poori theory isi ek baat se nikalti hai: **error ⊥ jis space par project kar rahe ho**. Yahan $(x-p)\cdot a=(-1)(2)+(2)(1)=0$.

Quadratic forms ke liye doosri picture: $Q(x,y)$ ki contour lines (jahan $Q$ constant hai) ka shape batata hai ki matrix kis type ka hai.

<figure class="fig">
<svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="60" cy="70" rx="15" ry="10" style="fill:none;stroke:var(--good)" stroke-width="1.5"/>
<ellipse cx="60" cy="70" rx="30" ry="20" style="fill:none;stroke:var(--good)" stroke-width="1.5"/>
<ellipse cx="60" cy="70" rx="45" ry="30" style="fill:none;stroke:var(--good)" stroke-width="1.5"/>
<circle cx="60" cy="70" r="2" fill="currentColor"/>
<line x1="125" y1="25" x2="215" y2="115" style="stroke:var(--muted)" stroke-dasharray="3 3" stroke-width="1"/>
<line x1="125" y1="115" x2="215" y2="25" style="stroke:var(--muted)" stroke-dasharray="3 3" stroke-width="1"/>
<path d="M 215 30 Q 175 70 215 110" style="fill:none;stroke:var(--good)" stroke-width="1.5"/>
<path d="M 125 30 Q 165 70 125 110" style="fill:none;stroke:var(--good)" stroke-width="1.5"/>
<path d="M 130 25 Q 170 65 210 25" style="fill:none;stroke:var(--bad)" stroke-width="1.5"/>
<path d="M 130 115 Q 170 75 210 115" style="fill:none;stroke:var(--bad)" stroke-width="1.5"/>
<line x1="245" y1="25" x2="245" y2="115" style="stroke:var(--good)" stroke-width="1.5"/>
<line x1="265" y1="25" x2="265" y2="115" style="stroke:var(--good)" stroke-width="1.5"/>
<line x1="280" y1="25" x2="280" y2="115" style="stroke:var(--mark)" stroke-width="2"/>
<line x1="295" y1="25" x2="295" y2="115" style="stroke:var(--good)" stroke-width="1.5"/>
<line x1="315" y1="25" x2="315" y2="115" style="stroke:var(--good)" stroke-width="1.5"/>
<text x="60" y="135" font-size="11" text-anchor="middle" fill="currentColor">PD: x² + y²</text>
<text x="60" y="150" font-size="10" text-anchor="middle" fill="currentColor">katori, sirf 0 par 0</text>
<text x="170" y="135" font-size="11" text-anchor="middle" fill="currentColor">Indefinite: x² − y²</text>
<text x="170" y="150" font-size="10" text-anchor="middle" fill="currentColor">kahin +, kahin −</text>
<text x="280" y="135" font-size="11" text-anchor="middle" fill="currentColor">PSD: x²</text>
<text x="280" y="150" font-size="10" text-anchor="middle" fill="currentColor">poori line par 0</text>
</svg>
<figcaption>Contours: PD me band ellipses, indefinite me hyperbolas (hara = positive, lal = negative), PSD me parallel lines (beech ki line par Q = 0).</figcaption>
</figure>

Dhyan do: PD form har non-zero vector par positive hai — origin ek unique minimum hai. Indefinite me kuch directions me upar jaata hai, kuch me neeche (saddle). PSD me ek poori direction aisi hai jahan form $0$ hai (yahan $y$-axis wali direction, jahan $x=0$).

## Concept step-by-step

### 1. Dot product, length, orthogonal
**Idea:** $a^Tx=a_1x_1+\cdots+a_nx_n$ (dot product). Length $\|x\|=\sqrt{x^Tx}$. Agar $a^Tx=0$ to $a$ aur $x$ perpendicular (orthogonal) hain.

**Example:** $(1,2,2)$ ki length $\sqrt{1+4+4}=3$. $(2,1)\cdot(-1,2)=-2+2=0$, to perpendicular.

**Dhyan do:** $\|x\|^2=x^Tx$ (square ke saath, bina root). Projection formulas me yahi aata hai.

### 2. Line par projection
**Idea:** $p=ca$ (line par koi point). Error $x-ca$ ko $a$ ke perpendicular rakho:
$$a^T(x-ca)=0\Rightarrow c=\frac{a^Tx}{a^Ta}.$$
To
$$Px=\frac{a^Tx}{a^Ta}\,a,\qquad P=\frac{aa^T}{a^Ta}.$$
($aa^T$ ek $n\times n$ matrix hai; $a^Ta$ ek number.)

**Example:** $a=(2,1)$, $x=(3,4)$: $a^Tx=6+4=10$, $a^Ta=5$, $c=2$, $p=(4,2)$. Matrix: $P=\frac15\begin{pmatrix}4&2\\2&1\end{pmatrix}$, aur $P(3,4)=\frac15(12+8,\,6+4)=(4,2)$. ✓

**Dhyan do:** denominator $a^Ta=\|a\|^2$ hai, $\|a\|$ nahi. Check: agar $a$ ko double kar do to $P$ nahi badalna chahiye (line wahi hai) — $\frac{(2a)(2a)^T}{(2a)^T(2a)}=\frac{4aa^T}{4a^Ta}$ ✓. $\|a\|$ se divide karte to ye test fail hota.

### 3. Column space par projection (least squares)
**Idea:** $A$ ($m\times k$, independent columns) ke columns ek plane/subspace span karte hain. $b$ ka projection $p=A\hat x$ hai, aur error $b-A\hat x$ *har column* ke perpendicular:
$$A^T(b-A\hat x)=0\Rightarrow A^TA\hat x=A^Tb\Rightarrow\hat x=(A^TA)^{-1}A^Tb.$$
$$P=A(A^TA)^{-1}A^T.$$
Yahi linear regression ka "normal equation" hai.

**Example:** $A=\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}$, $b=(1,2,0)$.
1. $A^TA=\begin{pmatrix}2&1\\1&2\end{pmatrix}$, $A^Tb=(1+0,\ 2+0)=(1,2)$.
2. $(A^TA)^{-1}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$, $\hat x=\frac13(2-2,\ -1+4)=(0,1)$.
3. $p=A\hat x=(0,1,1)$, error $b-p=(1,1,-1)$.
4. Check: $(1,0,1)\cdot(1,1,-1)=0$ ✓, $(0,1,1)\cdot(1,1,-1)=0$ ✓. $\|b-p\|^2=3$.

**Dhyan do:** $(A^TA)^{-1}=A^{-1}(A^T)^{-1}$ mat likho — $A$ square nahi hai, $A^{-1}$ exist hi nahi karta. Galti se karoge to $P=I$ aa jaayega (jo sirf square invertible $A$ ke liye sahi hai).

### 4. Orthogonal projection ki properties
Orthogonal projection matrix $\iff P^2=P$ **aur** $P^T=P$.
- $P^2=P$: ek baar project kiya, dobara karne se kuch nahi badalta.
- Eigenvalues sirf $0$ ya $1$: $Pv=\lambda v\Rightarrow P^2v=\lambda^2v$, aur $P^2v=Pv=\lambda v$, to $\lambda^2=\lambda$. (Space ke vectors: $\lambda=1$; perpendicular vectors: $\lambda=0$.)
- $\operatorname{rank}P=\operatorname{tr}P$: trace = eigenvalues ka sum = kitne $1$ hain = rank. $A(A^TA)^{-1}A^T$ ke liye $\operatorname{tr}=\operatorname{tr}((A^TA)^{-1}A^TA)=\operatorname{tr}(I_k)=k$.
- $I-P$ bhi projection hai — complement (perpendicular space) par. $P(I-P)=P-P^2=0$.

**Example:** $P=\begin{pmatrix}0.5&0.5\\0.5&0.5\end{pmatrix}$ (line $(1,1)$ par): $P^2=P$, symmetric, trace $1$ = rank $1$.

**Dhyan do:** sirf $P^2=P$ (idempotent) kaafi nahi. $\begin{pmatrix}1&1\\0&0\end{pmatrix}$ idempotent hai par symmetric nahi — ye "tircha" (oblique) projection hai, orthogonal nahi.

### 5. Orthogonal matrices
**Definition:** $Q^TQ=I$ (square $Q$), yani columns unit length aur aapas me perpendicular (orthonormal). Isliye $Q^{-1}=Q^T$.

Properties aur *kyun*:
- Length same: $\|Qx\|^2=x^TQ^TQx=x^Tx$.
- $\det Q=\pm1$: $\det(Q^T)\det Q=1\Rightarrow(\det Q)^2=1$.
- Har eigenvalue $|\lambda|=1$: $\|Qv\|=|\lambda|\|v\|$ aur $\|Qv\|=\|v\|$. Real eigenvalues sirf $\pm1$; rotation ke complex ($\cos\theta\pm i\sin\theta$).
- $Q_1Q_2$, $Q^{-1}$, $Q^T$ bhi orthogonal. Lekin $Q_1+Q_2$ generally nahi (jaise $I+I=2I$, lengths double).

**Example:** $Q=\begin{pmatrix}0.6&-0.8\\0.8&0.6\end{pmatrix}$: columns ki length $\sqrt{0.36+0.64}=1$, dot product $-0.48+0.48=0$. $\det=0.36+0.64=1$ (rotation). $4\times4$ orthogonal $Q$ ke liye $|\det(3Q)|=3^4\cdot1=81$.

**Dhyan do:** "orthogonal $\Rightarrow$ eigenvalues $\pm1$" galat hai. $90°$ rotation $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ ke eigenvalues $\pm i$ hain.

### 6. Reflection (Householder) $H=I-2uu^T$
$\|u\|=1$ lo. $Hu=u-2u(u^Tu)=-u$ (eigenvalue $-1$). Jo $w\perp u$: $Hw=w$ (eigenvalue $1$, $n-1$ baar). To $H$ ek mirror hai jo $u$ ko ulta karta hai.
- $H^T=H$ (symmetric), $H^TH=H^2=I$ (orthogonal), $\det H=-1$, $\operatorname{tr}H=n-2$.

**Example:** $u=\frac13(1,2,2)$ ($\|u\|=1$ ✓), $n=3$: eigenvalues $-1,1,1$, trace $1$, det $-1$.

**Dhyan do:** $u$ unit hona chahiye. Agar nahi, to $H=I-2\frac{uu^T}{u^Tu}$ use karo. Aur $H$ projection nahi hai: $H^2=I\ne H$.

### 7. Quadratic form aur uska symmetric matrix
**Idea:** $Q(x)=x^TAx$, jahan $A$ symmetric. $2$ variables me
$$ax^2+bxy+cy^2=\begin{pmatrix}x&y\end{pmatrix}\begin{pmatrix}a&b/2\\b/2&c\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}.$$
**Kyun $b/2$:** multiply karo to cross term do baar aata hai: $a_{12}xy+a_{21}yx=2a_{12}xy$. To $2a_{12}=b$.

**Example:** $3x^2+4xy+2y^2\to\begin{pmatrix}3&2\\2&2\end{pmatrix}$. Teen variables: $x^2+2y^2+3z^2+4xy-2yz\to\begin{pmatrix}1&2&0\\2&2&-1\\0&-1&3\end{pmatrix}$.

**Dhyan do:** off-diagonal me poora coefficient (yahan $4$) daal diya to form double count hoga aur definiteness ka answer badal sakta hai.

### 8. Definiteness
| Type | Matlab ($x\ne0$) | Eigenvalues |
|---|---|---|
| Positive definite (PD) | $x^TAx>0$ | sab $>0$ |
| Positive semidefinite (PSD) | $x^TAx\ge0$ | sab $\ge0$ |
| Negative definite | $x^TAx<0$ | sab $<0$ |
| Indefinite | kabhi $+$, kabhi $-$ | dono signs |

**Kyun eigenvalues:** symmetric $A$ ke orthonormal eigenvectors $v_i$ hote hain. $x=\sum c_iv_i$ likho, to $x^TAx=\sum\lambda_ic_i^2$. Sab $\lambda_i>0$ to ye positive, aur agar koi $\lambda_j<0$ to $x=v_j$ par negative.

**Leading minors (Sylvester):** PD $\iff$ upar-baayein (top-left) $1\times1,2\times2,\ldots$ determinants sab $>0$.
$2\times2$ shortcut: PD $\iff a_{11}>0$ aur $\det>0$. $\det<0\Rightarrow$ indefinite (eigenvalues ka product negative). $\det=0$ aur diagonal $\ge0\Rightarrow$ PSD, PD nahi.

**Example:** $\begin{pmatrix}3&2\\2&2\end{pmatrix}$: $3>0$, $\det=6-4=2>0$ → PD. $\begin{pmatrix}1&3\\3&2\end{pmatrix}$: $\det=2-9=-7<0$ → indefinite. $\begin{pmatrix}1&2\\2&4\end{pmatrix}$: $\det=0$ → PSD (eigenvalues $0,5$).

**Dhyan do:** "sab entries positive $\Rightarrow$ PD" galat (upar wala $\begin{pmatrix}1&3\\3&2\end{pmatrix}$ dekho). "Negative off-diagonal $\Rightarrow$ PD nahi" bhi galat: $\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$ PD hai (eigenvalues $1,3$). Aur PSD ke liye leading minors $\ge0$ kaafi nahi: $\begin{pmatrix}0&0\\0&-1\end{pmatrix}$ ke leading minors $0,0$ hain par ye PSD nahi.

### 9. Gram matrix $A^TA$
$x^T(A^TA)x=(Ax)^T(Ax)=\|Ax\|^2\ge0$. To $A^TA$ hamesha symmetric PSD hai.
PD kab? $\|Ax\|^2=0\iff Ax=0$. Agar columns independent hain to $Ax=0$ sirf $x=0$ par, to PD. Columns dependent $\Rightarrow$ PSD par PD nahi.

**Example:** $A$ ke columns $(1,2,0)$ aur $(2,4,0)$ (doosra = 2×pehla): $A^TA=\begin{pmatrix}5&10\\10&20\end{pmatrix}$, $\det=100-100=0$ → PSD, PD nahi.

**Dhyan do:** $m<n$ ho ($A$ chauda) to $n$ columns $\mathbb R^m$ me independent ho hi nahi sakte, to $A^TA$ ($n\times n$) kabhi PD nahi.

### 10. Rayleigh quotient: $x^TAx$ ka max/min
Symmetric $A$ ke liye
$$\lambda_{\min}\le R(x)=\frac{x^TAx}{x^Tx}\le\lambda_{\max}.$$
**Kyun:** $x=\sum c_iv_i$: $R(x)=\frac{\sum\lambda_ic_i^2}{\sum c_i^2}$ — eigenvalues ka weighted average, to sabse chhote aur sabse bade ke beech. Max $x=v_{\max}$ par, min $x=v_{\min}$ par.
- $\|x\|=1$ par: $\max x^TAx=\lambda_{\max}$, $\min=\lambda_{\min}$.
- $\|x\|=r$ par: $r^2\lambda_{\max}$ aur $r^2\lambda_{\min}$.
- $a_{ii}=e_i^TAe_i$, to har diagonal entry $[\lambda_{\min},\lambda_{\max}]$ me hoti hai.

**Example:** $A=\begin{pmatrix}3&1\\1&3\end{pmatrix}$: eigenvalues $4,2$. Unit vectors par max $4$ (at $(1,1)/\sqrt2$), min $2$.

**Dhyan do:** max = $\lambda_{\max}$ sign ke saath, largest $|\lambda|$ nahi. $\operatorname{diag}(2,-3,1)$ ka max $2$ hai, $3$ nahi. Aur max largest diagonal entry bhi nahi (upar example me diagonal $3$, max $4$).

## Solved examples

**Example 1 (NAT, easy):** $a=(2,1,2)^T$ ki line par $x=(1,3,2)^T$ ka orthogonal projection $p$ hai. $\|x-p\|^2$ nikalo.

**Soch:** line par projection → $\frac{a^Tx}{a^Ta}a$.

**Solution:**
1. $a^Tx=2+3+4=9$, $a^Ta=4+1+4=9$.
2. $p=\frac99a=(2,1,2)$.
3. $x-p=(-1,2,0)$; check $a\cdot(x-p)=-2+2+0=0$ ✓.
4. $\|x-p\|^2=1+4+0=5$.

**Galti kahan hoti hai:** $\|a\|=3$ se divide karna: $p=\frac93a=(6,3,6)$, phir $\|x-p\|^2=25+0+16=41$. Error perpendicular check fail hota — isse pakdo.

**Example 2 (MCQ, easy-medium):** Quadratic form $Q(x,y)=2x^2+5xy+4y^2$ hai:
(A) positive definite (B) positive semidefinite, PD nahi (C) indefinite (D) negative definite

**Soch:** symmetric matrix banao (cross term half), phir $2\times2$ test.

**Solution:**
1. $A=\begin{pmatrix}2&2.5\\2.5&4\end{pmatrix}$.
2. $a_{11}=2>0$, $\det=8-6.25=1.75>0$.
3. PD. Answer **(A)**.

**Galti kahan hoti hai:** $5$ ko half nahi kiya: $\begin{pmatrix}2&5\\5&4\end{pmatrix}$, $\det=8-25=-17<0$ → "indefinite" (C). Ek missing factor of 2 ne answer palat diya.

**Example 3 (MSQ, medium):** $u=\frac13(2,1,2)^T$ aur $H=I_3-2uu^T$. Kaunse sahi hain?
(A) $H$ symmetric hai.
(B) $\det H=-1$.
(C) $\operatorname{tr}H=1$.
(D) $H^2=H$.

**Soch:** $\|u\|=\frac13\sqrt{4+1+4}=1$, to ye Householder reflection hai.

**Solution:**
1. (A) $(uu^T)^T=uu^T$, to $H^T=H$. ✓
2. Eigenvalues: $Hu=-u$, aur $u$ ke perpendicular plane par $1,1$. To $-1,1,1$.
3. (B) $\det=(-1)(1)(1)=-1$. ✓
4. (C) $\operatorname{tr}=-1+1+1=1$. ✓ (Ya seedha: $\operatorname{tr}I-2\operatorname{tr}(uu^T)=3-2u^Tu=3-2=1$.)
5. (D) $H^2=I-4uu^T+4u(u^Tu)u^T=I\ne H$. ✗

Answer **(A), (B), (C)**.

**Galti kahan hoti hai:** (D) ko tick karna kyunki "symmetric + $uu^T$ wala" dekh kar projection samajh liya. Projection $uu^T$ hai; $I-2uu^T$ reflection hai, jiska square $I$ hai.

**Example 4 (NAT, medium):** Points $(1,1),(2,2),(3,2)$ par line $y=c+mx$ ko least squares se fit karo. Residual ka squared length $\|b-A\hat x\|^2$ nikalo (2 decimal tak).

**Soch:** "least squares" → $A^TA\hat x=A^Tb$, $A$ ke columns $\mathbf 1$ aur $x$-values.

**Solution:**
1. $A=\begin{pmatrix}1&1\\1&2\\1&3\end{pmatrix}$, $b=(1,2,2)$.
2. $A^TA=\begin{pmatrix}3&6\\6&14\end{pmatrix}$, $A^Tb=(1+2+2,\ 1+4+6)=(5,11)$.
3. $\det(A^TA)=42-36=6$, $(A^TA)^{-1}=\frac16\begin{pmatrix}14&-6\\-6&3\end{pmatrix}$.
4. $\hat x=\frac16(70-66,\ -30+33)=\left(\frac23,\frac12\right)$: $c=\frac23$, $m=\frac12$.
5. $p=A\hat x=\left(\frac76,\frac{10}6,\frac{13}6\right)$, $b-p=\left(-\frac16,\frac26,-\frac16\right)$.
6. Check ⊥: $\sum=0$ ✓, $(1,2,3)\cdot(-1,2,-1)=0$ ✓.
7. $\|b-p\|^2=\frac{1+4+1}{36}=\frac16\approx0.17$.

**Galti kahan hoti hai:** $(A^TA)^{-1}A^T$ ko $A^{-1}$ samajh kar "exact fit, residual $0$" bolna. 3 points ek line par nahi hain, to residual $0$ ho hi nahi sakta.

**Example 5 (NAT, hard):** $A=\begin{pmatrix}2&1&0\\1&2&1\\0&1&k\end{pmatrix}$. $k$ ki woh value nikalo jis par $A$ PSD hai par PD nahi.

**Soch:** leading minors; pehle do positive hain, to teesra (det) decide karega.

**Solution:**
1. $D_1=2>0$, $D_2=4-1=3>0$.
2. $D_3=\det A=2(2k-1)-1(k-0)+0=3k-2$.
3. PD $\iff3k-2>0\iff k>\frac23$.
4. $k=\frac23$ par $\det=0$, to $0$ ek eigenvalue hai. Top-left $2\times2$ block PD hai (eigenvalues $1,3$), isliye baaki do eigenvalues positive rehte hain → PSD, PD nahi.
5. $k=\frac23\approx0.67$.

**Galti kahan hoti hai:** $\det A$ expand karte waqt beech wale term ka sign bhoolna: $2(2k-1)+k=5k-2$ → $k=0.4$. Ya sirf $k>0$ (diagonal positive) ko PD condition maan lena.

**Example 6 (NAT, medium):** $3x^2-4xy+6y^2$ ka minimum nikalo, condition $x^2+y^2=4$.

**Soch:** "quadratic form ka max/min on circle" → Rayleigh: $r^2\lambda_{\min}$.

**Solution:**
1. $A=\begin{pmatrix}3&-2\\-2&6\end{pmatrix}$.
2. trace $9$, $\det=18-4=14$: $\lambda^2-9\lambda+14=(\lambda-2)(\lambda-7)$, eigenvalues $2,7$.
3. $r^2=4$, min $=4\cdot2=8$ (aur max $=28$).

**Galti kahan hoti hai:** $r^2$ bhool kar $2$ likhna (woh unit circle ka answer hai). Ya smallest diagonal entry $3$ lekar $12$ likhna.

## Confusions clear karo

**Q:** Orthogonal matrix aur orthogonal projection me farak?
**A:** Orthogonal matrix $Q^TQ=I$: kuch "khota" nahi, lengths same, invertible. Orthogonal projection $P^2=P=P^T$: perpendicular part ko gira deta hai, generally invertible nahi (sirf $P=I$ ho tab). Dono ka sirf naam milta hai.

**Q:** Projection formula me $a^Ta$ se divide kyun, $\|a\|$ se kyun nahi?
**A:** $\frac{a^Tx}{\|a\|}$ to "length of shadow" hai; vector banane ke liye usse unit vector $\frac{a}{\|a\|}$ se multiply karte ho, to total $\frac{a^Tx}{\|a\|^2}a$.

**Q:** Quadratic form ka matrix unique kyun nahi lagta?
**A:** $x^TAx$ ko bahut saari matrices de sakti hain (cross term ko kaise bhi baanto). Symmetric wala unique hai, aur saare tests (eigenvalue, minors) usi par lagte hain. Isliye hamesha half-half karo.

**Q:** PD check ke liye eigenvalues nikalun ya minors?
**A:** $2\times2$/$3\times3$ me leading minors fast hain. Eigenvalues tab jab woh already diye hon ya max/min bhi chahiye.

**Q:** $A^TA$ aur $AA^T$ dono PSD hain?
**A:** Haan, dono. $x^TAA^Tx=\|A^Tx\|^2\ge0$. PD hone ki condition alag: $A^TA$ ke liye columns independent, $AA^T$ ke liye rows independent.

**Q:** Rayleigh me max $\lambda_{\max}$ hai — kya $|\lambda|$ ka max?
**A:** Nahi, sign ke saath. Eigenvalues $-5,1,3$ ho to max $3$, min $-5$.

**Q:** Reflection $H$ ke eigenvalues $-1$ aur $1$ hain — kya ye projection ki tarah $0/1$ nahi hone chahiye?
**A:** Nahi. Projection idempotent ($P^2=P\Rightarrow\lambda\in\{0,1\}$); reflection involution ($H^2=I\Rightarrow\lambda\in\{1,-1\}$).

## Khud try karo

**1.** $Q=\begin{pmatrix}0.6&-0.8\\0.8&0.6\end{pmatrix}$ ke eigenvalues kya hain aur unka modulus?

<details><summary>Answer dekho</summary>

trace $1.2$, det $1$: $\lambda^2-1.2\lambda+1=0$, $\lambda=0.6\pm0.8i$. $|\lambda|=\sqrt{0.36+0.64}=1$. Real eigenvalue nahi, kyunki ye rotation hai.

</details>

**2.** In me se orthogonal projection kaunsa hai: $P_1=\begin{pmatrix}1&1\\0&0\end{pmatrix}$, $P_2=\begin{pmatrix}0.5&0.5\\0.5&0.5\end{pmatrix}$? Uska rank?

<details><summary>Answer dekho</summary>

Dono idempotent hain, par sirf $P_2$ symmetric hai. To $P_2$. Rank $=$ trace $=1$.

</details>

**3.** $x^2+4y^2+z^2-2xy+6yz$ ka symmetric matrix likho aur definiteness batao.

<details><summary>Answer dekho</summary>

$A=\begin{pmatrix}1&-1&0\\-1&4&3\\0&3&1\end{pmatrix}$. Minors: $1>0$, $4-1=3>0$, $\det=1(4-9)-(-1)(-1-0)+0=-5-1=-6<0$. PD nahi. $a_{11}=1>0$ hai to koi eigenvalue positive hai, aur det negative hai to koi negative bhi. **Indefinite.**

</details>

**4.** $A$ ke columns $(1,2,0)$ aur $(2,4,0)$ hain. $A^TA$ PD hai?

<details><summary>Answer dekho</summary>

Columns dependent (doosra $=2\times$ pehla). $A^TA=\begin{pmatrix}5&10\\10&20\end{pmatrix}$, $\det=0$. Sirf PSD, PD nahi.

</details>

**5.** $A=\operatorname{diag}(-5,1,3)$. Unit vectors par $x^TAx$ ka max aur min?

<details><summary>Answer dekho</summary>

Max $=\lambda_{\max}=3$, min $=\lambda_{\min}=-5$. (Max $5$ nahi.)

</details>

## Ek page me
- Line par projection: $Px=\frac{a^Tx}{a^Ta}a$, $P=\frac{aa^T}{a^Ta}$ — denominator $\|a\|^2$.
- Column space par: $P=A(A^TA)^{-1}A^T$; normal equation $A^TA\hat x=A^Tb$; error har column ke ⊥.
- Orthogonal projection $\iff P^2=P=P^T$; eigenvalues $0/1$; rank = trace; $I-P$ complement par.
- Idempotent akela kaafi nahi — symmetric bhi chahiye.
- Orthogonal $Q^TQ=I$: length same, $\det=\pm1$, $|\lambda|=1$ (rotation me complex); product/inverse orthogonal, sum nahi.
- $H=I-2uu^T$ ($\|u\|=1$): symmetric, orthogonal, eigenvalues $-1,1,\ldots,1$, trace $n-2$, $\det=-1$.
- Quadratic form: cross term ka half off-diagonal me.
- PD $\iff$ eigenvalues $>0$ $\iff$ leading minors $>0$; $2\times2$: $a_{11}>0$, $\det>0$; $\det<0\Rightarrow$ indefinite.
- $A^TA$ hamesha PSD; PD $\iff$ columns independent.
- $\lambda_{\min}\le\frac{x^TAx}{x^Tx}\le\lambda_{\max}$; $\|x\|=r$ par $r^2\lambda$; diagonal entries bhi is range me.

Revision ke liye **Short note** tab dekho.
