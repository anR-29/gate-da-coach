# Vector spaces, subspaces, basis and independence

> **Time:** ~35 min · **Pehle aana chahiye:** vectors ko add karna aur scalar se multiply karna, $3\times3$ determinant nikalna, simple row operations · **Day:** 15, 21

## Ye topic kyun?

Linear algebra ki poori building isi foundation pe khadi hai: kaunsa set "space" kehlaane layak hai, kitni directions sach me alag hain (independence), aur ek space ko describe karne ke liye minimum kitne vectors chahiye (basis, dimension). ML me features ka redundant hona (ek feature dusron ka combination) yahi "dependence" hai. GATE DA me yahan se MSQ (kaunsa set subspace hai, kaunsa statement sahi), NAT (dimension, $k$ ki value jahan vectors dependent hon) aur MCQ aate hain — 1 aur 2 mark dono.

## Picture se samjho

$\mathbb{R}^2$ (ek plane) socho. Usme origin se guzarti ek seedhi line lo. Line ke kisi bhi do arrows ko jodo — result usi line pe rehta hai. Kisi arrow ko 3 se ya $-2$ se multiply karo — phir bhi usi line pe. Is line se "bahar nikalna" impossible hai. Aisi "band duniya" ko **subspace** kehte hain.

Ab wahi line thodi upar khiska do (origin se nahi guzarti). Ab do points jodo — result line se bahar chala jaata hai.

<figure class="fig">
<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="170" x2="400" y2="170" style="stroke:var(--muted)"/>
<line x1="150" y1="240" x2="150" y2="10" style="stroke:var(--muted)"/>
<text x="140" y="185" text-anchor="end" font-size="12" fill="currentColor">0</text>
<line x1="30" y1="230" x2="390" y2="50" style="stroke:var(--good)" stroke-width="2.5"/>
<text x="405" y="152" text-anchor="end" font-size="12" style="fill:var(--good)">W: 0 se guzarti (subspace)</text>
<line x1="30" y1="180" x2="370" y2="10" style="stroke:var(--bad)" stroke-width="2.5"/>
<text x="300" y="25" text-anchor="end" font-size="12" style="fill:var(--bad)">A: khiski hui line (affine)</text>
<line x1="150" y1="170" x2="110" y2="140" stroke="currentColor" stroke-width="1.5"/>
<circle cx="110" cy="140" r="4" fill="currentColor"/>
<text x="100" y="135" text-anchor="end" font-size="12" fill="currentColor">u</text>
<line x1="150" y1="170" x2="190" y2="100" stroke="currentColor" stroke-width="1.5"/>
<circle cx="190" cy="100" r="4" fill="currentColor"/>
<text x="198" y="112" font-size="12" fill="currentColor">v</text>
<line x1="150" y1="170" x2="150" y2="70" style="stroke:var(--mark)" stroke-width="2" stroke-dasharray="5 3"/>
<circle cx="150" cy="70" r="5" style="fill:var(--mark)"/>
<text x="140" y="66" text-anchor="end" font-size="12" style="fill:var(--mark)">u+v: A se bahar!</text>
<text x="210" y="225" font-size="11" fill="currentColor">u, v dono A pe hain, par u+v nahi</text>
</svg>
<figcaption>Origin se guzarti line (hari) addition aur scaling ke under band hai. Khiski hui line (laal) pe u aur v hain, par u+v line se bahar gir gaya — aur 0 bhi us line pe nahi.</figcaption>
</figure>

Notice karo: laal line "linear equation" se hi bani hai ($y=x/2+c$ jaisi), phir bhi subspace nahi. Asli test hai: **0 andar hai kya, aur jodne/scale karne pe bahar to nahi jaate?**

Dusri picture: independence. $\mathbb{R}^3$ me teen vectors $(1,0,0)$, $(0,1,0)$, $(1,1,0)$ lo. Koi do parallel nahi hain, phir bhi teesra pehle do ka jod hai — teeno ek hi plane ($z=0$) me pade hain.

<figure class="fig">
<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg">
<polygon points="60,180 200,180 200,60 60,60" style="fill:var(--info)" opacity="0.12"/>
<line x1="60" y1="180" x2="200" y2="180" style="stroke:var(--info)" stroke-width="2.5"/>
<polygon points="210,180 198,174 198,186" style="fill:var(--info)"/>
<text x="205" y="200" text-anchor="middle" font-size="12" fill="currentColor">v₁ = (1,0,0)</text>
<line x1="60" y1="180" x2="60" y2="60" style="stroke:var(--info)" stroke-width="2.5"/>
<polygon points="60,50 54,62 66,62" style="fill:var(--info)"/>
<text x="60" y="40" text-anchor="middle" font-size="12" fill="currentColor">v₂ = (0,1,0)</text>
<line x1="60" y1="180" x2="193" y2="67" style="stroke:var(--bad)" stroke-width="2.5"/>
<polygon points="200,60 186,64 194,73" style="fill:var(--bad)"/>
<text x="210" y="55" font-size="12" style="fill:var(--bad)">w = (1,1,0) = v₁ + v₂</text>
<line x1="200" y1="180" x2="200" y2="60" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<line x1="60" y1="60" x2="200" y2="60" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<text x="230" y="120" font-size="12" fill="currentColor">teeno z = 0 plane me</text>
<text x="230" y="138" font-size="12" fill="currentColor">→ span sirf 2-dim</text>
<text x="230" y="156" font-size="12" style="fill:var(--bad)">→ dependent</text>
</svg>
<figcaption>Koi do vectors parallel nahi, phir bhi w = v₁ + v₂. Teesra vector koi nayi direction nahi laaya, isliye set dependent hai aur span ka dimension 2 hai, 3 nahi.</figcaption>
</figure>

Independence ka matlab: har vector ek **nayi direction** laata hai. Jo vector pehle walon se ban sakta hai (multiple ya combination se), wo redundant hai.

## Concept step-by-step

### 1. Vector space aur linear combination

**Idea:** Vector space ek set hai jisme tum elements ko jod sakte ho aur scalar se multiply kar sakte ho, aur result usi set me rahe (saath me normal rules: $u+v=v+u$, zero vector exist karta hai, etc.). $\mathbb{R}^n$ sabse common hai, par polynomials ($P_2$ = degree $\le2$ wale polynomials) aur matrices bhi vector spaces hain — wahan "vector" ek polynomial ya matrix hai.

**Linear combination:** $c_1v_1+c_2v_2+\dots+c_kv_k$ (scalars $c_i$).

**Example:** $2(1,0,1)+3(0,1,1)=(2,3,5)$. Polynomial: $2(1+x)+(-1)(x^2)=2+2x-x^2$.

**Dhyan do:** "Vector" sirf arrow nahi hai. $2\times2$ matrices ka space bhi vector space hai, dimension 4.

### 2. Subspace test

**Idea:** $W\subseteq V$ subspace hai iff
1. $0\in W$, aur
2. $u,v\in W$ aur koi bhi scalar $c$ ho to $u+cv\in W$ (addition + scaling closure ek hi line me).

**Kyun 0 pehle?** Agar $W$ closed hai to $c=-1$, $v=u$ lene se $u-u=0\in W$ aana hi chahiye. To 0 na ho → turant "nahi". Ye sabse fast filter hai.

**Examples (sab $\mathbb{R}^3$ me):**
- $\{x+2y-z=0\}$: 0 andar ✓. Agar $u,v$ equation satisfy karein to $u+cv$ bhi karega (LHS linear hai: $0+c\cdot0=0$) ✓ → **subspace** (origin se guzarta plane).
- $\{x+y+z=1\}$: $(0,0,0)$ pe $0\neq1$ → **nahi**.
- $\{xy=0\}$: 0 andar ✓, par $(1,0,0)+(0,1,0)=(1,1,0)$ aur $1\cdot1\neq0$ → addition fail → **nahi**. (Product wali condition non-linear hai.)
- $\{x\ge0\}$: $(1,0,0)$ andar, par $(-1)\cdot(1,0,0)$ bahar → scaling fail → **nahi**.

**Polynomials/matrices me bhi same:**
- $\{p\in P_2: p(1)=0\}$ ✓ (agar $p(1)=q(1)=0$ to $(p+cq)(1)=0$).
- $\{p: p(0)=1\}$ ✗ (zero polynomial ka $p(0)=0$).
- $\{p:\deg p=2\text{ exactly}\}$ ✗ (zero polynomial degree 2 ka nahi; aur $(x^2+x)+(-x^2)=x$ degree 1).
- Invertible matrices ✗ (zero matrix invertible nahi). Symmetric matrices ✓.

**Dhyan do:** "Linear equations se defined hai" kaafi nahi. RHS non-zero ho to fail.

### 3. Hamesha subspace, kabhi subspace nahi

**Hamesha subspace:**
- $\operatorname{span}\{v_1,\dots,v_k\}$ = saare linear combinations. Do combinations ka jod bhi combination hai.
- Null space $\{x:Ax=0\}$: $A(u+cv)=Au+cAv=0$.
- Column space, row space, homogeneous linear conditions ka solution set.

**Kabhi nahi:**
- $\{x:Ax=b\}$ with $b\neq0$: $A0=0\neq b$, to 0 andar nahi. Ye "affine set" hai — subspace ko khiska diya.
- Inequalities ($x_1\ge0$, $\lVert x\rVert\le1$), products ($xy=0$), "exactly degree 2", "invertible".

**Example:** $W_k=\{(x,y,z):x+y=k,\ z=2x\}$. $k=0$ → subspace (line through 0). $k=3$ → line jo origin se nahi guzarti, subspace nahi.

**Dhyan do (patching trap):** $\{x:Ax=b\}\cup\{0\}$ bhi subspace nahi. Agar $Ax=b$ to $A(2x)=2b\neq b$ → $2x$ bahar.

### 4. Linear independence

**Idea:** $v_1,\dots,v_k$ **independent** hain agar
$$c_1v_1+\dots+c_kv_k=0\ \Rightarrow\ c_1=\dots=c_k=0.$$
Yaani zero banane ka sirf "trivial" tareeka hai. Agar koi non-zero $c$'s se 0 ban jaaye, to koi ek vector baakiyon ka combination hai → **dependent**.

**Test:** vectors ko columns bana kar matrix $M=[v_1\cdots v_k]$. Independent $\iff\operatorname{rank}M=k$. Square case ($n$ vectors $\mathbb{R}^n$ me): independent $\iff\det M\neq0$.

**Example:** $(1,1,0),(0,1,1),(1,0,1)$:
$$\det\begin{pmatrix}1&0&1\\1&1&0\\0&1&1\end{pmatrix}=1(1\cdot1-0\cdot1)-0+1(1\cdot1-1\cdot0)=1+1=2\neq0\ \Rightarrow\text{independent}.$$

**Free shortcuts:**
- $k>n$ vectors $\mathbb{R}^n$ me → hamesha dependent (rank $\le n<k$).
- Set me 0 vector → dependent ($1\cdot0=0$, non-trivial).
- Independent set ka har subset independent.
- $v_1,v_2$ independent aur $v_3\notin\operatorname{span}\{v_1,v_2\}$ → $\{v_1,v_2,v_3\}$ independent.

**Dhyan do:** "Koi do parallel nahi" $\not\Rightarrow$ independent (figure 2).

### 5. Independent vectors ke combinations

**Idea:** Agar $v_1,v_2,v_3$ independent hain aur naye vectors unke combinations hain, to naye vectors ki independence sirf **coefficient matrix** pe depend karti hai: invertible (det $\neq0$) → independent.

**Example:** $\{v_1-v_2,\ v_2-v_3,\ v_3-v_1\}$. Teeno ko jodo: $0$. To $1,1,1$ coefficients se zero bana → dependent. Coefficient matrix ka det:
$$\det\begin{pmatrix}1&-1&0\\0&1&-1\\-1&0&1\end{pmatrix}=0.$$
Jabki $\{v_1+v_2,\ v_2+v_3,\ v_3+v_1\}$ ka coefficient det $=2\neq0$ → independent.

**Dhyan do:** Pehle quick check: kya naye vectors ka koi simple jod/ghatao 0 deta hai? Aksar wahi trick hoti hai.

### 6. Basis aur dimension

**Idea:** **Basis** = aisa set jo independent bhi ho aur poore space ko span bhi kare. Har basis me vectors ki ginti same hoti hai — wahi **dimension** hai.

- $\dim\mathbb{R}^n=n$ (standard basis $e_1,\dots,e_n$).
- $\dim P_2=3$ (basis $1,x,x^2$).
- $\dim(2\times2\text{ matrices})=4$.

$n$-dim space me:
- Spanning set me kam se kam $n$ vectors; independent set me zyada se zyada $n$.
- **Theek $n$ vectors:** independent $\iff$ spanning $\iff$ basis (ek check kaafi).
- $W\subseteq V$ aur $\dim W=\dim V$ → $W=V$. (4-dim subspace of $\mathbb{R}^4$ = $\mathbb{R}^4$.)

**Dhyan do:** Spanning set $n$ se kam vectors ka nahi ho sakta.

### 7. Span ka dimension = pivots ki ginti

**Idea:** Vectors ko rows (ya columns) bana kar row reduce karo. Non-zero rows (pivots) ki ginti $=\dim\operatorname{span}$.

**Example:** $(1,0,1),(0,1,1),(1,1,2)$.
$$\begin{pmatrix}1&0&1\\0&1&1\\1&1&2\end{pmatrix}\xrightarrow{R_3-R_1}\begin{pmatrix}1&0&1\\0&1&1\\0&1&1\end{pmatrix}\xrightarrow{R_3-R_2}\begin{pmatrix}1&0&1\\0&1&1\\0&0&0\end{pmatrix}$$
2 pivots → dimension 2. (Teesra $=$ pehla $+$ dusra — multiple nahi, combination.)

**Dhyan do:** Sirf "koi row dusri ka multiple hai kya" mat dekho. Poora reduce karo; aur ek dependency hatane ke baad baaki ko phir check karo.

### 8. Solution set ka dimension

**Idea:** $\{x\in\mathbb{R}^n:Ax=0\}$ me har independent equation ek "degree of freedom" khatam karti hai:
$$\dim\{x:Ax=0\}=n-\operatorname{rank}A.$$

**Example:** $W=\{x\in\mathbb{R}^5:x_1+x_2+x_3=0,\ x_4=x_5\}$. Do independent equations → $\dim=5-2=3$. Basis: $x_2,x_3,x_5$ free; e.g. $(-1,1,0,0,0),(-1,0,1,0,0),(0,0,0,1,1)$.

**Dhyan do:** Dimension equations ki ginti nahi hai. Aur agar ek equation dusri ka multiple hai to wo count nahi hoti.

### 9. Matrix spaces ke dimensions

$n\times n$ matrices ka space: $n^2$. Sub-families:
- **Symmetric** ($A^T=A$): diagonal ($n$) + upar ka triangle free, neeche wala copy → $n+\frac{n(n-1)}2=\frac{n(n+1)}2$.
- **Skew-symmetric** ($A^T=-A$): diagonal zero hona chahiye ($a_{ii}=-a_{ii}$), sirf upar ka triangle free → $\frac{n(n-1)}2$.
- **Upper triangular:** diagonal + upar → $\frac{n(n+1)}2$.
- **Trace 0:** ek linear condition ($a_{11}+\dots+a_{nn}=0$) → $n^2-1$.
- **Diagonal:** $n$.

**Example ($n=3$):** symmetric 6, skew 3, upper-triangular 6, trace-0 8.

**Dhyan do:** Skew me diagonal free nahi hai — wahan $n(n+1)/2$ likhna galat.

### 10. Do subspaces: sum aur intersection

$$\dim(W_1+W_2)=\dim W_1+\dim W_2-\dim(W_1\cap W_2).$$
(Venn diagram jaisa: overlap do baar gina gaya, ek baar ghatao.) Kyunki $W_1+W_2\subseteq\mathbb{R}^n$, $\dim(W_1+W_2)\le n$, to
$$\dim(W_1\cap W_2)\ge\dim W_1+\dim W_2-n.$$

**Example:** $\mathbb{R}^5$ me $\dim W_1=3$, $\dim W_2=4$ → intersection $\ge3+4-5=2$.

**Dhyan do:** Do 2-dim planes $\mathbb{R}^3$ me hamesha kam se kam ek line share karte hain ($2+2-3=1$).

## Solved examples

**Example 1 (MSQ, easy):** $\mathbb{R}^3$ ke kaunse subsets subspaces hain?
(A) $\{(x,y,z):x-y+2z=0\}$ (B) $\{(x,y,z):x+y=2\}$ (C) $\{(x,y,z):x^2=y^2\}$ (D) $\operatorname{span}\{(1,2,3)\}$

**Soch:** Pehle 0 check, phir closure. Non-linear condition dikhe to counterexample dhoondo.

**Solution:**
1. (A) homogeneous linear equation → 0 andar, closure ✓ → subspace.
2. (B) $0+0=0\neq2$ → 0 nahi → nahi.
3. (C) $(1,1,0)$ aur $(1,-1,0)$ dono andar ($1=1$). Jod $(2,0,0)$: $4\neq0$ → nahi.
4. (D) span hamesha subspace → haan.

**Answer: (A), (D).**

**Galti kahan hoti hai:** (C) tick karna kyunki 0 andar hai aur scaling bhi chalti hai — addition check karna bhool gaye.

**Example 2 (NAT, easy):** $k$ ki kis value pe $(1,2,1)$, $(0,1,k)$, $(1,3,2)$ linearly dependent hain?

**Soch:** 3 vectors $\mathbb{R}^3$ me → square case → $\det=0$.

**Solution:**
1. Columns me rakho: $M=\begin{pmatrix}1&0&1\\2&1&3\\1&k&2\end{pmatrix}$.
2. $\det M=1(1\cdot2-3k)-0+1(2k-1\cdot1)=2-3k+2k-1=1-k$.
3. $1-k=0\Rightarrow k=1$.
4. Check: $k=1$ pe $(1,2,1)+(0,1,1)=(1,3,2)$ ✓.

**Answer: 1.**

**Galti kahan hoti hai:** cofactor expansion me beech wale term ka sign ($-$) bhool jaana; ya $\det\neq0$ wali condition (independence) solve kar dena.

**Example 3 (NAT, medium):** $\mathbb{R}^4$ me $(1,1,0,2)$, $(2,1,1,3)$, $(0,1,-1,1)$, $(3,3,0,6)$ ka span — dimension?

**Soch:** "Dimension of span" → row reduce, pivots gino.

**Solution:**
1. $R_2-2R_1=(0,-1,1,-1)$; $R_4-3R_1=(0,0,0,0)$.
2. Ab rows: $(1,1,0,2)$, $(0,-1,1,-1)$, $(0,1,-1,1)$, $0$.
3. $R_3+R_2=(0,0,0,0)$.
4. Do non-zero rows → dimension 2.

**Answer: 2.**

**Galti kahan hoti hai:** sirf $(3,3,0,6)=3\times(1,1,0,2)$ dekh kar ruk gaye → 3. Teesra vector $2v_1-v_2$ hai (combination), multiple nahi — wo bhi hatta hai.

**Example 4 (MCQ, medium):** $v_1,v_2,v_3$ independent hain. Kaunsa set **dependent** hai?
(A) $\{v_1+v_2,\ v_2+v_3,\ v_1-v_3\}$ (B) $\{v_1,\ v_1+2v_2,\ v_3\}$ (C) $\{v_1+v_2,\ v_2+v_3,\ v_3+v_1\}$ (D) $\{v_1+v_2+v_3,\ v_2,\ v_3\}$

**Soch:** Naye vectors = combinations → koi simple relation ya coefficient det.

**Solution:**
1. (A) $(v_1+v_2)-(v_2+v_3)=v_1-v_3$ → teesra pehle do ka combination → dependent.
2. (B) coefficient matrix triangular, diagonal $1,2,1$ → det 2 → independent.
3. (C) det $=2$ → independent.
4. (D) triangular-type, det 1 → independent.

**Answer: (A).**

**Galti kahan hoti hai:** (C) choose karna kyunki wo "cyclic" pattern $v_1-v_2,v_2-v_3,v_3-v_1$ jaisa dikhta hai — par plus signs ke saath det 2 hai, minus ke saath 0.

**Example 5 (NAT, hard):** $W=\{x\in\mathbb{R}^5:\ x_1-x_2+x_3=0,\ 2x_1-2x_2+2x_3=0,\ x_4+x_5=0\}$. $\dim W$?

**Soch:** Solution set → $n-$(independent equations).

**Solution:**
1. Dusri equation $=2\times$ pehli → nayi condition nahi.
2. Independent equations: 2 ($x_1-x_2+x_3=0$ aur $x_4+x_5=0$).
3. $\dim W=5-2=3$.

**Answer: 3.**

**Galti kahan hoti hai:** teeno equations gin kar $5-3=2$. Ya equations ki ginti ko hi dimension maan lena (3 coincidence se sahi lagega, par logic galat).

**Example 6 (MSQ, hard):** Real $4\times4$ matrices ke baare me kaunse sahi hain?
(A) Symmetric matrices ka dimension 10 (B) Skew-symmetric ka dimension 10 (C) Trace-zero matrices ka dimension 15 (D) Diagonal matrices ka dimension 16

**Soch:** Free entries gino.

**Solution:**
1. Symmetric: $4\cdot5/2=10$ → (A) sahi.
2. Skew: $4\cdot3/2=6$ → (B) galat.
3. Trace-zero: $16-1=15$ → (C) sahi.
4. Diagonal: 4 → (D) galat.

**Answer: (A), (C).**

**Galti kahan hoti hai:** (B) me diagonal ko bhi free gin lena ($n(n+1)/2=10$). Skew me $a_{ii}=-a_{ii}\Rightarrow a_{ii}=0$.

## Confusions clear karo

**Q:** Subspace check me sabse pehle kya dekhun?
**A:** 0 vector. Agar 0 nahi hai to turant "nahi". Agar hai, tab addition aur scaling ka counterexample dhoondo (khaaskar non-linear conditions me).

**Q:** $Ax=b$ ka solution set "plane" hai, phir subspace kyun nahi?
**A:** Wo plane origin se nahi guzarta (jab $b\neq0$). Subspace hamesha origin se guzarta hai. Ye "khiska hua" plane hai — affine set.

**Q:** Span aur basis me farak?
**A:** Span = saare combinations ka set (ek space). Basis = us space ke liye minimum vectors ka set jo independent ho aur poora space span kare.

**Q:** Rank aur dimension ka kya rishta hai?
**A:** Vectors ko matrix ke columns banao; rank = column space ka dimension = span ka dimension = pivots ki ginti.

**Q:** Kya independent set me 0 ho sakta hai?
**A:** Kabhi nahi. $1\cdot0=0$ ek non-trivial combination hai.

**Q:** $5\times3$ matrix ka rank 3 hai. Rows independent hain kya?
**A:** Nahi. 5 rows $\mathbb{R}^3$ me hain; 3 se zyada vectors $\mathbb{R}^3$ me hamesha dependent. Columns (3) independent hain, kyunki rank = 3 = columns ki ginti, aur isliye $Ax=0$ ka sirf $x=0$ solution hai.

**Q:** $\dim(W_1\cap W_2)$ ka minimum kaise nikalein?
**A:** $\max(0,\ \dim W_1+\dim W_2-n)$. Formula $\dim(W_1+W_2)\le n$ se aata hai.

## Khud try karo

**1.** Kya $\{p\in P_2: p(2)=0\}$ subspace hai? Agar haan, dimension?

<details><summary>Answer dekho</summary>

Haan: zero polynomial ka $p(2)=0$; aur $p(2)=q(2)=0\Rightarrow(p+cq)(2)=0$. $P_2$ dim 3 hai, ek linear condition → dim $3-1=2$ (basis: $x-2$, $x^2-4$).

</details>

**2.** $(1,0,1)$, $(1,1,0)$, $(0,1,1)$ independent hain?

<details><summary>Answer dekho</summary>

Columns: $\det\begin{pmatrix}1&1&0\\0&1&1\\1&0&1\end{pmatrix}=1(1-0)-1(0-1)+0=2\neq0$ → independent (aur $\mathbb{R}^3$ ka basis).

</details>

**3.** $\mathbb{R}^6$ me $\dim W_1=4$, $\dim W_2=5$. $\dim(W_1\cap W_2)$ ka minimum?

<details><summary>Answer dekho</summary>

$4+5-6=3$.

</details>

**4.** $\{x\in\mathbb{R}^4:x_1=x_2=x_3\}$ ka dimension?

<details><summary>Answer dekho</summary>

Equations: $x_1-x_2=0$, $x_2-x_3=0$ (2 independent). $\dim=4-2=2$. Basis: $(1,1,1,0)$, $(0,0,0,1)$.

</details>

**5.** Sahi ya galat: "$\{x:Ax=b\}\cup\{0\}$ ($b\neq0$) subspace hai, kyunki ab 0 andar hai."

<details><summary>Answer dekho</summary>

Galat. Agar $Ax=b$ to $A(2x)=2b\neq b$, aur $2x\neq0$ — to $2x$ set me nahi. Scaling closure fail.

</details>

## Ek page me

- Subspace: $0\in W$ aur $u+cv\in W$. Pehle 0 check karo.
- Span, null space, column/row space, homogeneous solution sets → hamesha subspace.
- $Ax=b$ ($b\neq0$), inequalities, products, "exactly degree $k$", invertible matrices → kabhi nahi.
- Independent: $\sum c_iv_i=0\Rightarrow$ sab $c_i=0$; test: rank $=$ vectors ki ginti (square: $\det\neq0$).
- $\mathbb{R}^n$ me $n$ se zyada vectors, ya 0 wala set → dependent.
- Pairwise non-parallel $\not\Rightarrow$ independent.
- Combinations of independent vectors: independent iff coefficient matrix invertible.
- Basis = independent + spanning; dimension = basis ka size; $n$-dim me theek $n$ vectors: independent $\iff$ spanning.
- $\dim\operatorname{span}$ = row reduction ke pivots; $\dim\{Ax=0\}=n-\operatorname{rank}A$.
- $n\times n$: symmetric $n(n+1)/2$, skew $n(n-1)/2$, upper-triangular $n(n+1)/2$, trace-0 $n^2-1$.
- $\dim(W_1+W_2)=\dim W_1+\dim W_2-\dim(W_1\cap W_2)$; intersection $\ge\dim W_1+\dim W_2-n$.

Revision ke liye **Short note** tab dekho.
