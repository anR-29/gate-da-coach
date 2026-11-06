# Lists, tuples, sets, dicts and program tracing

> **Time:** ~40 min · **Pehle aana chahiye:** Python basics (slicing, loops, truthiness) aur functions (Day 25–26 wale lessons) · **Day:** 27

## Ye topic kyun?
Data science ka almost har program list, dict aur set par chalta hai: rows ki list, word-count ka dict, unique values ka set. GATE DA me yahan se "output kya hoga" wale MCQ/NAT (1–2 marks) aate hain jo ek hi baat test karte hain: **naam aur object me farak** samajhte ho ya nahi (alias vs copy), loop ke beech list badalne par kya hota hai, dict/set ke rules, comprehension ka order, `sorted` ki key, aur ek multi-step program ko line-by-line trace karna.

## Picture se samjho
Sabse important picture: **Python me variable ek "label" (naam ki parchi) hai jo kisi object par chipki hai; variable khud dabba nahi hai.** `b = a` likhne se nayi list nahi banti — bas usi list par ek aur parchi chipak jaati hai.

<figure class="fig">
<svg viewBox="0 0 360 140" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="pyc-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<rect x="20" y="15" width="34" height="24" fill="none" style="stroke:var(--info)"/>
<rect x="20" y="55" width="34" height="24" fill="none" style="stroke:var(--info)"/>
<rect x="20" y="100" width="34" height="24" fill="none" style="stroke:var(--info)"/>
<text x="33" y="32" font-size="13" fill="currentColor">a</text>
<text x="33" y="72" font-size="13" fill="currentColor">b</text>
<text x="33" y="117" font-size="13" fill="currentColor">c</text>
<rect x="170" y="25" width="150" height="34" fill="none" stroke="currentColor"/>
<line x1="207" y1="25" x2="207" y2="59" stroke="currentColor"/>
<line x1="245" y1="25" x2="245" y2="59" stroke="currentColor"/>
<line x1="282" y1="25" x2="282" y2="59" stroke="currentColor"/>
<text x="184" y="47" font-size="13" fill="currentColor">1</text>
<text x="221" y="47" font-size="13" fill="currentColor">2</text>
<text x="259" y="47" font-size="13" fill="currentColor">3</text>
<text x="296" y="47" font-size="13" style="fill:var(--bad)">4</text>
<rect x="170" y="95" width="112" height="34" fill="none" style="stroke:var(--good)"/>
<line x1="207" y1="95" x2="207" y2="129" style="stroke:var(--good)"/>
<line x1="245" y1="95" x2="245" y2="129" style="stroke:var(--good)"/>
<text x="184" y="117" font-size="13" fill="currentColor">1</text>
<text x="221" y="117" font-size="13" fill="currentColor">2</text>
<text x="259" y="117" font-size="13" fill="currentColor">3</text>
<line x1="56" y1="27" x2="166" y2="38" stroke="currentColor" marker-end="url(#pyc-a)"/>
<line x1="56" y1="67" x2="166" y2="48" stroke="currentColor" marker-end="url(#pyc-a)"/>
<line x1="56" y1="112" x2="166" y2="112" style="stroke:var(--good)" marker-end="url(#pyc-a)"/>
<text x="75" y="95" font-size="10" fill="currentColor">c = a[:] (copy)</text>
<text x="170" y="15" font-size="10" fill="currentColor">ek hi list: b.append(4) → a me bhi 4</text>
</svg>
<figcaption>a aur b ek hi list ke do naam hain, isliye b.append(4) a me bhi dikhta hai. c = a[:] ne nayi list banayi, us par asar nahi.</figcaption>
</figure>

Dhyan do: "assignment kabhi copy nahi karta". Copy chahiye to khud banana padta hai (`a[:]`, `list(a)`, `copy.copy`, `copy.deepcopy`).

Doosri picture: **shallow copy sirf bahar ka dabba copy karta hai**; andar wali lists ab bhi share hoti hain.

<figure class="fig">
<svg viewBox="0 0 360 160" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="pyc-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<text x="10" y="40" font-size="12" fill="currentColor">a</text>
<rect x="30" y="22" width="80" height="28" fill="none" stroke="currentColor"/>
<line x1="70" y1="22" x2="70" y2="50" stroke="currentColor"/>
<text x="10" y="128" font-size="12" fill="currentColor">s</text>
<rect x="30" y="110" width="80" height="28" fill="none" style="stroke:var(--good)"/>
<line x1="70" y1="110" x2="70" y2="138" style="stroke:var(--good)"/>
<circle cx="50" cy="36" r="3" fill="currentColor"/>
<circle cx="90" cy="36" r="3" fill="currentColor"/>
<circle cx="50" cy="124" r="3" fill="currentColor"/>
<circle cx="90" cy="124" r="3" fill="currentColor"/>
<rect x="230" y="30" width="80" height="28" fill="none" style="stroke:var(--mark)"/>
<line x1="270" y1="30" x2="270" y2="58" style="stroke:var(--mark)"/>
<text x="246" y="49" font-size="12" fill="currentColor">1</text>
<text x="286" y="49" font-size="12" fill="currentColor">2</text>
<rect x="230" y="100" width="40" height="28" fill="none" style="stroke:var(--mark)"/>
<text x="246" y="119" font-size="12" fill="currentColor">3</text>
<line x1="50" y1="36" x2="226" y2="42" stroke="currentColor" marker-end="url(#pyc-b)"/>
<line x1="90" y1="36" x2="226" y2="108" stroke="currentColor" marker-end="url(#pyc-b)"/>
<line x1="50" y1="124" x2="226" y2="50" style="stroke:var(--good)" marker-end="url(#pyc-b)"/>
<line x1="90" y1="124" x2="226" y2="118" style="stroke:var(--good)" marker-end="url(#pyc-b)"/>
<text x="10" y="155" font-size="10" fill="currentColor">s = copy.copy(a): naya bahar ka dabba, par andar ki dono lists wahi</text>
</svg>
<figcaption>a = [[1, 2], [3]] aur s = copy.copy(a). Dono ke cells same inner lists ko point karte hain: s[0].append(9) a[0] ko bhi badalta hai. s.append(...) sirf s ko.</figcaption>
</figure>

`copy.deepcopy` andar ki lists ki bhi nayi copy banata hai, tab koi arrow share nahi hota.

Teesri picture: **loop chalte chalte list se `remove` karna** — `for` loop andar se ek index counter (0, 1, 2, …) chalata hai, aur list chhoti hone par elements khisak jaate hain.

<figure class="fig">
<svg viewBox="0 0 360 130" xmlns="http://www.w3.org/2000/svg">
<text x="5" y="38" font-size="11" fill="currentColor">pehle</text>
<rect x="60" y="20" width="160" height="28" fill="none" stroke="currentColor"/>
<line x1="100" y1="20" x2="100" y2="48" stroke="currentColor"/>
<line x1="140" y1="20" x2="140" y2="48" stroke="currentColor"/>
<line x1="180" y1="20" x2="180" y2="48" stroke="currentColor"/>
<text x="76" y="39" font-size="12" fill="currentColor">1</text>
<text x="116" y="39" font-size="12" style="fill:var(--bad)">2</text>
<text x="156" y="39" font-size="12" fill="currentColor">2</text>
<text x="196" y="39" font-size="12" fill="currentColor">3</text>
<text x="105" y="14" font-size="10" style="fill:var(--info)">index 1: x=2 → remove</text>
<text x="5" y="98" font-size="11" fill="currentColor">baad</text>
<rect x="60" y="80" width="120" height="28" fill="none" stroke="currentColor"/>
<line x1="100" y1="80" x2="100" y2="108" stroke="currentColor"/>
<line x1="140" y1="80" x2="140" y2="108" stroke="currentColor"/>
<text x="76" y="99" font-size="12" fill="currentColor">1</text>
<text x="116" y="99" font-size="12" style="fill:var(--bad)">2</text>
<text x="156" y="99" font-size="12" fill="currentColor">3</text>
<text x="145" y="124" font-size="10" style="fill:var(--info)">agla index 2: x=3</text>
<text x="190" y="99" font-size="10" fill="currentColor">doosra 2 index 1 par khisak</text>
<text x="190" y="112" font-size="10" fill="currentColor">gaya, isliye skip ho gaya</text>
</svg>
<figcaption>nums = [1, 2, 2, 3] par "even ho to remove". Pehla 2 hatate hi doosra 2 uski jagah aa gaya, par loop agle index par chala gaya.</figcaption>
</figure>

## Concept step-by-step

### 1. Chaar containers: list, tuple, set, dict
| Type | Likhte kaise | Order? | Badal sakte (mutable)? | Duplicate? |
|---|---|---|---|---|
| list | `[1, 2, 2]` | haan | haan | haan |
| tuple | `(1, 2)` (ek element: `(1,)`) | haan | **nahi** | haan |
| set | `{1, 2}` (khaali: `set()`) | nahi | haan | **nahi** |
| dict | `{"a": 1}` (khaali: `{}`) | insertion order | haan | keys unique |

List ke kaam ke methods: `append(x)` (end me ek), `extend(lst)` (end me sab), `insert(i, x)`, `pop()` (aakhri nikaal ke lautao), `pop(i)`, `remove(x)` (pehli occurrence hatao), `index(x)`. Slices list me **assign/delete** bhi ho sakte hain:

```python
a = [0, 1, 2, 3, 4, 5]
a[1:4] = ["x"]
print(a)
del a[::2]
print(a)
```
Output:
```
[0, 'x', 4, 5]
['x', 5]
```
`a[1:4] = ["x"]` teen elements (index 1, 2, 3) ki jagah ek daal deta hai — length badal gayi. `del a[::2]` index 0, 2, 4, … hata deta hai.

Dhyan do: `append([3, 4])` ek element (poori list) jodta hai; `extend([3, 4])` do elements.

### 2. Alias: `b = a` copy nahi hai
`b = a` ke baad dono naam ek hi object ke hain. Mutate karne wala koi bhi kaam (`append`, `b[0] = ...`, `+=`) dono me dikhega. `a is b` → `True`.

```python
a = [1, 2, 3]
b = a
c = a[:]
b.append(4)
c.append(5)
print(a, c, a is b, a is c)
```
Output:
```
[1, 2, 3, 4] [1, 2, 3, 5] True False
```

Dhyan do: function ko list pass karna bhi alias hai — function andar `append` kare to bahar wali list badal jaati hai.

### 3. `+=` vs `x = x + [...]`
- `x += [2]` list ko **wahi par (in place)** badalta hai (`extend` jaisa). Jo bhi naam is list ko dekh rahe hain, sab ko badlav dikhega.
- `x = x + [3]` ek **nayi list** banata hai aur sirf naam `x` ko us par chipkata hai. Purane aliases purani list par hi rehte hain.

```python
x = [1]
y = x
x += [2]
z = x
x = x + [3]
print(y, z, x)
```
Output:
```
[1, 2] [1, 2] [1, 2, 3]
```

Dhyan do: numbers/strings/tuples immutable hain, unpar `+=` hamesha naya object banata hai.

### 4. Shallow vs deep copy, aur `[[0]*3]*2`
- Shallow copy (`a[:]`, `list(a)`, `copy.copy(a)`): naya **bahar ka** list, andar ke objects share.
- Deep copy (`copy.deepcopy(a)`): sab kuch naya, andar tak.

```python
import copy
a = [[1, 2], [3]]
s = copy.copy(a)
d = copy.deepcopy(a)
s[0].append(9)
s.append([4])
d[1].append(8)
print(a, s, d)
```
Output:
```
[[1, 2, 9], [3]] [[1, 2, 9], [3], [4]] [[1, 2], [3, 8]]
```
`s[0].append(9)` shared inner list ko badalta hai → `a` me bhi 9. `s.append([4])` sirf `s` ka bahar wala list → `a` par asar nahi. `d` poora alag.

**Grid trap:** `[[0] * 3] * 2` me `* 2` ek hi inner list ko do baar rakh deta hai (do arrows, ek object):

```python
grid = [[0] * 3] * 2
grid[0][1] = 7
safe = [[0] * 3 for _ in range(2)]
safe[0][1] = 7
print(grid)
print(safe)
```
Output:
```
[[0, 7, 0], [0, 7, 0]]
[[0, 7, 0], [0, 0, 0]]
```
Comprehension har baar `[0] * 3` naya banata hai, isliye rows independent.

Dhyan do: `[0] * 3` theek hai (numbers immutable hain), problem tab hai jab repeat hone wali cheez khud list ho.

### 5. Tuple immutable hai — par andar ki list nahi
Tuple ke slots badle nahi ja sakte (`t[0] = ...` → `TypeError`). Lekin agar slot me list hai, us list ko mutate kar sakte ho. `t[0] += [4]` do kaam karta hai: (1) list ko extend (ho jaata hai), (2) `t[0] = ...` assign (yahan `TypeError`).

```python
t = ([1], 2)
t[0].append(3)
try:
    t[0] += [4]
except TypeError:
    print("TypeError")
print(t)
```
Output:
```
TypeError
([1, 3, 4], 2)
```

Dhyan do: error aaya phir bhi 4 jud chuka hai — kyunki extend pehle hua, assignment baad me fail hua.

### 6. Loop ke beech list/dict badalna
`for x in lst` andar se index 0, 1, 2, … chalata hai aur har baar **abhi ki** list se element leta hai.
- `remove` se aage ke elements ek khisak jaate hain → **agla element skip**.
- `append` kiya to naye element bhi loop me aayenge (end tak pahunchne se pehle).

```python
nums = [1, 2, 2, 3, 4, 4, 5]
for x in nums:
    if x % 2 == 0:
        nums.remove(x)
print(nums)

a = [1, 2, 3]
for v in a:
    if v < 25:
        a.append(v * 10)
print(a)
```
Output:
```
[1, 2, 3, 4, 5]
[1, 2, 3, 10, 20, 30, 100, 200]
```
Pehle loop me: index 1 par pehla 2 hata, doosra 2 index 1 par aa gaya aur skip hua (loop index 2 par 3 dekhta hai). Index 3 par pehla 4 hata, doosra 4 skip. Isliye ek 2 aur ek 4 bach gaye.

Doosre loop ka trace (har naya element bhi visit hota hai):

| index | v | `v < 25`? | list ke end me |
|---|---|---|---|
| 0 | 1 | haan | 10 juda |
| 1 | 2 | haan | 20 juda |
| 2 | 3 | haan | 30 juda |
| 3 | 10 | haan | 100 juda |
| 4 | 20 | haan | 200 juda |
| 5 | 30 | nahi | — |
| 6 | 100 | nahi | — |
| 7 | 200 | nahi | — (end) |

Safe tarika: **copy par loop chalao** — `for x in list(nums):` ya `for x in nums[:]:`, aur nayi list banana aur bhi saaf hai: `[x for x in nums if x % 2]`.

**Dict:** loop ke beech dict ka size badla (naya key ya `pop`) to `RuntimeError: dictionary changed size during iteration`. `for k in list(d):` se keys ki copy par chalao, tab safe.

```python
d = {"a": 1, "b": 2, "c": 3}
for k in list(d):
    if d[k] % 2:
        d[k * 2] = d.pop(k) * 10
print(d)
```
Output:
```
{'b': 2, 'aa': 10, 'cc': 30}
```

Dhyan do: loop me `remove` dekho to turant index-wise trace table banao.

### 7. Dict aur set ke rules
- `d.get(k, default)`: key na ho to error nahi, default. Counting ka standard pattern: `freq[w] = freq.get(w, 0) + 1`.
- `d.pop(k)` key hata ke value lautata hai. `d.items()` → (key, value) pairs.
- **Insertion order:** keys usi order me aati hain jisme pehli baar daali gayi. Purani key ko dobara assign karo to position wahi rehti hai; naya key end me jaata hai. Keys sorted nahi hoti.
- **Equal keys collapse:** `1 == 1.0 == True` aur hash bhi same, isliye ek hi key. Pehli baar wala key-object rehta hai, value aakhri wali.
- `max(d, key=d.get)`: sabse badi value wali key (tie ho to pehli aane wali).
- Sets: `A | B` union, `A & B` intersection, `A - B` difference, `A ^ B` symmetric difference (sirf ek me). `A <= B` subset, `A < B` **proper** subset (barabar nahi hona chahiye).

```python
print({1: "a", True: "b", 1.0: "c", 2: "d"})
A = {1, 2, 3, 4}
B = {3, 4, 5}
print(sorted(A | B), sorted(A & B), sorted(A - B), sorted(A ^ B))
print({1, 2} < {1, 2}, {1, 2} <= {1, 2}, {1, 2} < {1, 2, 3})
freq = {}
for w in "to be or not to be".split():
    freq[w] = freq.get(w, 0) + 1
print(freq, max(freq, key=freq.get))
```
Output:
```
{1: 'c', 2: 'd'}
[1, 2, 3, 4, 5] [3, 4] [1, 2] [1, 2, 5]
False True True
{'to': 2, 'be': 2, 'or': 1, 'not': 1} to
```

Dhyan do: `{}` khaali **dict** hai, khaali set `set()` se banta hai.

### 8. Comprehensions aur generators
List comprehension `[expr for x in A if cond]` = ek chhota loop jo list banata hai. **Kai `for` ho to left se right nested loops** ki tarah padho (pehla `for` bahar wala).

```python
print([x * y for x in range(1, 4) for y in range(x, 3)])
print(sorted({c.lower() for c in "Aa Bb"}))
words = ["apple", "avocado", "banana"]
print({w[0]: len(w) for w in words})
```
Output:
```
[1, 2, 4]
[' ', 'a', 'b']
{'a': 7, 'b': 6}
```
Pehli line: x=1 → y in 1,2 → 1, 2; x=2 → y in 2 → 4; x=3 → `range(3, 3)` khaali. Doosri line: set comprehension duplicates hata deta hai ("A" aur "a" dono "a" bane), space bhi ek character hai; set ka order fixed nahi hota isliye `sorted` karke print kiya. Dict comprehension me same key dobara aaye to **aakhri value** jeet-ti hai ("avocado" ka 7), position pehli wali.

**Generator** `(expr for x in A)` (round brackets) values ek-ek karke deta hai aur **sirf ek baar** chal sakta hai:

```python
g = (x * x for x in range(4))
print(sum(g), sum(g))
```
Output:
```
14 0
```

Dhyan do: doosra `sum(g)` 0 hai kyunki generator khatam ho chuka. List chahiye to `list(g)` pehle hi bana lo.

### 9. Sorting
- `sorted(x)` **nayi list** lautata hai; `lst.sort()` list ko wahi badalta hai aur **`None`** lautata hai (`y = lst.sort()` → `y` None!).
- `reverse=True` ulta order.
- `key=` har element se ek "compare karne wali value" banata hai. Key tuple ho to **left se right** compare: pehle pehla, tie ho to doosra.
- Descending number chahiye aur baaki ascending → number ko negate karo: `key=lambda p: (-p[1], p[0])`.
- **Stable:** key barabar ho to original order bana rehta hai.

```python
data = [("ria", 82), ("aman", 91), ("zoe", 82), ("dev", 75)]
print([n for n, _ in sorted(data, key=lambda p: (-p[1], p[0]))])
print([n for n, _ in sorted(data, key=lambda p: p[1])])
print([3, 1, 2].sort(), sorted([3, 1, 2], reverse=True))
```
Output:
```
['aman', 'ria', 'zoe', 'dev']
['dev', 'ria', 'zoe', 'aman']
None [3, 2, 1]
```
Doosri line me ria aur zoe dono 82: stable, isliye original order (ria pehle).

Dhyan do: strings ka sort dictionary order (character by character) hai, aur `sorted("bca")` ek **list** `['a', 'b', 'c']` deta hai, string nahi.

### 10. `enumerate`, `deque` aur program tracing
- `enumerate(lst)` → `(index, value)` pairs, index **0 se** (jab tak `start=` na do).
- `collections.deque`: dono taraf se tez add/remove. `append` right me. `popleft()` = left se nikalo (**queue, FIFO** → BFS). `pop()` = right se (**stack, LIFO** → DFS).

```python
from collections import deque
dq = deque([1, 2, 3])
dq.append(4)
print(dq.popleft(), dq.pop(), list(dq))
for i, ch in enumerate("ab"):
    print(i, ch)
```
Output:
```
1 4 [2, 3]
0 a
1 b
```

**Tracing recipe** (lambe programs ke liye):
1. Har variable ka ek column banao.
2. Har loop iteration ek row. Values update karo **line ke order me**.
3. `break`, `continue`, loop-`else` ko mark karo; data structure (list/queue/dict) ki poori state har row me likho.
4. Aakhri print me exactly kya maanga hai, wahi nikalo.

Dhyan do: BFS trace me `popleft` hai ya `pop` — ye ek shabd poora order badal deta hai.

## Solved examples

**Example 1 (MCQ, easy):** Output?
```python
p = [1, 2]
q = p
r = p[:]
q += [3]
p = p + [4]
r.append(5)
print(p, q, r)
```
(A) `[1, 2, 3, 4] [1, 2, 3] [1, 2, 5]` (B) `[1, 2, 3, 4] [1, 2, 3, 4] [1, 2, 5]` (C) `[1, 2, 4] [1, 2, 3] [1, 2, 5]` (D) `[1, 2, 3, 4] [1, 2, 3] [1, 2, 3, 5]`

**Soch:** Alias (`q = p`), shallow copy (`p[:]`), aur `+=` vs `+`.

**Solution:**
1. `q = p`: ek list `L1 = [1, 2]`, do naam. `r` = alag list `[1, 2]`.
2. `q += [3]`: `L1` in place → `[1, 2, 3]` (p aur q dono).
3. `p = p + [4]`: nayi list `[1, 2, 3, 4]`, sirf `p` ab us par. `q` abhi bhi `L1 = [1, 2, 3]`.
4. `r.append(5)` → `[1, 2, 5]`.
5. **Answer (A).**

**Galti kahan hoti hai:** (B): `p = p + [4]` ko bhi in-place maan lena. (C): `q += [3]` ko `p` par asar na karne wala maanna. (D): `r` ko alias samajhna.

**Example 2 (NAT, medium):** Kya print hoga?
```python
import copy
m = [[1, 2], [3, 4]]
s = m[:]
d = copy.deepcopy(m)
s[0][0] = 9
s[1] = [7]
d[0].append(5)
print(sum(m[0]) + len(m[1]) * 10 + len(d[0]) * 100)
```

**Soch:** Shallow copy me inner list share; `s[1] = ...` sirf `s` ka slot badalta hai; deep copy alag.

**Solution:**
1. `s[0][0] = 9`: shared inner list → `m[0] = [9, 2]`, sum 11.
2. `s[1] = [7]`: `s` ke slot me nayi list; `m[1]` abhi bhi `[3, 4]`, length 2 → 20.
3. `d[0].append(5)`: `d[0] = [1, 2, 5]`, length 3 → 300. (`m` par asar nahi.)
4. $11+20+300=$ **331**.

**Galti kahan hoti hai:** Shallow copy ko poora alag samajhna → `m[0]` sum 3 → 323. Ya `s[1] = [7]` ko `m` me bhi maanna → `len(m[1]) = 1` → 321.

**Example 3 (MCQ, medium):** Output?
```python
a = [2, 4, 5, 6, 8, 9]
for x in a:
    if x % 2 == 0:
        a.remove(x)
print(a)
```
(A) `[5, 9]` (B) `[4, 5, 8, 9]` (C) `[4, 5, 6, 8, 9]` (D) `RuntimeError`

**Soch:** Loop ke beech `remove` → index-wise trace.

**Solution:**

| index | list (us waqt) | x | action |
|---|---|---|---|
| 0 | [2, 4, 5, 6, 8, 9] | 2 | remove → [4, 5, 6, 8, 9] |
| 1 | [4, 5, 6, 8, 9] | 5 | odd, keep |
| 2 | [4, 5, 6, 8, 9] | 6 | remove → [4, 5, 8, 9] |
| 3 | [4, 5, 8, 9] | 9 | odd, keep |
| 4 | — | — | index 4 ≥ length 4, loop khatam |

4 aur 8 kabhi `x` bane hi nahi. **Answer (B).**

**Galti kahan hoti hai:** (A): maan lena ki loop har element dekhega. (D): list ke liye error nahi aata (wo dict ka rule hai).

**Example 4 (MSQ, medium):** Kaun se `True` hain?
(A) `len({True: 1, 1: 2, 1.0: 3, 0: 4}) == 2`
(B) `{k: v for k, v in [("a", 1), ("b", 2), ("a", 3)]} == {"a": 1, "b": 2}`
(C) `list({"z": 1, "a": 2}) == ["z", "a"]`
(D) `sorted("bca") == "abc"`

**Soch:** Equal keys collapse; dict comprehension me last value; dict insertion order; `sorted` list deta hai.

**Solution:**
1. (A) `True`, `1`, `1.0` ek key; `0` alag → 2 keys ✓.
2. (B) "a" dobara aaya, aakhri value 3 jeet-ti hai → `{"a": 3, "b": 2}` ✗.
3. (C) keys insertion order me, sorted nahi → `["z", "a"]` ✓.
4. (D) `sorted("bca")` = `['a', 'b', 'c']` (list), string `"abc"` ke barabar nahi ✗.
5. **Answer: (A), (C).**

**Galti kahan hoti hai:** (B) me "pehli value rehti hai" sochna; (C) ko galat maanna kyunki "dict keys sorted hoti hain" — nahi hoti.

**Example 5 (MCQ, medium):** Output?
```python
emp = [("ravi", "ml", 70), ("asha", "db", 85), ("kiran", "ml", 85), ("bina", "db", 70)]
r = sorted(emp, key=lambda e: (e[1], -e[2]))
print([e[0] for e in r])
```
(A) `['asha', 'bina', 'kiran', 'ravi']` (B) `['bina', 'asha', 'ravi', 'kiran']` (C) `['asha', 'kiran', 'bina', 'ravi']` (D) `['kiran', 'ravi', 'asha', 'bina']`

**Soch:** Key tuple: pehle dept ascending, phir score descending (minus sign).

**Solution:**
1. Keys: ravi ("ml", −70), asha ("db", −85), kiran ("ml", −85), bina ("db", −70).
2. "db" < "ml" → db wale pehle. db me −85 < −70 → asha, phir bina.
3. ml me −85 < −70 → kiran, phir ravi.
4. **Answer (A).**

**Galti kahan hoti hai:** (B): minus ko ignore karke score ascending lena. (C): sirf score se sort karna (dept ko key me na lena).

**Example 6 (MCQ, hard):** Output?
```python
scores = {"x": 3}
for i, w in enumerate(["b", "a", "b", "c", "a", "b"]):
    scores[w] = scores.get(w, 0) + i
best = max(scores, key=scores.get)
g = (v for v in scores.values() if v % 2)
print(list(scores), best, sum(g), sum(g))
```
(A) `['a', 'b', 'c', 'x'] b 18 18` (B) `['x', 'b', 'a', 'c'] b 18 0` (C) `['x', 'b', 'a', 'c'] b 15 0` (D) `['x', 'b', 'a', 'c'] x 18 0`

**Soch:** Trace table (enumerate 0 se), dict insertion order, `max` with key, generator ek baar.

**Solution:**

| i | w | update | scores |
|---|---|---|---|
| 0 | b | 0 + 0 | x:3, b:0 |
| 1 | a | 0 + 1 | x:3, b:0, a:1 |
| 2 | b | 0 + 2 | x:3, b:2, a:1 |
| 3 | c | 0 + 3 | x:3, b:2, a:1, c:3 |
| 4 | a | 1 + 4 | x:3, b:2, a:5, c:3 |
| 5 | b | 2 + 5 | x:3, b:7, a:5, c:3 |

1. Order: `['x', 'b', 'a', 'c']` (b ki position pehli baar wali hi rahi).
2. `best` = sabse badi value 7 → `'b'`.
3. Odd values: 3, 7, 5, 3 → 18. Doosra `sum(g)` → 0 (generator khatam).
4. **Answer (B).**

**Galti kahan hoti hai:** (A): keys ko sorted maanna aur generator ko dobara use hone wala maanna. (C): enumerate ko 1 se shuru karna ya ek value chhodna. (D): pehli key `x` ko best maanna.

## Confusions clear karo

**Q:** `b = a` aur `b = a[:]` me kya farak hai?
**A:** Pehla sirf naya naam (alias) — ek hi list. Doosra nayi bahar wali list (shallow copy). Nested list ho to `a[:]` bhi andar ki lists share karta hai; poori independence ke liye `copy.deepcopy`.

**Q:** `x += [1]` aur `x = x + [1]` same nahi hain?
**A:** Result `x` me same dikhta hai, par `+=` purani list ko badalta hai (aliases ko bhi dikhega), `+` nayi list banata hai (aliases purani par rehte hain).

**Q:** Loop me `remove` karne se error kyun nahi aata?
**A:** List ke liye Python error nahi deta, bas index aage badhta rehta hai aur khiske hue elements skip ho jaate hain. Dict me size badalne par `RuntimeError` aata hai.

**Q:** Dict me keys kis order me aati hain?
**A:** Jis order me pehli baar insert hui. Value update se position nahi badalti. `pop` karke dobara daalo to end me jaayegi.

**Q:** `{1: 'a', True: 'b'}` me do keys kyun nahi?
**A:** `True == 1` aur `hash(True) == hash(1)`, isliye Python inhe ek hi key maanta hai. Pehla key-object (`1`) rehta hai, value aakhri (`'b'`).

**Q:** `lst.sort()` print kiya to `None` kyun aaya?
**A:** `sort()` list ko wahi badalta hai aur kuch return nahi karta (`None`). Nayi sorted list chahiye to `sorted(lst)`.

**Q:** Generator aur list comprehension me kya farak hai?
**A:** List `[...]` saari values ek saath memory me rakhti hai aur baar-baar padhi ja sakti hai. Generator `(...)` values zaroorat par ek-ek deta hai, aur ek baar khatam to khatam.

**Q:** BFS me `pop()` likh diya to?
**A:** `pop()` right se nikalta hai (stack), to wo DFS jaisa order dega. BFS ke liye `popleft()` (queue).

## Khud try karo

**1.** Output?
```python
grid = [[0] * 2] * 3
grid[1][0] = 5
print(grid)
```

<details><summary>Answer dekho</summary>

Teeno rows ek hi list hain, isliye teeno me 5:
`[[5, 0], [5, 0], [5, 0]]`

</details>

**2.** Output?
```python
a = [0, 1, 2, 3, 4, 5, 6]
a[2:5] = [9]
del a[::2]
print(a)
```

<details><summary>Answer dekho</summary>

- `a[2:5] = [9]`: index 2, 3, 4 ki jagah 9 → `[0, 1, 9, 5, 6]`.
- `del a[::2]`: index 0, 2, 4 (yaani 0, 9, 6) hatao → `[1, 5]`.

</details>

**3.** `[(x, y) for x in range(3) for y in range(x)]` me kitne tuples hain, aur kaun se?

<details><summary>Answer dekho</summary>

x=0: `range(0)` khaali. x=1: y=0. x=2: y=0, 1. → `[(1, 0), (2, 0), (2, 1)]`, **3** tuples.

</details>

**4.** `A = {1, 2, 3, 4, 5}`, `B = {4, 5, 6}`. `len(A ^ B)`, `sorted(B - A)`, aur `B <= A`?

<details><summary>Answer dekho</summary>

- `A ^ B` = sirf ek me: {1, 2, 3, 6} → **4**.
- `B - A` = `[6]`.
- `B <= A`: 6 A me nahi → `False`.

</details>

**5.** Output?
```python
from collections import deque
dq = deque([1, 2, 3])
dq.append(4)
print(dq.popleft(), dq.pop(), list(dq))
```

<details><summary>Answer dekho</summary>

Deque `[1, 2, 3, 4]`. `popleft()` → 1 (left se). `pop()` → 4 (right se). Bacha `[2, 3]`.

Output: `1 4 [2, 3]`

</details>

## Ek page me
- Variable = label, object nahi. `b = a` alias; `a[:]`, `list(a)`, `copy.copy` shallow; `copy.deepcopy` andar tak.
- `[[0]*3]*2` → rows ek hi list; `[[0]*3 for _ in range(2)]` sahi.
- `x += [..]` in place (aliases ko dikhta); `x = x + [..]` nayi list, sirf `x` rebind.
- `t[0] += [4]` (tuple me list): list extend ho jaati hai, **phir** `TypeError`.
- Loop me `remove` → agla element skip; `append` → naye bhi visit. Copy par loop chalao. Dict size badla → `RuntimeError`; `list(d)` par loop safe.
- Slice assign `a[i:j] = [x]` length badal sakta; `del a[::2]` index 0, 2, 4, … hatata.
- Dict: insertion order; update se position same; `1`, `1.0`, `True` ek key; `get(k, 0)` counting; `max(d, key=d.get)`.
- Sets: `|` `&` `-` `^`; `<` proper subset; `{}` dict hai, `set()` set.
- Comprehension: `for` clauses left→right nested; dict comprehension me last value jeet-ti; generator ek baar.
- `sorted()` nayi list, stable; `.sort()` → `None`; key tuple left→right, descending ke liye minus.
- `enumerate` 0 se; `deque.popleft()` FIFO (BFS), `pop()` LIFO (DFS).
- Lambe program: variable table, har iteration ek row, break/else mark karo.

Revision ke liye **Short note** tab dekho.
