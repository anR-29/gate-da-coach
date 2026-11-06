# Cross-validation and data leakage

> **Time:** ~30 min · **Pehle aana chahiye:** training error vs test error ka basic idea, k-NN classifier kaise predict karta hai, mean aur MSE · **Day:** 48, 49

## Ye topic kyun?

Model banana aasaan hai; asli sawaal ye hai ki naye, kabhi na dekhe data par wo kitna accha chalega. Cross-validation (CV) is sawaal ka imaandaar jawab nikalne ka tarika hai, aur data leakage wo galti hai jo is jawab ko jhootha (bahut zyada optimistic) bana deti hai. GATE DA me yahan se mostly 1–2 mark ke sawaal aate hain: NAT me "kitni baar model train hua" ya "LOOCV error rate kitna hai", aur MCQ/MSQ me "kaunsa procedure leak karta hai" ya "LOOCV vs k-fold me kya sahi hai".

## Picture se samjho

Socho tumhare paas 100 students ke purane papers hain aur tum ek "marks predictor" bana rahe ho. Agar tum predictor ko unhi 100 papers par check karo jin par usne seekha, to wo ratta maar ke 100% dikha dega. Imaandaar check ke liye kuch papers chhupa ke rakhne padte hain. Problem: chhupaoge to seekhne ke liye data kam ho jaata hai. k-fold CV iska jugaad hai — data ko $k$ hisson (folds) me baanto, aur baari-baari har hissa ek baar "chhupa hua exam" bane.

<figure class="fig">
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg">
<text x="10" y="39" style="fill:currentColor" font-size="13">Fit 1</text>
<rect x="70" y="20" width="72" height="28" style="fill:var(--mark)"/><rect x="150" y="20" width="72" height="28" fill="none" stroke="currentColor"/><rect x="230" y="20" width="72" height="28" fill="none" stroke="currentColor"/><rect x="310" y="20" width="72" height="28" fill="none" stroke="currentColor"/><rect x="390" y="20" width="72" height="28" fill="none" stroke="currentColor"/>
<text x="472" y="39" style="fill:currentColor" font-size="13">e1</text>
<text x="10" y="77" style="fill:currentColor" font-size="13">Fit 2</text>
<rect x="70" y="58" width="72" height="28" fill="none" stroke="currentColor"/><rect x="150" y="58" width="72" height="28" style="fill:var(--mark)"/><rect x="230" y="58" width="72" height="28" fill="none" stroke="currentColor"/><rect x="310" y="58" width="72" height="28" fill="none" stroke="currentColor"/><rect x="390" y="58" width="72" height="28" fill="none" stroke="currentColor"/>
<text x="472" y="77" style="fill:currentColor" font-size="13">e2</text>
<text x="10" y="115" style="fill:currentColor" font-size="13">Fit 3</text>
<rect x="70" y="96" width="72" height="28" fill="none" stroke="currentColor"/><rect x="150" y="96" width="72" height="28" fill="none" stroke="currentColor"/><rect x="230" y="96" width="72" height="28" style="fill:var(--mark)"/><rect x="310" y="96" width="72" height="28" fill="none" stroke="currentColor"/><rect x="390" y="96" width="72" height="28" fill="none" stroke="currentColor"/>
<text x="472" y="115" style="fill:currentColor" font-size="13">e3</text>
<text x="10" y="153" style="fill:currentColor" font-size="13">Fit 4</text>
<rect x="70" y="134" width="72" height="28" fill="none" stroke="currentColor"/><rect x="150" y="134" width="72" height="28" fill="none" stroke="currentColor"/><rect x="230" y="134" width="72" height="28" fill="none" stroke="currentColor"/><rect x="310" y="134" width="72" height="28" style="fill:var(--mark)"/><rect x="390" y="134" width="72" height="28" fill="none" stroke="currentColor"/>
<text x="472" y="153" style="fill:currentColor" font-size="13">e4</text>
<text x="10" y="191" style="fill:currentColor" font-size="13">Fit 5</text>
<rect x="70" y="172" width="72" height="28" fill="none" stroke="currentColor"/><rect x="150" y="172" width="72" height="28" fill="none" stroke="currentColor"/><rect x="230" y="172" width="72" height="28" fill="none" stroke="currentColor"/><rect x="310" y="172" width="72" height="28" fill="none" stroke="currentColor"/><rect x="390" y="172" width="72" height="28" style="fill:var(--mark)"/>
<text x="472" y="191" style="fill:currentColor" font-size="13">e5</text>
<rect x="70" y="214" width="16" height="14" style="fill:var(--mark)"/><text x="92" y="226" style="fill:currentColor" font-size="12">held-out (test) fold</text>
<rect x="250" y="214" width="16" height="14" fill="none" stroke="currentColor"/><text x="272" y="226" style="fill:currentColor" font-size="12">training folds → CV error = (e1+…+e5)/5</text>
</svg>
<figcaption>5-fold CV: har row ek alag fit hai. Har point exactly ek baar test me aata hai.</figcaption>
</figure>

Dhyan do: 5 rows = 5 alag model training (fits). Har fit me 4 folds par train, 1 par test. Har point kabhi na kabhi test hota hai, aur kabhi apne hi test me training ka hissa nahi hota. Aakhir me 5 errors ka average hi "CV error" hai.

Ab doosri picture: time series (jaise roz ki sales). Yahan future se seekh kar past predict karna cheating hai, kyunki deployment me future kabhi available nahi hota.

<figure class="fig">
<svg viewBox="0 0 540 210" xmlns="http://www.w3.org/2000/svg">
<text x="60" y="16" style="fill:currentColor" font-size="12">din (time) →</text>
<text x="4" y="45" style="fill:currentColor" font-size="12">t = 5</text>
<rect x="60" y="28" width="216" height="26" style="fill:var(--good)" opacity="0.5"/><rect x="280" y="28" width="40" height="26" style="fill:var(--mark)"/>
<text x="130" y="46" style="fill:currentColor" font-size="12">train: din 1–5</text><text x="284" y="46" style="fill:currentColor" font-size="11">din 6</text>
<text x="4" y="85" style="fill:currentColor" font-size="12">t = 6</text>
<rect x="60" y="68" width="260" height="26" style="fill:var(--good)" opacity="0.5"/><rect x="324" y="68" width="40" height="26" style="fill:var(--mark)"/>
<text x="150" y="86" style="fill:currentColor" font-size="12">train: din 1–6</text><text x="328" y="86" style="fill:currentColor" font-size="11">din 7</text>
<text x="4" y="125" style="fill:currentColor" font-size="12">t = 7</text>
<rect x="60" y="108" width="304" height="26" style="fill:var(--good)" opacity="0.5"/><rect x="368" y="108" width="40" height="26" style="fill:var(--mark)"/>
<text x="170" y="126" style="fill:currentColor" font-size="12">train: din 1–7</text><text x="372" y="126" style="fill:currentColor" font-size="11">din 8</text>
<text x="4" y="175" style="fill:currentColor" font-size="12">random</text>
<rect x="60" y="158" width="172" height="26" style="fill:var(--good)" opacity="0.5"/><rect x="236" y="158" width="40" height="26" style="fill:var(--bad)"/><rect x="280" y="158" width="216" height="26" style="fill:var(--good)" opacity="0.5"/>
<text x="240" y="176" style="fill:currentColor" font-size="11">test</text><text x="300" y="176" style="fill:currentColor" font-size="12">future se train = leak ✗</text>
<text x="60" y="204" style="fill:currentColor" font-size="12">Forward chaining: hamesha past par train, uske baad wale din par test.</text>
</svg>
<figcaption>Upar ki teen rows forward chaining hain (sahi). Neeche random fold: test din ke baad ka data training me chala gaya.</figcaption>
</figure>

Dhyan do: forward chaining me har row ek alag model hai, to models ki ginti = kitne $t$ values hain. Random fold wali row me test din ke "baad" ke din training me hain — model ko future pata hai, isliye score fake-high aata hai.

## Concept step-by-step

### 1. Train, validation, test — teen alag kaam

Data ke teen role hote hain:
- **Training set:** model ke parameters (jaise weights) yahin se seekhe jaate hain.
- **Validation set:** hyperparameters choose karne ke liye (jaise k-NN ka $k$, regularisation strength $\lambda$). Hyperparameter matlab wo setting jo training khud nahi seekhti, hum bahar se chunte hain.
- **Test set:** bilkul alag rakha hua; sirf ek baar, aakhir me, final number report karne ke liye.

Agar test set ko baar-baar dekh kar model badloge, to wo bhi dheere-dheere "validation" ban jaata hai aur reported number optimistic ho jaata hai.

Dhyan do: test set "untouched until the single final report" — ye rule GATE me option ke roop me aata hai aur ye **sahi** procedure hai, leak nahi.

### 2. k-fold cross-validation

Ek hi validation split lucky ya unlucky ho sakta hai. Isliye: data ko $k$ barabar folds me baanto. Fold $i$ ke liye: baaki $k-1$ folds par train karo, fold $i$ par error $e_i$ nikaalo.

$$\text{CV error} = \frac{1}{k}\sum_{i=1}^{k} e_i$$

Har fit ka training size $= \frac{k-1}{k}\,n$.

Tiny example: $n = 100$, $k = 5$. Har fit 80 points par train, 20 par test. Agar fold errors $0.10, 0.12, 0.08, 0.10, 0.10$ hain to CV error $= 0.50/5 = 0.10$.

Dhyan do: 5-fold me fits 5 hain, $n/5$ nahi. $n/5 = 20$ to ek fold ka size hai.

### 3. Fits ginna (GATE ka favourite NAT)

Agar $m$ candidate settings compare kar rahe ho (jaise $\lambda$ ki 4 values), to har candidate ke liye poora $k$-fold chalega:

$$\text{fits} = k \times m \;(+1 \text{ agar best setting ko poore data par dobara train karna gina jaaye})$$

Kyun? Har candidate ka apna CV error chahiye, aur ek CV error ke liye $k$ fits lagte hain. Aakhir me jeetne wali setting ko poore training data par ek baar refit karte hain — wo extra 1 hai.

Tiny example: 4 candidates, 5-fold, phir refit: $5 \times 4 + 1 = 21$.

Grid search me candidates = grid ke combinations. $C \in \{3 \text{ values}\}$ aur $\gamma \in \{4 \text{ values}\}$ ho to $m = 3 \times 4 = 12$.

Dhyan do: question padho — "not counting the final refit" likha ho to +1 mat karo; "then refits once" likha ho to zaroor karo.

### 4. LOOCV (leave-one-out)

LOOCV matlab $k = n$: har fold me sirf ek point. To $n$ fits, har fit $n-1$ points par.

- **Fits:** $n$ per candidate, to $m$ candidates ke liye $nm$. (Trap: $n-1$ fits nahi — $n-1$ training size hai.)
- **Deterministic:** ek point ko chhodne ka ek hi tarika hai, to har run me same answer. k-fold me shuffle random hota hai, LOOCV me nahi.
- **Bias kam:** har training set lagbhag poora data ($n-1$), to estimate "pessimistic" nahi hota.
- **Variance zyada ho sakta hai:** $n$ training sets lagbhag identical hain, to unke errors aapas me bahut correlated hain; average karne se variance utna kam nahi hota.
- **Mehenga:** $n$ fits.

Tiny example: $n = 50$, 3 models compare, no refit: $50 \times 3 = 150$ fits.

Dhyan do: "LOOCV randomised hai" wala option hamesha galat hai.

### 5. Bada $k$ kya karta hai?

Training size $\frac{k-1}{k}n$: $k=5 \Rightarrow 0.8n$, $k=10 \Rightarrow 0.9n$, $k=n \Rightarrow n-1$. To $k$ badhao to training sets **bade** hote hain, isliye estimate kam pessimistic (kam bias), lekin fits zyada (zyada computation).

Kyun pessimistic? Final model poore data par train hoga; CV me model thode kam data par train hua, to thoda kharab perform karta hai. Ye gap $k$ badhne par ghatta hai.

Dhyan do: "fewer folds" se CV thoda pessimistic hota hai, wildly optimistic nahi. Wildly optimistic ka matlab leakage hai.

### 6. LOOCV ke saath k-NN

k-NN (k nearest neighbours) ek naye point ko uske sabse paas ke training points ki majority class deta hai. LOOCV me jab point $x_i$ test ho raha hai, wo training me nahi hai — to uska neighbour **khud wo nahi ho sakta**.

Isliye 1-NN ka **training error hamesha 0** hota hai (har point ka sabse paas wala point wo khud hai, distance 0), lekin LOOCV error 0 nahi hota.

Tiny example: points $x = 1(A), 2(A), 5(B)$. LOOCV: $x=1$ ka nearest (khud ko chhod ke) $2$ → A ✓. $x=2$ ka nearest $1$ → A ✓. $x=5$ ka nearest $2$ → A, par asli B ✗. Error rate $= 1/3 \approx 0.33$.

Dhyan do: answer "error rate" maanga ho to galat points / total do, accuracy ya count nahi.

### 7. LOOCV ke saath mean predictor (shortcut)

Mean predictor input ignore karta hai aur har point ke liye training targets ka mean bolta hai. LOOCV me $y_i$ chhodo; baaki $n-1$ ka mean:

$$\bar y_{-i} = \frac{n\bar y - y_i}{n-1}$$

Residual:

$$y_i - \bar y_{-i} = \frac{(n-1)y_i - n\bar y + y_i}{n-1} = \frac{n}{n-1}(y_i - \bar y)$$

To har residual training residual ka $\frac{n}{n-1}$ guna hai, aur square karke average:

$$\text{LOOCV MSE} = \left(\frac{n}{n-1}\right)^2 \times \text{training MSE}, \qquad \text{training MSE} = \frac{1}{n}\sum (y_i - \bar y)^2$$

Tiny example: $y = 3, 5, 10$, $\bar y = 6$. Training MSE $= (9 + 1 + 16)/3 = 26/3 \approx 8.667$. LOOCV MSE $= (3/2)^2 \times 26/3 = 19.5$.
Direct check: 3 chhodo → mean 7.5, residual $-4.5$, square 20.25. 5 chhodo → mean 6.5, residual $-1.5$, square 2.25. 10 chhodo → mean 4, residual 6, square 36. Average $= 58.5/3 = 19.5$ ✓.

Dhyan do: training MSE me divide by $n$ hai (sample variance wala $n-1$ nahi). LOOCV error hamesha training error se bada hai.

### 8. Data leakage kya hai?

**Leakage** = koi bhi information jo evaluation (validation/test) rows se, future se, ya label se training tak pahunch jaaye. Result: CV score bahut acha, deployment me dhadaam.

Teen main roop:
1. **Preprocessing leak:** scaler (mean/SD), imputer (missing value ka mean), feature selection (label se correlated features chunna), oversampling (SMOTE), hyperparameter tuning — inme se kuch bhi poore data par fit kiya, phir CV chalaya. Held-out fold ki values ne preprocessing ko influence kar diya.
2. **Target/future leak:** aisa feature jo outcome ke **baad** record hota hai (jaise "refund issued" complaint predict karne ke liye). Deployment ke time ye feature hoga hi nahi.
3. **Related rows leak:** ek patient ke 5 scans; kuch train me, kuch test me. Model patient ko "pehchaan" leta hai, bimari ko nahi.

**Fix:** har cheez jo data se seekhi jaati hai, **sirf training folds par fit** karo, aur wahi fitted transform held-out fold par **apply** karo (held-out par alag se fit mat karo). Ye sab ek pipeline ke andar, har fold me dobara.

Dhyan do: "held-out fold par alag scaler fit karo" bhi galat hai — test time par label/stats wahi use hone chahiye jo training se aaye.

### 9. Group k-fold aur forward chaining

- **Group k-fold:** related rows (same patient/user) ek hi fold me. Isse har test patient model ke liye bilkul naya hota hai — deployment jaisa.
- **Stratified k-fold:** har fold me class ratio same rakhta hai. Ye label balance ke liye hai; patient leak ko nahi rokta.
- **Forward chaining (time series):** $t = a, a+1, \dots, b$ ke liye din $1..t$ par train, din $t+1$ par test. Models $= b - a + 1$.

Tiny example: $t = 60, \dots, 99$ → $99 - 60 + 1 = 40$ models.

Dhyan do: $99 - 60 = 39$ likhna classic off-by-one galti hai; dono ends count hote hain.

### 10. Symptom se diagnosis

| Symptom | Matlab |
|---|---|
| CV score bahut high, deployment me bahut low, data distribution same | leakage |
| CV me bhi low, train me bhi low | high bias (underfit) |
| Train high, CV low | overfit (high variance) |

Dhyan do: high bias CV me bhi kharab dikhta hai, isliye "CV 99%, deployment 61%" kabhi high bias nahi hai.

## Solved examples

**Example 1 (NAT, easy):** An SVM is tuned by grid search over $C \in \{0.1, 1, 10\}$ and $\gamma \in \{0.01, 0.1, 1, 10\}$ using 5-fold cross-validation. The best pair is then refitted once on the full training set. The total number of SVM trainings is ______.

**Soch:** "kitni baar train" → fits = folds × candidates (+1 refit).

**Solution:**
1. Candidates $m = 3 \times 4 = 12$ (har $(C, \gamma)$ pair ek candidate).
2. CV fits $= 5 \times 12 = 60$.
3. Refit gina hai: $60 + 1 = 61$.

**Answer: 61.**

**Galti kahan hoti hai:** $3 + 4 = 7$ candidates lena (grid me combinations multiply hote hain) → $36$; ya refit bhool jaana → $60$.

**Example 2 (MCQ, easy):** A bank predicts whether a borrower will default within a year. Validation accuracy is 97%, but on new borrowers it is 64%. Among the features is *number_of_collection_calls*, which counts calls made by the recovery team. The most likely explanation is
- (A) The model has high bias
- (B) The feature is recorded after default happens, so it leaks the label
- (C) Too many folds were used in CV
- (D) Accuracy is always lower after deployment by about this much

**Soch:** huge CV vs deployment gap + feature jo outcome ke baad banta hai → target leakage.

**Solution:**
1. Recovery team calls tabhi karti hai jab borrower default kar chuka ho, to ye feature label ka "result" hai, cause nahi.
2. Naye borrower ke liye prediction ke waqt ye calls hui hi nahi (0), to model ka sabse strong signal gayab.
3. (A) high bias CV me bhi low accuracy dikhata. (C) folds ki ginti itna bada gap nahi banati. (D) sahi CV nearly unbiased hota hai.

**Answer: (B).**

**Galti kahan hoti hai:** "deployment me kharab = model weak = high bias" sochna. High bias me CV score bhi low hota.

**Example 3 (NAT, medium):** A 1-NN classifier with distance $|x - x'|$ is evaluated by LOOCV on

| $x$ | 2 | 3 | 6 | 8 | 9 | 13 | 14 |
|---|---|---|---|---|---|---|---|
| class | A | A | B | A | B | B | B |

The LOOCV error rate is ______ (round to two decimals).

**Soch:** LOOCV + k-NN → har point ko baaki points se classify karo, khud ko neighbour mat banao.

**Solution:**
1. $x=2$: baaki me nearest $3$ (dist 1) → A. Asli A ✓.
2. $x=3$: nearest $2$ (dist 1) → A ✓.
3. $x=6$: distances: 3→3, 8→2, 9→3. Nearest $8$ → A. Asli B ✗.
4. $x=8$: nearest $9$ (dist 1) → B. Asli A ✗.
5. $x=9$: nearest $8$ (dist 1) → A. Asli B ✗.
6. $x=13$: nearest $14$ → B ✓.
7. $x=14$: nearest $13$ → B ✓.
8. Galat = 3, total = 7. Error rate $= 3/7 \approx 0.43$.

**Answer: 0.43.**

**Galti kahan hoti hai:** point ko khud ka neighbour maan lena → har prediction sahi → 0 (ye training error hai). Ya accuracy $4/7 = 0.57$ likh dena.

**Example 4 (NAT, medium):** A model predicts every target by the mean of its training targets. Its LOOCV mean squared error on $y = 1, 3, 5, 11$ is ______ (round to two decimals).

**Soch:** mean predictor + LOOCV → shortcut $\left(\frac{n}{n-1}\right)^2 \times$ training MSE.

**Solution:**
1. $\bar y = 20/4 = 5$. Deviations: $-4, -2, 0, 6$.
2. Training MSE $= (16 + 4 + 0 + 36)/4 = 56/4 = 14$.
3. $n/(n-1) = 4/3$, square $= 16/9$.
4. LOOCV MSE $= 14 \times 16/9 = 224/9 \approx 24.89$.
5. Check: leave-out residuals $= \frac43 \times (-4, -2, 0, 6) = -5.33, -2.67, 0, 8$; squares $28.44, 7.11, 0, 64$; average $= 99.56/4 \approx 24.89$ ✓.

**Answer: 24.89.**

**Galti kahan hoti hai:** training MSE 14 hi likh dena (point ko apne hi mean me shaamil kar diya), ya sirf ek baar $\frac{n}{n-1}$ multiply karna → 18.67.

**Example 5 (MSQ, medium):** Which statements are correct?
- (A) In 10-fold CV, each model is trained on 90% of the data.
- (B) Running LOOCV twice on the same 200 points can give different error estimates.
- (C) Applying SMOTE oversampling to the whole dataset and then running 5-fold CV makes the CV score optimistic.
- (D) For daily stock data, random 10-fold CV is fine as long as $k$ is large.

**Soch:** har option ko rule se match karo: training size, determinism, preprocessing inside fold, time order.

**Solution:**
1. (A) Training size $= \frac{k-1}{k} = \frac{9}{10}$ → sahi.
2. (B) LOOCV deterministic hai → galat.
3. (C) SMOTE minority points ke synthetic copies banata hai jo dusre points ke beech interpolate hote hain; held-out fold ke "jaise" points training me aa jaate hain → leak → sahi.
4. (D) Random folds me future din training me aa jaate hain; $k$ badhane se ye theek nahi hota → galat.

**Answer: (A), (C).**

**Galti kahan hoti hai:** (D) ko sahi maanna kyunki "bada $k$ = better estimate" — par leak $k$ se independent hai.

**Example 6 (NAT, hard):** A forecaster has 150 days of data. For each $t = 120, 121, \dots, 149$ it trains on days $1, \dots, t$ and tests on day $t + 1$. At every $t$ it trains two competing models (a linear model and a tree). The total number of model trainings is ______.

**Soch:** forward chaining → models per candidate $= b - a + 1$; phir candidates se multiply.

**Solution:**
1. $t$ values: $149 - 120 + 1 = 30$.
2. Har $t$ par 2 models: $30 \times 2 = 60$.

**Answer: 60.**

**Galti kahan hoti hai:** $149 - 120 = 29$ lena (off-by-one) → 58; ya 150 days ko hi count maan lena.

## Confusions clear karo

**Q:** Fold aur fit me kya farak hai?
**A:** Fold data ka ek hissa hai ($n/k$ points). Fit ek baar model train karna hai. $k$-fold me $k$ folds aur $k$ fits (per candidate) hote hain, lekin har fit $k-1$ folds par hota hai.

**Q:** LOOCV best hai to hamesha kyun nahi use karte?
**A:** $n$ fits lagte hain (bada data = bahut mehenga), aur variance high ho sakta hai. 5 ya 10-fold practical balance hai.

**Q:** 1-NN ka training error 0 kyun, LOOCV error kyun nahi?
**A:** Training error me point khud training me hai, distance 0, to wahi apna neighbour — hamesha sahi. LOOCV me wo point hata diya jaata hai, to asli neighbour dekhna padta hai.

**Q:** Scaling to sirf mean/SD hai, isse kya leak hoga?
**A:** Held-out fold ki values mean/SD me ghus gayi, matlab training ne test ka kuch "dekh" liya. Chhota effect lagta hai, par feature selection ya oversampling me yahi effect bahut bada ho jaata hai. Rule ek hi hai: fit inside training fold.

**Q:** Stratified aur group k-fold me kab kya?
**A:** Stratified = labels ka ratio har fold me same (imbalanced classes ke liye). Group = ek group (patient/user) ki saari rows ek fold me (leak rokne ke liye). Patient wale leak ka fix group hai, stratify nahi.

**Q:** CV ke baad test set kyun chahiye?
**A:** CV ka use karke humne best setting chuni; is choice ne CV score ko thoda optimistic bana diya (best of many). Untouched test set ek baar ka imaandaar final number deta hai.

**Q:** Forward chaining me test har baar sirf ek din kyun?
**A:** Ye ek common design hai ("train on 1..t, test on t+1"). Window badi bhi ho sakti hai; ginti hamesha utni hai jitni baar training hui.

## Khud try karo

1. 4-fold CV se 5 candidate values compare ki, final refit nahi gina. Kitne fits?

<details><summary>Answer dekho</summary>

Fits $= k \times m = 4 \times 5 = 20$.

</details>

2. $n = 30$ points par LOOCV se 2 models compare kiye, phir winner ko ek baar poore data par refit kiya. Total fits?

<details><summary>Answer dekho</summary>

LOOCV: $n$ fits per model $= 30 \times 2 = 60$, plus refit $= 61$. ($29 \times 2$ galat hai — 29 training size hai.)

</details>

3. 1-NN, distance $|x - x'|$, data: $1(A), 2(B), 5(B), 6(A), 10(A), 12(A)$. Training error aur LOOCV error rate nikaalo.

<details><summary>Answer dekho</summary>

Training error = 0 (har point apna neighbour).

LOOCV:
- 1 → nearest 2 (B), asli A ✗
- 2 → nearest 1 (A), asli B ✗
- 5 → nearest 6 (A), asli B ✗
- 6 → nearest 5 (B), asli A ✗
- 10 → nearest 12 (A) ✓
- 12 → nearest 10 (A) ✓

Error rate $= 4/6 \approx 0.67$.

</details>

4. Mean predictor, $y = 2, 6, 10$. LOOCV MSE?

<details><summary>Answer dekho</summary>

$\bar y = 6$, training MSE $= (16 + 0 + 16)/3 = 32/3$. LOOCV MSE $= (3/2)^2 \times 32/3 = 24$.
Check: 2 chhodo → mean 8, residual $-6$; 6 chhodo → mean 6, residual 0; 10 chhodo → mean 4, residual 6. $(36 + 0 + 36)/3 = 24$ ✓.

</details>

5. Ek app ke 2,000 users ke 40,000 sessions hain. Random 10-fold CV me 92% accuracy aati hai, naye users par 70%. Kaunsa change best fix hai?

<details><summary>Answer dekho</summary>

Group k-fold by user: ek user ke saare sessions ek hi fold me. Random split me same user train aur test dono me tha, model user ki aadat yaad kar raha tha. Stratified ya zyada folds isse fix nahi karte.

</details>

## Ek page me

- k-fold CV: $k$ fits per candidate, har fit $\frac{k-1}{k}n$ points par; CV error = $k$ held-out errors ka average.
- Fits $= k \times m$ (+1 agar final refit gina jaaye). Grid me $m$ = combinations ka product.
- LOOCV: $k = n$, fits $= n$ per candidate (not $n-1$), deterministic, low bias, variance high ho sakta hai, mehenga.
- Bada $k$ → bade training sets → kam pessimistic, zyada fits.
- LOOCV k-NN: point khud ka neighbour nahi; 1-NN training error 0, LOOCV error nahi.
- Mean predictor: LOOCV MSE $= \left(\frac{n}{n-1}\right)^2 \times$ training MSE.
- Leakage = validation/test, future ya label ki info training me pahunchna.
- Scaler, imputer, feature selection, oversampling, tuning — sab training fold ke andar fit, held-out par sirf apply.
- Related rows → group k-fold; time series → forward chaining, models $= b - a + 1$.
- Test set sirf ek baar, aakhir me.
- CV bahut high, deployment bahut low → leakage, high bias nahi.

Revision ke liye **Short note** tab dekho.
