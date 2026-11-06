# PCA and dimensionality reduction

> **Time:** ~30 min · **Pehle aana chahiye:** mean aur variance, covariance ka idea, 2×2 matrix ke eigenvalues/eigenvectors, unit vector · **Day:** 54

## Ye topic kyun?

Data me bahut saare features hon (jaise 100 columns), to unme se kai ek-doosre ki copy jaise hote hain. PCA (Principal Component Analysis) kuch naye "directions" dhoondhta hai jin par data sabse zyada phaila hua hai, taaki kam dimensions me zyada information rakh sakein. GATE DA me ye aksar NAT ke roop me aata hai: covariance matrix se PC1 ki variance (= sabse bada eigenvalue), kisi direction me variance, explained variance ratio, reconstruction error, SVD se variance; aur MCQ/MSQ me centering, scaling aur PCA vs LDA.

## Picture se samjho

Socho ek lambi patli machhli jaisi points ki cloud hai, jo tirchhi (diagonal) padi hai. Agar tumhe har point ko sirf **ek number** se describe karna ho, to sabse samajhdaar tarika hai: cloud ki lambai wali direction par ek ruler rakho aur har point ka us ruler par "shadow" (projection) le lo. Shadows sabse zyada phaile hue honge — information sabse kam khoyegi. Wahi direction PC1 hai.

<figure class="fig">
<svg viewBox="0 0 440 250" xmlns="http://www.w3.org/2000/svg">
<line x1="70" y1="215" x2="330" y2="65" style="stroke:var(--muted)" stroke-dasharray="5 4"/>
<circle cx="110" cy="204" r="4" style="fill:var(--info)"/><circle cx="123" cy="167" r="4" style="fill:var(--info)"/><circle cx="154" cy="180" r="4" style="fill:var(--info)"/><circle cx="170" cy="148" r="4" style="fill:var(--info)"/>
<circle cx="200" cy="161" r="4" style="fill:var(--info)"/><circle cx="207" cy="122" r="4" style="fill:var(--info)"/><circle cx="247" cy="92" r="4" style="fill:var(--info)"/><circle cx="282" cy="102" r="4" style="fill:var(--info)"/>
<circle cx="297" cy="77" r="4" style="fill:var(--info)"/><circle cx="115" cy="183" r="4" style="fill:var(--info)"/><circle cx="229" cy="140" r="4" style="fill:var(--info)"/>
<circle cx="240" cy="129" r="5" style="fill:var(--bad)"/>
<line x1="240" y1="129" x2="234.6" y2="120" style="stroke:var(--bad)" stroke-dasharray="3 2"/>
<circle cx="234.6" cy="120" r="3" style="fill:var(--bad)"/>
<line x1="200" y1="140" x2="305" y2="79.5" style="stroke:var(--mark)" stroke-width="3"/>
<polygon points="313,75 305.6,86.2 299.6,75.8" style="fill:var(--mark)"/>
<line x1="200" y1="140" x2="222" y2="178" style="stroke:var(--good)" stroke-width="3"/>
<polygon points="227.5,187.6 226.7,174.2 216.3,180.2" style="fill:var(--good)"/>
<circle cx="200" cy="140" r="4" style="fill:currentColor"/>
<text x="168" y="134" style="fill:currentColor" font-size="11">mean</text>
<text x="318" y="72" style="fill:currentColor" font-size="12">PC1 (bada λ)</text>
<text x="234" y="204" style="fill:currentColor" font-size="12">PC2 (chhota λ)</text>
<text x="250" y="140" style="fill:currentColor" font-size="11">point → PC1 par shadow</text>
<text x="20" y="24" style="fill:currentColor" font-size="12">PC1 ⟂ PC2; dono mean se nikalte hain</text>
</svg>
<figcaption>Tirchhi cloud: PC1 lambai ki direction (sabse zyada variance), PC2 uske perpendicular (bachi hui chhoti variance).</figcaption>
</figure>

Dhyan do: (1) arrows **mean** se nikalte hain — isliye pehle data center karna padta hai. (2) PC1 aur PC2 perpendicular hain. (3) Red point ko PC1 par project karne se jo chhota dashed tukda chhoot gaya, wahi "reconstruction error" hai; wo PC2 direction me hai. Jitni chhoti PC2 variance, utna kam error.

Ab ek important warning picture: PCA labels nahi dekhta.

<figure class="fig">
<svg viewBox="0 0 440 220" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="210" cy="80" rx="170" ry="18" style="fill:var(--info)" opacity="0.35"/>
<ellipse cx="210" cy="140" rx="170" ry="18" style="fill:var(--good)" opacity="0.35"/>
<text x="20" y="84" style="fill:currentColor" font-size="12">A</text>
<text x="20" y="144" style="fill:currentColor" font-size="12">B</text>
<line x1="60" y1="190" x2="350" y2="190" style="stroke:var(--mark)" stroke-width="3"/>
<polygon points="362,190 350,184 350,196" style="fill:var(--mark)"/>
<text x="120" y="210" style="fill:currentColor" font-size="12">PCA direction: x₁ (sabse zyada variance)</text>
<line x1="400" y1="160" x2="400" y2="70" style="stroke:var(--bad)" stroke-width="3"/>
<polygon points="400,58 394,70 406,70" style="fill:var(--bad)"/>
<text x="330" y="40" style="fill:currentColor" font-size="12">LDA direction: x₂</text>
</svg>
<figcaption>Do classes x₁ me lambi phaili hain, par sirf x₂ me alag hain. PCA x₁ chunega (classes mix), LDA x₂ chunega (classes alag).</figcaption>
</figure>

Dhyan do: "sabse zyada variance" aur "classes ko best alag karna" do alag cheezein hain. PCA unsupervised hai, to wo class information ka khayal nahi rakhta.

## Concept step-by-step

### 1. Centering aur covariance matrix

$n$ points $x_1, \dots, x_n \in \mathbb{R}^d$. Pehle mean $\bar x$ ghatao: $\tilde x_i = x_i - \bar x$ (centering). Phir covariance matrix:
$$C = \frac{1}{n}\sum_{i} \tilde x_i \tilde x_i^\top \quad (\text{ya } \tfrac{1}{n-1}; \text{ jo question bole})$$
$C$ ka $(j, j)$ entry feature $j$ ki variance, $(j, k)$ entry features $j, k$ ki covariance. $C$ symmetric hai.

Tiny example: points $(1,1), (3,1), (3,5), (5,5)$. Mean $= (3, 3)$. Centered: $(-2,-2), (0,-2), (0,2), (2,2)$.
- $\sum \tilde x_1^2 = 4 + 0 + 0 + 4 = 8$, $\sum \tilde x_1\tilde x_2 = 4 + 0 + 0 + 4 = 8$, $\sum \tilde x_2^2 = 4 + 4 + 4 + 4 = 16$.
- Divisor $n = 4$: $C = \begin{pmatrix} 2 & 2 \\ 2 & 4 \end{pmatrix}$.

Dhyan do: divisor $n$ ho ya $n-1$, eigenvectors same rehte hain, par eigenvalues ka scale badalta hai — NAT me jo divisor diya ho wahi lo.

### 2. Variance kisi bhi direction me: $u^\top C u$

Unit vector $u$ ($\lVert u\rVert = 1$) par har point ka projection (shadow) $u^\top \tilde x_i$ hai. Unki variance:
$$\frac1n\sum_i (u^\top \tilde x_i)^2 = \frac1n\sum_i u^\top \tilde x_i \tilde x_i^\top u = u^\top C u$$

Tiny example: $C = \begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}$.
- $u = (1, 0)$: $u^\top C u = 3$ (bas pehla diagonal entry).
- $u = (1,1)/\sqrt2$: $\frac12(3 + 1 + 1 + 3) = 4$.

Dhyan do: $u$ ko pehle normalise karo. $(1,1)$ seedha daaloge to $8$ aayega — double.

### 3. Principal components = eigenvectors of $C$

PC1 wo unit $u$ hai jo $u^\top C u$ ko maximise kare. Lagrange (constraint $u^\top u = 1$) lagao: $\nabla(u^\top C u - \lambda(u^\top u - 1)) = 2Cu - 2\lambda u = 0 \Rightarrow Cu = \lambda u$. Matlab optimum ek eigenvector hai, aur wahan $u^\top C u = \lambda u^\top u = \lambda$. Sabse bada chahiye, to:

- PC1 = $\lambda_{\max}$ ka eigenvector, aur **PC1 par variance $= \lambda_1 = \lambda_{\max}$**.
- PC2 = agla eigenvector (PC1 ke perpendicular), variance $\lambda_2$; aur aage.
- $C$ symmetric hai, to eigenvectors orthonormal chune ja sakte hain; eigenvalues $\ge 0$.
- Last PC = minimum variance direction.

**2×2 shortcut:** $T = $ trace, $D = $ det:
$$\lambda = \frac{T}{2} \pm \sqrt{\frac{T^2}{4} - D}$$
(ye characteristic equation $\lambda^2 - T\lambda + D = 0$ ka solution hai.)

Tiny example: $C = \begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}$: $T = 6$, $D = 8$, $\lambda = 3 \pm 1 = 4, 2$. PC1 $= (1,1)/\sqrt2$ (check: $Cu = (4,4)/\sqrt2 = 4u$ ✓). Upar step 2 me $(1,1)/\sqrt2$ par variance 4 aayi thi — wahi $\lambda_{\max}$.

Dhyan do: off-diagonal non-zero ho to diagonal entries eigenvalues **nahi** hain. $\lambda_{\max}$ hamesha largest diagonal entry se $\ge$ hota hai.

### 4. Special shapes of $C$

- **Diagonal $C$:** PCs = coordinate axes, eigenvalues = diagonal entries.
- **Block-diagonal $C$:** har block ke eigenvalues alag nikaalo. Example: $C = \begin{pmatrix} 3 & 0 & 0 \\ 0 & 5 & 2 \\ 0 & 2 & 2 \end{pmatrix}$: block $(3)$ → 3; block $\begin{pmatrix} 5 & 2 \\ 2 & 2\end{pmatrix}$: $T = 7$, $D = 6$, $\lambda = 3.5 \pm 2.5 = 6, 1$. Sab: $6, 3, 1$.

Dhyan do: block nikaalte waqt galat rows/columns mat milao — zero wale rows/columns se block pehchaano.

### 5. Total variance, explained ratio, reconstruction error

- **Total variance** $= \sum_j \text{Var}(\text{feature } j) = \operatorname{trace}(C) = \sum_k \lambda_k$ (trace = eigenvalues ka sum, rotation se total phailaav nahi badalta).
- **Explained variance ratio** (top $k$ PCs): $\dfrac{\lambda_1 + \dots + \lambda_k}{\lambda_1 + \dots + \lambda_d}$.
- **Reconstruction:** har point ko top $k$ PCs par project karke wapas lao: $\hat x_i = \bar x + \sum_{j \le k} (u_j^\top \tilde x_i)\,u_j$. Error sirf chhode hue directions me bachta hai, to
$$\frac1n\sum_i \lVert x_i - \hat x_i\rVert^2 = \sum_{j > k}\lambda_j$$

Tiny example: eigenvalues $5, 3, 1, 1$ (total 10). Top 2: ratio $= 8/10 = 0.8$, reconstruction MSE $= 1 + 1 = 2$. Lost fraction $= 0.2$.

Dhyan do: "retained" aur "lost" ko mix mat karo; question ke shabd dhyan se padho.

### 6. SVD route

Centered data matrix $X$ ($n \times d$, har row ek point). SVD: $X = U\Sigma V^\top$. Tab
$$C = \frac1n X^\top X = V\,\frac{\Sigma^2}{n}\,V^\top$$
To PCs = $V$ ke columns, aur $\lambda_k = \sigma_k^2 / n$.

Tiny example: $n = 4$, singular values $6, 2$ → $\lambda = 36/4, 4/4 = 9, 1$. Explained by PC1 $= 0.9$.

Dhyan do: singular value khud variance nahi hai; square karo aur $n$ (ya diya hua divisor) se divide karo.

### 7. Centering bhoole to kya?

Bina centering ke matrix $\frac1n\sum x_i x_i^\top = C + \bar x\bar x^\top$ banta hai. Agar mean bada hai (jaise sab points $(100, 100)$ ke paas), to $\bar x\bar x^\top$ term haavi ho jaata hai aur top direction lagbhag **mean ki direction** ($\bar x/\lVert\bar x\rVert$) ban jaati hai — asli spread wali nahi.

Tiny example: upar wale 4 points (mean $(3,3)$) ka uncentered matrix $\begin{pmatrix} 11 & 11 \\ 11 & 13\end{pmatrix}$ hai; iska top eigenvalue $\approx 23.05$, jabki sahi $\lambda_{\max} \approx 5.24$.

Dhyan do: uncentered PCA ke bhi eigenvectors hote hain — bas wo galat sawaal ka jawab dete hain.

### 8. Scaling aur standardisation

Feature ko $c$ se multiply karo to uski variance $c^2$ guna, aur PCs us feature ki taraf jhuk jaate hain. Example: $C = I$ (2×2) me feature 1 ko 3 se multiply → $C = \operatorname{diag}(9, 1)$ → PC1 = feature-1 axis, sirf units badalne se!

Isliye alag units (cm, rupees, years) ho to pehle **standardise** karo (mean ghatao, SD se divide). Ye correlation-matrix PCA hai. Sirf centering kaafi nahi.

Dhyan do: "PCA scale-invariant hai" galat hai.

### 9. PCA vs LDA

| | PCA | LDA |
|---|---|---|
| Labels | nahi chahiye (unsupervised) | chahiye (supervised) |
| Objective | max variance | max $\dfrac{\text{between-class scatter}}{\text{within-class scatter}}$ (Fisher) |
| Max directions | $d$ (features jitne) | $C - 1$ ($C$ = classes) |

$C - 1$ kyun: between-class scatter $S_B = \sum_c n_c(\mu_c - \mu)(\mu_c - \mu)^\top$ me $C$ vectors $(\mu_c - \mu)$ hain, jinka weighted sum $\sum_c n_c(\mu_c - \mu) = 0$ hai. To sirf $C - 1$ independent → rank $\le C - 1$.

Tiny example: 3 classes, 10 features → LDA max 2 directions; PCA 10 tak.

Dhyan do: binary classification (2 classes) me LDA sirf 1 direction deta hai.

## Solved examples

**Example 1 (NAT, easy):** Centered 2-feature data have covariance $C = \begin{pmatrix} 6 & 2 \\ 2 & 3 \end{pmatrix}$. The variance of the data projected on the first principal component is ______.

**Soch:** "variance along PC1" = $\lambda_{\max}$; 2×2 → trace/det formula.

**Solution:**
1. $T = 9$, $D = 18 - 4 = 14$.
2. $\lambda = 4.5 \pm \sqrt{20.25 - 14} = 4.5 \pm 2.5$ → $7, 2$.
3. $\lambda_{\max} = 7$.

**Answer: 7.**

**Galti kahan hoti hai:** largest diagonal entry 6 likh dena (off-diagonal ignore kiya), ya trace 9 (total variance) likhna.

**Example 2 (MCQ, easy):** For the same $C$, the variance of projections onto the direction of $(1, 2)$ is
(A) 26 (B) 5.2 (C) 7 (D) 9

**Soch:** kisi diye hue direction me variance → $u^\top C u$ with **unit** $u$.

**Solution:**
1. $\lVert(1,2)\rVert = \sqrt5$, $u = (1, 2)/\sqrt5$.
2. $(1,2)\,C\,(1,2)^\top = 6\cdot1 + 2\cdot(2\cdot1\cdot2) + 3\cdot4 = 6 + 8 + 12 = 26$.
3. Divide by $\lVert\cdot\rVert^2 = 5$: $26/5 = 5.2$.

**Answer: (B).**

**Galti kahan hoti hai:** normalise karna bhoolna → 26 (A). (C) $\lambda_{\max}$ hai — $(1,2)$ eigenvector nahi hai, aur 5.2 < 7 jo hona hi chahiye.

**Example 3 (NAT, medium):** A centered 3-feature data set has covariance $C = \begin{pmatrix} 3 & 0 & 0 \\ 0 & 5 & 2 \\ 0 & 2 & 2 \end{pmatrix}$ (divisor $n$). The fraction of total variance retained by the first principal component alone is ______ (one decimal).

**Soch:** block-diagonal → blocks ke eigenvalues; ratio = top / trace.

**Solution:**
1. Block $(3)$ → $\lambda = 3$.
2. Block $\begin{pmatrix} 5 & 2 \\ 2 & 2 \end{pmatrix}$: $T = 7$, $D = 10 - 4 = 6$, $\lambda = 3.5 \pm 2.5 = 6, 1$.
3. Eigenvalues: $6, 3, 1$; total $= 10$ (= trace $3 + 5 + 2$ ✓).
4. Retained by PC1 $= 6/10 = 0.6$.

**Answer: 0.6.** (Bonus: PC1 se reconstruct karne par MSE $= 3 + 1 = 4$.)

**Galti kahan hoti hai:** largest diagonal 5 ko $\lambda_1$ maan ke $5/10 = 0.5$; ya lost fraction $0.4$ likh dena.

**Example 4 (NAT, hard):** Four points in the plane: $(1,1), (3,1), (3,5), (5,5)$. Using covariance with divisor $n$, the variance of the data along the first principal component is ______ (two decimals).

**Soch:** raw points → center → $C$ → 2×2 eigen formula.

**Solution:**
1. Mean $= (12/4, 12/4) = (3, 3)$.
2. Centered: $(-2,-2), (0,-2), (0,2), (2,2)$.
3. $C_{11} = 8/4 = 2$, $C_{12} = 8/4 = 2$, $C_{22} = 16/4 = 4$. $C = \begin{pmatrix} 2 & 2 \\ 2 & 4 \end{pmatrix}$.
4. $T = 6$, $D = 8 - 4 = 4$. $\lambda = 3 \pm \sqrt{9 - 4} = 3 \pm \sqrt5$.
5. $\lambda_{\max} = 3 + 2.236 = 5.236 \approx 5.24$. (PC1 $\approx (0.53, 0.85)$.)

**Answer: 5.24.**

**Galti kahan hoti hai:** center kiye bina $\frac1n\sum x x^\top = \begin{pmatrix} 11 & 11 \\ 11 & 13\end{pmatrix}$ lena → $\approx 23.05$. Ya divisor $n - 1 = 3$ lena → $6.98$ (question ne $n$ bola hai).

**Example 5 (MSQ, medium):** Which statements are correct?
- (A) A centered data matrix with $n = 8$ rows has singular values 4 and 2; with covariance $\frac1n X^\top X$ the variance along PC1 is 2.
- (B) LDA on 20-dimensional data with 4 classes gives at most 3 discriminant directions.
- (C) PCA without centering, on data clustered near $(50, 50)$, finds the direction of largest spread.
- (D) Multiplying one feature by 10 multiplies its variance by 10.

**Soch:** SVD → $\sigma^2/n$; LDA → $C - 1$; uncentered → mean direction; scaling → $c^2$.

**Solution:**
1. (A) $\lambda_1 = 4^2/8 = 2$ → sahi.
2. (B) $4 - 1 = 3$ → sahi.
3. (C) $\bar x\bar x^\top$ haavi → direction $\approx (1,1)/\sqrt2$ (mean ki taraf), spread wali nahi → galat.
4. (D) Variance $\times 10^2 = 100$ → galat.

**Answer: (A), (B).**

**Galti kahan hoti hai:** (A) me $\sigma = 4$ ko hi variance maan lena ya $\sigma/n = 0.5$ lena. (D) me linear sochna.

## Confusions clear karo

**Q:** PC1 ki variance aur total variance me kya farak?
**A:** PC1 ki variance = $\lambda_{\max}$ (sirf ek direction ka phailaav). Total variance = trace = saare $\lambda$ ka sum (saari directions milake).

**Q:** Eigenvector ka sign ulta aa jaaye to?
**A:** $u$ aur $-u$ same line hain; variance $u^\top C u$ same. PCA me sign arbitrary hai.

**Q:** $n$ aur $n-1$ me kab kya?
**A:** $n - 1$ sample covariance (unbiased) hai, $n$ simple average. Directions same, values thodi alag. Exam jo bole wahi; kuch na bole to aksar diya hua $C$ hi use hota hai.

**Q:** Reconstruction error sum of dropped eigenvalues kyun?
**A:** PCs orthonormal hain, to har centered point $= \sum_j (u_j^\top\tilde x)u_j$. Top $k$ rakhne par bacha hua hissa $\sum_{j>k}(u_j^\top \tilde x)u_j$, uska squared length $\sum_{j>k}(u_j^\top\tilde x)^2$. Average lo → $\sum_{j>k} u_j^\top C u_j = \sum_{j>k}\lambda_j$.

**Q:** PCA ke baad naye features kaun se hain?
**A:** Har point ke scores $u_1^\top\tilde x, \dots, u_k^\top\tilde x$. Ye purane features ke linear combinations hain aur aapas me uncorrelated hain.

**Q:** Classification se pehle PCA lagana safe hai?
**A:** Aksar madad karta hai (noise kam), par guarantee nahi: agar class-separating direction ki variance chhoti ho, PCA use phenk sakta hai. Tab LDA better.

## Khud try karo

1. $C = \begin{pmatrix} 4 & 2 \\ 2 & 1 \end{pmatrix}$ (centered data). Dono eigenvalues aur PC1 ka explained ratio?

<details><summary>Answer dekho</summary>

$T = 5$, $D = 4 - 4 = 0$ → $\lambda = 5, 0$. Ratio $= 5/5 = 1$. (Data poori tarah ek line par hai — direction $(2, 1)/\sqrt5$.)

</details>

2. 4 features, eigenvalues $8, 4, 2, 2$. Top 2 PCs rakhe. Retained fraction aur per-point reconstruction MSE?

<details><summary>Answer dekho</summary>

Total 16. Retained $= 12/16 = 0.75$. MSE $= 2 + 2 = 4$.

</details>

3. $C = \begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}$. Direction $(1, -1)$ me variance? Ye kis PC ki direction hai?

<details><summary>Answer dekho</summary>

$u = (1,-1)/\sqrt2$: $u^\top C u = \frac12(3 - 1 - 1 + 3) = 2$. Ye $\lambda_{\min} = 2$ hai, to $(1,-1)$ PC2 hai.

</details>

4. Centered $X$, $n = 10$, singular values $10, 4, 2$. Covariance $\frac1n X^\top X$ ke eigenvalues aur PC1 explained ratio?

<details><summary>Answer dekho</summary>

$\lambda = 100/10, 16/10, 4/10 = 10, 1.6, 0.4$. Total 12. Ratio $= 10/12 \approx 0.833$.

</details>

5. 5 classes, 3 features. LDA max kitni directions?

<details><summary>Answer dekho</summary>

$\min(C - 1, d) = \min(4, 3) = 3$. ($C - 1$ upper bound hai, par features se zyada directions nahi ho sakti.)

</details>

## Ek page me

- Pehle center: $\tilde x = x - \bar x$; $C = \frac1n\sum\tilde x\tilde x^\top$ (ya diya hua divisor).
- Unit $u$ par variance $= u^\top C u$ — pehle normalise.
- PCs = $C$ ke orthonormal eigenvectors, $\lambda$ descending; PC1 variance $= \lambda_{\max}$.
- 2×2: $\lambda = T/2 \pm \sqrt{T^2/4 - D}$; block-diagonal → blocks alag; diagonal → axes.
- Total variance $= \operatorname{trace}(C) = \sum\lambda$.
- Explained ratio (top $k$) $= \sum_{j\le k}\lambda_j / \sum\lambda_j$; reconstruction MSE $= \sum_{j>k}\lambda_j$.
- SVD: centered $X = U\Sigma V^\top$, PCs = columns of $V$, $\lambda = \sigma^2/n$.
- Bina centering → top direction mean ki taraf.
- Feature × $c$ → variance × $c^2$; alag units → standardise.
- PCA unsupervised (max variance, $\le d$ directions); LDA supervised (Fisher ratio, $\le C - 1$ directions).

Revision ke liye **Short note** tab dekho.
