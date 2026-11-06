# Matrices, partitions and special matrices

> **Time:** ~40 min · **Pehle aana chahiye:** matrix multiplication, $2\times2$ aur $3\times3$ determinant, $2\times2$ inverse ka formula; eigenvalue ka basic idea ($Av=\lambda v$) madad karega · **Day:** 16, 21

## Ye topic kyun?

GATE DA me matrix ke sawaal aksar "ye identity kis rule se aayi?" type hote hain: $(AB)^{-1}$ kya hai, $(2A)^{-1}$ ki entry kya, block matrix ka determinant, aur special matrices (symmetric, skew, orthogonal, idempotent, nilpotent) ke baare me kaunse statements "hamesha sahi" hain. Ye 1–2 mark ke MSQ/NAT hote hain jinme calculation kam aur rule ki samajh zyada chahiye. ML me covariance matrix (symmetric), projection/hat matrix (idempotent) aur rotation (orthogonal) yahi cheezein hain.

## Picture se samjho

Matrix multiplication ko ek "pipe joint" jaisa socho: $A$ ka output size $B$ ke input size se match hona chahiye. $A$ ($m\times n$) aur $B$ ($n\times p$) ka product tabhi banta hai jab **andar wale** dono $n$ barabar hon; result ka size **bahar wale** numbers dete hain: $m\times p$.

<figure class="fig">
<svg viewBox="0 0 460 175" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="40" width="60" height="90" fill="none" stroke="currentColor" stroke-width="1.5"/>
<rect x="20" y="70" width="60" height="14" style="fill:var(--good)" opacity="0.5"/>
<text x="50" y="30" text-anchor="middle" font-size="13" fill="currentColor">A: m×n</text>
<text x="95" y="90" text-anchor="middle" font-size="18" fill="currentColor">×</text>
<rect x="110" y="55" width="110" height="60" fill="none" stroke="currentColor" stroke-width="1.5"/>
<rect x="160" y="55" width="14" height="60" style="fill:var(--info)" opacity="0.5"/>
<text x="165" y="45" text-anchor="middle" font-size="13" fill="currentColor">B: n×p</text>
<text x="238" y="90" text-anchor="middle" font-size="18" fill="currentColor">=</text>
<rect x="255" y="40" width="110" height="90" fill="none" stroke="currentColor" stroke-width="1.5"/>
<rect x="305" y="70" width="14" height="14" style="fill:var(--mark)"/>
<text x="310" y="30" text-anchor="middle" font-size="13" fill="currentColor">AB: m×p</text>
<text x="375" y="72" font-size="11" fill="currentColor">(i, j) entry =</text>
<text x="375" y="86" font-size="11" fill="currentColor">row i · col j</text>
<text x="230" y="155" text-anchor="middle" font-size="12" fill="currentColor">andar wale n match hone chahiye; bahar wale m, p result ka size</text>
</svg>
<figcaption>Hari row (A ki i-th row) aur neeli column (B ki j-th column) ka dot product result ki (i, j) entry deta hai. Isliye A ki row ki length = B ki column ki length = n.</figcaption>
</figure>

Isi picture se $(AB)^T=B^TA^T$ samjho: $AB$ $m\times p$ hai, to $(AB)^T$ $p\times m$. $B^T$ ($p\times n$) aur $A^T$ ($n\times m$) ka product hi $p\times m$ deta hai — order ulta hona hi padega, warna sizes match hi nahi karte.

Ab **block (partitioned) matrix**: ek bada matrix chhote matrices (blocks) ka bana hai. Blocks ko numbers ki tarah treat karo — bas order mat badlo.

<figure class="fig">
<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="100" width="80" height="80" style="fill:var(--muted)" opacity="0.25"/>
<rect x="30" y="20" width="160" height="160" fill="none" stroke="currentColor" stroke-width="1.5"/>
<line x1="70" y1="20" x2="70" y2="180" style="stroke:var(--muted)"/>
<line x1="150" y1="20" x2="150" y2="180" style="stroke:var(--muted)"/>
<line x1="30" y1="60" x2="190" y2="60" style="stroke:var(--muted)"/>
<line x1="30" y1="140" x2="190" y2="140" style="stroke:var(--muted)"/>
<line x1="110" y1="20" x2="110" y2="180" stroke="currentColor" stroke-width="3"/>
<line x1="30" y1="100" x2="190" y2="100" stroke="currentColor" stroke-width="3"/>
<text x="70" y="66" text-anchor="middle" font-size="22" style="fill:var(--info)">A</text>
<text x="150" y="66" text-anchor="middle" font-size="22" fill="currentColor">B</text>
<text x="70" y="146" text-anchor="middle" font-size="22" fill="currentColor">0</text>
<text x="150" y="146" text-anchor="middle" font-size="22" style="fill:var(--info)">D</text>
<text x="215" y="60" font-size="13" fill="currentColor">det M = det A · det D</text>
<text x="215" y="95" font-size="13" fill="currentColor">M⁻¹ diagonal: A⁻¹ aur D⁻¹</text>
<text x="215" y="115" font-size="13" fill="currentColor">M⁻¹ corner: −A⁻¹BD⁻¹</text>
<text x="215" y="150" font-size="13" style="fill:var(--bad)">B ka sandwich: A⁻¹ left,</text>
<text x="215" y="168" font-size="13" style="fill:var(--bad)">D⁻¹ right (order fixed)</text>
</svg>
<figcaption>4×4 matrix M ko 2×2 blocks me toda. Neeche-left block zero hai (block upper-triangular), to det sirf diagonal blocks se aata hai.</figcaption>
</figure>

Teesri picture: **idempotent** ($A^2=A$) matrix ko "projection" (parchhai) socho. Ek point ko line pe project karo; ab us projected point ko dobara project karo — wo hilega hi nahi, kyunki wo pehle se line pe hai.

<figure class="fig">
<svg viewBox="0 0 380 215" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="188" x2="360" y2="52" style="stroke:var(--info)" stroke-width="2.5"/>
<circle cx="40" cy="180" r="3" fill="currentColor"/>
<text x="40" y="200" text-anchor="middle" font-size="12" fill="currentColor">0</text>
<circle cx="150" cy="60" r="5" fill="currentColor"/>
<text x="140" y="52" text-anchor="end" font-size="13" fill="currentColor">x</text>
<line x1="150" y1="60" x2="176" y2="125" stroke="currentColor" stroke-dasharray="5 3"/>
<polyline points="172,116 182,112 185,121" fill="none" stroke="currentColor"/>
<circle cx="176" cy="125" r="5" style="fill:var(--good)"/>
<text x="190" y="145" font-size="13" style="fill:var(--good)">Ax (line pe)</text>
<text x="190" y="163" font-size="12" fill="currentColor">A(Ax) = Ax</text>
<text x="300" y="45" font-size="12" style="fill:var(--info)">line</text>
<text x="190" y="25" text-anchor="middle" font-size="12" fill="currentColor">A² = A: dobara project karo, kuch nahi badalta</text>
</svg>
<figcaption>Projection matrix A har point x ko line pe gira deta hai. Jo pehle se line pe hai uspe A ka koi asar nahi, isliye A(Ax) = Ax, yaani A² = A.</figcaption>
</figure>

Is picture se eigenvalues bhi dikhti hain: line pe pade vectors $Av=1\cdot v$ (eigenvalue 1), aur line ke perpendicular vectors $Av=0$ (eigenvalue 0). Bas yahi do values possible hain.

## Concept step-by-step

### 1. Product ke chaar nazariye

**Idea:** $A$ ($m\times n$) ki columns $a_1,\dots,a_n$ aur $B$ ($n\times p$) ki rows $b_1^T,\dots,b_n^T$ ho to $AB$ ko chaar tarah dekh sakte ho:
1. Entry: $(AB)_{ij}=(\text{row } i\text{ of }A)\cdot(\text{col } j\text{ of }B)$.
2. Column: $AB$ ki $j$-th column $=A\times(B$ ki $j$-th column$)$.
3. Row: $AB$ ki $i$-th row $=(A$ ki $i$-th row$)\times B$.
4. Outer products ka sum: $AB=\sum_{i=1}^n a_i\,b_i^T$ (column of $A$ × row of $B$, har ek $m\times p$ matrix).

**Example:** $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, $B=\begin{pmatrix}5&6\\7&8\end{pmatrix}$. $AB=\begin{pmatrix}19&22\\43&50\end{pmatrix}$. Outer products: $\begin{pmatrix}1\\3\end{pmatrix}(5\ 6)=\begin{pmatrix}5&6\\15&18\end{pmatrix}$, $\begin{pmatrix}2\\4\end{pmatrix}(7\ 8)=\begin{pmatrix}14&16\\28&32\end{pmatrix}$; sum $=\begin{pmatrix}19&22\\43&50\end{pmatrix}$ ✓.

**Dhyan do:** $\sum b_ia_i^T$ (ulta order) galat hai — wo shape bhi match nahi karega jab $m\neq p$.

### 2. Transpose ke rules

$$(A^T)^T=A,\quad (A+B)^T=A^T+B^T,\quad (cA)^T=cA^T,\quad (AB)^T=B^TA^T.$$
**Kyun order ulta?** $(AB)^T$ ki $(i,j)$ entry $=(AB)_{ji}=$ ($A$ ki row $j$)·($B$ ki col $i$) $=$ ($B^T$ ki row $i$)·($A^T$ ki col $j$) $=(B^TA^T)_{ij}$. Teen ke liye: $(ABC)^T=C^TB^TA^T$.

**Example:** $(AB^T)^T=(B^T)^TA^T=BA^T$.

**Dhyan do:** $(AB)^T=A^TB^T$ — sirf tab sahi jab sizes aur commutation dono saath dein; general me galat.

### 3. Inverse ke rules

$A$ invertible (square, $\det A\neq0$) ho to $A^{-1}$ wo matrix hai jisse $AA^{-1}=A^{-1}A=I$.

- $2\times2$: $\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1}=\dfrac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$. Example: $\begin{pmatrix}4&7\\2&6\end{pmatrix}^{-1}=\frac1{10}\begin{pmatrix}6&-7\\-2&4\end{pmatrix}$.
- $(AB)^{-1}=B^{-1}A^{-1}$. **Kyun?** $(AB)(B^{-1}A^{-1})=A(BB^{-1})A^{-1}=AA^{-1}=I$. (Pehle moze, phir joote pehnte ho; utaarte waqt pehle joote, phir moze.)
- $(cA)^{-1}=\frac1cA^{-1}$. Check: $(cA)(\frac1cA^{-1})=I$.
- $(A^T)^{-1}=(A^{-1})^T$. Check: $A^T(A^{-1})^T=(A^{-1}A)^T=I^T=I$.
- $(A^k)^{-1}=(A^{-1})^k$; $A$ symmetric ho to $A^{-1}$ bhi symmetric.
- $\det(A^{-1})=1/\det A$.

**Sum ka koi rule nahi:** $(A+B)^{-1}\neq A^{-1}+B^{-1}$. $A=B=I$: LHS $=(2I)^{-1}=\frac12I$, RHS $=2I$.

**Example:** $A^{-1}=\begin{pmatrix}4&2\\2&6\end{pmatrix}$ diya hai. $(2A)^{-1}=\frac12A^{-1}=\begin{pmatrix}2&1\\1&3\end{pmatrix}$.

**Dhyan do:** $A$ ki entries $A^{-1}$ ki entries ke reciprocal nahi hoti. Poora matrix invert hota hai.

### 4. Polynomial identity se inverse

**Idea:** Agar $A^2-sA+pI=0$ aur $p\neq0$, to $A(sI-A)=pI$, yaani
$$A^{-1}=\frac1p(sI-A).$$
**Example:** $A^2-5A+6I=0$ → $A(5I-A)=6I$ → $A^{-1}=\frac16(5I-A)$. Ye $A=\operatorname{diag}(2,3)$ pe bhi sach hai: $A^{-1}=\operatorname{diag}(\tfrac12,\tfrac13)$ aur $\frac16(5-2)=\frac12$, $\frac16(5-3)=\frac13$ ✓.

**Dhyan do:** $(A-2I)(A-3I)=0$ se "$A=2I$ ya $A=3I$" nikalna galat — matrices me do non-zero matrices ka product zero ho sakta hai ($\operatorname{diag}(2,3)$ dekho).

### 5. Symmetric aur skew-symmetric

**Definitions:** symmetric $A^T=A$; skew-symmetric $A^T=-A$.

**Facts aur kyun:**
- Har square $A=\underbrace{\tfrac12(A+A^T)}_{\text{sym}}+\underbrace{\tfrac12(A-A^T)}_{\text{skew}}$. $(A+A^T)^T=A^T+A$ ✓; $(A-A^T)^T=A^T-A=-(A-A^T)$ ✓.
- $A^TA$ aur $AA^T$ hamesha symmetric: $(A^TA)^T=A^T(A^T)^T=A^TA$.
- Skew ka diagonal 0: $a_{ii}=-a_{ii}\Rightarrow a_{ii}=0$.
- Skew, **odd** $n$: $\det A=\det A^T=\det(-A)=(-1)^n\det A=-\det A\Rightarrow\det A=0$.
- Skew $A$ ho to $A^2$ symmetric: $(A^2)^T=(A^T)^2=(-A)^2=A^2$.
- Symmetric $A,B$: $(AB)^T=B^TA^T=BA$. To $AB$ symmetric **sirf tab** jab $AB=BA$. Counterexample: $\begin{pmatrix}1&0\\0&2\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix}=\begin{pmatrix}0&1\\2&0\end{pmatrix}$ — symmetric nahi.
- Eigenvalues: symmetric (real) → real eigenvalues, eigenvectors orthogonal choose ho sakte hain, hamesha diagonalizable. Skew (real) → eigenvalues 0 ya purely imaginary.

**Example:** $A=\begin{pmatrix}1&4\\2&3\end{pmatrix}=\begin{pmatrix}1&3\\3&3\end{pmatrix}+\begin{pmatrix}0&1\\-1&0\end{pmatrix}$.

**Dhyan do:** Even $n$ ke skew matrix ka det zero hona zaroori nahi: $\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ ka det 1.

### 6. Orthogonal matrix

**Idea:** $Q^TQ=I$ — columns ek dusre ke perpendicular aur unit length (orthonormal). Matlab $Q^{-1}=Q^T$ (inverse free me!).
- $\det Q=\pm1$: $\det(Q^TQ)=(\det Q)^2=1$.
- Length preserve: $\lVert Qx\rVert^2=x^TQ^TQx=x^Tx=\lVert x\rVert^2$. Rotation aur reflection isi type ke hain.

**Example:** rotation $\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}$, det $=\cos^2\theta+\sin^2\theta=1$.

**Dhyan do:** Orthogonal $\neq$ idempotent. Rotation ko do baar lagao to aur ghoomta hai ($Q^2\neq Q$), jabki projection dobara lagane pe same rehta hai.

### 7. Idempotent ($A^2=A$)

**Idea:** Projection (figure 3).
- **Eigenvalues 0 ya 1:** $Av=\lambda v\Rightarrow A^2v=\lambda^2v$, par $A^2v=Av=\lambda v$. To $\lambda^2=\lambda\Rightarrow\lambda\in\{0,1\}$.
- **rank = trace:** idempotent hamesha diagonalizable hai, eigenvalues 0/1; rank = 1's ki ginti = eigenvalues ka sum = trace.
- $I-A$ bhi idempotent: $(I-A)^2=I-2A+A^2=I-A$.
- **Singular unless $A=I$:** $A^2=A\Rightarrow A(A-I)=0$. Agar $A^{-1}$ exist kare to multiply karke $A-I=0$.
- $2A$ idempotent **nahi** (jab $A\neq0$): $(2A)^2=4A\neq2A$.
- Symmetric hona zaroori nahi: $\begin{pmatrix}1&1\\0&0\end{pmatrix}^2=\begin{pmatrix}1&1\\0&0\end{pmatrix}$, par symmetric nahi (ye "oblique" projection hai; symmetric idempotent = orthogonal projection).
- $2\times2$ idempotent ($\neq0,I$): eigenvalues $0,1$ → **trace 1, det 0**. Ulta bhi: trace 1, det 0 ho to Cayley–Hamilton se $A^2-A=0$.

**Example:** $3\times3$ idempotent, trace 2 → rank 2, eigenvalues $1,1,0$, det 0.

**Dhyan do:** Invertible idempotent sirf $I$ hai; baaki har idempotent singular hai (eigenvalue 0 hai).

### 8. Nilpotent ($N^k=0$)

**Idea:** Kuch powers ke baad zero ho jaata hai. Example: $N=\begin{pmatrix}0&1&0\\0&0&1\\0&0&0\end{pmatrix}$, $N^2\neq0$, $N^3=0$.
- **Saare eigenvalues 0:** $Nv=\lambda v\Rightarrow0=N^kv=\lambda^kv\Rightarrow\lambda=0$.
- Isliye $\operatorname{tr}N=0$, $\det N=0$.
- **$I+N$ invertible:** eigenvalues $1+0=1$, koi zero nahi. Formula: $(I+N)^{-1}=I-N+N^2-\dots\pm N^{k-1}$ (series $N^k$ pe ruk jaati hai).
- **Non-zero nilpotent kabhi symmetric nahi:** symmetric diagonalizable hai; saare eigenvalues 0 → $N=P\,0\,P^{-1}=0$.
- **Rank zero zaroori nahi:** upar wala $N$ rank 2 ka hai. Eigenvalues 0 hone se matrix 0 nahi ban jaata.

**Dhyan do:** "Saare eigenvalues 0 ⇒ rank 0" — galat (sirf diagonalizable matrices ke liye sach).

### 9. Block matrices

**Idea:** Blocks ko scalars ki tarah multiply karo, par (a) har block product ka size match hona chahiye, (b) order fixed.
$$\begin{pmatrix}A&B\\C&D\end{pmatrix}\begin{pmatrix}E&F\\G&H\end{pmatrix}=\begin{pmatrix}AE+BG&AF+BH\\CE+DG&CF+DH\end{pmatrix}.$$

**Block upper-triangular:**
- $\det\begin{pmatrix}A&B\\0&D\end{pmatrix}=\det A\cdot\det D$ (A, D square).
- Inverse: maan lo $\begin{pmatrix}A&B\\0&D\end{pmatrix}\begin{pmatrix}A^{-1}&X\\0&D^{-1}\end{pmatrix}=\begin{pmatrix}I&AX+BD^{-1}\\0&I\end{pmatrix}$. Isko $I$ banana hai → $AX=-BD^{-1}\Rightarrow X=-A^{-1}BD^{-1}$.
- Power: $\begin{pmatrix}I&B\\0&I\end{pmatrix}^2=\begin{pmatrix}I&2B\\0&I\end{pmatrix}$, aur generally $\begin{pmatrix}I&B\\0&I\end{pmatrix}^k=\begin{pmatrix}I&kB\\0&I\end{pmatrix}$.

**Example:** $B=\begin{pmatrix}2&1\\3&5\end{pmatrix}$, $M=\begin{pmatrix}I_2&B\\0&I_2\end{pmatrix}$. $M^3$ ka top-right block $3B=\begin{pmatrix}6&3\\9&15\end{pmatrix}$.

**Dhyan do:** $-D^{-1}BA^{-1}$ likhna galat; agar $A$ $p\times p$ aur $D$ $q\times q$ ($p\neq q$) to ye product define hi nahi hota.

## Solved examples

**Example 1 (MCQ, easy):** $A$ $2\times4$, $B$ $4\times3$, $C$ $3\times2$ hai. Kaunsa product **define nahi** hai?
(A) $ABC$ (B) $BCA$ (C) $CAB$ (D) $BAC$

**Soch:** Har adjacent pair me andar wale numbers match karo.

**Solution:**
1. (A) $(2\times4)(4\times3)(3\times2)$ ✓ → $2\times2$.
2. (B) $(4\times3)(3\times2)(2\times4)$ ✓ → $4\times4$.
3. (C) $(3\times2)(2\times4)(4\times3)$ ✓ → $3\times3$.
4. (D) $(4\times3)(2\times4)$: $3\neq2$ ✗.

**Answer: (D).**

**Galti kahan hoti hai:** sirf pehle aur aakhri numbers dekhna, ya rows/columns ulta padhna (B ko $3\times4$ samajhna).

**Example 2 (NAT, medium):** $A$ ek $2\times2$ matrix hai, $A^{-1}=\begin{pmatrix}6&3\\0&9\end{pmatrix}$. $(3A^T)^{-1}$ ki $(2,1)$ entry?

**Soch:** Scalar aur transpose dono → $(cA^T)^{-1}=\frac1c(A^{-1})^T$.

**Solution:**
1. $(3A^T)^{-1}=\frac13(A^T)^{-1}=\frac13(A^{-1})^T$.
2. $(A^{-1})^T=\begin{pmatrix}6&0\\3&9\end{pmatrix}$.
3. $\frac13$ se: $\begin{pmatrix}2&0\\1&3\end{pmatrix}$. $(2,1)$ entry $=1$.

**Answer: 1.**

**Galti kahan hoti hai:** transpose bhool gaye → $(2,1)$ entry $0$. Ya $(cA)^{-1}=cA^{-1}$ maan kar $3\times3=9$.

**Example 3 (MSQ, medium):** Square matrix $A$ satisfy karta hai $A^2-5A+6I=0$. Kaunse sahi hain?
(A) $A$ invertible hai (B) $A^{-1}=\frac16(5I-A)$ (C) $A$ ya to $2I$ hai ya $3I$ (D) $A^{-1}=\frac16(A-5I)$

**Soch:** Constant term non-zero → identity ko $A(\cdot)=I$ form me likho.

**Solution:**
1. $A^2-5A=-6I\Rightarrow A(A-5I)=-6I\Rightarrow A\cdot\frac16(5I-A)=I$.
2. To $A$ invertible, $A^{-1}=\frac16(5I-A)$ → (A), (B) sahi.
3. (D) sign ulta → galat.
4. (C) galat: $A=\operatorname{diag}(2,3)$ bhi identity satisfy karta hai.

**Answer: (A), (B).**

**Galti kahan hoti hai:** $-6I$ ko $6I$ likh kar sign galat — (D). Aur scalar algebra ki tarah factor karke (C) tick karna.

**Example 4 (NAT, medium):** $\det\begin{pmatrix}3&1&4&2\\2&2&0&5\\0&0&1&3\\0&0&1&5\end{pmatrix}$?

**Soch:** Neeche-left $2\times2$ block zero → block upper-triangular.

**Solution:**
1. $A=\begin{pmatrix}3&1\\2&2\end{pmatrix}$, $\det A=6-2=4$.
2. $D=\begin{pmatrix}1&3\\1&5\end{pmatrix}$, $\det D=5-3=2$.
3. $\det M=4\times2=8$. (Top-right block ka koi role nahi.)

**Answer: 8.**

**Galti kahan hoti hai:** top-right block $B$ ko bhi include karke $\det A\det D-\det B\cdot\det 0$ jaisa kuch banana, ya diagonal entries ka product $3\cdot2\cdot1\cdot5=30$ le lena (matrix triangular nahi hai).

**Example 5 (NAT, hard):** $A=\begin{pmatrix}2&k\\-1&-1\end{pmatrix}$ ke liye $k$ ki kis value pe $A^2=A$?

**Soch:** $2\times2$ idempotent ($\neq0,I$) ⇔ trace 1 aur det 0.

**Solution:**
1. Trace $=2+(-1)=1$ ✓ (pehle se).
2. $\det A=2(-1)-k(-1)=-2+k$. Zero → $k=2$.
3. Check: $A=\begin{pmatrix}2&2\\-1&-1\end{pmatrix}$, $A^2=\begin{pmatrix}4-2&4-2\\-2+1&-2+1\end{pmatrix}=\begin{pmatrix}2&2\\-1&-1\end{pmatrix}=A$ ✓.

**Answer: 2.**

**Galti kahan hoti hai:** det me $-k\cdot(-1)$ ka sign galat karke $-2-k=0\Rightarrow k=-2$.

**Example 6 (MSQ, hard):** $N$ ek non-zero real $3\times3$ matrix hai, $N^3=0$. Kaunse sahi hain?
(A) $\operatorname{tr}N=0$ (B) $N$ symmetric ho sakta hai (C) $I-N$ invertible hai (D) $\operatorname{rank}N=0$

**Soch:** Nilpotent → saare eigenvalues 0. Har statement eigenvalues se check karo.

**Solution:**
1. (A) trace = eigenvalues ka sum $=0$ → sahi.
2. (B) symmetric hota to diagonalizable, eigenvalues 0 → $N=0$, contradiction → galat.
3. (C) $I-N$ ke eigenvalues $1-0=1$ → koi zero nahi → invertible. ($(I-N)^{-1}=I+N+N^2$.) → sahi.
4. (D) $N\neq0$ to rank $\ge1$ → galat.

**Answer: (A), (C).**

**Galti kahan hoti hai:** (D) tick karna: "saare eigenvalues 0 to matrix 0" — ye sirf diagonalizable ke liye sach hai; $\begin{pmatrix}0&1\\0&0\end{pmatrix}$ rank 1 ka hai.

## Confusions clear karo

**Q:** $(AB)^{-1}$ me order kyun ulta hota hai?
**A:** Jo operation baad me laga, use pehle undo karna padta hai. $AB$ me pehle $B$ laga (vector pe), phir $A$. Wapas jaane ke liye pehle $A^{-1}$, phir $B^{-1}$: $B^{-1}A^{-1}$.

**Q:** $(cA)^{-1}$ me $c$ multiply hota hai ya divide?
**A:** Divide: $\frac1cA^{-1}$. Check karo: $(cA)(\frac1cA^{-1})=I$.

**Q:** Idempotent aur orthogonal me farak?
**A:** Idempotent ($A^2=A$): projection, eigenvalues 0/1, usually singular. Orthogonal ($Q^TQ=I$): rotation/reflection, length preserve, hamesha invertible, $|\det|=1$. Dono ek saath sirf $I$.

**Q:** Kya idempotent hamesha symmetric hota hai?
**A:** Nahi. $\begin{pmatrix}1&1\\0&0\end{pmatrix}$. Symmetric + idempotent = orthogonal projection (jaise regression ka hat matrix).

**Q:** Skew-symmetric ka det kab zero?
**A:** Odd $n$ pe hamesha. Even $n$ pe zaroori nahi ($\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ ka det 1).

**Q:** Block matrix ka det hamesha $\det A\det D-\det B\det C$ hota hai kya?
**A:** Nahi. Wo formula sirf tab jab blocks scalars hon. Block matrices me $\det A\det D$ sirf tab jab $B$ ya $C$ zero block ho.

**Q:** Do symmetric matrices ka product symmetric kyun nahi?
**A:** $(AB)^T=BA$. Ye $AB$ ke barabar tabhi hai jab $A,B$ commute karein.

## Khud try karo

**1.** $B=\begin{pmatrix}2&1\\3&5\end{pmatrix}$, $M=\begin{pmatrix}I_2&B\\0&I_2\end{pmatrix}$. $M^3$ ki $(2,3)$ entry?

<details><summary>Answer dekho</summary>

$M^3=\begin{pmatrix}I&3B\\0&I\end{pmatrix}$. Row 2, column 3 top-right block me hai: $3B$ ki $(2,1)$ entry $=3\times3=9$.

</details>

**2.** $5\times5$ real skew-symmetric matrix ka determinant?

<details><summary>Answer dekho</summary>

$\det A=\det A^T=\det(-A)=(-1)^5\det A=-\det A$ → $\det A=0$.

</details>

**3.** $A=\begin{pmatrix}1&4\\2&3\end{pmatrix}$ ko symmetric + skew-symmetric me todo.

<details><summary>Answer dekho</summary>

$\frac12(A+A^T)=\begin{pmatrix}1&3\\3&3\end{pmatrix}$, $\frac12(A-A^T)=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$. Jod $=A$ ✓.

</details>

**4.** $A,B$ invertible. $(A^TB)^{-1}$ ko $A^{-1}$ aur $B^{-1}$ me likho.

<details><summary>Answer dekho</summary>

$(A^TB)^{-1}=B^{-1}(A^T)^{-1}=B^{-1}(A^{-1})^T$.

</details>

**5.** $4\times4$ idempotent $A$ ka trace 2 hai. Rank, eigenvalues aur det?

<details><summary>Answer dekho</summary>

Rank $=$ trace $=2$. Eigenvalues $1,1,0,0$. $\det=0$ (product of eigenvalues).

</details>

## Ek page me

- $(m\times n)(n\times p)=m\times p$; andar wale match karo. $AB=\sum_i a_ib_i^T$.
- $(AB)^T=B^TA^T$, $(AB)^{-1}=B^{-1}A^{-1}$ — order ulta.
- $(cA)^{-1}=\frac1cA^{-1}$, $(A^T)^{-1}=(A^{-1})^T$; $(A+B)^{-1}$ ka koi rule nahi.
- $A^2-sA+pI=0$, $p\neq0$ → $A^{-1}=\frac1p(sI-A)$.
- $A=\frac12(A+A^T)+\frac12(A-A^T)$; $A^TA$ symmetric; sym·sym symmetric iff commute.
- Skew: diagonal 0, odd $n$ pe $\det=0$, $A^2$ symmetric.
- Orthogonal: $Q^{-1}=Q^T$, $\det=\pm1$, length preserve.
- Idempotent: eigenvalues 0/1, rank = trace, $I-A$ idempotent, singular unless $I$, symmetric zaroori nahi.
- $2\times2$ idempotent ($\neq0,I$): trace 1, det 0.
- Nilpotent: eigenvalues 0, tr = det = 0, $I\pm N$ invertible, non-zero ho to symmetric nahi, rank 0 zaroori nahi.
- $\det\begin{pmatrix}A&B\\0&D\end{pmatrix}=\det A\det D$; inverse ka corner $-A^{-1}BD^{-1}$.
- $\begin{pmatrix}I&B\\0&I\end{pmatrix}^k=\begin{pmatrix}I&kB\\0&I\end{pmatrix}$.

Revision ke liye **Short note** tab dekho.
