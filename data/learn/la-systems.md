# Systems, Gaussian elimination, rank and nullity

> **Time:** ~40 min · **Pehle aana chahiye:** matrix multiplication, independence aur dimension ka idea (pichhla lesson "Vector spaces, subspaces, basis and independence"), $2\times2$/$3\times3$ determinant · **Day:** 17, 21

## Ye topic kyun?

Linear equations ka system $Ax=b$ har jagah hai: regression ke normal equations, network flows, ML me least squares. Pehla sawaal hamesha yahi: **solution hai ya nahi, aur ek hai ya bahut saare?** Iska jawab ek number deta hai — **rank**. GATE DA me rank nikalna (NAT), rank–nullity se dimension (NAT), parameter $k$ ya $m$ ke liye "unique/none/infinite" (MCQ/NAT), aur shape-based statements (MSQ) har saal ke favourite hain, 1 aur 2 mark dono.

## Picture se samjho

Do variables ki do equations = plane me do lines. Solution = jahan dono lines milti hain. Sirf teen hi cheezein ho sakti hain:

<figure class="fig">
<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="20" width="150" height="140" fill="none" style="stroke:var(--muted)"/>
<line x1="20" y1="150" x2="150" y2="40" style="stroke:var(--info)" stroke-width="2.5"/>
<line x1="20" y1="50" x2="150" y2="150" style="stroke:var(--mark)" stroke-width="2.5"/>
<circle cx="82" cy="98" r="5" style="fill:var(--good)"/>
<text x="85" y="177" text-anchor="middle" font-size="12" fill="currentColor">Unique (ek point)</text>
<text x="85" y="193" text-anchor="middle" font-size="11" fill="currentColor">rank A = rank[A|b] = 2</text>
<rect x="175" y="20" width="150" height="140" fill="none" style="stroke:var(--muted)"/>
<line x1="185" y1="130" x2="315" y2="60" style="stroke:var(--info)" stroke-width="2.5"/>
<line x1="185" y1="155" x2="315" y2="85" style="stroke:var(--mark)" stroke-width="2.5"/>
<text x="250" y="177" text-anchor="middle" font-size="12" style="fill:var(--bad)">Koi solution nahi</text>
<text x="250" y="193" text-anchor="middle" font-size="11" fill="currentColor">rank A = 1 &lt; rank[A|b] = 2</text>
<rect x="340" y="20" width="150" height="140" fill="none" style="stroke:var(--muted)"/>
<line x1="350" y1="150" x2="480" y2="40" style="stroke:var(--info)" stroke-width="6" opacity="0.5"/>
<line x1="350" y1="150" x2="480" y2="40" style="stroke:var(--mark)" stroke-width="2" stroke-dasharray="6 4"/>
<text x="415" y="177" text-anchor="middle" font-size="12" style="fill:var(--good)">Infinite (same line)</text>
<text x="415" y="193" text-anchor="middle" font-size="11" fill="currentColor">rank A = rank[A|b] = 1</text>
</svg>
<figcaption>Do lines: milti hain (unique), parallel hain (none), ya ek hi line hain (infinite). "Do solutions exactly" kabhi nahi hota.</figcaption>
</figure>

Notice karo: beech wale case me lines ka "direction" same hai (left side $A$ ki rows dependent), par right side $b$ alag hai. Teesre case me left aur right dono proportional hain. Yahi farak $\operatorname{rank}A$ aur $\operatorname{rank}[A|b]$ pakadte hain.

Dusri picture: matrix $A$ ($m\times n$) ek machine hai jo $\mathbb{R}^n$ ke vectors ko $\mathbb{R}^m$ me bhejti hai. Input ki $n$ dimensions me se kuch dimensions **kuchal kar 0** ho jaati hain (null space), baaki **bach kar** output me pahunchti hain (column space).

<figure class="fig">
<svg viewBox="0 0 480 205" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="30" width="160" height="60" style="fill:var(--bad)" opacity="0.2"/>
<rect x="20" y="90" width="160" height="80" style="fill:var(--good)" opacity="0.2"/>
<rect x="20" y="30" width="160" height="140" fill="none" stroke="currentColor"/>
<text x="100" y="22" text-anchor="middle" font-size="12" fill="currentColor">input ℝⁿ (n dims)</text>
<text x="100" y="58" text-anchor="middle" font-size="12" fill="currentColor">null space N(A)</text>
<text x="100" y="75" text-anchor="middle" font-size="11" fill="currentColor">nullity dims</text>
<text x="100" y="128" text-anchor="middle" font-size="12" fill="currentColor">baaki directions</text>
<text x="100" y="145" text-anchor="middle" font-size="11" fill="currentColor">rank dims</text>
<rect x="300" y="30" width="160" height="140" fill="none" stroke="currentColor"/>
<text x="380" y="22" text-anchor="middle" font-size="12" fill="currentColor">output ℝᵐ</text>
<circle cx="380" cy="55" r="5" style="fill:var(--bad)"/>
<text x="392" y="59" font-size="12" fill="currentColor">0</text>
<rect x="320" y="95" width="120" height="60" style="fill:var(--good)" opacity="0.25"/>
<text x="380" y="122" text-anchor="middle" font-size="11" fill="currentColor">column space</text>
<text x="380" y="138" text-anchor="middle" font-size="11" fill="currentColor">(dim = rank)</text>
<line x1="182" y1="60" x2="368" y2="55" style="stroke:var(--bad)" stroke-width="1.5"/>
<polygon points="374,55 364,50 364,60" style="fill:var(--bad)"/>
<line x1="182" y1="130" x2="312" y2="125" style="stroke:var(--good)" stroke-width="1.5"/>
<polygon points="318,125 308,120 308,130" style="fill:var(--good)"/>
<text x="245" y="48" text-anchor="middle" font-size="12" fill="currentColor">A</text>
<text x="245" y="118" text-anchor="middle" font-size="12" fill="currentColor">A</text>
<text x="240" y="195" text-anchor="middle" font-size="13" style="fill:var(--mark)">n = nullity + rank</text>
</svg>
<figcaption>A ki n input dimensions do hisson me batt-ti hain: jo 0 pe kuchli jaati hain (nullity) aur jo column space bharti hain (rank). Isliye rank + nullity = n (columns), m nahi.</figcaption>
</figure>

Ye "dimension ka hisaab" hi rank–nullity theorem hai. Dhyan do ki $n$ **columns** ki ginti hai — input ka size.

## Concept step-by-step

### 1. System ko matrix me likhna

**Idea:** $m$ equations, $n$ unknowns → $Ax=b$, jahan $A$ $m\times n$ coefficient matrix, $x\in\mathbb{R}^n$, $b\in\mathbb{R}^m$. **Augmented matrix** $[A\,|\,b]$ = $A$ ke saath $b$ ki extra column.

Teen **row operations** solution set nahi badalte: (1) do rows swap, (2) row ko non-zero number se multiply, (3) ek row me dusri row ka multiple jodna.

**Example:** $x+y+z=6,\ 2x+y-z=1,\ x-y+2z=5$ →
$$[A|b]=\left(\begin{array}{ccc|c}1&1&1&6\\2&1&-1&1\\1&-1&2&5\end{array}\right).$$

**Dhyan do:** Row operation $b$ wale column pe bhi lagta hai — wahan ka sign/arithmetic sabse zyada galat hota hai.

### 2. Gaussian elimination aur back substitution

**Idea:** Row operations se neeche-left ke entries zero karo → **row echelon form** (seedhi jaisi shape). Har row ka pehla non-zero entry **pivot** hai. Phir neeche se upar solve karo.

**Example (upar wala system):**
1. $R_2-2R_1$: $(0,-1,-3\,|\,1-12)=(0,-1,-3\,|\,-11)$.
2. $R_3-R_1$: $(0,-2,1\,|\,-1)$.
3. $R_3-2R_2$: $(0,0,1+6\,|\,-1+22)=(0,0,7\,|\,21)$.
4. Back: $7z=21\Rightarrow z=3$. $-y-3(3)=-11\Rightarrow y=2$. $x=6-2-3=1$.

Solution $(1,2,3)$. Check: $2+2-3=1$ ✓, $1-2+6=5$ ✓.

**Dhyan do:** Aakhri step me hamesha original equations me daal kar check karo — 10 second ka kaam, poora sawaal bachata hai.

### 3. Rank

**Idea:** Row reduce karne ke baad **pivots ki ginti** = rank. Ye teen cheezon ke barabar hai: independent rows ki ginti, independent columns ki ginti, column space ka dimension. Isliye $\operatorname{rank}A=\operatorname{rank}A^T$.

**Example:** $\begin{pmatrix}1&1&2&0\\2&3&1&1\\3&4&3&2\end{pmatrix}$. Lagta hai $R_3=R_1+R_2$? $R_1+R_2=(3,4,3,1)$, par $R_3=(3,4,3,2)$ — aakhri entry alag! Reduce: $R_2-2R_1=(0,1,-3,1)$, $R_3-3R_1=(0,1,-3,2)$, phir $R_3-R_2=(0,0,0,1)$ → 3 pivots → rank 3.

**Dhyan do:** (a) Reduce karne se pehle non-zero rows mat gino. (b) Sirf multiples nahi, **combinations** bhi dekho. (c) "Near-miss" rows me har entry check karo. (d) Ek dependency milne ke baad ruk mat jao.

### 4. Rank–nullity

**Idea:** $Ax=0$ ke solutions ka set = **null space** $N(A)$; uska dimension = **nullity**. RREF me har column ya to pivot column hai ya free column. Free variable ki har choice ek independent solution deti hai. To
$$\underbrace{\#\text{pivot columns}}_{\text{rank}}+\underbrace{\#\text{free columns}}_{\text{nullity}}=n\ (\text{columns}).$$
$A^T$ ($n\times m$) pe lagao: $\dim N(A^T)=m-r$.

**Example (null space basis):** $A=\begin{pmatrix}1&2&0&3\\0&0&1&-1\end{pmatrix}$ (already RREF). Pivots: $x_1,x_3$. Free: $x_2,x_4$. $x_1=-2x_2-3x_4$, $x_3=x_4$.
- $x_2=1,x_4=0$: $(-2,1,0,0)$.
- $x_2=0,x_4=1$: $(-3,0,1,1)$.
Nullity $=2=4-2$ ✓.

**Example (sirf numbers):** $5\times7$, rank 3 → nullity $7-3=4$; $\dim N(A^T)=5-3=2$.

**Dhyan do:** Nullity me $n$ (columns) se ghatao, $m$ (rows) se nahi.

### 5. Rank ke inequalities aur do khaas facts

- $\operatorname{rank}(AB)\le\min(\operatorname{rank}A,\operatorname{rank}B)$: $AB$ ki columns $A$ ki columns ke combinations hain (column space chhota ya same); rows $B$ ki rows ke combinations.
- $\operatorname{rank}(A+B)\le\operatorname{rank}A+\operatorname{rank}B$ (barabar zaroori nahi: $B=-A$ lo, $A+B=0$).
- $\operatorname{rank}(A^TA)=\operatorname{rank}A$. **Kyun?** Agar $A^TAx=0$ to $x^TA^TAx=\lVert Ax\rVert^2=0\Rightarrow Ax=0$. To $N(A^TA)=N(A)$; dono ke $n$ columns → rank–nullity se rank same.
- $A^2=0$ ($n\times n$): $A(Ax)=0$, matlab har column-space vector null space me hai → $r\le n-r\Rightarrow r\le n/2$.

**Example:** $4\times4$, $A^2=0$, $A\neq0$: rank 1 ya 2, nullity 3 ya 2. Jaise $A$ jisme sirf $a_{13}=a_{24}=1$ ho: $A^2=0$, rank 2.

**Dhyan do:** $\operatorname{rank}(AB)=\operatorname{rank}A$ sirf tab guaranteed jab $B$ invertible ho, "square" kaafi nahi.

### 6. Consistency: solution hai ya nahi?

**Idea:** $Ax=b$ ka solution hai iff $b$, $A$ ki columns ka combination hai iff $b$ jodne se rank nahi badhta:
$$\text{consistent}\iff\operatorname{rank}A=\operatorname{rank}[A\,|\,b].$$
Row reduction me ye aise dikhta hai: koi row $(0\ 0\cdots0\,|\,c)$ with $c\neq0$ aaye → $0=c$ → **inconsistent**.

**Example:** $x+2y=4,\ 2x+4y=9$. $R_2-2R_1=(0,0\,|\,1)$ → $0=1$ → no solution. $\operatorname{rank}A=1$, $\operatorname{rank}[A|b]=2$.

**Dhyan do:** Poori zero row $(0\cdots0\,|\,0)$ problem nahi hai — wo sirf ek redundant equation hai.

### 7. Unique ya infinite?

**Idea:** Consistent hone ke baad:
- $r=n$ → koi free variable nahi → **unique**.
- $r<n$ → $n-r$ free variables → **infinitely many**.

**General solution = particular solution + null space.** Agar $Ax_p=b$ aur $Ax_h=0$ to $A(x_p+x_h)=b$.

**Example:** RREF $\left(\begin{array}{ccc|c}1&0&-1&2\\0&1&3&-1\\0&0&0&0\end{array}\right)$. $z$ free: $x=2+z$, $y=-1-3z$. Solution $=(2,-1,0)+t(1,-3,1)$. ($t=1$: $(3,-4,1)$ ✓.)

**Dhyan do:** "Singular ⇒ no solution" galat. Singular ($\det=0$) ka matlab: **no ya infinitely many** — right side check karo.

### 8. Shape se seedhe conclusions

$A$ $m\times n$, rank $r$ (hamesha $r\le\min(m,n)$):

| Condition | Matlab |
|---|---|
| $r=m$ (full row rank) | column space $=\mathbb{R}^m$ → har $b$ ke liye solvable ("onto") |
| $r=n$ (full column rank) | nullity 0 → at most ek solution ("one-to-one"); $A^TA$ invertible |
| $r=m=n$ | har $b$ ke liye exactly ek solution |
| $n>m$ | nullity $\ge n-m>0$ → $Ax=0$ ke non-zero solutions; kabhi unique nahi |
| $m>n$ | kuch $b$ ke liye solution nahi (onto nahi ho sakta) |

**Example:** $3\times5$, rank 3 → har $b$ solvable, par nullity 2 → hamesha infinite. $A^T$ ($5\times3$, rank 3) → $A^Ty=c$ ka at most ek solution.

**Dhyan do:** Wide matrix ($n>m$) one-to-one nahi ho sakta; tall matrix ($m>n$) onto nahi ho sakta.

### 9. Parameter wale sawaal

**Idea:** Square system me $k$ ho to: (1) $\det A=0$ wali $k$ nikalo — sirf wahi "trouble" values hain; baaki sab $k$ pe unique. (2) Trouble $k$ pe $\operatorname{rank}A$ vs $\operatorname{rank}[A|b]$ compare karo: barabar → infinite, alag → none.

**Example:** $x+y=2,\ x+ky=2$. $\det=k-1$ → trouble $k=1$. $k=1$ pe dono equations same → infinite. $k\neq1$ → unique.

**Dhyan do:** $\det=0$ milte hi "no solution" mat likho; step (2) zaroori hai.

## Solved examples

**Example 1 (NAT, easy):** Rank nikalo:
$$A=\begin{pmatrix}1&0&2&1\\2&1&3&0\\3&1&5&1\\0&1&-1&-2\end{pmatrix}.$$

**Soch:** "Rank" → poora row reduce, pivots gino.

**Solution:**
1. $R_2-2R_1=(0,1,-1,-2)$.
2. $R_3-3R_1=(0,1,-1,-2)$.
3. $R_4=(0,1,-1,-2)$ (pehle se).
4. $R_3-R_2=0$, $R_4-R_2=0$.
5. Bache: $(1,0,2,1)$, $(0,1,-1,-2)$ → 2 pivots.

**Answer: 2.**

**Galti kahan hoti hai:** "koi row dusri ka multiple nahi" dekh kar 4 likhna. Ya $R_3=R_1+R_2$ pakad kar ruk jaana → 3; $R_4=R_2-2R_1$ bhi combination hai.

**Example 2 (NAT, medium):** $A$ ek $6\times4$ real matrix hai, $\dim N(A)=1$. $\dim N(A^T)$?

**Soch:** Rank–nullity do baar: pehle $A$ pe (columns 4), phir $A^T$ pe (columns 6).

**Solution:**
1. $\operatorname{rank}A=4-1=3$.
2. $A^T$ $4\times6$ hai, rank bhi 3.
3. $\dim N(A^T)=6-3=3$.

**Answer: 3.**

**Galti kahan hoti hai:** $\dim N(A^T)=4-3=1$ — $A^T$ ke columns 6 hain, 4 nahi. Ya rank $=6-1=5$ (rows se ghatana), jo $\min(6,4)=4$ se bhi zyada hai — impossible.

**Example 3 (MCQ, medium):** System $x+2y=4,\ 3x+ky=10$. Kaunsa sahi hai?
(A) $k\neq6$ pe unique; $k=6$ pe infinitely many
(B) $k\neq6$ pe unique; $k=6$ pe koi solution nahi
(C) har $k$ pe unique
(D) $k=6$ pe unique, baaki pe koi solution nahi

**Soch:** Parameter + square system → det, phir ranks.

**Solution:**
1. $\det=1\cdot k-2\cdot3=k-6$ → trouble sirf $k=6$.
2. $k=6$: $R_2-3R_1=(0,0\,|\,10-12)=(0,0\,|\,-2)$ → $0=-2$ → inconsistent.
3. $\operatorname{rank}A=1\neq\operatorname{rank}[A|b]=2$.

**Answer: (B).**

**Galti kahan hoti hai:** left sides proportional dekh kar (A) — right side check nahi kiya ($3\times4=12\neq10$).

**Example 4 (NAT, hard):** System
$$x+2y+z=4,\quad 2x+5y+3z=9,\quad x+3y+2z=m$$
ke infinitely many solutions hain. $m$?

**Soch:** Infinite → consistent aur $r<3$. Reduce karke last row $(0\,0\,0\,|\,\cdot)$ ka right side 0 karo.

**Solution:**
1. $R_2-2R_1$: $(0,1,1\,|\,9-8)=(0,1,1\,|\,1)$.
2. $R_3-R_1$: $(0,1,1\,|\,m-4)$.
3. $R_3-R_2$: $(0,0,0\,|\,m-4-1)=(0,0,0\,|\,m-5)$.
4. Consistent iff $m-5=0\Rightarrow m=5$. Tab rank 2 < 3 → infinite ✓.

**Answer: 5.**

**Galti kahan hoti hai:** right side pe $R_2-2R_1$ karte waqt $9-2\cdot4$ ki jagah $9-4=5$ likhna → $m=9$. Ya $R_3-R_1$ ka right side $m+4$ likhna (sign) → $m=-3$.

**Example 5 (MSQ, hard):** $A$ ek real $4\times6$ matrix, $\operatorname{rank}A=4$. Kaunse sahi hain?
(A) Har $b\in\mathbb{R}^4$ ke liye $Ax=b$ solvable hai
(B) $Ax=0$ ka sirf trivial solution hai
(C) Har $c\in\mathbb{R}^6$ ke liye $A^Ty=c$ ka at most ek solution hai
(D) $A^TA$ invertible hai

**Soch:** Shape table: $r=m=4$ full row rank; $n=6>m$.

**Solution:**
1. (A) $r=m$ → column space $=\mathbb{R}^4$ → sahi.
2. (B) nullity $=6-4=2>0$ → non-zero solutions hain → galat.
3. (C) $A^T$ $6\times4$, rank 4 = uske columns → nullity 0 → at most ek → sahi.
4. (D) $A^TA$ $6\times6$ hai par rank $=\operatorname{rank}A=4<6$ → singular → galat.

**Answer: (A), (C).**

**Galti kahan hoti hai:** (D) tick karna, "full rank hai to $A^TA$ invertible" yaad karke — wo rule full **column** rank ($r=n$) ke liye hai. Yahan $AA^T$ ($4\times4$) invertible hai, $A^TA$ nahi.

**Example 6 (MSQ, hard):** $A$ ek non-zero real $4\times4$ matrix hai, $A^2=0$. Kaunse sahi hain?
(A) $\operatorname{rank}A\le2$ (B) $\dim N(A)\ge2$ (C) $A$ invertible hai (D) $\operatorname{rank}A=0$

**Soch:** $A^2=0$ → column space $\subseteq$ null space.

**Solution:**
1. $r\le n-r=4-r\Rightarrow r\le2$ → (A) sahi.
2. Nullity $=4-r\ge2$ → (B) sahi.
3. (C) $\det(A)^2=\det(A^2)=0$ → singular → galat.
4. (D) $A\neq0$ → $r\ge1$ → galat.

**Answer: (A), (B).**

**Galti kahan hoti hai:** (D) — "$A^2=0$ to $A=0$" scalar wali soch. Matrices me $\begin{pmatrix}0&1\\0&0\end{pmatrix}^2=0$.

## Confusions clear karo

**Q:** Rank nikaalne ke liye rows reduce karun ya columns?
**A:** Koi bhi — $\operatorname{rank}A=\operatorname{rank}A^T$. Row reduction aam taur pe aasaan hai. Bas poora reduce karo, phir pivots gino.

**Q:** Nullity me $n$ kya hai — rows ya columns?
**A:** Columns (unknowns ki ginti). $Ax=0$ me $x\in\mathbb{R}^n$; free variables bhi unknowns me se hi aate hain.

**Q:** $\det A=0$ ka matlab "no solution"?
**A:** Nahi. Matlab "unique nahi". Ya to koi nahi, ya infinitely many — $[A|b]$ ka rank decide karega. $Ax=0$ ke liye to hamesha infinite (0 to solution hai hi).

**Q:** "Exactly 2 solutions" possible hai kya?
**A:** Kabhi nahi. Agar $x_1\neq x_2$ dono solutions, to $x_1-x_2$ null space me hai, aur $x_1+t(x_2-x_1)$ har $t$ ke liye solution — infinite.

**Q:** Full row rank aur full column rank me farak?
**A:** Full row rank ($r=m$): har $b$ tak pahunch sakte ho (existence). Full column rank ($r=n$): do alag $x$ same $b$ nahi dete (uniqueness). Square aur dono → invertible.

**Q:** $\operatorname{rank}(A^TA)$ aur $\operatorname{rank}A$ same kyun?
**A:** $A^TAx=0\Rightarrow\lVert Ax\rVert^2=0\Rightarrow Ax=0$. Dono ka null space same, columns same ($n$) → rank–nullity se rank same.

**Q:** Particular + null space kya hai?
**A:** $Ax=b$ ka ek solution $x_p$ dhoondo. Baaki saare solutions $x_p+$ (koi bhi $Ax=0$ solution). Geometrically: null space ko $x_p$ tak khiska do.

## Khud try karo

**1.** $\begin{pmatrix}1&2&3\\2&4&6\\1&1&1\end{pmatrix}$ ka rank?

<details><summary>Answer dekho</summary>

$R_2=2R_1$ → zero. $R_3-R_1=(0,-1,-2)$ → pivot. Rank $=2$.

</details>

**2.** $A$ $3\times5$, rank 3. Nullity? Kya $Ax=b$ har $b$ ke liye solvable hai?

<details><summary>Answer dekho</summary>

Nullity $=5-3=2$. Haan, $r=m=3$ → har $b\in\mathbb{R}^3$ solvable (aur hamesha infinitely many solutions, kyunki nullity 2).

</details>

**3.** Gaussian elimination se solve karke $y$ batao: $x+2y+z=3,\ 3x+y+2z=11,\ 2x-y+3z=14$.

<details><summary>Answer dekho</summary>

$R_2-3R_1=(0,-5,-1\,|\,2)$; $R_3-2R_1=(0,-5,1\,|\,8)$; $R_3-R_2=(0,0,2\,|\,6)\Rightarrow z=3$. $-5y-3=2\Rightarrow y=-1$. $x=3+2-3=2$. **$y=-1$.**

</details>

**4.** $k$ ki kis value pe $\begin{pmatrix}1&1&1\\1&2&3\\2&3&k\end{pmatrix}$ ka rank 2 hai?

<details><summary>Answer dekho</summary>

$R_2-R_1=(0,1,2)$, $R_3-2R_1=(0,1,k-2)$, $R_3-R_2=(0,0,k-4)$. Rank 2 iff $k=4$ (tab $R_3=R_1+R_2$). Baaki $k$ pe rank 3.

</details>

**5.** Rows $(1,1,2,0)$, $(2,3,1,1)$, $(3,4,3,2)$ wale matrix ka rank? (Near-miss dhyan se.)

<details><summary>Answer dekho</summary>

$R_1+R_2=(3,4,3,1)\neq R_3=(3,4,3,2)$. Reduce karne pe teesri row $(0,0,0,1)$ bachti hai → rank 3.

</details>

## Ek page me

- $Ax=b$: augmented $[A|b]$; row operations $b$ pe bhi lagao.
- Rank = row reduction ke baad pivots = independent rows = independent columns; $\operatorname{rank}A=\operatorname{rank}A^T$.
- Combinations aur near-miss rows dhyan se; ek dependency pe mat ruko.
- Rank + nullity $=n$ (columns); $\dim N(A^T)=m-r$.
- $\operatorname{rank}(AB)\le\min$; $\operatorname{rank}(A+B)\le$ sum; $\operatorname{rank}(A^TA)=\operatorname{rank}A$.
- $A^2=0\Rightarrow\operatorname{rank}A\le n/2$.
- Consistent iff $\operatorname{rank}A=\operatorname{rank}[A|b]$; row $(0\cdots0|c\neq0)$ → none.
- Consistent + $r=n$ → unique; $r<n$ → infinite ($n-r$ free variables).
- General solution = particular + null space; "exactly 2 solutions" impossible.
- $r=m$ → har $b$ solvable; $r=n$ → at most ek solution, $A^TA$ invertible; $n>m$ → non-trivial null space.
- Parameter: $\det=0$ sirf trouble flag hai; phir ranks compare karo.

Revision ke liye **Short note** tab dekho.
