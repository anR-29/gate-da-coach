# Limits, continuity and composition

> **Time:** ~35 min · **Pehle aana chahiye:** Class 12 functions, basic derivatives ($e^x$, $\sin x$, $\ln x$), $|x|$ ka matlab · **Day:** 22

## Ye topic kyun?
Limit poochta hai: "jab $x$ kisi point ke *paas* jaata hai, $f(x)$ kis value ke paas jaata hai?" — chahe us point par function defined ho ya na ho. Derivative, gradient descent, continuity — calculus ka sab kuch isi par khada hai. GATE DA me 1–2 marks ke sawal aate hain: L'Hôpital / standard limits se value nikalo, left aur right limit compare karo, piecewise function ko continuous banane ke liye constant nikalo, $1^\infty$ form, aur $f(g(x))$ ka limit.

## Picture se samjho

Ek point $x=a$ par function teen tarah se behave kar sakta hai:

<figure class="fig">
<svg viewBox="0 0 330 150" xmlns="http://www.w3.org/2000/svg">
<line x1="10" y1="120" x2="100" y2="120" style="stroke:var(--muted)" stroke-width="1"/>
<line x1="120" y1="120" x2="210" y2="120" style="stroke:var(--muted)" stroke-width="1"/>
<line x1="230" y1="120" x2="325" y2="120" style="stroke:var(--muted)" stroke-width="1"/>
<line x1="55" y1="120" x2="55" y2="20" style="stroke:var(--muted)" stroke-dasharray="3 3" stroke-width="1"/>
<line x1="170" y1="120" x2="170" y2="20" style="stroke:var(--muted)" stroke-dasharray="3 3" stroke-width="1"/>
<line x1="280" y1="120" x2="280" y2="20" style="stroke:var(--muted)" stroke-dasharray="3 3" stroke-width="1"/>
<path d="M 15 110 Q 55 30 95 60" style="fill:none;stroke:var(--good)" stroke-width="2"/>
<circle cx="55" cy="57.5" r="3.5" style="fill:var(--good)"/>
<line x1="125" y1="110" x2="215" y2="40" style="stroke:var(--info)" stroke-width="2"/>
<circle cx="170" cy="75" r="4" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<circle cx="170" cy="40" r="3.5" style="fill:var(--bad)"/>
<line x1="235" y1="100" x2="280" y2="70" style="stroke:var(--mark)" stroke-width="2"/>
<circle cx="280" cy="70" r="4" style="fill:none;stroke:var(--mark)" stroke-width="2"/>
<line x1="280" y1="105" x2="322" y2="88" style="stroke:var(--mark)" stroke-width="2"/>
<circle cx="280" cy="105" r="3.5" style="fill:var(--mark)"/>
<text x="55" y="135" font-size="10" text-anchor="middle" fill="currentColor">continuous</text>
<text x="55" y="147" font-size="9" text-anchor="middle" fill="currentColor">L = R = f(a)</text>
<text x="170" y="135" font-size="10" text-anchor="middle" fill="currentColor">hole (removable)</text>
<text x="170" y="147" font-size="9" text-anchor="middle" fill="currentColor">L = R ≠ f(a)</text>
<text x="280" y="135" font-size="10" text-anchor="middle" fill="currentColor">jump</text>
<text x="280" y="147" font-size="9" text-anchor="middle" fill="currentColor">L ≠ R, limit nahi</text>
</svg>
<figcaption>Khaali circle = graph wahan tak aata hai par us point par value nahi; bhara dot = f(a) ki asli value. L = left limit, R = right limit.</figcaption>
</figure>

Dhyan do: beech wale panel me curve dono taraf se ek hi height (khaali circle) ki taraf jaata hai, to **limit exist karta hai** — bhale hi $f(a)$ (lal dot) kahin aur baitha ho. Limit ko $f(a)$ se koi matlab nahi. Teesre panel me left se aate ho to ek height, right se aate ho to doosri — limit exist nahi karta. Continuous sirf pehla hai, jahan teeno cheezein (left, right, $f(a)$) same hain.

## Concept step-by-step

### 1. Limit ka matlab
**Idea:** $\lim_{x\to a}f(x)=L$ ka matlab: $x$ ko $a$ ke jitna paas chaho le jao (par $x\ne a$), $f(x)$ utna hi $L$ ke paas aayega.

**Example:** $f(x)=\frac{x^2-4}{x-2}$. $x=2$ par $\frac00$ — defined nahi. Lekin $x\ne2$ ke liye $\frac{(x-2)(x+2)}{x-2}=x+2$. To $\lim_{x\to2}f(x)=4$. ($x=1.99$ par $3.99$, $x=2.01$ par $4.01$.)

**Dhyan do:** $\frac00$ ka matlab "answer 0" ya "answer exist nahi karta" nahi hai. Ye *indeterminate form* hai — aur kaam karna padega (factor, L'Hôpital, Taylor).

### 2. One-sided limits
**Idea:** $x\to a^-$ = left se (chhote values se) aana; $x\to a^+$ = right se.
$$\lim_{x\to a}f(x)\text{ exists}\iff\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x).$$

**Example 1:** $f(x)=\frac{|x-3|}{x-3}$. $x>3$ par $|x-3|=x-3$, $f=1$. $x<3$ par $|x-3|=-(x-3)$, $f=-1$. Left $-1$, right $1$ → limit exist nahi karta.

**Example 2 (floor):** $\lfloor x\rfloor$ = $x$ se chhota ya barabar sabse bada integer. $\lfloor2.7\rfloor=2$, $\lfloor-1.3\rfloor=-2$.

<figure class="fig">
<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="170" x2="300" y2="170" style="stroke:var(--muted)" stroke-width="1"/>
<line x1="30" y1="185" x2="30" y2="20" style="stroke:var(--muted)" stroke-width="1"/>
<line x1="30" y1="170" x2="90" y2="170" style="stroke:var(--info)" stroke-width="3"/>
<circle cx="30" cy="170" r="4" style="fill:var(--info)"/>
<circle cx="90" cy="170" r="4" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<line x1="90" y1="135" x2="150" y2="135" style="stroke:var(--info)" stroke-width="3"/>
<circle cx="90" cy="135" r="4" style="fill:var(--info)"/>
<circle cx="150" cy="135" r="4" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<line x1="150" y1="100" x2="210" y2="100" style="stroke:var(--info)" stroke-width="3"/>
<circle cx="150" cy="100" r="4" style="fill:var(--info)"/>
<circle cx="210" cy="100" r="4" style="fill:none;stroke:var(--bad)" stroke-width="2"/>
<line x1="210" y1="65" x2="270" y2="65" style="stroke:var(--info)" stroke-width="3"/>
<circle cx="210" cy="65" r="4" style="fill:var(--good)"/>
<circle cx="270" cy="65" r="4" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<text x="30" y="190" font-size="11" text-anchor="middle" fill="currentColor">0</text>
<text x="90" y="190" font-size="11" text-anchor="middle" fill="currentColor">1</text>
<text x="150" y="190" font-size="11" text-anchor="middle" fill="currentColor">2</text>
<text x="210" y="190" font-size="11" text-anchor="middle" fill="currentColor">3</text>
<text x="270" y="190" font-size="11" text-anchor="middle" fill="currentColor">4</text>
<text x="150" y="88" font-size="11" fill="currentColor">x → 3⁻ : 2</text>
<text x="218" y="52" font-size="11" fill="currentColor">x → 3⁺ : 3 = f(3)</text>
<text x="40" y="35" font-size="12" fill="currentColor">y = ⌊x⌋</text>
</svg>
<figcaption>Floor function ki seedhiyaan: har integer n par left limit n − 1, right limit n (aur value bhi n).</figcaption>
</figure>

Integer $n$ par: left limit $n-1$, right limit $n$, $\lfloor n\rfloor=n$. To har integer par limit exist nahi karta; function right-continuous hai.

**Example 3:** $e^{1/x}$ at $0$: $x\to0^+$ par $1/x\to+\infty$, $e^{1/x}\to\infty$. $x\to0^-$ par $1/x\to-\infty$, $e^{1/x}\to0$. Left $0$, right $\infty$ — limit nahi.

**Dhyan do:** $|x-a|$, $\lfloor x\rfloor$, $\sqrt{(\ldots)^2}$, $e^{1/x}$, piecewise definitions — inhe dekhte hi dono side alag-alag nikalo.

### 3. Continuity aur constant nikalna
**Definition:** $f$ continuous at $a$ $\iff\lim_{x\to a^-}f=\lim_{x\to a^+}f=f(a)$. Teen cheezein ek line me likho aur barabar karo.

**Example:** $f(x)=\begin{cases}ax+1,&x<1\\3,&x=1\\x^2+b,&x>1\end{cases}$ continuous at $1$.
1. Left: $a+1$. Value: $3$. Right: $1+b$.
2. $a+1=3\Rightarrow a=2$; $1+b=3\Rightarrow b=2$.

Agar function ke kai break points hon (jaise $x=1$ aur $x=2$), to har point par ek-ek equation banao aur saath me solve karo.

**Dhyan do:** sirf ek side match karke ruk jaana galat. Aur "$\le$" wali side par value bhi wahi formula deta hai — dhyan se dekho $f(a)$ kis piece se aata hai.

### 4. Algebra se $0/0$ hatana
- **Factor aur cancel:** $\frac{x^2-9}{x-3}=x+3\to6$ at $x=3$.
- **Rationalize (conjugate se multiply):** $\lim_{x\to0}\frac{\sqrt{x+4}-2}{x}=\lim\frac{(x+4)-4}{x(\sqrt{x+4}+2)}=\lim\frac1{\sqrt{x+4}+2}=\frac14$.

**Dhyan do:** cancel tabhi valid hai jab $x\ne a$ — aur limit me $x\ne a$ hi hota hai, isliye chalta hai.

### 5. Standard limits ($x\to0$)
| Limit | Value | Kyun |
|---|---|---|
| $\frac{\sin x}{x}$ | $1$ | chhote angle par $\sin x\approx x$ |
| $\frac{\sin ax}{bx}$, $\frac{\tan ax}{bx}$ | $\frac ab$ | $\sin ax\approx ax$, $\tan ax\approx ax$ |
| $\frac{e^{ax}-1}{x}$ | $a$ | $e^{ax}\approx1+ax$ |
| $\frac{a^x-1}{x}$ | $\ln a$ | $a^x=e^{x\ln a}$, upar wala with "$a$" $=\ln a$ |
| $\frac{\ln(1+ax)}{x}$ | $a$ | $\ln(1+u)\approx u$ |
| $\frac{1-\cos ax}{x^2}$ | $\frac{a^2}2$ | $1-\cos ax=2\sin^2\frac{ax}2\approx2\cdot\frac{a^2x^2}4$ |
| $\frac{\ln x}{x}$, $x\to\infty$ | $0$ | $\ln x$ bahut dheere badhta hai |

**Example:** $\lim_{x\to0}\frac{\sin3x}{x}=3$. $\lim_{x\to0}\frac{\sin5x}{\tan2x}=\frac{5x}{2x}=\frac52$.

**Dhyan do:** scale factor mat giraao: $\frac{\sin3x}{x}\to3$, $1$ nahi. $\frac{\sin3x}{3x}\to1$ hota hai.

### 6. L'Hôpital's rule
**Rule:** agar $x\to a$ par form $\frac00$ ya $\frac\infty\infty$ hai, to
$$\lim\frac{f(x)}{g(x)}=\lim\frac{f'(x)}{g'(x)}$$
(right side exist kare to). Upar aur neeche ko **alag-alag** differentiate karo — quotient rule nahi.

**Kyun (idea):** $a$ ke paas $f(x)\approx f(a)+f'(a)(x-a)=f'(a)(x-a)$ (kyunki $f(a)=0$), same $g$ ke liye. Ratio $\frac{f'(a)(x-a)}{g'(a)(x-a)}=\frac{f'(a)}{g'(a)}$.

**Example:** $\lim_{x\to0}\frac{e^x-1-x}{x^2}$.
1. $x=0$: $\frac{1-1-0}{0}=\frac00$. ✓ L'Hôpital.
2. $\frac{e^x-1}{2x}$ — phir $\frac00$, dobara.
3. $\frac{e^x}{2}\to\frac12$.

**Dhyan do:** har step ke baad form check karo. Agar form $0/0$ nahi hai to L'Hôpital mat lagao: $\lim_{x\to0}\frac{x+1}{x+2}=\frac12$, par galti se derivative lo to $\frac11=1$ — galat.

### 7. Taylor substitution (aksar fastest)
$x\to0$ ke paas:
$$e^u=1+u+\tfrac{u^2}{2}+\tfrac{u^3}{6}+\cdots,\quad\sin u=u-\tfrac{u^3}{6}+\cdots,\quad\cos u=1-\tfrac{u^2}{2}+\cdots,\quad\ln(1+u)=u-\tfrac{u^2}{2}+\cdots$$
Numerator aur denominator me pehla non-zero term rakho, baaki chhod do.

**Example:** $\lim_{x\to0}\frac{x-\sin x}{x^3}$: $x-\sin x=x-(x-\frac{x^3}6)=\frac{x^3}6$. Limit $=\frac16$. (L'Hôpital se teen baar differentiate karna padta.)

**Dhyan do:** jitni power denominator me hai, numerator me utni power tak terms rakho. $e^{3x}-1-3x$ me $e^{3x}=1+3x+\frac{9x^2}2+\cdots$, to ye $\frac92x^2$ hai.

### 8. $1^\infty$ form
**Idea:** base $\to1$, exponent $\to\infty$. Answer $1$ nahi hota! $f^g=e^{g\ln f}$, aur $f\to1$ par $\ln f\approx f-1$. To
$$\lim f^g=e^{\lim(f-1)\,g}.$$
Special case: $\left(1+\frac ax\right)^{bx}\to e^{ab}$ as $x\to\infty$ (kyunki $(f-1)g=\frac ax\cdot bx=ab$).

**Example:** $\lim_{x\to0}(1+2x)^{1/x}$: $(f-1)g=2x\cdot\frac1x=2$, answer $e^2\approx7.39$. Aur $\lim_{x\to0}(\cos x)^{1/x^2}$: $(\cos x-1)\cdot\frac1{x^2}\to-\frac12$, answer $e^{-1/2}\approx0.61$.

**Dhyan do:** "$1$ ki koi bhi power $1$" sirf tab sach hai jab base *exactly* $1$ ho. Yahan base $1$ ke paas hai, aur exponent bahut bada — dono ki takkar se $e^{(\ldots)}$ aata hai.

### 9. $\sqrt{u^2}=|u|$
Square root hamesha non-negative deta hai. $\sqrt{\sin^2x}=|\sin x|$, $\sin x$ nahi.
Useful identity: $1-\cos2x=2\sin^2x$, to $\sqrt{1-\cos2x}=\sqrt2\,|\sin x|$.

**Example:** $\lim_{x\to0^+}\frac{x}{\sqrt{1-\cos2x}}=\lim\frac{x}{\sqrt2\sin x}=\frac1{\sqrt2}\approx0.71$. Left side ($x<0$): $|\sin x|=-\sin x$, limit $-\frac1{\sqrt2}$. Dono alag → two-sided limit exist nahi karta.

**Dhyan do:** jahan bhi $\sqrt{(\cdot)^2}$ ya $|\cdot|$ ho, $0$ ke left aur right ka sign alag likho.

### 10. Composition aur uska limit
**Composition:** $(f\circ g)(x)=f(g(x))$ — pehle andar wala $g$, phir $f$.
Example: $f(x)=x^2+1$, $g(x)=2x-3$: $(f\circ g)(2)=f(1)=2$, jabki $(g\circ f)(2)=g(5)=7$. Order matter karta hai.

**Limit rule:** agar $g(x)\to b$ aur $f$ $b$ par continuous hai, to $f(g(x))\to f(b)$ — limit ko andar le ja sakte ho.
Example: $\lim_{x\to0}e^{\sin3x/x}=e^{3}$ (kyunki $e^u$ continuous hai).

**Agar $f$ $b$ par continuous nahi:** dekho $g$ $b$ ke paas *kaise* aata hai — kis side se, ya exactly $b$ ke barabar?
Example: $f=\lfloor\cdot\rfloor$, $g(x)=1-x^2$. $x\to0$ par $g\to1$ lekin hamesha $1$ se *neeche* se ($1-x^2<1$). To $\lfloor g(x)\rfloor=0$ paas me, limit $0$. Lekin $f(\lim g)=\lfloor1\rfloor=1$. Dono alag!

**Dhyan do:** $\lim f(g(x))=f(\lim g(x))$ blindly mat lagao jab $f$ me jump ho (floor, sgn, piecewise).

## Solved examples

**Example 1 (MCQ, easy):** $\displaystyle\lim_{x\to0}\frac{e^{4x}-1}{\sin2x}$ barabar hai:
(A) $1$ (B) $2$ (C) $4$ (D) $\frac12$

**Soch:** $\frac00$, aur dono standard forms: $e^{ax}-1\approx ax$, $\sin bx\approx bx$.

**Solution:**
1. $e^{4x}-1\approx4x$, $\sin2x\approx2x$.
2. Ratio $\frac{4x}{2x}=2$.
3. L'Hôpital se check: $\frac{4e^{4x}}{2\cos2x}\to\frac42=2$. Answer **(B)**.

**Galti kahan hoti hai:** dono standard limits ko "1" maan lena → (A). Ya sirf numerator ka factor $4$ lena → (C).

**Example 2 (NAT, easy-medium):** $f(x)=\begin{cases}\dfrac{1-\cos4x}{x^2},&x<0\\a,&x=0\\b+3x,&x>0\end{cases}$ $x=0$ par continuous hai. $a+b$ nikalo.

**Soch:** continuity → left $=f(0)=$ right.

**Solution:**
1. Left: $\frac{1-\cos4x}{x^2}\to\frac{4^2}{2}=8$.
2. Right: $b+0=b$.
3. $8=a=b$, to $a=8$, $b=8$, $a+b=16$.

**Galti kahan hoti hai:** $\frac{1-\cos4x}{x^2}\to\frac42=2$ (square bhoolna) ya $\to\frac12$ (scale factor girana). Phir $a+b=4$ ya $1$.

**Example 3 (MSQ, medium):** $g(x)=\dfrac{\sin x}{\sqrt{1-\cos2x}}$ ($x\ne0$). Kaunse sahi?
(A) $\lim_{x\to0^+}g(x)=\frac1{\sqrt2}$
(B) $\lim_{x\to0^-}g(x)=\frac1{\sqrt2}$
(C) $\lim_{x\to0}g(x)$ exist nahi karta
(D) $\lim_{x\to0}|g(x)|=\frac1{\sqrt2}$

**Soch:** $\sqrt{1-\cos2x}=\sqrt2|\sin x|$ — modulus aaya, to sides alag.

**Solution:**
1. $g(x)=\frac{\sin x}{\sqrt2|\sin x|}$.
2. $x\to0^+$: $\sin x>0$, $g=\frac1{\sqrt2}$. (A) ✓
3. $x\to0^-$: $\sin x<0$, $g=-\frac1{\sqrt2}$. (B) ✗
4. Left ≠ right, (C) ✓.
5. $|g|=\frac1{\sqrt2}$ dono side, (D) ✓.

Answer **(A), (C), (D)**.

**Galti kahan hoti hai:** $\sqrt{2\sin^2x}=\sqrt2\sin x$ likh dena; tab $g=\frac1{\sqrt2}$ har jagah lagta hai aur (B) tick ho jaata hai, (C) chhoot jaata hai.

**Example 4 (NAT, medium):** $\displaystyle\lim_{x\to0}\frac{e^{2x}-1-2x}{1-\cos x}$ nikalo.

**Soch:** $\frac00$; numerator aur denominator dono second order — Taylor sabse saaf.

**Solution:**
1. $e^{2x}=1+2x+\frac{(2x)^2}{2}+\cdots=1+2x+2x^2+\cdots$, to numerator $\approx2x^2$.
2. $1-\cos x\approx\frac{x^2}2$.
3. Ratio $\frac{2x^2}{x^2/2}=4$.
4. L'Hôpital se: $\frac{2e^{2x}-2}{\sin x}$ (phir $\frac00$) $\to\frac{4e^{2x}}{\cos x}\to4$. ✓

**Galti kahan hoti hai:** pehle L'Hôpital ke baad hi $x=0$ daal dena: $\frac{0}{0}$ ko "0" maan lena. Ya $e^{2x}$ ke expansion me $\frac{(2x)^2}{2}$ ki jagah $\frac{2x^2}{2}=x^2$ likhna → answer $2$.

**Example 5 (NAT, medium-hard):** $\displaystyle\lim_{x\to\infty}\left(\frac{x+3}{x-1}\right)^{x}$ (2 decimal tak).

**Soch:** base $\to1$, exponent $\to\infty$: $1^\infty$.

**Solution:**
1. $f-1=\frac{x+3}{x-1}-1=\frac{4}{x-1}$.
2. $(f-1)g=\frac{4x}{x-1}\to4$.
3. Answer $e^4\approx54.60$.

**Galti kahan hoti hai:** "base $\to1$, to answer $1$". Ya $f-1$ ko $\frac3x$ (sirf numerator dekhkar) lena → $e^3\approx20.09$.

**Example 6 (MCQ, hard):** $h(x)=\lfloor\cos x\rfloor$. $x=0$ par kaunsa sahi hai?
(A) $\lim_{x\to0}h(x)=1$ aur $h$ continuous hai
(B) $\lim_{x\to0}h(x)=0$, $h(0)=1$, $h$ continuous nahi
(C) $\lim_{x\to0}h(x)$ exist nahi karta
(D) $\lim_{x\to0}h(x)=0$ aur $h$ continuous hai

**Soch:** outer function floor $1$ par jump karta hai, to dekho $\cos x$ $1$ ke paas kaise aata hai.

**Solution:**
1. $x\ne0$ (paas me): $\cos x<1$ aur $\cos x>0$, to $\lfloor\cos x\rfloor=0$. Dono sides se.
2. To $\lim_{x\to0}h=0$.
3. $h(0)=\lfloor1\rfloor=1\ne0$. Continuous nahi (removable — "hole" type).

Answer **(B)**.

**Galti kahan hoti hai:** $\lim\lfloor\cos x\rfloor=\lfloor\lim\cos x\rfloor=\lfloor1\rfloor=1$ — floor $1$ par continuous nahi, isliye limit andar nahi le ja sakte → (A). Ya floor ka jump dekh kar "left ≠ right" → (C); lekin $\cos x$ dono sides se neeche se hi aata hai.

## Confusions clear karo

**Q:** Agar $f(a)$ defined nahi hai, kya limit exist kar sakta hai?
**A:** Haan. $\frac{x^2-4}{x-2}$ at $2$: value nahi, limit $4$. Limit sirf *paas* ka behaviour dekhta hai.

**Q:** Limit exist karna aur continuous hona — farak?
**A:** Limit exist: left = right. Continuous: left = right = $f(a)$. Hole wale case me limit hai, continuity nahi.

**Q:** L'Hôpital kab nahi lagana?
**A:** Jab form $\frac00$ ya $\frac\infty\infty$ nahi hai (jaise $\frac{1}{2}$, $\frac{5}{0}$). Pehle hamesha $x=a$ daal ke form check karo. Aur $\frac{f}{g}$ ka derivative (quotient rule) nahi — $f'$ aur $g'$ alag.

**Q:** $\frac{\sin x}{x}\to1$ me $x$ degrees me ho to?
**A:** Ye result sirf radians me hai. GATE me by default radians.

**Q:** $\lim_{x\to0}\frac{1}{x}$ ka answer $\infty$ hai?
**A:** Nahi — right se $+\infty$, left se $-\infty$, to two-sided limit exist nahi karta. $\frac1{x^2}\to+\infty$ (dono side same) ko "$\infty$ ki taraf jaata hai" bolte hain.

**Q:** $(1+\frac1x)^x$ ka answer $e$ kyun, $1$ kyun nahi?
**A:** Base $1$ ke *paas* hai, exactly $1$ nahi; aur exponent bada hota ja raha hai. $e^{\lim(f-1)g}=e^{\frac1x\cdot x}=e^1$.

**Q:** $f(g(x))$ me pehle kaun lagta hai?
**A:** Andar wala: $g$ pehle, phir $f$. $(f\circ g)(x)=f(g(x))$.

## Khud try karo

**1.** $\displaystyle\lim_{x\to0}\frac{\sqrt{x+9}-3}{x}$

<details><summary>Answer dekho</summary>

Conjugate: $\frac{(x+9)-9}{x(\sqrt{x+9}+3)}=\frac{1}{\sqrt{x+9}+3}\to\frac16\approx0.167$.

</details>

**2.** $\displaystyle\lim_{x\to0}\frac{3^x-1}{x}$ (3 decimal)

<details><summary>Answer dekho</summary>

Standard: $\ln3\approx1.099$.

</details>

**3.** $\lim_{x\to-2^-}\lfloor x\rfloor$ aur $\lim_{x\to-2^+}\lfloor x\rfloor$?

<details><summary>Answer dekho</summary>

Left: $x$ jaise $-2.1$ → $\lfloor x\rfloor=-3$. Right: $-1.9$ → $-2$. Integer $n=-2$ par left $n-1=-3$, right $n=-2$.

</details>

**4.** $f(x)=\begin{cases}kx^2+1,&x\le1\\3x-k,&x>1\end{cases}$ continuous ho, to $k$?

<details><summary>Answer dekho</summary>

Left (aur $f(1)$): $k+1$. Right: $3-k$. $k+1=3-k\Rightarrow k=1$.

</details>

**5.** $\displaystyle\lim_{x\to0}(1+2x)^{3/x}$ (2 decimal)

<details><summary>Answer dekho</summary>

$1^\infty$: $(f-1)g=2x\cdot\frac3x=6$. Answer $e^6\approx403.43$.

</details>

## Ek page me
- Limit exists $\iff$ left limit = right limit; $f(a)$ ka koi role nahi.
- Continuous at $a$ $\iff$ left = right = $f(a)$ — teeno ek line me likho; har break point par equation.
- $\frac00$ indeterminate hai: factor/cancel, rationalize, L'Hôpital ya Taylor.
- L'Hôpital: sirf $\frac00$/$\frac\infty\infty$; $f'$ aur $g'$ alag-alag; har step ke baad form dobara check.
- Standard: $\frac{\sin ax}{bx}\to\frac ab$, $\frac{e^{ax}-1}x\to a$, $\frac{a^x-1}x\to\ln a$, $\frac{\ln(1+ax)}x\to a$, $\frac{1-\cos ax}{x^2}\to\frac{a^2}2$, $\frac{\ln x}x\to0$ ($x\to\infty$).
- Taylor: $e^u=1+u+\frac{u^2}2$, $\sin u=u-\frac{u^3}6$, $\cos u=1-\frac{u^2}2$, $\ln(1+u)=u-\frac{u^2}2$.
- $1^\infty$: $e^{\lim(f-1)g}$; $(1+\frac ax)^{bx}\to e^{ab}$.
- $\sqrt{u^2}=|u|$; $\sqrt{1-\cos2x}=\sqrt2|\sin x|$ — left/right ka sign alag.
- Floor at integer $n$: left $n-1$, right $n$.
- $(f\circ g)(x)=f(g(x))$, andar wala pehle.
- $\lim f(g(x))=f(\lim g)$ sirf jab $f$ wahan continuous ho; warna dekho $g$ kis side se aata hai.

Revision ke liye **Short note** tab dekho.
