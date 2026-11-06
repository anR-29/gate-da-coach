# Maxima, minima, convexity and gradient descent

> **Time:** ~35 min · **Pehle aana chahiye:** derivatives ke rules (product, chain), $f'$ aur $f''$ nikalna, quadratic ka discriminant · **Day:** 24

## Ye topic kyun?
Machine learning ka har model asal me ek optimisation hai: loss ko minimum karo. Iske liye teen cheezen chahiye: minimum/maximum kaise dhoondhte hain, kab "local" minimum hi "global" hota hai (convexity), aur jab formula se solve na ho to computer step-by-step kaise neeche utarta hai (gradient descent). GATE DA me isse 1–2 mark ke NAT/MCQ/MSQ aate hain: closed interval par max/min, convex kahan hai, word problem (fence, box), aur gradient descent ke 1–2 step.

## Picture se samjho
Socho tum ek pahadi raste par chal rahe ho. Jahan rasta upar chadhna band karke neeche utarna shuru karta hai, wahan ek **choti** (local maximum) hai; jahan neeche utarna band karke chadhna shuru hota hai, wahan ek **ghaati** (local minimum) hai. Dono jagah raasta ek pal ke liye bilkul flat hai: slope $f'(x)=0$.

<figure class="fig">
<svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="150" x2="300" y2="150" style="stroke:var(--muted)"/>
<line x1="130" y1="10" x2="130" y2="200" style="stroke:var(--muted)"/>
<polyline points="40,133.1 55,123 70,120 85,122.6 100,129.4 115,139 130,150 145,161 160,170.6 175,177.4 190,180 205,177 220,166.9 235,148.4 250,120 265,80.4 280,28.1" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<line x1="50" y1="120" x2="90" y2="120" style="stroke:var(--mark)" stroke-dasharray="4,3"/>
<line x1="170" y1="180" x2="210" y2="180" style="stroke:var(--mark)" stroke-dasharray="4,3"/>
<circle cx="70" cy="120" r="4" style="fill:var(--good)"/>
<circle cx="190" cy="180" r="4" style="fill:var(--bad)"/>
<circle cx="40" cy="133.1" r="4" fill="currentColor"/>
<circle cx="280" cy="28.1" r="5" style="fill:var(--good)"/>
<text x="40" y="108" font-size="11" fill="currentColor">local max</text>
<text x="200" y="198" font-size="11" fill="currentColor">local min (abs min)</text>
<text x="12" y="125" font-size="10" fill="currentColor">a</text>
<text x="150" y="25" font-size="11" fill="currentColor">endpoint b: abs max</text>
<text x="230" y="140" font-size="11" fill="currentColor">f</text>
</svg>
<figcaption>f(x) = x³ − 3x on [−1.5, 2.5]. Local max/min par tangent flat (dashed) hai. Par sabse bada value right endpoint par hai, jahan slope 0 nahi hai.</figcaption>
</figure>

Dhyan do: absolute (sabse bada) maximum ek **endpoint** par aaya, jahan $f'\ne0$ hai. Isliye closed interval par sirf $f'=0$ wale points dekhna kaafi nahi; endpoints bhi check karne padte hain.

Doosri picture: kuch functions "katori" (bowl) jaise hote hain — inhe **convex** kehte hain. Katori me sirf ek ghaati hoti hai, isliye jo bhi local minimum mile wahi global hai. Gradient descent ek ball jaisa hai jo katori me slope ke ulti taraf lurhakti hai.

<figure class="fig">
<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg">
<line x1="15" y1="180" x2="290" y2="180" style="stroke:var(--muted)"/>
<polyline points="25,55 37.5,78.8 50,100 62.5,118.8 75,135 87.5,148.8 100,160 112.5,168.8 125,175 137.5,178.8 150,180 162.5,178.8 175,175 187.5,168.8 200,160 212.5,148.8 225,135 237.5,118.8 250,100 262.5,78.8 275,55" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<line x1="50" y1="100" x2="225" y2="135" style="stroke:var(--bad)" stroke-width="1.8"/>
<circle cx="50" cy="100" r="3.5" style="fill:var(--bad)"/>
<circle cx="225" cy="135" r="3.5" style="fill:var(--bad)"/>
<line x1="165" y1="188" x2="260" y2="112" style="stroke:var(--good)" stroke-width="1.8" stroke-dasharray="6,3"/>
<circle cx="200" cy="160" r="3.5" style="fill:var(--good)"/>
<text x="60" y="88" font-size="11" style="fill:var(--bad)">chord: curve ke upar</text>
<text x="120" y="204" font-size="11" style="fill:var(--good)">tangent: curve ke neeche</text>
<text x="20" y="30" font-size="12" fill="currentColor">convex: y = x²</text>
</svg>
<figcaption>Convex function: do points ko jodne wali chord hamesha curve ke upar, aur har tangent line curve ke neeche rehti hai.</figcaption>
</figure>

Ye do baatein ("chord upar", "tangent neeche") hi convexity ki definition aur sabse kaam ki property hain. Agar curve ulti katori jaisi ho (jaise $-x^2$), to ise **concave** kehte hain.

## Concept step-by-step

### 1. Critical points
Local max/min (ek chhote area me sabse bada/chhota value) sirf in jagah ho sakta hai:
- jahan $f'(x)=0$ (flat tangent), ya
- jahan $f'$ exist nahi karta (kona, jaise $|x|$ ka 0),

aur ye point **domain ke andar** hona chahiye. Inhe **critical points** kehte hain.

Kyun: agar kisi point par $f'(c)>0$ ho, to thoda right jaane se value badhti hai aur left jaane se ghatti hai — to wahan na max ho sakta na min.

Tiny example: $f(x)=x^3-3x^2+4$. $f'=3x^2-6x=3x(x-2)=0$ → $x=0,2$.

Dhyan do: critical point ka matlab "max ya min pakka" nahi; sirf "candidate". $x^3$ me $f'(0)=0$ hai par 0 na max hai na min.

### 2. Second-derivative test
$f''$ batata hai slope badh raha hai ya ghat raha hai.
- $f''(c)>0$: slope badh raha hai (−, 0, +) → ghaati → **local min**.
- $f''(c)<0$: slope ghat raha hai (+, 0, −) → choti → **local max**.
- $f''(c)=0$: test fail (inconclusive). Tab $f'$ ka sign $c$ ke left aur right dekho: $-\to+$ min, $+\to-$ max, sign same → koi extremum nahi.

Upar wale example me $f''=6x-6$. $f''(0)=-6<0$ → max, $f(0)=4$. $f''(2)=6>0$ → min, $f(2)=8-12+4=0$. Local min **value** $=0$, location $x=2$.

$x^4$ at 0: $f'(0)=0$, $f''(0)=0$ → inconclusive. $f'=4x^3$: left me negative, right me positive → **minimum** hai (aur inflection nahi).

Dhyan do: question "value" maange to $f(x^*)$ do, "point" maange to $x^*$. Ye mix karna common galti hai.

### 3. Closed interval $[a,b]$ par absolute max/min
Continuous function ka $[a,b]$ par absolute max aur min **zaroor** hota hai, aur wo ya to critical point par hota hai ya endpoint par. Recipe:
1. Critical points nikalo; jo $[a,b]$ ke bahar hain unhe hata do.
2. $f$ ko bache hue critical points aur dono endpoints par evaluate karo (table banao).
3. Sabse bada = absolute max, sabse chhota = absolute min.

Tiny example: $f(x)=x^3-3x$ on $[0,3]$. $f'=3x^2-3=0$ → $x=\pm1$; $-1$ bahar. Table: $f(0)=0$, $f(1)=-2$, $f(3)=27-9=18$. Abs max $=18$ (at $x=3$), abs min $=-2$ (at $x=1$).

Dhyan do: second-derivative test yahan zaroori nahi; seedha table compare karo. Endpoints bhoolna = galat answer.

### 4. Convexity
Plain words: function **convex** hai agar graph katori jaisa hai — chord upar, tangent neeche. Twice-differentiable function ke liye ye sab equivalent hain:
$$f \text{ convex on } I \iff f''(x)\ge0 \text{ on } I \iff f' \text{ non-decreasing} \iff f(y)\ge f(x)+f'(x)(y-x).$$
Aakhri wala "tangent line neeche hai" ka formula hai: $f(x)+f'(x)(y-x)$ point $x$ par tangent line hai.

Examples:
- $x^2$: $f''=2\ge0$ → convex. $e^x$: $f''=e^x>0$ → convex.
- $-x^2+2x$: $f''=-2$ → concave. $x^3$: $f''=6x$, negative for $x<0$ → poore $\mathbb R$ par convex nahi.
- $|x|$: $f''$ 0 par exist nahi, par chord hamesha upar hai → convex (definition se). Slope $-1$ se $+1$ jump karta hai, yaani $f'$ non-decreasing.

Tiny example (kahan convex): $f(x)=x^4-6x^2$, $f''=12x^2-12=12(x^2-1)\ge0$ ⇔ $|x|\ge1$. To convex on $x\le-1$ ya $x\ge1$.

Dhyan do: convex ⇔ $f''\ge0$ ("katori upar khuli"). Galti se $f''\le0$ solve kar diya to concave region milega.

### 5. Convex function ke do important facts
**(a) Har local minimum global hota hai.** Kyun: maan lo $x$ local min hai par kisi $y$ par $f(y)<f(x)$. $x$ se $y$ tak chord kheencho; chord ke points ki value $f(x)$ se kam hai (kyunki $f(y)<f(x)$). Convex hai to curve chord ke neeche (ya barabar) hai, isliye $x$ ke bilkul paas bhi $f<f(x)$ wale points mil jaayenge — ye local min hone ke khilaf hai. Contradiction.

**(b) Minimiser exist kare, ye zaroori nahi.** $e^x$ convex hai par kabhi minimum nahi leta: value 0 ki taraf jaati hai par 0 kabhi nahi hoti.

Dhyan do: convex + differentiable me $f'(c)=0$ ⇒ $c$ global min (tangent flat hai aur sab kuch tangent ke upar hai).

### 6. Inflection point
Jahan curve katori se ulti katori me (ya ulta) badalta hai, yaani **$f''$ ka sign badalta hai**. Sirf $f''=0$ kaafi nahi.

Example: $f(x)=xe^{-x}$. $f'=(1-x)e^{-x}$, $f''=(x-2)e^{-x}$. $x=2$ par $f''$ negative se positive hota hai → inflection at $x=2$. Saath me $f'(1)=0$, $f''(1)=-e^{-1}<0$ → max, value $1\cdot e^{-1}=\frac1e$.

Counter-example: $x^4$ me $f''(0)=0$ par $f''=12x^2\ge0$ dono taraf → sign change nahi → inflection nahi (ye minimum hai).

Dhyan do: "$f''=0$ ⇒ inflection" bilkul galat shortcut hai.

### 7. Polynomial convex kab hai: discriminant trick
Agar $f''(x)=Ax^2+Bx+C$ (with $A>0$) aaye, to "$f''\ge0$ for all $x$" ⇔ parabola kabhi x-axis ke neeche nahi jaata ⇔ do alag real roots nahi ⇔
$$B^2-4AC\le0.$$
Tiny example: $f=x^4+ax^3+6x^2$, $f''=12x^2+6ax+12$. Condition $36a^2-4\cdot12\cdot12\le0$ → $a^2\le16$ → $|a|\le4$.

Dhyan do: $\le0$ (equal allowed), kyunki ek double root par $f''=0$ hona chalega, sign change nahi hota.

### 8. Mean aur median: sum of distances
- $\sum_i(x-a_i)^2$ minimise karo: derivative $2\sum(x-a_i)=0$ → $x=\frac{\sum a_i}{n}$ = **mean**. ($f''=2n>0$, convex, so global min.)
- $\sum_i|x-a_i|$ minimise karo: $x$ ko thoda right khiskao to jitne points left me hain unki distance badhti hai, jitne right me unki ghatti hai. Balance tab jab dono taraf barabar points → **median**.

Tiny example: $1,5,6$ → squares ke liye $x=4$ (mean); absolute ke liye $x=5$ (median).

Dhyan do: square → mean, absolute → median. Ulta yaad mat karna.

### 9. Optimisation word problems: recipe
1. Kya maximise/minimise karna hai (objective) likho.
2. Constraint use karke ek hi variable me le aao.
3. Feasible domain likho (lengths $\ge0$, cut sheet se bada nahi ho sakta).
4. Differentiate, $=0$, domain ke andar wala root lo, endpoints se compare karo.

Shortcuts (aur kyun):
- $x+y=S$, max $xy$: $x(S-x)$, derivative $S-2x=0$ → $x=y=\frac S2$.
- $x+ky=S$, max $xy$: $y=\frac{S-x}{k}$, $xy=\frac{x(S-x)}{k}$ → $x=\frac S2$, $y=\frac{S}{2k}$. Example: $x+2y=20$ → $x=10$, $y=5$, $xy=50$.
- **Fence 3 sides** (ek side diwar/nadi): perpendicular sides $x$, $x$; parallel side $L-2x$. Area $x(L-2x)$ → $L-4x=0$ → $x=\frac L4$, parallel side $\frac L2$, area $\frac{L^2}{8}$.
- **Box from $a\times a$ sheet**, corners se side $x$ ke square kaato: $V=x(a-2x)^2$. $V'=(a-2x)^2-4x(a-2x)=(a-2x)(a-6x)$. $x=\frac a2$ pe box flat (V=0), to $x=\frac a6$: $V=\frac a6\cdot\left(\frac{2a}{3}\right)^2=\frac{2a^3}{27}$.

Dhyan do: domain check karo; jo root sheet ke size se bada ho, wo infeasible hai.

### 10. Gradient descent (GD)
Jab $f'=0$ ko haath se solve karna mushkil ho (ML me lakhon variables), computer chhote steps leta hai. $f'(x)$ batata hai upar kis taraf jaana hai; neeche jaane ke liye **ulti taraf** chalo:
$$x_{k+1}=x_k-\eta\,f'(x_k).$$
$\eta$ (eta) = **learning rate** = step ka size.

Tiny example: $f=x^2-4x$, $x_0=0$, $\eta=0.1$. $f'(x)=2x-4$, $f'(0)=-4$. $x_1=0-0.1(-4)=0.4$.

**Do variables:** gradient $\nabla f=\left(\frac{\partial f}{\partial x},\frac{\partial f}{\partial y}\right)$ — partial derivative ka matlab hai ek variable ke respect me differentiate karo, doosre ko constant maan ke. Update har coordinate par alag-alag:
$f=x^2+3y^2$: $\nabla f=(2x,6y)$. From $(1,1)$, $\eta=0.1$: $(1-0.2,\ 1-0.6)=(0.8,0.4)$.

**ML loss:** $L(w)=(wx-y)^2$. Chain rule: $L'(w)=2(wx-y)\cdot x$. $(x,y)=(2,4)$, $w_0=0$, $\eta=0.05$: $L'(0)=2(0-4)(2)=-16$, $w_1=0+0.05\cdot16=0.8$.

Dhyan do: GD me **minus** hai. $x+\eta f'$ likha to tum upar chadh rahe ho (gradient ascent).

### 11. Learning rate kitna ho? $f=cx^2$ par analysis
$f'(x)=2cx$, to $x_{k+1}=x_k-\eta\cdot2cx_k=(1-2c\eta)\,x_k$. Har step pe $x$ ek fixed factor $r=1-2c\eta$ se multiply hota hai, isliye $x_k=r^kx_0$.
- $|r|<1$ ⇔ $0<\eta<\frac1c$ → converge to 0 (min).
- $0<r<1$: ek hi taraf se dheere-dheere; $-1<r<0$: zig-zag karte hue converge.
- $r=-1$: hamesha $x_0,-x_0,x_0,\dots$ oscillate.
- $|r|>1$: diverge (badhta jaata hai).

$f=x^2$ ($c=1$): $0<\eta<1$ converge; $\eta=1$ oscillate; $\eta>1$ diverge. $\eta=1.2$: $r=1-2.4=-1.4$ → sign badalte hue diverge.

<figure class="fig">
<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="opt-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--mark)"/></marker></defs>
<line x1="20" y1="170" x2="280" y2="170" style="stroke:var(--muted)"/>
<polyline points="40,24.8 50,50 60,72.8 70,93.2 80,111.2 90,126.8 100,140 110,150.8 120,159.2 130,165.2 140,168.8 150,170 160,168.8 170,165.2 180,159.2 190,150.8 200,140 210,126.8 220,111.2 230,93.2 240,72.8 250,50 260,24.8" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<line x1="250" y1="50" x2="102" y2="139" style="stroke:var(--mark)" stroke-width="1.6" marker-end="url(#opt-arr)"/>
<line x1="100" y1="140" x2="173" y2="161" style="stroke:var(--mark)" stroke-width="1.6" marker-end="url(#opt-arr)"/>
<line x1="175" y1="162.5" x2="139" y2="167.5" style="stroke:var(--mark)" stroke-width="1.6" marker-end="url(#opt-arr)"/>
<circle cx="250" cy="50" r="4" style="fill:var(--bad)"/>
<circle cx="100" cy="140" r="4" style="fill:var(--bad)"/>
<circle cx="175" cy="162.5" r="4" style="fill:var(--bad)"/>
<text x="255" y="45" font-size="11" fill="currentColor">x₀=2</text>
<text x="62" y="135" font-size="11" fill="currentColor">x₁=−1</text>
<text x="180" y="155" font-size="11" fill="currentColor">x₂=0.5</text>
<text x="25" y="192" font-size="11" fill="currentColor">η = 0.75: har step x × (−0.5)</text>
</svg>
<figcaption>Gradient descent on x² with η = 0.75. Factor r = 1 − 2(0.75) = −0.5, isliye point minimum ke dono taraf jump karta hai par har baar aadha paas aata hai.</figcaption>
</figure>

Dhyan do: convex function par bhi GD tabhi converge karta hai jab $\eta$ chhota ho. "Convex hai to GD converge" — galat.

## Solved examples

**Example 1 (NAT, easy):** $f(x)=x^3-6x^2+9x+1$ ka local maximum **value** kya hai?

**Soch:** Polynomial, local extremum → $f'=0$, phir $f''$ se classify.

**Solution:**
1. $f'=3x^2-12x+9=3(x^2-4x+3)=3(x-1)(x-3)$ → $x=1,3$.
2. $f''=6x-12$. $f''(1)=-6<0$ → max. $f''(3)=6>0$ → min.
3. $f(1)=1-6+9+1=$ **5**.

**Galti kahan hoti hai:** Location $x=1$ likh dena (value maangi thi). Ya $x=3$ ko max maan ke $f(3)=27-54+27+1=1$ likhna.

**Example 2 (MCQ, medium):** $f(x)=x^3-12x$ on $[-1,5]$. Absolute max aur min:
(A) max 16, min −16 (B) max 65, min −16 (C) max 11, min −16 (D) max 65, min 11

**Soch:** Closed interval → critical points (sirf andar wale) + endpoints ki table.

**Solution:**
1. $f'=3x^2-12=0$ → $x=\pm2$. $x=-2\notin[-1,5]$ → hatao.
2. Table: $f(-1)=-1+12=11$; $f(2)=8-24=-16$; $f(5)=125-60=65$.
3. Max $65$ (at $x=5$), min $-16$ (at $x=2$). **Answer (B).**

**Galti kahan hoti hai:** (A): $x=-2$ (domain ke bahar) ko use kiya, $f(-2)=16$ ko max maana, aur endpoint 5 bhool gaye. (C): endpoint $x=5$ check nahi kiya.

**Example 3 (MSQ, medium):** $f(x)=x^4-4x^3$. Kaun se statements sahi hain?
(A) $f$ convex hai $[2,\infty)$ par (B) $x=0$ aur $x=2$ dono inflection points hain (C) $f$ concave hai $[0,2]$ par (D) $x=0$ local maximum hai

**Soch:** Convexity/inflection → $f''$ ka sign; extremum → $f'$ ka sign change.

**Solution:**
1. $f'=4x^3-12x^2=4x^2(x-3)$. $f''=12x^2-24x=12x(x-2)$.
2. $f''$ sign: $x<0$: $+$; $0<x<2$: $-$; $x>2$: $+$. To convex on $(-\infty,0]$ aur $[2,\infty)$, concave on $[0,2]$. (A) ✓, (C) ✓.
3. Sign $0$ aur $2$ dono par badalta hai → (B) ✓.
4. $f'=4x^2(x-3)$: $x=0$ ke dono taraf $x^2>0$, $(x-3)<0$ → $f'<0$ dono taraf → koi extremum nahi. (D) ✗. (Asli minimum $x=3$ par, $f(3)=81-108=-27$.)
5. **Answer: (A), (B), (C).**

**Galti kahan hoti hai:** $f'(0)=0$ dekh kar 0 ko max/min maan lena. $f''(0)=0$ yahan test fail hai; $f'$ ka sign change dekhna padta hai.

**Example 4 (NAT, medium):** $f(x)=x^4+ax^3+24x^2$ poore $\mathbb R$ par convex hai exactly jab $|a|\le c$. $c$ = ?

**Soch:** "Convex for all $x$" + $f''$ quadratic → discriminant $\le0$.

**Solution:**
1. $f''=12x^2+6ax+48$.
2. $\ge0$ for all $x$ ⇔ $(6a)^2-4(12)(48)\le0$ ⇔ $36a^2\le2304$ ⇔ $a^2\le64$.
3. $|a|\le8$, so $c=$ **8**.

**Galti kahan hoti hai:** $f'$ ka discriminant le lena (convexity $f''$ se hai). Ya $4AC$ me $4$ bhoolna: $36a^2\le576$ → $c=4$.

**Example 5 (NAT, hard):** $8\times5$ cm ki sheet ke chaaron corners se side $x$ ke square kaat ke open box banaya. Maximum volume (cm³)?

**Soch:** Word problem → $V(x)$ ek variable me, domain $0<x<2.5$ (chhoti side 5 hai).

**Solution:**
1. Base $(8-2x)\times(5-2x)$, height $x$: $V=x(8-2x)(5-2x)=4x^3-26x^2+40x$.
2. $V'=12x^2-52x+40=4(3x^2-13x+10)=4(3x-10)(x-1)$ → $x=1$ ya $x=\frac{10}{3}$.
3. $\frac{10}3\approx3.33>2.5$ → infeasible. $x=1$ lo; endpoints par $V=0$.
4. $V(1)=1\cdot6\cdot3=$ **18**.

**Galti kahan hoti hai:** Square-sheet shortcut $x=\frac a6$ lagana (ye sirf square sheet ke liye hai). Ya $x=\frac{10}3$ daalna → $V$ negative ($\approx-7.41$), jo physical nahi.

**Example 6 (NAT, hard):** $f(x,y)=(x-1)^2+2y^2$ par gradient descent, start $(0,1)$, $\eta=0.25$. Do steps ke baad $f(x_2,y_2)$ = ?

**Soch:** Do-variable GD → partial derivatives, har coordinate alag update, minus sign.

**Solution:**
1. $\nabla f=\big(2(x-1),\ 4y\big)$.
2. Step 1 at $(0,1)$: gradient $(-2,4)$. New point $(0-0.25(-2),\ 1-0.25\cdot4)=(0.5,\ 0)$.
3. Step 2 at $(0.5,0)$: gradient $(-1,0)$. New point $(0.5+0.25,\ 0)=(0.75,\ 0)$.
4. $f=(0.75-1)^2+0=0.0625$. **Answer: 0.0625.**

**Galti kahan hoti hai:** Plus sign use karna: step 1 → $(-0.5,2)$, upar chadh gaye. Ya $(x-1)^2$ ka derivative $2x$ likhna (chain me $-1$ shift bhoolna).

## Confusions clear karo

**Q:** Local aur global (absolute) maximum me kya farak hai?
**A:** Local max = aas-paas ke points se bada (ek choti). Global max = poore domain me sabse bada. Ek function ki kai chotiyan ho sakti hain; global sirf sabse oonchi wali hai — aur closed interval par wo endpoint bhi ho sakta hai.

**Q:** $f''(c)=0$ aaya, ab kya?
**A:** Second-derivative test kuch nahi bata sakta. $f'$ ka sign $c$ ke thoda left aur thoda right dekho. $x^4$: $-\to+$ → min. $x^3$: $+\to+$ → kuch nahi (ye inflection hai, kyunki $f''=6x$ sign badalta hai).

**Q:** Convex aur concave yaad kaise rakhun?
**A:** Convex = katori seedhi, paani ruk jaata hai, $f''\ge0$, chord upar. Concave = ulti katori, $f''\le0$. $-f$ concave hai agar $f$ convex hai.

**Q:** Convex function ka minimum hamesha hota hai?
**A:** Nahi. $e^x$ convex hai par minimum nahi. Lekin agar koi local min mil gaya, to wo pakka global hai.

**Q:** $|x|$ convex hai, par $f''$ to exist hi nahi karta?
**A:** $f''\ge0$ wala test sirf twice-differentiable functions ke liye hai. Asli definition chord wali hai: $|x|$ ki har chord graph ke upar hai, isliye convex.

**Q:** Learning rate bada rakhne se jaldi converge hoga na?
**A:** Ek had tak. $f=cx^2$ par $\eta<\frac1c$ hona chahiye. $\eta=\frac1{2c}$ par ek hi step me minimum (r = 0). Usse bada hua to zig-zag, aur $\eta\ge\frac1c$ par converge nahi hota.

**Q:** Word problem me answer kaunsa do: $x$ ya area?
**A:** Question jo maange. "Maximum area" → value. "Kitna kaato" → $x$. Last line dobara padho.

## Khud try karo

**1.** $(x-2)^2+(x-3)^2+(x-10)^2$ ko minimise karne wala $x$, aur $|x-2|+|x-3|+|x-10|$ ko minimise karne wala $x$?

<details><summary>Answer dekho</summary>

Squares → mean $=\frac{2+3+10}{3}=5$. Absolute → median $=3$.

</details>

**2.** $f(x)=3x^2$ par gradient descent kis range ke $\eta$ ke liye converge karta hai? $\eta=0.25$ aur $x_0=4$ ho to $x_2$?

<details><summary>Answer dekho</summary>

$c=3$: $x_{k+1}=(1-6\eta)x_k$. Converge ⇔ $|1-6\eta|<1$ ⇔ $0<\eta<\frac13$.
$\eta=0.25$: $r=1-1.5=-0.5$. $x_1=-2$, $x_2=1$. **$x_2=1$.**

</details>

**3.** Squared loss $L(w)=(wx-y)^2$, sample $(x,y)=(3,6)$, $w_0=1$, $\eta=0.05$. $w_1$ = ?

<details><summary>Answer dekho</summary>

$L'(w)=2(wx-y)x=2(3-6)(3)=-18$. $w_1=1-0.05(-18)=1+0.9=$ **1.9**.

</details>

**4.** 600 m fencing se nadi ke kinare rectangular khet (nadi wali side par fence nahi). Max area (m²)?

<details><summary>Answer dekho</summary>

Perpendicular sides $x$, parallel side $600-2x$. $A=x(600-2x)$, $A'=600-4x=0$ → $x=150$, parallel side $300$. $A=150\cdot300=$ **45000** ($=\frac{L^2}{8}$).

</details>

**5. (MCQ)** $f(x)=x^2e^{-x}$ ka $[0,\infty)$ par global maximum value?
(A) $\frac{4}{e^2}$ (B) $\frac1e$ (C) $0$ (D) koi max nahi

<details><summary>Answer dekho</summary>

$f'=(2x-x^2)e^{-x}=x(2-x)e^{-x}$ → $x=0,2$. $f(0)=0$; $f(2)=4e^{-2}\approx0.541$; $x\to\infty$ par $f\to0$. Global max $=\frac4{e^2}$. **(A).** ($\frac1e$ to $xe^{-x}$ ka max hai.)

</details>

## Ek page me
- Critical point: $f'=0$ ya $f'$ undefined, **domain ke andar**.
- $f''>0$ min, $f''<0$ max, $f''=0$ → $f'$ ka sign change dekho ($x^4$ min hai).
- Closed $[a,b]$: critical points + endpoints ki table; sabse bada/chhota lo.
- "Value" maanga to $f(x^*)$, "point" maanga to $x^*$.
- Convex ⇔ $f''\ge0$ ⇔ $f'$ non-decreasing ⇔ $f(y)\ge f(x)+f'(x)(y-x)$ (tangent neeche, chord upar).
- Convex: local min = global min; par min exist na bhi kare ($e^x$).
- Inflection = $f''$ ka **sign change**, sirf $f''=0$ nahi.
- $Ax^2+Bx+C\ge0\ \forall x$ ($A>0$) ⇔ $B^2-4AC\le0$.
- $\sum(x-a_i)^2$ → mean; $\sum|x-a_i|$ → median.
- Shortcuts: $x+ky=S$ → $x=\frac S2$; fence 3 sides → area $\frac{L^2}8$; box $a\times a$ → $x=\frac a6$, $V=\frac{2a^3}{27}$.
- GD: $x\leftarrow x-\eta f'(x)$; $(wx-y)^2$ ka derivative $2(wx-y)x$.
- $cx^2$ par $x_{k+1}=(1-2c\eta)x_k$; converge ⇔ $0<\eta<\frac1c$ ($x^2$: $\eta<1$, $\eta=1$ oscillate, $\eta>1$ diverge).

Revision ke liye **Short note** tab dekho.
