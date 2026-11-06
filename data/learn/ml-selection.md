# Choosing a machine learning method

> **Time:** ~25 min · **Pehle aana chahiye:** conditional probability aur Bayes' rule, normal distribution ka formula, logistic regression aur k-NN ka naam-maatra idea · **Day:** 55

## Ye topic kyun?

Asli zindagi me pehla sawaal "kaunsa algorithm?" nahi, balki "problem kis type ki hai?" hota hai. Galat framing (jaise digit pehchaanne ko regression bana dena) se sab kuch galat ho jaata hai. GATE DA isse mostly 1-mark MCQ/MSQ me poochta hai: task regression hai ya classification, supervised hai ya unsupervised, kaunsa model generative hai, shared covariance se boundary kaisi banti hai, aur kisi constraint (readable rules, kam data, scaling) ke liye kaunsa method. Kabhi-kabhi Bayes boundary ya Naive Bayes ka chhota calculation NAT me bhi aa sakta hai.

## Picture se samjho

Har problem ke saamne teen sawaal poochho, isi order me:

<figure class="fig">
<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg">
<rect x="170" y="10" width="180" height="40" rx="6" fill="none" stroke="currentColor"/>
<text x="186" y="35" style="fill:currentColor" font-size="13">Target (label) diya hai?</text>
<line x1="210" y1="50" x2="110" y2="100" stroke="currentColor"/><polygon points="110,100 116,90 122,98" style="fill:currentColor"/>
<text x="128" y="72" style="fill:currentColor" font-size="12">nahi</text>
<line x1="310" y1="50" x2="380" y2="100" stroke="currentColor"/><polygon points="380,100 368,98 374,90" style="fill:currentColor"/>
<text x="352" y="72" style="fill:currentColor" font-size="12">haan</text>
<rect x="10" y="100" width="200" height="56" rx="6" style="fill:var(--info)" opacity="0.25"/>
<text x="22" y="122" style="fill:currentColor" font-size="13">Unsupervised</text>
<text x="22" y="142" style="fill:currentColor" font-size="12">clustering, PCA, density</text>
<rect x="290" y="100" width="220" height="56" rx="6" fill="none" stroke="currentColor"/>
<text x="300" y="122" style="fill:currentColor" font-size="13">Target real number hai?</text>
<text x="300" y="142" style="fill:currentColor" font-size="12">("4.6" ka matlab banta hai?)</text>
<line x1="340" y1="156" x2="290" y2="196" stroke="currentColor"/><polygon points="290,196 295,185 302,192" style="fill:currentColor"/>
<text x="290" y="178" style="fill:currentColor" font-size="12">haan</text>
<line x1="460" y1="156" x2="470" y2="196" stroke="currentColor"/><polygon points="470,196 462,186 471,184" style="fill:currentColor"/>
<text x="472" y="178" style="fill:currentColor" font-size="12">nahi</text>
<rect x="200" y="196" width="150" height="46" rx="6" style="fill:var(--good)" opacity="0.3"/>
<text x="212" y="216" style="fill:currentColor" font-size="13">Regression</text>
<text x="212" y="234" style="fill:currentColor" font-size="11">price, temperature</text>
<rect x="370" y="196" width="145" height="46" rx="6" style="fill:var(--mark)" opacity="0.3"/>
<text x="380" y="216" style="fill:currentColor" font-size="13">Classification</text>
<text x="380" y="234" style="fill:currentColor" font-size="11">spam?, digit 0–9</text>
</svg>
<figcaption>Framing ka flowchart: pehle target hai ya nahi, phir target ki type.</figcaption>
</figure>

Dhyan do: "4.6 test" sabse kaam ka hai. Digit 0–9 ke liye "4.6" bekaar hai (4.6 koi digit nahi), to classification. Temperature 4.6 °C bilkul meaningful hai, to regression. Labels number me likhe hon, isse farak nahi padta.

Ab doosra bada idea: classifier do tarah se socha ja sakta hai.

<figure class="fig">
<svg viewBox="0 0 460 360" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="24" style="fill:currentColor" font-size="13">Generative: har class ka P(x | y) model karo</text>
<line x1="30" y1="170" x2="380" y2="170" stroke="currentColor"/>
<polyline points="40,155 60,134 80,103 100,73 120,60 140,73 160,103 180,134 200,155 220,165 240,169 260,170" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<polyline points="140,170 160,169 180,165 200,155 220,134 240,103 260,73 280,60 300,73 320,103 340,134 360,155" fill="none" style="stroke:var(--good)" stroke-width="2.5"/>
<line x1="200" y1="40" x2="200" y2="175" style="stroke:var(--bad)" stroke-dasharray="5 4"/>
<text x="100" y="52" style="fill:currentColor" font-size="12">class 0</text>
<text x="262" y="52" style="fill:currentColor" font-size="12">class 1</text>
<text x="206" y="190" style="fill:currentColor" font-size="11">boundary (Bayes rule)</text>
<text x="390" y="174" style="fill:currentColor" font-size="12">x</text>
<text x="20" y="214" style="fill:currentColor" font-size="13">Discriminative: seedha P(y = 1 | x) model karo</text>
<line x1="30" y1="340" x2="380" y2="340" stroke="currentColor"/>
<line x1="30" y1="230" x2="380" y2="230" stroke="currentColor" stroke-dasharray="3 4" opacity="0.5"/>
<polyline points="40,340 60,340 80,340 100,340 120,340 140,340 160,338 180,327 200,285 220,243 240,232 260,230 280,230 300,230 320,230 340,230 360,230" fill="none" style="stroke:var(--mark)" stroke-width="2.5"/>
<line x1="200" y1="225" x2="200" y2="345" style="stroke:var(--bad)" stroke-dasharray="5 4"/>
<text x="386" y="234" style="fill:currentColor" font-size="11">1</text>
<text x="386" y="344" style="fill:currentColor" font-size="11">0</text>
<text x="206" y="300" style="fill:currentColor" font-size="11">P = 0.5</text>
</svg>
<figcaption>Upar: generative model dono classes ke "bell curves" seekhta hai, phir Bayes rule se boundary nikaalta hai. Neeche: discriminative model sirf boundary/probability curve seekhta hai.</figcaption>
</figure>

Dhyan do: generative model ko poori kahaani pata hai ("class 1 ke points kaise dikhte hain"), isliye wo naye fake $x$ bhi bana sakta hai. Discriminative model sirf ye jaanta hai ki boundary kahan hai — kam assumptions, aur data zyada ho to aksar zyada accurate.

## Concept step-by-step

### 1. Supervised vs unsupervised

- **Supervised:** training data me (input $x$, target $y$) pairs hain. Model $x \to y$ seekhta hai. Example: past students ke (study hours, marks).
- **Unsupervised:** sirf features $x$, koi target nahi. Kaam: structure dhoondhna — groups (clustering), kam dimensions (PCA), density estimation.

Tiny example: 50,000 customers ki purchase history, koi label nahi, "similar groups dhoondho" → unsupervised clustering.

Dhyan do: naam se dhokha mat khao — **k-means** unsupervised hai, **k-NN** supervised (labels chahiye). Dono me "k" hai, kaam alag.

### 2. Regression vs classification

- **Regression:** target ek real-valued quantity (price, temperature, time-to-failure, count jiska size meaningful ho).
- **Classification:** target ek finite set ka label (spam/ham, digit 0–9, blood group), chahe numbers me likha ho.

Probability output ka matlab regression nahi hai. "Click hoga ya nahi" ki probability chahiye, aur training labels 0/1 hain → **binary classification** with probabilistic output, cross-entropy (log loss) se train.

Tiny example: "Kitne din me machine fail hogi" → regression (12.5 din meaningful). "Agle 30 din me fail hogi ya nahi" → classification.

Dhyan do: **logistic regression ek classifier hai** — naam me "regression" isliye hai kyunki wo log-odds par linear regression jaisa hai, par output class probability hai.

### 3. Generative vs discriminative

**Generative:** $P(x \mid y)$ (har class me features kaise dikhte hain) aur $P(y)$ (prior) model karo, phir Bayes rule:
$$P(y \mid x) = \frac{P(x\mid y)P(y)}{\sum_{y'} P(x\mid y')P(y')}$$
Examples: Naive Bayes, LDA, QDA (Gaussian class models).

**Discriminative:** seedha $P(y \mid x)$ ya boundary seekho; $P(x)$ ka model nahi. Examples: logistic regression, SVM, perceptron, k-NN, decision trees, MLP (neural nets).

Tiny example (generative calculation): $P(\text{spam}) = 0.4$, $P(\text{"offer"}\mid\text{spam}) = 0.5$, $P(\text{"offer"}\mid\text{ham}) = 0.1$. Email me "offer" hai:
$$P(\text{spam}\mid\text{offer}) = \frac{0.5\times0.4}{0.5\times 0.4 + 0.1\times0.6} = \frac{0.20}{0.26} \approx 0.77$$

Dhyan do: classic pair: **Naive Bayes (generative) ↔ logistic regression (discriminative)**. Inhe swap karna common trap hai.

### 4. Gaussian classes: linear ya quadratic boundary?

Maan lo har class Gaussian hai: $x \mid y = c \sim \mathcal N(\mu_c, \Sigma_c)$.

- **Shared covariance** ($\Sigma_0 = \Sigma_1 = \Sigma$): log-odds $\ln\frac{P(y=1\mid x)}{P(y=0\mid x)}$ me $x^\top\Sigma^{-1}x$ wala quadratic term dono classes me same hai aur cancel ho jaata hai. Bachta hai $w^\top x + b$ → **linear boundary** (LDA), aur posterior $P(y = 1\mid x) = \sigma(w^\top x + b)$ — bilkul logistic form!
- **Alag covariances:** quadratic terms cancel nahi hote → **quadratic boundary** (QDA).

1D shared variance $\sigma^2$, priors $\pi_0, \pi_1$: boundary jahan $\pi_0\,\mathcal N(x;\mu_0) = \pi_1\,\mathcal N(x;\mu_1)$. Log lekar:
$$x^* = \frac{\mu_0 + \mu_1}{2} + \frac{\sigma^2\ln(\pi_0/\pi_1)}{\mu_1 - \mu_0}$$
Equal priors → beech ka point. Jis class ka prior bada, boundary doosri class ki taraf khisakti hai (bade prior wali class ko zyada jagah milti hai).

Tiny example (alag variance): $\mathcal N(0, 1)$ vs $\mathcal N(0, 4)$, equal priors. Boundary: $-\frac{x^2}{2} = -\frac{x^2}{8} - \ln 2 \Rightarrow x^2 = \frac{\ln 2}{0.375} \approx 1.85$, $|x| \approx 1.36$. Do boundary points ($\pm1.36$) — ek seedhi cut nahi, quadratic.

Dhyan do: "shared covariance → quadratic" galat hai; shared → linear.

### 5. Naive Bayes

Naive Bayes maanta hai ki class diye jaane par features **conditionally independent** hain:
$$P(x_1, \dots, x_d \mid y) = \prod_j P(x_j \mid y)$$

Kyun useful: parameters bahut kam ho jaate hain. $d$ binary features, $K$ classes:
- Naive Bayes: priors $K - 1$ + har class-feature ke liye ek probability $Kd$ → $K - 1 + Kd$.
- Full joint $P(x\mid y)$: har class me $2^d - 1$ → $K(2^d - 1) + K - 1$.

Tiny example: $d = 10$, $K = 2$: NB $= 1 + 20 = 21$; full $= 2\cdot1023 + 1 = 2047$. Kam parameters → kam data me bhi estimate ho jaate hain. Isliye text classification (hazaron word features, kuch sau documents) me NB strong baseline hai, aur training ek pass me (counting).

Dhyan do: "Naive Bayes koi assumption nahi karta" galat — independence hi uska "naive" hissa hai.

### 6. Constraint dekh ke method chuno

| Zaroorat | Typical choice |
|---|---|
| Continuous target | linear / ridge regression |
| Binary target, probabilities chahiye | logistic regression |
| Readable if–then rules | shallow decision tree |
| Kam examples, bahut saare sparse features | Naive Bayes |
| Max-margin boundary | SVM |
| Labels nahi, groups chahiye | k-means, hierarchical |
| Features compress karne hain | PCA |
| Labelled classes ko alag karne wali projection | LDA |

Do aur practical rules:
- **Distance-based methods** (k-NN, k-means, RBF-kernel SVM) me feature scaling zaroori: km aur grams wale features me bada-range wala distance par haavi ho jaata hai.
- **Linear regression "weights me linear" hai**, features me nahi: $x^2$, $\log x$ jaise features jod do to curves bhi fit ho jaate hain. $y = a + bx + cx^2$ ab bhi linear regression hai.

Dhyan do: PCA classifier nahi hai (labels nahi dekhta); k-means ko labels nahi chahiye; k-NN ko labels chahiye.

## Solved examples

**Example 1 (MCQ, easy):** A factory wants to predict the remaining life (in hours) of a drill bit from its vibration readings, using records of past drill bits that were run until they broke. The task is best framed as
(A) unsupervised clustering (B) supervised classification (C) supervised regression (D) dimensionality reduction

**Soch:** target hai (past bits ki life known) → supervised; target hours me real number → regression.

**Solution:**
1. Past records me har bit ki actual life pata hai → input–target pairs → supervised.
2. "37.5 hours" meaningful hai → real-valued → regression.

**Answer: (C).**

**Galti kahan hoti hai:** "machine fail / not fail" sochkar classification chunna — par sawaal hours poochh raha hai, yes/no nahi.

**Example 2 (MSQ, easy):** Which of the following are **classification** tasks?
- (A) Reading the 6-digit PIN code from a handwritten envelope, one digit at a time
- (B) Estimating tomorrow's rainfall in millimetres
- (C) Grouping news articles into topics when no topic labels exist
- (D) Giving the probability that a card transaction is fraudulent, trained on transactions marked fraud / not fraud

**Soch:** har option par "target hai?" aur "4.6 test".

**Solution:**
1. (A) Har digit 0–9 me se ek label; "4.6" bekaar → classification ✓.
2. (B) 4.6 mm meaningful → regression ✗.
3. (C) Labels nahi → unsupervised clustering ✗.
4. (D) Labels fraud/not fraud; probability output phir bhi binary classification ✓.

**Answer: (A), (D).**

**Galti kahan hoti hai:** (A) ko "numbers hain to regression" samajhna; (D) ko "output 0–1 number hai to regression".

**Example 3 (MCQ, medium):** Which pair is correctly labelled (generative, discriminative)?
(A) (logistic regression, Naive Bayes) (B) (Naive Bayes, logistic regression) (C) (SVM, QDA) (D) (k-NN, LDA)

**Soch:** generative = $P(x\mid y)P(y)$ model karta hai: NB, LDA, QDA. Baaki discriminative.

**Solution:**
1. Naive Bayes → generative; logistic regression → discriminative. (B) sahi order me hai.
2. (A) ulta hai. (C) SVM discriminative, QDA generative — ulta. (D) k-NN discriminative, LDA generative — ulta.

**Answer: (B).**

**Galti kahan hoti hai:** NB aur LR ko swap karna — dono "probability" dete hain, isliye confusion hota hai.

**Example 4 (NAT, medium):** Two classes in 1D: $x \mid y = 0 \sim \mathcal N(1, 1)$ and $x \mid y = 1 \sim \mathcal N(5, 1)$, with priors $P(y=0) = 0.75$, $P(y=1) = 0.25$. The Bayes decision boundary $x^*$ is ______ (two decimals).

**Soch:** shared variance → linear (yahan ek point); unequal priors → midpoint se shift.

**Solution:**
1. Boundary par $0.75\,e^{-(x-1)^2/2} = 0.25\,e^{-(x-5)^2/2}$.
2. Log: $\ln 0.75 - \frac{(x-1)^2}{2} = \ln 0.25 - \frac{(x-5)^2}{2}$.
3. $(x-1)^2 - (x-5)^2 = 2\ln 3$. Left side $= (x^2 - 2x + 1) - (x^2 - 10x + 25) = 8x - 24$.
4. $8x = 24 + 2\ln 3 = 24 + 2.197$ → $x = 3 + \frac{\ln 3}{4} = 3 + 0.275 = 3.27$.
5. Check: formula $\frac{1+5}{2} + \frac{1\cdot\ln 3}{4}$ ✓. Boundary class 1 ki taraf khiski kyunki class 0 ka prior bada hai.

**Answer: 3.27.**

**Galti kahan hoti hai:** priors ignore karke 3 likhna; ya shift ka sign ulta lagakar $3 - 0.27 = 2.73$.

**Example 5 (NAT, medium):** A Naive Bayes classifier has 3 classes and 12 binary features. How many free parameters does it estimate (class priors plus class-conditional feature probabilities)?

**Soch:** NB: $K - 1$ priors + $Kd$ Bernoulli probabilities.

**Solution:**
1. Priors: 3 classes, sum 1 → $3 - 1 = 2$ free.
2. Har class me har binary feature ka $P(x_j = 1\mid y)$: $3 \times 12 = 36$.
3. Total $= 2 + 36 = 38$.
4. (Comparison: bina independence ke $3(2^{12} - 1) + 2 = 12287$.)

**Answer: 38.**

**Galti kahan hoti hai:** priors 3 ginna (sum = 1 constraint bhool gaye) → 39; ya har feature ke do probabilities ($x_j = 0$ aur $1$) gin lena → 74.

**Example 6 (MSQ, hard):** Which statements are correct?
- (A) The predictions of a k-NN classifier can change if one feature is converted from kilometres to metres.
- (B) Linear regression can fit $y = a + b\log x$ if $\log x$ is added as a feature.
- (C) For two Gaussian classes with the same covariance matrix, the Bayes boundary is quadratic.
- (D) Thresholding the first principal component is a valid supervised classifier for any labelled data.

**Soch:** scaling rule, "linear in weights", shared covariance → linear, PCA labels nahi dekhta.

**Solution:**
1. (A) km → m: us feature ke differences 1000 guna, distance me haavi → neighbours badal sakte hain ✓.
2. (B) Model $a + b\cdot(\log x)$ weights $a, b$ me linear ✓.
3. (C) Shared covariance → quadratic terms cancel → linear ✗.
4. (D) PC1 max variance direction hai, class direction ho ye zaroori nahi ✗.

**Answer: (A), (B).**

**Galti kahan hoti hai:** (B) me "log curve hai to linear regression nahi chalegi" sochna — linearity weights me chahiye, $x$ me nahi.

## Confusions clear karo

**Q:** Star rating 1–5 regression hai ya classification?
**A:** Dono tarah frame ho sakta hai (ordinal); exam usually saaf case deta hai. Agar sirf 5 alag labels hain aur "4.6 stars" output ka matlab nahi, classification. Agar average rating jaisa continuous number predict karna ho, regression.

**Q:** Logistic regression ka naam regression kyun?
**A:** Ye log-odds $\ln\frac{p}{1-p}$ ko $x$ ka linear function maanta hai — wo "regression" part hai. Par final kaam class probability dena hai, to classifier.

**Q:** Generative model kab better hai?
**A:** Jab data kam ho aur assumptions roughly sahi hon (NB, LDA jaldi seekh jaate hain), ya jab missing features handle karne hon / naya data generate karna ho. Data bahut ho to discriminative aksar zyada accurate.

**Q:** LDA (classifier) aur LDA (projection) same hain?
**A:** Haan, same idea: shared-covariance Gaussian classes. Classifier ke roop me linear boundary deta hai; projection ke roop me Fisher direction (max between/within scatter).

**Q:** Decision tree ko scaling chahiye?
**A:** Nahi. Tree har feature par threshold lagata hai ("income > 5 lakh?"); unit badalne se sirf threshold ki value badalti hai, split wahi rehta hai. Scaling distance-based methods ki zaroorat hai.

**Q:** Clustering ke baad cluster number ko label maan sakte hain?
**A:** Wo sirf group ID hai, kisi asli class se match ho ye zaroori nahi. Labels hon to seedha supervised method use karo.

## Khud try karo

1. Har task ka type batao: (i) ghar ki price, (ii) email spam hai ya nahi, (iii) bina labels ke songs ko similar groups me baantna, (iv) 1000 features ko 50 me compress karna, (v) X-ray me 4 me se kaunsi bimari.

<details><summary>Answer dekho</summary>

(i) supervised regression, (ii) supervised binary classification, (iii) unsupervised clustering, (iv) unsupervised dimensionality reduction (PCA), (v) supervised multi-class classification.

</details>

2. $P(\text{spam}) = 0.3$, $P(\text{"free"}\mid\text{spam}) = 0.6$, $P(\text{"free"}\mid\text{ham}) = 0.05$. Email me "free" hai. $P(\text{spam}\mid\text{free})$?

<details><summary>Answer dekho</summary>

$\frac{0.6 \times 0.3}{0.6\times0.3 + 0.05\times0.7} = \frac{0.18}{0.215} \approx 0.84$.

</details>

3. 1D: $\mathcal N(2, 4)$ (class 0, prior 0.2) vs $\mathcal N(8, 4)$ (class 1, prior 0.8), variance 4 dono me. Boundary?

<details><summary>Answer dekho</summary>

$x^* = \frac{2+8}{2} + \frac{4\ln(0.2/0.8)}{8 - 2} = 5 + \frac{4 \times (-1.386)}{6} = 5 - 0.924 \approx 4.08$. Class 1 ka prior bada, to boundary class 0 ki taraf (left) khiski.

</details>

4. Generative ya discriminative: QDA, decision tree, perceptron, Gaussian Naive Bayes, MLP.

<details><summary>Answer dekho</summary>

Generative: QDA, Gaussian Naive Bayes. Discriminative: decision tree, perceptron, MLP.

</details>

5. Hospital chahta hai ki doctor model ke decisions ko "agar BP > 140 aur age > 60 to high risk" jaise padh sake. Kaunsa method?

<details><summary>Answer dekho</summary>

Shallow decision tree — har root-to-leaf path ek if–then rule hai. Deep neural net ya k-NN ke decisions aise readable nahi hote.

</details>

## Ek page me

- Pehle target dekho: real number → regression; finite labels (numbers me bhi) → classification; target nahi → unsupervised.
- "4.6 test": 4.6 ka matlab bane to regression.
- Yes/no event ki probability = classification with cross-entropy; logistic regression classifier hai.
- Supervised ko $(x, y)$ pairs chahiye; unsupervised sirf $x$ (k-means, hierarchical, PCA).
- Generative: $P(x\mid y)P(y)$ + Bayes (Naive Bayes, LDA, QDA); naya $x$ bana sakta hai.
- Discriminative: $P(y\mid x)$ ya boundary (logistic, SVM, perceptron, k-NN, trees, MLP).
- Shared-covariance Gaussians → linear boundary, logistic posterior; alag covariances → quadratic.
- 1D boundary: $\frac{\mu_0+\mu_1}{2} + \frac{\sigma^2\ln(\pi_0/\pi_1)}{\mu_1-\mu_0}$.
- Naive Bayes: features conditionally independent given class; $K - 1 + Kd$ params (binary); kam data, bahut features me strong.
- k-NN, k-means, RBF-SVM: pehle scaling. Trees ko scaling nahi chahiye.
- Linear regression weights me linear: $x^2$, $\log x$ features jodo.

Revision ke liye **Short note** tab dekho.
