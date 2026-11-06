# Stacks, queues and linked lists

> **Time:** ~35 min · **Pehle aana chahiye:** basic Python (list, `for`/`while` loop, function) · **Day:** 29, 35

## Ye topic kyun?

Stack, queue aur linked list sabse basic data structures hain — baaki sab (trees, graphs, BFS/DFS, recursion) inhi par khade hain. GATE DA me inke questions mostly **trace** wale hote hain: "operations ke baad kya print hua?", "stack ka maximum size kitna gaya?", "kaunsa pop order possible hai?", "ye linked-list code kya return karega?". Ye 1–2 mark ke MCQ/MSQ/NAT hote hain, aur agar aap har step likhte ho to almost guaranteed marks hain.

## Picture se samjho

Socho ek canteen me plates ek ke upar ek rakhi hain. Nayi plate **upar** rakhte ho, aur uthate bhi **upar** se ho. Sabse last me rakhi plate sabse pehle uthti hai — ye **stack** hai. Ab ticket counter ki line socho: jo pehle aaya wo pehle jaata hai, naya banda **peeche** judta hai — ye **queue** hai.

<figure class="fig">
<svg viewBox="0 0 520 225" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="lin-a1" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" style="fill:currentColor"/></marker></defs>
<rect x="60" y="160" width="100" height="36" style="fill:none;stroke:currentColor"/>
<rect x="60" y="124" width="100" height="36" style="fill:none;stroke:currentColor"/>
<rect x="60" y="88" width="100" height="36" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<text x="110" y="183" text-anchor="middle" style="fill:currentColor">2</text>
<text x="110" y="147" text-anchor="middle" style="fill:currentColor">9</text>
<text x="110" y="111" text-anchor="middle" style="fill:currentColor">4</text>
<text x="168" y="111" style="fill:var(--info)">← top</text>
<text x="168" y="183" style="fill:var(--muted)">← bottom</text>
<line x1="85" y1="40" x2="85" y2="84" style="stroke:var(--good)" marker-end="url(#lin-a1)"/>
<line x1="135" y1="84" x2="135" y2="40" style="stroke:var(--bad)" marker-end="url(#lin-a1)"/>
<text x="80" y="32" text-anchor="end" style="fill:var(--good)">push</text>
<text x="140" y="32" style="fill:var(--bad)">pop</text>
<text x="110" y="216" text-anchor="middle" style="fill:currentColor">Stack (LIFO)</text>
<rect x="270" y="110" width="50" height="36" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<rect x="320" y="110" width="50" height="36" style="fill:none;stroke:currentColor"/>
<rect x="370" y="110" width="50" height="36" style="fill:none;stroke:currentColor"/>
<rect x="420" y="110" width="50" height="36" style="fill:none;stroke:currentColor"/>
<text x="295" y="133" text-anchor="middle" style="fill:currentColor">10</text>
<text x="345" y="133" text-anchor="middle" style="fill:currentColor">20</text>
<text x="395" y="133" text-anchor="middle" style="fill:currentColor">30</text>
<text x="445" y="133" text-anchor="middle" style="fill:currentColor">40</text>
<line x1="268" y1="128" x2="228" y2="128" style="stroke:var(--bad)" marker-end="url(#lin-a1)"/>
<line x1="515" y1="128" x2="474" y2="128" style="stroke:var(--good)" marker-end="url(#lin-a1)"/>
<text x="248" y="100" text-anchor="middle" style="fill:var(--bad)">dequeue</text>
<text x="490" y="100" text-anchor="middle" style="fill:var(--good)">enqueue</text>
<text x="295" y="166" text-anchor="middle" style="fill:var(--info)">front</text>
<text x="445" y="166" text-anchor="middle" style="fill:var(--info)">rear</text>
<text x="370" y="216" text-anchor="middle" style="fill:currentColor">Queue (FIFO)</text>
</svg>
<figcaption>Stack: push aur pop dono top par. Queue: enqueue rear par, dequeue front se.</figcaption>
</figure>

Notice karo: stack me ek hi "darwaza" hai (top), isliye jo last aaya wo first jaata hai — **LIFO** (Last In First Out). Queue me do darwaze hain: andar peeche se, bahar aage se — **FIFO** (First In First Out). Stack me abhi pop karoge to 4 niklega; queue se dequeue karoge to 10.

Ab **linked list**. Array me elements memory me lagataar baithte hain, isliye `a[5]` seedha mil jaata hai. Linked list me har element ek alag dabba (**node**) hai, jisme do cheezein hain: value, aur agle node ka address (**`next` pointer**). Dabbe memory me kahin bhi ho sakte hain; sirf arrows unhe jodte hain.

<figure class="fig">
<svg viewBox="0 0 520 120" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="lin-a2" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" style="fill:currentColor"/></marker></defs>
<text x="20" y="75" style="fill:var(--info)">head</text>
<line x1="56" y1="70" x2="78" y2="70" style="stroke:var(--info)" marker-end="url(#lin-a2)"/>
<rect x="80" y="50" width="50" height="40" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<rect x="130" y="50" width="30" height="40" style="fill:none;stroke:currentColor"/>
<text x="105" y="75" text-anchor="middle" style="fill:currentColor">7</text>
<circle cx="145" cy="70" r="3" style="fill:currentColor"/>
<line x1="145" y1="70" x2="198" y2="70" style="stroke:currentColor" marker-end="url(#lin-a2)"/>
<rect x="200" y="50" width="50" height="40" style="fill:none;stroke:currentColor"/>
<rect x="250" y="50" width="30" height="40" style="fill:none;stroke:currentColor"/>
<text x="225" y="75" text-anchor="middle" style="fill:currentColor">3</text>
<circle cx="265" cy="70" r="3" style="fill:currentColor"/>
<line x1="265" y1="70" x2="318" y2="70" style="stroke:currentColor" marker-end="url(#lin-a2)"/>
<rect x="320" y="50" width="50" height="40" style="fill:none;stroke:currentColor"/>
<rect x="370" y="50" width="30" height="40" style="fill:none;stroke:currentColor"/>
<text x="345" y="75" text-anchor="middle" style="fill:currentColor">5</text>
<line x1="370" y1="90" x2="400" y2="50" style="stroke:var(--bad)"/>
<text x="420" y="75" style="fill:var(--bad)">next = None</text>
<text x="105" y="40" text-anchor="middle" style="fill:var(--muted)">val</text>
<text x="145" y="40" text-anchor="middle" style="fill:var(--muted)">next</text>
<text x="240" y="112" text-anchor="middle" style="fill:var(--muted)">k-th node tak pahunchne ke liye head se chalna padega</text>
</svg>
<figcaption>Singly linked list 7 → 3 → 5. Har node = (val, next). Last node ka next None hai.</figcaption>
</figure>

Dhyan do: list me sirf `head` ka address hai. 5 tak pahunchna hai to 7 se shuru karke arrow follow karna padega — isliye "k-th element" lena Θ(n) hai, array ki tarah O(1) nahi.

Teesri picture: **circular queue**. Array ke end par pahunchkar index wapas 0 par aa jaata hai, jaise ghadi 12 ke baad 1 par aati hai.

<figure class="fig">
<svg viewBox="0 0 480 175" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="lin-a3" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" style="fill:currentColor"/></marker></defs>
<path d="M 390 58 C 390 10, 90 10, 90 58" style="fill:none;stroke:var(--info)" marker-end="url(#lin-a3)"/>
<text x="240" y="46" text-anchor="middle" style="fill:var(--info)">(5 + 1) % 6 = 0</text>
<rect x="60" y="60" width="60" height="40" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<rect x="120" y="60" width="60" height="40" style="fill:none;stroke:currentColor"/>
<rect x="180" y="60" width="60" height="40" style="fill:none;stroke:currentColor"/>
<rect x="240" y="60" width="60" height="40" style="fill:none;stroke:currentColor"/>
<rect x="300" y="60" width="60" height="40" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<rect x="360" y="60" width="60" height="40" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<text x="90" y="85" text-anchor="middle" style="fill:currentColor">C</text>
<text x="330" y="85" text-anchor="middle" style="fill:currentColor">A</text>
<text x="390" y="85" text-anchor="middle" style="fill:currentColor">B</text>
<text x="90" y="116" text-anchor="middle" style="fill:var(--muted)">0</text>
<text x="150" y="116" text-anchor="middle" style="fill:var(--muted)">1</text>
<text x="210" y="116" text-anchor="middle" style="fill:var(--muted)">2</text>
<text x="270" y="116" text-anchor="middle" style="fill:var(--muted)">3</text>
<text x="330" y="116" text-anchor="middle" style="fill:var(--muted)">4</text>
<text x="390" y="116" text-anchor="middle" style="fill:var(--muted)">5</text>
<line x1="330" y1="148" x2="330" y2="124" style="stroke:var(--good)" marker-end="url(#lin-a3)"/>
<line x1="150" y1="148" x2="150" y2="124" style="stroke:var(--bad)" marker-end="url(#lin-a3)"/>
<text x="330" y="166" text-anchor="middle" style="fill:var(--good)">front = 4</text>
<text x="150" y="166" text-anchor="middle" style="fill:var(--bad)">rear = 1</text>
</svg>
<figcaption>Circular queue, size m = 6. Queue (front se) A, B, C hai; C index 5 ke baad wrap hokar index 0 me gaya. Agla enqueue index 1 (rear) par hoga.</figcaption>
</figure>

Yahan A index 4, B index 5 par gaye, phir rear = (5+1) % 6 = 0, to C index 0 par gaya. `%` (modulo, yaani bhag dene par sheshfal) hi wrap-around karata hai.

## Concept step-by-step

### 1. Stack: push, pop aur trace likhna

**Idea:** stack ek list hai jisme sirf ek end (top) par kaam hota hai. `push(x)` = x ko top par rakho; `pop()` = top wala nikaalo aur return karo. Python me `st.append(x)` aur `st.pop()` yahi karte hain.

**Rule:** stack ko hamesha **bottom → top, left se right** likho. Pop hamesha **sabse right** wala element nikalta hai.

**Example:** `push(2); push(6); pop(); push(9)`

| Step | Stack (bottom → top) | Printed |
|---|---|---|
| push 2 | [2] | |
| push 6 | [2, 6] | |
| pop | [2] | 6 |
| push 9 | [2, 9] | |

**Maximum size (depth):** har step ke baad size likho, phir sabse bada number lo. Final size aur peak size alag cheezein hain.

Dhyan do: pop "sabse purana" element nahi, "sabse naya bacha hua" element nikalta hai.

### 2. Postfix expression ka evaluation

**Idea:** postfix (Reverse Polish) me operator apne do operands ke **baad** aata hai: `3 4 +` matlab 3 + 4. Isse brackets ki zaroorat nahi padti, aur ek stack se evaluate ho jaata hai.

**Rule:** left se right padho.
- Number aaye → push.
- Operator aaye → pehle pop karo **b** (top), phir pop karo **a**, aur push karo `a op b`.

**Kyun b pehle?** `8 2 -` me 8 pehle push hua (neeche), 2 baad me (upar). Pop karne par pehle 2 niklega. Matlab top wala **right operand** hai: 8 − 2 = 6, na ki 2 − 8.

**Example:** `7 2 3 * -`
- push 7, 2, 3 → [7, 2, 3]
- `*`: b = 3, a = 2 → push 6 → [7, 6]
- `-`: b = 6, a = 7 → push 1 → [1]. Answer 1.

Dhyan do: `-` aur `/` me order ulta kiya to answer galat; `+` aur `*` me farak nahi padta, isliye ye trap sirf minus/divide par pakadta hai.

### 3. Valid pop orders (stack permutations)

**Setup:** 1, 2, …, n is order me push hote hain, beech me kabhi bhi pop kar sakte ho. Kaunsi print sequences possible hain?

**Check karne ka tareeka (simulation):** printed sequence ka har number x lo. Agar x abhi tak push nahi hua, to x tak sab push karo. Ab top par x hona chahiye — hai to pop, nahi hai to sequence **impossible**.

**Forbidden pattern:** agar sequence me kahin **…c…a…b…** aaye jahan a < b < c, to wo impossible hai.
*Kyun?* c pop hone ke time c push ho chuka hai, to a aur b (dono c se chhote) bhi push ho chuke hain, aur abhi tak pop nahi hue (wo baad me print ho rahe hain). Unme a neeche hai, b upar. To b pehle niklega, a baad me — par sequence a ko pehle maang rahi hai. Contradiction.

**Example (n = 3):** 6 permutations me se sirf `3 1 2` invalid hai (c=3, a=1, b=2). Baaki 5 valid: 123, 132, 213, 231, 321.

**Kitne valid orders?** Catalan number:
$$C_n = \frac{1}{n+1}\binom{2n}{n}: \quad C_1=1,\ C_2=2,\ C_3=5,\ C_4=14,\ C_5=42.$$
*Kyun Catalan?* Har valid run n push aur n pop ka ek sequence hai jisme kisi bhi point par pops ≤ pushes (khaali stack se pop nahi kar sakte). Aise "balanced bracket" sequences ki ginti hi $C_n$ hai, aur har aise push/pop pattern se ek alag output milta hai. Check: $C_4 = \frac{1}{5}\binom{8}{4} = \frac{70}{5} = 14$.

Dhyan do: Catalan count tabhi lagta hai jab saare n elements eventually pop hon aur input order fixed ho.

### 4. Queue aur deque

**Queue:** `enqueue(x)` rear par jodta hai, `dequeue()` front se nikalta hai. Python: `from collections import deque; q.append(x); q.popleft()`. Trace me queue ko **front → rear, left se right** likho; dequeue **sabse left** wala nikalta hai.

**Example:** enqueue 4, enqueue 9, dequeue, enqueue 1 → [4] → [4, 9] → print 4, [9] → [9, 1].

**Deque** (double-ended queue) me dono ends par dono kaam: `append` (right me jodo), `appendleft` (left me jodo), `pop` (right se nikaalo), `popleft` (left se nikaalo) — sab O(1).

Dhyan do: Python list ka `pop(0)` O(n) hai (baaki sab ek jagah shift hote hain); isliye queue ke liye `deque` use hota hai.

### 5. Circular queue

**Idea:** array me queue rakhoge to dequeue ke baad aage ki jagah khaali rehti hai. Circular queue end ke baad index ko 0 par ghuma deti hai.

**Rule (size m):**
- enqueue: `a[rear] = x; rear = (rear + 1) % m`
- dequeue: `x = a[front]; front = (front + 1) % m`

**Example:** m = 7, front = rear = 4. 4 enqueues → rear 5, 6, 0, 1. Final rear = (4 + 4) % 7 = 1. Shortcut: k enqueues ke baad rear = (start + k) % m.

Dhyan do: `% m` bhoolne par index 8, 9… aa jaata hai jo array me exist hi nahi karta.

### 6. Do stacks se queue

**Idea:** stack ulta karta hai (LIFO). Do baar ulta karo to seedha (FIFO) ho jaata hai.

**Rule:**
- `enqueue(x)`: x ko stack IN par push.
- `dequeue()`: agar OUT **khaali** hai to IN ke saare elements ek-ek pop karke OUT par push karo. Phir OUT se pop.

**Cost kyun amortized O(1)?** Har element apni life me max 4 kaam karta hai: IN par push, IN se pop, OUT par push, OUT se pop. To n operations ka total ≤ 4n = O(n), yaani average O(1) per operation. Lekin ek akela dequeue jo IN ke n elements shift kare, Θ(n) leta hai — **worst case per operation Θ(n)**.

Dhyan do: OUT non-empty ho tab refill mat karo, aur naye elements seedhe OUT par mat daalo — dono se FIFO order toot jaata hai.

### 7. Singly linked list ki costs

Node = (`val`, `next`). Sirf `head` pointer hai, tail nahi.

| Operation | Cost | Kyun |
|---|---|---|
| Front par insert | O(1) | `head = Node(x, head)` — sirf ek pointer badla |
| Front se delete | O(1) | `head = head.next` |
| Search value / k-th node | Θ(n) | head se chalna padta hai |
| Last node delete | Θ(n) | second-last node chahiye (uska next None karna hai), jo sirf chal kar milta hai |
| Binary search | O(log n) **nahi** | middle tak pahunchna hi Θ(n) hai |

**Trick — sirf p diya hai (head nahi), p last nahi:** p ko "delete" karne ke liye agle node ki value p me copy karo aur agla node hata do: `p.val = p.next.val; p.next = p.next.next`. O(1). Last node par ye kaam nahi karta (p.next None hai).

Dhyan do: "delete last" O(1) tabhi hai jab doubly linked list ho aur tail pointer ho.

### 8. Iterative reversal aur loop conditions

```python
def reverse(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next      # 1. agla node yaad rakho
        cur.next = prev     # 2. arrow ulta karo
        prev, cur = cur, nxt  # 3. dono aage badho
    return prev
```

Trace on 1 → 2 → 3 → 4:

| Iteration | prev (reversed part) | cur |
|---|---|---|
| start | None | 1 |
| 1 | 1 | 2 |
| 2 | 2 → 1 | 3 |
| 3 | 3 → 2 → 1 | 4 |
| 4 | 4 → 3 → 2 → 1 | None (loop khatam) |

**Loop condition ka trap:** agar `while cur and cur.next:` likha ho, to jab cur = 4 (last node) hai tab `cur.next` None hai aur loop wahin ruk jaata hai — 4 kabhi jodta hi nahi. Return hota hai `3 → 2 → 1`. Isliye hamesha check karo ki **last node par loop chalta hai ya nahi**.

Dhyan do: `nxt = cur.next` pehle save karna zaroori hai; `cur.next = prev` ke baad purana next kho jaata.

### 9. Doubly linked list me insertion

Doubly linked list (DLL) me har node ke paas `prev` aur `next` dono hain. Node `q` ko `p` ke **turant baad** daalna hai (p ka successor r = p.next hai).

<figure class="fig">
<svg viewBox="0 0 480 170" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="lin-a4" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" style="fill:currentColor"/></marker></defs>
<rect x="30" y="20" width="70" height="40" style="fill:none;stroke:currentColor"/>
<rect x="380" y="20" width="70" height="40" style="fill:none;stroke:currentColor"/>
<rect x="205" y="115" width="70" height="40" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<text x="65" y="45" text-anchor="middle" style="fill:currentColor">p</text>
<text x="415" y="45" text-anchor="middle" style="fill:currentColor">r = p.next</text>
<text x="240" y="140" text-anchor="middle" style="fill:currentColor">q (new)</text>
<line x1="102" y1="40" x2="376" y2="40" style="stroke:var(--muted);stroke-dasharray:5 4"/>
<text x="240" y="33" text-anchor="middle" style="fill:var(--muted)">purana link (toot jaayega)</text>
<line x1="208" y1="118" x2="100" y2="62" style="stroke:var(--info)" marker-end="url(#lin-a4)"/>
<text x="120" y="102" style="fill:var(--info)">① q.prev</text>
<line x1="272" y1="118" x2="380" y2="62" style="stroke:var(--info)" marker-end="url(#lin-a4)"/>
<text x="318" y="102" style="fill:var(--info)">② q.next</text>
<line x1="395" y1="62" x2="285" y2="132" style="stroke:var(--good)" marker-end="url(#lin-a4)"/>
<text x="380" y="125" style="fill:var(--good)">③ r.prev</text>
<line x1="85" y1="62" x2="196" y2="132" style="stroke:var(--good)" marker-end="url(#lin-a4)"/>
<text x="30" y="125" style="fill:var(--good)">④ p.next</text>
</svg>
<figcaption>q ko p aur r ke beech daalna: pehle q ke dono pointers (①, ②), phir r.prev (③), sabse last p.next (④).</figcaption>
</figure>

**Sahi order:**
```python
q.prev = p
q.next = p.next
p.next.prev = q     # p.next abhi bhi r hai
p.next = q          # sabse last
```
**Kyun p.next last?** Step 2 aur 3 dono `p.next` (yaani r) padhte hain. Agar `p.next = q` pehle likh diya, to `p.next.prev = q` ban jaata hai `q.prev = q` — r tak pahunchne ka raasta hi kho gaya.

Dhyan do: rule general hai — **koi field overwrite karne se pehle uski purani value jahan-jahan chahiye wahan use kar lo.**

## Solved examples

**Example 1 (MCQ, easy):** Empty stack par ye operations: `push(2); push(6); pop(); push(9); push(4); pop(); push(1); pop(); pop()`. Har pop value print karta hai. Kya print hua aur stack me kya bacha?
(A) 2 6 9 4; stack [1] (B) 6 4 1 9; stack [2] (C) 6 4 9 1; stack [2] (D) 6 4 1 9; stack khaali

**Soch:** pure stack trace — har step ke baad bottom → top likho.

**Solution:**
1. push 2, push 6 → [2, 6]; pop → print **6**, [2].
2. push 9, push 4 → [2, 9, 4]; pop → print **4**, [2, 9].
3. push 1 → [2, 9, 1]; pop → print **1**; pop → print **9**; [2].
4. Printed 6 4 1 9, stack me 2 bacha. Answer **(B)**. (Bonus: peak size 3 tha.)

**Galti kahan hoti hai:** (A) FIFO soch se aata hai — har pop par sabse purana nikaala. (C) me last do pops ka order ulta hai: 1 baad me push hua, isliye 9 se pehle niklega.

**Example 2 (NAT, medium):** Postfix `5 9 3 - * 6 2 / +` ko stack se evaluate karo (operator pops b, then a, pushes a op b). Final value?

**Soch:** postfix + "first popped = right operand".

**Solution:**

| Token | Action | Stack |
|---|---|---|
| 5, 9, 3 | push | [5, 9, 3] |
| − | b=3, a=9 → 9−3 = 6 | [5, 6] |
| * | b=6, a=5 → 30 | [30] |
| 6, 2 | push | [30, 6, 2] |
| / | b=2, a=6 → 3 | [30, 3] |
| + | 33 | [33] |

Answer **33**.

**Galti kahan hoti hai:** operands ulte liye (b op a) to 3 − 9 = −6, 5 × (−6) = −30, 2/6 ≈ 0.33, total ≈ −29.67. Minus aur divide par order check karo.

**Example 3 (MSQ, medium):** 1, 2, 3, 4 is order me stack par push hote hain, pops beech me kahin bhi. Kaunse printed sequences possible hain?
(A) 3 2 4 1 (B) 4 1 2 3 (C) 2 4 1 3 (D) 2 1 4 3

**Soch:** "valid pop order" → simulation ya forbidden pattern c…a…b.

**Solution:**
1. (A) push 1,2,3, pop 3, pop 2 → [1]; push 4, pop 4; pop 1. **Valid.**
2. (B) 4 pehle → stack [1,2,3] bacha, top 3. Agla 1 chahiye par top 3 hai. Pattern 4…1…2 (c=4, a=1, b=2). **Invalid.**
3. (C) push 1,2, pop 2 → [1]; push 3,4, pop 4 → [1,3]; agla 1 chahiye, top 3. Pattern 4…1…3. **Invalid.**
4. (D) push 1,2, pop 2, pop 1; push 3,4, pop 4, pop 3. **Valid.**
Answer **(A), (D)**.

**Galti kahan hoti hai:** (C) me log sochte hain "1 to neeche pada hai, nikal lenge" — par 3 uske upar baitha hai. Hamesha check karo top par kya hai.

**Example 4 (NAT, medium):** Queue do stacks IN, OUT se bani hai (enqueue → IN par push; dequeue → OUT khaali ho to IN ka sab OUT par shift, phir OUT se pop). Empty se shuru: `enqueue(10), enqueue(20), dequeue(), enqueue(30), enqueue(40), dequeue(), dequeue(), dequeue()`. Dono stacks par kul kitne push + pop operations hue?

**Soch:** two-stack queue; har shift = 1 pop + 1 push.

**Solution:**

| Operation | IN | OUT | Ops is step | Total |
|---|---|---|---|---|
| enq 10 | [10] | [] | 1 | 1 |
| enq 20 | [10, 20] | [] | 1 | 2 |
| deq | shift 2 → OUT [20, 10] (4 ops), pop 10 | [20] | 5 | 7 |
| enq 30 | [30] | [20] | 1 | 8 |
| enq 40 | [30, 40] | [20] | 1 | 9 |
| deq | OUT non-empty, pop 20 | [] | 1 | 10 |
| deq | shift 2 → OUT [40, 30] (4 ops), pop 30 | [40] | 5 | 15 |
| deq | pop 40 | [] | 1 | 16 |

Answer **16**. Check: 4 elements × 4 ops each = 16. Output order 10, 20, 30, 40 — sahi FIFO.

**Galti kahan hoti hai:** shift ko "1 operation" ginna (har element ka pop aur push dono ginne hain), ya teesre dequeue par OUT non-empty hone ke bawajood refill karna.

**Example 5 (NAT, easy):** Circular queue, array size 6 (index 0–5), shuru me front = rear = 2. Enqueue: `rear = (rear + 1) % 6`; dequeue: `front = (front + 1) % 6`. 5 enqueues, 3 dequeues, phir 2 enqueues. Final `rear`?

**Soch:** sirf enqueue rear ko badalta hai; total enqueues = 7.

**Solution:**
1. rear = (2 + 7) % 6 = 9 % 6 = **3**.
2. (Saath me front = (2 + 3) % 6 = 5. Queue me 7 − 3 = 4 elements, indices 5, 0, 1, 2.)
Answer **3**.

**Galti kahan hoti hai:** mod bhool kar 9 likhna, ya dequeue ko bhi rear par lagana (2 + 7 − 3 = 6 → 0).

**Example 6 (MCQ, hard):** `head` list 4 → 9 → 2 → 6 → 5 par point karta hai. `f(head)` kya return karega?
```python
def f(head):
    s, p = 0, head
    while p and p.next:
        s += p.val
        p = p.next.next
    return s
```
(A) 11 (B) 6 (C) 4 (D) 15

**Soch:** loop condition `p.next` — last node par loop chalega ya nahi?

**Solution:**
1. p = 4: p.next = 9 hai → s = 4, p = 2.
2. p = 2: p.next = 6 hai → s = 6, p = 5.
3. p = 5: p.next = None → loop rukta hai, 5 add nahi hota.
Answer **(B) 6**.

**Galti kahan hoti hai:** "har alternate node ka sum" samajh kar 4 + 2 + 5 = 11 likhna. Wo `while p:` hota; yahan last node par condition fail hoti hai.

## Confusions clear karo

**Q:** Stack ko upar se neeche likhun ya left se right?
**A:** Jo bhi chuno, ek hi rakho. Sabse safe: left = bottom, right = top. Tab push = right me jodo, pop = right se hatao — bilkul Python list jaisa.

**Q:** Postfix me kaise yaad rakhun ki kaunsa operand pehle?
**A:** Jo pehle likha hai wo pehle push hua, isliye neeche hai — wahi **left** operand (a). Upar wala (pehle pop hone wala) **right** operand (b). Result `a op b`.

**Q:** Catalan number har stack question me lagta hai kya?
**A:** Nahi. Sirf "1..n fixed order me push, beech me kahin bhi pop, kitne output orders possible" — tab $C_n$. Kisi specific sequence ko check karna ho to simulation karo.

**Q:** Two-stack queue O(1) hai ya O(n)?
**A:** Dono sahi hain, alag sense me. Ek dequeue worst case Θ(n) le sakta hai (pura IN shift). Par n operations ka total O(n) hai, to **amortized** (average over the sequence) O(1). MSQ me dono statements true ho sakte hain.

**Q:** Singly linked list me last node delete O(1) kyun nahi, jab tail pointer bhi ho?
**A:** Delete ke liye second-last node ka `next` None karna padta hai. Tail se peeche jaane ka arrow singly list me hai hi nahi, to head se chalna padta hai: Θ(n). Insert-at-end tail pointer ke saath O(1) ho sakta hai, delete-at-end nahi.

**Q:** Linked list sorted ho to binary search kyun nahi?
**A:** Binary search ko middle element turant chahiye (O(1) indexing). Linked list me middle tak pahunchna hi n/2 steps hai, to fayda khatam.

**Q:** `while cur` aur `while cur.next` me farak?
**A:** `while cur` har node par chalta hai (last bhi). `while cur.next` last node par ruk jaata hai — loop ke andar last node process nahi hota. Ye tab use karte ho jab aapko last node par **rukna** ho (jaise tail dhoondhna).

## Khud try karo

**1.** Stack trace: letter = push, `-` = pop. `a b - c d e - f - - g`. Maximum size kitna gaya, aur end me kitne elements bache?

<details><summary>Answer dekho</summary>

Size har step ke baad: a 1, b 2, − 1, c 2, d 3, e 4, − 3, f 4, − 3, − 2, g 3.
Maximum = **4**, final = **3** (stack [a, c, g]).

</details>

**2.** Ye program kya print karega?
```python
from collections import deque
d = deque()
for x in [10, 20, 30, 40]:
    if x in (10, 30):
        d.append(x)
    else:
        d.appendleft(x)
d.pop()
d.append(d.popleft())
print(list(d))
```

<details><summary>Answer dekho</summary>

- 10 append → [10]; 20 appendleft → [20, 10]; 30 append → [20, 10, 30]; 40 appendleft → [40, 20, 10, 30].
- `pop()` right se 30 hatata hai → [40, 20, 10].
- `popleft()` 40 deta hai, use right me append → [20, 10, 40].

Output: `[20, 10, 40]`.

</details>

**3.** Reversal code me `while cur:` ki jagah `while cur and cur.next:` likh diya. List 1 → 2 → 3 → 4 par returned list kya hogi?

<details><summary>Answer dekho</summary>

Iterations: cur = 1, 2, 3 par loop chalta hai (prev ban jaata hai 3 → 2 → 1). cur = 4 par `cur.next` None hai, loop ruk jaata hai. Return `prev` = **3 → 2 → 1**. Node 4 chhoot gaya.

</details>

**4.** 1, 2, 3, 4, 5 push hote hain. Kul kitne valid pop orders? Aur `4 5 3 1 2` valid hai?

<details><summary>Answer dekho</summary>

Count = $C_5 = \frac{1}{6}\binom{10}{5} = \frac{252}{6} = 42$.
`4 5 3 1 2`: push 1–4, pop 4 → [1,2,3]; push 5, pop 5; pop 3 → [1,2]; agla 1 chahiye par top 2 hai. **Invalid** (pattern 3…1…2).

</details>

**5.** Doubly linked list me node p (na pehla, na last) ko delete karne ke do pointer updates likho.

<details><summary>Answer dekho</summary>

```python
p.prev.next = p.next
p.next.prev = p.prev
```
Dono lines p ke purane pointers padhti hain, aur p ke fields badle nahi jaate, isliye yahan order se farak nahi padta. O(1).

</details>

## Ek page me

- Stack = LIFO, push/pop top par; trace bottom → top likho, pop sabse right wala.
- Max depth poochha ho to har step ke baad size likho; peak ≠ final.
- Postfix: number push; operator par pop b, pop a, push `a op b` (top = right operand).
- Valid pop order: simulate; forbidden pattern …c…a…b… (a < b < c).
- Valid orders ki ginti: $C_n = \frac{1}{n+1}\binom{2n}{n}$ = 1, 2, 5, 14, 42.
- Queue = FIFO (enqueue rear, dequeue front); deque ke chaaron ops O(1).
- Circular queue: index = (i + 1) % m; k enqueues ke baad rear = (start + k) % m.
- Two-stack queue: OUT khaali ho tabhi refill; har element 4 ops → amortized O(1), worst case ek dequeue Θ(n).
- Singly list (sirf head): insert/delete front O(1); search, k-th, delete last Θ(n); binary search fayda nahi.
- p (not last) delete bina head: `p.val = p.next.val; p.next = p.next.next`.
- Reversal: `nxt = cur.next; cur.next = prev; prev, cur = cur, nxt` with `while cur`.
- DLL insert q after p: `q.prev = p; q.next = p.next; p.next.prev = q; p.next = q` — p.next sabse last.

Revision ke liye **Short note** tab dekho.
