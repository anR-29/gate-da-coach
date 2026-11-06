# Bernoulli, binomial and Poisson models

> **Time:** ~35 min · **Pehle aana chahiye:** Counting ($\binom nk$, "at least one" via complement), PMF aur $E[X]$, $\mathrm{Var}(X)$ · **Day:** 5

## Ye topic kyun?

Bahut saari real situations ek hi saanche (model) me fit hoti hain: "20 sawaal guess kiye, kitne sahi?" (binomial), "ek ghante me kitne calls?" (Poisson), "bina wapas daale kitne defective?" (hypergeometric). Model pehchan liya to formula seedha mil jaata hai. GATE DA me 1–2 mark ke sawaal aate hain: sahi model chuno, $\lambda$ nikalo, "at least / at most" ka sahi tail lo, ya mean/variance batao. Galtiyan zyaadatar tail ki direction aur rate ko interval se scale karne me hoti hain.

## Picture se samjho

Socho ek coin jiska heads (success) ka chance 0.4 hai, use 5 baar uchhalo. $X$ = kitni baar success. $X$ 0 se 5 tak kuch bhi ho sakta hai. Har value ki probability ka danda-chart:

<figure class="fig">
<svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg">
<text x="190" y="18" text-anchor="middle" font-size="12" fill="currentColor">Binomial(5, 0.4)</text>
<line x1="20" y1="180" x2="360" y2="180" stroke="currentColor"/>
<rect x="35" y="149" width="30" height="31" style="fill:var(--muted)"/>
<rect x="90" y="76" width="30" height="104" style="fill:var(--muted)"/>
<rect x="145" y="42" width="30" height="138" style="fill:var(--mark)"/>
<rect x="200" y="88" width="30" height="92" style="fill:var(--mark)"/>
<rect x="255" y="149" width="30" height="31" style="fill:var(--mark)"/>
<rect x="310" y="176" width="30" height="4" style="fill:var(--mark)"/>
<text x="50" y="143" text-anchor="middle" font-size="10" fill="currentColor">0.078</text>
<text x="105" y="70" text-anchor="middle" font-size="10" fill="currentColor">0.259</text>
<text x="160" y="36" text-anchor="middle" font-size="10" fill="currentColor">0.346</text>
<text x="215" y="82" text-anchor="middle" font-size="10" fill="currentColor">0.230</text>
<text x="270" y="143" text-anchor="middle" font-size="10" fill="currentColor">0.077</text>
<text x="325" y="170" text-anchor="middle" font-size="10" fill="currentColor">0.010</text>
<text x="50" y="196" text-anchor="middle" font-size="12" fill="currentColor">0</text>
<text x="105" y="196" text-anchor="middle" font-size="12" fill="currentColor">1</text>
<text x="160" y="196" text-anchor="middle" font-size="12" fill="currentColor">2</text>
<text x="215" y="196" text-anchor="middle" font-size="12" fill="currentColor">3</text>
<text x="270" y="196" text-anchor="middle" font-size="12" fill="currentColor">4</text>
<text x="325" y="196" text-anchor="middle" font-size="12" fill="currentColor">5</text>
<text x="190" y="220" text-anchor="middle" font-size="12" fill="currentColor">P(X ≥ 2) = 1 − P(0) − P(1) ≈ 0.663</text>
</svg>
<figcaption>Gehre dande X ≥ 2 hain. Unhe jodne ki jagah, halke do dande (0 aur 1) 1 me se ghatao.</figcaption>
</figure>

Dhyan do: "at least 2" ke chaar dande hain, par complement me sirf do. Isliye $P(X\ge2)=1-P(X\le1)$ — complement **1 par** rukta hai, 2 par nahi. Chart ka peak $np=2$ ke paas hai, jo mean hai.

Ab Poisson ki picture. Calls ek ghante me average 9 aate hain, par bilkul random waqt par. Ghante ko teen 20-minute ke tukdon me baanto:

<figure class="fig">
<svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="70" x2="380" y2="70" stroke="currentColor" stroke-width="2"/>
<line x1="140" y1="30" x2="140" y2="80" stroke="currentColor" stroke-dasharray="4 3"/>
<line x1="260" y1="30" x2="260" y2="80" stroke="currentColor" stroke-dasharray="4 3"/>
<circle cx="50" cy="70" r="5" style="fill:var(--info)"/>
<circle cx="104" cy="70" r="5" style="fill:var(--info)"/>
<circle cx="158" cy="70" r="5" style="fill:var(--info)"/>
<circle cx="182" cy="70" r="5" style="fill:var(--info)"/>
<circle cx="206" cy="70" r="5" style="fill:var(--info)"/>
<circle cx="248" cy="70" r="5" style="fill:var(--info)"/>
<circle cx="290" cy="70" r="5" style="fill:var(--info)"/>
<circle cx="332" cy="70" r="5" style="fill:var(--info)"/>
<circle cx="362" cy="70" r="5" style="fill:var(--info)"/>
<text x="80" y="45" text-anchor="middle" font-size="11" fill="currentColor">2 calls</text>
<text x="200" y="45" text-anchor="middle" font-size="11" fill="currentColor">4 calls</text>
<text x="320" y="45" text-anchor="middle" font-size="11" fill="currentColor">3 calls</text>
<text x="20" y="92" text-anchor="middle" font-size="10" fill="currentColor">0</text>
<text x="140" y="92" text-anchor="middle" font-size="10" fill="currentColor">20</text>
<text x="260" y="92" text-anchor="middle" font-size="10" fill="currentColor">40</text>
<text x="372" y="92" text-anchor="middle" font-size="10" fill="currentColor">60 min</text>
<text x="200" y="125" text-anchor="middle" font-size="11" fill="currentColor">rate 9 per hour → 20-min window: λ = 9 × 20/60 = 3</text>
</svg>
<figcaption>Har window me calls ki ginti random hai (2, 4, 3, …), par average λ = rate × window ki lambai.</figcaption>
</figure>

Har 20-minute window me ginti badalti hai, par average 3 hai. Poisson ka $\lambda$ hamesha "is interval me average kitne" hota hai — isliye rate ko interval ki lambai se guna karna padta hai (units match karke).

## Concept step-by-step

### 1. Bernoulli: ek trial

**Bernoulli trial** = ek experiment jiske do hi result hain: success (1) ya failure (0). $P(X=1)=p$, $P(X=0)=1-p=q$.

- $E[X]=1\cdot p+0\cdot q=p$.
- $E[X^2]=1^2p+0^2q=p$, to $\mathrm{Var}(X)=p-p^2=p(1-p)$.

Example: fair die par six = success. $p=1/6$, mean $1/6$, variance $\frac16\cdot\frac56=\frac5{36}$.

Dhyan do: variance $p(1-p)$ sabse bada $p=0.5$ par hota hai (0.25); $p$ 0 ya 1 ke paas ho to result lagbhag pakka, variance chhota.

### 2. Binomial: $n$ trials me kitne success

**Binomial($n,p$)** tab, jab chaaron shartein hon:
1. trials ki ginti $n$ **pehle se fixed**,
2. trials **independent**,
3. har trial me sirf success/failure,
4. success ka chance $p$ har trial me **same**.

$X$ = successes ki ginti. Formula:

$$P(X=k)=\binom nk p^k(1-p)^{n-k},\quad k=0,1,\dots,n.$$

**Kyun?** Ek specific sequence lo jisme $k$ success aur $n-k$ failure hain (jaise SSFFF). Independence se uska chance $p^k q^{n-k}$. Aise kitne sequences? $n$ positions me se success ki $k$ jagah chunni hain: $\binom nk$. Sab sequences disjoint hain, to jod do.

Example: Binomial(5, 0.4), $P(X=2)=\binom52(0.4)^2(0.6)^3=10\times0.16\times0.216=0.3456$.

Dhyan do: $\binom nk$ bhoolna common hai — wo sirf ek order (SSFFF) ka chance hai, saare orders ka nahi.

### 3. Binomial ka mean aur variance

$X$ ko $n$ Bernoullis ka sum socho: $X=X_1+\dots+X_n$ (har $X_i$ = trial $i$ success hua to 1).
- Expectation sum me baant jaati hai: $E[X]=p+p+\dots+p=np$.
- Independent variables ke variance bhi judte hain: $\mathrm{Var}(X)=np(1-p)=npq$.

Example: 20 MCQ, har ek me 5 options, sab guess. $X\sim$ Binomial(20, 0.2). Expected sahi $=20\times0.2=4$, variance $=20\times0.2\times0.8=3.2$.

Dhyan do: "expected number" poochha hai to sirf $np$ — poora PMF lagane ki zaroorat nahi. "Probability of exactly $k$" poochha hai to poora PMF chahiye.

### 4. Shabdon se event: tail ki direction

Calculate karne se **pehle** event ko symbols me likho:

| Shabd | Event | Kaise nikaalo |
|---|---|---|
| at most $k$ / no more than $k$ | $X\le k$ | $P(0)+\dots+P(k)$ |
| fewer than $k$ / less than $k$ | $X\le k-1$ | $P(0)+\dots+P(k-1)$ |
| at least $k$ / no fewer than $k$ | $X\ge k$ | $1-P(X\le k-1)$ |
| more than $k$ | $X\ge k+1$ | $1-P(X\le k)$ |

**Complement kyun $k-1$ par rukta hai?** $X\ge k$ ka ulta "$X$, $k$ se chhota" hai, yani $X\le k-1$. $k$ khud "at least $k$" me shamil hai, complement me nahi.

Example: Binomial(5, 0.4), $P(X\ge2)=1-[P(0)+P(1)]=1-[0.07776+0.2592]=0.66304$.

Dhyan do: $P(X\ge3)=1-P(X\le2)$; $1-P(X\le3)$ likhne se $P(X=3)$ dono jagah se gayab ho jaata hai.

### 5. Poisson: rate par hone wali ginti

Jab events ek **constant average rate** par, ek-doosre se independent, kisi interval (time, length, area, pages) me hote hain, aur upar koi fixed $n$ nahi hai — tab ginti $X\sim$ Poisson($\lambda$):

$$P(X=k)=\frac{e^{-\lambda}\lambda^k}{k!},\quad k=0,1,2,\dots$$

$\lambda$ = us interval me average ginti. Khaas baat: **mean = variance = $\lambda$**.

Kaam ke shortcuts:
- $P(X=0)=e^{-\lambda}$ (kyunki $\lambda^0/0!=1$).
- $P(X\le1)=e^{-\lambda}(1+\lambda)$.
- $P(X\ge1)=1-e^{-\lambda}$.

Example: $\lambda=3$: $P(0)=e^{-3}\approx0.0498$, $P(X\le1)=4e^{-3}\approx0.1991$, $P(X=2)=e^{-3}\cdot9/2\approx0.2240$.

Dhyan do: $k!$ mat bhoolo. $P(X=2)=e^{-\lambda}\lambda^2/2$, sirf $e^{-\lambda}\lambda^2$ nahi.

### 6. $\lambda$ = rate × interval

Rate aur interval ki units same karo, phir guna karo.

Example: 9 calls/hour, 20 minute me: $\lambda=9\times\frac{20}{60}=3$. Typos 0.4 per page, 5 pages: $\lambda=2$.

Kyun chalta hai? Agar 1 ghante me average 9 aur rate constant hai, to ghante ke ek-tihai me average bhi ek-tihai, yani 3.

Dhyan do: interval badla to $\lambda$ badlega. "6 per hour, 20 minute" ke liye $\lambda=6$ lena (scale na karna) sabse common galti hai.

### 7. Binomial → Poisson approximation

Jab $n$ bahut bada aur $p$ bahut chhota ho (jaise $n\ge50$, $p\le0.05$), Binomial($n,p$) ≈ Poisson($\lambda=np$).

**Kyun?** $P(X=0)=(1-p)^n=\left(1-\frac{\lambda}{n}\right)^n\to e^{-\lambda}$ jab $n$ bada ho (ye $e$ ki standard limit hai). Baaki terms bhi isi tarah Poisson ban jaate hain. Aur variance $np(1-p)\approx np=\lambda$ kyunki $1-p\approx1$.

Example: 600 items, har ek independently 0.005 chance se defective. $\lambda=600\times0.005=3$. $P(\text{koi defective nahi})\approx e^{-3}\approx0.0498$. Exact binomial: $0.995^{600}\approx0.0494$. Bahut kareeb.

Dhyan do: approximation me $\lambda=np$ lo, $n$ ya $p$ akela nahi.

### 8. Independent Poissons judte hain

Agar $X\sim$ Poisson($\lambda_1$) aur $Y\sim$ Poisson($\lambda_2$) independent hain, to $X+Y\sim$ Poisson($\lambda_1+\lambda_2$). Soch: do alag darwazon se log aa rahe hain, 2/min aur 3/min; kul milakar 5/min.

Example: total 1 minute me koi nahi aaya: $e^{-5}\approx0.0067$.

Dhyan do: ye sirf **independent** Poissons ke liye. Aur rates jodte hain, probabilities nahi.

### 9. Model kaise chunein

| Situation | Model | Mean |
|---|---|---|
| fixed $n$ independent trials, same $p$, count successes | Binomial($n,p$) | $np$ |
| rate over time/space, koi fixed $n$ nahi | Poisson($\lambda$) | $\lambda$ |
| finite lot se bina replacement, count special | Hypergeometric($N,K,n$) | $nK/N$ |
| pehla success aane tak kitne trials | Geometric($p$) | $1/p$ |

**Geometric:** pehla success trial $k$ par aaye, iske liye pehle $k-1$ fail, phir success: $P(X=k)=(1-p)^{k-1}p$, $k=1,2,\dots$ Mean $1/p$ (jaise $p=1/6$ ho to average 6 rolls me pehla six). Yahan $n$ fixed nahi — isliye binomial nahi.

Dhyan do: ek doosra convention bhi hai — $Y$ = pehle success se **pehle kitne failures**: $P(Y=k)=(1-p)^k p$, $k=0,1,2,\dots$, mean $(1-p)/p$. ($Y=X-1$.) Sawaal padh ke dekho ki "trials" gin rahe hain ya "failures"; exponential ka $\lfloor X\rfloor$ (Day 6) isi doosre convention wala geometric hai.

Example: 52 cards se 5 cards me aces ki ginti → bina replacement → hypergeometric, binomial nahi.

Dhyan do: "until first" → geometric; "without replacement" → hypergeometric; "rate per minute" → Poisson; "out of $n$ independent" → binomial.

## Solved examples

**Example 1 (MCQ, easy):** Ek website par visitors average 4 per minute, independently aate hain. $X$ = 15 minute me visitors ki ginti. Sabse sahi model?
(A) Poisson(4) (B) Poisson(60) (C) Binomial(15, 0.4) (D) Geometric(0.25)

**Soch:** Rate + interval, koi fixed $n$ nahi → Poisson. $\lambda$ = rate × interval.

**Solution:**
1. Model: Poisson.
2. $\lambda=4\times15=60$. **Answer (B).**

**Galti kahan hoti hai:** (A) — rate ko interval se scale nahi kiya. (C) — 15 minutes ko 15 "trials" maan liya; har minute me ek se zyada visitor aa sakte hain, to ye binomial nahi.

**Example 2 (NAT, easy):** $X\sim$ Binomial(6, 0.5). $P(X\ge5)$ nikalo.

**Soch:** "At least 5" = $X=5$ ya $6$; yahan seedha jodna complement se aasaan hai.

**Solution:**
1. $P(X=5)=\binom65(0.5)^6=6/64$.
2. $P(X=6)=\binom66(0.5)^6=1/64$.
3. $P(X\ge5)=7/64\approx0.1094$. **Answer: ≈ 0.109.**

**Galti kahan hoti hai:** $1-P(X\le5)=1/64$ — complement 5 par rok diya, jabki 4 par rokna tha. Ya $P(X\le5)$ (ulti direction) nikaal dena.

**Example 3 (MSQ, medium):** Kaun se random variables **binomial** hain?
(A) Ek fair die 10 baar phenka; sixes ki ginti
(B) 20 items (5 defective) me se 4 bina replacement chune; defectives ki ginti
(C) Coin tab tak uchhala jab tak pehla head na aaye; tosses ki ginti
(D) 15 customers, har ek independently 0.1 chance se ad click karta hai; clicks ki ginti

**Soch:** Chaar shartein check karo: fixed $n$, independent, same $p$, count successes.

**Solution:**
1. (A): $n=10$ fixed, independent rolls, $p=1/6$ → binomial. Sahi.
2. (B): bina replacement → $p$ badalta hai → hypergeometric. Galat.
3. (C): $n$ fixed nahi, "until first" → geometric. Galat.
4. (D): $n=15$, independent, $p=0.1$ → binomial. Sahi.
**Answer: (A), (D).**

**Galti kahan hoti hai:** (B) tick karna — "4 chune, kitne defective" sunke binomial lagta hai, par without replacement me draws independent nahi.

**Example 4 (NAT, medium):** Ek machine me breakdowns Poisson process se 5 per hour hote hain. Agle 30 minute me **zyada se zyada 1** breakdown hone ki probability (4 decimal)?

**Soch:** Poisson + interval badla → $\lambda$ scale karo. "At most 1" = $X\le1$.

**Solution:**
1. $\lambda=5\times\frac{30}{60}=2.5$.
2. $P(X\le1)=e^{-2.5}(1+2.5)=3.5e^{-2.5}$.
3. $e^{-2.5}\approx0.08208$, to $P\approx0.2873$. **Answer: ≈ 0.2873.**

**Galti kahan hoti hai:** $\lambda=5$ lena (scale nahi kiya): $6e^{-5}\approx0.040$. Ya "at most" ko "at least" padh kar $1-0.2873$ likhna.

**Example 5 (MCQ, hard):** Ek fair die 10 baar phenka. Exactly 3 sixes ki probability closest to:
(A) 0.0013 (B) 0.155 (C) 1.667 (D) 0.5

**Soch:** Fixed $n=10$, independent, $p=1/6$, "exactly $k$" → binomial PMF poora.

**Solution:**
1. $\binom{10}3=120$.
2. $(1/6)^3=1/216\approx0.004630$; $(5/6)^7\approx0.27908$.
3. $P=120\times0.004630\times0.27908\approx0.155$. **Answer (B).**

**Galti kahan hoti hai:** (A) 0.0013 — $\binom{10}3$ bhool gaye (sirf ek order). (C) 1.667 — ye expected sixes $np=10/6$ hai, probability nahi (probability 1 se badi ho hi nahi sakti).

**Example 6 (NAT, hard):** 1000 transactions me se har ek independently 0.003 probability se fraud hai. Poisson approximation se, kam se kam 2 fraud hone ki probability (3 decimal)?

**Soch:** $n$ bada, $p$ chhota → Poisson($np$). "At least 2" → $1-P(X\le1)$.

**Solution:**
1. $\lambda=1000\times0.003=3$.
2. $P(X\le1)=e^{-3}(1+3)=4e^{-3}\approx4\times0.049787=0.19915$.
3. $P(X\ge2)=1-0.19915\approx0.801$. **Answer: ≈ 0.801.**
4. (Check: exact binomial $\approx0.8013$ — approximation achha hai.)

**Galti kahan hoti hai:** $1-P(X\le2)$ lena (complement 2 par roka): $1-8.5e^{-3}\approx0.577$. Ya sirf $P(X\le1)=0.199$ likh dena (direction ulti).

## Confusions clear karo

**Q:** Binomial aur Poisson me kaise farak karun?
**A:** Binomial me ek fixed $n$ hota hai (kitne trials) aur $X\le n$. Poisson me koi upper limit nahi, sirf ek rate hota hai (per hour, per page). "Out of 20" dikhe to binomial; "per minute" dikhe to Poisson.

**Q:** Binomial aur hypergeometric dono "$n$ me se kitne" hain, farak?
**A:** Replacement. With replacement / independent → $p$ constant → binomial. Bina replacement, finite lot → $p$ har draw ke baad badalta → hypergeometric.

**Q:** "At least" ke liye kab complement lun?
**A:** Jab "at least $k$" me bahut terms hon (Poisson me to infinite!). Tab $1-P(X\le k-1)$. Agar sirf 1–2 terms hon (jaise Binomial(6) me $X\ge5$), seedha jod lo.

**Q:** Poisson me mean aur variance barabar kyun?
**A:** Poisson ko Binomial($n,p$) ka limit socho, $np=\lambda$ fixed, $p\to0$. Mean $np=\lambda$, variance $np(1-p)\to\lambda$ kyunki $1-p\to1$.

**Q:** $\lambda$ me units kaise sambhalun?
**A:** Rate ko interval ki unit me badlo: 6/hour = 0.1/minute. Phir minutes se guna. Ya interval ko hours me badlo: 20 min = 1/3 hour.

**Q:** Expected value aur probability kab kaunsa?
**A:** "Expected / average number" → mean ($np$ ya $\lambda$), koi bhi number ho sakta hai. "Probability that …" → PMF, answer hamesha 0 aur 1 ke beech.

**Q:** Geometric aur binomial me farak?
**A:** Binomial: trials fixed, successes random. Geometric: successes fixed (pehla ek), trials random.

## Khud try karo

**1.** $X\sim$ Binomial(8, 0.25). Mean aur variance?

<details><summary>Answer dekho</summary>

Mean $=np=8\times0.25=2$. Variance $=npq=8\times0.25\times0.75=1.5$.

</details>

**2.** $X\sim$ Binomial(4, 0.3). $P(X\ge1)$?

<details><summary>Answer dekho</summary>

Complement: $P(X=0)=0.7^4=0.2401$. $P(X\ge1)=1-0.2401=0.7599$.

</details>

**3.** Ek document me typos 2 per page (Poisson). 3-page section me ek bhi typo na hone ki probability?

<details><summary>Answer dekho</summary>

$\lambda=2\times3=6$. $P(X=0)=e^{-6}\approx0.00248$.

</details>

**4.** Har attempt me success ka chance 0.2 hai (independent). Pehla success exactly 3rd attempt par aane ki probability? Average kitne attempts lagenge?

<details><summary>Answer dekho</summary>

Geometric: $P(X=3)=(0.8)^2(0.2)=0.64\times0.2=0.128$.
Mean $=1/p=1/0.2=5$ attempts.

</details>

**5.** Do independent sources: A se messages Poisson 1 per hour, B se Poisson 2 per hour. Ek ghante me kul exactly 2 messages aane ki probability?

<details><summary>Answer dekho</summary>

Kul $\sim$ Poisson($1+2=3$). $P(X=2)=e^{-3}\cdot\frac{3^2}{2!}=4.5e^{-3}\approx0.224$.

</details>

## Ek page me

- Bernoulli($p$): mean $p$, variance $p(1-p)$.
- Binomial($n,p$): fixed $n$, independent, same $p$; $P(X=k)=\binom nk p^kq^{n-k}$.
- Binomial mean $np$, variance $npq$; "expected number" = $np$.
- Poisson($\lambda$): $e^{-\lambda}\lambda^k/k!$; mean = variance = $\lambda$.
- $\lambda$ = rate × interval (units same karo).
- $P(0)=e^{-\lambda}$, $P(X\le1)=e^{-\lambda}(1+\lambda)$.
- Large $n$, small $p$: Binomial ≈ Poisson($np$).
- Independent Poissons: rates jodo.
- Pehle shabdon ko symbols me likho; $P(X\ge k)=1-P(X\le k-1)$.
- "Fewer than $k$" = $X\le k-1$; "more than $k$" = $X\ge k+1$.
- Model: fixed $n$ → binomial; rate → Poisson; no replacement → hypergeometric; until first → geometric (mean $1/p$).
- $\binom nk$ aur $k!$ kabhi mat bhoolo.

Revision ke liye **Short note** tab dekho.
