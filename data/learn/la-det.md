# Determinants

> **Time:** ~30 min · **Pehle aana chahiye:** matrix multiplication, transpose, inverse ka matlab; eigenvalue ka naam suna ho to accha (yahan zaroori cheez phir se samjhayi hai) · **Day:** 18, 21

## Ye topic kyun?
Determinant ek square matrix ko ek single number deta hai jo batata hai ki matrix space ko kitna "phailata" ya "sikodta" hai, aur matrix invertible hai ya nahi. GATE DA me ye mostly 1–2 marks ke NAT/MCQ/MSQ me aata hai: "$\det A$ diya hai, $\det(2A^{-1})$ nikalo", "row operations ke baad det kya hoga", ya "eigenvalues diye hain, $\det(A^2+I)$ nikalo". Formulas chhote hain, par traps bahut hain — isliye har rule ka *kyun* samajhna zaroori hai.

## Picture se samjho

Ek $2\times2$ matrix $A$ plane ke har vector ko naye vector me bhejta hai. Unit square (jiske sides $(1,0)$ aur $(0,1)$ hain) ko dekho. $A$ lagane ke baad $(1,0)$ jaata hai $A$ ke pehle column par, aur $(0,1)$ jaata hai doosre column par. To unit square ek parallelogram ban jaata hai.

<figure class="fig">
<svg viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="220" x2="300" y2="220" style="stroke:var(--muted)" stroke-width="1.5"/>
<line x1="40" y1="220" x2="40" y2="20" style="stroke:var(--muted)" stroke-width="1.5"/>
<polygon points="40,220 90,220 90,170 40,170" style="fill:var(--info);stroke:var(--info)" fill-opacity="0.35" stroke-width="2"/>
<text x="52" y="200" font-size="11" fill="currentColor">area 1</text>
<polygon points="40,220 190,170 240,70 90,120" style="fill:var(--mark);stroke:var(--mark)" fill-opacity="0.25" stroke-width="2"/>
<line x1="40" y1="220" x2="190" y2="170" style="stroke:var(--good)" stroke-width="3"/>
<line x1="40" y1="220" x2="90" y2="120" style="stroke:var(--good)" stroke-width="3"/>
<text x="195" y="175" font-size="12" fill="currentColor">(3,1)</text>
<text x="60" y="112" font-size="12" fill="currentColor">(1,2)</text>
<text x="245" y="70" font-size="12" fill="currentColor">(4,3)</text>
<text x="130" y="150" font-size="13" fill="currentColor">area 5</text>
<text x="150" y="40" font-size="12" fill="currentColor">A = [3 1; 1 2], det A = 5</text>
</svg>
<figcaption>Unit square (area 1) matrix A ke baad parallelogram ban jaata hai jiska area 5 = det A hai.</figcaption>
</figure>

Dhyan do: parallelogram ke sides bilkul $A$ ke columns $(3,1)$ aur $(1,2)$ hain. Iska area $3\cdot2-1\cdot1=5$ hai, aur yahi $\det A$ hai. Matlab **determinant = area (3D me volume) kitne guna hua**. Agar $\det A$ negative ho, to area ka size $|\det A|$ guna hota hai par shape "ulta" (mirror image) ho jaati hai. Agar $\det A=0$, to parallelogram chapta ho kar ek line (ya point) ban jaata hai — wapas square banana impossible, isliye $A^{-1}$ exist nahi karta.

Ab teen row operations ko is picture se socho:

<figure class="fig">
<svg viewBox="0 0 360 120" xmlns="http://www.w3.org/2000/svg">
<rect x="5" y="15" width="110" height="90" rx="8" style="fill:none;stroke:var(--bad)" stroke-width="2"/>
<text x="60" y="40" font-size="12" text-anchor="middle" fill="currentColor">Do rows swap</text>
<text x="60" y="65" font-size="14" text-anchor="middle" fill="currentColor">det × (−1)</text>
<text x="60" y="90" font-size="10" text-anchor="middle" fill="currentColor">shape ulti ho gayi</text>
<rect x="125" y="15" width="110" height="90" rx="8" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<text x="180" y="40" font-size="12" text-anchor="middle" fill="currentColor">Ek row × c</text>
<text x="180" y="65" font-size="14" text-anchor="middle" fill="currentColor">det × c</text>
<text x="180" y="90" font-size="10" text-anchor="middle" fill="currentColor">ek side c guna lambi</text>
<rect x="245" y="15" width="110" height="90" rx="8" style="fill:none;stroke:var(--good)" stroke-width="2"/>
<text x="300" y="40" font-size="12" text-anchor="middle" fill="currentColor">Ri → Ri + k·Rj</text>
<text x="300" y="65" font-size="14" text-anchor="middle" fill="currentColor">det × 1</text>
<text x="300" y="90" font-size="10" text-anchor="middle" fill="currentColor">shear: area same</text>
</svg>
<figcaption>Teen elementary row operations aur determinant par unka asar.</figcaption>
</figure>

Teesra box sabse important hai. Ek row me doosri row ka multiple jodna parallelogram ko "tircha dhakelna" (shear) hai — jaise taash ki gaddi ko side se dhakelo. Base wahi, height wahi, to area wahi. Isliye row replacement determinant ko bilkul nahi badalta.

## Concept step-by-step

### 1. Determinant nikalna: 2×2 aur 3×3
**Idea:** $2\times2$ ke liye seedha formula, bade matrix ke liye kisi row/column ke along "cofactor expansion".

$$\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc$$

$3\times3$ ke liye pehli row ke along expand karo: har entry $\times$ uska minor (us row-column ko hata kar bacha $2\times2$ det), signs $+,-,+$ alternate.

**Example:** $A=\begin{pmatrix}1&2&3\\0&4&5\\1&0&6\end{pmatrix}$.
1. $1\cdot(4\cdot6-5\cdot0)=24$
2. $-2\cdot(0\cdot6-5\cdot1)=-2\cdot(-5)=+10$
3. $+3\cdot(0\cdot0-4\cdot1)=3\cdot(-4)=-12$

$\det A=24+10-12=22$.

**Dhyan do:** beech wale term ka minus sign bhoolna sabse common arithmetic galti hai. Sign pattern chessboard jaisa hai: position $(i,j)$ ka sign $(-1)^{i+j}$.

### 2. Triangular matrix: diagonal ka product
**Idea:** agar diagonal ke neeche (ya upar) sab zero hain, to determinant = diagonal entries ka product.

**Kyun:** pehle column ke along expand karo. Usme sirf top entry non-zero hai, to $\det = a_{11}\times(\text{bacha hua chhota triangular matrix ka det})$. Yahi baar-baar karte jao: $a_{11}a_{22}\cdots a_{nn}$.

**Example:** $\begin{pmatrix}2&7&-1\\0&3&5\\0&0&-4\end{pmatrix}$ ka det $=2\cdot3\cdot(-4)=-24$.

Block triangular bhi same: $\det\begin{pmatrix}P&Q\\0&R\end{pmatrix}=\det P\cdot\det R$ (jab $P,R$ square blocks hon).

**Dhyan do:** ye rule sirf triangular (ya diagonal) ke liye hai. General matrix me diagonal multiply karne se det nahi milta.

### 3. Row operations ka asar
| Operation | det par asar |
|---|---|
| Do rows swap | $\times(-1)$ |
| Ek row ko $c$ se multiply | $\times c$ |
| $R_i\to R_i+kR_j$ (row replacement) | koi change nahi |

**Kyun:** determinant har row me "linear" hai (ek row double to det double), aur do equal rows ho to det $0$ hota hai. Row replacement me $\det(\ldots,R_i+kR_j,\ldots)=\det(\ldots,R_i,\ldots)+k\det(\ldots,R_j,\ldots,R_j,\ldots)$, aur doosre term me do same rows hain, to woh $0$. Columns par bhi same rules lagte hain kyunki $\det A^T=\det A$.

**Example:** $\det A=5$ ($3\times3$). Row 2 ko 4 se multiply, phir row 1 aur 3 swap, phir $R_2\to R_2-7R_1$. Track karo: $5\to20\to-20\to-20$.

**Dhyan do:** row replacement ko "scaling" mat samjho. $R_2\to R_2+3R_1$ me factor 3 kahin nahi aata. Lekin $R_2\to 3R_2+R_1$ me $R_2$ khud 3 se scale hua, to factor 3 aata hai.

### 4. Poore matrix ko scale karna: $\det(cA)=c^n\det A$
**Idea:** $cA$ me *har* row $c$ se multiply hoti hai. $n$ rows hain, har row ek factor $c$ deti hai.

$$\det(cA)=c^n\det A\quad(A\ \text{is}\ n\times n)$$

**Example:** $A$ $3\times3$, $\det A=2$. $\det(2A)=2^3\cdot2=16$ (not $4$). Isi tarah $\det(-A)=(-1)^n\det A$: $3\times3$ me $\det(-A)=-\det A$, $4\times4$ me $\det(-A)=+\det A$.

**Dhyan do:** picture yaad karo — 2D me dono sides double karo to area 4 guna hota hai, 2 guna nahi. 3D me volume 8 guna.

### 5. Product, transpose, inverse
$$\det(AB)=\det A\cdot\det B,\qquad \det(A^T)=\det A,\qquad \det(A^{-1})=\frac{1}{\det A}$$

**Kyun:** $AB$ ka matlab pehle $B$ lagao, phir $A$. Area pehle $\det B$ guna, phir $\det A$ guna, total $\det A\det B$. Inverse: $AA^{-1}=I$, to $\det A\cdot\det(A^{-1})=\det I=1$. Transpose: rows aur columns ki bhoomika badalti hai, par cofactor expansion kisi bhi row ya column ke along same answer deta hai.

In teeno ko milao: $\det(A^kB^T)=(\det A)^k\det B$, aur $\det(cA^{-1})=c^n/\det A$.

**Example:** $3\times3$, $\det A=4$: $\det(2A^{-1})=2^3\cdot\frac14=2$.

**Dhyan do:** $\det(A+B)\ne\det A+\det B$. Example: $A=B=I_2$, to $\det(2I)=4$ par $\det I+\det I=2$. Determinant product ke saath "friendly" hai, sum ke saath nahi.

### 6. Determinant = eigenvalues ka product
**Eigenvalue recap:** agar $Av=\lambda v$ (kisi non-zero $v$ ke liye), to $\lambda$ eigenvalue hai — $A$ us direction ko sirf $\lambda$ guna kheenchta hai. Eigenvalues characteristic polynomial ke roots hain:
$$\chi(t)=\det(A-tI)=(\lambda_1-t)(\lambda_2-t)\cdots(\lambda_n-t).$$
Isme $t=0$ rakho: $\det A=\lambda_1\lambda_2\cdots\lambda_n$.

Isse turant: $\det A=0\iff$ koi $\lambda_i=0\iff A$ singular (invertible nahi).

$2\times2$ ke liye: $\det(A-tI)=(a-t)(d-t)-bc=t^2-(a+d)t+(ad-bc)$, yani
$$\chi(t)=t^2-(\operatorname{tr}A)\,t+\det A.$$
($\operatorname{tr}A$ = trace = diagonal ka sum.)

**Example:** $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$: trace $7$, det $10$. $\chi(t)=t^2-7t+10=(t-2)(t-5)$, eigenvalues $2,5$, product $10=\det A$. ✓

**Dhyan do:** $\det(A-tI)$ ko kisi bhi number $t$ par evaluate karo to $\prod(\lambda_i-t)$ milta hai. Isliye $\det(A-I)=\chi(1)=\prod(\lambda_i-1)$, bina $A$ jaane.

### 7. $\det p(A)=\prod p(\lambda_i)$
**Idea:** agar $Av=\lambda v$, to $A^2v=A(\lambda v)=\lambda^2v$, aur $(A^2+3A+I)v=(\lambda^2+3\lambda+1)v$. Matlab polynomial $p(A)$ ke eigenvalues hain $p(\lambda_1),\ldots,p(\lambda_n)$. Aur det = eigenvalues ka product. To
$$\det p(A)=p(\lambda_1)\,p(\lambda_2)\cdots p(\lambda_n).$$
$A^{-1}$ wale terms bhi chalte hain: $A^{-1}v=\frac1\lambda v$, to $\det(A^{-1}+2I)=\prod(\frac1{\lambda_i}+2)$.

**Example:** eigenvalues $1,2,-1$; $\det(A^2+I)=(1+1)(4+1)(1+1)=2\cdot5\cdot2=20$.

**Dhyan do:** **galat** tareeka: $\det A=-2$, to "$(\det A)^2+1=5$". Ye galat hai kyunki $\det$ sum ke saath nahi chalta. Hamesha har eigenvalue ko transform karo, phir multiply karo (add nahi).

### 8. Adjugate: $\det(\operatorname{adj}A)=(\det A)^{n-1}$
**Idea:** $\operatorname{adj}A$ cofactors ka transpose hai, aur basic identity hai
$$A\cdot\operatorname{adj}A=(\det A)\,I.$$
Dono taraf det lo: $\det A\cdot\det(\operatorname{adj}A)=(\det A)^n$ (kyunki $\det(cI_n)=c^n$). Divide by $\det A$: $\det(\operatorname{adj}A)=(\det A)^{n-1}$.

**Example:** $3\times3$, $\det A=3$: $\det(\operatorname{adj}A)=3^2=9$.

**Dhyan do:** exponent $n-1$ hai, $n$ nahi. $2\times2$ me $\det(\operatorname{adj}A)=\det A$ hi hota hai.

### 9. Do special results
**(a) $\det(I+xx^T)=1+x^Tx$.** $xx^T$ ek rank-one matrix hai: $(xx^T)x=x(x^Tx)$, to $x$ eigenvector hai eigenvalue $x^Tx$ ke saath; $x$ ke perpendicular har vector $w$ par $xx^Tw=0$. To $xx^T$ ke eigenvalues $x^Tx,0,\ldots,0$, aur $I+xx^T$ ke $1+x^Tx,1,\ldots,1$. Product $=1+x^Tx$.
Example: $x=(1,2)$: $x^Tx=5$, $\det(I+xx^T)=6$. Check: $I+xx^T=\begin{pmatrix}2&2\\2&5\end{pmatrix}$, det $=10-4=6$. ✓

**(b) Skew-symmetric, $n$ odd $\Rightarrow\det A=0$.** Skew-symmetric matlab $A^T=-A$. Then $\det A=\det A^T=\det(-A)=(-1)^n\det A=-\det A$ (n odd). To $2\det A=0$, $\det A=0$.

**Dhyan do:** even $n$ ke liye ye argument kuch nahi deta; $\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ ka det $1$ hai.

## Solved examples

**Example 1 (NAT, easy):** $A$ ek $3\times3$ matrix hai, $\det A=2$. $\det(3A^{-1})$ nikalo.

**Soch:** "constant $\times$ inverse" — do rules chahiye: $c^n$ aur $1/\det A$.

**Solution:**
1. $\det(3A^{-1})=3^3\det(A^{-1})$ kyunki $n=3$.
2. $\det(A^{-1})=1/2$.
3. $27\times\frac12=13.5$.

**Galti kahan hoti hai:** $3\cdot\frac12=1.5$ likhna — yani $c^n$ ki jagah sirf $c$ lagana.

**Example 2 (MCQ, easy-medium):** $A$ $3\times3$ hai, $\det A=4$. $B$ banaya: (i) row 1 aur row 2 swap, (ii) row 3 ko $-2$ se multiply, (iii) $R_2\to R_2+5R_1$. $\det B=$
(A) $-8$ (B) $8$ (C) $40$ (D) $-40$

**Soch:** har operation ka factor alag se track karo.

**Solution:**
1. Swap: $4\to-4$.
2. Ek row $\times(-2)$: $-4\to8$.
3. Row replacement: koi change nahi, $8$.

Answer **(B) 8**.

**Galti kahan hoti hai:** (A) $-8$ aata hai jab swap ka $-1$ bhool jaate ho: $4\cdot(-2)=-8$. (C) $40$ aata hai jab row replacement ko "$\times5$" maan lete ho: $4\cdot(-1)\cdot(-2)\cdot5=40$. Dono galtiyan saath karo to (D) $-40$.

**Example 3 (MSQ, medium):** $A,B$ $3\times3$ hain, $\det A=2$, $\det B=-3$. Kaunse statements sahi hain?
(A) $\det(AB^T)=-6$
(B) $\det(2A)=4$
(C) $\det(A+B)=-1$
(D) $\det(A^2B^{-1})=-\frac43$

**Soch:** product/transpose/inverse/power — sab multiplicative rules. Sum par koi rule nahi.

**Solution:**
1. (A) $\det A\cdot\det B^T=2\cdot(-3)=-6$. ✓
2. (B) $2^3\cdot2=16\ne4$. ✗
3. (C) $\det(A+B)$ sirf $\det A,\det B$ se nikal hi nahi sakta. ✗
4. (D) $(\det A)^2/\det B=4/(-3)=-\frac43$. ✓

Answer **(A), (D)**.

**Galti kahan hoti hai:** (C) ko additivity se tick karna, aur (B) me $c$ ki jagah $c^n$ bhoolna.

**Example 4 (NAT, medium):** $3\times3$ matrix $A$ ke eigenvalues $2,-1,3$ hain. $\det(A^2-2A+I)$ nikalo.

**Soch:** "eigenvalues diye, det of polynomial in $A$" → $\prod p(\lambda_i)$.

**Solution:**
1. $p(t)=t^2-2t+1=(t-1)^2$.
2. $p(2)=1$, $p(-1)=4$, $p(3)=4$.
3. Product $=1\cdot4\cdot4=16$.

**Galti kahan hoti hai:** $\det A=2\cdot(-1)\cdot3=-6$ nikaal ke $p(-6)=36+12+1=49$ likhna. $\det$ ko $p$ me plug nahi karte. Doosri galti: $1+4+4=9$ (add kar diya).

**Example 5 (NAT, medium):** $2\times2$ matrix $A$ ka trace $4$ aur determinant $-5$ hai. $\det(A+2I)$ nikalo.

**Soch:** $2\times2$ + trace + det → characteristic polynomial. $A+2I=A-(-2)I$, to $t=-2$ par $\chi$.

**Solution:**
1. $\chi(t)=\det(A-tI)=t^2-4t-5$.
2. $\det(A+2I)=\chi(-2)=4+8-5=7$.
3. Cross-check: $t^2-4t-5=(t-5)(t+1)$, eigenvalues $5,-1$. $(5+2)(-1+2)=7\cdot1=7$. ✓

**Galti kahan hoti hai:** $\chi(2)=4-8-5=-9$ likhna — yani $A+2I$ ko $t=+2$ samajhna. $A-tI$ me $t=-2$ rakhne se $A+2I$ banta hai.

**Example 6 (NAT, hard):** $A$ ek $4\times4$ matrix hai, $\det A=3$. $\det(2\operatorname{adj}A)$ nikalo.

**Soch:** do rules: scaling $c^n$ aur $\det\operatorname{adj}=(\det A)^{n-1}$.

**Solution:**
1. $\det(2\operatorname{adj}A)=2^4\det(\operatorname{adj}A)$.
2. $\det(\operatorname{adj}A)=3^{4-1}=27$.
3. $16\cdot27=432$.

**Galti kahan hoti hai:** $(\det A)^n=81$ lena (answer $1296$), ya $2\cdot27=54$ (scaling me $2^4$ bhoolna).

## Confusions clear karo

**Q:** $\det(cA)$ me $c^n$ aur row-scaling me sirf $c$ — dono kaise sahi?
**A:** Row-scaling me *ek* row badli, to ek factor $c$. $cA$ me *saari* $n$ rows badli, to $n$ factors: $c^n$.

**Q:** Kya transpose karne se det ka sign badalta hai?
**A:** Nahi, kabhi nahi. $\det A^T=\det A$. Sign sirf row (ya column) swap se badalta hai.

**Q:** Diagonal entries multiply karke det kab milta hai?
**A:** Sirf triangular ya diagonal matrix me. $\begin{pmatrix}1&2\\3&4\end{pmatrix}$ ka det $-2$ hai, diagonal product $4$ nahi.

**Q:** $\det p(A)$ ke liye eigenvalues ka sum ya product?
**A:** Product. Determinant hamesha eigenvalues ka product hai, to $\det p(A)=\prod p(\lambda_i)$. Sum to trace deta hai: $\operatorname{tr}p(A)=\sum p(\lambda_i)$.

**Q:** $\det A=0$ ka matlab kya hai, practically?
**A:** $A$ space ko kisi chhoti dimension me daba deta hai (area/volume zero). Isliye $A^{-1}$ nahi hota, $Ax=0$ ke non-zero solutions hote hain, aur $0$ ek eigenvalue hota hai — ye sab ek hi baat hai.

**Q:** Characteristic polynomial $\det(A-tI)$ hai ya $\det(tI-A)$?
**A:** Dono use hote hain; inme sirf $(-1)^n$ ka farak hai. Roots (eigenvalues) same. Is lesson me $\chi(t)=\det(A-tI)$, jisse $\det(A-cI)=\chi(c)$ seedha milta hai.

**Q:** Row replacement $R_2\to R_2-3R_1$ ke baad det change kyun nahi hota jab matrix change ho gaya?
**A:** Matrix badla, area nahi. Ye shear hai: parallelogram tircha hota hai par base aur height same rehte hain.

## Khud try karo

**1.** $\det\begin{pmatrix}2&5&7\\0&-1&4\\0&0&3\end{pmatrix}$ = ?

<details><summary>Answer dekho</summary>

Upper triangular hai, to diagonal ka product: $2\cdot(-1)\cdot3=-6$.

</details>

**2.** $A$ $3\times3$ hai, $\det A=-2$. $\det(-2A^TA)$ nikalo.

<details><summary>Answer dekho</summary>

$(-2)^3\cdot\det A^T\cdot\det A=-8\cdot(-2)\cdot(-2)=-8\cdot4=-32$.

</details>

**3.** $3\times3$ matrix ke eigenvalues $1,-1,2$ hain. $\det(A^2+2I)$ nikalo.

<details><summary>Answer dekho</summary>

$p(t)=t^2+2$: $p(1)=3$, $p(-1)=3$, $p(2)=6$. Product $3\cdot3\cdot6=54$.

</details>

**4.** $x=(1,2,2)^T$. $\det(I_3+xx^T)$ nikalo.

<details><summary>Answer dekho</summary>

$x^Tx=1+4+4=9$, to $\det(I+xx^T)=1+9=10$. (Eigenvalues $10,1,1$.)

</details>

**5.** $A$ ek $5\times5$ real skew-symmetric matrix hai. $\det A$ = ?

<details><summary>Answer dekho</summary>

$\det A=\det A^T=\det(-A)=(-1)^5\det A=-\det A$, to $\det A=0$.

</details>

## Ek page me
- $\det$ = area/volume ka scaling factor; sign = orientation ulti hui ya nahi.
- $2\times2$: $ad-bc$; $3\times3$: cofactor expansion, signs $+,-,+$.
- Triangular / block triangular: diagonal (blocks) ka product.
- Swap: $\times(-1)$; ek row $\times c$: $\times c$; row replacement: koi change nahi.
- $\det(cA)=c^n\det A$; $\det(-A)=(-1)^n\det A$.
- $\det(AB)=\det A\det B$, $\det A^T=\det A$, $\det A^{-1}=1/\det A$; sum ka koi rule nahi.
- $\det A=\prod\lambda_i$; $\det A=0\iff$ singular $\iff0$ eigenvalue.
- $\det(A-tI)=\prod(\lambda_i-t)$; $2\times2$: $t^2-(\operatorname{tr}A)t+\det A$.
- $\det p(A)=\prod p(\lambda_i)$ — transform har eigenvalue, phir multiply; $\det A$ ko $p$ me plug mat karo.
- $\det(\operatorname{adj}A)=(\det A)^{n-1}$.
- $\det(I+xx^T)=1+x^Tx$; odd order skew-symmetric ka det $0$.

Revision ke liye **Short note** tab dekho.
