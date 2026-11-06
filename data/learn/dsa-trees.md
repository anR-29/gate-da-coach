# Binary trees and binary search trees

> **Time:** ~35 min · **Pehle aana chahiye:** recursion ka basic idea, queue (FIFO), $\log_2$ · **Day:** 30, 35

## Ye topic kyun?

Tree data ko **hierarchy** me rakhta hai — jaise family tree ya folder ke andar folder. Binary search tree (BST) sorted data me search, insert, delete ko fast banata hai (balanced ho to Θ(log n)). GATE DA me isse aate hain: traversal output (preorder/inorder/postorder/level order), do traversals se tree rebuild karna, height aur node-count ke formulas (NAT), aur BST insertion/search path/deletion ke trace — mostly 1–2 marks ke MCQ, MSQ aur NAT.

## Picture se samjho

Ek tree me upar ek **root** hota hai. Har node ke neeche zyada se zyada **do children** ho sakte hain (binary tree): **left child** aur **right child**. Jis node ka koi child nahi, wo **leaf** hai. Root se kisi node tak jitne edges (lines) lagte hain, wo uski **depth** hai. Sabse gehri leaf ki depth = tree ki **height**.

<figure class="fig">
<svg viewBox="0 0 520 245" xmlns="http://www.w3.org/2000/svg">
<line x1="225" y1="38" x2="145" y2="82" style="stroke:currentColor"/>
<line x1="255" y1="38" x2="335" y2="82" style="stroke:currentColor"/>
<line x1="118" y1="102" x2="82" y2="138" style="stroke:currentColor"/>
<line x1="142" y1="102" x2="178" y2="138" style="stroke:currentColor"/>
<line x1="181" y1="164" x2="159" y2="196" style="stroke:currentColor"/>
<line x1="199" y1="164" x2="221" y2="196" style="stroke:currentColor"/>
<line x1="362" y1="102" x2="398" y2="138" style="stroke:currentColor"/>
<line x1="401" y1="164" x2="379" y2="196" style="stroke:currentColor"/>
<circle cx="240" cy="30" r="17" style="fill:var(--mark);fill-opacity:0.3;stroke:currentColor"/>
<text x="240" y="35" text-anchor="middle" style="fill:currentColor">8</text>
<circle cx="130" cy="90" r="17" style="fill:none;stroke:currentColor"/>
<text x="130" y="95" text-anchor="middle" style="fill:currentColor">3</text>
<circle cx="350" cy="90" r="17" style="fill:none;stroke:currentColor"/>
<text x="350" y="95" text-anchor="middle" style="fill:currentColor">10</text>
<circle cx="70" cy="150" r="17" style="fill:var(--good);fill-opacity:0.2;stroke:var(--good)"/>
<text x="70" y="155" text-anchor="middle" style="fill:currentColor">1</text>
<circle cx="190" cy="150" r="17" style="fill:none;stroke:currentColor"/>
<text x="190" y="155" text-anchor="middle" style="fill:currentColor">6</text>
<circle cx="410" cy="150" r="17" style="fill:none;stroke:currentColor"/>
<text x="410" y="155" text-anchor="middle" style="fill:currentColor">14</text>
<circle cx="150" cy="210" r="17" style="fill:var(--good);fill-opacity:0.2;stroke:var(--good)"/>
<text x="150" y="215" text-anchor="middle" style="fill:currentColor">4</text>
<circle cx="230" cy="210" r="17" style="fill:var(--good);fill-opacity:0.2;stroke:var(--good)"/>
<text x="230" y="215" text-anchor="middle" style="fill:currentColor">7</text>
<circle cx="370" cy="210" r="17" style="fill:var(--good);fill-opacity:0.2;stroke:var(--good)"/>
<text x="370" y="215" text-anchor="middle" style="fill:currentColor">13</text>
<text x="465" y="35" style="fill:var(--muted)">depth 0</text>
<text x="465" y="95" style="fill:var(--muted)">depth 1</text>
<text x="465" y="155" style="fill:var(--muted)">depth 2</text>
<text x="465" y="215" style="fill:var(--muted)">depth 3</text>
<text x="240" y="240" text-anchor="middle" style="fill:var(--muted)">height = 3 edges · leaves (green) = 1, 4, 7, 13</text>
</svg>
<figcaption>Ye ek binary tree hai (aur BST bhi). Root 8, leaves green. Har node ke left subtree ke saare keys usse chhote, right ke bade.</figcaption>
</figure>

Notice karo: 8 ke left me 3, 1, 6, 4, 7 hain — sab 8 se chhote. Right me 10, 14, 13 — sab bade. Ye property har node par hai (6 ke left me 4, right me 7). Isi ko **BST property** kehte hain. Isi tree ko hum poore lesson me use karenge.

Ab socho tree ko ek line me likhna hai. Kis order me nodes padhein? Teen natural tareeke hain, aur farak sirf ye hai ki **node ko kab likhte ho** — apne subtrees se pehle, beech me, ya baad me. Chautha tareeka: level by level, upar se neeche.

## Concept step-by-step

### 1. Chaar traversals

**Idea:** har node par teen kaam hain — N (node khud likho), L (left subtree poora ghumo), R (right subtree poora ghumo). Order badlo to traversal badal jaata hai.

| Traversal | Order | Figure wale tree par |
|---|---|---|
| Preorder | N L R | 8 3 1 6 4 7 10 14 13 |
| Inorder | L N R | 1 3 4 6 7 8 10 13 14 |
| Postorder | L R N | 1 4 7 6 3 13 14 10 8 |
| Level order | depth 0, 1, 2, … (left → right) | 8 3 10 1 6 14 4 7 13 |

```python
def pre(n):  return [] if n is None else [n.val] + pre(n.left) + pre(n.right)
def ino(n):  return [] if n is None else ino(n.left) + [n.val] + ino(n.right)
def post(n): return [] if n is None else post(n.left) + post(n.right) + [n.val]
```

**Preorder ka trace:** 8 likho → left subtree (root 3): 3 likho → uska left 1 → uska right subtree (root 6): 6, 4, 7 → ab 8 ka right subtree: 10, phir 10 ka right 14, phir 14 ka left 13.

**Level order** queue se hota hai: root ko queue me daalo; baar-baar front node nikaalo (`popleft`), likho, aur uske children (left phir right) queue ke rear me daalo. Queue FIFO hai, isliye depth 1 ke saare nodes depth 2 se pehle nikalte hain. Agar galti se `pop()` (stack) use karo to output depth-first ho jaata hai, level order nahi.

**Kaam ki baat:** BST ka **inorder hamesha sorted** hota hai (left chhote → node → right bade). Aur `right + [val] + left` wala recursion (R N L) descending order deta hai.

Dhyan do: preorder ko ulta padhne se R L N milta hai, postorder (L R N) nahi. Is tree par reversed preorder = 13 14 10 7 4 6 1 3 8, jabki postorder = 1 4 7 6 3 13 14 10 8.

### 2. Do traversals se tree rebuild karna

**Idea:** preorder ka **pehla** element root hai (N pehle aata hai). Postorder ka **last** element root hai. Level order ka pehla bhi root. Par root ke baad kaunse keys left me hain, kaunse right me — ye sirf **inorder** batata hai, kyunki inorder me root apne left aur right subtrees ke **beech** baithta hai.

**Algorithm (pre + in):**
1. root = pre[0].
2. Inorder me root dhoondo. Uske left wale k keys = left subtree, right wale = right subtree.
3. Preorder me root ke baad agle k keys = left subtree ka preorder, baaki = right ka.
4. Dono sides par recurse karo.

**Example:** pre = A B D E G C F H I, in = D B G E A C H F I.

<figure class="fig">
<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="tr-a1" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" style="fill:currentColor"/></marker></defs>
<text x="20" y="62" style="fill:currentColor">pre</text>
<text x="20" y="152" style="fill:currentColor">in</text>
<rect x="80" y="40" width="40" height="32" style="fill:var(--mark);fill-opacity:0.35;stroke:currentColor"/>
<rect x="120" y="40" width="160" height="32" style="fill:var(--info);fill-opacity:0.15;stroke:var(--info)"/>
<rect x="280" y="40" width="160" height="32" style="fill:var(--good);fill-opacity:0.15;stroke:var(--good)"/>
<text x="100" y="61" text-anchor="middle" style="fill:currentColor">A</text>
<text x="200" y="61" text-anchor="middle" style="fill:currentColor">B  D  E  G</text>
<text x="360" y="61" text-anchor="middle" style="fill:currentColor">C  F  H  I</text>
<rect x="80" y="130" width="160" height="32" style="fill:var(--info);fill-opacity:0.15;stroke:var(--info)"/>
<rect x="240" y="130" width="40" height="32" style="fill:var(--mark);fill-opacity:0.35;stroke:currentColor"/>
<rect x="280" y="130" width="160" height="32" style="fill:var(--good);fill-opacity:0.15;stroke:var(--good)"/>
<text x="160" y="151" text-anchor="middle" style="fill:currentColor">D  B  G  E</text>
<text x="260" y="151" text-anchor="middle" style="fill:currentColor">A</text>
<text x="360" y="151" text-anchor="middle" style="fill:currentColor">C  H  F  I</text>
<line x1="105" y1="74" x2="255" y2="126" style="stroke:var(--bad)" marker-end="url(#tr-a1)"/>
<text x="150" y="105" style="fill:var(--bad)">root dhoondo</text>
<text x="200" y="30" text-anchor="middle" style="fill:var(--info)">agle 4 = left</text>
<text x="360" y="30" text-anchor="middle" style="fill:var(--good)">baaki 4 = right</text>
<text x="160" y="185" text-anchor="middle" style="fill:var(--info)">left subtree: 4 keys</text>
<text x="360" y="185" text-anchor="middle" style="fill:var(--good)">right subtree: 4 keys</text>
</svg>
<figcaption>Preorder ka pehla key (A) root hai. Inorder me A ke left 4 keys hain, to preorder me A ke baad ke 4 keys left subtree ke hain.</figcaption>
</figure>

- Left side: pre B D E G, in D B G E → root B; B ke left D (1 key), right G E (2 keys). Right part: pre E G, in G E → root E, G uska left child.
- Right side: pre C F H I, in C H F I → root C; C ke left kuch nahi; right H F I with pre F H I → root F, left H, right I.

Tree: A(B(D, E(G, –)), C(–, F(H, I))). Postorder = D G E B H I F C A, height = 3 (A→B→E→G).

**In + post:** same tareeka, bas root = post ka **last** element, aur post me left subtree ke keys **shuru** me aate hain.

**Uniqueness:** inorder + (pre ya post ya level) → tree unique (keys distinct hon to). **Pre + post** akele unique nahi: root 1 jiska sirf left child 2 ho, aur root 1 jiska sirf right child 2 ho — dono ka pre = 1 2, post = 2 1. Inorder hi left/right ka farak batata hai. (Full tree — har node ke 0 ya 2 children — me pre + post se bhi unique ho jaata hai, kyunki "sirf ek child" wala case aata hi nahi.)

Dhyan do: rebuild me hamesha **counts** match karo — inorder me left side me jitne keys, preorder me utne hi keys left ke liye lo.

### 3. Height aur node-count bounds

Is lesson me **height = edges** ki ginti (single node = 0). Question me definition padho — kuch log levels ginte hain (single node = 1), to har formula me +1 ka farak aata hai.

**Max nodes, height h:** depth i par max $2^i$ nodes (har node do me batta hai). To
$$n_{max} = 1 + 2 + 4 + \dots + 2^h = 2^{h+1} - 1.$$
Example: h = 3 → 15; h = 5 → 63.

**Min nodes, height h:** ek seedhi chain: $h + 1$ nodes.

**Min height, n nodes:** $n \le 2^{h+1} - 1$ ⇒ $h \ge \log_2(n+1) - 1$ ⇒ $h_{min} = \lceil \log_2(n+1) \rceil - 1 = \lfloor \log_2 n \rfloor$.
Example: n = 100: $\log_2 100 \approx 6.64$ → $h_{min} = 6$ (height 6 me 127 tak aa sakte hain, height 5 me sirf 63).

**Max height:** chain → $n - 1$.

**Distinct shapes with n nodes:** Catalan $C_n$ (n = 3 → 5 shapes).

Dhyan do: $\lfloor \log_2 n \rfloor$ edges wala answer hai; agar question "levels" maange to +1 karo.

### 4. Leaves ka formula: $n_0 = n_2 + 1$

Let $n_0$ = leaves, $n_1$ = ek child wale nodes, $n_2$ = do children wale nodes.
- Total nodes: $n = n_0 + n_1 + n_2$.
- Har node (root ko chhod kar) ke upar exactly ek edge aata hai: edges = $n - 1$.
- Har edge kisi parent se nikalta hai: edges = $n_1 + 2n_2$.

Dono barabar: $n_0 + n_1 + n_2 - 1 = n_1 + 2n_2$ ⇒ $n_0 = n_2 + 1$. $n_1$ cancel ho gaya — **ek child wale nodes leaves ko affect nahi karte**.

Figure wale tree me: do children wale = 8, 3, 6 → $n_2 = 3$; leaves = 4 ✓.

**Full tree** (har node ke 0 ya 2 children), L leaves: $n_2 = L - 1$, to nodes $= L + (L-1) = 2L - 1$. Example: 20 leaves → 39 nodes.

Dhyan do: $n_1$ ko leaves me mat jodo; wo sirf total nodes badhata hai.

### 5. BST insertion

**Rule:** naya key root se shuru karo. Chhota → left jao, bada → right jao, jab tak khaali jagah na mile; wahan rakh do. Har insertion ek root-to-leaf path follow karta hai.

**Example:** 8, 3, 10, 1, 6, 14, 4, 7, 13 is order me insert karo → upar wala figure banta hai. (4: 8 se chhota → 3 se bada → 6 se chhota → 6 ka left.)

**Shape order par depend karti hai:** 1, 2, 3, 4, 5 sorted order me daalo to har key right me jaata hai — ek chain, height 4 = n − 1.

Dhyan do: insertion order ≠ preorder ≠ level order. Tree bana kar hi traversal nikaalo.

### 6. BST search path aur interval check

Search key k: root se compare karo, chhota → left, bada → right. Har compare ke baad k ka **allowed range** chhota hota jaata hai.

**Interval rule:** (lo, hi) = (−∞, +∞) se shuru. Path ka har agla key **(lo, hi) ke andar** hona chahiye. Agar k < key to hi = key, warna lo = key.

**Example:** kya 70, 30, 60, 40, 80, 50 ek path ho sakta hai (search 50)?
- 70: 50 < 70 → (−∞, 70). 30 andar ✓, 50 > 30 → (30, 70). 60 ✓ → (30, 60). 40 ✓ → (40, 60). 80 ∉ (40, 60) ✗.
Impossible — 80 ko 70 ke left subtree me nahi ho sakta.

Dhyan do: sirf parent se compare karna kaafi nahi — **saare** pichle keys ki boundary check karo.

### 7. BST deletion: teen cases

1. **Leaf:** seedha hata do.
2. **Ek child:** node hatao, uska child uski jagah aa jaata hai (splice).
3. **Do children:** inorder successor (right subtree ka **minimum** — right me ek step, phir left-left jab tak ho sake) ki value node me copy karo, phir successor ko uski purani jagah se delete karo. Successor ka left child kabhi nahi hota, to wo case 1 ya 2 hai — **uska right child ho to splice karna mat bhoolo.**

<figure class="fig">
<svg viewBox="0 0 540 240" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="tr-a2" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" style="fill:currentColor"/></marker></defs>
<line x1="117" y1="46" x2="83" y2="79" style="stroke:currentColor"/>
<line x1="143" y1="46" x2="177" y2="79" style="stroke:currentColor"/>
<line x1="61" y1="104" x2="44" y2="131" style="stroke:currentColor"/>
<line x1="79" y1="104" x2="96" y2="131" style="stroke:currentColor"/>
<line x1="182" y1="105" x2="168" y2="130" style="stroke:currentColor"/>
<line x1="199" y1="104" x2="216" y2="131" style="stroke:currentColor"/>
<line x1="168" y1="160" x2="182" y2="185" style="stroke:currentColor"/>
<circle cx="130" cy="35" r="17" style="fill:var(--bad);fill-opacity:0.2;stroke:var(--bad)"/>
<text x="130" y="40" text-anchor="middle" style="fill:currentColor">40</text>
<circle cx="70" cy="90" r="17" style="fill:none;stroke:currentColor"/>
<text x="70" y="95" text-anchor="middle" style="fill:currentColor">20</text>
<circle cx="190" cy="90" r="17" style="fill:none;stroke:currentColor"/>
<text x="190" y="95" text-anchor="middle" style="fill:currentColor">60</text>
<circle cx="35" cy="145" r="17" style="fill:none;stroke:currentColor"/>
<text x="35" y="150" text-anchor="middle" style="fill:currentColor">10</text>
<circle cx="105" cy="145" r="17" style="fill:none;stroke:currentColor"/>
<text x="105" y="150" text-anchor="middle" style="fill:currentColor">30</text>
<circle cx="160" cy="145" r="17" style="fill:var(--good);fill-opacity:0.2;stroke:var(--good)"/>
<text x="160" y="150" text-anchor="middle" style="fill:currentColor">50</text>
<circle cx="225" cy="145" r="17" style="fill:none;stroke:currentColor"/>
<text x="225" y="150" text-anchor="middle" style="fill:currentColor">70</text>
<circle cx="190" cy="200" r="17" style="fill:none;stroke:currentColor"/>
<text x="190" y="205" text-anchor="middle" style="fill:currentColor">55</text>
<line x1="255" y1="120" x2="290" y2="120" style="stroke:currentColor" marker-end="url(#tr-a2)"/>
<line x1="397" y1="46" x2="363" y2="79" style="stroke:currentColor"/>
<line x1="423" y1="46" x2="457" y2="79" style="stroke:currentColor"/>
<line x1="341" y1="104" x2="324" y2="131" style="stroke:currentColor"/>
<line x1="359" y1="104" x2="376" y2="131" style="stroke:currentColor"/>
<line x1="462" y1="105" x2="448" y2="130" style="stroke:currentColor"/>
<line x1="479" y1="104" x2="496" y2="131" style="stroke:currentColor"/>
<circle cx="410" cy="35" r="17" style="fill:var(--good);fill-opacity:0.2;stroke:var(--good)"/>
<text x="410" y="40" text-anchor="middle" style="fill:currentColor">50</text>
<circle cx="350" cy="90" r="17" style="fill:none;stroke:currentColor"/>
<text x="350" y="95" text-anchor="middle" style="fill:currentColor">20</text>
<circle cx="470" cy="90" r="17" style="fill:none;stroke:currentColor"/>
<text x="470" y="95" text-anchor="middle" style="fill:currentColor">60</text>
<circle cx="315" cy="145" r="17" style="fill:none;stroke:currentColor"/>
<text x="315" y="150" text-anchor="middle" style="fill:currentColor">10</text>
<circle cx="385" cy="145" r="17" style="fill:none;stroke:currentColor"/>
<text x="385" y="150" text-anchor="middle" style="fill:currentColor">30</text>
<circle cx="440" cy="145" r="17" style="fill:none;stroke:currentColor"/>
<text x="440" y="150" text-anchor="middle" style="fill:currentColor">55</text>
<circle cx="505" cy="145" r="17" style="fill:none;stroke:currentColor"/>
<text x="505" y="150" text-anchor="middle" style="fill:currentColor">70</text>
<text x="130" y="232" text-anchor="middle" style="fill:var(--muted)">pehle: delete 40 (red)</text>
<text x="410" y="232" text-anchor="middle" style="fill:var(--muted)">baad: 50 upar aaya, 55 splice hua</text>
</svg>
<figcaption>40 ke do children hain. Successor = right subtree ka min = 50 (green). 50 root par copy hua, aur 50 ka right child 55 uski purani jagah (60 ka left) le leta hai.</figcaption>
</figure>

Preorder pehle: 40 20 10 30 60 50 55 70 → baad: 50 20 10 30 60 55 70.

**Cost:** search/insert/delete sab ek path chalte hain → Θ(h). Balanced tree me h ≈ log₂ n → Θ(log n); chain (sorted inserts) me h = n − 1 → Θ(n).

Dhyan do: question "successor" bole to right subtree ka min; "predecessor" bole to left subtree ka max. Dono se valid BST banta hai par answer alag aata hai.

## Solved examples

**Example 1 (MCQ, easy):** Binary tree: root P, P ka left child Q, right child R. Q ka sirf left child S; S ka sirf right child T. R ke children U (left) aur V (right). Postorder kya hai?
(A) T S Q U V R P (B) S T Q U V R P (C) P Q S T R U V (D) T S Q V U R P

**Soch:** postorder = L R N; node tab likho jab dono subtrees ho chuke hon.

**Solution:**
1. P ka left subtree (root Q): Q ka left subtree (root S): S ka left khaali, right T → T, phir S. Q ka right khaali → Q. Ab tak: T S Q.
2. P ka right subtree (root R): U, V, phir R → U V R.
3. Last me P. Postorder = **T S Q U V R P → (A)**.

**Galti kahan hoti hai:** (B) S ko T se pehle likhta hai — wo inorder jaisa soch hai (S ka left khaali, to S, phir T). Postorder me node apne **sab** children ke baad aata hai. (C) preorder hai.

**Example 2 (MCQ, medium):** Distinct keys wale binary tree ka preorder = A B D E G C F H I aur inorder = D B G E A C H F I. Postorder?
(A) D G E B H I F C A (B) D E G B H I F C A (C) G E D B I H F C A (D) D G E B H F I C A

**Soch:** pre + in → rebuild (step 2 wala tree hi hai).

**Solution:**
1. Root A; inorder me A ke left D B G E (4), right C H F I (4).
2. Left: root B (pre me agla), inorder D | B | G E → D left, right subtree {G, E} with pre E G → root E, G uska left.
3. Right: root C, inorder me C sabse pehle → C ka left khaali; right {H, F, I} with pre F H I → root F, H left, I right.
4. Postorder: left subtree (D G E B), right subtree (H I F C), root A → **D G E B H I F C A → (A)**.

**Galti kahan hoti hai:** (B) me G ko E ka **right** child maan liya; inorder me G, E se pehle hai, to G left me hai. (D) me F ko H aur I ke beech likha — wo F subtree ka inorder hai, postorder nahi.

**Example 3 (NAT, easy):** Height (edges, single node = 0) wale binary tree me 50 nodes hain. Minimum possible height?

**Soch:** "min height for n nodes" → $\lfloor \log_2 n \rfloor$.

**Solution:**
1. $2^5 = 32 \le 50 < 64 = 2^6$, to $\lfloor \log_2 50 \rfloor = 5$.
2. Check: height 4 me max $2^5 - 1 = 31 < 50$ nodes — kam pade. Height 5 me max 63 ≥ 50 ✓.
Answer **5**.

**Galti kahan hoti hai:** $\lceil \log_2 50 \rceil = 6$ likh dena (ye levels jaisa answer hai), ya height ko levels me gin kar 6 bolna.

**Example 4 (NAT, medium):** Ek binary tree me 8 nodes ke do children hain aur 5 nodes ka exactly ek child. Total nodes kitne?

**Soch:** leaves ka formula $n_0 = n_2 + 1$.

**Solution:**
1. $n_0 = 8 + 1 = 9$ leaves.
2. Total $= n_0 + n_1 + n_2 = 9 + 5 + 8 = 22$.
Answer **22**.

**Galti kahan hoti hai:** leaves = $n_2 + n_1 + 1 = 14$ lena (one-child nodes ko leaves me jodna), jisse total 27 aata hai.

**Example 5 (MSQ, medium):** Ek BST me key 47 search karte hue ye sequences of examined keys claim ki gayi hain (last key 47 hai). Kaunsi possible hain?
(A) 90, 20, 70, 30, 60, 40, 47
(B) 10, 75, 25, 80, 47
(C) 50, 20, 45, 30, 47
(D) 60, 15, 55, 40, 50, 47

**Soch:** search path validity → (lo, hi) interval track karo.

**Solution:**
1. (A) 90 → (−∞, 90); 20 ✓ → (20, 90); 70 ✓ → (20, 70); 30 ✓ → (30, 70); 60 ✓ → (30, 60); 40 ✓ → (40, 60); 47 ✓. **Possible.**
2. (B) 10 → (10, ∞); 75 ✓ → (10, 75); 25 ✓ → (25, 75); 80 ∉ (25, 75). **Impossible.**
3. (C) 50 → (−∞, 50); 20 ✓ → (20, 50); 45 ✓ → (45, 50); 30 ∉ (45, 50). **Impossible.**
4. (D) 60 → (−∞, 60); 15 ✓ → (15, 60); 55 ✓ → (15, 55); 40 ✓ → (40, 55); 50 ✓ → (40, 50); 47 ✓. **Possible.**
Answer **(A), (D)**.

**Galti kahan hoti hai:** (C) me sirf parent se check kiya: "30 < 45, aur 47 > 30, theek hai". Par 45 par hum right gaye the (47 > 45), to aage sab 45 se bade hone chahiye — 30 nahi ho sakta.

**Example 6 (MCQ, hard):** Keys 30, 15, 45, 10, 20, 40, 60, 35, 42, 38 is order me khaali BST me insert hote hain. Phir 30 delete hota hai (do children → inorder successor se replace). Naye tree ka preorder?
(A) 35 15 10 20 45 40 38 42 60
(B) 20 15 10 45 40 35 38 42 60
(C) 35 15 10 20 45 40 42 60
(D) 38 15 10 20 45 40 35 42 60

**Soch:** pehle tree banao, phir successor = right subtree ka min, aur uska right child splice karo.

**Solution:**
1. Insert: 30 root; 15 left, 45 right; 10, 20 under 15; 40, 60 under 45; 35 → 45 ka left 40 ka left; 42 → 40 ka right; 38 → 30 → 45 → 40 → 35 → 35 ka right.
2. 30 ke right subtree (root 45) ka min: 45 → 40 → 35 (35 ka left nahi). Successor = 35.
3. 35 ko root par copy karo. 35 ki purani jagah (40 ka left) par uska right child 38 aa jaata hai.
4. Tree: 35(15(10, 20), 45(40(38, 42), 60)). Preorder = **35 15 10 20 45 40 38 42 60 → (A)**.

**Galti kahan hoti hai:** (B) predecessor (left ka max = 20) use karta hai. (C) me 35 hataate time uska child 38 bhi gum ho gaya. (D) me 38 ko successor maan liya (sabse gehra node, min nahi).

## Confusions clear karo

**Q:** Height aur depth me farak?
**A:** Depth node ki hoti hai: root se us node tak edges. Height tree ki (ya node ki): sabse gehri leaf tak edges. Root ki depth 0 hai, tree ki height = max depth.

**Q:** "Level" aur "height" ek hi hai?
**A:** Convention dekho. Kai books root ko level 1 kehti hain; tab "levels ki sankhya" = height (edges) + 1. Question ki definition likh lo, phir formula lagao.

**Q:** Kya pre + post se tree nahi banta?
**A:** General binary tree me nahi — ek child left me hai ya right me, ye pre aur post dono me same dikhta hai. Full binary tree me ban jaata hai.

**Q:** Level order me queue kyun, stack kyun nahi?
**A:** Queue FIFO hai: jo node pehle discover hua (upar wala level) wo pehle nikalta hai. Stack sabse naye child ko pehle nikaalta hai, to aap ek branch me neeche chale jaate ho — wo DFS jaisa order hai.

**Q:** BST me duplicate key ho to?
**A:** GATE questions mostly distinct keys lete hain. Agar duplicates hon to stem bataega ki equal key left jaaye ya right; wahi follow karo.

**Q:** BST hamesha O(log n) kyun nahi?
**A:** Cost height par depend karti hai. Sorted ya almost sorted insertion order chain bana deta hai (h = n − 1) → Θ(n). O(log n) sirf balanced tree (jaise AVL) me guaranteed hai.

## Khud try karo

**1.** Har node ke 0 ya 2 children wale binary tree me 15 leaves hain. Total nodes?

<details><summary>Answer dekho</summary>

Full tree: $n_2 = L - 1 = 14$, total $= 2L - 1 = 29$.

</details>

**2.** Inorder = D B G E A C H F I, postorder = D G E B H I F C A. Tree ki height (edges)?

<details><summary>Answer dekho</summary>

Root = post ka last = A. Inorder me A ke left D B G E (4 keys) → post ke pehle 4 (D G E B) left subtree, agle 4 (H I F C) right.
- Left: root B (D G E B ka last); left D, right {G, E} with post G E → root E, G left.
- Right: root C; inorder me C pehla → left khaali; right {H, F, I} with post H I F → root F, H left, I right.

Longest path A → B → E → G = **3** edges (A → C → F → H bhi 3).

</details>

**3.** Keys 25, 15, 35, 10, 20, 30, 40, 5, 12, 11 is order me khaali BST me daalo. (a) Height? (b) Key 13 search karte hue kitne nodes se compare hoga (khaali subtree milne tak)?

<details><summary>Answer dekho</summary>

Tree: 25(15(10(5, 12(11, –)), 20), 35(30, 40)). Path 25 → 15 → 10 → 12 → 11 sabse lamba: (a) height **4**.
(b) 13: 25 (left) → 15 (left) → 10 (right) → 12 (right, khaali). **4** nodes.

</details>

**4.** Figure 1 wale tree (8, 3, 10, 1, 6, 14, 4, 7, 13) par neeche ka code kya return karega?
```python
def g(n):
    if n is None:
        return []
    return g(n.right) + [n.val] + g(n.left)
```

<details><summary>Answer dekho</summary>

Ye R N L hai = inorder ka ulta. BST ka inorder sorted hai, to output descending: `[14, 13, 10, 8, 7, 6, 4, 3, 1]`.

</details>

**5.** Height 6 (edges) ke binary tree me max kitne nodes, aur kam se kam kitne?

<details><summary>Answer dekho</summary>

Max $2^{7} - 1 = 127$. Min (chain) $6 + 1 = 7$.

</details>

## Ek page me

- Preorder N L R, inorder L N R, postorder L R N, level order = queue (`popleft`).
- Reversed preorder = R L N, postorder nahi.
- BST ka inorder sorted; R N L descending deta hai.
- Rebuild: root = pre ka pehla / post ka last; inorder me root se split; counts match karo.
- Unique tree: inorder + koi ek aur traversal. Pre + post sirf full tree ke liye.
- Height (edges): max nodes $2^{h+1} - 1$, min nodes $h + 1$.
- Min height for n nodes $= \lfloor \log_2 n \rfloor$; max height $n - 1$.
- $n_0 = n_2 + 1$ (one-child nodes irrelevant); full tree L leaves → $2L - 1$ nodes.
- n nodes ke distinct shapes = Catalan $C_n$.
- BST insert: root se chhota-left/bada-right; insertion order ≠ preorder.
- Search path: har key pichle sab keys se bane (lo, hi) ke andar ho.
- Delete (2 children): successor = right subtree ka min, copy karo, uska right child splice karo. Cost Θ(h): balanced Θ(log n), chain Θ(n).

Revision ke liye **Short note** tab dekho.
