# Python types, expressions and control flow

> **Time:** ~35 min · **Pehle aana chahiye:** kuch nahi (bas itna pata ho ki `print(...)` screen par likhta hai aur `x = 5` ek variable me value rakhta hai) · **Day:** 25

## Ye topic kyun?
GATE DA me Python ke questions zyada tar "ye program kya print karega?" type ke hote hain (MCQ/NAT, 1–2 marks). Inme koi bada algorithm nahi hota; bas chhoti chhoti rules ki pareeksha hoti hai: `-7 // 2` kya hai, `**` kis order me chalta hai, `or` kya return karta hai, slicing me stop shamil hai ya nahi, aur loop ka `else` kab chalta hai. Ye rules ek baar saaf ho gaye to ye sabse aasaan marks hain.

## Picture se samjho
Pehli picture: **integer division `//` hamesha number line par LEFT (neeche) ki taraf jaata hai.** Ise *floor* kehte hain: "jo integer is number ke barabar ya isse chhota ho, unme sabse bada".

<figure class="fig">
<svg viewBox="0 0 360 110" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="pyb-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<line x1="15" y1="60" x2="345" y2="60" stroke="currentColor"/>
<line x1="30" y1="54" x2="30" y2="66" stroke="currentColor"/>
<line x1="85" y1="54" x2="85" y2="66" stroke="currentColor"/>
<line x1="140" y1="54" x2="140" y2="66" stroke="currentColor"/>
<line x1="195" y1="54" x2="195" y2="66" stroke="currentColor"/>
<line x1="250" y1="54" x2="250" y2="66" stroke="currentColor"/>
<line x1="305" y1="54" x2="305" y2="66" stroke="currentColor"/>
<text x="23" y="82" font-size="12" fill="currentColor">−5</text>
<text x="78" y="82" font-size="12" fill="currentColor">−4</text>
<text x="133" y="82" font-size="12" fill="currentColor">−3</text>
<text x="188" y="82" font-size="12" fill="currentColor">−2</text>
<text x="243" y="82" font-size="12" fill="currentColor">−1</text>
<text x="302" y="82" font-size="12" fill="currentColor">0</text>
<circle cx="112.5" cy="60" r="5" style="fill:var(--mark)"/>
<text x="95" y="102" font-size="11" fill="currentColor">−7/2 = −3.5</text>
<path d="M108,52 Q98,30 88,52" fill="none" style="stroke:var(--good)" stroke-width="2" marker-end="url(#pyb-a)"/>
<path d="M117,52 Q127,30 137,52" fill="none" style="stroke:var(--bad)" stroke-width="2" marker-end="url(#pyb-a)"/>
<text x="10" y="22" font-size="11" style="fill:var(--good)">Python // : floor → −4</text>
<text x="150" y="22" font-size="11" style="fill:var(--bad)">C/Java style truncate → −3 (galat)</text>
</svg>
<figcaption>-7 // 2: exact answer −3.5 hai. Python left ki taraf (−4) jaata hai, 0 ki taraf (−3) nahi.</figcaption>
</figure>

Positive numbers me floor aur "decimal kaat do" same lagte hain ($3.5\to3$), isliye farak sirf negative numbers me dikhta hai — aur GATE wahi poochta hai.

Doosri picture: string ke har character ke do address hote hain — aage se (0, 1, 2, …) aur peeche se (−1, −2, …). Slice ko "deewaron ke beech" kaatne jaisa socho.

<figure class="fig">
<svg viewBox="0 0 360 140" xmlns="http://www.w3.org/2000/svg">
<rect x="100" y="45" width="120" height="40" style="fill:var(--mark)" opacity="0.25"/>
<rect x="60" y="45" width="240" height="40" fill="none" stroke="currentColor"/>
<line x1="100" y1="45" x2="100" y2="85" stroke="currentColor"/>
<line x1="140" y1="45" x2="140" y2="85" stroke="currentColor"/>
<line x1="180" y1="45" x2="180" y2="85" stroke="currentColor"/>
<line x1="220" y1="45" x2="220" y2="85" stroke="currentColor"/>
<line x1="260" y1="45" x2="260" y2="85" stroke="currentColor"/>
<text x="74" y="71" font-size="16" fill="currentColor">P</text>
<text x="114" y="71" font-size="16" fill="currentColor">Y</text>
<text x="154" y="71" font-size="16" fill="currentColor">T</text>
<text x="194" y="71" font-size="16" fill="currentColor">H</text>
<text x="234" y="71" font-size="16" fill="currentColor">O</text>
<text x="274" y="71" font-size="16" fill="currentColor">N</text>
<text x="76" y="38" font-size="11" style="fill:var(--info)">0</text>
<text x="116" y="38" font-size="11" style="fill:var(--info)">1</text>
<text x="156" y="38" font-size="11" style="fill:var(--info)">2</text>
<text x="196" y="38" font-size="11" style="fill:var(--info)">3</text>
<text x="236" y="38" font-size="11" style="fill:var(--info)">4</text>
<text x="276" y="38" font-size="11" style="fill:var(--info)">5</text>
<text x="72" y="102" font-size="11" style="fill:var(--bad)">−6</text>
<text x="112" y="102" font-size="11" style="fill:var(--bad)">−5</text>
<text x="152" y="102" font-size="11" style="fill:var(--bad)">−4</text>
<text x="192" y="102" font-size="11" style="fill:var(--bad)">−3</text>
<text x="232" y="102" font-size="11" style="fill:var(--bad)">−2</text>
<text x="272" y="102" font-size="11" style="fill:var(--bad)">−1</text>
<text x="10" y="38" font-size="11" fill="currentColor">aage se</text>
<text x="10" y="102" font-size="11" fill="currentColor">peeche se</text>
<text x="70" y="128" font-size="12" fill="currentColor">s[1:4] = "YTH"  (index 4 wala O shamil nahi)</text>
</svg>
<figcaption>s = "PYTHON". Upar positive index, neeche negative index. Shaded hissa s[1:4] hai: start 1 se shuru, stop 4 se pehle ruk jaata hai.</figcaption>
</figure>

Yaad rakho: `s[-1]` hamesha aakhri character hai, `s[-2]` usse pehle wala. Slice ka **stop kabhi shamil nahi hota**.

## Concept step-by-step

### 1. Basic types aur `/`
Python me har value ka ek **type** hota hai: `int` (poora number, jaise `7`), `float` (decimal wala, jaise `3.5`), `str` (text, `"abc"`), `bool` (`True`/`False`), aur `None` (kuch nahi). `type(x)` batata hai type kya hai.

- `/` (true division) **hamesha float** deta hai, chahe answer poora ho: `6 / 2` → `3.0`.
- `//` aur `%` me agar koi bhi operand float ho to answer float: `7.0 // 2` → `3.0`, `7 % 2.0` → `1.0`.
- `int ** negative int` float deta hai: `2 ** -1` → `0.5` (kyunki $2^{-1}=\frac12$ integer nahi).

```python
print(7 / 2, 6 / 2, 7 // 2, 2 ** -1, 7.0 // 2, 7 % 2.0)
print(type(6 / 2), type(7 // 2), type(7.0 // 2))
```
Output:
```
3.5 3.0 3 0.5 3.0 1.0
<class 'float'> <class 'int'> <class 'float'>
```

Dhyan do: `10 / 2 == 5` `True` hai (kyunki `5.0 == 5`), lekin print karoge to `5.0` dikhega, `5` nahi.

### 2. `//` floor hai, aur `%` us hisaab se
`a // b` = $\lfloor a/b\rfloor$ (floor, yaani left ki taraf round). Remainder `%` aisa define hai ki ye identity **hamesha** sach rahe:
$$a = (a\,//\,b)\cdot b + a\,\%\,b.$$
Isliye recipe: pehle floor nikalo, phir remainder $= a - b\cdot q$. Isse ek rule nikalta hai: **`%` ka sign divisor ($b$) ke sign jaisa hota hai** (ya 0).

| Expression | $a/b$ | `//` (floor) | `%` $=a-bq$ |
|---|---|---|---|
| `7, 2` | 3.5 | 3 | $7-6=1$ |
| `-7, 2` | −3.5 | −4 | $-7-(-8)=1$ |
| `7, -2` | −3.5 | −4 | $7-8=-1$ |
| `-7, -2` | 3.5 | 3 | $-7-(-6)=-1$ |

`divmod(a, b)` dono ek saath deta hai: `divmod(-17, 5)` → $-17/5=-3.4$, floor $-4$, remainder $-17-(-20)=3$ → `(-4, 3)`.

```python
print(7 // 2, -7 // 2, 7 // -2, -7 // -2)
print(7 % 3, -7 % 3, 7 % -3, -7 % -3)
print(divmod(-17, 5), divmod(17, -5))
print(int(-3.5), -7 // 2)
```
Output:
```
3 -4 -4 3
1 2 -2 -1
(-4, 3) (-4, -3)
-3 -4
```

Dhyan do: `int(-3.5)` decimal kaat-ta hai (−3), par `//` floor karta hai (−4). Dono alag hain.

### 3. `**` aur operator precedence
**Precedence** = kaunsa operator pehle chalega. Upar se neeche (pehle → baad me):

| Level | Operators |
|---|---|
| 1 (sabse pehle) | `**` |
| 2 | unary `-` (jaise `-3`) |
| 3 | `*`, `/`, `//`, `%` (left se right) |
| 4 | `+`, `-` (left se right) |
| 5 | comparisons `<`, `==`, `is`, `in` … |
| 6 | `not` |
| 7 | `and` |
| 8 (sabse baad) | `or` |

Do khaas baatein:
- `**` **right-associative** hai: `2 ** 3 ** 2` = `2 ** (3 ** 2)` = `2 ** 9` = `512` (na ki `8 ** 2 = 64`). Ye maths ki tarah hai: $2^{3^2}=2^9$.
- `**` unary minus se pehle: `-3 ** 2` = `-(3 ** 2)` = `-9`. Bracket lagao to `(-3) ** 2 = 9`.

Tiny example: `2 + 3 * 4 ** 2 // 5 - 1` → `4**2=16` → `3*16=48` → `48//5=9` → `2+9-1=10`.

```python
print(-3 ** 2, (-3) ** 2, 2 ** 3 ** 2, (2 ** 3) ** 2)
print(2 + 3 * 4 ** 2 // 5 - 1)
```
Output:
```
-9 9 512 64
10
```

Dhyan do: `**` ko right se left padho; baaki `* / // %` left se right.

### 4. Comparisons, chaining, `==` vs `is`
Comparison `True`/`False` deta hai. Python me **chaining** hoti hai: `a < b < c` ka matlab `a < b and b < c` (b sirf ek baar evaluate hota hai). Ye kisi bhi comparison ke saath: `1 < 3 > 2` = `1 < 3 and 3 > 2` = `True`.

`1 < 3 == 3 < 2` = `1 < 3 and 3 == 3 and 3 < 2` = `True and True and False` = `False`.
Lekin `(1 < 3) == 3` = `True == 3` = `False` (bracket ne chain tod di; `True` ki value 1 hai).

- `==` poochta hai: **value** same hai?
- `is` poochta hai: **bilkul wahi object** hai (memory me ek hi)?

```python
print(1 < 3 > 2, 1 < 3 == 3 < 2, (1 < 3) == 3)
a = [1, 2]
b = [1, 2]
c = a
print(a == b, a is b, a is c)
```
Output:
```
True False False
True False True
```

Dhyan do: `a` aur `b` alag-alag banayi gayi lists hain — value same (`==` True) par object alag (`is` False). `c = a` naya object nahi banata.

### 5. Truthy aur falsy
`if x:` likhne par Python `x` ko `bool` me badalta hai. Ye values **falsy** (False jaisi) hain:
`0`, `0.0`, `""` (khaali string), `[]`, `()`, `{}`, `set()`, `None`, `False`.
**Baaki sab truthy** hai — `[0]` (ek element wali list), `"0"` (ek character wali string), `" "` (space), `-1` bhi.

`bool` asal me `int` ka subtype hai: `True == 1`, `False == 0`, `True + True == 2`. Aur `hash(True) == hash(1) == hash(1.0)` — isliye dict/set me `1`, `1.0`, `True` ek hi key maane jaate hain.

```python
for v in [0, "", [], None, [0], "0", " ", -1]:
    print(repr(v), bool(v))
print(True == 1, True + True, hash(True) == hash(1) == hash(1.0))
```
Output:
```
0 False
'' False
[] False
None False
[0] True
'0' True
' ' True
-1 True
True 2 True
```

Dhyan do: "khaali" = falsy. `[0]` khaali nahi hai (usme ek item hai), isliye truthy.

### 6. `and`, `or`, `not` — operand return karte hain
Ye sabse important trap hai. `and`/`or` **True/False nahi, ek operand** lautate hain, aur **short-circuit** karte hain (zaroorat na ho to doosra hissa evaluate hi nahi karte).
- `x or y`: agar `x` truthy → `x` lautao (y dekha hi nahi). Warna `y` lautao.
- `x and y`: agar `x` falsy → `x` lautao (y dekha hi nahi). Warna `y` lautao.
- Lambi chain: `or` = **pehla truthy** (koi na mile to aakhri); `and` = **pehla falsy** (koi na mile to aakhri).
- `not x` hamesha asli `True`/`False` deta hai.

`and` ki precedence `or` se zyada hai. Example: `0 or [] or "a" and "b"` = `0 or [] or ("a" and "b")` = `0 or [] or "b"` → `"b"`.

`not` comparisons se **neeche** hai: `not 2 == 3` = `not (2 == 3)` = `True`. Bracket lagao: `(not 2) == 3` = `False == 3` = `False`.

```python
print(0 or "a", "" or [], 3 and 5, 0 and 5, [] or 0 or "x")
print(0 or [] or "a" and "b")
print(not 2 == 3, (not 2) == 3)
```
Output:
```
a [] 5 0 x
b
True False
```

Dhyan do: `"" or []` → `[]` (dono falsy, isliye aakhri). Output me `True`/`False` likhne se pehle socho operand kaunsa lauta.

### 7. Float ki chhoti galti
Computer decimal ko binary me exactly store nahi kar paata, isliye `0.1 + 0.2` thoda sa alag aata hai.

```python
print(0.1 + 0.2, 0.1 + 0.2 == 0.3, abs(0.1 + 0.2 - 0.3) < 1e-9)
```
Output:
```
0.30000000000000004 False True
```

Dhyan do: floats ko `==` se compare mat karo; chhote tolerance se karo.

### 8. Strings: indexing, slicing, immutability, methods
- `s[i]` = ek character. `s[-1]` aakhri.
- `s[start:stop:step]`: start se shuru, **stop se pehle** ruk jao, har baar `step` aage. Default: start=0, stop=end, step=1.
- **Negative step** peeche se chalta hai: `s[::-1]` poori string ulti. Negative step me default start = aakhri, default stop = shuru se bhi pehle.
- Slicing **kabhi error nahi deti**: range se bahar ke index clamp ho jaate hain (`s[4:100]`, `s[10:]` → `""` agar kuch na bache).
- `s[-1:-4]` khaali hai! Kyunki step +1 hai (aage chalna) par start −1 (end par) stop −4 se aage hai. Ulta chalne ke liye `s[-1:-4:-1]`.

```python
s = "PYTHON"
print(s[0], s[-1], s[1:4], s[:3], s[3:], s[-3:])
print(s[::2], s[::-1], repr(s[-1:-4]), s[-1:-4:-1], s[4:100], repr(s[10:]))
```
Output:
```
P N YTH PYT HON HON
PTO NOHTYP '' NOH ON ''
```

**Immutable** = string ko badla nahi ja sakta. `upper()`, `lower()`, `replace()` **nayi string** lautate hain; purani waisi hi rehti hai. Agar result kisi variable me nahi rakha, to wo kho gaya.

```python
s = "PYTHON"
t = s
s.lower()          # result kahin save nahi hua
print(s, t)
w = "banana"
print(w.replace("a", "@"), w.replace("a", "@", 1))
print(w.find("na"), w.rfind("na"), w.find("x"), w.count("a"), w.count("ana"))
print("ab" * 3, "-" * 0 + "x", str(5) + "5", 3 * "2" == "222")
```
Output:
```
PYTHON PYTHON
b@n@n@ b@nana
2 4 -1 3 1
ababab x 55 True
```
- `replace(old, new, k)`: sirf pehle `k` occurrences badlo.
- `find` = pehli occurrence ka index (na mile to `-1`, error nahi); `rfind` = aakhri occurrence.
- `count` **non-overlapping** ginta hai: `"banana"` me `"ana"` index 1 par mila, agla search index 4 se → sirf 1.
- `"ab" * 3` repeat; `"x" * 0` = `""`; `str + int` error hai, isliye `str(5)`.

Dhyan do: `s.upper()` likhne se `s` nahi badalta; `s = s.upper()` likhna padta hai.

### 9. `range`
`range(start, stop, step)` numbers deta hai start se, stop **chhod ke**.
- `range(5)` → 0,1,2,3,4. `range(2, 11, 3)` → 2,5,8. `range(10, 0, -3)` → 10,7,4,1 (0 tak nahi). `range(5, 2)` → khaali.
- Length (jab $b>a$, $k>0$): `len(range(a, b, k))` $=\left\lceil\frac{b-a}{k}\right\rceil$. Example: `range(5, 50, 7)` → $\lceil45/7\rceil=\lceil6.43\rceil=7$ (5,12,19,26,33,40,47).

```python
print(list(range(2, 11, 3)), list(range(10, 0, -3)), list(range(5, 2)), len(range(5, 50, 7)))
```
Output:
```
[2, 5, 8] [10, 7, 4, 1] [] 7
```

Dhyan do: negative step me bhi stop shamil nahi; `range(10, 0, -3)` me $-2$ nahi aata kyunki wo 0 se aage nikal gaya.

### 10. Loops: `break`, `continue`, `else`, aur loop variable
- `break`: loop turant khatam.
- `continue`: is round ka baaki hissa chhodo, agle round par jao.
- `for ... else` / `while ... else`: `else` tab chalta hai jab loop **bina `break` ke** khatam ho (normal end, ya zero baar chala). `break` hua to `else` skip. Isko "**no-break**" padho.
- Loop khatam hone ke baad loop variable me **aakhri value** rehti hai: `for k in range(3)` ke baad `k == 2` (3 nahi). Agar loop ek baar bhi nahi chala, to variable bana hi nahi (use karoge to `NameError`).

```python
for x in [4, 6, 9, 10]:
    if x % 2 == 1:
        print("odd mila", x)
        break
else:
    print("koi odd nahi")

for x in []:
    pass
else:
    print("empty loop, else chala")

for n in range(1, 6):
    if n == 2:
        continue
    if n == 4:
        break
    print(n)

for k in range(3):
    pass
print(k)
```
Output:
```
odd mila 9
empty loop, else chala
1
3
2
```

Dhyan do: `else` ka matlab "agar condition false" nahi hai; loop ke saath iska matlab hai "break nahi hua".

## Solved examples

**Example 1 (MCQ, easy):** Output kya hai?
```python
print(-9 // 4, -9 % 4, 9 % -4, 9 / 3)
```
(A) `-2 -1 1 3.0` (B) `-3 3 -3 3.0` (C) `-3 3 -3 3` (D) `-2 3 -3 3.0`

**Soch:** Negative numbers ke saath `//` aur `%` → floor, phir $r=a-bq$.

**Solution:**
1. $-9/4=-2.25$, floor → $-3$. Remainder $-9-(4)(-3)=-9+12=3$.
2. `9 % -4`: $9/(-4)=-2.25$, floor $-3$; $9-(-4)(-3)=9-12=-3$ (sign divisor jaisa).
3. `9 / 3` → `3.0` (float).
4. **Answer (B):** `-3 3 -3 3.0`.

**Galti kahan hoti hai:** (A): C-style truncation ($-2.25\to-2$) aur remainder $-1$. (C): `/` ko integer maan liya.

**Example 2 (NAT, medium):** Kya print hoga?
```python
print(100 - 2 ** 2 ** 3 // 10 % 7)
```

**Soch:** `**` sabse pehle aur right se left; phir `//`, `%` left se right; phir `-`.

**Solution:**
1. `2 ** 3 = 8`, phir `2 ** 8 = 256`.
2. `256 // 10 = 25`.
3. `25 % 7 = 4`.
4. `100 - 4 = 96`. **Answer: 96.**

**Galti kahan hoti hai:** `(2 ** 2) ** 3 = 64` lena (left se) → `64 // 10 = 6`, `6 % 7 = 6`, answer `94`.

**Example 3 (MCQ, medium):** Output?
```python
print("" or 0 or None, [] and 5, "x" and 0 or "y")
```
(A) `False [] True` (B) `None [] y` (C) `None 5 0` (D) `0 False y`

**Soch:** `and`/`or` operand lautate hain; `and` pehle bandhta hai.

**Solution:**
1. `"" or 0 or None`: koi truthy nahi → aakhri operand `None`.
2. `[] and 5`: `[]` falsy → wahi lautao `[]` (5 dekha hi nahi).
3. `"x" and 0 or "y"` = `("x" and 0) or "y"` = `0 or "y"` = `"y"`.
4. **Answer (B).**

**Galti kahan hoti hai:** (A): `and/or` ko True/False dene wala samajhna. (C): `[] and 5` me doosra operand lautana.

**Example 4 (MSQ, medium):** `s = "MACHINE"`. Kaun se `True` hain?
(A) `s[1:5] == "ACHI"` (B) `s[::-2] == "EIHM"` (C) `s[-2:-6:-1] == "NIHC"` (D) `s[-1:-4] == "ENI"`

**Soch:** Index likh lo: M0 A1 C2 H3 I4 N5 E6 (negative: E−1 N−2 I−3 H−4 C−5 A−6 M−7).

**Solution:**
1. (A) index 1,2,3,4 → A,C,H,I → `"ACHI"` ✓.
2. (B) step −2 from end: 6,4,2,0 → E,I,C,M → `"EICM"` ✗.
3. (C) −2,−3,−4,−5 (stop −6 nahi) → N,I,H,C → `"NIHC"` ✓.
4. (D) step +1 hai, start −1 stop −4 se aage → `""` ✗.
5. **Answer: (A), (C).**

**Galti kahan hoti hai:** (B) me har doosra character "H" ko bhi le lena (index 3 odd hai, nahi aata). (D) ko reverse samajhna — step `-1` ke bina slice ulta nahi chalta.

**Example 5 (MCQ, medium):** Output?
```python
s = 0
for x in [3, 8, 5, 12, 7]:
    if x > 10:
        break
    if x % 2 == 0:
        continue
    s += x
else:
    s += 1000
print(s, x)
```
(A) `15 7` (B) `1008 12` (C) `8 12` (D) `8 5`

**Soch:** `break` hua ya nahi → `else` chalega ya nahi. Trace table banao.

**Solution:**

| x | `x > 10`? | even? | s |
|---|---|---|---|
| 3 | no | no | 3 |
| 8 | no | yes → continue | 3 |
| 5 | no | no | 8 |
| 12 | **yes → break** | — | 8 |

`break` hua, isliye `else` skip; `x` me 12 reh gaya. **Answer (C):** `8 12`.

**Galti kahan hoti hai:** (B): `else` ko "loop ke baad hamesha" maan ke 1000 jodna. (A): `break` ignore karke 7 tak chalna.

**Example 6 (NAT, hard):** Kya print hoga?
```python
i, s = 1, 0
while i < 20:
    s += i
    i *= 3
else:
    s += 100
print(s + i)
```

**Soch:** `while` + `else`, koi `break` nahi → else zaroor chalega. Trace table.

**Solution:**

| round | i (shuru) | s += i | i *= 3 |
|---|---|---|---|
| 1 | 1 | 1 | 3 |
| 2 | 3 | 4 | 9 |
| 3 | 9 | 13 | 27 |
| check | 27 < 20? No → loop khatam | | |

1. Loop normal khatam (break nahi) → `else`: `s = 113`.
2. `s + i = 113 + 27 = 140`. **Answer: 140.**

**Galti kahan hoti hai:** `else` skip karna → `13 + 27 = 40`. Ya `i` ki aakhri value 9 maan lena → `122`.

## Confusions clear karo

**Q:** `//` aur `int(a/b)` me farak kya hai?
**A:** Positive me same. Negative me `//` floor karta hai (left, −3.5 → −4), `int()` 0 ki taraf kaat-ta hai (−3.5 → −3).

**Q:** `%` ka sign kaise pata karun?
**A:** Divisor (doosre number) jaisa. `-7 % 3 = 2` (positive, kyunki 3 positive), `7 % -3 = -2`. Shak ho to $r=a-b\cdot(a//b)$ se nikalo.

**Q:** `x or y` ka answer `True` kyun nahi aata?
**A:** Python me `or` "pehla truthy operand" lautata hai, bool nahi. `0 or "a"` → `"a"`. Sirf `not` aur comparisons pakka `True`/`False` dete hain.

**Q:** `not a == b` ka matlab `(not a) == b` hai?
**A:** Nahi. `not` ki precedence `==` se kam hai, isliye `not (a == b)`.

**Q:** `s[-1:-4]` ulti string kyun nahi deta?
**A:** Default step `+1` hai, yaani aage chalo. Start (−1, aakhri) se aage chal ke stop (−4) kabhi nahi aata, isliye khaali. Ulta chahiye to `s[-1:-4:-1]`.

**Q:** `s.upper()` likha phir bhi `s` nahi badla?
**A:** Strings immutable hain. Method nayi string lautata hai; `s = s.upper()` likhna padega.

**Q:** Loop ka `else` kab chalta hai?
**A:** Jab loop bina `break` ke khatam ho — chahe ek baar bhi na chala ho. `break` hua → `else` nahi.

**Q:** `for k in range(3)` ke baad `k` kya hai?
**A:** `2` — aakhri value jo assign hui. `range(3)` me 3 hai hi nahi.

## Khud try karo

**1.** `print(divmod(-23, 6), 23 % -6)` ka output?

<details><summary>Answer dekho</summary>

- $-23/6=-3.83$ → floor $-4$; remainder $-23-6(-4)=1$ → `(-4, 1)`.
- $23/(-6)=-3.83$ → floor $-4$; remainder $23-(-6)(-4)=23-24=-1$.

Output: `(-4, 1) -1`

</details>

**2.** `len(range(3, 40, 6))` aur `list(range(20, 2, -5))`?

<details><summary>Answer dekho</summary>

- $\lceil(40-3)/6\rceil=\lceil6.17\rceil=$ **7** (3, 9, 15, 21, 27, 33, 39).
- `[20, 15, 10, 5]` (agla 0 hota, jo stop 2 ko paar kar gaya, isliye ruk jao).

</details>

**3.** `s = "statistics"`. `print(s[::3], s[-4:], s.find("t") + s.count("s") * 10)`?

<details><summary>Answer dekho</summary>

Index: s0 t1 a2 t3 i4 s5 t6 i7 c8 s9.
- `s[::3]` → 0,3,6,9 → `stts`.
- `s[-4:]` → aakhri 4 → `tics`.
- `find("t") = 1`, `count("s") = 3` → $1+30=31$.

Output: `stts tics 31`

</details>

**4.** `print(bool("False"), bool(0.0), [0] or 5, None or 0)`?

<details><summary>Answer dekho</summary>

- `"False"` non-empty string → `True`.
- `0.0` → `False`.
- `[0]` truthy → `[0]` lautao.
- `None` falsy, aakhri operand `0`.

Output: `True False [0] 0`

</details>

**5.** Is code ke baad `k` kya print hoga?
```python
for k in range(1, 8, 2):
    pass
print(k)
```

<details><summary>Answer dekho</summary>

Values 1, 3, 5, 7 (9 stop 8 se aage). Aakhri assign = **7**.

</details>

## Ek page me
- `/` hamesha float; `2 ** -1 == 0.5`; float operand ho to `//`, `%` bhi float.
- `//` = floor (left ki taraf); `%` ka sign divisor jaisa; `a == (a//b)*b + a%b` hamesha.
- `-7 // 2 == -4`, `-7 % 2 == 1`, `7 // -2 == -4`, `7 % -2 == -1`, `divmod(-17, 5) == (-4, 3)`.
- `**` right se left aur unary minus se pehle: `-3 ** 2 == -9`, `2 ** 3 ** 2 == 512`.
- Precedence: `**` > unary `-` > `* / // %` > `+ -` > comparisons > `not` > `and` > `or`.
- Chaining: `a < b == c` = `a < b and b == c`; `==` value, `is` same object.
- Falsy: `0, 0.0, "", [], (), {}, set(), None, False`; baaki sab truthy (`[0]`, `"0"`). `True == 1`.
- `or` → pehla truthy (ya aakhri); `and` → pehla falsy (ya aakhri); short-circuit.
- `0.1 + 0.2 == 0.3` → `False`.
- Slice stop excluded, out-of-range clamp, error nahi; `s[::-1]` reverse; `s[-1:-4]` khaali.
- Strings immutable; methods nayi string dete hain; `count` non-overlapping; `find` na mile to −1.
- `len(range(a,b,k)) = ⌈(b−a)/k⌉`; loop-else = "no break"; loop ke baad variable me aakhri value.

Revision ke liye **Short note** tab dekho.
