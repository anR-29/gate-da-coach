# Graph traversal and shortest paths

> **Time:** ~40 min · **Pehle aana chahiye:** queue (FIFO), stack/recursion, trees ka basic idea · **Day:** 34, 35

## Ye topic kyun?

Graph matlab **cheezein (vertices) aur unke beech rishte (edges)** — shehar aur sadkein, log aur dosti, tasks aur unki dependencies. Is topic me seekhenge ki graph ko kaise ghuma kar dekhte hain (BFS, DFS), sabse chhota raasta kaise nikaalte hain (BFS for unweighted, Dijkstra for weighted), aur tasks ko dependency ke order me kaise lagaate hain (topological sort). GATE DA me inke questions visit order, BFS level/shortest path count, DFS edge types, topological order count aur Dijkstra trace ke roop me aate hain — mostly MCQ/NAT, kabhi MSQ.

## Picture se samjho

Socho tum shehar A me ho aur ek khabar phailani hai. **BFS** (Breadth-First Search) aisa hai jaise paani me patthar phenkna: pehle A ke seedhe padosi (1 kadam door), phir unke padosi (2 kadam), phir 3 kadam… lehar ki tarah, level by level. **DFS** (Depth-First Search) bhool-bhulaiya me ghoomne jaisa hai: ek raasta pakdo aur jitna gehra ja sakte ho jao; band gali aaye tabhi wapas (backtrack) aao aur agla raasta lo.

<figure class="fig">
<svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
<line x1="75" y1="120" x2="165" y2="60" style="stroke:currentColor"/>
<line x1="78" y1="130" x2="162" y2="130" style="stroke:currentColor"/>
<line x1="75" y1="140" x2="165" y2="200" style="stroke:currentColor"/>
<line x1="197" y1="56" x2="283" y2="84" style="stroke:currentColor"/>
<line x1="197" y1="124" x2="283" y2="96" style="stroke:currentColor"/>
<line x1="197" y1="136" x2="283" y2="164" style="stroke:currentColor"/>
<line x1="197" y1="204" x2="283" y2="176" style="stroke:currentColor"/>
<line x1="317" y1="96" x2="403" y2="124" style="stroke:currentColor"/>
<line x1="317" y1="164" x2="403" y2="136" style="stroke:currentColor"/>
<circle cx="60" cy="130" r="18" style="fill:var(--mark);fill-opacity:0.3;stroke:currentColor"/>
<text x="60" y="135" text-anchor="middle" style="fill:currentColor">A</text>
<circle cx="180" cy="50" r="18" style="fill:none;stroke:currentColor"/>
<text x="180" y="55" text-anchor="middle" style="fill:currentColor">B</text>
<circle cx="180" cy="130" r="18" style="fill:none;stroke:currentColor"/>
<text x="180" y="135" text-anchor="middle" style="fill:currentColor">C</text>
<circle cx="180" cy="210" r="18" style="fill:none;stroke:currentColor"/>
<text x="180" y="215" text-anchor="middle" style="fill:currentColor">D</text>
<circle cx="300" cy="90" r="18" style="fill:none;stroke:currentColor"/>
<text x="300" y="95" text-anchor="middle" style="fill:currentColor">E</text>
<circle cx="300" cy="170" r="18" style="fill:none;stroke:currentColor"/>
<text x="300" y="175" text-anchor="middle" style="fill:currentColor">F</text>
<circle cx="420" cy="130" r="18" style="fill:none;stroke:currentColor"/>
<text x="420" y="135" text-anchor="middle" style="fill:currentColor">G</text>
<text x="180" y="86" text-anchor="middle" style="fill:var(--good)">(1)</text>
<text x="180" y="166" text-anchor="middle" style="fill:var(--good)">(1)</text>
<text x="180" y="246" text-anchor="middle" style="fill:var(--good)">(1)</text>
<text x="300" y="64" text-anchor="middle" style="fill:var(--good)">(2)</text>
<text x="300" y="206" text-anchor="middle" style="fill:var(--good)">(2)</text>
<text x="420" y="166" text-anchor="middle" style="fill:var(--good)">(4)</text>
<text x="60" y="272" text-anchor="middle" style="fill:var(--muted)">level 0</text>
<text x="180" y="272" text-anchor="middle" style="fill:var(--muted)">level 1</text>
<text x="300" y="272" text-anchor="middle" style="fill:var(--muted)">level 2</text>
<text x="420" y="272" text-anchor="middle" style="fill:var(--muted)">level 3</text>
</svg>
<figcaption>Undirected graph, A se BFS levels (columns). Green number = A se us vertex tak kitne alag-alag shortest paths hain.</figcaption>
</figure>

Notice karo: har column ek BFS **level** hai = A se kam se kam kitne edges door. G tak 3 edges lagte hain, aur aise 4 alag raaste hain (A-B-E-G, A-C-E-G, A-C-F-G, A-D-F-G). Har edge ya to ek hi level ke andar hai ya agle level tak jaata hai — kabhi do level nahi koodta. Ye graph poore lesson me "figure wala graph" hai; neighbours hamesha alphabetical order me lenge.

## Concept step-by-step

### 1. Graph ki basic baatein

- **Vertex** (node) aur **edge** (do vertices ka jod). n = vertices, m = edges.
- **Undirected:** edge dono taraf chalta hai (dosti). **Directed:** sirf arrow ki disha me (follow karna).
- **Adjacency list:** har vertex ke padosiyon ki list. Figure: A: [B, C, D], C: [A, E, F], …
- **Weighted:** edges par number (doori, cost).

Dhyan do: question jis order me adjacency list deta hai, wahi order use karo — khud sort mat karo (jab tak "alphabetical" na bola ho).

### 2. BFS (Breadth-First Search)

```python
from collections import deque
def bfs(s):
    level = {s: 0}
    q = deque([s])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:            # given order
            if v not in level:      # mark when ENQUEUED
                level[v] = level[u] + 1
                q.append(v)
    return order, level
```

**Trace (figure wala graph, start A):**

| Dequeue | Naye enqueue | Queue (front → rear) |
|---|---|---|
| A | B, C, D | B C D |
| B | E | C D E |
| C | F (E pehle se marked) | D E F |
| D | – (F marked) | E F |
| E | G | F G |
| F | – | G |
| G | – | (khaali) |

BFS order: **A B C D E F G**. Levels: A 0; B, C, D 1; E, F 2; G 3. Queue me ek time par max 3 vertices.

**Kyun mark-on-enqueue?** Agar dequeue par mark karte, to E do baar queue me chala jaata (B se bhi, C se bhi).

**Facts:**
- BFS level = s se **fewest edges** (unweighted shortest path).
- Har edge (u, v) ke liye |level(u) − level(v)| ≤ 1.
- Time O(V + E) adjacency list ke saath (har vertex ek baar, har edge ek/do baar).

Dhyan do: directed graph me BFS sirf arrow ki disha me chalta hai.

### 3. Shortest paths ki ginti (BFS levels se)

**Rule:** paths(s) = 1. Har vertex v ke liye: paths(v) = un sab padosiyon u ke paths(u) ka sum jo **ek level upar** hain.

**Figure:** B, C, D = 1 each. E ke upar wale padosi B, C → 1 + 1 = 2. F: C, D → 2. G: E, F → 2 + 2 = **4**.

Kyun? Har shortest path G tak aakhri kadam me ya to E se aata hai ya F se, aur E tak pahunchne ke 2 shortest tareeke hain, F tak bhi 2.

Dhyan do: same level ke padosi ko mat jodo — wo raasta lamba ho jaata hai.

### 4. DFS (Depth-First Search)

```python
def dfs(u):
    visited.add(u)
    order.append(u)
    for v in adj[u]:
        if v not in visited:
            dfs(v)
```

**Trace (figure graph, A se, alphabetical):** A → B (A ka pehla) → E (B ka pehla unvisited) → C (E ke B visited, C naya) → F (C ke A, E visited, F naya) → D (F ke C visited, D naya) → D ke sab visited, wapas F → G (F ka agla) → sab visited, backtrack khatam.

DFS order: **A B E C F D G**.

**Depth ≠ distance:** DFS tree me G tak raasta A-B-E-C-F-G (5 edges), par asli shortest distance 3 hai. DFS depth kabhi distance mat samjho.

**Stack wala DFS:** agar explicit stack me neighbours list order me push karo aur pop karo, to aakhri push wala pehle niklega — neighbours **ulte order** me visit hote hain. Figure par: A, D, F, G, E, C, B.

**Valid order check:**
- **DFS:** kisi vertex ko tab tak "chhod" nahi sakte jab tak uska koi unvisited padosi bacha ho. Agla vertex hamesha current vertex (ya backtrack ke baad sabse nazdeeki ancestor) ka padosi hona chahiye.
- **BFS:** har dequeued vertex ke **naye** padosi ek block me aate hain, aur blocks usi order me jisme vertices dequeue hue.

Dhyan do: "DFS order" poocha ho to backtrack karte waqt vertices dobara mat likho — sirf pehli visit.

### 5. Connected components

**Component** = vertices ka aisa group jisme sab ek-doosre tak pahunch sakte hain. Gin-ne ka tareeka: har unvisited vertex se nayi BFS/DFS shuru karo; kitni baar shuru kiya = k. **Akela (isolated) vertex bhi ek component hai.**

**Edges ka bound:** har component (n_i vertices) ko jude rehne ke liye kam se kam $n_i - 1$ edges chahiye. Sab jodo: $m \ge n - k$. Barabar tabhi jab har component ek tree ho (koi cycle nahi) — yaani graph **forest** hai.

Dhyan do: $k = n - m$ sirf forest me sahi hai; cycle ho to galat.

### 6. Directed DFS: discovery/finish time aur edge types

DFS me har vertex ko do times do: d[u] (jab pehli baar mile) aur f[u] (jab uska kaam khatam ho). Ek hi clock har event par 1 badhti hai.

<figure class="fig">
<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="gr-a2" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" style="fill:currentColor"/></marker></defs>
<line x1="225" y1="50" x2="147" y2="99" style="stroke:currentColor;stroke-width:2" marker-end="url(#gr-a2)"/>
<line x1="130" y1="128" x2="130" y2="170" style="stroke:currentColor;stroke-width:2" marker-end="url(#gr-a2)"/>
<line x1="255" y1="50" x2="333" y2="99" style="stroke:currentColor;stroke-width:2" marker-end="url(#gr-a2)"/>
<line x1="350" y1="128" x2="350" y2="170" style="stroke:currentColor;stroke-width:2" marker-end="url(#gr-a2)"/>
<line x1="229" y1="55" x2="142" y2="174" style="stroke:var(--info);stroke-dasharray:5 3" marker-end="url(#gr-a2)"/>
<line x1="333" y1="116" x2="149" y2="183" style="stroke:var(--good);stroke-dasharray:5 3" marker-end="url(#gr-a2)"/>
<path d="M 112 190 Q 0 60 220 38" style="fill:none;stroke:var(--bad);stroke-dasharray:5 3" marker-end="url(#gr-a2)"/>
<circle cx="240" cy="40" r="18" style="fill:var(--mark);fill-opacity:0.3;stroke:currentColor"/>
<text x="240" y="45" text-anchor="middle" style="fill:currentColor">a</text>
<circle cx="130" cy="110" r="18" style="fill:none;stroke:currentColor"/>
<text x="130" y="115" text-anchor="middle" style="fill:currentColor">b</text>
<circle cx="350" cy="110" r="18" style="fill:none;stroke:currentColor"/>
<text x="350" y="115" text-anchor="middle" style="fill:currentColor">c</text>
<circle cx="130" cy="190" r="18" style="fill:none;stroke:currentColor"/>
<text x="130" y="195" text-anchor="middle" style="fill:currentColor">d</text>
<circle cx="350" cy="190" r="18" style="fill:none;stroke:currentColor"/>
<text x="350" y="195" text-anchor="middle" style="fill:currentColor">e</text>
<text x="262" y="30" style="fill:var(--muted)">1/10</text>
<text x="122" y="154" text-anchor="end" style="fill:var(--muted)">2/5</text>
<text x="358" y="154" style="fill:var(--muted)">6/9</text>
<text x="130" y="228" text-anchor="middle" style="fill:var(--muted)">3/4</text>
<text x="350" y="228" text-anchor="middle" style="fill:var(--muted)">7/8</text>
<text x="40" y="112" text-anchor="middle" style="fill:var(--bad)">back</text>
<text x="215" y="128" text-anchor="middle" style="fill:var(--info)">forward</text>
<text x="255" y="178" text-anchor="middle" style="fill:var(--good)">cross</text>
</svg>
<figcaption>Directed graph a→b, b→d, d→a, a→c, c→d, c→e, a→d. DFS a se (alphabetical). Moti lines = tree edges; times d/f har vertex ke paas.</figcaption>
</figure>

**Trace:** a (d=1) → b (2) → d (3). d→a: a abhi **open** (finish nahi hua) → back edge. d finish (4), b finish (5). Wapas a: a→c → c (6). c→d: d finished, aur d[d] = 3 < d[c] = 6 → cross. c→e → e (7), finish 8; c finish 9. a→d: d finished, d[a] = 1 < d[d] = 3 → forward. a finish 10.

**Edge (u → v) ke types, jab DFS u par hai aur edge dekhta hai:**

| v ki haalat | Type | Pehchaan |
|---|---|---|
| unvisited | **tree** | DFS isse v par jaata hai |
| visited, abhi open (ancestor) | **back** | d[v] < d[u], f[v] abhi nahi |
| finished, u ka descendant | **forward** | d[u] < d[v] < f[v] < f[u] |
| finished, descendant nahi | **cross** | d[v] < f[v] < d[u] |

- **Cycle test:** directed graph me cycle hai ⇔ DFS me koi back edge mile. (Yahan a → b → d → a cycle.)
- **Undirected DFS:** sirf tree aur back edges. (Undirected me "forward" edge wahi edge hai jo pehle back ke roop me dekh li gayi, aur cross possible nahi kyunki DFS us vertex tak pehle hi chala jaata.)

Dhyan do: a→d tree edge **nahi** hai, kyunki d pehle hi b ke through mil chuka tha. Discovery times track karo.

### 7. Topological sort

**DAG** (Directed Acyclic Graph — directed, bina cycle) me aisa order chahiye jisme har edge u → v ke liye u pehle aaye. Jaise "kapde: banian pehle, shirt baad me".

**Example DAG:** a→c, b→c, b→d, c→e, d→e, e→f.

**Tareeka 1 — Kahn:** jinka in-degree (aane wale edges) 0 hai unme se ek nikaalo, uske out-edges hatao, repeat.
- In-degree: a 0, b 0, c 2, d 1, e 2, f 1.
- a nikaalo → c: 1. b nikaalo → c: 0, d: 0. c → e: 1. d → e: 0. e → f: 0. f.
- Order (sabse chhota alphabet pehle): **a b c d e f**.

**Tareeka 2 — DFS finishing order ulta:** DFS (alphabetical, restart from smallest unvisited): a → c → e → f. Finish: f, e, c, a. Phir b → d (c visited) → d finish, b finish. Finish list: f e c a d b → ulta: **b d a c e f**. Ye bhi valid hai.

*Kyun ulta?* Edge u → v ke liye v hamesha u se pehle finish hota hai (DAG me back edge nahi hoti). To f[u] > f[v]; finish time ke ghatte order me lagao to u pehle.

**Kitne topological orders?** Constraints fix karo, independent parts ko interleave karo. Yahan e aur f last do jagah fixed (e ko a, b, c, d sab ke baad aana hai). {a, b, c, d} with a<c, b<c, b<d: c se pehle a, b dono; d ke liye sirf b. Orders: abcd, abdc, bacd, badc, bdac → **5**.

Dhyan do: DFS finish list ko ulta karna mat bhoolo.

### 8. Dijkstra (weighted, non-negative)

**Idea:** sabse kam tentative distance wala unfinished vertex uthao (wo ab final hai), uske out-edges **relax** karo:
$$d[v] = \min(d[v],\ d[u] + w(u, v)).$$

<figure class="fig">
<svg viewBox="0 0 480 265" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="gr-a3" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" style="fill:currentColor"/></marker></defs>
<line x1="55" y1="121" x2="153" y2="60" style="stroke:currentColor" marker-end="url(#gr-a3)"/>
<text x="95" y="84" text-anchor="middle" style="fill:var(--info)">6</text>
<line x1="55" y1="139" x2="153" y2="200" style="stroke:currentColor" marker-end="url(#gr-a3)"/>
<text x="95" y="184" text-anchor="middle" style="fill:var(--info)">2</text>
<line x1="170" y1="192" x2="170" y2="70" style="stroke:currentColor" marker-end="url(#gr-a3)"/>
<text x="158" y="135" text-anchor="middle" style="fill:var(--info)">3</text>
<line x1="188" y1="50" x2="280" y2="50" style="stroke:currentColor" marker-end="url(#gr-a3)"/>
<text x="235" y="42" text-anchor="middle" style="fill:var(--info)">1</text>
<line x1="181" y1="196" x2="287" y2="66" style="stroke:currentColor" marker-end="url(#gr-a3)"/>
<text x="249" y="148" text-anchor="middle" style="fill:var(--info)">7</text>
<line x1="300" y1="68" x2="300" y2="190" style="stroke:currentColor" marker-end="url(#gr-a3)"/>
<text x="312" y="135" text-anchor="middle" style="fill:var(--info)">2</text>
<line x1="188" y1="210" x2="280" y2="210" style="stroke:currentColor" marker-end="url(#gr-a3)"/>
<text x="235" y="228" text-anchor="middle" style="fill:var(--info)">9</text>
<line x1="315" y1="201" x2="413" y2="140" style="stroke:currentColor" marker-end="url(#gr-a3)"/>
<text x="377" y="184" text-anchor="middle" style="fill:var(--info)">3</text>
<line x1="315" y1="59" x2="413" y2="120" style="stroke:currentColor" marker-end="url(#gr-a3)"/>
<text x="377" y="84" text-anchor="middle" style="fill:var(--info)">6</text>
<circle cx="40" cy="130" r="18" style="fill:var(--mark);fill-opacity:0.3;stroke:currentColor"/>
<text x="40" y="135" text-anchor="middle" style="fill:currentColor">s</text>
<circle cx="170" cy="50" r="18" style="fill:none;stroke:currentColor"/>
<text x="170" y="55" text-anchor="middle" style="fill:currentColor">a</text>
<circle cx="170" cy="210" r="18" style="fill:none;stroke:currentColor"/>
<text x="170" y="215" text-anchor="middle" style="fill:currentColor">b</text>
<circle cx="300" cy="50" r="18" style="fill:none;stroke:currentColor"/>
<text x="300" y="55" text-anchor="middle" style="fill:currentColor">c</text>
<circle cx="300" cy="210" r="18" style="fill:none;stroke:currentColor"/>
<text x="300" y="215" text-anchor="middle" style="fill:currentColor">d</text>
<circle cx="430" cy="130" r="18" style="fill:none;stroke:currentColor"/>
<text x="430" y="135" text-anchor="middle" style="fill:currentColor">t</text>
<text x="40" y="102" text-anchor="middle" style="fill:var(--good)">0</text>
<text x="170" y="22" text-anchor="middle" style="fill:var(--good)">5</text>
<text x="300" y="22" text-anchor="middle" style="fill:var(--good)">6</text>
<text x="170" y="252" text-anchor="middle" style="fill:var(--good)">2</text>
<text x="300" y="252" text-anchor="middle" style="fill:var(--good)">8</text>
<text x="430" y="102" text-anchor="middle" style="fill:var(--good)">11</text>
</svg>
<figcaption>Weighted directed graph (blue = weights). Green = Dijkstra ke baad s se final shortest distance.</figcaption>
</figure>

**Trace (s se):**

| Extract (final) | a | b | c | d | t |
|---|---|---|---|---|---|
| start | ∞ | ∞ | ∞ | ∞ | ∞ |
| s (0) | 6 | 2 | ∞ | ∞ | ∞ |
| b (2) | **5** (2+3) | 2 | 9 | 11 | ∞ |
| a (5) | 5 | | **6** (5+1) | 11 | ∞ |
| c (6) | | | 6 | **8** (6+2) | 12 |
| d (8) | | | | 8 | **11** (8+3) |
| t (11) | | | | | 11 |

Shortest s → t = **11** (s → b → a → c → d → t: 2+3+1+2+3). d[t] do baar update hua (∞ → 12 → 11).

**Kyun sahi hai (w ≥ 0 par)?** Jab u nikalta hai to d[u] sabse chhota hai. Koi aur raasta u tak kisi unfinished vertex x se hokar aayega, jiska d[x] ≥ d[u], aur aage ke edges ≥ 0 — to wo d[u] se chhota ho hi nahi sakta. Isliye u final.

**Negative edge par toot-ta hai:** upar wala argument "aage ke edges ≥ 0" par tika hai. Ek bhi negative edge (cycle na bhi ho) finalized vertex ko baad me sasta bana sakta hai, par Dijkstra use update nahi karta.

**Bellman-Ford:** saare edges ko V − 1 rounds tak relax karo. Negative edges chalte hain, bas source se pahunchne wala **negative cycle** na ho (warna "shortest" defined hi nahi). Time O(VE).

**Har weight me constant jodna fix nahi hai:** jis raaste me zyada edges hain uska cost zyada badhta hai, to shortest path badal sakta hai.

Dhyan do: extract hamesha sabse chhota **tentative** d wala unfinished vertex — order se nahi, value se.

## Solved examples

**Example 1 (MCQ, easy):** Figure wale graph (A–G) par A se BFS, neighbours alphabetical, enqueue par mark. Visit order?
(A) A B E C F D G (B) A B C D E F G (C) A D C B F E G (D) A B C D E G F

**Soch:** BFS = queue, level by level.

**Solution:** Concept 2 ka trace: A; phir B C D (level 1); B se E, C se F (level 2); E se G. Order **A B C D E F G → (B)**.

**Galti kahan hoti hai:** (A) DFS order hai. (C) stack ki tarah ulta. (D) G ko F se pehle rakhta hai — par F, E ke saath level 2 me queue me pehle hi tha.

**Example 2 (NAT, medium):** Undirected graph, vertices 1–8, edges 1-2, 1-3, 2-4, 3-4, 3-5, 4-6, 5-6, 6-7, 5-8, 7-8. Vertex 1 se vertex 7 tak kitne alag shortest paths hain?

**Soch:** "kitne shortest paths" → BFS levels + counts.

**Solution:**
1. Levels: 1 → 0; 2, 3 → 1; 4 (from 2, 3), 5 (from 3) → 2; 6 (from 4, 5), 8 (from 5) → 3; 7 (from 6, 8) → 4.
2. Counts: p(2) = p(3) = 1; p(4) = 1 + 1 = 2; p(5) = 1; p(6) = p(4) + p(5) = 3; p(8) = p(5) = 1; p(7) = p(6) + p(8) = 3 + 1 = **4**.

**Galti kahan hoti hai:** 5-6 jaise edges ko bhool jaana (p(6) = 2 aata, total 3), ya 7 tak saare raaste (lambe bhi) gin-na.

**Example 3 (NAT, easy):** Undirected graph, vertices 1–11, edges 1-2, 2-3, 3-1, 4-5, 6-7, 7-8, 9-10. Kitne connected components?

**Soch:** groups gino, isolated vertex bhi ek component.

**Solution:**
1. {1, 2, 3}, {4, 5}, {6, 7, 8}, {9, 10}, {11} → **5**.
2. Check: m = 7 ≥ n − k = 6 ✓ (ek extra edge = triangle ki cycle).

**Galti kahan hoti hai:** k = n − m = 4 likhna (cycle ignore), ya 11 ko bhool jaana.

**Example 4 (MCQ, medium):** Directed graph: p→q, q→r, r→p, p→s, s→r, s→t, q→t. DFS p se, out-neighbours alphabetical. Edges r→p aur s→r ke types?
(A) back, cross (B) back, forward (C) tree, cross (D) cross, back

**Soch:** d/f times banao; v ki haalat dekho jab edge scan ho.

**Solution:**
1. p (d1) → q (d2) → r (d3). r→p: p open → **back**. r finish (4).
2. q→t: t (d5), finish 6. q finish 7.
3. p→s: s (d8). s→r: r finished, d[r] = 3 < d[s] = 8, r s ka descendant nahi → **cross**. s→t: bhi cross. s finish 9, p finish 10.
Answer **(A)**.

**Galti kahan hoti hai:** s→r ko forward kehna kyunki "s se r tak arrow hai". Forward ke liye r ko **s ke neeche** (s ke baad discover) hona chahiye; r to s se pehle hi mil chuka tha.

**Example 5 (NAT, medium):** DAG, vertices a, b, c, d, e; edges a→b, a→c, b→d, c→d. (e ka koi edge nahi.) Kitne topological orders?

**Soch:** constrained part ke orders × free vertex ko daalne ki jagah.

**Solution:**
1. {a, b, c, d}: a pehle, d last, beech me b, c kisi bhi order → 2 orders (abcd, acbd).
2. e ko 5 me se kisi bhi position par daal sakte → 2 × 5 = **10**.

**Galti kahan hoti hai:** e ko ignore karke 2 bolna, ya 5! = 120 se shuru karke constraints galat ghataana.

**Example 6 (MCQ, hard):** Directed graph: s→a (3), s→b (6), b→a (−5), a→c (1), c→t (4). Dijkstra (extracted vertex kabhi update nahi hota) s se chalta hai. Wo t ki kya distance report karega, aur sach me shortest kya hai?
(A) reports 8, true 8 (B) reports 8, true 6 (C) reports 6, true 6 (D) reports 3, true 6

**Soch:** negative edge → Dijkstra ka finalized vertex baad me sasta ho sakta hai.

**Solution:**
1. Extract s: a = 3, b = 6.
2. Extract a (3): c = 4. Extract c (4): t = 8.
3. Extract b (6): b→a: 6 − 5 = 1 < 3, par a final hai → ignore. Extract t: **8** report.
4. Asli: s → b → a → c → t = 6 − 5 + 1 + 4 = **6**. Answer **(B)**.

**Galti kahan hoti hai:** (C) — "no negative cycle hai to Dijkstra sahi" soch lena. Ek negative edge kaafi hai. Aur sab weights me +5 karke (s→a→c→t = 23, s→b→a→c→t = 26) Dijkstra phir bhi galat raasta chunega.

## Confusions clear karo

**Q:** BFS me vertex ko enqueue par mark karein ya dequeue par?
**A:** Enqueue par. Isse har vertex queue me ek hi baar aata hai, aur order wahi rehta hai jo GATE expect karta hai. Stem kuch aur bole to wahi follow karo.

**Q:** BFS aur DFS dono O(V + E) hain, to farak kya?
**A:** Time same, kaam alag. BFS unweighted shortest distance aur levels deta hai. DFS cycle detection, edge types, topological sort ke liye.

**Q:** Forward edge aur tree edge me kaise farak karun?
**A:** Dono ancestor → descendant jaate hain. Tree edge wo hai jisse DFS **pehli baar** v tak gaya. Agar v pehle hi kisi aur raaste se mil chuka (aur finish ho chuka), to wo forward hai.

**Q:** Cross edge sirf "side" me jaata hai?
**A:** Cross edge kisi aise finished vertex ko jaata hai jo na ancestor hai na descendant — alag branch ya pichla DFS tree. Uska $d[v] < d[u]$ hota hai (v pehle discover hua).

**Q:** Topological sort unique hota hai kya?
**A:** Zaroori nahi. Unique tabhi hai jab order me har consecutive pair ke beech edge ho (ek Hamiltonian path). Isliye "kitne orders" wale sawaal aate hain.

**Q:** Dijkstra negative edge par kab sahi bhi aa jaata hai?
**A:** Kabhi-kabhi coincidence se sahi aata hai, par guarantee nahi. "Always correct" ke liye saare weights ≥ 0 chahiye. Negative edges ke liye Bellman-Ford.

## Khud try karo

**1.** Figure wale graph (A–G) par stack-based DFS: stack me A daalo; pop karo, visited nahi to visit karo aur uske unvisited neighbours alphabetical order me push karo. Visit order?

<details><summary>Answer dekho</summary>

Pop A → push B, C, D. Pop D → push F. Pop F → push C, G. Pop G → push E. Pop E → push B, C. Pop C (visit). Pop B (visit). Baaki pops pehle se visited.
Order: **A D F G E C B** — recursive DFS (A B E C F D G) se bilkul alag, kyunki stack aakhri push ko pehle nikaalta hai.

</details>

**2.** Kya **A C B D F E G** figure wale graph ka valid BFS order hai (kisi adjacency order ke liye)? Aur **A B C D F E G**?

<details><summary>Answer dekho</summary>

Pehla: A ke naye padosi {B, C, D} kisi bhi order (C B D) ✓. Pehle C dequeue hota hai, uske naye {E, F} kisi bhi order me (F E) ✓. B, D se kuch naya nahi. Phir F se G ✓. **Valid.**
Doosra: B pehle dequeue hota hai, uska naya padosi E hai, to E ka block F se pehle aana chahiye. Yahan F pehle hai → **invalid**.

</details>

**3.** Directed graph s→a, s→b, a→c, b→c, c→d, d→e, b→e. BFS s se, arrows ke saath. Distance exactly 2 par kitne vertices?

<details><summary>Answer dekho</summary>

Level 1: a, b. Level 2: c (a se), e (b se). Level 3: d (c se). Distance 2 par **2** vertices (c, e). Dhyan do: e tak d ke through 4 kadam bhi hain, par BFS sabse chhota (2) leta hai.

</details>

**4.** Concept 8 wale Dijkstra me d[d] kitni baar update hua (∞ se pehla change bhi gino)?

<details><summary>Answer dekho</summary>

b extract hone par d[d] = 2 + 9 = 11 (update 1). c extract hone par 6 + 2 = 8 < 11 (update 2). **2** baar.

</details>

**5.** Undirected graph me n = 20, k = 4 components, aur m = 16. Kya graph me cycle ho sakti hai?

<details><summary>Answer dekho</summary>

n − k = 16 = m. Equality ⇔ forest. **Nahi**, koi cycle nahi — har component ek tree hai.

</details>

## Ek page me

- BFS: FIFO queue, enqueue par mark, given order me neighbours; level = fewest edges.
- BFS tree: har edge levels ko max 1 se jodta hai; shortest path count = upar wale level ke padosiyon ke counts ka sum.
- DFS: pehla unvisited padosi, dead end par backtrack; depth ≠ distance.
- Stack DFS (list order me push) neighbours ulte order me visit karta hai.
- Valid BFS: naye padosi blocks me, dequeue order me. Valid DFS: unvisited padosi bacha ho to vertex chhod nahi sakte.
- Components: har unvisited se nayi search; isolated vertex bhi gino; $m \ge n - k$, barabar ⇔ forest.
- Directed DFS: tree (naya), back (open ancestor, cycle!), forward (finished descendant, d[u] < d[v]), cross (finished, d[v] < d[u]).
- Undirected DFS: sirf tree + back.
- Topological sort: Kahn (in-degree 0 hatao) ya DFS finish order **ulta**; count = constraints + interleaving.
- Dijkstra: min tentative d extract, relax $d[v] = \min(d[v], d[u] + w)$; sirf $w \ge 0$.
- Negative edge (bina cycle bhi) Dijkstra tod sakta hai; Bellman-Ford (V − 1 rounds) chahiye; constant jodna fix nahi.
- BFS/DFS O(V + E) adjacency list ke saath.

Revision ke liye **Short note** tab dekho.
