# Uninformed search: BFS, DFS, UCS, IDS

> **Time:** ~35 min · **Pehle aana chahiye:** graph aur tree (node, edge, path), queue aur stack ka idea, $b^d$ jaisi powers · **Day:** 57

## Ye topic kyun?

AI me bahut saari problems "start se goal tak raasta dhoondho" ban jaati hain — maze, route planning, puzzle. Uninformed search wo tarike hain jinke paas goal ke baare me koi hint (heuristic) nahi; bas graph ka structure aur edge costs. GATE DA yahan se trace-based sawaal poochta hai: BFS/DFS ka expansion order (MCQ), UCS ka path cost ya order (NAT/MCQ), goal test generation par ya expansion par (NAT), IDS ke node counts (NAT), aur completeness/optimality/complexity table (MSQ). Sab rule-following hai — rules ek baar pakke, marks pakke.

## Picture se samjho

Ye graph poore lesson me use hoga. Edges undirected hain aur numbers edge costs hain. Start $S$, goal $G$.

<figure class="fig">
<svg viewBox="0 0 480 230" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="130" x2="150" y2="60" stroke="currentColor"/>
<line x1="50" y1="130" x2="150" y2="200" stroke="currentColor"/>
<line x1="150" y1="60" x2="270" y2="40" stroke="currentColor"/>
<line x1="150" y1="60" x2="270" y2="130" stroke="currentColor"/>
<line x1="150" y1="200" x2="270" y2="130" stroke="currentColor"/>
<line x1="150" y1="200" x2="420" y2="170" stroke="currentColor"/>
<line x1="270" y1="40" x2="390" y2="50" stroke="currentColor"/>
<line x1="270" y1="130" x2="420" y2="170" stroke="currentColor"/>
<line x1="390" y1="50" x2="420" y2="170" stroke="currentColor"/>
<circle cx="50" cy="130" r="16" style="fill:var(--info)"/><text x="45" y="135" style="fill:currentColor" font-size="14">S</text>
<circle cx="150" cy="60" r="16" style="fill:var(--muted)"/><text x="145" y="65" style="fill:currentColor" font-size="14">A</text>
<circle cx="150" cy="200" r="16" style="fill:var(--muted)"/><text x="145" y="205" style="fill:currentColor" font-size="14">B</text>
<circle cx="270" cy="40" r="16" style="fill:var(--muted)"/><text x="265" y="45" style="fill:currentColor" font-size="14">C</text>
<circle cx="270" cy="130" r="16" style="fill:var(--muted)"/><text x="265" y="135" style="fill:currentColor" font-size="14">D</text>
<circle cx="390" cy="50" r="16" style="fill:var(--muted)"/><text x="385" y="55" style="fill:currentColor" font-size="14">E</text>
<circle cx="420" cy="170" r="16" style="fill:var(--good)"/><text x="414" y="175" style="fill:currentColor" font-size="14">G</text>
<text x="86" y="86" style="fill:var(--mark)" font-size="13">1</text>
<text x="86" y="184" style="fill:var(--mark)" font-size="13">4</text>
<text x="205" y="40" style="fill:var(--mark)" font-size="13">2</text>
<text x="214" y="88" style="fill:var(--mark)" font-size="13">5</text>
<text x="204" y="150" style="fill:var(--mark)" font-size="13">1</text>
<text x="282" y="200" style="fill:var(--mark)" font-size="13">9</text>
<text x="326" y="36" style="fill:var(--mark)" font-size="13">3</text>
<text x="336" y="142" style="fill:var(--mark)" font-size="13">4</text>
<text x="412" y="104" style="fill:var(--mark)" font-size="13">4</text>
</svg>
<figcaption>Example graph: S–A 1, S–B 4, A–C 2, A–D 5, B–D 1, B–G 9, C–E 3, D–G 4, E–G 4.</figcaption>
</figure>

Dhyan do: teen alag "best" raaste hain. Sabse kam edges: S–B–G (2 edges, cost 13). Sabse kam cost: S–B–D–G (cost 9). Aur DFS jo pehle "andar tak" ghus jaata hai: S–A–C–E–G (cost 10). Har algorithm ka apna "best" hai — yahi is topic ki jaan hai.

Ab ek tree par BFS aur DFS ka farak, numbers = kis order me expand hua:

<figure class="fig">
<svg viewBox="0 0 440 230" xmlns="http://www.w3.org/2000/svg">
<line x1="220" y1="40" x2="120" y2="100" stroke="currentColor"/><line x1="220" y1="40" x2="320" y2="100" stroke="currentColor"/>
<line x1="120" y1="100" x2="70" y2="170" stroke="currentColor"/><line x1="120" y1="100" x2="170" y2="170" stroke="currentColor"/>
<line x1="320" y1="100" x2="270" y2="170" stroke="currentColor"/><line x1="320" y1="100" x2="370" y2="170" stroke="currentColor"/>
<circle cx="220" cy="40" r="15" style="fill:var(--muted)"/><text x="215" y="45" style="fill:currentColor" font-size="13">A</text>
<circle cx="120" cy="100" r="15" style="fill:var(--muted)"/><text x="115" y="105" style="fill:currentColor" font-size="13">B</text>
<circle cx="320" cy="100" r="15" style="fill:var(--muted)"/><text x="315" y="105" style="fill:currentColor" font-size="13">C</text>
<circle cx="70" cy="170" r="15" style="fill:var(--muted)"/><text x="65" y="175" style="fill:currentColor" font-size="13">D</text>
<circle cx="170" cy="170" r="15" style="fill:var(--muted)"/><text x="165" y="175" style="fill:currentColor" font-size="13">E</text>
<circle cx="270" cy="170" r="15" style="fill:var(--muted)"/><text x="265" y="175" style="fill:currentColor" font-size="13">F</text>
<circle cx="370" cy="170" r="15" style="fill:var(--good)"/><text x="365" y="175" style="fill:currentColor" font-size="13">G</text>
<text x="240" y="36" style="fill:var(--info)" font-size="12">1</text><text x="240" y="52" style="fill:var(--bad)" font-size="12">1</text>
<text x="88" y="96" style="fill:var(--info)" font-size="12">2</text><text x="88" y="112" style="fill:var(--bad)" font-size="12">2</text>
<text x="340" y="96" style="fill:var(--info)" font-size="12">3</text><text x="340" y="112" style="fill:var(--bad)" font-size="12">5</text>
<text x="38" y="196" style="fill:var(--info)" font-size="12">4</text><text x="50" y="196" style="fill:var(--bad)" font-size="12">3</text>
<text x="138" y="196" style="fill:var(--info)" font-size="12">5</text><text x="150" y="196" style="fill:var(--bad)" font-size="12">4</text>
<text x="238" y="196" style="fill:var(--info)" font-size="12">6</text><text x="250" y="196" style="fill:var(--bad)" font-size="12">6</text>
<text x="338" y="196" style="fill:var(--info)" font-size="12">7</text><text x="350" y="196" style="fill:var(--bad)" font-size="12">7</text>
<text x="20" y="222" style="fill:var(--info)" font-size="12">blue = BFS order (level by level)</text>
<text x="240" y="222" style="fill:var(--bad)" font-size="12">red = DFS order (pehle gehraai)</text>
</svg>
<figcaption>Same tree, do orders. BFS: A B C D E F G. DFS: A B D E C F G.</figcaption>
</figure>

Dhyan do: BFS pehle poora level khatam karta hai (B, C dono) phir neeche jaata hai. DFS B ke poore subtree (D, E) ko khatam karke hi C par aata hai. IDS in dono ka mix hai: limit 0 → A; limit 1 → A, B, C; limit 2 → A, B, D, E, C, F, G. Total 11 visits, aur root A teen baar.

## Concept step-by-step

### 1. Basic shabd: frontier, expand, generate, graph search

- **Generate** = kisi node ka successor (padosi/child) banaana.
- **Expand** = frontier se ek node nikaalo aur uske saare successors generate karo.
- **Frontier** = generate ho chuke par abhi expand na hue nodes ki list. Kaunsa node pehle niklega, yahi algorithm decide karta hai.
- **Tree search** vs **graph search:** graph search ek "reached/explored" set rakhta hai; jo node pehle se frontier me hai ya expand ho chuka hai, use dobara add nahi karte. Tree search ye nahi karta, to cycles me ghoom sakta hai.

Har question me do cheezein likhi hoti hain: **tie rule** (aksar alphabetical / left-to-right) aur **goal test kab** (generation par ya expansion par). Inhe literally follow karo.

Trace template: har step ek line — `expand X → frontier [..]`.

Dhyan do: "expansion order" aur "returned path" alag cheezein hain. Path sirf goal se parent pointers peeche follow karke milta hai.

### 2. BFS (breadth-first search)

Frontier = **FIFO queue** (jo pehle aaya, pehle niklega). Level by level chalta hai.

Upar wale graph par BFS (graph search, alphabetical, goal test on expansion):
1. expand S → frontier [A, B]
2. expand A → [B, C, D]
3. expand B → [C, D, G] (D pehle se queue me, skip)
4. expand C → [D, G, E]
5. expand D → [G, E] (G pehle se queue me)
6. pop G → goal. Expansion order: **S, A, B, C, D, G**. Path (parents): G ← B ← S = S–B–G, cost 13.

BFS hamesha **sabse kam edges** wala path deta hai. Ye sabse sasta tabhi hai jab har edge ka cost barabar ho — yahan nahi hai (13 vs best 9).

Dhyan do: BFS order me DFS jaisa "S, A, C, …" likhna sabse common trap hai.

### 3. Goal test: generation par ya expansion par?

- **On generation:** jaise hi goal generate hua (uske parent ko expand karte waqt), ruk jao. Goal kabhi expand nahi hota.
- **On expansion:** goal frontier me intezaar karta hai; jab wo pop hota hai tab ruko.

Upar ke graph par BFS, test on generation: S expand → A, B. A expand → C, D. B expand → D skip, **G generate → stop**. Expanded nodes: S, A, B = **3** (test on expansion me 5 + goal pop).

BFS ke liye early test safe hai (pehla generate hua goal already shallowest). Lekin late test me poora agla level generate hota hai: worst case $O(b^{d+1})$ instead of $O(b^d)$.

Tiny example: $b = 3$, goal depth $d = 2$ par last node. Early test: generated (root sahit) $1 + 3 + 9 = 13$. Late test: goal se pehle ke 8 depth-2 nodes bhi expand honge, $8 \times 3 = 24$ aur → $13 + 24 = 37$.

Dhyan do: UCS ke liye test **hamesha expansion (pop) par** — warna optimality toot jaati hai (step 5).

### 4. DFS (depth-first search)

Frontier = **LIFO stack** (ya recursion). Newest node ka pehla successor, jitna gehra ja sake.

Upar ke graph par recursive DFS (alphabetical, visited skip, stop when G visited):
S → A (A < B) → C (A ke unvisited: C, D; C pehla) → E (C ke: A visited, E) → G (E ke: C visited, G). Visit order: **S, A, C, E, G**. Path S–A–C–E–G, cost $1 + 2 + 3 + 4 = 10$.

Properties:
- **Optimal nahi** — pehla mila goal le leta hai, chahe gehra ya mehenga ho.
- **Tree-search DFS** cycle me ya infinite path par hamesha chal sakta hai → complete nahi.
- **Graph-search DFS** finite graph par ruk jaata hai (har node ek baar).
- Time $O(b^m)$ ($m$ = max depth), space sirf $O(bm)$: current path ke har node ke $b$ children.

Tiny example (memory): $b = 4$, $m = 3$: root + har level ke 4 children $= 1 + 4\times3 = 13$ nodes max.

Dhyan do: stack use karte waqt children ko ulte order me push karo, taaki alphabetical pehla upar rahe. Ulta push karoge to order reverse ho jaayega (tie-order trap).

### 5. UCS (uniform-cost search)

Frontier = **priority queue on path cost $g(n)$** (start se total cost, last edge nahi). Sabse kam $g$ wala pehle.

Do zaroori rules:
1. Agar frontier me pada node kisi **sasti** path se dobara mile, uska $g$ (aur parent) update karo.
2. Goal test **pop par**.

Trace (alphabetical ties):
1. pop S(0) → A:1, B:4
2. pop A(1) → C:3, D:6
3. pop C(3) → E:6. Frontier: B4, D6, E6
4. pop B(4) → D: $\min(6, 4+1) = 5$ **update**; G:13
5. pop D(5) → G: $\min(13, 5+4) = 9$ **update**
6. pop E(6) → G via E $= 10 > 9$, no change
7. pop G(9) → goal.

Order: **S, A, C, B, D, E, G**. Path S–B–D–G, cost **9** = sabse sasta.

**Kyun optimal?** Har step cost $\ge \varepsilon > 0$ hai, to $g$ path ke saath badhta hi hai. UCS nodes ko badhte $g$ order me pop karta hai; jab G pop hua, frontier me sab nodes ka $g \ge 9$ — unse aage koi bhi path 9 se sasta nahi ho sakta.

**Test on generation kyun galat:** step 4 me G cost 13 ke saath generate hua. Wahan rukte to 13 return hota, jabki 9 possible hai.

Negative edges ho to UCS optimal nahi (baad me mila negative edge pehle pop hue path ko sasta bana sakta hai). Saare costs equal ho to UCS = BFS jaisa (depth order).

Time/space: $O(b^{1 + \lfloor C^*/\varepsilon\rfloor})$, $C^*$ = optimal cost — jitni depth tak cost $< C^*$ wale paths ja sakte hain.

Dhyan do: frontier ko last edge weight se sort karna galat; hamesha total $g$.

### 6. Depth-limited search aur IDS

**DLS (limit $\ell$):** DFS jo depth $\ell$ se neeche nahi jaata. Agar $\ell < d$ ($d$ = shallowest goal depth), goal milega hi nahi.

**IDS (iterative deepening):** DLS with $\ell = 0, 1, 2, \dots$ — har iteration **root se naye sire se**. Pehli baar jis limit par goal mile, wahi shallowest goal hai.

- BFS jaisi guarantees: complete (finite $b$), optimal for unit costs.
- DFS jaisi memory: $O(bd)$.
- Time $O(b^d)$ — upar ke levels baar-baar bante hain par wo chhote hain.

Generated nodes (root count nahi, worst case): level $i$ ke nodes $d - i + 1$ iterations me bante hain:
$$N_{IDS} = d\,b + (d-1)\,b^2 + \dots + 1\cdot b^d = \sum_{i=1}^{d}(d - i + 1)\,b^i$$
$$N_{BFS} = b + b^2 + \dots + b^d$$
$b = 10$, $d = 5$: $N_{IDS} = 50 + 400 + 3000 + 20000 + 100000 = 123{,}450$; $N_{BFS} = 111{,}110$ → sirf ~11% zyada. General ratio $\approx b/(b-1)$.

Root $d + 1$ baar visit hota hai (limits $0..d$). Limit $\ell$ ki ek poori iteration complete tree me $\sum_{i=0}^{\ell} b^i$ nodes visit karti hai.

Tiny example: complete binary tree, goal depth 2 par last node: visits $= 1 + 3 + 7 = 11$ (upar wali picture se match ✓).

Dhyan do: limit 0 wali iteration mat bhoolna, aur sirf aakhri iteration mat gino.

### 7. Properties ki table

| Strategy | Complete? | Optimal? | Time | Space |
|---|---|---|---|---|
| BFS | haan (finite $b$) | sirf unit costs | $O(b^d)$ | $O(b^d)$ |
| UCS | haan (costs $\ge\varepsilon$) | haan | $O(b^{1+\lfloor C^*/\varepsilon\rfloor})$ | same |
| DFS | nahi (infinite depth / tree-search cycles) | nahi | $O(b^m)$ | $O(bm)$ |
| DLS ($\ell$) | nahi agar $\ell < d$ | nahi | $O(b^\ell)$ | $O(b\ell)$ |
| IDS | haan (finite $b$) | sirf unit costs | $O(b^d)$ | $O(bd)$ |

Memory ka feel: $b = 10$, $d = 6$, 1 KB/node: BFS $\approx 10^6$ nodes ≈ 1 GB; IDS $\approx bd = 60$ nodes ≈ 60 KB.

Dhyan do: DFS ka **time** $O(b^m)$, **space** $O(bm)$ — inhe swap karna classic trap. IDS space $O(bd)$, $O(b^d)$ nahi.

## Solved examples

Examples 1–4 upar wale graph (S–A 1, S–B 4, A–C 2, A–D 5, B–D 1, B–G 9, C–E 3, D–G 4, E–G 4) par hain.

**Example 1 (MCQ, easy):** BFS graph search from $S$ to $G$, successors generated alphabetically, a node already in the frontier or expanded is not added again, goal test on expansion (the goal counts as expanded). The expansion order is
(A) S, A, C, E, G (B) S, A, B (C) S, A, B, C, D, G (D) S, B, G

**Soch:** BFS = FIFO queue; test on expansion → G pop hone tak chalo.

**Solution:**
1. S → queue [A, B].
2. A → [B, C, D].
3. B → D skip → [C, D, G].
4. C → [D, G, E].
5. D → G already queued → [G, E].
6. G pop → goal.

**Answer: (C).**

**Galti kahan hoti hai:** (A) DFS order hai. (B) goal test on generation wala stop hai. (D) returned path hai, expansion order nahi.

**Example 2 (NAT, medium):** Uniform-cost graph search runs from $S$ to $G$ on the same graph (ties alphabetical, frontier costs lowered when a cheaper path appears, goal test when popped). The cost of the returned path is ______.

**Soch:** UCS → min $g$ pop, updates, goal on pop.

**Solution:**
1. Pop S(0): A1, B4.
2. Pop A(1): C3, D6.
3. Pop C(3): E6.
4. Pop B(4): D $\min(6, 5) = 5$; G13.
5. Pop D(5): G $\min(13, 9) = 9$.
6. Pop E(6): G via E = 10, no change.
7. Pop G(9) → stop. Path S–B–D–G.

**Answer: 9.**

**Galti kahan hoti hai:** D ka update miss karna (D 6 par atka) → G $= \min(13, 10, 10) = 10$. Ya B expand karte hi G (13) par ruk jaana.

**Example 3 (MSQ, medium):** On the same graph, which statements are correct?
- (A) Recursive DFS (alphabetical, visited nodes skipped, stop when $G$ is visited) returns a path of cost 10.
- (B) UCS with the goal test applied when a node is **generated** returns a path of cost 13.
- (C) UCS (goal test on pop) expands E before D.
- (D) BFS returns a different path when the goal test is on expansion than when it is on generation.

**Soch:** har option ka mini-trace.

**Solution:**
1. (A) S → A → C → E → G; cost $1 + 2 + 3 + 4 = 10$ ✓.
2. (B) Pops: S, A, C, B; B ko expand karte waqt G (g = 13) generate → stop → 13 ✓.
3. (C) D pop $g = 5$, E pop $g = 6$ → D pehle ✗.
4. (D) Dono me G ka parent B hi hai → same path S–B–G ✗.

**Answer: (A), (B).**

**Galti kahan hoti hai:** (C) ko DFS ki tarah "C ke baad seedha E" sochkar sahi maan lena — UCS global minimum $g$ pop karta hai, aur update ke baad $g(D) = 5 < 6 = g(E)$. (D) ko "goal test badla to path badla" sochkar sahi maanna — BFS me dono baar G ka parent B hi hai.

**Example 4 (NAT, medium):** BFS graph search on the same graph (alphabetical) with the goal test applied **when a node is generated**, stopping at that moment. How many nodes are expanded?

**Soch:** test on generation → goal ke parent ke expansion ke beech me ruk jao.

**Solution:**
1. Expand S → A, B (koi goal nahi).
2. Expand A → C, D.
3. Expand B → D skip, G generate → goal → stop.
4. Expanded: S, A, B = 3.

**Answer: 3.**

**Galti kahan hoti hai:** G ko bhi "expanded" gin lena → 4; ya on-expansion wala count 6 dena.

**Example 5 (NAT, hard):** In the worst case, iterative deepening search with branching factor $b = 2$ and shallowest goal depth $d = 4$ generates $N = d\,b + (d-1)b^2 + \dots + 1\cdot b^d$ nodes (root not counted). Find $N$. How many does BFS (goal test on generation) generate?

**Soch:** IDS formula: level $i$ ka weight $(d - i + 1)$.

**Solution:**
1. $i = 1$: $4 \times 2 = 8$.
2. $i = 2$: $3 \times 4 = 12$.
3. $i = 3$: $2 \times 8 = 16$.
4. $i = 4$: $1 \times 16 = 16$.
5. $N = 8 + 12 + 16 + 16 = 52$.
6. BFS: $2 + 4 + 8 + 16 = 30$. (Ratio $52/30 \approx 1.73$; $b = 2$ chhota hai, to overhead zyada — bound $b/(b-1) = 2$ ki taraf.)

**Answer: 52** (BFS: 30).

**Galti kahan hoti hai:** weights ulte lagana ($1\cdot b + 2b^2 + \dots$) → $2 + 8 + 24 + 64 = 98$; ya sirf last iteration ginna → 30.

**Example 6 (NAT, hard):** BFS runs on a complete tree with branching factor 3. The only goal is the **last** node at depth 2 (left-to-right). The goal test is applied **when a node is expanded**, and expanding a node generates all its children. Counting the root, how many nodes are generated when the search stops?

**Soch:** late goal test → goal se pehle ke saare same-level nodes expand honge → ek extra level ka kaam.

**Solution:**
1. Depth 0–2 ke saare nodes generate honge: $1 + 3 + 9 = 13$.
2. Depth 2 par goal last (9th) hai; usse pehle ke 8 nodes pop hokar expand honge, har ek 3 children: $8 \times 3 = 24$.
3. Phir goal pop → stop. Total $= 13 + 24 = 37$.

**Answer: 37.**

**Galti kahan hoti hai:** generation-test wala count 13 dena; ya goal ke children bhi jod dena → 40.

## Confusions clear karo

**Q:** BFS aur UCS me kya farak hai?
**A:** BFS edges ginta hai (depth), UCS total cost $g$. Saare edge costs barabar hon to dono same order dete hain; warna BFS sasta path miss kar sakta hai.

**Q:** "Expanded" aur "visited/generated" me kya farak?
**A:** Generated = frontier me aaya. Expanded = frontier se nikla aur uske bachche bane. Goal test on generation me goal generate hota hai par expand nahi hota.

**Q:** Graph search me "already in frontier" wale ko skip karna UCS me bhi?
**A:** UCS me skip nahi, **compare** karo: naya $g$ chhota ho to update. BFS/DFS me bas skip.

**Q:** IDS itna repeat karta hai, phir bhi efficient kyun?
**A:** Tree ke zyaadatar nodes sabse neeche wale level par hote hain (jaise $b = 10$ me ~90%), jo sirf ek baar bante hain. Upar ke chhote levels ka repeat sasta hai.

**Q:** Tree me DFS aur BFS alag path de sakte hain?
**A:** Ek hi goal node ke liye nahi — tree me har node ka root se ek hi path hai. Farak sirf expansion order aur kitne nodes expand hue, usme hai (aur agar kai goals hon to kaunsa mila).

**Q:** DFS kab complete hai?
**A:** Finite graph par graph-search (visited set) ke saath. Infinite depth ya tree-search on cycles me nahi.

**Q:** UCS me tie ho to?
**A:** Question ka tie rule (aksar alphabetical). Tie sirf order badalta hai; returned cost optimal hi rehti hai.

## Khud try karo

1. Upar wale graph par BFS (test on expansion) kitne nodes expand karta hai, goal sahit? Aur returned path ki cost?

<details><summary>Answer dekho</summary>

S, A, B, C, D, G = 6 expansions. Path S–B–G, cost $4 + 9 = 13$.

</details>

2. IDS, goal depth 6: root kitni baar visit hota hai? Aur complete binary tree me limit 3 ki ek poori iteration kitne nodes visit karti hai?

<details><summary>Answer dekho</summary>

Root: limits 0..6 → 7 baar. Limit 3 iteration: $1 + 2 + 4 + 8 = 15$ nodes.

</details>

3. Edges: S–A 2, S–B 3, A–G 6, B–C 1, C–G 2. UCS (goal on pop) ka order aur cost?

<details><summary>Answer dekho</summary>

Pop S(0): A2, B3. Pop A(2): G8. Pop B(3): C4. Pop C(4): G $\min(8, 6) = 6$ update. Pop G(6). Order S, A, B, C, G; path S–B–C–G, cost 6. (Goal on generation hota to 8 milta.)

</details>

4. DFS tree search, $b = 3$, max depth $m = 6$, memory me root + current path ke har node ke saare $b$ children. Max nodes stored?

<details><summary>Answer dekho</summary>

$1 + b\,m = 1 + 3 \times 6 = 19$. Ye $O(bm)$ hai.

</details>

5. Step costs alag-alag positive hain aur cheapest path chahiye. BFS, DFS, IDS, UCS me se kaun guaranteed hai?

<details><summary>Answer dekho</summary>

Sirf UCS (goal test on pop, costs $\ge \varepsilon > 0$). BFS/IDS fewest-edges dete hain; DFS kuch guarantee nahi karta.

</details>

## Ek page me

- Expand = frontier se nikaalo + successors generate karo; tie rule aur goal-test point literally follow karo.
- BFS = FIFO, level by level, fewest edges; optimal sirf equal costs par.
- DFS = LIFO/recursion, gehraai pehle; optimal nahi; tree-search cycles me fas sakta hai; graph-search finite graph par rukta hai.
- UCS = min $g$ (total cost); frontier me sasta path mile to update; goal test pop par → optimal (costs $\ge\varepsilon>0$).
- Goal test on generation: goal ka parent expand hote hi stop. BFS ke liye safe; UCS ke liye galat. Late test BFS: $O(b^{d+1})$.
- Graph search: frontier/expanded node dobara add nahi (UCS me compare + update).
- IDS: limits $0..d$, har baar root se; root $d+1$ baar; $N = \sum_{i=1}^{d}(d-i+1)b^i$; overhead ~$b/(b-1)$.
- Time/space: BFS $O(b^d)$/$O(b^d)$; DFS $O(b^m)$/$O(bm)$; IDS $O(b^d)$/$O(bd)$; UCS $O(b^{1+\lfloor C^*/\varepsilon\rfloor})$.
- Returned path ≠ expansion order; tree me har node ka ek hi path.

Revision ke liye **Short note** tab dekho.
