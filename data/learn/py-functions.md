# Functions, recursion, scope and closures

> **Time:** ~40 min · **Pehle aana chahiye:** Python basics (variables, `if`, `for`, `print`, lists) — Day 25 wala lesson · **Day:** 26

## Ye topic kyun?
Functions code ko chhote, dobara use hone wale tukdon me baant-te hain, aur recursion (function ka khud ko call karna) trees, divide-and-conquer aur DP ki neev hai. GATE DA me yahan se "output kya hoga" aur "kitni calls hongi" type ke MCQ/NAT aate hain (1–2 marks): recursive function ko trace karna, calls ginna, mutable default argument ka trap, `global`/`nonlocal` scope, aur closures (lambda in a loop). Har question ek chhota sa rule test karta hai — rule pata hai to 2 minute ka kaam.

## Picture se samjho
Recursion ko **seedhiyon** jaisa socho. Har call ek seedhi neeche utarti hai aur wahan ruk kar intezaar karti hai jab tak andar wali call poori na ho jaaye. Sabse neeche (base case) pahunch kar, sab wapas upar chadhte hain — **ulte order me**.

<figure class="fig">
<svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="pyf-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<rect x="40" y="10" width="170" height="30" fill="none" stroke="currentColor"/>
<rect x="70" y="55" width="170" height="30" fill="none" stroke="currentColor"/>
<rect x="100" y="100" width="170" height="30" fill="none" stroke="currentColor"/>
<rect x="130" y="145" width="170" height="30" fill="none" style="stroke:var(--good)"/>
<text x="48" y="30" font-size="11" fill="currentColor">show(3): print 3 … print 3</text>
<text x="78" y="75" font-size="11" fill="currentColor">show(2): print 2 … print 2</text>
<text x="108" y="120" font-size="11" fill="currentColor">show(1): print 1 … print 1</text>
<text x="138" y="165" font-size="11" style="fill:var(--good)">show(0): base, return</text>
<line x1="30" y1="40" x2="62" y2="66" style="stroke:var(--info)" stroke-width="2" marker-end="url(#pyf-a)"/>
<line x1="60" y1="85" x2="92" y2="111" style="stroke:var(--info)" stroke-width="2" marker-end="url(#pyf-a)"/>
<line x1="90" y1="130" x2="122" y2="156" style="stroke:var(--info)" stroke-width="2" marker-end="url(#pyf-a)"/>
<line x1="305" y1="150" x2="278" y2="124" style="stroke:var(--mark)" stroke-width="2" marker-end="url(#pyf-a)"/>
<line x1="275" y1="105" x2="248" y2="79" style="stroke:var(--mark)" stroke-width="2" marker-end="url(#pyf-a)"/>
<line x1="245" y1="60" x2="218" y2="34" style="stroke:var(--mark)" stroke-width="2" marker-end="url(#pyf-a)"/>
<text x="5" y="195" font-size="11" style="fill:var(--info)">neeche jaate: 3 2 1</text>
<text x="255" y="20" font-size="11" style="fill:var(--mark)">upar aate:</text>
<text x="255" y="34" font-size="11" style="fill:var(--mark)">1 2 3</text>
</svg>
<figcaption>show(n) recursive call se pehle aur baad me n print karta hai. Pehle wale print neeche jaate waqt (3 2 1), baad wale wapas aate waqt (1 2 3) chalte hain.</figcaption>
</figure>

Dhyan do: `show(3)` ka doosra `print` tab tak nahi chalta jab tak `show(2)` (aur uske andar sab kuch) poora na ho. Isliye output `3 2 1 1 2 3` hai, `3 2 1 3 2 1` nahi.

Doosri picture: jab ek function khud ko **do baar** call kare, calls ek **tree** banati hain. "Kitni calls hui?" = "tree me kitne nodes hain?"

<figure class="fig">
<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
<line x1="165.6" y1="34" x2="114.4" y2="66" stroke="currentColor"/>
<line x1="194.9" y1="33.3" x2="255.1" y2="66.7" stroke="currentColor"/>
<line x1="89.4" y1="88.3" x2="70.6" y2="111.7" stroke="currentColor"/>
<line x1="110.6" y1="88.3" x2="129.4" y2="111.7" stroke="currentColor"/>
<line x1="261.3" y1="89.6" x2="248.7" y2="110.4" stroke="currentColor"/>
<line x1="278.7" y1="89.6" x2="291.3" y2="110.4" stroke="currentColor"/>
<line x1="51.3" y1="139.6" x2="38.7" y2="160.4" stroke="currentColor"/>
<line x1="68.7" y1="139.6" x2="81.3" y2="160.4" stroke="currentColor"/>
<circle cx="180" cy="25" r="17" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<circle cx="100" cy="75" r="17" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<circle cx="270" cy="75" r="17" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<circle cx="60" cy="125" r="17" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<circle cx="140" cy="125" r="17" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<circle cx="240" cy="125" r="17" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<circle cx="300" cy="125" r="17" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<circle cx="30" cy="175" r="17" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<circle cx="90" cy="175" r="17" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<text x="168" y="29" font-size="11" fill="currentColor">f(4)</text>
<text x="88" y="79" font-size="11" fill="currentColor">f(3)</text>
<text x="258" y="79" font-size="11" fill="currentColor">f(2)</text>
<text x="48" y="129" font-size="11" fill="currentColor">f(2)</text>
<text x="128" y="129" font-size="11" fill="currentColor">f(1)</text>
<text x="228" y="129" font-size="11" fill="currentColor">f(1)</text>
<text x="288" y="129" font-size="11" fill="currentColor">f(0)</text>
<text x="18" y="179" font-size="11" fill="currentColor">f(1)</text>
<text x="78" y="179" font-size="11" fill="currentColor">f(0)</text>
<text x="200" y="185" font-size="12" fill="currentColor">nodes = 9 calls</text>
</svg>
<figcaption>Naive Fibonacci fib(4) ka call tree. Blue = andar se aur calls karne wale, green = base case (n &lt; 2). Top call aur base calls dono gine jaate hain: kul 9.</figcaption>
</figure>

Dhyan do: `f(2)` do baar alag-alag compute hua — isi repeat kaam ki wajah se naive recursion slow hai, aur memoisation (yaad rakhna) isse bachata hai.

Teesri picture: variable dhoondhne ke liye Python andar se bahar ki taraf boxes me dekhta hai — **LEGB**.

<figure class="fig">
<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="340" height="180" rx="8" fill="none" style="stroke:var(--muted)"/>
<rect x="30" y="35" width="300" height="145" rx="8" fill="none" style="stroke:var(--info)"/>
<rect x="50" y="60" width="260" height="110" rx="8" fill="none" style="stroke:var(--mark)"/>
<rect x="70" y="85" width="220" height="70" rx="8" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<text x="18" y="27" font-size="11" fill="currentColor">B: Built-in (len, print, sum …)</text>
<text x="38" y="52" font-size="11" style="fill:var(--info)">G: Global (file ke top level par)</text>
<text x="58" y="77" font-size="11" style="fill:var(--mark)">E: Enclosing (bahar wala function)</text>
<text x="78" y="105" font-size="11" style="fill:var(--good)">L: Local (abhi chal raha function)</text>
<text x="78" y="135" font-size="11" fill="currentColor">naam dhoondho: L → E → G → B</text>
</svg>
<figcaption>LEGB: naam pehle Local me dhoondha jaata hai, na mile to Enclosing, phir Global, phir Built-in. Jo pehle mila wahi use hota hai.</figcaption>
</figure>

## Concept step-by-step

### 1. Function, parameters, return
`def f(a, b):` ek function banata hai. `a`, `b` **parameters** hain (input ke naam). `return x` value wapas bhejta hai aur function wahin khatam. Agar `return` hi na ho, function `None` lautata hai.

```python
def area(l, w=1):
    return l * w

def greet(name):
    print("hi", name)

print(area(3, 4), area(5), area(w=2, l=7))
r = greet("A")
print(r)
```
Output:
```
12 5 14
hi A
None
```
`w=1` ek **default argument** hai: call me na diya to 1 use hoga. `area(w=2, l=7)` me naam se (keyword) values di.

Dhyan do: `print` screen par dikhata hai, `return` value lautata hai. Ye dono alag cheezen hain.

### 2. Recursion ka structure aur call stack
Recursive function = jo khud ko chhote input par call kare. Do hisse zaroori:
1. **Base case**: jahan bina recursion seedha answer milta hai (warna infinite).
2. **Recursive case**: problem ko chhota karke khud ko call karo.

Har call ka apna alag "kaagaz" (stack frame) hota hai jisme uske apne `n` aur local variables hain. Jab andar wali call return karti hai, bahar wali call **wahi se aage** chalti hai jahan ruki thi.

**Values nikalne ka tarika: bottom-up table.** Base case se shuru karke upar ki values bharo.

```python
def f(n):
    if n <= 1:
        return n
    return f(n - 1) + 2 * f(n - 2)

print([f(k) for k in range(6)])
```
Output:
```
[0, 1, 1, 3, 5, 11]
```
Table: $f(0)=0$, $f(1)=1$, $f(2)=f(1)+2f(0)=1$, $f(3)=f(2)+2f(1)=3$, $f(4)=3+2\cdot1=5$, $f(5)=5+2\cdot3=11$.

Dhyan do: top-down call kholne ki jagah bottom-up table banao — kam galti hoti hai.

### 3. Recursive call se pehle vs baad me likhi lines
- Call se **pehle** wali lines: neeche jaate waqt chalti hain (order: $n, n-1, \dots$).
- Call ke **baad** wali lines: wapas aate waqt chalti hain (ulta order: $\dots, n-1, n$).

```python
def show(n):
    if n == 0:
        return
    print(n, end=" ")
    show(n - 1)
    print(n, end=" ")

show(3)
```
Output:
```
3 2 1 1 2 3 
```

Accumulator wala pattern (result ek parameter me banta jaata hai) — number ko ulta karna:

```python
def rev(n, acc=0):
    if n == 0:
        return acc
    return rev(n // 10, acc * 10 + n % 10)

print(rev(1203), rev(450))
```
Output:
```
3021 54
```
Trace `rev(450)`: (450, 0) → (45, 0) → (4, 5) → (0, 54) → 54. Ulta karne par aage ke zero gayab ("054" = 54).

List banane wala pattern — pehle chhota answer lo, phir usme jodo:

```python
def binary(n):
    if n < 2:
        return str(n)
    return binary(n // 2) + str(n % 2)

print(binary(13), binary(6))
```
Output:
```
1101 110
```
`binary(13)` = `binary(6) + "1"` = `(binary(3) + "0") + "1"` = `"1" + "1" + "0" + "1"`.

Dhyan do: string/list jodne ka order code me jo likha hai wahi; `binary(n//2)` pehle likha hai isliye uske digits aage aate hain.

### 4. Calls ginna: recurrence aur tree
Agar counter function ke **top par** badhta hai, to
$$C(n)=1+\sum C(\text{har sub-call}),$$
jahan "1" is call khud ki hai. Base case bhi ek call hai: $C(\text{base})=1$.

- **Naive Fibonacci** (`fib(n-1) + fib(n-2)`, base $n<2$): $C(n)=1+C(n-1)+C(n-2)$, $C(0)=C(1)=1$. Values: 1, 1, 3, 5, 9, 15, 25, … Pattern $C(n)=2F(n+1)-1$ (jahan $F$ = Fibonacci 0,1,1,2,3,5,8). `fib(5)`: $2\cdot8-1=15$.
- **$T(n)=2T(n-1)+1$, $T(0)=0$** (jaise `star(n-1); print("*"); star(n-1)` me stars): $T(1)=1$, $T(2)=3$, $T(3)=7$ → $T(n)=2^n-1$. Kyun: $T(n)+1=2(T(n-1)+1)$, har step double. `star(4)` → 15 stars.
- **Halving chain** `d(n) = d(n // 2) + 1`, base `n == 0`: calls $n, \lfloor n/2\rfloor, \dots, 1, 0$. $1$ tak pahunchne me $\lfloor\log_2 n\rfloor$ halvings, plus shuru wali call aur 0 wali call → $\lfloor\log_2n\rfloor+2$ calls. `d(100)`: $100,50,25,12,6,3,1,0$ = 8 calls, return value 7.

```python
count = 0
def fib(n):
    global count
    count += 1
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

fib(5)
print(count)
```
Output:
```
15
```

Dhyan do: top call aur base-case calls bhoolna sabse common galti hai. Shak ho to tree bana ke nodes gino.

### 5. Memoisation me calls
**Memo** = ek dict jisme already nikale answers save hain. Agar counter top par hai, to cache **hit** wali call bhi gini jaati hai (function me enter to hua, bas turant return kiya).

```python
calls = 0
memo = {}
def f(n):
    global calls
    calls += 1
    if n in memo:
        return memo[n]
    memo[n] = n if n < 2 else f(n - 1) + f(n - 2)
    return memo[n]

print(f(6), calls)
```
Output:
```
8 11
```
Kyun 11: $n=6,5,4,3,2$ — har ek ek baar compute hota hai aur 2 calls karta hai ($2\times5=10$), plus top call 1 = 11. General: $2n-1$ (for $n\ge1$). `f(10)` → 19.

Dhyan do: memo hit "free" nahi hai agar question "function kitni baar call hua" pooch raha hai.

### 6. Mutable default argument (bada trap)
Default value **sirf ek baar** banti hai — jab `def` line chalti hai, har call par nahi. Agar default ek list/dict hai aur function use badalta hai (`append`), to wahi ek list har us call me share hoti hai jo argument nahi deti. Ye list `f.__defaults__` me rehti hai.

```python
def add(x, bag=[]):
    bag.append(x)
    return bag

a = add(1)
b = add(2)
c = add(3, [])
print(a, b, c, a is b)
print(add.__defaults__)
```
Output:
```
[1, 2] [1, 2] [3] True
([1, 2],)
```
`a` aur `b` dono **wahi ek default list** hain, isliye print ke time dono `[1, 2]`. `c` ko nayi list mili.

**Safe tarika:** default `None` rakho aur andar nayi list banao:

```python
def add2(x, bag=None):
    if bag is None:
        bag = []
    bag.append(x)
    return bag

def addt(x, acc=()):
    acc += (x,)
    return acc

print(add2(1), add2(2), addt(1), addt(2))
```
Output:
```
[1] [2] (1,) (2,)
```
Tuple immutable hai: `acc += (x,)` ek **naya tuple** banake local naam `acc` ko de deta hai; default `()` waisa hi rehta hai.

Dhyan do: list par `+=` / `append` same object badalte hain; tuple par `+=` naya object banata hai.

### 7. Scope: LEGB aur "assignment = local"
Function ke andar naam padhne par Python LEGB order me dhoondhta hai. Lekin ek bahut zaroori rule: **agar function me kahin bhi kisi naam ko assign kiya (`x = ...`, `x += ...`, `for x in`), to wo naam us poore function me local hai** — assignment se pehle wali line par bhi.

```python
x = 5
def f():
    print(x)
    x = 10

f()
```
Ye `5` print nahi karta; `UnboundLocalError` deta hai (Python 3.15 ka message: `cannot access local variable 'x' where it is not associated with a value`). Kyunki `x = 10` ki wajah se `x` local hai, aur `print(x)` ke waqt local `x` me abhi koi value nahi.

Builtin ko shadow karna sirf us function me asar karta hai:

```python
def g():
    len = lambda s: 0
    return len("abc")

print(g(), len("abc"))
```
Output:
```
0 3
```

Loop variable vs comprehension variable:

```python
def h():
    for i in range(3):
        pass
    sq = [j * j for j in range(3)]
    return i, sq, "j" in locals()

print(h())
```
Output:
```
(2, [0, 1, 4], False)
```
`for` ka `i` loop ke baad bhi hai (2). Comprehension ka `j` bahar leak nahi hota.

Dhyan do: `NameError` = naam kahin mila hi nahi; `UnboundLocalError` = naam local hai par abhi value nahi aayi.

### 8. `global` aur `nonlocal`
- `global x`: is function me `x` ka matlab **module (file) level** wala `x`. Assignment usi ko badlega. (Nested function me bhi `global` hamesha module level hai, enclosing function nahi.)
- `nonlocal x`: `x` = **sabse paas wala enclosing function** ka variable. Agar koi enclosing function hi nahi (top-level function me `nonlocal`) → `SyntaxError`.

```python
x = "g"
def outer():
    x = "o"
    def inner():
        nonlocal x
        x = "i"
    def other():
        global x
        x = "G"
    inner()
    other()
    return x

r = outer()
print(r, x)
```
Output:
```
i G
```
`inner` ne `outer` ka `x` badla ("i"); `other` ne module ka `x` badla ("G").

Dhyan do: `global` ko "ek level bahar" mat samjho — wo seedha sabse bahar (module) jaata hai.

### 9. Closures aur late binding
**Closure** = andar wala function jo bahar wale function ke variable ko yaad rakhta hai, bahar wala function khatam hone ke baad bhi. Do rules:
1. **Late binding:** closure variable ki value **call ke waqt** dekhta hai, banate waqt nahi.
2. Bahar wale function ki **har call** variables ka naya set banati hai.

```python
fs = [lambda: i * i for i in range(4)]
print([f() for f in fs])

gs = [lambda i=i: i * i for i in range(4)]
print([g() for g in gs])
```
Output:
```
[9, 9, 9, 9]
[0, 1, 4, 9]
```
Pehli line: chaaron lambdas ek hi `i` ko dekhte hain; call ke waqt `i` = 3 (aakhri value), isliye sab 9. Doosri line: `i=i` default argument hai — default `def`/lambda banate waqt evaluate hota hai, isliye har lambda ne us waqt ka `i` freeze kar liya.

```python
def make():
    c = 0
    def step():
        nonlocal c
        c += 2
        return c
    return step

s1 = make()
s2 = make()
s1(); s1()
print(s1(), s2())
```
Output:
```
6 2
```
`s1` aur `s2` ke alag `c` hain (do alag `make()` calls).

Late binding enclosing function ke andar bhi:

```python
def multiplier(k):
    def m(x):
        return x * k
    k += 1
    return m

print(multiplier(2)(10))
```
Output:
```
30
```
`m` call hua tab tak `k` 3 ho chuka tha.

Dhyan do: closure "value" nahi, "variable" pakadta hai. Freeze karna hai to `i=i`.

## Solved examples

**Example 1 (NAT, easy):** Kya print hoga?
```python
def g(n):
    if n <= 2:
        return 1
    return g(n - 1) + g(n - 3) * 2

print(g(6))
```

**Soch:** Value nikalni hai → base case se bottom-up table.

**Solution:**
1. $g(0)=g(1)=g(2)=1$.
2. $g(3)=g(2)+2g(0)=1+2=3$.
3. $g(4)=g(3)+2g(1)=3+2=5$.
4. $g(5)=g(4)+2g(2)=5+2=7$.
5. $g(6)=g(5)+2g(3)=7+6=$ **13**.

**Galti kahan hoti hai:** $g(n-3)$ ki jagah $g(n-2)$ padh lena, ya `* 2` ko poore jod par lagana ($(g(5)+g(3))\cdot2=20$).

**Example 2 (MCQ, medium):** Output?
```python
def r(n):
    if n > 0:
        print(n, end=" ")
        r(n - 2)
        print(n * 10, end=" ")

r(5)
```
(A) `5 3 1 10 30 50` (B) `5 3 1 50 30 10` (C) `5 50 3 30 1 10` (D) `5 3 1 -1 10 30 50`

**Soch:** Ek print call se pehle, ek baad me → pehle wale neeche jaate, baad wale ulte order me.

**Solution:**
1. Calls: $r(5)\to r(3)\to r(1)\to r(-1)$ (base, kuch nahi karta).
2. Neeche jaate: `5 3 1`.
3. Wapas aate (pehle $r(1)$ khatam, phir $r(3)$, phir $r(5)$): `10 30 50`.
4. **Answer (A).**

**Galti kahan hoti hai:** (B): baad wale prints ko bhi call order me padhna. (C): socha ki doosra print turant chalta hai. (D): `r(-1)` ko print karne wala maana — par `n > 0` false hai.

**Example 3 (NAT, medium):** Kya print hoga?
```python
count = 0
def t(n):
    global count
    count += 1
    if n <= 0:
        return
    t(n - 1)
    t(n - 2)

t(4)
print(count)
```

**Soch:** Counter top par → $C(n)=1+C(n-1)+C(n-2)$, base ($n\le0$) = 1 call.

**Solution:**
1. $C(0)=C(-1)=1$.
2. $C(1)=1+C(0)+C(-1)=3$.
3. $C(2)=1+C(1)+C(0)=1+3+1=5$.
4. $C(3)=1+5+3=9$.
5. $C(4)=1+9+5=$ **15**.

**Galti kahan hoti hai:** Base calls (n = 0, −1) ko na ginna, ya top call ka "1" bhoolna.

**Example 4 (MCQ, medium):** Output?
```python
def log(msg, history=[]):
    history.append(msg)
    return len(history)

a = log("x")
b = log("y", [])
c = log("z")
print(a, b, c)
```
(A) `1 1 1` (B) `1 2 3` (C) `1 1 2` (D) `1 1 3`

**Soch:** Mutable default list → jo calls argument nahi deti, wo ek hi list share karti hain.

**Solution:**
1. `log("x")`: default list `["x"]`, return 1.
2. `log("y", [])`: nayi list `["y"]`, return 1. Default list ko chhua nahi.
3. `log("z")`: default list `["x", "z"]`, return 2.
4. **Answer (C).**

**Galti kahan hoti hai:** (A): default har call par naya maanna. (D): `"y"` ko bhi default list me maanna.

**Example 5 (MCQ, hard):** Output?
```python
x = 1
def outer():
    x = 2
    def inner():
        global x
        x = x + 10
        return x
    y = inner()
    return x + y

print(outer(), x)
```
(A) `24 1` (B) `13 11` (C) `22 1` (D) `13 1`

**Soch:** `global` hamesha module level → `inner` module wala `x` (1) padhta aur badalta hai, `outer` ka `x` (2) nahi.

**Solution:**
1. `inner`: global `x = 1 + 10 = 11`, return 11. Ab module `x` = 11.
2. `outer` ka apna local `x` abhi bhi 2. Return $2+11=13$.
3. `print(outer(), x)`: `outer()` pehle evaluate hota hai → 13, phir `x` → 11.
4. **Answer (B).**

**Galti kahan hoti hai:** (A): `global` ko enclosing samajhna → `x = 12`, return $12+12=24$. (D): `print` me `x` ki purani value 1 lena, jabki `outer()` pehle chal chuka hai.

**Example 6 (NAT, hard):** Kya print hoga?
```python
def counter(start):
    def nxt():
        nonlocal start
        start += 3
        return start
    return nxt

a = counter(1)
b = counter(10)
a(); a()
fs = [lambda: k * 2 for k in range(1, 4)]
print(a() + b() + sum(f() for f in fs))
```

**Soch:** Do alag `counter` calls → alag `start`. Lambda list → late binding.

**Solution:**
1. `a`: start 1 → 4 → 7 (do calls). Teesri `a()` → 10.
2. `b`: apna start 10 → `b()` = 13.
3. `fs`: teeno lambdas ek `k` dekhte hain, aakhri value 3 → har ek 6, sum 18.
4. Total $10+13+18=$ **41**.

**Galti kahan hoti hai:** `fs` ko 2, 4, 6 maanna (sum 12) → 35. Ya `a` aur `b` ka ek hi `start` maanna.

## Confusions clear karo

**Q:** Recursion me "baad wali line" kab chalti hai?
**A:** Jab us line se pehle wali recursive call **poori** (uske andar ki saari calls samet) return kar de. Isliye baad wali lines sabse andar wali call se shuru hoke bahar ki taraf chalti hain.

**Q:** Calls ginte waqt base case gina jaata hai?
**A:** Haan. Base case bhi function me enter karta hai. Tree ke saare nodes = calls, leaves (base) bhi.

**Q:** Default argument har call par naya kyun nahi banta?
**A:** Default expression `def` line chalne par ek hi baar evaluate hota hai aur function object ke saath save ho jaata hai. Immutable (number, tuple, string) me farak nahi padta; list/dict ko badla to badlav agli call me dikhega.

**Q:** `x = 5` global hai, function me `print(x)` phir `x = 10` — 5 kyun nahi print hota?
**A:** Python function chalne se pehle hi dekh leta hai ki `x` me assignment hai, isliye `x` poore function me local hai. `print(x)` ke waqt local `x` khaali hai → `UnboundLocalError`.

**Q:** `global` aur `nonlocal` me kya farak hai?
**A:** `global` → file ka top-level variable. `nonlocal` → sabse paas wale bahar ke function ka variable. Top-level function me `nonlocal` likhna `SyntaxError` hai.

**Q:** `[lambda: i for i in range(4)]` me sab 3 kyun deti hain?
**A:** Lambda `i` ka naam yaad rakhta hai, value nahi. Call ke waqt `i` ki value 3 hai. `lambda i=i: i` likhoge to har lambda banate waqt ki value default me save hogi.

**Q:** Memo lagane se calls kitni kam hoti hain?
**A:** Fibonacci me naive $2F(n+1)-1$ (exponential) se ghat kar $2n-1$ (linear) ho jaati hain, agar counter top par hai. `fib(10)`: 177 vs 19.

## Khud try karo

**1.** Kya print hoga?
```python
calls = 0
def d(n):
    global calls
    calls += 1
    return 0 if n == 0 else d(n // 2) + 1

print(d(37), calls)
```

<details><summary>Answer dekho</summary>

Chain: 37 → 18 → 9 → 4 → 2 → 1 → 0. Calls = 7 ($\lfloor\log_2 37\rfloor+2=5+2$). Return: 0 wali call 0 deti hai, baaki 6 har ek +1 → 6.

Output: `6 7`

</details>

**2.** `star(5)` kitne `*` print karega?
```python
def star(n):
    if n > 0:
        star(n - 1)
        print("*", end="")
        star(n - 1)
```

<details><summary>Answer dekho</summary>

$T(n)=2T(n-1)+1$, $T(0)=0$ → $T(n)=2^n-1$. $T(5)=$ **31**.

</details>

**3.** Kya hoga? Aur ise kaise theek karoge?
```python
total = 0
def add(v):
    total += v
    return total

add(5)
```

<details><summary>Answer dekho</summary>

`total += v` assignment hai, isliye `total` local ban gaya; padhne ke waqt local me value nahi → **`UnboundLocalError`**.
Fix: function ke andar pehli line `global total` likho. Tab `add(5)` 5 lautayega aur module ka `total` 5 ho jaayega.

</details>

**4.** Output?
```python
def push(v, s=[]):
    s.append(v)
    return s

x = push(1)
y = push(2, [])
z = push(3)
print(x, y, z, x is z)
```

<details><summary>Answer dekho</summary>

`x` aur `z` default list hain: `[1, 3]`. `y` = `[2]`.

Output: `[1, 3] [2] [1, 3] True`

</details>

**5.** Output?
```python
fs = [lambda x, i=i: x * i for i in range(1, 4)]
gs = [lambda x: x * i for i in range(1, 4)]
print(fs[0](5) + gs[0](5))
```

<details><summary>Answer dekho</summary>

`fs[0]`: `i` freeze = 1 → $5\cdot1=5$. `gs[0]`: late binding, `i` = 3 → 15. Total **20**.

</details>

## Ek page me
- `return` na ho to function `None` lautata hai; `print` ≠ `return`.
- Recursive call se pehle wali lines neeche jaate chalti hain, baad wali wapas aate (ulta order): `n … 1 1 … n`.
- Values ke liye base case se bottom-up table banao.
- Calls: $C(n)=1+\sum C(\text{sub})$; top call aur base calls dono gino (tree ke nodes).
- Naive fib calls $2F(n+1)-1$ (fib(5): 15); $T(n)=2T(n-1)+1 \Rightarrow 2^n-1$; halving chain $\lfloor\log_2n\rfloor+2$.
- Memo + counter top par: hits bhi gine jaate; fib(n) → $2n-1$ calls.
- Default argument ek baar (def time) banta hai; mutable default share hota hai (`f.__defaults__`); fix: `acc=None`.
- Tuple default par `+=` naya tuple banata hai, default nahi badalta.
- LEGB; function me kahin bhi assignment ⇒ poore function me local ⇒ pehle padha to `UnboundLocalError`.
- `global` → module; `nonlocal` → nearest enclosing function (na ho to `SyntaxError`).
- Closures late-binding: `[lambda: i for i in range(k)]` sab `k-1` use karte; `i=i` se freeze.
- Outer function ki har call naye enclosed variables; `for` variable leak hota, comprehension variable nahi.

Revision ke liye **Short note** tab dekho.
