# Clustering: k-means, k-medoids, hierarchical

> **Time:** ~35 min · **Pehle aana chahiye:** Euclidean distance, mean aur median, distance matrix padhna · **Day:** 52, 53

## Ye topic kyun?

Clustering me labels nahi hote; kaam hai "milte-julte points ko ek group me daalna". GATE DA isme bahut calculation poochta hai: k-means ke ek-do iterations trace karo aur naya centroid ya SSE batao (NAT), medoid ya PAM swap ka cost (NAT), distance matrix se single/complete/average linkage ke merges aur heights (NAT, aksar 2 marks), dendrogram cut karke clusters gino, aur linkage ka behaviour (chaining, MST) par MCQ/MSQ.

## Picture se samjho

Socho ek shehar me 6 ghar hain aur tumhe 2 ration shops kholni hain. Har ghar apni sabse paas wali shop par jaayega (assignment). Phir har shop ko apne customers ke "beech" (mean) me shift kar do taaki sabka total chalna kam ho (update). Ye do kaam baar-baar karo jab tak kuch na badle — yahi k-means hai.

<figure class="fig">
<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="230" x2="320" y2="230" stroke="currentColor"/>
<line x1="50" y1="240" x2="50" y2="40" stroke="currentColor"/>
<text x="310" y="248" style="fill:currentColor" font-size="12">x</text>
<text x="34" y="46" style="fill:currentColor" font-size="12">y</text>
<circle cx="50" cy="230" r="6" style="fill:var(--info)"/>
<circle cx="100" cy="230" r="6" style="fill:var(--info)"/>
<circle cx="50" cy="150" r="6" style="fill:var(--info)"/>
<circle cx="250" cy="70" r="6" style="fill:var(--good)"/>
<circle cx="300" cy="110" r="6" style="fill:var(--good)"/>
<circle cx="200" cy="70" r="6" style="fill:var(--good)"/>
<path d="M61 197 L73 209 M73 197 L61 209" style="stroke:var(--mark)" stroke-width="3"/>
<path d="M244 77 L256 89 M256 77 L244 89" style="stroke:var(--mark)" stroke-width="3"/>
<line x1="67" y1="203" x2="50" y2="230" style="stroke:var(--muted)" stroke-dasharray="3 3"/><line x1="67" y1="203" x2="100" y2="230" style="stroke:var(--muted)" stroke-dasharray="3 3"/><line x1="67" y1="203" x2="50" y2="150" style="stroke:var(--muted)" stroke-dasharray="3 3"/>
<line x1="250" y1="83" x2="250" y2="70" style="stroke:var(--muted)" stroke-dasharray="3 3"/><line x1="250" y1="83" x2="300" y2="110" style="stroke:var(--muted)" stroke-dasharray="3 3"/><line x1="250" y1="83" x2="200" y2="70" style="stroke:var(--muted)" stroke-dasharray="3 3"/>
<line x1="97" y1="50" x2="222" y2="240" style="stroke:var(--bad)" stroke-dasharray="6 4" opacity="0.7"/>
<text x="330" y="80" style="fill:currentColor" font-size="12">× = centroid</text>
<text x="330" y="100" style="fill:currentColor" font-size="12">(cluster ka mean)</text>
<text x="330" y="140" style="fill:currentColor" font-size="12">red dashed line:</text>
<text x="330" y="158" style="fill:currentColor" font-size="12">dono centroids se</text>
<text x="330" y="176" style="fill:currentColor" font-size="12">barabar door</text>
</svg>
<figcaption>Converged k-means (k = 2): har point apne nearest centroid ka hai, aur har centroid apne points ka mean hai.</figcaption>
</figure>

Dhyan do: do centroids ke beech ki boundary ek seedhi line hai (dono se barabar distance). Isliye k-means hamesha "convex", gol-matol clusters banata hai; do concentric rings (ek ke andar ek) ko alag nahi kar sakta, kyunki dono ka centre same hai.

Ab hierarchical clustering: shuru me har point apna cluster; har step me sabse paas ke do clusters ko jod do. Jodne ka record ek tree (dendrogram) me hota hai; merge jitni distance par hua, utni height par horizontal line.

<figure class="fig">
<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="225" x2="30" y2="30" stroke="currentColor"/>
<text x="14" y="189" style="fill:currentColor" font-size="11">1</text><text x="14" y="154" style="fill:currentColor" font-size="11">2</text><text x="14" y="119" style="fill:currentColor" font-size="11">3</text><text x="14" y="84" style="fill:currentColor" font-size="11">4</text><text x="14" y="49" style="fill:currentColor" font-size="11">5</text>
<text x="36" y="24" style="fill:currentColor" font-size="11">height</text>
<polyline points="60,220 60,150 120,150 120,220" fill="none" stroke="currentColor" stroke-width="2"/>
<polyline points="280,220 280,115 340,115 340,220" fill="none" stroke="currentColor" stroke-width="2"/>
<polyline points="200,220 200,80 310,80 310,115" fill="none" stroke="currentColor" stroke-width="2"/>
<polyline points="90,150 90,45 255,45 255,80" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="55" y="240" style="fill:currentColor" font-size="13">P</text><text x="115" y="240" style="fill:currentColor" font-size="13">Q</text><text x="195" y="240" style="fill:currentColor" font-size="13">R</text><text x="275" y="240" style="fill:currentColor" font-size="13">S</text><text x="335" y="240" style="fill:currentColor" font-size="13">T</text>
<line x1="30" y1="97" x2="380" y2="97" style="stroke:var(--bad)" stroke-dasharray="6 4"/>
<text x="350" y="92" style="fill:var(--bad)" font-size="11">cut h = 3.5</text>
<circle cx="90" cy="97" r="4" style="fill:var(--mark)"/><circle cx="200" cy="97" r="4" style="fill:var(--mark)"/><circle cx="310" cy="97" r="4" style="fill:var(--mark)"/>
</svg>
<figcaption>Single-linkage dendrogram (neeche wale distance matrix se): merges height 2, 3, 4, 5 par. Cut 3.5 par 3 vertical lines kaatti hai → 3 clusters.</figcaption>
</figure>

Dhyan do: cut line jitni vertical lines ko kaatti hai, utne clusters. Formula: $5$ points, cut ke neeche 2 merges (height 2 aur 3) → $5 - 2 = 3$ clusters: $\{P, Q\}$, $\{R\}$, $\{S, T\}$.

## Concept step-by-step

### 1. k-means ka objective (SSE)

$k$ clusters $C_1, \dots, C_k$ aur unke centres $\mu_1, \dots, \mu_k$. Objective (within-cluster sum of squared errors):
$$J = \sum_{k}\sum_{x \in C_k} \lVert x - \mu_k\rVert^2$$

Tiny example: cluster $\{1, 3\}$ centre 2, cluster $\{10\}$ centre 10. $J = 1 + 1 + 0 = 2$.

Dhyan do: SSE me **squared** distance hai, aur centroid wahi lo jo us waqt ke cluster ka mean hai (purana centroid nahi, agar "updated centroids" poocha ho).

### 2. Lloyd's algorithm

1. **Assignment:** har point ko nearest centroid (squared Euclidean) wale cluster me daalo.
2. **Update:** har centroid = uske points ka mean.
3. Assignment badalna band ho jaaye to ruko.

**Kyun converge karta hai?** Assignment step: har point apna sabse paas wala centre chunta hai, to $J$ badh nahi sakta. Update step: fixed points ke liye $\sum \lVert x - \mu\rVert^2$ ko minimise karne wala $\mu$ exactly mean hai (derivative $-2\sum(x - \mu) = 0 \Rightarrow \mu = \bar x$), to $J$ phir nahi badhta. Partitions finite hain aur $J$ kabhi nahi badhta, to algorithm ruk jaata hai.

**Lekin sirf local minimum.** Data $1, 2, 6, 7, 8, 20$, $k = 2$:
- Start $(1, 20)$ → final $\{1,2,6,7,8\}, \{20\}$, SSE $= 38.8$.
- Start $(1, 2)$ → final $\{1,2\}, \{6,7,8,20\}$, SSE $= 129.25$.
Dono "converged" hain, par SSE alag. Isliye multiple restarts ya k-means++.

Tiny trace: data $0, 2, 10, 12$, start $c = (0, 2)$.
- Iter 1: $0 \to c_1$; $2, 10, 12 \to c_2$. Update: $c_1 = 0$, $c_2 = 24/3 = 8$.
- Iter 2: $0, 2 \to c_1$ ($|2 - 0| = 2 < 6$); $10, 12 \to c_2$. Update: $c_1 = 1$, $c_2 = 11$.
- Iter 3: same assignment → stop. SSE $= 1 + 1 + 1 + 1 = 4$.

Dhyan do: "run until convergence" poocha ho to ek iteration par mat ruko.

### 3. k-means++ initialisation

Pehla seed random. Har agla seed point $x$ ko probability $\propto D(x)^2$ se chuno, jahan $D(x)$ = $x$ ki ab tak chune seeds me se nearest ki distance. Door ke points ko zyada chance → seeds faile hue.

Tiny example: points $0, 1, 5, 10$, pehla seed 0. $D^2 = 0, 1, 25, 100$, total 126. $P(10) = 100/126 \approx 0.79$.

Dhyan do: $D(x)$ nahi, $D(x)^2$ ke proportional.

### 4. k-means ki kamzoriyan

- **Scale-invariant nahi:** income rupees me (differences lakhon me) aur age years me (differences ~50 tak) — Euclidean distance lagbhag sirf income se banegi, age ka koi asar nahi. Pehle features standardise karo.
- Compact, convex, lagbhag same size ke clusters pasand karta hai; rings, chaand-shaped clusters me fail.
- **Outliers mean ko kheench lete hain** (squared distance bade gap ko aur bada kar deti hai).
- Ek given run me $k+1$ clusters ka SSE $k$ wale se kam ho, ye guarantee nahi (local minima). Sirf **optimal** SSE $k$ badhne par kabhi nahi badhta.

Dhyan do: unscaled data par bhi k-means converge karta hai; bas result bigad jaata hai.

### 5. k-medoids (PAM)

k-medoids me har cluster ka centre ek **actual data point** (medoid) hota hai. Cost $= \sum$ (point se uske medoid ki) dissimilarity — **squared nahi**.

**Medoid** = cluster ka wo point jiski baaki sab points se total distance sabse kam ho.

Tiny example: cluster $\{2, 3, 6, 7, 30\}$, $|x - m|$:
- $m = 2$: $0+1+4+5+28 = 38$; $m = 3$: 35; $m = 6$: $4+3+0+1+24 = 32$; $m = 7$: 33; $m = 30$: 102.
- Medoid = 6 (median). Mean = 9.6 — outlier 30 ne mean ko kheench liya, medoid par asar kam.

1D me absolute distance ke saath medoid = median wala data point (median sum of absolute deviations minimise karta hai).

**PAM:** medoids se shuru; har (medoid, non-medoid) swap try karo; jo swap total cost ghataye wo rakho; jab koi swap madad na kare, ruko. Ek pass ka kaam $\approx O(k(n-k)^2)$ — har $k(n-k)$ swaps me $n-k$ points ka cost. Ye k-means ki iteration ($O(nk)$) se mehenga hai.

Fayda: sirf distance matrix chahiye, coordinates nahi (mean nikalna hi nahi padta). Isliye categorical/kisi bhi dissimilarity par chal jaata hai.

Dhyan do: medoid mean ke sabse paas wala point hona zaroori nahi; definition total distance wali hai.

### 6. Agglomerative (bottom-up) clustering

1. Har point apna cluster ($n$ clusters).
2. Sabse kam linkage distance wale do clusters merge karo; ye distance = **merge height**.
3. Naye cluster ki baaki sab se distance update karo.
4. Ek cluster bachne tak repeat. Total merges $= n - 1$ (har merge clusters 1 kam karta hai).

Divisive clustering ulta hai: ek bade cluster se shuru karke todte jaate hain (top-down). Dono greedy hain: ek baar merge hua to wapas nahi tootega.

Dhyan do: 10 points → 9 merges, 10 nahi.

### 7. Linkage: do clusters ki distance

Clusters $X, Y$ ke liye:
- **Single:** $\min_{x\in X, y \in Y} d(x, y)$ — sabse paas ka pair.
- **Complete:** $\max d(x, y)$ — sabse door ka pair.
- **Average (UPGMA):** $\frac{1}{|X||Y|}\sum_{x, y} d(x, y)$ — saare cross pairs ka mean.
- **Ward:** merge karne se SSE kitna badhega.

<figure class="fig">
<svg viewBox="0 0 460 160" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="110" x2="440" y2="110" stroke="currentColor"/>
<circle cx="40" cy="110" r="7" style="fill:var(--info)"/><circle cx="160" cy="110" r="7" style="fill:var(--info)"/>
<circle cx="240" cy="110" r="7" style="fill:var(--good)"/><circle cx="400" cy="110" r="7" style="fill:var(--good)"/>
<text x="36" y="134" style="fill:currentColor" font-size="12">0</text><text x="156" y="134" style="fill:currentColor" font-size="12">3</text><text x="236" y="134" style="fill:currentColor" font-size="12">5</text><text x="396" y="134" style="fill:currentColor" font-size="12">9</text>
<path d="M160 100 Q200 70 240 100" fill="none" style="stroke:var(--mark)" stroke-width="2"/>
<text x="172" y="66" style="fill:currentColor" font-size="12">single = 2</text>
<path d="M40 100 Q220 0 400 100" fill="none" style="stroke:var(--bad)" stroke-width="2"/>
<text x="180" y="26" style="fill:currentColor" font-size="12">complete = 9</text>
<text x="40" y="148" style="fill:currentColor" font-size="12">X = {0, 3}     Y = {5, 9}     average = (5+9+2+6)/4 = 5.5</text>
</svg>
<figcaption>Same do clusters, teen linkages: single (nearest pair), complete (farthest pair), average (sab 4 pairs ka mean).</figcaption>
</figure>

Hamesha: single ≤ average ≤ complete (min ≤ mean ≤ max).

**Merge ke baad update** ($A$ aur $B$ jud kar $A \cup B$):
- single: $d(A\cup B, C) = \min(d_{AC}, d_{BC})$
- complete: $\max(d_{AC}, d_{BC})$
- average: $\dfrac{|A|\,d_{AC} + |B|\,d_{BC}}{|A| + |B|}$ (sizes se weighted — kyunki ye saare point-pairs ka mean hai)

Dhyan do: complete linkage me har pair ka **max** nikaalo, phir un sab me **sabse chhota** merge karo. "Max wala pair merge karo" galat hai.

### 8. Dendrogram aur cut

Merge heights single, complete, average ke liye hamesha badhti hain (monotone). **Centroid linkage** me kabhi baad wala merge pehle se neeche ho sakta hai — "inversion".

Height $h$ par cut: clusters $= n - \#\{\text{merges with height} \le h\}$. Isliye $k$ pehle se fix nahi karna padta; ek dendrogram se har $k$ mil jaata hai.

Tiny example: 1D points $1, 3, 4, 9, 10, 16$, single linkage. Merges: $\{3,4\}$@1, $\{9,10\}$@1, $\{1,3,4\}$@2, $\{1,3,4\}+\{9,10\}$@5, $+16$@6. Cut 2.5: merges $\le 2.5$ = 3 → $6 - 3 = 3$ clusters: $\{1,3,4\}, \{9,10\}, \{16\}$.

Dhyan do: merges ki ginti ko clusters mat bolo; $n$ se ghatao.

### 9. Single linkage = MST, chaining

Single linkage har baar sabse chhoti "cross" edge jodta hai jo do alag components ko milati hai — bilkul Kruskal ka minimum spanning tree (MST) algorithm. To:
- single-linkage merge heights = MST ki edge weights;
- $k$ clusters chahiye to MST ki $k - 1$ **sabse bhaari** edges hata do.

Isi wajah se single linkage **chaining** karta hai: do groups ke beech points ki ek patli line ho to wo step-by-step jod deta hai. Complete linkage compact clusters deta hai par outliers se sensitive hai (max distance outlier se banti hai). Average beech me; Ward k-means jaisa gol clusters.

Dhyan do: "single linkage chaining kam karta hai" — ulta hai.

## Solved examples

Neeche Examples 4 aur 5 is distance matrix ko use karte hain:

| | P | Q | R | S | T |
|---|---|---|---|---|---|
| P | 0 | 2 | 6 | 11 | 9 |
| Q | 2 | 0 | 5 | 10 | 8 |
| R | 6 | 5 | 0 | 4 | 8 |
| S | 11 | 10 | 4 | 0 | 3 |
| T | 9 | 8 | 8 | 3 | 0 |

**Example 1 (NAT, easy):** 1D data $2, 3, 5, 9, 10, 14$. k-means with $k = 2$ starts at $c_1 = 2$, $c_2 = 3$ and runs until assignments stop changing. The final $c_2$ is ______.

**Soch:** Lloyd trace: assign (nearest), update (mean), repeat.

**Solution:**
1. Iter 1: $2 \to c_1$ (distance 0). $3 \to c_2$ (0). $5, 9, 10, 14$ sab 3 ke zyada paas → $c_2$.
2. Update: $c_1 = 2$, $c_2 = (3+5+9+10+14)/5 = 41/5 = 8.2$.
3. Iter 2: $3$: $|3-2| = 1$ vs $5.2$ → $c_1$. $5$: $3$ vs $3.2$ → $c_1$. $9, 10, 14$ → $c_2$.
4. Update: $c_1 = (2+3+5)/3 = 3.33$, $c_2 = (9+10+14)/3 = 11$.
5. Iter 3: $5$: $1.67$ vs 6 → $c_1$; $9$: $5.67$ vs 2 → $c_2$. Koi change nahi → stop.

**Answer: 11.**

**Galti kahan hoti hai:** ek iteration ke baad ruk kar 8.2 likhna. Ya iter 2 me 5 ko $c_2$ dena (3 vs 3.2 close hai, dhyan se ghatao).

**Example 2 (NAT, medium):** Points $A(0,0), B(1,0), C(0,2), D(4,4), E(5,3), F(3,4)$. k-means with $k = 2$ starts with $\mu_1 = A$, $\mu_2 = B$. After one assignment step and one update step, the SSE of the current assignment measured to the **updated** centroids is ______.

**Soch:** 2D ek iteration — squared distances compare, mean, phir squared distances updated centroid se.

**Solution:**
1. Squared distances to $\mu_1 = (0,0)$ / $\mu_2 = (1,0)$:
   $A$: 0 / 1 → 1. $B$: 1 / 0 → 2. $C$: 4 / 5 → 1. $D$: 32 / 25 → 2. $E$: 34 / 25 → 2. $F$: 25 / 20 → 2.
2. Cluster 1 $= \{A, C\}$, $\mu_1 = (0, 1)$. Cluster 2 $= \{B, D, E, F\}$, $\mu_2 = (13/4, 11/4) = (3.25, 2.75)$.
3. Cluster 1: $A$: 1, $C$: 1 → 2.
4. Cluster 2: $B$: $2.25^2 + 2.75^2 = 12.625$; $D$: $0.75^2 + 1.25^2 = 2.125$; $E$: $1.75^2 + 0.25^2 = 3.125$; $F$: $0.25^2 + 1.25^2 = 1.625$. Sum $= 19.5$.
5. SSE $= 2 + 19.5 = 21.5$.

**Answer: 21.5.**

**Galti kahan hoti hai:** purane centroids $A, B$ se SSE nikaalna → $0 + 0 + 4 + 25 + 25 + 20 = 74$. Ya squared ki jagah plain distance jodna.

**Example 3 (NAT, medium):** 1D data $1, 2, 4, 9, 10, 16$, k-medoids ($k = 2$, absolute distance) with current medoids $\{2, 4\}$. PAM evaluates swapping medoid 4 with non-medoid 10. The total cost after this swap is ______.

**Soch:** PAM cost = har point ki nearest medoid tak **unsquared** distance ka sum.

**Solution:**
1. Naye medoids $\{2, 10\}$.
2. $1 \to 2$: 1. $2$: 0. $4 \to 2$: 2. $9 \to 10$: 1. $10$: 0. $16 \to 10$: 6.
3. Total $= 1 + 0 + 2 + 1 + 0 + 6 = 10$. (Pehle $\{2, 4\}$ ka cost 24 tha, to swap accept hoga.)

**Answer: 10.**

**Galti kahan hoti hai:** squared distances jodna → $1 + 4 + 1 + 36 = 42$. Ya points ko purane assignment par hi chhod dena (har point ko naye medoid set me se nearest chunna hai).

**Example 4 (NAT, hard):** Using the matrix above with **complete linkage**, at what height does R first join another cluster?

**Soch:** complete = max cross pair; har step me in maxes me se minimum merge.

**Solution:**
1. Sabse chhoti entry $d(P,Q) = 2$ → merge $\{P,Q\}$ @ 2.
2. Update complete: $d(PQ, R) = \max(6, 5) = 6$, $d(PQ, S) = \max(11, 10) = 11$, $d(PQ, T) = \max(9, 8) = 9$. Baaki: $RS = 4$, $RT = 8$, $ST = 3$.
3. Minimum = $ST = 3$ → merge $\{S,T\}$ @ 3.
4. Update: $d(R, ST) = \max(4, 8) = 8$; $d(PQ, ST) = \max(11, 9) = 11$; $d(PQ, R) = 6$.
5. Minimum = 6 → R joins $\{P, Q\}$ @ **6**.
6. (Last: $\{P,Q,R\}$ + $\{S,T\}$ @ $\max(11, 8) = 11$.)

**Answer: 6.**

**Galti kahan hoti hai:** single linkage ka rule lagana: $d(R, ST) = \min(4, 8) = 4$ → "R joins $\{S,T\}$ at 4". Single linkage me yahi sahi hota, complete me nahi — dono linkages alag tree bana rahe hain!

**Example 5 (MSQ, hard):** For the matrix above, which statements are correct?
- (A) With single linkage, the final merge happens at height 5.
- (B) With average linkage, the final merge happens at height $25/3 \approx 8.33$.
- (C) Cutting the single-linkage dendrogram at height 3.5 gives 2 clusters.
- (D) The minimum spanning tree of the five points has total weight 15.

**Soch:** single trace = MST; average me size-weighted update; cut formula.

**Solution:**
1. Single: $PQ$@2, $ST$@3, then $d(R, ST) = \min(4, 8) = 4$ vs $d(PQ, R) = \min(6,5) = 5$ → $R + ST$@4. Last: $d(PQ, RST) = \min$ of all cross $= d(Q,R) = 5$ → @5. (A) sahi.
2. Average: $PQ$@2, $ST$@3. $d(PQ, R) = (6+5)/2 = 5.5$, $d(R, ST) = (4+8)/2 = 6$, $d(PQ, ST) = (11+9+10+8)/4 = 9.5$. Merge $PQ + R$@5.5. Final: $d(PQR, ST) = \frac{2 \cdot 9.5 + 1 \cdot 6}{3} = 25/3 \approx 8.33$. (B) sahi.
3. Cut 3.5: merges $\le 3.5$ = 2 (heights 2, 3) → $5 - 2 = 3$ clusters. (C) galat.
4. MST weights = single-linkage heights = $2 + 3 + 4 + 5 = 14$. (D) galat.

**Answer: (A), (B).**

**Galti kahan hoti hai:** (B) me sub-cluster distances ka simple average $(9.5 + 6)/2 = 7.75$ lena — UPGMA sizes se weight karta hai. (C) me merges (2) ko hi clusters maan lena.

**Example 6 (MCQ, medium):** Two dense blobs are connected by a thin trail of evenly spaced points. Which procedure is most likely to return the two blobs **plus the trail as one long cluster** when asked for 2 clusters?
(A) complete linkage (B) Ward's method (C) single linkage, i.e. MST with the heaviest edge removed (D) k-means with k-means++ seeding

**Soch:** "trail / chain / long cluster" = chaining = single linkage.

**Solution:**
1. Trail ke points ke beech gap chhota hai, to MST unhe chhoti edges se jodta hai.
2. 2 clusters ke liye MST ki sabse bhaari edge hatti hai. Blobs ke beech ka "pul" sirf chhoti edges se bana hai, to wo kabhi nahi toot-ta; dono blobs aur trail ek hi lamba cluster bane rehte hain.
3. Complete/Ward compact clusters chahte hain, lambi chain ko penalise karte hain; k-means convex cells deta hai.

**Answer: (C).**

**Galti kahan hoti hai:** single aur complete ko swap kar dena ("complete = sabko jodta hai").

## Confusions clear karo

**Q:** k-means aur k-medoids me asli farak kya hai?
**A:** k-means ka centre mean hai (data point ho ya na ho) aur cost squared distance. k-medoids ka centre ek data point hai aur cost plain (unsquared) distance. Isliye k-medoids outliers se kam hilta hai aur sirf distance matrix se chal jaata hai, par mehenga hai.

**Q:** Assignment me squared distance lo ya normal?
**A:** Nearest centre dono se same aata hai (square monotone hai). Fark sirf SSE ki value me padta hai — wahan square zaroori.

**Q:** "Merge height" kya hota hai?
**A:** Jis linkage distance par do clusters jude. Dendrogram me wahi horizontal line ki height.

**Q:** Average linkage me naya distance kaise update karun?
**A:** Ya to saare point-pairs ka seedha mean lo, ya formula $\frac{|A|d_{AC} + |B|d_{BC}}{|A|+|B|}$. Do sub-cluster distances ka simple average sirf tab sahi hai jab $|A| = |B|$.

**Q:** Cut ki height bilkul kisi merge height ke barabar ho to?
**A:** Formula "merges at height $\le h$" use karta hai, to wo merge gina jaata hai. Exam usually cut ko merges ke beech rakhta hai taaki ye confusion na ho.

**Q:** k-means hamesha same answer kyun nahi deta?
**A:** Initial centroids alag → alag local minimum. Algorithm sirf $J$ ko kabhi badhne nahi deta; global minimum ki guarantee nahi.

**Q:** Single linkage aur MST ka connection exam me kaise aata hai?
**A:** "Single-linkage merge heights = MST edge weights" aur "$k$ clusters = MST se $k-1$ heaviest edges hatao". Lightest hatana galat hai.

## Khud try karo

1. 1D data $1, 2, 4, 8, 9, 11$, $k = 2$, start $c_1 = 1$, $c_2 = 4$, convergence tak. Final centroids aur SSE?

<details><summary>Answer dekho</summary>

Iter 1: $1, 2 \to c_1$; $4, 8, 9, 11 \to c_2$. Update $c_1 = 1.5$, $c_2 = 32/4 = 8$.
Iter 2: $4$: $|4 - 1.5| = 2.5$ vs 4 → $c_1$. Update $c_1 = 7/3 \approx 2.33$, $c_2 = 28/3 \approx 9.33$.
Iter 3: no change. SSE: $\{1,2,4\}$: $(1.78 + 0.11 + 2.78) = 4.67$; $\{8,9,11\}$: $(1.78 + 0.11 + 2.78) = 4.67$. Total $= 28/3 \approx 9.33$.

</details>

2. Cluster $\{0, 1, 2, 3, 40\}$ ka medoid aur uska total distance (absolute)? Mean kitna hai?

<details><summary>Answer dekho</summary>

Medoid = median = 2. Total $= 2 + 1 + 0 + 1 + 38 = 42$. (Check $m = 1$: $1+0+1+2+39 = 43$; $m = 3$: $3+2+1+0+37 = 43$.) Mean $= 46/5 = 9.2$ — outlier ne kheench liya.

</details>

3. $X = \{1, 4\}$, $Y = \{7, 12\}$ (1D). Single, complete aur average linkage distance?

<details><summary>Answer dekho</summary>

Cross pairs: $6, 11, 3, 8$. Single $= 3$, complete $= 11$, average $= 28/4 = 7$. Check: $3 \le 7 \le 11$.

</details>

4. 12 points par agglomerative clustering. Kitne merges? Agar cut ke neeche 8 merges hon to kitne clusters?

<details><summary>Answer dekho</summary>

Merges $= 12 - 1 = 11$. Clusters $= 12 - 8 = 4$.

</details>

5. k-means++: pehla seed 2 hai, baaki points $3, 6, 10$. Point 10 agla seed banne ki probability?

<details><summary>Answer dekho</summary>

$D^2$: $3 \to 1$, $6 \to 16$, $10 \to 64$ (seed 2 khud ka $D^2 = 0$). Total $= 81$. $P(10) = 64/81 \approx 0.79$.

</details>

## Ek page me

- k-means SSE $J = \sum_k \sum_{x\in C_k}\lVert x - \mu_k\rVert^2$ (squared, current centroids).
- Lloyd: assign nearest → update to mean; koi step $J$ nahi badhata → converge, par local minimum, start par depend.
- k-means++: agla seed $\propto D(x)^2$.
- k-means scale-sensitive, convex/compact clusters, outliers mean kheenchte hain.
- k-medoids: centre = data point, cost unsquared; medoid = min total distance (1D me median); PAM swaps $\approx O(k(n-k)^2)$; sirf distance matrix kaafi.
- Agglomerative: $n - 1$ merges; divisive top-down; merges kabhi undo nahi.
- Single = min, complete = max, average = saare cross pairs ka mean; single ≤ average ≤ complete.
- Update: single min, complete max, average size-weighted.
- Complete linkage: per pair max, phir sabse chhota merge.
- Cut at $h$: clusters $= n - \#(\text{merges} \le h)$.
- Single linkage = MST (Kruskal), chaining; $k$ clusters = $k-1$ heaviest edges hatao. Complete compact; centroid linkage me inversions.

Revision ke liye **Short note** tab dekho.
