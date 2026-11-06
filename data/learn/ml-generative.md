# Naive Bayes and LDA

> **Time:** ~35 min · **Pehle aana chahiye:** conditional probability aur Bayes' theorem, independence, normal distribution $N(\mu, \sigma^2)$ ka formula, $2\times 2$ matrix ka inverse · **Day:** 45, 49

## Ye topic kyun?

Ye dono **generative** classifiers hain: ye pehle seekhte hain ki har class ka data "kaisa dikhta hai" ($P(x \mid c)$), phir Bayes' rule se ulta karke batate hain ki diya hua $x$ kis class se aaya hoga ($P(c \mid x)$). Naive Bayes spam filter jaise text/categorical data par chalta hai; LDA Gaussian classes ke beech ek seedhi boundary deta hai. GATE DA me yahan se NAT aate hain (posterior, Laplace smoothing, error probability, 1-D threshold, Fisher criterion) aur MCQ/MSQ (naive assumption kya hai, LDA linear kyun hai, Fisher direction, LDA vs PCA).

## Picture se samjho

Socho ek hospital me 80% patients ko normal bukhar hai (class 1) aur 20% ko dengue (class 2). Ek test ki value $x$ hai: normal bukhar me $x$ usually 1 ke aas-paas, dengue me 5 ke aas-paas. Ab $x = 3$ aaya — beech me. Kya karein?

Har class ka "pahaad" banao, par uski **height ko prior se multiply** karo: class 1 ka pahaad $0.8 \times$ density, class 2 ka $0.2 \times$ density. Jahan jo pahaad ooncha, wahi class.

<figure class="fig">
<svg viewBox="0 0 500 270" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="220" x2="475" y2="220" stroke="currentColor"/>
<polyline points="40.0,216.7 57.5,211.6 75.0,201.0 92.5,182.2 110.0,153.6 127.5,117.1 145.0,79.4 162.5,50.4 180.0,39.5 197.5,50.4 215.0,79.4 232.5,117.1 250.0,153.6 267.5,182.2 285.0,201.0 302.5,211.6 320.0,216.7 337.5,218.9 355.0,219.7 372.5,219.9 390.0,220.0 407.5,220.0 425.0,220.0 442.5,220.0 460.0,220.0" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<polyline points="40.0,220.0 57.5,220.0 75.0,220.0 92.5,220.0 110.0,220.0 127.5,220.0 145.0,219.9 162.5,219.7 180.0,219.2 197.5,217.9 215.0,215.2 232.5,210.5 250.0,203.4 267.5,194.3 285.0,184.8 302.5,177.6 320.0,174.9 337.5,177.6 355.0,184.8 372.5,194.3 390.0,203.4 407.5,210.5 425.0,215.2 442.5,217.9 460.0,219.2" fill="none" style="stroke:var(--bad)" stroke-width="2.5"/>
<line x1="250" y1="225" x2="250" y2="60" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<line x1="274.3" y1="225" x2="274.3" y2="60" style="stroke:var(--mark)" stroke-width="2"/>
<text x="176" y="238" font-size="11" fill="currentColor">μ₁ = 1</text>
<text x="316" y="238" font-size="11" fill="currentColor">μ₂ = 5</text>
<text x="212" y="250" font-size="11" style="fill:var(--muted)">midpoint 3</text>
<text x="280" y="70" font-size="12" style="fill:var(--mark)">threshold t ≈ 3.69</text>
<text x="60" y="40" font-size="12" style="fill:var(--info)">0.8 × N(1, 2)</text>
<text x="350" y="160" font-size="12" style="fill:var(--bad)">0.2 × N(5, 2)</text>
<text x="70" y="258" font-size="12" fill="currentColor">← predict class 1</text>
<text x="300" y="258" font-size="12" fill="currentColor">predict class 2 →</text>
</svg>
<figcaption>Prior se scale kiye hue do Gaussian. Dono ka crossing point threshold hai; bade prior wali class (1) apni seema midpoint se aage, chhoti class ki taraf, khiska leti hai.</figcaption>
</figure>

Dhyan do: priors barabar hote to threshold exactly midpoint $3$ par hota. Class 1 zyada common hai, to "shak ho to class 1 bolo" — threshold class 2 ke mean ki taraf $3.69$ par chala gaya. Ye sirf multiplication by prior ka asar hai.

Doosri picture: LDA ka Fisher view. Do classes ke data clouds tirchhe (diagonal) hain. Agar hum unhe seedha mean-difference ki direction (horizontal) par project karein, to dono clouds ka shadow overlap karta hai. Thoda tilt karke project karo to shadows alag ho jaate hain.

<figure class="fig">
<svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="180" cy="140" rx="80" ry="22" transform="rotate(-45 180 140)" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<ellipse cx="300" cy="140" rx="80" ry="22" transform="rotate(-45 300 140)" fill="none" style="stroke:var(--bad)" stroke-width="2"/>
<circle cx="180" cy="140" r="4" style="fill:var(--info)"/>
<circle cx="300" cy="140" r="4" style="fill:var(--bad)"/>
<text x="50" y="230" font-size="12" style="fill:var(--info)">class 2, μ₂ = (2, 2)</text>
<text x="330" y="230" font-size="12" style="fill:var(--bad)">class 1, μ₁ = (4, 2)</text>
<line x1="180" y1="140" x2="292" y2="140" style="stroke:var(--muted)" stroke-width="2" stroke-dasharray="5 3"/>
<polygon points="300,140 290,135 290,145" style="fill:var(--muted)"/>
<text x="20" y="38" font-size="12" style="fill:var(--muted)">μ₁ − μ₂ = (2, 0)</text>
<line x1="180" y1="140" x2="281" y2="174" style="stroke:var(--good)" stroke-width="2.5"/>
<polygon points="290,177 279,179 283,169" style="fill:var(--good)"/>
<text x="20" y="20" font-size="12" style="fill:var(--good)">Fisher w ∝ S_W⁻¹(μ₁ − μ₂) ∝ (3, −1)</text>
<line x1="210" y1="230" x2="270" y2="50" style="stroke:var(--mark)" stroke-width="1.5" stroke-dasharray="3 3"/>
<text x="20" y="56" font-size="12" style="fill:var(--mark)">boundary ⟂ w</text>
<text x="20" y="270" font-size="11" fill="currentColor">Clouds (1, 1) direction me lambe hain: S_W = [[3, 1], [1, 3]]</text>
</svg>
<figcaption>Fisher direction mean-difference se thoda neeche jhukti hai, taaki clouds ki lambi (high-variance) direction se door rahe. Boundary is direction ke perpendicular hai.</figcaption>
</figure>

Dhyan do: best direction sirf "means ko door rakho" nahi, balki "means door aur har class ka apna phailaav kam" — isliye $S_W^{-1}$ ka factor aata hai.

## Concept step-by-step

### 1. Bayes' rule se classification

Teen shabd:
- **Prior** $P(c)$: data dekhne se pehle class $c$ kitni common hai.
- **Likelihood** $P(x \mid c)$: agar class $c$ hai to $x$ dikhne ke chances.
- **Posterior** $P(c \mid x)$: $x$ dekhne ke baad class $c$ ki probability.

$$P(c \mid x) = \frac{P(c)\,P(x \mid c)}{\sum_{c'} P(c')\,P(x \mid c')}.$$
Denominator har class ke liye same hai, to **prediction** ke liye bas numerator (score) compare karo. Par sawaal agar posterior maange to normalise karna padega.

Example: $P(c_1) = 0.3$, $P(x \mid c_1) = 0.5$; $P(c_2) = 0.7$, $P(x \mid c_2) = 0.1$. Scores: $0.15$ aur $0.07$. Posterior $P(c_1 \mid x) = 0.15/0.22 = 0.682$.

**Dhyan do:** prior kabhi mat chhodo. Likelihood $c_1$ ka 5 guna hai, phir bhi prior ki wajah se posterior $0.68$ hai, $0.83$ nahi.

### 2. "Naive" assumption

$x$ me $d$ features hain. $P(x_1, \dots, x_d \mid c)$ seedha estimate karna mushkil hai (har combination ke liye alag count chahiye — binary features me $2^d$). Naive Bayes maanta hai ki **class pata ho to features ek doosre se independent hain**:
$$P(x_1, \dots, x_d \mid c) = \prod_{j} P(x_j \mid c).$$
Ab har feature ka alag-alag count kaafi hai.

Ye **conditional** independence hai, marginal nahi. Example: "free" aur "offer" words overall saath-saath aate hain (dono spam me common), to marginally dependent hain. NB sirf ye kehta hai ki spam ke andar (ya ham ke andar) ek ka hona doosre ki probability nahi badalta.

Side effect: agar ek feature copy karke do baar daal diya, NB uska evidence **do baar** gin lega ($P(x_j \mid c)^2$), kyunki wo maanta hai dono independent hain.

**Dhyan do:** "features independent hain: $P(x) = \prod P(x_j)$" galat statement hai. Sahi: $P(x \mid c) = \prod_j P(x_j \mid c)$.

### 3. Counts se estimate (maximum likelihood)

- $P(c) = n_c / n$ (class $c$ ke rows / total rows).
- $P(x_j = v \mid c) = \dfrac{\text{class } c \text{ me } x_j = v \text{ wale rows}}{n_c}$.

Example: 10 emails, 4 spam. Spam me se 3 me "free" hai. $P(\text{spam}) = 0.4$, $P(\text{free} \mid \text{spam}) = 3/4$.

**Zero problem:** agar koi value class $c$ me kabhi nahi dikhi, to wo factor $0$ hai aur poora product $0$ — baaki features kitna bhi strong evidence dein, posterior $0$ ho jaata hai.

**Dhyan do:** denominator $n_c$ hai (us class ke rows), total $n$ nahi.

### 4. Laplace (add-one) smoothing

Zero se bachne ke liye har count me 1 jodo, aur denominator me utna jodo jitne possible values hain ($V$), taaki probabilities ka sum phir bhi 1 rahe:
$$P(w \mid c) = \frac{\text{count}(w, c) + 1}{N_c + V}.$$
Text (multinomial NB) me $N_c$ = class $c$ ke total word tokens, $V$ = vocabulary size. Binary feature me $V = 2$, $N_c = n_c$.

Example: class $C$ me 30 tokens, vocabulary 12 words, "free" 5 baar: $(5 + 1)/(30 + 12) = 6/42 = 0.143$. Ek word jo kabhi nahi aaya: $1/42 = 0.024$ (zero nahi).

Kyun $+V$: $V$ words me se har ek ko $+1$ mila, to total count $V$ se badha.

Asar: kabhi na dikhe word par $0 \to 1/42$ (bahut bada relative change); frequent word par $5/30 = 0.167 \to 0.143$ (chhota change).

**Dhyan do:** denominator me $+1$ ya $+2$ nahi, $+V$. Binary feature ke liye hi $V = 2$ hai.

### 5. Galti ki probability

Bayes classifier sabse badi posterior wali class chunta hai. Agar sach me koi doosri class thi to galti. Isliye $x$ par
$$P(\text{error} \mid x) = 1 - \max_c P(c \mid x).$$
Example: posteriors $0.682$ aur $0.318$ → predict $c_1$, error probability $0.318$.

**Dhyan do:** sawaal "probability of error" maange to $\max$ posterior nahi, $1 - \max$ likho.

### 6. Gaussian classes aur 1-D threshold

Ab feature continuous hai: class $k$ me $x \sim N(\mu_k, \sigma^2)$ (dono classes ka **same** variance), priors $\pi_1, \pi_2$. Boundary par dono scores barabar:
$$\pi_1 \frac{1}{\sqrt{2\pi}\sigma} e^{-(x-\mu_1)^2/2\sigma^2} = \pi_2 \frac{1}{\sqrt{2\pi}\sigma} e^{-(x-\mu_2)^2/2\sigma^2}.$$
Log lo; constant cancel:
$$\ln\pi_1 - \frac{(x-\mu_1)^2}{2\sigma^2} = \ln\pi_2 - \frac{(x-\mu_2)^2}{2\sigma^2}.$$
$(x-\mu_2)^2 - (x-\mu_1)^2 = (\mu_2 - \mu_1)(\mu_1 + \mu_2 - 2x)$ — dekho, **$x^2$ cancel** ho gaya (same $\sigma^2$ ki wajah se). Solve karne par:
$$t = \frac{\mu_1 + \mu_2}{2} + \frac{\sigma^2\ln(\pi_1/\pi_2)}{\mu_2 - \mu_1}.$$
Example (picture): $\mu_1 = 1$, $\mu_2 = 5$, $\sigma^2 = 2$, $\pi_1 = 0.8$, $\pi_2 = 0.2$: $t = 3 + \dfrac{2 \ln 4}{4} = 3 + 0.693 = 3.69$. Class 1 ($x < t$) ka region bada hua.

**Dhyan do:** formula me $\sigma^2$ (variance) hai, $\sigma$ nahi. Aur bade prior wali class ka region badhta hai — threshold **doosri** class ki taraf khisakta hai.

### 7. LDA aur QDA

**LDA** (Linear Discriminant Analysis): har class $N(\mu_k, \Sigma)$, aur saari classes ka **ek hi covariance** $\Sigma$. Multi-dimensional me log-score:
$$\ln\pi_k - \tfrac12 (x - \mu_k)^\top\Sigma^{-1}(x - \mu_k) = \ln\pi_k - \tfrac12 x^\top\Sigma^{-1}x + \mu_k^\top\Sigma^{-1}x - \tfrac12\mu_k^\top\Sigma^{-1}\mu_k.$$
$x^\top\Sigma^{-1}x$ term har class me same hai, to do classes compare karte waqt cancel ho jaata hai. Bacha sab $x$ me linear → **boundary hyperplane (linear)**.

Agar har class ka alag $\Sigma_k$ ho to quadratic term cancel nahi hota → **QDA**, boundary quadratic (curve).

Priors alag hon to bas constant $\ln\pi_k$ badalta hai → boundary parallel shift, linear hi rehti hai.

**Dhyan do:** LDA ka linear hona "shared covariance" ki wajah se hai — na ki "features independent" (wo NB hai) ya "priors equal".

### 8. Fisher's linear discriminant

Doosra nazariya (Gaussian maane bina): ek direction $w$ dhoondho jis par project karne se classes sabse achhi tarah alag hon. Criterion:
$$J(w) = \frac{\big(w^\top(\mu_1 - \mu_2)\big)^2}{w^\top S_W\, w},$$
numerator = projected means ki doori ka square (bada chahiye), denominator = projected within-class scatter (chhota chahiye). $S_W$ = dono classes ke scatter matrices ka sum (within-class scatter).

Maximiser:
$$w \propto S_W^{-1}(\mu_1 - \mu_2).$$
(Scale aur sign se direction nahi badalti.)

Example (picture): $\mu_1 - \mu_2 = (2, 0)$, $S_W = \begin{pmatrix} 3 & 1 \\ 1 & 3\end{pmatrix}$. $2\times2$ inverse: $\frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a\end{pmatrix} = \frac18\begin{pmatrix} 3 & -1 \\ -1 & 3\end{pmatrix}$. To $w = \frac18(6, -2) \propto (3, -1)$.
Check: $J(1, 0) = 4/3 = 1.33$, jabki $J(3, -1) = 36/24 = 1.5$ — Fisher direction behtar.

1-D me (har class ke points ek line par): $J = \dfrac{(\bar x_A - \bar x_B)^2}{s_A^2 + s_B^2}$, jahan $s^2 = \sum(x - \bar x)^2$ class ka scatter.

$K$ classes ke saath LDA **zyada se zyada $K - 1$** directions deta hai (between-class scatter $K$ means se banta hai, uska rank $\le K - 1$). Do classes → ek direction.

LDA **supervised** hai (labels use karta hai, class separation maximise karta hai); PCA **unsupervised** (labels nahi, total variance maximise).

**Dhyan do:** sirf $\mu_1 - \mu_2$ lena tabhi sahi hai jab $S_W \propto I$. $S_W$ se multiply karna galat — inverse chahiye. Aur numerator me mean difference ka **square** hai.

## Solved examples

**Example 1 (NAT, easy):** Spam filter, do binary features. $P(\text{spam}) = 0.4$. $P(W_1{=}1 \mid \text{spam}) = 0.7$, $P(W_2{=}1 \mid \text{spam}) = 0.4$, $P(W_1{=}1 \mid \text{ham}) = 0.1$, $P(W_2{=}1 \mid \text{ham}) = 0.5$. Email me $W_1 = 1$, $W_2 = 0$. $P(\text{spam} \mid \text{email})$ = ______ (do decimal).

**Soch:** NB posterior: prior × har feature ki likelihood, phir normalise. $W_2 = 0$ hai to complement lo.

**Solution:**
1. $P(W_2{=}0 \mid \text{spam}) = 0.6$, $P(W_2{=}0 \mid \text{ham}) = 0.5$.
2. Spam score $= 0.4 \times 0.7 \times 0.6 = 0.168$.
3. Ham score $= 0.6 \times 0.1 \times 0.5 = 0.030$.
4. Posterior $= 0.168/0.198 = 0.848 \approx 0.85$.

**Galti kahan hoti hai:** prior chhodna → $0.42/(0.42 + 0.05) = 0.89$. Ya $W_2 = 0$ ke liye bhi $P(W_2{=}1 \mid \cdot)$ use karna → $0.79$.

**Example 2 (NAT, medium):** NB (no smoothing) is data par train hua:

| # | Weather | Traffic | Late |
|---|---|---|---|
| 1 | Sunny | Low | No |
| 2 | Sunny | High | Yes |
| 3 | Rainy | High | Yes |
| 4 | Rainy | Low | Yes |
| 5 | Sunny | Low | No |
| 6 | Rainy | High | Yes |
| 7 | Sunny | High | No |
| 8 | Sunny | Low | No |
| 9 | Sunny | Low | No |

Naye din Weather = Sunny, Traffic = High. Classifier sabse badi posterior wali class predict karta hai. Is prediction ke **galat hone ki probability** = ______ (do decimal).

**Soch:** counts se priors aur likelihoods, scores, normalise, phir $1 - \max$.

**Solution:**
1. Yes: rows 2, 3, 4, 6 → $n_{Yes} = 4$. No: rows 1, 5, 7, 8, 9 → $n_{No} = 5$.
2. $P(\text{Sunny} \mid \text{Yes}) = 1/4$ (sirf row 2); $P(\text{High} \mid \text{Yes}) = 3/4$ (rows 2, 3, 6).
3. $P(\text{Sunny} \mid \text{No}) = 5/5 = 1$; $P(\text{High} \mid \text{No}) = 1/5$ (row 7).
4. Score(Yes) $= \frac49 \cdot \frac14 \cdot \frac34 = \frac1{12} = 0.0833$. Score(No) $= \frac59 \cdot 1 \cdot \frac15 = \frac19 = 0.1111$.
5. $P(\text{No} \mid x) = \dfrac{1/9}{1/12 + 1/9} = \dfrac{4}{7} = 0.571$. Predict No.
6. Error $= 1 - 4/7 = 3/7 \approx 0.43$.

**Galti kahan hoti hai:** $0.57$ (max posterior) likh dena. Ya prior chhodna → scores $3/16$ aur $1/5$, error $15/31 = 0.48$.

**Example 3 (MSQ, medium):** Kaunse statements sahi hain?
(A) Naive Bayes maanta hai $P(x_1, x_2 \mid c) = P(x_1 \mid c)P(x_2 \mid c)$
(B) Smoothing ke bina, class $c$ me kabhi na dikhi feature value $P(c \mid x)$ ko 0 kar deti hai
(C) Har class ka alag covariance ho to bhi Gaussian Bayes classifier ki boundary linear rehti hai
(D) Imbalanced classes me prior hata dena chahiye, Bayes rule ke hisaab se

**Soch:** NB assumption, zero problem, LDA vs QDA, prior ka role.

**Solution:**
1. (A) conditional independence ✓.
2. (B) ek factor 0 → poora product 0 → posterior 0 ✓.
3. (C) alag $\Sigma_k$ → quadratic term cancel nahi → QDA, curved ✗.
4. (D) prior Bayes rule ka hissa hai; hataoge to error badhega ✗.

Answer: **(A), (B)**.

**Galti kahan hoti hai:** (C) ko sahi maanna kyunki "Gaussian classifier = LDA = linear" yaad hai; linear sirf **shared** covariance par hai.

**Example 4 (NAT, medium):** Multinomial NB, Laplace smoothing. Class $C$ ke documents me kul 30 word tokens hain; word "offer" 5 baar aaya; vocabulary $V = 12$. Smoothed $P(\text{offer} \mid C)$ = ______ (teen decimal).

**Soch:** $(\text{count} + 1)/(N_c + V)$.

**Solution:**
1. Numerator $= 5 + 1 = 6$.
2. Denominator $= 30 + 12 = 42$.
3. $6/42 = 0.143$.

**Galti kahan hoti hai:** $(5 + 1)/(30 + 1) = 0.194$ — denominator me $V$ ki jagah 1 jodna. Ya smoothing bhool kar $5/30 = 0.167$.

**Example 5 (NAT, hard):** 1-D Gaussian classes: class 1 $N(1, 2)$, class 2 $N(5, 2)$ (doosra number variance hai). Priors $0.8$ aur $0.2$. Classifier $x < t$ par class 1 predict karta hai. $t$ = ______ (do decimal).

**Soch:** equal variance + unequal priors → shifted midpoint formula.

**Solution:**
1. Midpoint $= (1 + 5)/2 = 3$.
2. Shift $= \dfrac{\sigma^2\ln(\pi_1/\pi_2)}{\mu_2 - \mu_1} = \dfrac{2 \ln 4}{4} = \dfrac{2 \times 1.386}{4} = 0.693$.
3. $t = 3.69$.
4. Sanity: class 1 zyada likely hai, to uska region ($x < t$) bada hona chahiye — $t > 3$ ✓.

**Galti kahan hoti hai:** $\sigma = \sqrt2$ lagana → $3.49$. Ya shift ulta → $2.31$. Ya priors ignore karke $3$.

**Example 6 (MCQ, hard):** Do classes: $\mu_1 = (4, 2)$, $\mu_2 = (2, 2)$, pooled within-class scatter $S_W = \begin{pmatrix} 3 & 1 \\ 1 & 3\end{pmatrix}$. Scale ko chhod kar Fisher LDA direction hai:
(A) $(1, 0)$ (B) $(3, -1)$ (C) $(3, 1)$ (D) $(1, 3)$

**Soch:** $w \propto S_W^{-1}(\mu_1 - \mu_2)$, $2 \times 2$ inverse shortcut.

**Solution:**
1. $\mu_1 - \mu_2 = (2, 0)$.
2. $\det S_W = 9 - 1 = 8$; $S_W^{-1} = \frac18\begin{pmatrix} 3 & -1 \\ -1 & 3\end{pmatrix}$.
3. $S_W^{-1}(2, 0)^\top = \frac18(6, -2) \propto (3, -1)$. Answer **(B)**.
4. Check: $J(3,-1) = 36/24 = 1.5 > J(1,0) = 4/3$.

**Galti kahan hoti hai:** (A) sirf mean difference; (C) $S_W(\mu_1 - \mu_2) = (6, 2)$ — inverse ki jagah $S_W$ se multiply; (D) $(1,3)$ boundary ki direction hai ($w$ ke perpendicular), projection direction nahi.

## Confusions clear karo

**Q:** Generative aur discriminative me farak?
**A:** Generative (NB, LDA) $P(x \mid c)$ aur $P(c)$ model karte hain, phir Bayes se $P(c \mid x)$ nikaalte hain. Discriminative (logistic regression, SVM) seedha $P(c \mid x)$ ya boundary seekhte hain.

**Q:** NB ka assumption to aksar galat hota hai, phir bhi kaam kyun karta hai?
**A:** Classification ke liye sirf ye chahiye ki sahi class ka score sabse bada ho. Probabilities ki exact value galat ho sakti hai (overconfident), par ranking aksar sahi rehti hai.

**Q:** Prediction ke liye normalise karna zaroori hai?
**A:** Nahi — sirf scores compare karo (denominator same hai). Par posterior ki value ya error probability maangi ho to normalise karo.

**Q:** Laplace smoothing me $V$ kya hai?
**A:** Feature kitni alag values le sakta hai. Text me vocabulary size; binary feature me 2; teen category wale feature (Sunny/Rainy/Cloudy) me 3.

**Q:** LDA aur PCA dono projection karte hain, farak?
**A:** PCA labels nahi dekhta, sabse zyada **total variance** wali direction deta hai. LDA labels dekhta hai, classes ko sabse zyada **alag** karne wali direction deta hai. Dono alag direction de sakte hain.

**Q:** LDA aur NB dono Gaussian ho sakte hain, phir farak?
**A:** Gaussian NB features ko class ke andar independent maanta hai (diagonal covariance). LDA correlated features allow karta hai (full $\Sigma$), bas sab classes me same.

**Q:** Priors equal hon to 1-D threshold?
**A:** $\ln(\pi_1/\pi_2) = \ln 1 = 0$, to threshold exactly midpoint $(\mu_1 + \mu_2)/2$.

## Khud try karo

**1.** Binary feature, class $c$ ke 8 training examples me se kisi me bhi feature = 1 nahi hai. Laplace smoothing ke saath $P(x = 1 \mid c)$?

<details><summary>Answer dekho</summary>

$(0 + 1)/(8 + 2) = 0.1$. Binary feature me $V = 2$.

</details>

**2.** 1-D data: class $A = \{2, 4, 6\}$, class $B = \{9, 10, 11\}$. Fisher criterion $J = (\bar x_A - \bar x_B)^2/(s_A^2 + s_B^2)$, $s^2 = \sum(x - \bar x)^2$.

<details><summary>Answer dekho</summary>

$\bar x_A = 4$, $\bar x_B = 10$. $s_A^2 = 4 + 0 + 4 = 8$, $s_B^2 = 1 + 0 + 1 = 2$. $J = 36/10 = 3.6$.

</details>

**3.** Kisi $x$ par do classes ke scores (prior × likelihood) $0.02$ aur $0.06$ hain. Prediction aur error probability?

<details><summary>Answer dekho</summary>

Posteriors: $0.02/0.08 = 0.25$, $0.06/0.08 = 0.75$. Predict doosri class; error $= 1 - 0.75 = 0.25$.

</details>

**4.** 1-D LDA: $N(0, 1)$ aur $N(4, 1)$, priors $0.5, 0.5$. Threshold? Agar pehli class ka prior $0.9$ ho jaaye to threshold kis taraf jaayega?

<details><summary>Answer dekho</summary>

Equal priors: midpoint $2$. Prior $0.9$: $t = 2 + \ln 9/4 = 2 + 0.549 = 2.55$ — doosri class ki taraf (pehli class ka region bada).

</details>

## Ek page me

- Bayes: $P(c \mid x) \propto P(c)P(x \mid c)$; prediction = sabse bada score; posterior ke liye normalise.
- NB assumption: $P(x \mid c) = \prod_j P(x_j \mid c)$ — **conditional** independence given class.
- MLE: $P(c) = n_c/n$, $P(x_j = v \mid c) = \text{count}/n_c$; ek zero count → posterior 0.
- Laplace: $(\text{count} + 1)/(N_c + V)$; binary $V = 2$.
- Duplicate feature ko NB do baar ginta hai.
- Error at $x$ $= 1 - \max_c P(c \mid x)$.
- 1-D, same $\sigma^2$: $t = \frac{\mu_1 + \mu_2}{2} + \frac{\sigma^2\ln(\pi_1/\pi_2)}{\mu_2 - \mu_1}$; bade prior wali class ka region badhta hai.
- LDA: shared $\Sigma$ → quadratic terms cancel → linear boundary. Alag $\Sigma_k$ → QDA (quadratic).
- Fisher: $J = (w^\top(\mu_1 - \mu_2))^2/(w^\top S_W w)$, maximiser $w \propto S_W^{-1}(\mu_1 - \mu_2)$.
- $2\times2$ inverse: $\frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
- $K$ classes → at most $K - 1$ LDA directions; LDA supervised, PCA unsupervised.

Revision ke liye **Short note** tab dekho.
