# Searching and asymptotic complexity

> **Time:** ~35 min · **Pehle aana chahiye:** $\log_2$, summation ($\sum$), basic Python loops · **Day:** 31, 35

## Ye topic kyun?

Koi bhi algorithm "kitna fast hai" — ye sawaal har DSA question ke peeche hai. Is topic me do cheezein seekhenge: (1) **searching** — linear aur binary search kitne comparisons leti hain, aur (2) **asymptotic complexity** — loop kitni baar chalta hai aur functions ko growth ke hisaab se kaise order karte hain (O, Ω, Θ). GATE DA me isse NAT ("loop kitni baar chala?", "max comparisons?"), MCQ ("complexity kya hai?", "increasing order me lagao") aur MSQ ("kaunse statements true?") aate hain.

## Picture se samjho

Dictionary me "mango" dhoondhna hai. Ek tareeka: pehle page se ek-ek page palto — ye **linear search** hai. Doosra: beech se kholo; "mango" "L" ke baad aata hai to aage wala aadha, warna peeche wala aadha — har baar aadha hissa phenk do. Ye **binary search** hai. 1000 page ki dictionary me linear search worst case 1000 baar dekhta hai; binary search sirf 10 baar!

Binary search ke saare possible "beech wale" probes ek tree bana dete hain. Neeche 7 sorted numbers `[4, 9, 15, 22, 30, 41, 57]` ka tree hai.

<figure class="fig">
<svg viewBox="0 0 580 210" xmlns="http://www.w3.org/2000/svg">
<line x1="183" y1="47" x2="127" y2="88" style="stroke:currentColor"/>
<line x1="217" y1="47" x2="273" y2="88" style="stroke:currentColor"/>
<line x1="98" y1="117" x2="72" y2="153" style="stroke:currentColor"/>
<line x1="122" y1="117" x2="148" y2="153" style="stroke:currentColor"/>
<line x1="278" y1="117" x2="252" y2="153" style="stroke:currentColor"/>
<line x1="302" y1="117" x2="328" y2="153" style="stroke:currentColor"/>
<circle cx="200" cy="35" r="21" style="fill:var(--mark);fill-opacity:0.3;stroke:currentColor"/>
<text x="200" y="40" text-anchor="middle" style="fill:currentColor">22</text>
<circle cx="110" cy="100" r="21" style="fill:none;stroke:currentColor"/>
<text x="110" y="105" text-anchor="middle" style="fill:currentColor">9</text>
<circle cx="290" cy="100" r="21" style="fill:none;stroke:currentColor"/>
<text x="290" y="105" text-anchor="middle" style="fill:currentColor">41</text>
<circle cx="60" cy="170" r="21" style="fill:none;stroke:currentColor"/>
<text x="60" y="175" text-anchor="middle" style="fill:currentColor">4</text>
<circle cx="160" cy="170" r="21" style="fill:none;stroke:currentColor"/>
<text x="160" y="175" text-anchor="middle" style="fill:currentColor">15</text>
<circle cx="240" cy="170" r="21" style="fill:none;stroke:currentColor"/>
<text x="240" y="175" text-anchor="middle" style="fill:currentColor">30</text>
<circle cx="340" cy="170" r="21" style="fill:none;stroke:currentColor"/>
<text x="340" y="175" text-anchor="middle" style="fill:currentColor">57</text>
<text x="226" y="20" style="fill:var(--muted)">[3]</text>
<text x="136" y="85" style="fill:var(--muted)">[1]</text>
<text x="316" y="85" style="fill:var(--muted)">[5]</text>
<text x="60" y="206" text-anchor="middle" style="fill:var(--muted)">[0]</text>
<text x="160" y="206" text-anchor="middle" style="fill:var(--muted)">[2]</text>
<text x="240" y="206" text-anchor="middle" style="fill:var(--muted)">[4]</text>
<text x="340" y="206" text-anchor="middle" style="fill:var(--muted)">[6]</text>
<text x="395" y="40" style="fill:var(--info)">1 comparison → 1 key</text>
<text x="395" y="105" style="fill:var(--info)">2 comparisons → 2 keys</text>
<text x="395" y="175" style="fill:var(--info)">3 comparisons → 4 keys</text>
</svg>
<figcaption>Binary search ka decision tree (n = 7). Pehla probe beech wala index 3; chhota ho to left, bada ho to right. Har level par keys double.</figcaption>
</figure>

Notice karo: har comparison ke baad bacha hua hissa aadha ho jaata hai, isliye tree ki height sirf $\log_2 n$ ke aas-paas hai. Level j par $2^{j-1}$ keys hain — un sab ko dhoondhne me exactly j comparisons lagte hain.

Ab growth ki picture. Algorithms ka time n badhne par kaise badhta hai, ye ek "seedhi" (ladder) hai — upar wala function aakhir me neeche wale ko hamesha hara deta hai, chahe chhote n par ulta dikhe.

<figure class="fig">
<svg viewBox="0 0 520 270" xmlns="http://www.w3.org/2000/svg">
<rect x="30" y="238" width="20" height="14" style="fill:var(--good)"/>
<text x="58" y="250" style="fill:currentColor">1</text>
<rect x="30" y="218" width="48" height="14" style="fill:var(--good)"/>
<text x="86" y="230" style="fill:currentColor">log log n</text>
<rect x="30" y="198" width="76" height="14" style="fill:var(--good)"/>
<text x="114" y="210" style="fill:currentColor">log n</text>
<rect x="30" y="178" width="104" height="14" style="fill:var(--good)"/>
<text x="142" y="190" style="fill:currentColor">(log n)² , (log n)¹⁰ …</text>
<rect x="30" y="158" width="132" height="14" style="fill:var(--info)"/>
<text x="170" y="170" style="fill:currentColor">√n = n^0.5</text>
<rect x="30" y="138" width="160" height="14" style="fill:var(--info)"/>
<text x="198" y="150" style="fill:currentColor">n</text>
<rect x="30" y="118" width="188" height="14" style="fill:var(--info)"/>
<text x="226" y="130" style="fill:currentColor">n log n</text>
<rect x="30" y="98" width="216" height="14" style="fill:var(--info)"/>
<text x="254" y="110" style="fill:currentColor">n^1.1</text>
<rect x="30" y="78" width="244" height="14" style="fill:var(--info)"/>
<text x="282" y="90" style="fill:currentColor">n² , n³ …</text>
<rect x="30" y="58" width="272" height="14" style="fill:var(--bad)"/>
<text x="310" y="70" style="fill:currentColor">2ⁿ , 3ⁿ</text>
<rect x="30" y="38" width="300" height="14" style="fill:var(--bad)"/>
<text x="338" y="50" style="fill:currentColor">n!</text>
<rect x="30" y="18" width="328" height="14" style="fill:var(--bad)"/>
<text x="366" y="30" style="fill:currentColor">nⁿ</text>
<rect x="400" y="196" width="14" height="14" style="fill:var(--good)"/>
<text x="420" y="208" style="fill:currentColor">polylog</text>
<rect x="400" y="218" width="14" height="14" style="fill:var(--info)"/>
<text x="420" y="230" style="fill:currentColor">polynomial</text>
<rect x="400" y="240" width="14" height="14" style="fill:var(--bad)"/>
<text x="420" y="252" style="fill:currentColor">exponential+</text>
</svg>
<figcaption>Growth ladder: neeche se upar growth badhti hai. Bar ki lambai sirf rank dikhati hai, actual value nahi.</figcaption>
</figure>

Sabse important baat: koi bhi power of log (jaise $(\log n)^{10}$) kisi bhi chhoti si power of n (jaise $n^{0.1}$) se aakhir me chhota hai. Aur koi bhi polynomial ($n^{100}$) kisi bhi exponential ($1.01^n$) se aakhir me chhota hai.

## Concept step-by-step

### 1. Linear search

**Idea:** left se ek-ek element key se compare karo. Mil gaya to ruk jao; end tak nahi mila to "absent".

**Cost (n elements, distinct):**
- Key position i par hai → i comparisons.
- **Successful average** (har position barabar likely): $\frac{1 + 2 + \dots + n}{n} = \frac{n(n+1)/2}{n} = \frac{n+1}{2}$.
- **Unsuccessful:** saare n compare → n.

**Mixed probability:** key p probability se absent hai, warna kisi bhi position par barabar likely:
$$E = p \cdot n + (1-p)\cdot\frac{n+1}{2}.$$
Example: n = 10, p = 0.5 → 0.5·10 + 0.5·5.5 = 7.75.

Linear search kisi bhi order me, aur linked list par bhi chalta hai.

Dhyan do: successful aur unsuccessful ka average alag hai; mix wale sawaal me dono ko probability se weight karo.

### 2. Binary search: algorithm aur trace

**Shart:** array **sorted** ho aur kisi bhi index par O(1) me pahunch sakein (array, linked list nahi).

```python
def bs(a, x):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2      # neeche round
        if a[mid] == x:
            return mid
        elif a[mid] < x:
            lo = mid + 1          # left aadha phenko
        else:
            hi = mid - 1          # right aadha phenko
    return -1
```

**Trace:** a = [2, 5, 9, 14, 20, 27, 33, 40, 46, 51, 58, 63] (indices 0–11), x = 30.

| Step | lo | hi | mid | a[mid] | Faisla |
|---|---|---|---|---|---|
| 1 | 0 | 11 | 5 | 27 | 27 < 30 → lo = 6 |
| 2 | 6 | 11 | 8 | 46 | 46 > 30 → hi = 7 |
| 3 | 6 | 7 | 6 | 33 | 33 > 30 → hi = 5 |
| – | 6 | 5 | – | – | lo > hi → absent |

3 comparisons, 30 nahi mila.

Dhyan do: `(6 + 11) // 2 = 8` (17/2 = 8.5 neeche round). Upar round karoge to poora trace badal jaata hai.

### 3. Binary search: worst case $\lfloor \log_2 n \rfloor + 1$

**Kyun?** n elements me probe ke baad bacha hissa (mid ke ek taraf) zyada se zyada $\lfloor n/2 \rfloor$ hota hai. Size n → ⌊n/2⌋ → ⌊n/4⌋ → … → 1 → 0. Size 1 tak pahunchne me $\lfloor \log_2 n \rfloor$ halvings, aur us last element ka ek aur probe: total $\lfloor \log_2 n \rfloor + 1$.

| n | $\lfloor \log_2 n \rfloor + 1$ |
|---|---|
| 7 | 3 |
| 8 | 4 |
| 12 | 4 |
| 100 | 7 (kyunki 64 ≤ 100 < 128) |
| 1000 | 10 (kyunki 512 ≤ 1000 < 1024) |

Ye "present ya absent, kisi bhi key" ke liye max hai (har probe = ek comparison gina).

**Perfect case $n = 2^k - 1$:** tree poora bhara hai (figure 1, n = 7). Exactly j comparisons wale keys = $2^{j-1}$. n = 31 → 1, 2, 4, 8, 16 keys with 1, 2, 3, 4, 5 comparisons. Average successful (n = 7) = (1·1 + 2·2 + 4·3)/7 = 17/7 ≈ 2.43.

Dhyan do: +1 mat bhoolo (n = 100 ke liye 6 nahi, 7). Aur floor lagao, ceiling nahi: n = 8 → 3 + 1 = 4.

### 4. Binary search kab fail hoti hai

- **Unsorted array:** binary search galat aadha phenk sakti hai aur maujood key ko "absent" bol sakti hai. Example: [5, 1, 9, 3, 7] me 3 dhoondo: mid = 2 (9), 3 < 9 → left [5, 1] me dhoondo → nahi mila, jabki 3 index 3 par hai.
- **Duplicates:** sorted [2, 4, 4, 4, 8] me 4 dhoondo → pehla mid = 2 par hi 4 mil gaya, jo leftmost (index 1) nahi hai.
- **Linked list:** middle tak pahunchne me hi Θ(n) steps, to comparisons log n hon bhi, **time** Θ(n) hai.

Dhyan do: "binary search O(log n)" sirf sorted + random-access par.

### 5. Loops gin-na (nested loops)

**Method:** inner loop kitni baar chalta hai, use outer variable ke function me likho, phir sum karo.

**Example A:**
```python
for i in range(1, n + 1):
    for j in range(i, n + 1):
        count += 1
```
Inner chalta hai n − i + 1 baar. Sum = n + (n−1) + … + 1 = $\frac{n(n+1)}{2}$. n = 10 → 55. Θ(n²).

**Example B (teen strictly nested):**
```python
for i in range(n):
    for j in range(i + 1, n):
        for k in range(j + 1, n):
            c += 1
```
Har (i, j, k) with i < j < k ek baar → $\binom{n}{3}$. n = 10 → 120. Θ(n³), lagbhag n³/6.

**Useful sums:** $\sum_{i=1}^n i = \frac{n(n+1)}{2}$, $\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}$.

Dhyan do: `range(a, b)` me b shaamil nahi; `<` vs `<=` se ek iteration ka farak padta hai. Pehli aur last iteration haath se check karo.

### 6. Doubling / halving loops → log

```python
i = 1
while i <= n:
    i *= 2
```
i = 1, 2, 4, …, jab tak ≤ n: iterations = $\lfloor \log_2 n \rfloor + 1$ → Θ(log n). Same for `i //= 2` ya `i //= 3` (base badalne se sirf constant farak).

**Inner loop dependent ho to sum karo:**
- Outer doubling, inner `range(n)`: (log n) × n → **Θ(n log n)**.
- Outer doubling, inner `range(i)`: 1 + 2 + 4 + … + $2^k$ (jahan $2^k \le n$) $= 2^{k+1} - 1 < 2n$ → **Θ(n)**. Geometric sum apne sabse bade term ke barabar order ka hota hai.
- `for i in 1..n`: inner `j = i; while j < n: j *= 2` → i se n tak doubling = $\lceil \log_2(n/i) \rceil$ steps (≤ $\log_2(n/i) + 1$). $\sum_i \log_2(n/i) = \log_2 \frac{n^n}{n!} \approx n \log_2 e \approx 1.44n$, plus at most n → total < 2.5n → **Θ(n)**. (Bade i ke liye inner loop sirf 0–1 baar chalta hai; zyada kaam sirf chhote i par hai.)

Dhyan do: "do nested loops = n²" ratta mat lagao — dekho variable kaise chal raha hai.

### 7. Harmonic sum aur $\log n!$

- $\sum_{i=1}^{n} \frac{n}{i} = n\left(1 + \frac12 + \dots + \frac1n\right) = n H_n$, aur $H_n \approx \ln n$ → **Θ(n log n)**. (Jaise: har i ke liye i ke multiples tak chalna.)
- $\log n! = \Theta(n \log n)$. *Kyun:* $n! \le n^n$ → $\log n! \le n\log n$. Aur n! me aakhri n/2 terms har ek ≥ n/2 → $n! \ge (n/2)^{n/2}$ → $\log n! \ge \frac{n}{2}\log\frac{n}{2}$, jo bhi Θ(n log n) hai.

Dhyan do: n! khud $c^n$ se bada hai, par uska **log** sirf n log n hai.

### 8. O, Ω, Θ ki definitions

- $f = O(g)$: koi constant c > 0 aur $n_0$ hai jisse **har** $n \ge n_0$ par $f(n) \le c\,g(n)$. (Upper bound.)
- $f = \Omega(g)$: $f(n) \ge c\,g(n)$ for all $n \ge n_0$. (Lower bound.)
- $f = \Theta(g)$: dono — O bhi aur Ω bhi.

**Example:** $f(n) = 2n^2 + 7n$, kya $f = O(n^2)$? $f(n)/n^2 = 2 + 7/n$. n ≥ 4 par $7/n \le 1.75$, to $f \le 3.75\,n^2$. Smallest integer c = 4 (n ≥ 4 ke liye).

**Subsequence trap:** $g(n) = n^2$ (n even), $n$ (n odd). Kya $g = \Theta(n^2)$? Nahi — odd n par g = n, jo kisi bhi $c\,n^2$ se neeche gir jaata hai, to $g \ne \Omega(n^2)$. Par $g = O(n^2)$ aur $g = \Omega(n)$ sach hain.

Dhyan do: bound **saare** bade n par chahiye, sirf kuch par nahi.

### 9. Growth compare karna

**Trick:** dono functions ka log lo, ya ratio ka limit dekho.
- $(\log n)^{10}$ vs $\sqrt n$: log lene par $10 \log\log n$ vs $\frac12 \log n$ → $\sqrt n$ jeetta hai. (Chhote n par ulta dikhta hai: n = 2¹⁶ par $(\log n)^{10} = 16^{10} \approx 10^{12}$ jabki $\sqrt n = 256$. Isliye chhote n se judge mat karo.)
- **Exponent me constants:** $2^{n+1} = 2 \cdot 2^n = O(2^n)$ (additive constant = sirf factor 2). Par $2^{2n} = 4^n$, aur $4^n / 2^n = 2^n \to \infty$, to $2^{2n} \ne O(2^n)$.
- **Identity:** $a^{\log_b n} = n^{\log_b a}$ (dono ka $\log_b$ = $\log_b a \cdot \log_b n$). Example: $3^{\log_2 n} = n^{\log_2 3} \approx n^{1.585}$.
- **Log ka base** sirf constant factor hai: $\log_2 n = \log_{10} n / \log_{10} 2$, to O(log n) me base nahi likhte.

Dhyan do: polylog < $n^{\varepsilon}$ < n < n log n < $n^{1+\varepsilon}$ < polynomial < $c^n$ < n! < $n^n$.

## Solved examples

**Example 1 (NAT, easy):** Sorted array me 1000 distinct elements. Binary search (har probe = 1 comparison) me kisi bhi key (present ya absent) ke liye maximum comparisons?

**Soch:** worst case binary search → $\lfloor \log_2 n \rfloor + 1$.

**Solution:**
1. $2^9 = 512 \le 1000 < 1024 = 2^{10}$ → $\lfloor \log_2 1000 \rfloor = 9$.
2. Max = 9 + 1 = **10**.

**Galti kahan hoti hai:** +1 bhoolna (9), ya $\lceil \log_2 1000 \rceil + 1 = 11$ likhna.

**Example 2 (MCQ, medium):** Upar wala `bs` (mid = (lo + hi) // 2) array a = [2, 5, 9, 14, 20, 27, 33, 40, 46, 51, 58, 63] par x = 51 ke liye chalta hai. Kaunse indices (order me) probe hote hain?
(A) [5, 8, 10, 9] (B) [6, 9] (C) [5, 8, 9] (D) [5, 8, 10, 11]

**Soch:** trace table banao, `//` neeche round karta hai.

**Solution:**

| lo | hi | mid | a[mid] | Faisla |
|---|---|---|---|---|
| 0 | 11 | 5 | 27 | < 51 → lo = 6 |
| 6 | 11 | 8 | 46 | < 51 → lo = 9 |
| 9 | 11 | 10 | 58 | > 51 → hi = 9 |
| 9 | 9 | 9 | 51 | found |

Answer **(A) [5, 8, 10, 9]**.

**Galti kahan hoti hai:** mid ko upar round karna: (0+11+1)//2 = 6 → 33 < 51 → lo = 7 → (7+11+1)//2 = 9 → found: (B). Ya `lo = mid` (bina +1) likh kar trace ko alag bana dena.

**Example 3 (NAT, medium):** Unsorted array of 30 distinct elements par linear search (left se). Probability 0.4 ki key absent hai; warna har position barabar likely. Expected comparisons?

**Soch:** mixture → $p\cdot n + (1-p)\frac{n+1}{2}$.

**Solution:**
1. Absent: 30 comparisons, probability 0.4 → 12.
2. Present: average (30 + 1)/2 = 15.5, probability 0.6 → 9.3.
3. Total = 12 + 9.3 = **21.3**.

**Galti kahan hoti hai:** present case me n/2 = 15 lena (→ 21.0), ya probability ulti laga dena (0.6·30 + 0.4·15.5 = 24.2).

**Example 4 (NAT, medium):** n = 50 ke liye `c += 1` kitni baar chalega?
```python
c = 0
i = n
while i >= 1:
    for j in range(i):
        c += 1
    i //= 2
```

**Soch:** halving outer, inner `range(i)` → i ki values jodo.

**Solution:**
1. i ki values: 50, 25, 12, 6, 3, 1 (phir 0, loop khatam). Har baar `//` neeche round.
2. c = 50 + 25 + 12 + 6 + 3 + 1 = **97**.
3. Order: geometric sum < 2n → Θ(n).

**Galti kahan hoti hai:** 25 // 2 ko 12.5 ya 13 lena, ya "outer log n, inner n → n log n" bol dena. Inner `range(i)` hai, `range(n)` nahi.

**Example 5 (NAT, medium):** n = 10 ke liye `c += 1` kitni baar?
```python
c = 0
for i in range(n):
    for j in range(i + 1, n):
        for k in range(j + 1, n):
            c += 1
```

**Soch:** i < j < k, sab 0..n−1 me → 3 alag numbers chunne ke tareeke.

**Solution:**
1. Har set {i, j, k} of 3 distinct indices ek hi baar, increasing order me gina jaata hai.
2. $\binom{10}{3} = \frac{10 \cdot 9 \cdot 8}{6} = 120$. Answer **120**.

**Galti kahan hoti hai:** $n^3/6 = 166.7$ ya $n^3 = 1000$ likh dena — wo sirf order hai, exact count nahi.

**Example 6 (MSQ, hard):** Kaunse statements true hain?
(A) $4^n = O(2^n)$
(B) $3^{\log_2 n} = n^{\log_2 3}$
(C) $(\log_2 n)^{20} = O(n^{0.1})$
(D) $n \log n = \Omega(n^{1.01})$

**Soch:** growth ladder, exponent constants, $a^{\log_b n}$ identity.

**Solution:**
1. (A) $4^n / 2^n = 2^n \to \infty$ → **false**.
2. (B) Dono ka $\log_2$: $\log_2 n \cdot \log_2 3$ = same → **true**.
3. (C) polylog < kisi bhi $n^{\varepsilon}$ → **true** (bahut bade n par).
4. (D) $n^{1.01} / (n\log n) = n^{0.01}/\log n \to \infty$, to $n\log n$ chhota hai → Ω **false**.
Answer **(B), (C)**.

**Galti kahan hoti hai:** (A) ko "4ⁿ aur 2ⁿ dono exponential hain" soch kar true kehna. Exponent ka multiplier (2n) order badal deta hai. (C) ko chhote n (jaise n = 1000) par check kar ke false bolna.

## Confusions clear karo

**Q:** Binary search me comparisons ⌊log₂ n⌋ + 1 hai ya ⌈log₂ n⌉?
**A:** `while lo <= hi` aur har probe ek comparison wale version me worst case $\lfloor \log_2 n \rfloor + 1$ hai. Ye $\lceil \log_2(n+1) \rceil$ ke barabar hai. Sirf $\lceil \log_2 n \rceil$ n = 8 par 3 deta hai, jabki sahi 4 hai.

**Q:** Θ(log n) me log ka base kyun nahi likhte?
**A:** $\log_a n = \log_b n / \log_b a$ — base badalne se sirf constant multiply hota hai, aur O/Θ constants ignore karte hain. Par exponent me base matter karta hai: $2^n$ aur $4^n$ alag hain.

**Q:** O aur Θ me farak? "Binary search O(n) hai" galat hai kya?
**A:** Technically sahi hai — O sirf upper bound hai, aur log n ≤ n. Par tight answer Θ(log n) hai. MCQ me "best describes" pooche to tight bound do.

**Q:** Do nested loops hamesha n² kyun nahi?
**A:** Agar inner variable double hota hai ya inner range outer ke saath chhoti hoti jaati hai, to count kam hota hai. Hamesha inner count likh kar sum karo.

**Q:** Chhote n par $(\log n)^{10}$, $\sqrt n$ se bada hai, phir bhi "chhota" kyun?
**A:** Asymptotic = n → ∞. Ek point ke baad $\sqrt n$ hamesha aage nikal jaata hai (lagbhag n ≈ 2¹⁴⁴ ke baad). Order sirf bahut bade n par decide hota hai.

**Q:** Linked list sorted ho to binary search ka time?
**A:** Comparisons log n ho sakte hain, par har mid tak chal kar pahunchna padta hai: n/2 + n/4 + … ≈ n steps → Θ(n). Linear search jitna hi.

## Khud try karo

**1.** Sorted array of 31 elements, binary search. Kitne keys exactly 5 comparisons me milte hain? Aur maximum comparisons?

<details><summary>Answer dekho</summary>

31 = $2^5 - 1$, perfect tree: levels 1..5 par 1, 2, 4, 8, 16 keys. Exactly 5 comparisons: **16** keys. Max = ⌊log₂ 31⌋ + 1 = 4 + 1 = **5**.

</details>

**2.** n = 8 ke liye `c += 1` kitni baar? Order kya hai?
```python
c = 0
for i in range(1, n + 1):
    j = 1
    while j <= i:
        c += 1
        j *= 2
```

<details><summary>Answer dekho</summary>

Har i ke liye inner = ⌊log₂ i⌋ + 1: i = 1..8 → 1, 2, 2, 3, 3, 3, 3, 4. Sum = **21**.
Order: $\sum_{i=1}^n (\lfloor \log_2 i \rfloor + 1) = \Theta(\log n!) = $ **Θ(n log n)**.

</details>

**3.** $f(n) = 2n^2 + 7n$. Smallest integer c jisse $f(n) \le c\,n^2$ for all n ≥ 5?

<details><summary>Answer dekho</summary>

$f/n^2 = 2 + 7/n$, jo n badhne par ghatta hai, to max n = 5 par: 2 + 1.4 = 3.4. Smallest integer c = **4**.

</details>

**4.** Increasing order me lagao: $f_1 = \sqrt n$, $f_2 = (\log n)^3$, $f_3 = n/\log n$, $f_4 = 2^{\log_2 n}$.

<details><summary>Answer dekho</summary>

$f_4 = n$. Order: $f_2 < f_1 < f_3 < f_4$ — polylog < $n^{0.5}$ < $n/\log n$ < n.

</details>

**5.** Array [5, 1, 9, 3, 7] (unsorted) par binary search (mid = (lo + hi) // 2) se 7 dhoondo. Milega?

<details><summary>Answer dekho</summary>

lo = 0, hi = 4, mid = 2 → 9 > 7 → hi = 1. mid = 0 → 5 < 7 → lo = 1. mid = 1 → 1 < 7 → lo = 2 > hi. **Absent** report hoga, jabki 7 index 4 par hai. Binary search ko sorted data chahiye.

</details>

## Ek page me

- Linear search: successful avg $\frac{n+1}{2}$, unsuccessful n; mixed = $p n + (1-p)\frac{n+1}{2}$.
- Binary search: sorted + O(1) indexing; mid = (lo + hi) // 2; `while lo <= hi`.
- Worst case $\lfloor \log_2 n \rfloor + 1$ comparisons (n = 100 → 7, n = 1000 → 10).
- $n = 2^k - 1$: $2^{j-1}$ keys need exactly j comparisons.
- Unsorted pe binary search key miss kar sakta hai; duplicates me leftmost guaranteed nahi; linked list pe Θ(n) time.
- Loops: inner count likho, phir sum; $\sum i = n(n+1)/2$; i < j < k → $\binom{n}{3}$.
- Doubling/halving → log; geometric sum = Θ(largest term) (outer doubling + inner `range(i)` = Θ(n)).
- $\sum n/i = \Theta(n\log n)$; $\log n! = \Theta(n\log n)$.
- O = upper (c, n₀, all n ≥ n₀), Ω = lower, Θ = dono; odd/even subsequence se Θ toot sakta hai.
- Ladder: 1 < log log n < log n < polylog < $n^{\varepsilon}$ < n < n log n < $n^{1+\varepsilon}$ < $n^k$ < $c^n$ < n! < $n^n$.
- $2^{n+1} = O(2^n)$, par $2^{2n} \ne O(2^n)$; $a^{\log_b n} = n^{\log_b a}$.

Revision ke liye **Short note** tab dekho.
