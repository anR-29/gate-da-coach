# Sorting and divide and conquer

> **Time:** ~40 min · **Pehle aana chahiye:** Python loops aur swap, $\log_2$, recursion ka basic idea · **Day:** 32, 33, 35

## Ye topic kyun?

Sorting sabse zyada poocha jaane wala algorithm topic hai, kyunki ek hi array par bahut kuch poocha ja sakta hai: "k passes ke baad array kaisa dikhega?", "kitne swaps/comparisons?", "kaunsa algorithm stable hai?", "best/worst case kab?". Saath me **divide and conquer** — merge sort aur quicksort — aur unke recurrences ($T(n) = aT(n/b) + f(n)$) ko solve karna. GATE DA me ye 1–2 mark ke MCQ (array after k passes), NAT (counts) aur MSQ (properties) ke roop me aate hain.

## Picture se samjho

Socho tumhare haath me taash ke patte hain aur unhe chhote se bade order me lagana hai. Teen desi tareeke:
- **Selection:** poore haath me sabse chhota patta dhoondo, use sabse aage rakh do. Phir baaki me sabse chhota, use doosri jagah. (Har pass = ek "chunaav".)
- **Insertion:** baayein hissa already sorted hai; agla patta uthao aur sorted hisse me sahi jagah **khiska kar** daal do.
- **Bubble:** padosi pairs compare karo, ulte hon to badal do. Ek round me sabse bada patta bulbule ki tarah right end tak tair jaata hai.

Neeche bubble sort ke passes [5, 2, 8, 1, 9, 3] par:

<figure class="fig">
<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg">
<text x="10" y="42" style="fill:var(--muted)">start</text>
<rect x="110" y="20" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="135" y="42" text-anchor="middle" style="fill:currentColor">5</text>
<rect x="160" y="20" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="185" y="42" text-anchor="middle" style="fill:currentColor">2</text>
<rect x="210" y="20" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="235" y="42" text-anchor="middle" style="fill:currentColor">8</text>
<rect x="260" y="20" width="50" height="34" style="fill:var(--info);fill-opacity:0.2;stroke:var(--info)"/>
<text x="285" y="42" text-anchor="middle" style="fill:currentColor">1</text>
<rect x="310" y="20" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="335" y="42" text-anchor="middle" style="fill:currentColor">9</text>
<rect x="360" y="20" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="385" y="42" text-anchor="middle" style="fill:currentColor">3</text>
<text x="10" y="87" style="fill:var(--muted)">pass 1</text>
<rect x="110" y="65" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="135" y="87" text-anchor="middle" style="fill:currentColor">2</text>
<rect x="160" y="65" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="185" y="87" text-anchor="middle" style="fill:currentColor">5</text>
<rect x="210" y="65" width="50" height="34" style="fill:var(--info);fill-opacity:0.2;stroke:var(--info)"/>
<text x="235" y="87" text-anchor="middle" style="fill:currentColor">1</text>
<rect x="260" y="65" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="285" y="87" text-anchor="middle" style="fill:currentColor">8</text>
<rect x="310" y="65" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="335" y="87" text-anchor="middle" style="fill:currentColor">3</text>
<rect x="360" y="65" width="50" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="385" y="87" text-anchor="middle" style="fill:currentColor">9</text>
<text x="420" y="87" style="fill:var(--info)">9 parked</text>
<text x="10" y="132" style="fill:var(--muted)">pass 2</text>
<rect x="110" y="110" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="135" y="132" text-anchor="middle" style="fill:currentColor">2</text>
<rect x="160" y="110" width="50" height="34" style="fill:var(--info);fill-opacity:0.2;stroke:var(--info)"/>
<text x="185" y="132" text-anchor="middle" style="fill:currentColor">1</text>
<rect x="210" y="110" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="235" y="132" text-anchor="middle" style="fill:currentColor">5</text>
<rect x="260" y="110" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="285" y="132" text-anchor="middle" style="fill:currentColor">3</text>
<rect x="310" y="110" width="50" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="335" y="132" text-anchor="middle" style="fill:currentColor">8</text>
<rect x="360" y="110" width="50" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="385" y="132" text-anchor="middle" style="fill:currentColor">9</text>
<text x="420" y="132" style="fill:var(--info)">8 parked</text>
<text x="10" y="177" style="fill:var(--muted)">pass 3</text>
<rect x="110" y="155" width="50" height="34" style="fill:var(--info);fill-opacity:0.2;stroke:var(--info)"/>
<text x="135" y="177" text-anchor="middle" style="fill:currentColor">1</text>
<rect x="160" y="155" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="185" y="177" text-anchor="middle" style="fill:currentColor">2</text>
<rect x="210" y="155" width="50" height="34" style="fill:none;stroke:currentColor"/>
<text x="235" y="177" text-anchor="middle" style="fill:currentColor">3</text>
<rect x="260" y="155" width="50" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="285" y="177" text-anchor="middle" style="fill:currentColor">5</text>
<rect x="310" y="155" width="50" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="335" y="177" text-anchor="middle" style="fill:currentColor">8</text>
<rect x="360" y="155" width="50" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="385" y="177" text-anchor="middle" style="fill:currentColor">9</text>
<text x="420" y="177" style="fill:var(--info)">5 parked</text>
</svg>
<figcaption>Bubble sort: har pass sabse bade bache hue element ko end par park karta hai (green). Chhota element 1 (blue) har pass me sirf ek kadam left khiskta hai.</figcaption>
</figure>

Notice karo do asymmetry: bada element (9) ek hi pass me poora right tak chala gaya, par chhota element (1) har pass me sirf ek slot left aaya. Isliye bubble sort ke passes us element par depend karte hain jise sabse zyada **left** jaana hai. Pass 3 ke baad array sorted hai, par flag wala bubble sort ek aur (pass 4) chalayega jisme koi swap nahi hoga — tabhi use pata chalta hai ki kaam khatam.

Doosri badi idea: **divide and conquer**. Bade problem ko chhote tukdon me todo, har tukda solve karo, phir jod do. Merge sort array ko aadha-aadha karta hai jab tak 1-1 element na bache, phir sorted tukdon ko "merge" karta hai:

<figure class="fig">
<svg viewBox="0 0 540 200" xmlns="http://www.w3.org/2000/svg">
<text x="10" y="42" style="fill:var(--muted)">start</text>
<rect x="80" y="20" width="336" height="34" style="fill:none;stroke:currentColor"/>
<text x="248" y="42" text-anchor="middle" style="fill:currentColor">6 | 3 | 8 | 1 | 7 | 2 | 5 | 4</text>
<text x="10" y="87" style="fill:var(--muted)">size 2</text>
<rect x="80" y="65" width="84" height="34" style="fill:var(--info);fill-opacity:0.2;stroke:var(--info)"/>
<text x="122" y="87" text-anchor="middle" style="fill:currentColor">3 6</text>
<rect x="164" y="65" width="84" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="206" y="87" text-anchor="middle" style="fill:currentColor">1 8</text>
<rect x="248" y="65" width="84" height="34" style="fill:var(--info);fill-opacity:0.2;stroke:var(--info)"/>
<text x="290" y="87" text-anchor="middle" style="fill:currentColor">2 7</text>
<rect x="332" y="65" width="84" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="374" y="87" text-anchor="middle" style="fill:currentColor">4 5</text>
<text x="426" y="87" style="fill:var(--info)">1+1+1+1 = 4</text>
<text x="10" y="132" style="fill:var(--muted)">size 4</text>
<rect x="80" y="110" width="168" height="34" style="fill:var(--info);fill-opacity:0.2;stroke:var(--info)"/>
<text x="164" y="132" text-anchor="middle" style="fill:currentColor">1 3 6 8</text>
<rect x="248" y="110" width="168" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="332" y="132" text-anchor="middle" style="fill:currentColor">2 4 5 7</text>
<text x="426" y="132" style="fill:var(--info)">3 + 3 = 6</text>
<text x="10" y="177" style="fill:var(--muted)">size 8</text>
<rect x="80" y="155" width="336" height="34" style="fill:var(--mark);fill-opacity:0.3;stroke:currentColor"/>
<text x="248" y="177" text-anchor="middle" style="fill:currentColor">1 2 3 4 5 6 7 8</text>
<text x="426" y="177" style="fill:var(--info)">7</text>
</svg>
<figcaption>Merge sort on 8 keys: 3 levels of merging (log₂ 8 = 3). Right me har level ke comparisons: 4 + 6 + 7 = 17.</figcaption>
</figure>

Har level par kul mila kar n elements copy hote hain, aur levels $\log_2 n$ hain — isliye merge sort hamesha $\Theta(n \log n)$.

## Concept step-by-step

### 1. Inversion: "kitna ulta hai" ka naap

**Definition:** pair (i, j) jahan i < j par $a_i > a_j$ — yaani galat order wala pair.

**Example:** [5, 2, 8, 1, 9, 3] me inversions: (5,2), (5,1), (5,3), (2,1), (8,1), (8,3), (9,3) = **7**.

- Sorted array: 0 inversions. Reversed array: har pair ulta → $\binom{n}{2} = \frac{n(n-1)}{2}$.

**Kyun important?** Ek **adjacent swap** (padosi badalna) exactly ek inversion hatata hai. Isliye bubble sort ke swaps = insertion sort ke shifts = inversions.

Dhyan do: inversions gin-ne ke liye har element ke liye "mere right me kitne chhote hain" gino aur jodo: 5 → 3, 2 → 1, 8 → 2, 1 → 0, 9 → 1, total 7.

### 2. Selection sort

```python
for i in range(n - 1):            # pass i+1
    m = i
    for j in range(i + 1, n):
        if a[j] < a[m]:
            m = j
    a[i], a[m] = a[m], a[i]       # swap line har pass chalti hai
```

**Trace on [5, 2, 8, 1, 9, 3]:**

| Pass | min of a[i:] | Array after pass |
|---|---|---|
| 1 | 1 (index 3) ↔ 5 | [1, 2, 8, 5, 9, 3] |
| 2 | 2 already at index 1 (self-swap) | [1, 2, 8, 5, 9, 3] |
| 3 | 3 ↔ 8 | [1, 2, 3, 5, 9, 8] |
| 4 | 5 already in place (self-swap) | [1, 2, 3, 5, 9, 8] |
| 5 | 8 ↔ 9 | [1, 2, 3, 5, 8, 9] |

**Counts:**
- Comparisons hamesha $(n-1) + (n-2) + \dots + 1 = \frac{n(n-1)}{2}$ — input kaisa bhi ho (n = 6 → 15). Isliye best case bhi Θ(n²).
- Swap line n − 1 baar chalti hai (5), par "real" swaps (m ≠ i) sirf 3.

**Unstable:** records (2,a), (2,b), (1,c). Pass 1: 1 ko aage laane ke liye (2,a) ↔ (1,c) → (1,c), (2,b), (2,a). Do 2 wale records ka order ulat gaya. Long-distance swap stability todta hai.

Dhyan do: jis pass me minimum already sahi jagah hai, wo bhi **ek pass** hai — gin-na mat chhodo.

### 3. Insertion sort

```python
for i in range(1, n):             # pass i inserts a[i]
    key, j = a[i], i - 1
    while j >= 0 and a[j] > key:
        a[j + 1] = a[j]            # shift right
        j -= 1
    a[j + 1] = key
```

**Trace on [5, 2, 8, 1, 9, 3]:**

| Pass | key | Shifts | Array after pass |
|---|---|---|---|
| 1 | 2 | 1 (5) | [2, 5, 8, 1, 9, 3] |
| 2 | 8 | 0 | [2, 5, 8, 1, 9, 3] |
| 3 | 1 | 3 (8, 5, 2) | [1, 2, 5, 8, 9, 3] |
| 4 | 9 | 0 | [1, 2, 5, 8, 9, 3] |
| 5 | 3 | 3 (9, 8, 5) | [1, 2, 3, 5, 8, 9] |

**Counts:**
- Shifts = inversions = 1 + 3 + 3 = 7. (Har shift ek inversion theek karta hai: key apne se bade, left wale element ke paar jaata hai.)
- Comparisons `a[j] > key` = shifts + (un passes ki ginti jinme key index 0 tak **nahi** pahunchi, kyunki wahan ek failing comparison hota hai). Passes 2, 4, 5 me key beech me ruki → 3 extra. Total 7 + 3 = **10**. Passes 1 aur 3 me key index 0 tak gayi — wahan `j >= 0` false hua, `a[j] > key` evaluate hi nahi hua.
- Time Θ(n + I) jahan I = inversions. Sorted input → n − 1 comparisons, **Θ(n)** (best). Reversed → $\frac{n(n-1)}{2}$ comparisons, Θ(n²).
- **Stable:** strict `>` hai, to equal key ke paar kabhi nahi jaata.

Dhyan do: har pass me "+1 failing comparison" mat jodo; jo key index 0 tak pahunchi, uska failing comparison nahi hota.

### 4. Bubble sort (early-exit flag ke saath)

```python
for p in range(n - 1):
    swapped = False
    for j in range(n - 1 - p):
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]
            swapped = True
    if not swapped:
        break
```

Figure 1 me trace dekho. Pass p ke baad last p positions final hain.

**Counts on [5, 2, 8, 1, 9, 3]:**
- Swaps = inversions = 7.
- Passes: sorted pass 3 par hua, par pass 4 (clean pass, 2 comparisons) chal kar hi break hota hai → 4 passes.
- Comparisons = 5 + 4 + 3 + 2 = **14**.

**Passes ka shortcut:** passes = (kisi element ko sabse zyada kitne slots **left** jaana hai) + 1, par n − 1 se zyada nahi. Yahan 1 ko index 3 → 0 (3 slots) jaana hai → 3 + 1 = 4 ✓.
- [5, 1, 2, 3, 4]: 5 right jaata hai (ek pass me), baaki sirf 1 slot left → 2 passes.
- [2, 3, 4, 5, 1]: 1 ko 4 slots left → 5, par limit n − 1 = 4 → 4 passes.

**Best case:** sorted input → ek clean pass → Θ(n). **Stable:** sirf strict `>` par swap.

Dhyan do: last wala no-swap pass bhi gino (jab tak loop limit pehle khatam na ho).

### 5. Merge step aur merge sort

**Merge:** do sorted runs x (size m) aur y (size n). Dono ke front compare karo, chhota output me daalo. Jab ek run khaali ho jaaye, **comparisons band** — doosre ka bacha hissa seedha copy.

**Example:** [2, 9, 14, 20] + [5, 7, 11]:
1. 2 vs 5 → 2. 2. 9 vs 5 → 5. 3. 9 vs 7 → 7. 4. 9 vs 11 → 9. 5. 14 vs 11 → 11. Ab y khaali → 14, 20 copy.
**5 comparisons.**

**Range:** min(m, n) (ek run poora pehle khatam, jaise [1,2] + [5,6,7] → 2) se lekar m + n − 1 (dono aakhir tak interleave) tak.

**Merge sort:** $T(n) = 2T(n/2) + \Theta(n)$ = Θ(n log n) — **har input par**, sorted par bhi (copying har level par n hai). Extra space Θ(n) (merge buffer). Stable agar tie par left run se lo (`<=`).

**Worst-case comparisons, n = $2^k$:** level j par $2^{k-j}$ merges, har ek ≤ $2^j - 1$ → sum $= n\log_2 n - n + 1$. n = 8 → 24 − 8 + 1 = **17** (figure 2 wala array exactly ye worst case hai). Sorted [1..8] par sirf 4·1 + 2·2 + 1·4 = 12.

**Bottom-up:** pass 1 size-1 runs ko jodta hai (size 2 banate hain), pass 2 size-2 runs ko, … pass k size $2^{k-1}$ runs ko merge karta hai.

Dhyan do: har merge ke liye m + n − 1 mat lagao — actual trace karo, run khaali hote hi ruk jao.

### 6. Lomuto partition aur quicksort

```python
def partition(a, lo, hi):
    pivot = a[hi]
    i = lo - 1                      # a[lo..i] = "<= pivot" region
    for j in range(lo, hi):
        if a[j] <= pivot:
            i += 1
            a[i], a[j] = a[j], a[i]  # self-swap jab i == j
    a[i + 1], a[hi] = a[hi], a[i + 1]
    return i + 1
```

<figure class="fig">
<svg viewBox="0 0 520 130" xmlns="http://www.w3.org/2000/svg">
<rect x="60" y="50" width="56" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="88" y="72" text-anchor="middle" style="fill:currentColor">9</text>
<rect x="116" y="50" width="56" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="144" y="72" text-anchor="middle" style="fill:currentColor">4</text>
<rect x="172" y="50" width="56" height="34" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<text x="200" y="72" text-anchor="middle" style="fill:currentColor">7</text>
<rect x="228" y="50" width="56" height="34" style="fill:var(--bad);fill-opacity:0.2;stroke:var(--bad)"/>
<text x="256" y="72" text-anchor="middle" style="fill:currentColor">12</text>
<rect x="284" y="50" width="56" height="34" style="fill:var(--bad);fill-opacity:0.2;stroke:var(--bad)"/>
<text x="312" y="72" text-anchor="middle" style="fill:currentColor">15</text>
<rect x="340" y="50" width="56" height="34" style="fill:none;stroke:var(--muted);stroke-dasharray:4 3"/>
<text x="368" y="72" text-anchor="middle" style="fill:currentColor">3</text>
<rect x="396" y="50" width="56" height="34" style="fill:var(--mark);fill-opacity:0.3;stroke:currentColor"/>
<text x="424" y="72" text-anchor="middle" style="fill:currentColor">10</text>
<text x="200" y="38" text-anchor="middle" style="fill:var(--good)">i = 2</text>
<text x="368" y="38" text-anchor="middle" style="fill:var(--muted)">j = 5</text>
<text x="144" y="104" text-anchor="middle" style="fill:var(--good)">≤ pivot</text>
<text x="284" y="104" text-anchor="middle" style="fill:var(--bad)">&gt; pivot</text>
<text x="368" y="104" text-anchor="middle" style="fill:var(--muted)">abhi baaki</text>
<text x="424" y="104" text-anchor="middle" style="fill:currentColor">pivot</text>
</svg>
<figcaption>Lomuto partition ke beech ki photo (pivot 10): green = ≤ pivot, red = &gt; pivot, dashed = abhi scan nahi hua.</figcaption>
</figure>

Loop hamesha teen hisse banaye rakhta hai: [lo..i] ≤ pivot, [i+1..j−1] > pivot, [j..hi−1] baaki. Jab a[j] ≤ pivot milta hai, i ek badhta hai aur a[j] ko red region ke pehle element se swap kar dete hain — green region ek badh jaata hai.

**Full trace:** a = [9, 4, 12, 7, 15, 3, 10], pivot 10.

| j | a[j] | ≤ 10? | i | Swap | Array |
|---|---|---|---|---|---|
| 0 | 9 | yes | 0 | a[0]↔a[0] (self) | [9, 4, 12, 7, 15, 3, 10] |
| 1 | 4 | yes | 1 | self | same |
| 2 | 12 | no | 1 | – | same |
| 3 | 7 | yes | 2 | a[2]↔a[3] | [9, 4, 7, 12, 15, 3, 10] |
| 4 | 15 | no | 2 | – | same |
| 5 | 3 | yes | 3 | a[3]↔a[5] | [9, 4, 7, 3, 15, 12, 10] |
| end | | | | a[4]↔a[6] | [9, 4, 7, 3, **10**, 12, 15] |

Return 4. Comparisons = 6 = k − 1 (k = 7 items). Swap statements = 4 (line 1, 2 self) + 1 (final) = 5.

**Quicksort ka cost:** partition of k items → k − 1 comparisons.
- Balanced splits → $T(n) = 2T(n/2) + n$ = Θ(n log n). Koi bhi constant ratio (jaise 1 : 9) → depth $\log_{10/9} n$, har level ≤ n → still Θ(n log n).
- **Worst:** sorted, reversed, ya all-equal input (end pivot) → har baar n − 1 : 0 split → $T(n) = T(n-1) + (n-1)$ = $\frac{n(n-1)}{2}$ = Θ(n²). (All-equal me har element `<= pivot` hai, to sab left me.)
- Quicksort unstable hai (long swaps).

**Ek partition step ka valid result:** koi key x aisi honi chahiye jiske left me sab chhote aur right me sab bade hon. Example: [3, 1, 2, 4, 8, 6, 5, 7] — 4 aisi key hai ✓.

Dhyan do: sorted input quicksort (end pivot) ka **worst** case hai, best nahi.

### 7. Recurrences aur master theorem

Divide and conquer ka time: $T(n) = a\,T(n/b) + f(n)$ — a subproblems, har ek size n/b, aur todne/jodne ka kaam f(n).

**Recursion tree se samjho:** level j par $a^j$ nodes, har ek ka kaam $f(n/b^j)$. Leaves ki ginti $a^{\log_b n} = n^{\log_b a}$. To compare karo **f(n) vs $n^{\log_b a}$**:
1. f chhota (polynomially) → leaves dominate → $\Theta(n^{\log_b a})$.
2. Barabar ($f = \Theta(n^{\log_b a})$) → har level same kaam, $\log n$ levels → $\Theta(n^{\log_b a}\log n)$. (Agar $f = n^{\log_b a}\log^k n$ → $\Theta(n^{\log_b a}\log^{k+1} n)$.)
3. f bada (aur regular) → root dominate → $\Theta(f(n))$.

| Recurrence | $n^{\log_b a}$ | Case | Answer |
|---|---|---|---|
| $2T(n/2) + n$ | n | equal | n log n |
| $3T(n/2) + n$ | $n^{1.585}$ | f chhota | $n^{\log_2 3}$ |
| $4T(n/2) + n^2$ | $n^2$ | equal | $n^2 \log n$ |
| $7T(n/2) + n^2$ | $n^{2.807}$ | f chhota | $n^{\log_2 7}$ (Strassen) |
| $2T(n/2) + n^2$ | n | f bada | $n^2$ |
| $T(n/2) + 1$ | 1 | equal | log n (binary search) |
| $2T(n/2) + 1$ | n | f chhota | n |

**Master theorem se bahar wale:**
- $T(n) = T(n-1) + n$ → $n + (n-1) + \dots + 1$ = Θ(n²).
- $T(n) = T(\sqrt n) + 1$: $n = 2^m$ rakho, $S(m) = T(2^m)$ → $S(m) = S(m/2) + 1$ = Θ(log m) = **Θ(log log n)**.
- $T(n) = T(n/3) + T(2n/3) + n$: har level ≤ n kaam, depth $\log_{3/2} n$ → Θ(n log n).

**Calls gin-na:** `f(n) = f(n//2) + f(n//2) + n`, f(16): calls C(n) = 1 + 2C(n/2), C(1) = 1 → C(16) = 31 = 2n − 1. Value V(n) = 2V(n/2) + n, V(1) = 1 → V(16) = 16·log₂16 + 16 = 80.

Dhyan do: exponent $\log_b a$ hai, $a/b$ nahi ($3T(n/2)$ me 1.585, 1.5 nahi). Tie case me extra log mat bhoolo.

### 8. Ek table me sab

| Algorithm | Best | Worst | Stable | Yaad rakho |
|---|---|---|---|---|
| Selection | n² | n² | No | n(n−1)/2 comparisons hamesha; ≤ n−1 real swaps |
| Insertion | n | n² | Yes | shifts = inversions; Θ(n + I) |
| Bubble (flag) | n | n² | Yes | swaps = inversions |
| Merge | n log n | n log n | Yes | Θ(n) extra space |
| Quick (end pivot) | n log n | n² | No | sorted/reversed/equal → n² |

## Solved examples

**Example 1 (MCQ, easy):** Ek ascending sort [4, 7, 1, 9, 3, 6, 2] par chala. 2 passes ke baad array [1, 4, 7, 9, 3, 6, 2] hai. Kaunsa algorithm?
(A) Selection (B) Insertion (C) Bubble (D) Bottom-up merge sort

**Soch:** har algorithm ke 2 passes ka "signature" pehchano.

**Solution:**
1. Selection 2 passes: 1 aur 2 aage → [1, 2, 4, 9, 3, 6, 7]. ✗
2. Insertion: pass 1 inserts 7 (no shift) → [4, 7, …]; pass 2 inserts 1 → [1, 4, 7, 9, 3, 6, 2]. ✓
3. Bubble 2 passes: 9 aur 7 end par → [1, 4, 3, 6, 2, 7, 9]. ✗
4. Bottom-up merge 2 passes: [1, 4, 7, 9, 2, 3, 6]. ✗
Answer **(B)**. Signature: pehle 3 sorted, baaki **bilkul untouched**.

**Galti kahan hoti hai:** "aage 1 aaya to selection" — par selection 2 passes me 2 ko bhi index 1 par laata.

**Example 2 (NAT, medium):** Insertion sort (upar wala code) [4, 7, 1, 9, 3, 6, 2] par. `a[j] > key` kitni baar evaluate hota hai?

**Soch:** comparisons = shifts + (passes jinme key index 0 tak nahi gayi).

**Solution:**

| Pass | key | Shifts | Key index 0 tak gayi? | Comparisons |
|---|---|---|---|---|
| 1 | 7 | 0 | nahi | 1 |
| 2 | 1 | 2 | haan | 2 |
| 3 | 9 | 0 | nahi | 1 |
| 4 | 3 | 3 | nahi (1 par ruki) | 4 |
| 5 | 6 | 2 | nahi | 3 |
| 6 | 2 | 5 | nahi (1 par ruki) | 6 |

Shifts = 12 (= inversions), comparisons = 1 + 2 + 1 + 4 + 3 + 6 = **17**.

**Galti kahan hoti hai:** har pass me +1 jodna → 12 + 6 = 18. Pass 2 me 1 index 0 tak gaya, wahan `j >= 0` false hone se comparison nahi hua.

**Example 3 (NAT, easy):** Sorted lists [2, 9, 14, 20] aur [5, 7, 11] ko standard merge se jodo. Kitne comparisons?

**Soch:** merge → ek run khaali hote hi ruko.

**Solution:** 2<5, 5<9, 7<9, 9<11, 11<14 → doosri list khaali. **5**.

**Galti kahan hoti hai:** m + n − 1 = 6 likh dena; wo sirf worst case hai.

**Example 4 (MCQ, medium):** Lomuto `partition(a, 0, 6)` on a = [9, 4, 12, 7, 15, 3, 10]. Baad me a?
(A) [9, 4, 7, 3, 10, 12, 15] (B) [3, 4, 7, 9, 10, 12, 15] (C) [9, 4, 7, 3, 10, 15, 12] (D) [4, 9, 7, 3, 10, 12, 15]

**Soch:** step 6 wala trace.

**Solution:** Trace (upar table) → i = 3 par loop khatam, final swap a[4] ↔ a[6]: [9, 4, 7, 3, 10, 12, 15]. Answer **(A)**.

**Galti kahan hoti hai:** (B) maan leta hai ki partition poora sort kar deta hai. (C) final swap bhool jaata hai ya galat jagah karta hai: last swap se pehle array [9, 4, 7, 3, 15, 12, 10] tha; 10 ↔ 15 se right side 12, 15 banta hai.

**Example 5 (NAT, medium):** Quicksort (Lomuto, pivot = last) [1, 2, 3, 4, 5, 6] sort karta hai. Total `a[j] <= pivot` comparisons?

**Soch:** sorted input → har partition n − 1 : 0.

**Solution:**
1. Pivot 6: 5 comparisons, sab ≤ → left part [1..5], right khaali.
2. Phir 4, 3, 2, 1 comparisons.
3. Total 5 + 4 + 3 + 2 + 1 = **15** = n(n−1)/2.

**Galti kahan hoti hai:** "quicksort n log n" soch kar 6 log₂ 6 ≈ 15.5 jaisa approximate answer dena — yahan exact worst case hai. (Coincidence se paas hai, par n = 9 par 36 vs 28.5 — farak saaf.)

**Example 6 (MSQ, hard):** Kin recurrences ka solution Θ(n²) hai?
(A) $T(n) = 4T(n/2) + n$
(B) $T(n) = 2T(n/2) + n^2$
(C) $T(n) = T(n-1) + 1$
(D) $T(n) = 4T(n/2) + n^2$

**Soch:** master theorem: f vs $n^{\log_b a}$.

**Solution:**
1. (A) $n^{\log_2 4} = n^2$, f = n chhota → Θ(n²). ✓
2. (B) $n^{\log_2 2} = n$, f = n² bada → Θ(n²). ✓
3. (C) 1 + 1 + … n baar → Θ(n). ✗
4. (D) $n^2$ vs $n^2$ barabar → Θ(n² log n). ✗
Answer **(A), (B)**.

**Galti kahan hoti hai:** (D) me tie case ka extra log bhoolna. (A) me $a/b = 2$ lekar $n^2$ ki jagah "n vs n → n log n" bolna.

## Confusions clear karo

**Q:** "Pass" ka matlab har algorithm me kya hai?
**A:** Outer loop ki ek iteration. Selection: ek minimum chuna aur swap. Insertion: ek key insert hui. Bubble: ek left-to-right sweep. Bottom-up merge: ek size ke saare runs merge.

**Q:** Swaps aur comparisons me farak kyun padta hai?
**A:** Comparison = `if` check; swap = sach me jagah badalna. Selection me comparisons hamesha n(n−1)/2 par swaps ≤ n − 1. Bubble me swaps = inversions, par comparisons loop bounds par depend karte hain.

**Q:** Stable ka matlab?
**A:** Equal keys ka input order output me bana rahe. Jaise students ko marks se sort kiya aur pehle naam se sorted the — stable sort me same marks wale naam ke order me hi rahenge.

**Q:** Merge sort sorted input par fast kyun nahi?
**A:** Wo input dekh kar shortcut nahi leta — har level par split aur copy karta hai. Comparisons kam hote hain (min wala case) par copying Θ(n) per level → still Θ(n log n).

**Q:** Quicksort ka average n log n hai to log use kyun karte hain, jab worst n² hai?
**A:** Random pivot ke saath worst case bahut kam hota hai, aur quicksort in-place hai (merge ki tarah Θ(n) extra memory nahi). Par exam me "sorted input, end pivot" = Θ(n²) yaad rakho.

**Q:** Master theorem me $\log_b a$ kyun?
**A:** Recursion tree me leaves = $a^{\text{depth}}$ = $a^{\log_b n}$ = $n^{\log_b a}$. Ye leaves ka total kaam hai, jise f(n) (root ka kaam) se compare karte hain.

## Khud try karo

**1.** Selection sort [4, 7, 1, 9, 3, 6, 2] par: kitne comparisons, aur kitne real swaps (m ≠ i)?

<details><summary>Answer dekho</summary>

Comparisons = 6·7/2 = **21**. Passes: 1↔4, 2↔7, 3↔4, 4↔9, 6↔9, 7↔9 — har pass me minimum galat jagah tha → **6** real swaps.

</details>

**2.** Early-exit bubble sort: [5, 1, 2, 3, 4] aur [2, 3, 4, 5, 1] par kitne passes?

<details><summary>Answer dekho</summary>

[5, 1, 2, 3, 4]: pass 1 me 5 end tak, array sorted; pass 2 clean → **2**.
[2, 3, 4, 5, 1]: 1 ko 4 slots left jaana hai, har pass 1 slot → 4 passes chahiye, aur loop limit bhi n − 1 = 4 hai → **4** (5th clean pass ki naubat hi nahi).

</details>

**3.** Neeche ka code: `f(16)` ki value aur kul calls?
```python
def f(n):
    if n <= 1:
        return 1
    return f(n // 2) + f(n // 2) + n
```

<details><summary>Answer dekho</summary>

Calls: C(n) = 1 + 2C(n/2), C(1) = 1 → C(2) = 3, C(4) = 7, C(8) = 15, C(16) = **31**.
Value: V(1) = 1, V(2) = 2 + 2 = 4, V(4) = 8 + 4 = 12, V(8) = 24 + 8 = 32, V(16) = 64 + 16 = **80**.

</details>

**4.** Solve: (a) $9T(n/3) + n$ (b) $8T(n/2) + n^2$ (c) $3T(n/3) + n$.

<details><summary>Answer dekho</summary>

(a) $n^{\log_3 9} = n^2$ > n → **Θ(n²)**.
(b) $n^{\log_2 8} = n^3$ > n² → **Θ(n³)**.
(c) $n^{\log_3 3} = n$ = f → **Θ(n log n)**.

</details>

**5.** Top-down merge sort already sorted [1, 2, …, 8] par total comparisons?

<details><summary>Answer dekho</summary>

Har merge me left run pehle khatam hota hai → comparisons = left run ka size. Size-1 merges: 4 × 1 = 4; size-2: 2 × 2 = 4; size-4: 1 × 4 = 4. Total **12** (worst 17 se kam, par order still n log n).

</details>

## Ek page me

- Inversion = galat order wala pair; reversed array me n(n−1)/2.
- Bubble swaps = insertion shifts = inversions.
- Selection: pass i me a[i:] ka min slot i par; n(n−1)/2 comparisons hamesha; unstable; self-swap pass bhi pass hai.
- Insertion: Θ(n + I); comparisons = shifts + (passes jahan key index 0 se pehle ruki); sorted → Θ(n); stable.
- Bubble: pass p p-th largest park karta hai; chhote elements 1 slot/pass; passes = max left distance + 1 (≤ n − 1); clean pass gino.
- Merge of m, n: min(m, n) se m + n − 1 comparisons; merge sort Θ(n log n) hamesha; worst $n\log_2 n - n + 1$; Θ(n) space; stable.
- Lomuto: i = lo − 1; a[j] ≤ pivot → i++ and swap; end me a[i+1] ↔ a[hi]; k items → k − 1 comparisons.
- Quicksort: sorted/reversed/all-equal (end pivot) → Θ(n²); constant ratio split → Θ(n log n).
- Master: f vs $n^{\log_b a}$ — chhota → $n^{\log_b a}$; barabar → × log n; bada → f(n).
- T(n−1)+n = n²; T(√n)+1 = log log n; T(n/2)+1 = log n; 2T(n/2)+1 = n.

Revision ke liye **Short note** tab dekho.
