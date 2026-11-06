# Reading comprehension and inference

> **Time:** ~30 min · **Pehle aana chahiye:** kuch nahi (English paragraph padh sakte ho, bas) · **Day:** GA rotation me (har din ke page pe us din ka GA topic likha hota hai)

## Ye topic kyun?

GATE GA me ek-do questions me 4–8 line ka chhota passage hota hai, aur poocha jaata hai: kaunsa statement passage se **supported** hai, kaunsa **inferred** ho sakta hai, kaunsa passage se **aage (beyond)** jaata hai, ya **main idea** kya hai. Ye 1-mark aur 2-mark dono me aate hain. English kitni bhi achhi ho, log yahan galti karte hain kyunki options "sach jaise" lagte hain par passage me likhe nahi hote. Ye lesson ek **checking method** sikhata hai jo opinion ki jagah proof par chalta hai.

## Picture se samjho

Socho tum ek judge ho. Har option ek "claim" hai. Claim tabhi maanoge jab passage me uska **saboot (backing sentence)** mile. Saboot nahi → claim reject, chahe woh real life me sach ho.

<figure class="fig">
<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg">
<text x="90" y="20" text-anchor="middle" fill="currentColor" font-size="14">Passage</text>
<text x="420" y="20" text-anchor="middle" fill="currentColor" font-size="14">Options</text>
<rect x="30" y="35" width="120" height="30" rx="6" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<text x="90" y="55" text-anchor="middle" fill="currentColor" font-size="13">Sentence 1</text>
<rect x="30" y="80" width="120" height="30" rx="6" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<text x="90" y="100" text-anchor="middle" fill="currentColor" font-size="13">Sentence 2</text>
<rect x="30" y="125" width="120" height="30" rx="6" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<text x="90" y="145" text-anchor="middle" fill="currentColor" font-size="13">Sentence 3</text>
<rect x="360" y="35" width="120" height="30" rx="6" style="fill:none;stroke:var(--good)" stroke-width="2"/>
<text x="420" y="55" text-anchor="middle" fill="currentColor" font-size="13">Option A</text>
<rect x="360" y="80" width="120" height="30" rx="6" style="fill:none;stroke:var(--good)" stroke-width="2"/>
<text x="420" y="100" text-anchor="middle" fill="currentColor" font-size="13">Option B</text>
<rect x="360" y="125" width="120" height="30" rx="6" style="fill:none;stroke:var(--good)" stroke-width="2"/>
<text x="420" y="145" text-anchor="middle" fill="currentColor" font-size="13">Option C</text>
<rect x="360" y="170" width="120" height="30" rx="6" style="fill:none;stroke:var(--bad)" stroke-width="2"/>
<text x="420" y="190" text-anchor="middle" fill="currentColor" font-size="13">Option D</text>
<line x1="355" y1="50" x2="155" y2="95" style="stroke:var(--good)" stroke-width="2"/>
<polygon points="155,95 165,89 166,98" style="fill:var(--good)"/>
<line x1="355" y1="95" x2="155" y2="50" style="stroke:var(--good)" stroke-width="2"/>
<polygon points="155,50 165,49 162,58" style="fill:var(--good)"/>
<line x1="355" y1="140" x2="155" y2="140" style="stroke:var(--good)" stroke-width="2"/>
<polygon points="155,140 164,135 164,145" style="fill:var(--good)"/>
<text x="255" y="190" text-anchor="middle" style="fill:var(--bad)" font-size="13">koi saboot nahi → BEYOND</text>
</svg>
<figcaption>Har option se passage ki taraf ek arrow kheencho. Jis option ka arrow kisi sentence par nahi pahunchta, woh passage se "aage" jaata hai.</figcaption>
</figure>

Is picture ka fayda dono taraf hai. Agar question "supported" poochhe, toh jawab woh option hai jiska arrow ek sentence tak pahunche **bina kuch add kiye**. Agar question "NOT supported / goes beyond" poochhe, toh jawab ulta hai: D — woh akela option jiska arrow kahin nahi pahunchta. Baaki teen sahi restatements hain, aur wahi is case me **galat** jawab hain.

Doosri picture "must hold" (necessary condition) ki hai. Ye 2-mark questions me aata hai.

<figure class="fig">
<svg viewBox="0 0 520 150" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="80" x2="500" y2="80" stroke="currentColor" stroke-width="2"/>
<polygon points="500,75 510,80 500,85" fill="currentColor"/>
<line x1="60" y1="72" x2="60" y2="88" stroke="currentColor" stroke-width="2"/>
<text x="60" y="105" text-anchor="middle" fill="currentColor" font-size="12">0%</text>
<line x1="150" y1="65" x2="150" y2="95" style="stroke:var(--mark)" stroke-width="3"/>
<text x="150" y="112" text-anchor="middle" style="fill:var(--mark)" font-size="13">25%</text>
<line x1="420" y1="72" x2="420" y2="88" stroke="currentColor" stroke-width="2"/>
<text x="420" y="105" text-anchor="middle" fill="currentColor" font-size="12">100% (double)</text>
<rect x="152" y="40" width="345" height="20" style="fill:var(--good);opacity:0.25"/>
<text x="320" y="55" text-anchor="middle" fill="currentColor" font-size="12">yahan kahin bhi → revenue badhega</text>
<text x="105" y="55" text-anchor="middle" style="fill:var(--bad)" font-size="12">revenue girega</text>
<text x="260" y="138" text-anchor="middle" style="fill:var(--muted)" font-size="12">price 20% kam: sales rise must be &gt; 25% (necessary); doubling is only sufficient</text>
</svg>
<figcaption>Price 20% ghataya. Revenue badhne ke liye sales ka rise 25% se zyada hona ZAROORI hai. "Sales double" bhi kaam karega, par woh zaroori nahi — sirf kaafi (sufficient) hai.</figcaption>
</figure>

"Must" wale question me hamesha **sabse kamzor** condition chahiye jo phir bhi kaam kare. Doubling (100%) bahut strong hai; 30% rise bhi revenue badha deta. Isliye "must" ka jawab "rise more than 25%" hai, "must double" nahi.

## Concept step-by-step

### 1. Question word pehle padho

**Idea:** Ek hi passage par alag-alag sawaal ka jawab bilkul ulta ho sakta hai. Isliye passage se pehle stem padho, aur question word par gola lagao.

**Rule — question words:**
| Question word | Kya dhoondhna hai |
|---|---|
| supported / stated / according to | jo passage me likha hai ya usse seedha nikalta hai |
| inferred / implies | jo passage se **zaroor** nikalta hai, chahe likha na ho |
| NOT supported / goes beyond / cannot be inferred | jiska koi saboot nahi |
| main idea / best title | poore passage ka saar |
| reason / why | passage me diya hua **kaaran** |
| must hold / necessary | sabse kamzor zaroori condition |

**Example:** Stem: "Which statement is NOT supported?" Agar tum NOT miss kar do, toh tum sach wala option chunoge — jo yahan galat hai.

**Dhyan do:** NOT / EXCEPT / beyond par hamesha gola lagao. Ye sabse common 2-mark trap hai.

### 2. Supported vs inferred vs beyond

**Idea:** Teen dabbe socho.
- **Supported:** passage me likha hai (same matlab, alag words chal jaate hain).
- **Inferred:** likha nahi hai, par passage ke sentences se **logically zaroor** nikalta hai. Jaise passage kahe "Ram, Shyam se lamba hai, aur Shyam, Mohan se lamba hai" → infer "Ram, Mohan se lamba hai".
- **Beyond:** koi naya group, naya kaaran, nayi comparison, ya future prediction jo passage ne kabhi nahi kaha.

**Example:** Passage: "Employees who worked from home three days a week had the same output and fewer resignations." Option: "Hybrid work would also cut resignations among sales staff." Passage me sales staff ka zikr hi nahi → **beyond** (naya group).

**Dhyan do:** "Real life me toh ye sach hai" — irrelevant. Sirf passage ke andar ka saboot ginta hai.

### 3. Har option ke liye backing sentence

**Idea:** Upar wali judge wali picture. Har option ke saamne passage ki line number likho.

**Rule:** Option sahi (supported) tab hai jab ek sentence (ya do sentences milkar) usse back karein, aur option usme **kuch extra** na jode.

**Example:** Passage line: "Most people who stopped visiting worked shifts ending after 6 pm." Option: "Many former users could not reach the library before 6 pm because of their shifts." Backing line mil gayi ✔.

**Dhyan do:** Option me ek bhi extra word ("only", "all", "proves") ho jo line me nahi hai, toh woh supported nahi hai.

### 4. Direction: kaun kis par asar daalta hai

**Idea:** Passage ek arrow banata hai: X → Y. Options aksar wahi do cheezein le kar arrow ulta kar dete hain.

**Rule:** Options padhne se pehle passage ka arrow apni copy me likho. Phir har option ka arrow compare karo.

**Example:** Passage: "Birds stopped feeding where crabs were removed; where birds were kept out, crab numbers did not change." Arrow: **crabs → birds** (crabs ki ginti birds ke feeding ko control karti hai, ulta nahi). Option "Birds keep crab numbers in check" = birds → crabs ✘.

**Dhyan do:** Dono cheezon ka naam option me hona = sahi option nahi. Arrow ki disha check karo.

### 5. Qualifiers: chhote words, bada farak

**Idea:** *not, only, some, most, all, main, partly, may, always* — ek word badla, statement ka matlab badal gaya.

**Rule:** Passage ke qualifier aur option ke qualifier ko word-by-word milao.

| Passage kehta hai | Option kehta hai | Result |
|---|---|---|
| main food in breeding season | only food all year | overgeneralise ✘ |
| may partly explain | fully explains | strong bana diya ✘ |
| not randomly selected | randomly selected | ulta ✘ |
| some colonies | colonies (all) | overgeneralise ✘ |

**Example:** Passage: "Crabs are the birds' main food during the breeding season." Option: "Birds eat only crabs." *main* → *only*, *breeding season* → saal bhar. Do jagah stretch ✘.

**Dhyan do:** Har *not* ko underline karo. "were not randomised" ko jaldi me "were randomised" padhna bahut common hai.

### 6. Main idea

**Idea:** Main idea woh hai jise **har** paragraph/sentence support karta ho. Ek sahi detail main idea nahi hota.

**Rule:** Option ko test karo: "Kya ye poore passage ko cover karta hai?" Agar sirf ek line ko cover karta hai → detail. Agar passage se bahar ki comparison laata hai → beyond.

**Example:** Passage open-source libraries ke baare me: volunteers maintain karte hain, companies depend karti hain par paisa kam deti hain, kuch grants mile hain par kaafi nahi. Main idea: "Widely used open-source software gets far less support than its importance justifies." "Some foundations give grants" — sach hai, par sirf ek detail.

**Dhyan do:** Detail options sach hote hain, isliye attractive lagte hain. Sach hona kaafi nahi; **broad** hona chahiye.

### 7. Reason questions

**Idea:** Passage kabhi-kabhi do badlaav (changes) aur unke alag-alag kaaran deta hai. Question ek specific badlaav ka kaaran poochta hai.

**Rule:** Har kaaran ko uske badlaav ke saath jodo (line by line). Phir question wale badlaav ka kaaran uthao.

**Example:** "Library extended hours **because** shift workers couldn't come before 6 pm. To keep costs unchanged, it **closed on Sunday mornings**." Q: Why were hours extended? Jawab = shift workers. "To keep costs unchanged" Sunday closing ka kaaran hai, extension ka nahi.

**Dhyan do:** Passage me "not driven by a rise in visitors" likha ho, toh "visitors badh gaye the" wala option ulta hai.

### 8. Study-design questions: association vs causation

**Idea:** Agar groups ko **randomly** nahi baanta gaya (log khud chunte hain — "self-selected"), toh groups pehle se alag ho sakte hain. Tab result ka farak sirf treatment ki wajah se hai, ye **prove nahi** hota.

**Rule:**
- Not randomised / self-selected / observational → sirf **association** (saath-saath hona).
- Sahi option aksar: "The study cannot yet show that X causes Y" ya "Part of the difference may be due to how the groups differed."
- Galat option: "proves X causes Y", "X alone accounts for all of Y".

**Example:** Patients ne khud tough physiotherapy chuni; woh pehle se younger aur fitter the. Recovery tez hui. Conclusion: routine ne hi recovery tez ki — **prove nahi hota**, kyunki age/fitness bhi wajah ho sakti hai.

**Dhyan do:** Bahut strong words (proves, alone, entire, always) wale options study-design questions me lagbhag hamesha galat hote hain.

### 9. "Must hold" = necessary condition

**Idea:** *Necessary* = iske bina kaam nahi hoga. *Sufficient* = ye ho toh kaam ho jaayega, par aur raaste bhi ho sakte hain.

**Rule:** "Must be true for X" → sabse kamzor condition chuno jo phir bhi X ke liye zaroori ho.

**Derivation (revenue example):** Revenue = price × quantity. Price 20% kam → naya price = $0.8p$. Naya revenue $0.8p \times q'$ purane $p \times q$ se bada chahiye: $0.8\,q' > q \Rightarrow q' > 1.25\,q$. Matlab sales **25% se zyada** badhni chahiye. Doubling ($q' = 2q$, revenue $= 1.6\,pq$) kaam karta hai par zaroori nahi.

**Dhyan do:** "Sales must double" sunne me strong aur confident lagta hai — yahi trap hai. Strong condition = sufficient, necessary nahi.

## Solved examples

**Passage P1 (Examples 1–2):**
> A school introduced a free breakfast programme in its primary section. Parents could choose whether to enrol their children. At the end of the year, enrolled children had higher average attendance than those who were not enrolled. The principal's newsletter credited breakfast for the improvement. A teacher pointed out that families who enrolled were also more likely to live close to the school, since breakfast was served before the first bell.

**Example 1 (MCQ, 1 mark, easy):** Which of the following can be inferred from P1?
(A) Free breakfast caused the higher attendance.
(B) Children who live far away do not like breakfast.
(C) The difference in attendance may be partly due to where the enrolled families live.
(D) All schools should start breakfast programmes.

**Soch:** Parents "could choose" = self-selected groups → study-design question.

**Solution:**
1. Groups random nahi the (parents ne chuna).
2. Teacher ne ek doosra farak bataya: enrolled families paas rehti hain. Paas rehna khud attendance badha sakta hai.
3. (A) "caused" — passage prove nahi karta ✘.
4. (B) "do not like breakfast" — kahin likha nahi ✘ (beyond).
5. (C) "may be partly" — teacher wali line back karti hai, qualifier soft hai ✔.
6. (D) sab schools — naya group aur recommendation ✘.
7. Answer: **(C)**.

**Galti kahan hoti hai:** (A) chunna kyunki principal ne yahi kaha. Passage principal ka **claim** batata hai, use sach sabit nahi karta.

**Example 2 (MSQ, 2 marks, medium):** Based on P1, which of the following statements go **beyond** the passage? (Select all that apply.)
(A) Enrolment in the programme was voluntary.
(B) Breakfast improves children's exam scores.
(C) Breakfast was served before the first bell.
(D) The secondary section had lower attendance than the primary section.

**Soch:** "beyond" par gola. Har option ka backing sentence dhoondo; jinka nahi mile, wahi answer.

**Solution:**
1. (A) "Parents could choose" → voluntary ✔ backed → beyond **nahi**.
2. (B) Exam scores ka zikr hi nahi → **beyond**.
3. (C) Last sentence me likha hai → beyond nahi.
4. (D) Secondary section ki koi baat nahi, comparison bhi nahi → **beyond**.
5. Answer: **(B) and (D)**.

**Galti kahan hoti hai:** "beyond" ko miss karke (A) aur (C) chunna — woh dono sahi restatements hain, isliye is question me galat.

**Passage P2 (Example 3):**
> In a mountain lake, the number of trout rose in years when mayflies were plentiful. Mayflies are the trout's main prey in early summer. When researchers blocked mayflies from one bay, trout left the bay within days. When trout were netted out of another bay, the mayfly count did not change.

**Example 3 (MCQ, 1 mark, medium):** Which statement is best supported by P2?
(A) Trout control the number of mayflies in the lake.
(B) Mayflies are the only food trout eat.
(C) The availability of mayflies influences where trout stay.
(D) Trout and mayflies are unrelated.

**Soch:** Do cheezein, ek effect → arrow ki direction check karo.

**Solution:**
1. Mayflies hataye → trout chale gaye: mayflies → trout.
2. Trout hataye → mayflies same: trout → mayflies **nahi**.
3. (A) arrow ulta ✘. (B) "main prey in early summer" ko "only food" bana diya ✘. (D) passage link dikhata hai ✘.
4. (C) arrow sahi disha me, qualifier "influences" soft ✔.
5. Answer: **(C)**.

**Galti kahan hoti hai:** (A) chunna — "predator prey ko control karta hai" common sense lagta hai, par yahan experiment ne ulta dikhaya.

**Example 4 (NAT, 2 marks, medium):** A shop sells 400 notebooks a month at a fixed price. The owner wants to cut the price by 25% and claims monthly revenue will increase. For this claim to hold, the number of notebooks sold per month must rise by **more than** what percentage? (Answer to two decimal places.)

**Soch:** "must hold" + revenue = price × quantity → necessary condition, sabse kamzor.

**Solution:**
1. Naya price = $0.75p$.
2. Revenue badhe: $0.75\,p\,q' > p \times 400 \Rightarrow q' > 400/0.75 = 533.33$.
3. Rise $= 533.33/400 - 1 = 1/0.75 - 1 = 0.3333$ → **33.33%**.
4. Answer: **33.33**.

**Galti kahan hoti hai:** "Price 25% gira, toh sales 25% badhe" → 25 likhna. Check: $0.75 \times 1.25 = 0.9375 < 1$ — revenue ab bhi 6.25% kam hai. Base badal jaata hai, isliye 25% kaafi nahi.

**Passage P3 (Example 5):**
> For decades, the city's old railway yard was seen only as an eyesore. When a group of artists rented one shed for a weekend exhibition, crowds arrived far beyond expectations. Visitors seemed interested less in the art than in the huge iron sheds themselves. The city council, which had planned to demolish the yard, began instead to consider keeping the sheds as a public space.

**Example 5 (MCQ, 2 marks, hard):** Which option best captures the main idea of P3?
(A) Artists prefer to exhibit in industrial buildings.
(B) Public interest led the council to see the old yard as worth keeping.
(C) The exhibition's artwork was of poor quality.
(D) Railway yards in all cities should be turned into galleries.

**Soch:** Main idea → kaunsa option shuru (eyesore) se ant (council ka naya soch) tak sab cover karta hai?

**Solution:**
1. Story: yard = eyesore → exhibition → bheed sheds dekhne aayi → council demolition ki jagah rakhne ka soche.
2. (A) Artists ki preference ka zikr nahi ✘.
3. (C) "interested less in the art" ≠ art kharab tha ✘ (galat inference).
4. (D) "all cities" — naya group ✘.
5. (B) Badlaav (eyesore → worth keeping) aur uski wajah (public interest) dono ✔.
6. Answer: **(B)**.

**Galti kahan hoti hai:** (C) chunna — "less in the art" padh kar maan lena ki art bura tha. Passage sirf comparison karta hai ki logon ko sheds zyada pasand aaye.

## Confusions clear karo

**Q:** "Inferred" aur "supported" me practically farak kya hai?
**A:** Supported = passage me lagbhag seedha likha hai. Inferred = do lines jod kar zaroor nikalta hai. Dono me rule same hai: option me koi extra claim nahi hona chahiye. Guess ya "shayad" wala option inference nahi hai.

**Q:** Agar option real life me sach hai par passage me nahi, tab?
**A:** Toh woh "beyond the passage" hai. GATE sirf passage ke andar ka logic test karta hai, tumhara general knowledge nahi.

**Q:** Option me "may" ho aur passage me "may" na ho, toh?
**A:** "may" option ko **kamzor** banata hai, jo aksar safe hota hai. Agar passage koi doosri possible wajah dikhata hai (jaise teacher wali line), toh "may be partly due to" sahi inference hai.

**Q:** Randomised kyun itna important hai?
**A:** Random baantne se dono groups average me ek jaise ho jaate hain (age, fitness, distance sab mix). Tab result ka farak treatment ki wajah se maana ja sakta hai. Log khud chunein toh groups pehle se alag hote hain — farak kisi bhi wajah se ho sakta hai.

**Q:** Main idea aur title me farak?
**A:** Practically same test: poore passage ko cover kare, na zyada broad (bahar ki duniya), na zyada narrow (ek detail).

**Q:** Time kaise bachaun?
**A:** Pehle stem (10 sec), phir passage ek baar dhyan se (60–90 sec), phir har option ke saamne line number. Passage do baar mat padho — sirf zaroori line par wapas jao.

## Khud try karo

**Passage:**
> A bakery switched from gas ovens to electric ovens in March. In the following six months, its energy bill fell by 15%. During the same months, the bakery also reduced its opening hours by one hour a day because fewer customers came in the evenings.

**1.** Kya ye conclusion supported hai: "Electric ovens alone reduced the energy bill by 15%"?

<details><summary>Answer dekho</summary>

**Nahi.** Usi samay opening hours bhi kam hue — woh bhi bill kam kar sakta hai. "alone" wala claim passage support nahi karta. Sahi inference: "The fall in the bill may be partly due to shorter opening hours."

</details>

**2.** Why did the bakery reduce its opening hours, according to the passage?

<details><summary>Answer dekho</summary>

"because fewer customers came in the evenings." Energy bachana passage ke hisaab se kaaran **nahi** diya gaya — woh reason-for-wrong-change trap hai.

</details>

**3.** Price 10% kam karne par revenue badhe, iske liye sales kam se kam kitne percent se zyada badhni chahiye?

<details><summary>Answer dekho</summary>

$0.9\,q' > q \Rightarrow q' > q/0.9$. Rise $= 1/0.9 - 1 = 0.1111$ → **11.11% se zyada**.

</details>

**4.** Passage: "Most of the town's water comes from the river in summer." Option: "The town gets all its water from the river." Supported?

<details><summary>Answer dekho</summary>

**Nahi.** *most* → *all* aur *in summer* → saal bhar. Do qualifiers stretch hue — overgeneralisation.

</details>

## Ek page me

- Pehle **question word** padho: supported / inferred / NOT / beyond / main idea / reason / must.
- NOT / beyond par gola lagao; wahan teen sahi restatements galat jawab hain.
- Har option ke saamne **backing sentence** likho; koi line nahi → beyond.
- Supported = likha hai; inferred = zaroor nikalta hai; beyond = naya group, kaaran, comparison ya prediction.
- Passage ka arrow X → Y pehle likho; ulta arrow (Y → X) reject.
- Qualifiers word-by-word milao: not, only, some, most, main, partly, may.
- Main idea = poore passage ko cover kare; sach detail ≠ main idea.
- Reason questions: har kaaran ko uske apne badlaav se jodo.
- Not randomised / self-selected → sirf association; "proves", "alone", "entire" wale options galat.
- Must hold = necessary = sabse kamzor zaroori condition; strong (sufficient) condition trap hai.
- Price x% kam → revenue ke liye sales rise $> \frac{1}{1-x} - 1$ (20% → 25%, 25% → 33.33%).

Revision ke liye **Short note** tab dekho.
