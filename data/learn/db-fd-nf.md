# Functional dependencies and normal forms

> **Time:** ~40 min · **Pehle aana chahiye:** keys aur superkeys (Day 36), sets ke subset/union · **Day:** 39

## Ye topic kyun?

Ek badi table me agar ek hi fact baar-baar likha ho (jaise har order ke saath customer ka city), to update karte waqt ek jagah badlo aur doosri jagah bhool jao — data inconsistent ho jaata hai. **Functional dependencies (FDs)** batati hain ki kaun sa column kis column se tay hota hai, aur **normal forms** (2NF, 3NF, BCNF) batate hain ki table me aisi redundancy hai ya nahi. GATE DA me ye sabse zyada marks wala DB topic hai: closure nikalna, candidate keys ginna (NAT), highest normal form (MCQ), aur decomposition lossless / dependency-preserving hai ya nahi (MSQ).

## Picture se samjho

FD $X \to Y$ ko ek **domino rule** socho: "agar X ke saare domino gir gaye, to Y bhi girega". **Closure** $X^+$ nikalna matlab: X se shuru karo aur dekho kaun-kaun se domino girte jaate hain. Rule: koi FD tabhi chalti hai jab uske left side ke **saare** attributes already gir chuke hon.

<figure class="fig">
<svg viewBox="0 0 625 135" xmlns="http://www.w3.org/2000/svg" font-size="14" fill="currentColor">
<defs><marker id="fdna" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<rect x="10" y="40" width="120" height="44" rx="6" fill="none" style="stroke:var(--info)"/>
<text x="70" y="67" text-anchor="middle">{A}</text>
<line x1="130" y1="62" x2="173" y2="62" stroke="currentColor" marker-end="url(#fdna)"/>
<text x="152" y="52" text-anchor="middle" font-size="12">A→B</text>
<rect x="175" y="40" width="120" height="44" rx="6" fill="none" style="stroke:var(--info)"/>
<text x="235" y="67" text-anchor="middle">{A, B}</text>
<line x1="295" y1="62" x2="338" y2="62" stroke="currentColor" marker-end="url(#fdna)"/>
<text x="317" y="52" text-anchor="middle" font-size="12">B→C</text>
<rect x="340" y="40" width="120" height="44" rx="6" fill="none" style="stroke:var(--good)"/>
<text x="400" y="67" text-anchor="middle">{A, B, C}</text>
<line x1="460" y1="62" x2="503" y2="62" style="stroke:var(--bad)" stroke-dasharray="4 3" marker-end="url(#fdna)"/>
<text x="482" y="52" text-anchor="middle" font-size="12" style="fill:var(--bad)">CD→E</text>
<rect x="505" y="40" width="110" height="44" rx="6" fill="none" style="stroke:var(--bad)" stroke-dasharray="4 3"/>
<text x="560" y="60" text-anchor="middle" font-size="12" style="fill:var(--bad)">ruk gaye:</text>
<text x="560" y="76" text-anchor="middle" font-size="12" style="fill:var(--bad)">D nahi hai</text>
<text x="312" y="120" text-anchor="middle" style="fill:var(--muted)">F = {A→B, B→C, CD→E, E→F}:  A⁺ = {A, B, C}</text>
</svg>
<figcaption>Closure ek-ek FD "fire" karke badhta hai. CD→E ke liye C aur D dono chahiye; sirf C hone se kuch nahi hota.</figcaption>
</figure>

Dhyan do: agar shuru me {A, D} hota, to C aane ke baad CD→E chal jaati, phir E→F — aur $(AD)^+$ = saare 6 attributes. Jab closure poori table ban jaaye, wo set ek **superkey** hai.

Normal forms ek ke andar ek baithe hain, jaise matryoshka dolls. Har andar wala box zyada strict rule maangta hai.

<figure class="fig">
<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg" font-size="13" fill="currentColor">
<rect x="10" y="10" width="600" height="240" rx="10" fill="none" style="stroke:var(--muted)"/>
<rect x="30" y="50" width="560" height="190" rx="10" fill="none" style="stroke:var(--info)"/>
<rect x="50" y="90" width="520" height="140" rx="10" fill="none" style="stroke:var(--mark)"/>
<rect x="70" y="130" width="480" height="90" rx="10" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<text x="25" y="35">1NF: har cell me ek atomic value</text>
<text x="45" y="75">2NF: koi non-prime attribute kisi key ke hisse (proper subset) pe depend nahi</text>
<text x="65" y="115">3NF: har nontrivial X → A me X superkey ho, YA A prime ho</text>
<text x="85" y="160">BCNF: har nontrivial X → A me X superkey ho</text>
<text x="85" y="190" style="fill:var(--muted)">(sabse strict; BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF)</text>
</svg>
<figcaption>Normal forms nested hain. Jo BCNF me hai wo 3NF me bhi hai, par ulta zaroori nahi.</figcaption>
</figure>

Dhyan do: 3NF aur BCNF me sirf ek "YA A prime ho" ka farak hai. Wahi chhoti si chhoot GATE ke "3NF but not BCNF" sawalon ki jaan hai.

## Concept step-by-step

### 1. Functional dependency kya hai

$X \to Y$ ("X determines Y") ka matlab: kisi bhi do rows me agar X ki values same hain, to Y ki values bhi same honi chahiye.

**Example:**

| roll | name | dept | hod |
|---|---|---|---|
| 1 | Asha | CS | Rao |
| 2 | Ravi | CS | Rao |
| 3 | Asha | EE | Sen |

Yahan dept → hod dikh raha hai (CS hamesha Rao). Lekin name → dept nahi (Asha ke do alag dept). Ek instance FD ko **tod** sakta hai, prove nahi kar sakta — FD schema ka rule hai.

**Trivial FD:** $X \to Y$ jahan $Y \subseteq X$ (jaise AB → A). Ye hamesha sach hai, isliye normal form tests me ignore karte hain.

Dhyan do: FD "ek taraf" chalta hai. A → B se B → A nahi milta.

### 2. Attribute closure $X^+$

**Algorithm:**
1. Result = X.
2. Har FD $L \to R$ dekho: agar poora $L$ result me hai, to $R$ jod do.
3. Jab tak kuch naya jud raha hai, repeat.

**Use:** $X \to Y$ F se nikalti hai **iff** $Y \subseteq X^+$. Aur X superkey hai iff $X^+$ = saare attributes.

**Example:** R(A, B, C, D, E, F), F = {A → B, B → C, CD → E, E → F}.
- $A^+$: {A} → A→B → {A, B} → B→C → {A, B, C}. CD→E nahi (D nahi). $A^+$ = {A, B, C}.
- $(AD)^+$: {A, D} → B → C → ab C aur D dono → E → F. = {A, B, C, D, E, F}. Superkey!

Isliye A → C implied hai (C ∈ $A^+$), lekin A → E nahi.

Dhyan do: chain ko ulta mat padho. A → B → C se C ke closure me A nahi aata: $C^+$ = {C}.

### 3. Armstrong's axioms

Teen basic rules (inse saari implied FDs mil jaati hain):
- **Reflexivity:** $Y \subseteq X$ ⇒ $X \to Y$.
- **Augmentation:** $X \to Y$ ⇒ $XZ \to YZ$ (dono taraf same cheez jodo).
- **Transitivity:** $X \to Y$, $Y \to Z$ ⇒ $X \to Z$.

Inse nikalne wale rules:
- **Union:** $X \to Y$, $X \to Z$ ⇒ $X \to YZ$.
- **Decomposition:** $X \to YZ$ ⇒ $X \to Y$ aur $X \to Z$ (right side tod sakte ho).
- **Pseudo-transitivity:** $X \to Y$, $WY \to Z$ ⇒ $WX \to Z$.

**Left side nahi tod sakte.** AB → C se A → C nahi milta. Counterexample:

| A | B | C |
|---|---|---|
| 1 | 1 | 5 |
| 1 | 2 | 6 |

AB → C sach hai (dono AB alag hain), par A = 1 ke liye C = 5 aur 6 — A → C jhooth.

Dhyan do: RHS split = theek; LHS split = galat.

### 4. Candidate keys dhoondhna

Candidate key = minimal set X jiska $X^+$ = R.

**Method:**
1. Jo attributes **kisi bhi RHS pe nahi** aate, wo kisi FD se mil hi nahi sakte — isliye **har key me** honge. Inka set = core.
2. Core ka closure lo. Agar poora R, to core hi akeli key hai.
3. Warna core me ek-ek attribute jod kar closure test karo, phir do-do, … Sirf minimal sets rakho (jisme pehle se mili key ho wo skip).
4. Pehli key milne ke baad **rukna nahi**: dekho kaun sa attribute key ke kisi member ko produce karta hai — use swap karke doosri key mil sakti hai.

**Example:** R(A, B, C, D), F = {AB → C, C → D, D → B}.
1. RHS pe: C, D, B. A kahin nahi → A har key me. $A^+$ = {A}.
2. $(AB)^+$ = {A, B, C, D} ✓. $(AC)^+$ = {A, C, D, B} ✓. $(AD)^+$ = {A, D, B, C} ✓.
3. Keys: **AB, AC, AD** (3).

Swap trick: AB key hai; D → B, to B ki jagah D: AD bhi key. C → D, to AC bhi.

**Do alag cycles ka shortcut:** agar attributes do independent cycles me hon (A → B → C → A aur D → E → D), to key ko har cycle se ek attribute chahiye: keys = 3 × 2 = 6 (m·n).

Dhyan do: pehli key pe ruk jaana sabse common galti hai; aur jitni keys utne prime attributes.

### 5. Prime attribute

**Prime** = kisi bhi candidate key ka member. Upar wale example me keys AB, AC, AD → prime = {A, B, C, D} (sab). Non-prime = baaki.

Dhyan do: ek attribute prime hone ke liye **kisi ek** key me hona kaafi hai. Doosri key bhool gaye to galat bolo ge ki attribute non-prime hai.

### 6. 2NF, 3NF, BCNF ke tests

Pehle **saari keys** nikalo, prime/non-prime decide karo. Phir har nontrivial FD $X \to A$ (single attribute RHS) pe:

| Normal form | Condition |
|---|---|
| BCNF | X superkey |
| 3NF | X superkey **ya** A prime |
| 2NF | A non-prime ho to X kisi key ka proper subset na ho |

**Partial dependency:** non-prime A, kisi key ke **proper subset** pe depend kare (2NF todti hai). **Transitive dependency:** non-prime A, aise X pe depend kare jo key ka hissa bhi nahi aur superkey bhi nahi (3NF todti hai, 2NF nahi).

**Kyun ye redundancy hai?** BCNF violation $X \to A$ me X key nahi, to same X wali kai rows ho sakti hain, aur har row me A ki same value dobara likhi jaati hai. 3NF us case ko chhod deta hai jahan A prime hai, taaki dependencies preserve ho saken (step 9).

**Example 1:** R(A, B, C, D, E), F = {A → B, B → C, CD → E}. Key: A, D kisi RHS pe nahi; $(AD)^+$ = ABCDE → key **AD** (akeli). A → B: A key AD ka proper subset, B non-prime → **partial** → not 2NF. Highest: **1NF**.

**Example 2:** R(A, B, C, D), F = {AB → C, C → D, D → B} (keys AB, AC, AD; sab prime). C → D: C superkey nahi ($C^+$ = {C, D, B}), par D prime → 3NF ok, BCNF fail. Highest: **3NF**.

**Shortcuts:**
- Do attributes wali table hamesha BCNF (koi bhi nontrivial FD A → B ho to A khud key hai).
- Saare attributes prime ⇒ kam se kam 3NF (har A prime hai).
- Key single attribute ho ⇒ proper subset ∅ hai, partial ho hi nahi sakta ⇒ kam se kam 2NF.

Dhyan do: "C → D" dekhte hi "transitive" mat bolo — pehle check karo C kisi key ka hissa to nahi. Agar C ⊂ key aur D non-prime, to wo **partial** hai.

### 7. Minimal (canonical) cover

FDs ka sabse chhota equivalent set. **Teen kadam, isi order me:**
1. RHS ko single attribute me todo.
2. Har FD ke LHS se **extraneous** attribute hatao: $XB \to A$ me B extraneous hai agar $A \in X^+$ (poore F se).
3. **Redundant** FD hatao: $X \to A$ redundant hai agar baaki FDs se hi $A \in X^+$.

**Example:** F = {A → BC, B → C, AB → D, D → C}.
1. Split: A → B, A → C, B → C, AB → D, D → C.
2. AB → D: $A^+$ = {A, B, C, D} me D hai → B extraneous → A → D.
3. Ab {A → B, A → C, B → C, A → D, D → C}. A → C: baaki se $A^+$ = {A, B, C, D} ∋ C → redundant, hatao. Baaki chaar me se koi hatane par uska RHS closure se nikal jaata hai (jaise B → C hatao to $B^+$ = {B}).
4. Minimal cover: **{A → B, B → C, A → D, D → C}** (4 FDs).

**Do sets equivalent kab?** F aur G equivalent iff G ki har FD F se nikle aur F ki har FD G se (closure test dono taraf).

Dhyan do: extraneous LHS pehle hatao, redundant FD baad me — order ulta karne se kabhi-kabhi non-minimal answer bachta hai.

### 8. Lossless join decomposition

Table ko $R_1, R_2$ me todna **lossless** hai agar $R_1 \bowtie R_2$ wapas exactly R de (koi faltu row nahi).

**Binary test:** lossless iff $(R_1 \cap R_2) \to R_1$ ya $(R_1 \cap R_2) \to R_2$. Yaani common attributes kisi ek part ki superkey hon.

**Kyun?** Agar common part ek side ki key hai, to join me har row ko us side me exactly ek partner milta hai — nayi combinations nahi banti.

**Example:** R(A, B, C, D), F = {A → B, C → D}.
- {AB, ACD}: common = A, $A^+$ ⊇ AB ✓ → lossless.
- {AB, BCD}: common = B, $B^+$ = {B} ✗ → **lossy**. Instance se dekho:

| A | B | C | D |
|---|---|---|---|
| 1 | x | 5 | p |
| 2 | x | 6 | q |

AB = {(1,x), (2,x)}, BCD = {(x,5,p), (x,6,q)}. Join on B → 4 rows: (1,x,5,p), (1,x,6,q), (2,x,5,p), (2,x,6,q). Do **spurious** (nakli) rows aa gayi.

Teen ya zyada parts ho to: do parts ko lossless tareeke se jodo, phir result ko teesre se (ya chase table method). **Koi common attribute nahi** (jaise {AB, CD}) → join = Cartesian product → lossy.

Dhyan do: "lossy" ka matlab rows kam nahi hoti — **zyada** (galat) rows aati hain, isliye information "lose" hoti hai.

### 9. Dependency preservation

Decomposition **dependency preserving** hai agar har original FD, parts pe projected FDs se hi nikal aaye — bina join kiye. Fayda: insert/update pe har FD ek hi table me check ho jaaye.

**Test (har FD X → Y ke liye):** Z = X. Repeat: har part $R_i$ ke liye Z = Z ∪ ($(Z \cap R_i)^+ \cap R_i$). Jab Z badhna band ho, dekho $Y \subseteq Z$.

**Classic example:** R(A, B, C), F = {AB → C, C → B}. Keys AB, AC (sab prime) → 3NF; C → B se BCNF fail. BCNF ke liye todo {BC, AC}: common C, C → B → lossless ✓. Par AB → C: Z = AB; Z ∩ BC = B, $B^+$ = B; Z ∩ AC = A, $A^+$ = A. Z nahi badha, C nahi mila → **lost**. Is R ka koi bhi BCNF decomposition AB → C preserve nahi karta.

**Do important facts:**
- **3NF synthesis** (minimal cover ki har FD ki ek table + agar zaroori ho to ek key ki table): hamesha lossless **aur** dependency preserving.
- **BCNF decomposition:** hamesha lossless ho sakta hai, par FDs kho sakta hai.

Lossless aur preserving **independent** hain: {AB, BCD} (step 8) lossy hai par A → B, C → D dono preserve hain.

Dhyan do: preservation check me parts ko join nahi karna — wahi to point hai.

## Solved examples

**Example 1 (MCQ, easy):** R(A, B, C, D, E, F), F = {A → C, C → D, BD → E, E → F}. $\{A\}^+$ kya hai?
(A) {A, C} (B) {A, C, D} (C) {A, C, D, E, F} (D) {A, B, C, D, E, F}

**Soch:** closure — sirf wahi FD fire karo jiska poora LHS set me ho.

**Solution:**
1. {A} → A → C → {A, C}.
2. C → D → {A, C, D}.
3. BD → E: B nahi hai → ruk. E → F: E nahi.
4. Answer **(B)**.

**Galti kahan hoti hai:** D aate hi BD → E fire kar dena → (C). B ke bina BD → E nahi chalti. (Note: $(AB)^+$ poora R hai, to AB key hai.)

**Example 2 (NAT, medium):** R(A, B, C, D, E, G), F = {A → B, B → C, C → A, D → E, E → D}. Kitni candidate keys?

**Soch:** do cycles + ek attribute jo kisi RHS pe nahi.

**Solution:**
1. G kisi RHS pe nahi → har key me.
2. Cycle 1: A, B, C — inme se koi ek baaki dono deta hai.
3. Cycle 2: D, E — koi ek doosra deta hai.
4. Key = G + (A/B/C me se ek) + (D/E me se ek). Jaise $(ADG)^+$ = {A, D, G, B, C, E} = R ✓, aur koi chhota set kaam nahi karta.
5. Count = 3 × 2 = **6** (ADG, AEG, BDG, BEG, CDG, CEG).

**Galti kahan hoti hai:** 3 + 2 = 5 bolna (choices multiply hoti hain, add nahi). Ya G bhool kar keys ko 2-attribute maanna.

**Example 3 (MSQ, medium):** R(A, B, C, D, E), F = {AB → CD, C → A, D → E}. Kaun se statements sahi hain?
(A) AB aur BC dono candidate keys hain.
(B) R 2NF me hai.
(C) R 3NF me hai.
(D) C → A, 3NF ko todti hai.

**Soch:** keys pehle, phir har FD ko test.

**Solution:**
1. B kisi RHS pe nahi. $B^+$ = {B}.
2. $(AB)^+$ = {A, B, C, D, E} ✓. $(BC)^+$: C → A → {A, B, C}, AB → CD → D, D → E → poora ✓. $(BD)^+$ = {B, D, E} ✗, $(BE)^+$ ✗. Keys: **AB, BC** → (A) ✓.
3. Prime = {A, B, C}; non-prime = {D, E}.
4. Partial check: A, B, C ke closures: $A^+$ = A, $B^+$ = B, $C^+$ = {C, A} — kisi key ke hisse se D ya E nahi milta → 2NF ✓ → (B) ✓.
5. D → E: D superkey nahi, E non-prime → 3NF fail → (C) ✗.
6. C → A: A prime → 3NF ke liye ok (BCNF ke liye nahi) → (D) ✗.
7. Answer **(A), (B)**. (Python se check: highest NF = 2NF.)

**Galti kahan hoti hai:** sirf AB ko key maan kar A ko non-prime samajhna; tab C → A ko violation bol doge aur (D) tick karoge.

**Example 4 (MCQ, medium):** F = {A → BC, B → C, AB → D, D → C} ka minimal cover kaun sa hai?
(A) {A → B, B → C, A → D, D → C}
(B) {A → B, A → D, D → C}
(C) {A → B, B → C, AB → D}
(D) {A → BC, AB → D, D → C}

**Soch:** split → extraneous LHS → redundant FD.

**Solution:**
1. Concept step 7 me yahi kiya: result {A → B, B → C, A → D, D → C}.
2. (B) me B → C nahi; kya wo baaki se nikalti hai? $B^+$ = {B} → nahi. To (B) equivalent hi nahi.
3. (C) me D → C missing (D⁺ = {D}) aur AB → D me B extraneous.
4. (D) me RHS single nahi aur B extraneous.
5. Answer **(A)**.

**Galti kahan hoti hai:** (B) chunna — "B → C to A → B, A → C se aa jaayegi" sochna. Transitivity ulti nahi chalti: A → B aur A → C se B → C nahi milti.

**Example 5 (NAT, medium–hard):** R(A, B, C, D, E), F = {A → C, C → D, B → E}. Neeche me se kitne decompositions lossless hain?
1. {AC, CD, ABE}
2. {AB, BE, CD}
3. {ABE, ACD}
4. {ABC, CDE}

**Soch:** binary test baar-baar: do parts jodo jinka common unme se ek ki key ho.

**Solution:**
1. {AC, CD, ABE}: AC ∩ CD = C, C → D ⇒ CD side ✓ → jod ke ACD. ACD ∩ ABE = A, $A^+$ = {A, C, D} ⊇ ACD ✓ → **lossless**.
2. {AB, BE, CD}: CD ka AB ya BE se koi common attribute nahi → **lossy**.
3. {ABE, ACD}: common A, $A^+$ ⊇ ACD ✓ → **lossless**.
4. {ABC, CDE}: common C, $C^+$ = {C, D} — na ABC na CDE contain → **lossy**.
5. Answer = **2**. (Chase algorithm se Python me bhi 2 aaya.)

**Galti kahan hoti hai:** (4) ko lossless bolna kyunki "common attribute C hai". Sirf common hona kaafi nahi; common ko ek side ki **key** hona chahiye.

**Example 6 (MSQ, hard):** R(A, B, C, D), F = {AB → C, C → A, C → D}. Decomposition {ACD, BC}. Kaun se statements sahi hain?
(A) R 2NF me hai.
(B) Decomposition lossless hai.
(C) Decomposition saari FDs preserve karta hai.
(D) ACD aur BC dono BCNF me hain.

**Soch:** keys → partial check; phir binary lossless test; phir preservation test.

**Solution:**
1. B kisi RHS pe nahi. $(AB)^+$ = {A, B, C, D} ✓; $(BC)^+$ = {B, C, A, D} ✓; $(BD)^+$ = {B, D} ✗. Keys **AB, BC**. Prime {A, B, C}, non-prime {D}.
2. C → D: C, key BC ka proper subset hai aur D non-prime → **partial** → not 2NF → (A) ✗.
3. Lossless: ACD ∩ BC = C, $C^+$ = {C, A, D} ⊇ ACD ✓ → (B) ✓.
4. AB → C: Z = AB. Z ∩ ACD = A, $A^+$ = A. Z ∩ BC = B, $B^+$ = B. Z nahi badhta → C nahi → lost → (C) ✗.
5. ACD me FDs C → A, C → D; key C → BCNF. BC do attributes → BCNF. (D) ✓.
6. Answer **(B), (D)**.

**Galti kahan hoti hai:** C → D ko "transitive" maan kar R ko 2NF bolna. C khud key BC ka hissa hai, isliye ye partial dependency hai aur 2NF tootta hai.

## Confusions clear karo

**Q:** Superkey aur candidate key FD ke context me kaise nikalein?
**A:** X superkey iff $X^+$ = R. Candidate key = superkey jiske kisi bhi attribute ko hatane par closure R se chhota ho jaaye.

**Q:** Partial aur transitive dependency me farak?
**A:** Dono me RHS non-prime hai. Partial: LHS kisi key ka proper subset (jaise C ⊂ BC). Transitive: LHS na key ka subset na superkey (jaise D, jab keys AB, BC hon). Partial 2NF todta hai; transitive sirf 3NF.

**Q:** 3NF hai par BCNF nahi — aisa kab hota hai?
**A:** Jab koi FD $X \to A$ ho jahan X superkey nahi, par A prime ho. Classic: R(A, B, C), AB → C, C → B.

**Q:** BCNF hamesha best kyun nahi?
**A:** BCNF tak todne me kabhi-kabhi koi FD preserve nahi hoti (AB → C wala case). Tab us FD ko check karne ke liye har update pe join karna padta hai. 3NF ye guarantee deta hai ki lossless + preserving dono mil jaayein.

**Q:** Lossless test me $R_1 \cap R_2$ ka closure kis F se?
**A:** Original R ke poore F se.

**Q:** Kya lossless ⇒ dependency preserving?
**A:** Nahi, dono independent hain. {BC, AC} (classic) lossless hai par AB → C kho deta hai; {AB, BCD} (F = {A → B, C → D}) lossy hai par dono FDs preserve karta hai.

**Q:** Minimal cover unique hota hai?
**A:** Nahi, order ke hisaab se alag minimal covers aa sakte hain; sab equivalent hote hain. MCQ me check karo ki option (i) equivalent hai, (ii) single RHS, (iii) koi extraneous/redundant nahi.

## Khud try karo

**1.** R(A, B, C, D), F = {A → B, BC → D, D → A}. Kaun si FDs implied hain: AC → D, D → B, B → D, CD → B?

<details><summary>Answer dekho</summary>

- $(AC)^+$: A → B, phir BC → D → {A, B, C, D} ∋ D ✓.
- $D^+$ = {D, A, B} ∋ B ✓.
- $B^+$ = {B} ✗.
- $(CD)^+$: D → A → A → B → {A, B, C, D} ∋ B ✓.

Implied: **AC → D, D → B, CD → B**.

</details>

**2.** Isi R ki candidate keys aur highest normal form?

<details><summary>Answer dekho</summary>

C kisi RHS pe nahi. $(AC)^+$, $(BC)^+$, $(CD)^+$ teeno = ABCD. Keys **AC, BC, CD**; sab attributes prime → kam se kam 3NF. A → B: A superkey nahi → BCNF fail. Highest: **3NF**.

</details>

**3.** R(A, B, C, D, E), F = {A → B, B → C, C → A}. Candidate keys aur superkeys kitne?

<details><summary>Answer dekho</summary>

D, E kisi RHS pe nahi; cycle A, B, C se ek. Keys: ADE, BDE, CDE (3). Superkeys: koi bhi set jisme D, E ho aur A/B/C me se kam se kam ek: $2^3 - 1 = 7$ (A, B, C ke subsets me se khaali wala hata ke). Answer **7**.

</details>

**4.** R(A, B, C, D), F = {A → B, B → C, C → D}. Highest NF? Aur {AB, BC, CD} lossless + preserving hai?

<details><summary>Answer dekho</summary>

Key A (single) → 2NF. B → C: B superkey nahi, C non-prime → not 3NF. Highest **2NF**. {AB, BC, CD}: BC ∩ CD = C → CD ✓ (BCD), AB ∩ BCD = B → BCD ✓ → lossless. Har FD kisi ek part me hai → preserving. **Dono haan.**

</details>

## Ek page me

- $X \to Y$: same X ⇒ same Y. Trivial: $Y \subseteq X$.
- $X^+$: X se shuru, sirf poora LHS hone par FD fire karo; repeat. $X \to Y$ iff $Y \subseteq X^+$.
- Armstrong: reflexivity, augmentation, transitivity; RHS split allowed, LHS split nahi.
- Kisi RHS pe na aane wale attributes har key me. Grow + test + minimal + pehli key pe mat ruko.
- Do independent cycles (m, n) ⇒ m·n keys.
- Prime = kisi bhi key ka member.
- BCNF: LHS superkey. 3NF: LHS superkey ya RHS prime. 2NF: non-prime, key ke proper subset pe depend nahi.
- 2-attribute table BCNF; sab prime ⇒ ≥ 3NF; single-attribute key ⇒ ≥ 2NF.
- Minimal cover: split RHS → extraneous LHS → redundant FDs.
- Lossless binary: $(R_1 \cap R_2) \to R_1$ ya $\to R_2$. Koi common nahi ⇒ lossy.
- Preservation: Z = X; Z ∪= $(Z \cap R_i)^+ \cap R_i$; join kabhi nahi.
- 3NF synthesis = lossless + preserving; BCNF = lossless, FDs kho sakta hai. Lossless aur preserving independent.

Revision ke liye **Short note** tab dekho.
