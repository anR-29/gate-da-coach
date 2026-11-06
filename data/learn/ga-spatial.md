# Spatial and figure reasoning

> **Time:** ~35 min · **Pehle aana chahiye:** kuch nahi (graph paper wala (x, y) idea aur $\binom{n}{2}$ madad karega) · **Day:** GA rotation me (har din ke page pe us din ka GA topic likha hota hai)

## Ye topic kyun?

GATE GA me ab har paper me 1–2 "figure" wale questions aate hain: kaagaz mod kar chhed (hole) karna, shape ko ghumana (rotation) ya mirror image, cube ka net ya dice, map colouring, triangles/squares ginna, aur cube ko kaatne par kaunsi shape banegi. 1-mark aur 2-mark dono. Ye questions "imagination" jaise lagte hain, par har ek ka ek **mechanical rule** hai — reflection, coordinates ka swap, formula se ginti. Ye lesson wahi rules deta hai taaki tum dimaag me ghumane ki jagah kaagaz par check kar sako.

## Picture se samjho

**Paper folding:** Kaagaz ko beech se modo aur chhed karo. Kholne par chhed crease (mod ki line) ke doosri taraf **reflect** hota hai — jaise aaine me.

<figure class="fig">
<svg viewBox="0 0 520 170" xmlns="http://www.w3.org/2000/svg" font-size="12">
<rect x="20" y="40" width="100" height="100" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="70" y1="40" x2="70" y2="140" stroke="currentColor" stroke-dasharray="5 4"/>
<path d="M40 30 Q70 10 100 30" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<polygon points="100,30 90,27 95,20" style="fill:var(--info)"/>
<text x="70" y="160" text-anchor="middle" fill="currentColor">1. left ko right par modo</text>
<line x1="135" y1="90" x2="175" y2="90" stroke="currentColor"/>
<polygon points="175,85 185,90 175,95" fill="currentColor"/>
<rect x="200" y="40" width="50" height="100" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="200" y1="40" x2="200" y2="140" stroke="currentColor" stroke-dasharray="5 4" stroke-width="2"/>
<circle cx="215" cy="70" r="5" style="fill:var(--mark)"/>
<text x="225" y="160" text-anchor="middle" fill="currentColor">2. chhed (crease se 15)</text>
<line x1="265" y1="90" x2="305" y2="90" stroke="currentColor"/>
<polygon points="305,85 315,90 305,95" fill="currentColor"/>
<rect x="340" y="40" width="100" height="100" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="390" y1="40" x2="390" y2="140" stroke="currentColor" stroke-dasharray="5 4"/>
<circle cx="405" cy="70" r="5" style="fill:var(--mark)"/>
<circle cx="375" cy="70" r="5" style="fill:var(--mark)"/>
<text x="390" y="160" text-anchor="middle" fill="currentColor">3. kholo: do chhed</text>
<text x="458" y="74" style="fill:var(--muted)">same</text>
<text x="458" y="88" style="fill:var(--muted)">height,</text>
<text x="458" y="102" style="fill:var(--muted)">mirror</text>
</svg>
<figcaption>Chhed crease se jitni doori par tha, kholne par crease ke doosri taraf utni hi doori par naya chhed. Height same rehti hai.</figcaption>
</figure>

Dhyan do: chhed **reflect** hua hai, khisak (translate) nahi. Agar ek aur fold hota (upar se neeche), toh har chhed fir se reflect hota → 4 chhed. Har fold chhedon ki ginti ko double kar sakta hai: $k$ folds → ek punch se $2^k$ chhed tak.

**Rotation vs mirror:** Ek "L" shape ko 3 × 3 grid par dekho. Ek **khaas cell** (yahan L ka paon, highlighted) ko follow karo.

<figure class="fig">
<svg viewBox="0 0 520 170" xmlns="http://www.w3.org/2000/svg" font-size="12">
<path d="M20 40h90v90h-90zM50 40v90M80 40v90M20 70h90M20 100h90" fill="none" style="stroke:var(--muted)"/>
<rect x="20" y="40" width="30" height="30" style="fill:var(--info);opacity:0.6"/>
<rect x="20" y="70" width="30" height="30" style="fill:var(--info);opacity:0.6"/>
<rect x="20" y="100" width="30" height="30" style="fill:var(--info);opacity:0.6"/>
<rect x="50" y="100" width="30" height="30" style="fill:var(--mark)"/>
<text x="65" y="155" text-anchor="middle" fill="currentColor">Original</text>
<path d="M200 40h90v90h-90zM230 40v90M260 40v90M200 70h90M200 100h90" fill="none" style="stroke:var(--muted)"/>
<rect x="200" y="40" width="30" height="30" style="fill:var(--info);opacity:0.6"/>
<rect x="230" y="40" width="30" height="30" style="fill:var(--info);opacity:0.6"/>
<rect x="260" y="40" width="30" height="30" style="fill:var(--info);opacity:0.6"/>
<rect x="200" y="70" width="30" height="30" style="fill:var(--mark)"/>
<text x="245" y="155" text-anchor="middle" fill="currentColor">90° clockwise</text>
<path d="M380 40h90v90h-90zM410 40v90M440 40v90M380 70h90M380 100h90" fill="none" style="stroke:var(--muted)"/>
<rect x="440" y="40" width="30" height="30" style="fill:var(--info);opacity:0.6"/>
<rect x="440" y="70" width="30" height="30" style="fill:var(--info);opacity:0.6"/>
<rect x="440" y="100" width="30" height="30" style="fill:var(--info);opacity:0.6"/>
<rect x="410" y="100" width="30" height="30" style="fill:var(--mark)"/>
<text x="425" y="155" text-anchor="middle" fill="currentColor">Vertical mirror</text>
<text x="155" y="90" text-anchor="middle" fill="currentColor">→</text>
<text x="335" y="90" text-anchor="middle" style="fill:var(--muted)">vs</text>
<text x="260" y="20" text-anchor="middle" style="fill:var(--muted)">left column (upar se neeche) → top row (right se left)</text>
</svg>
<figcaption>Rotation me khada bar leta ho jaata hai (rows ↔ columns). Mirror me bar khada hi rehta hai, sirf left-right palat jaata hai.</figcaption>
</figure>

Original me bar left column me khada hai aur paon neeche-right ki taraf. 90° clockwise ghumane par bar **top row** me let gaya aur paon neeche ki taraf aa gaya. Mirror me bar abhi bhi khada hai, bas right column me, aur paon left ki taraf. Agar kisi option me bar khada hai, toh woh rotation ho hi nahi sakta — turant kaat do.

**Cube net:** Chhe squares ka flat kaagaz jo mod kar cube banta hai.

<figure class="fig">
<svg viewBox="0 0 520 170" xmlns="http://www.w3.org/2000/svg" font-size="16">
<rect x="100" y="10" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="60" y="50" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="100" y="50" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="140" y="50" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="180" y="50" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="100" y="90" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="120" y="36" text-anchor="middle" fill="currentColor">5</text>
<text x="80" y="76" text-anchor="middle" fill="currentColor">1</text>
<text x="120" y="76" text-anchor="middle" fill="currentColor">2</text>
<text x="160" y="76" text-anchor="middle" fill="currentColor">3</text>
<text x="200" y="76" text-anchor="middle" fill="currentColor">4</text>
<text x="120" y="116" text-anchor="middle" fill="currentColor">6</text>
<text x="140" y="155" text-anchor="middle" style="fill:var(--good)" font-size="13">Opposite: 1–3, 2–4, 5–6</text>
<rect x="320" y="30" width="30" height="30" style="fill:var(--bad);opacity:0.35;stroke:var(--bad)"/>
<rect x="350" y="30" width="30" height="30" style="fill:var(--bad);opacity:0.35;stroke:var(--bad)"/>
<rect x="320" y="60" width="30" height="30" style="fill:var(--bad);opacity:0.35;stroke:var(--bad)"/>
<rect x="350" y="60" width="30" height="30" style="fill:var(--bad);opacity:0.35;stroke:var(--bad)"/>
<rect x="380" y="60" width="30" height="30" fill="none" stroke="currentColor"/>
<rect x="410" y="60" width="30" height="30" fill="none" stroke="currentColor"/>
<text x="380" y="125" text-anchor="middle" style="fill:var(--bad)" font-size="13">2 × 2 block → cube nahi banega</text>
</svg>
<figcaption>Left: valid net. Ek seedhi line me ek chhod kar wale squares opposite hote hain. Right: 2 × 2 block wala net fold nahi hota (chaar squares ek kone par mil kar flat reh jaate hain).</figcaption>
</figure>

Row 1-2-3-4 me: 1 aur 3 ke beech ek square (2) hai → 1 opposite 3. Isi tarah 2 opposite 4. Column 5-2-6 me 5 opposite 6. Sabse **door** wala square opposite nahi hota (1 aur 4 door hain par adjacent bante hain, kyunki row ghoom kar band hoti hai).

## Concept step-by-step

### 1. Map colouring

**Idea:** Jo do regions ek **line** share karte hain (sirf ek point nahi), unko alag colour chahiye. Minimum kitne colours?

**Method:** (1) Har region ke adjacent regions ki list banao (sirf shared boundary line). (2) Ring dhoondo — regions jo ek gol chain me ek doosre ko chhoote hain. (3) Rule:
- Ring of **even** length → 2 colours kaafi (A, B, A, B, …).
- Ring of **odd** length → 3 colours.
- Ek region (hub) jo poori ring ko chhoota hai → +1 colour.

**Kyun odd ring me 3:** Do colours alternate karo: 1st A, 2nd B, 3rd A, … Odd ring me last region bhi A milta hai, par woh 1st (A) ko chhoota hai — clash. Isliye teesra colour.

**Example:** 5 regions ki ring + beech me ek circle jo sabko chhoota hai: ring (odd) → 3, hub → **4**. Agar ring 6 ki hoti → 2 + 1 = **3**.

**Dhyan do:** Diagonal regions jo sirf ek kone (point) par milte hain, adjacent **nahi** hain — woh same colour le sakte hain.

### 2. Cube nets

**Rule:**
- Net me edge share karne wale squares cube par **adjacent** hote hain.
- Seedhi line (row ya column) me **ek chhod kar** wale squares **opposite** hote hain.
- Net me **2 × 2 block** ho, ya **5 ya zyada** squares ek line me hon → cube nahi banta.

**Kyun 5 in a row nahi:** Ek line ke 4 squares cube ke 4 side faces ki ring bana dete hain; 5th square pehle wale par overlap karega.

**Example:** Upar wala cross net: 1↔3, 2↔4, 5↔6.

**Dhyan do:** "Sabse door wala opposite" galat hai. Alternate rule use karo.

### 3. Dice views

**Idea:** Do views me **top face same** ho, toh die sirf vertical axis par ghooma hai. Tab chaar side faces ek **ring** banate hain.

**Method:** Har view se "front → right" ka order padho. Ring me jodo. Ring me do step door wale faces opposite.

**Example:** View 1: top 1, front 2, right 3. View 2: top 1, front 3, right 6. Ring: 2 → 3 → 6 → ? Toh 2 aur 6 do step door → **2 opposite 6**.

**Dhyan do:** "Opposite faces ka sum 7" sirf standard die par hota hai. Question me "not a standard die" ho toh ye rule bilkul mat lagao.

### 4. Paper folding and punching

**Rule:** Kholte waqt folds ko **ulte order** me kholo (aakhri fold pehle). Har kholne par har chhed crease ke across reflect hota hai: crease se same doori, doosri taraf. $k$ folds → ek punch se max $2^k$ chhed.

**Example:** Square ko left-onto-right modo (crease beech me, vertical), phir top-onto-bottom (crease horizontal). Ek chhed karo. Pehle horizontal fold kholo → 2 chhed (upar-neeche mirror). Phir vertical kholo → 4 chhed, chaaron quadrant me ek-ek, symmetric.

**Diagonal fold:** Bottom-left aadha top-right par moda (crease = diagonal). Chhed $(a, b)$ par ho toh doosra chhed $(b, a)$ par — diagonal ke across reflection x aur y ko swap karta hai.

**Dhyan do:** Chhed ko seedha "khiska" dena (translate) galat hai; reflection me crease se doori same, direction ulti.

### 5. Rotation on a grid

**Setup:** Grid ke cells $(x, y)$: $x$ = column number left se, $y$ = row number **upar** se, dono 0 se $m$ tak (3 × 3 grid me $m = 2$).

**Formula (90° clockwise):** $(x, y) \to (m - y,\ x)$.

**Kyun:** Clockwise me top row (y = 0) right column (x = m) ban jaati hai: $(x, 0) \to (m, x)$ ✔. Top-left corner $(0,0) \to (m, 0)$ = top-right ✔.

**Example:** L shape: $(0,0), (0,1), (0,2), (1,2)$. Rotate: $(2,0), (1,0), (0,0), (0,1)$ — upar wali figure ka beech wala grid.

**Dhyan do:** Rotation me x aur y **hamesha swap** hote hain. Agar tumhare answer me sirf x badla (y same), toh tumne mirror bana diya. 90° anticlockwise: $(x, y) \to (y,\ m - x)$; 180°: $(m - x,\ m - y)$.

### 6. Mirror and water images

**Formula:**
- Vertical mirror (left ya right me rakha): $(x, y) \to (m - x,\ y)$ — left-right palat, upar-neeche same.
- Water image (neeche paani): $(x, y) \to (x,\ m - y)$ — upar-neeche palat.

**Example:** L ka paon $(1, 2)$: vertical mirror → $(1, 2)$ (beech ka column, same); bar $(0, y) \to (2, y)$. Water image → bar $(0, 0..2)$ same column, paon $(1, 0)$ upar chala gaya.

**Dhyan do:** Mirror kabhi orientation (khada/leta) nahi badalta; rotation badalta hai.

### 7. Mirror clock

**Rule:** Actual time $= 12{:}00 - \text{shown}$. Hours me ek "borrow" lagta hai, isliye **11:60 − shown** likho.

**Kyun:** Mirror left-right palat deta hai. Hand jo 12 se clockwise $\theta$ angle par hai, mirror me $360° - \theta$ par dikhta hai. $360° - \theta$ wala time = 12:00 se utna hi pehle.

**Example:** Mirror me 4:37 dikhe → $11{:}60 - 4{:}37 = 7{:}23$.

**Dhyan do:** $12 - 4 = 8$, $60 - 37 = 23$ → "8:23" galat — ek ghanta borrow bhool gaye. Agar shown time 12:xx ho, toh 12 ko 0 maano: 12:20 dikhe → $11{:}60 - 0{:}20 = 11{:}40$.

### 8. Counting triangles (apex wali figure)

**Setup:** Ek apex (upar wala point) se $n$ lines neeche jaati hain (dono sides bhi gino), aur $k$ horizontal (parallel) lines unhe kaat-ti hain (base bhi gino).

**Formula:** Triangles $= k \cdot \binom{n}{2}$.

**Kyun:** Triangle ko teen sides chahiye jo teen alag points par milein. Do horizontal lines parallel hain — dono ek triangle me nahi aa sakti. Teen apex lines ek hi point (apex) par milti hain — triangle nahi. Toh har triangle = **2 apex lines + 1 horizontal**. Choices: $\binom{n}{2} \times k$.

**Example:** $n = 4$ apex lines, $k = 2$ horizontals → $2 \times 6 = 12$.

**Dhyan do:** Sides aur base ko ginna mat bhoolo — woh bhi apex lines / horizontals hain.

### 9. Counting squares in a grid

**Formula:** $m \times n$ grid (unit squares) me squares of all sizes $= \sum_{k \ge 1} (m - k + 1)(n - k + 1)$, jab tak dono factors positive hain.

**Kyun:** $k \times k$ square ka top-left kona horizontally $m - k + 1$ jagah aur vertically $n - k + 1$ jagah rakh sakte ho.

**Example:** 4 × 3: $k=1$: $4 \times 3 = 12$; $k=2$: $3 \times 2 = 6$; $k=3$: $2 \times 1 = 2$. Total **20**.

**Dhyan do:** Sirf unit squares (12) gin kar ruk jaana sabse common galti.

### 10. Cross-sections (solid ko kaatna)

**Rules:**
- Cube, face ke **parallel** cut → **square**.
- Cube ka ek **corner** kaato (us corner se jude teen corners se plane) → **equilateral triangle**. Kyun: teeno sides face diagonals hain, sab $a\sqrt2$.
- Cube, centre se, space diagonal ke **perpendicular** → **regular hexagon** (6 edges ke midpoints).
- Cylinder, axis ke perpendicular → circle; **tilted** cut jo sirf curved surface kaate → **ellipse**.

**Dhyan do:** Corner cut ko "right triangle" sochna galat — teeno sides barabar hain.

### 11. Pieces jodna (assembly)

**Method:** (1) Khaali jagah ka **area** (cells) gino; option ka area match hona chahiye. (2) Phir shape match karo — option ko **rotate** karke try karo. (3) Agar "not flipped" likha hai, toh mirror image wala piece **reject**.

**Dhyan do:** Mirror piece area aur shape dono me "almost" fit lagta hai — flip allowed hai ya nahi, stem me dekho.

## Solved examples

**Example 1 (MCQ, 1 mark, easy):** A wall clock seen in a vertical mirror appears to show 3:48. What is the actual time?
(A) 9:12  (B) 8:12  (C) 8:48  (D) 9:48

**Soch:** Mirror clock → 11:60 − shown.

**Solution:**
1. $11{:}60 - 3{:}48$: minutes $60 - 48 = 12$, hours $11 - 3 = 8$.
2. Actual = **8:12** → **(B)**.

**Galti kahan hoti hai:** $12 - 3 = 9$, $60 - 48 = 12$ → 9:12 (A). Minutes ke liye ek ghanta borrow kiya tha, woh ghanta ghatana bhool gaye.

**Example 2 (MCQ, 1 mark, easy):** How many squares of any size are there in a 5 × 3 grid of unit squares?
(A) 15  (B) 23  (C) 26  (D) 30

**Soch:** Squares in grid → sum formula.

**Solution:**
1. $k = 1$: $5 \times 3 = 15$.
2. $k = 2$: $4 \times 2 = 8$.
3. $k = 3$: $3 \times 1 = 3$.
4. $k = 4$ possible nahi (height sirf 3).
5. Total $= 15 + 8 + 3 = 26$ → **(C)**.

**Galti kahan hoti hai:** 15 (sirf unit squares) ya 23 (3 × 3 wale bhool jaana).

**Example 3 (NAT, 1 mark, medium):** How many triangles are there in the figure?

<figure class="fig">
<svg viewBox="0 0 260 210" xmlns="http://www.w3.org/2000/svg">
<path d="M130 15L20 195H240Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
<path d="M130 15L75 195M130 15L130 195M130 15L185 195" fill="none" stroke="currentColor" stroke-width="1.5"/>
<path d="M75 105H185" fill="none" stroke="currentColor" stroke-width="1.5"/>
</svg>
<figcaption>Apex se 5 lines (2 sides + 3 andar), aur 2 horizontal lines (beech wali + base).</figcaption>
</figure>

**Soch:** Apex se lines + parallel horizontals → $k \cdot \binom{n}{2}$.

**Solution:**
1. Apex lines: left side, 3 andar wali, right side → $n = 5$.
2. Horizontals: beech wali line + base → $k = 2$.
3. Triangles $= 2 \times \binom{5}{2} = 2 \times 10 = $ **20**.

**Galti kahan hoti hai:** Sirf ek horizontal (jaise base) ke triangles gin kar 10 par ruk jaana, ya sides ko apex lines me na ginna ($n = 3$ → $2 \times 3 = 6$).

**Example 4 (MSQ, 1 mark, medium):** Which of the following arrangements of six squares can be folded into a cube? (Select all that apply.)

<figure class="fig">
<svg viewBox="0 0 520 110" xmlns="http://www.w3.org/2000/svg" font-size="14">
<text x="40" y="18" text-anchor="middle" fill="currentColor">(A)</text>
<path d="M26 30h16v16h-16zM10 46h16v16h-16zM26 46h16v16h-16zM42 46h16v16h-16zM58 46h16v16h-16zM26 62h16v16h-16z" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="170" y="18" text-anchor="middle" fill="currentColor">(B)</text>
<path d="M140 30h16v16h-16zM156 30h16v16h-16zM140 46h16v16h-16zM156 46h16v16h-16zM172 46h16v16h-16zM188 46h16v16h-16z" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="310" y="18" text-anchor="middle" fill="currentColor">(C)</text>
<path d="M270 30h16v16h-16zM270 46h16v16h-16zM286 46h16v16h-16zM302 46h16v16h-16zM318 46h16v16h-16zM334 46h16v16h-16z" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="440" y="18" text-anchor="middle" fill="currentColor">(D)</text>
<path d="M400 30h16v16h-16zM416 30h16v16h-16zM416 46h16v16h-16zM432 46h16v16h-16zM432 62h16v16h-16zM448 62h16v16h-16z" fill="none" stroke="currentColor" stroke-width="1.5"/>
</svg>
<figcaption>Chaar arrangements, har ek me 6 squares.</figcaption>
</figure>

**Soch:** Nets → pehle 2 × 2 block aur 5-in-a-row wale kaato.

**Solution:**
1. (A) Cross (1-4-1): 4 ki row ring banati hai, upar-neeche ka square top aur bottom → **valid**.
2. (B) Pehle do columns me 2 × 2 block → **invalid**.
3. (C) Neeche 5 squares ek line me → **invalid**.
4. (D) Staircase 2-2-2: koi 2 × 2 block nahi, koi line 4 se lambi nahi; mod kar dekho — har fold naya face banata hai, koi overlap nahi → **valid**.
5. Answer: **(A) and (D)**.

**Galti kahan hoti hai:** (D) ko "ajeeb shape" dekh kar reject karna. Staircase 2-2-2 cube ke 11 valid nets me se ek hai.

**Example 5 (MCQ, 2 marks, medium):** A circular map has a central circle H surrounded by a ring of five regions P, Q, R, S, T (each ring region touches its two neighbours and H along lines). Regions sharing a boundary line need different colours. What is the minimum number of colours?

<figure class="fig">
<svg viewBox="0 0 260 210" xmlns="http://www.w3.org/2000/svg" font-size="15">
<circle cx="130" cy="105" r="90" fill="none" stroke="currentColor" stroke-width="2"/>
<circle cx="130" cy="105" r="35" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M130 70L130 15M163.3 94.2L215.6 77.2M150.6 133.3L182.9 177.8M109.4 133.3L77.1 177.8M96.7 94.2L44.4 77.2" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="166.4" y="59.8" text-anchor="middle" fill="currentColor">P</text>
<text x="189" y="129.2" text-anchor="middle" fill="currentColor">Q</text>
<text x="130" y="172" text-anchor="middle" fill="currentColor">R</text>
<text x="71" y="129.2" text-anchor="middle" fill="currentColor">S</text>
<text x="93.6" y="59.8" text-anchor="middle" fill="currentColor">T</text>
<text x="130" y="110" text-anchor="middle" style="fill:var(--mark)">H</text>
</svg>
<figcaption>Paanch regions ki ring, beech me hub H.</figcaption>
</figure>

(A) 2  (B) 3  (C) 4  (D) 5

**Soch:** Ring + hub → ring ki length odd/even, phir +1.

**Solution:**
1. Ring P–Q–R–S–T–P: length 5 (odd) → 3 colours chahiye. Jaise P = 1, Q = 2, R = 1, S = 2, T = 3 (T, S aur P dono ko chhoota hai).
2. H paanchon ko chhoota hai → H ka colour ring ke kisi colour jaisa nahi ho sakta → 4th colour.
3. Answer: **4** → **(C)**.

**Galti kahan hoti hai:** (B) 3 — ring theek se colour kar li par hub bhool gaye. Ya (A) 2 — odd ring ko alternate colours se band karne ki koshish.

**Example 6 (NAT, 2 marks, hard):** Two views of the same die are given. The die is **not** a standard die (opposite faces need not add to 7). Which number is opposite 4?

<figure class="fig">
<svg viewBox="0 0 270 135" xmlns="http://www.w3.org/2000/svg" font-size="16">
<path d="M20 50h60v60h-60zM20 50l25-25h60l-25 25M80 110l25-25V25" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="62" y="43" text-anchor="middle" fill="currentColor">5</text>
<text x="50" y="86" text-anchor="middle" fill="currentColor">4</text>
<text x="93" y="74" text-anchor="middle" fill="currentColor">1</text>
<path d="M155 50h60v60h-60zM155 50l25-25h60l-25 25M215 110l25-25V25" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="197" y="43" text-anchor="middle" fill="currentColor">5</text>
<text x="185" y="86" text-anchor="middle" fill="currentColor">1</text>
<text x="228" y="74" text-anchor="middle" fill="currentColor">6</text>
<text x="62" y="128" text-anchor="middle" fill="currentColor" font-size="12">View 1</text>
<text x="197" y="128" text-anchor="middle" fill="currentColor" font-size="12">View 2</text>
</svg>
<figcaption>Dono views me top = 5; front aur right faces dikh rahe hain.</figcaption>
</figure>

**Soch:** Common top face → side faces ki ring.

**Solution:**
1. Dono views me top 5 → die sirf vertical axis par ghooma hai.
2. View 1: front 4, right 1 → ring me 4 ke baad 1.
3. View 2: front 1, right 6 → ring me 1 ke baad 6.
4. Ring: 4 → 1 → 6 → (x). 4 aur 6 do step door → **opposite**.
5. Answer: **6**.

**Galti kahan hoti hai:** "Sum 7" lagakar 3 bolna. Die standard nahi hai; aur 3 kisi view me dikha bhi nahi.

## Confusions clear karo

**Q:** Rotation aur mirror me jaldi kaise pehchanun?
**A:** Ek lamba hissa (bar) dekho. Rotation 90° me khada ↔ leta ho jaata hai. Mirror me orientation same rehti hai, sirf left-right ya upar-neeche palat-ta hai.

**Q:** Clockwise me top row kahan jaati hai?
**A:** Right column me (upar se neeche padhte hue). Anticlockwise me left column me (neeche se upar).

**Q:** Map me do regions sirf ek kone par milte hain — adjacent?
**A:** Nahi. Adjacent tab jab ek boundary **line** share ho. Point par milna count nahi hota.

**Q:** Folding me kitne chhed honge, kaise jaldi bataun?
**A:** Har fold layers double karta hai. 2 folds → 4 layers → ek punch = 4 chhed. Phir position ke liye folds ulte order me khol kar reflect karo.

**Q:** Kya har 6-square shape jisme 2 × 2 block na ho, cube banata hai?
**A:** Nahi. 5 ya 6 squares ek line me bhi invalid hai, aur kuch aur shapes bhi. Cube ke kul **11** distinct nets hain; pakka karne ke liye mann me mod kar dekho ki koi do squares ek hi face par na aayein.

**Q:** Dice me sirf ek view ho toh?
**A:** Ek view me dikhne wale teeno faces aapas me **adjacent** hain — inme se koi do opposite nahi ho sakte. Ye "elimination" ke kaam aata hai.

## Khud try karo

**1.** On a 4 × 4 grid ($m = 3$), a cell is at $(x, y) = (1, 0)$. Where is it after a 90° clockwise rotation? And after a vertical-mirror reflection?

<details><summary>Answer dekho</summary>

Rotation: $(m - y, x) = (3 - 0, 1) = $ **(3, 1)** — top row se right column me aa gaya ✔.
Mirror: $(m - x, y) = $ **(2, 0)**.

</details>

**2.** How many squares are in a 3 × 3 grid?

<details><summary>Answer dekho</summary>

$9 + 4 + 1 = $ **14**.

</details>

**3.** A mirror shows a clock at 10:50. Actual time?

<details><summary>Answer dekho</summary>

$11{:}60 - 10{:}50 = $ **1:10**.

</details>

**4.** A square sheet is folded in half three times (each time in half again) and one hole is punched through all layers. How many holes appear after unfolding?

<details><summary>Answer dekho</summary>

3 folds → $2^3 = 8$ layers → **8** chhed.

</details>

**5.** A cube is cut by a plane parallel to one face. Cut face ki shape?

<details><summary>Answer dekho</summary>

**Square** (cube ke face jaisa hi). Corner cut hota toh equilateral triangle.

</details>

## Ek page me

- Map colouring: sirf shared **line** = adjacent; even ring → 2, odd ring → 3, hub → +1.
- Cube net: line me ek chhod kar wale opposite; 2 × 2 block ya 5+ in a row → invalid; 11 valid nets.
- Dice: common top → side faces ki ring; ring me do step door = opposite; "sum 7" sirf standard die par.
- Folding: ulte order me kholo; har kholna crease ke across **reflection**; $k$ folds → $2^k$ chhed.
- Diagonal fold: $(a, b) \leftrightarrow (b, a)$.
- 90° CW: $(x, y) \to (m - y, x)$ — x, y swap hote hain; top row → right column.
- Vertical mirror: $(x, y) \to (m - x, y)$; water image: $(x, m - y)$.
- Mirror clock: actual $= 11{:}60 - \text{shown}$.
- Triangles (apex + parallels): $k \cdot \binom{n}{2}$; sides aur base bhi gino.
- Squares in $m \times n$: $\sum (m - k + 1)(n - k + 1)$; 4 × 3 → 20.
- Cube cuts: parallel → square, corner → equilateral triangle, centre ⟂ diagonal → regular hexagon; cylinder tilted → ellipse.
- Pieces: area pehle, phir shape; "no flip" ho toh mirror piece reject.

Revision ke liye **Short note** tab dekho.
