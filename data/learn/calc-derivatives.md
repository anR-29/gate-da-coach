# Differentiability, Taylor series and series sums

> **Time:** ~35 min · **Pehle aana chahiye:** limits aur continuity (left limit, right limit), basic derivatives ($x^n$, $e^x$, $\sin x$, $\ln x$) · **Day:** 23

## Ye topic kyun?
Machine learning me har jagah slope (derivative) chahiye: gradient descent, loss minimise karna, ReLU jaise activation. Isliye pehle ye samajhna zaroori hai ki derivative kab exist karta hai, aur ek mushkil function ko simple polynomial (Taylor series) se kaise approximate karte hain. GATE DA me is topic se 1–2 mark ke MCQ/MSQ/NAT aate hain: "kis point par differentiable nahi hai", "piecewise function ke constants nikalo", "$f'''(0)$ nikalo", "Taylor coefficient", aur "infinite series ka sum".

## Picture se samjho
Derivative ka matlab hai **graph ko bahut zoom karo, to wo kitna seedha (straight line jaisa) dikhta hai, aur us line ka slope kya hai**. Agar zoom karne par bhi ek nukila kona (corner) dikhe, to wahan ek slope define hi nahi hota.

<figure class="fig">
<svg viewBox="0 0 400 170" xmlns="http://www.w3.org/2000/svg">
<line x1="10" y1="130" x2="190" y2="130" style="stroke:var(--muted)"/>
<line x1="100" y1="20" x2="100" y2="145" style="stroke:var(--muted)"/>
<polyline points="20,50 100,130 180,50" fill="none" style="stroke:var(--bad)" stroke-width="2.5"/>
<circle cx="100" cy="130" r="4" style="fill:var(--bad)"/>
<text x="110" y="35" font-size="12" fill="currentColor">y = |x|</text>
<text x="18" y="100" font-size="11" fill="currentColor">slope −1</text>
<text x="140" y="100" font-size="11" fill="currentColor">slope +1</text>
<text x="70" y="160" font-size="11" style="fill:var(--bad)">kona: no slope</text>
<line x1="210" y1="90" x2="390" y2="90" style="stroke:var(--muted)"/>
<line x1="300" y1="20" x2="300" y2="165" style="stroke:var(--muted)"/>
<polyline points="220,150 240,123.75 260,105 280,93.75 300,90 320,86.25 340,75 360,56.25 380,30" fill="none" style="stroke:var(--good)" stroke-width="2.5"/>
<line x1="265" y1="90" x2="335" y2="90" style="stroke:var(--mark)" stroke-width="2" stroke-dasharray="5,3"/>
<circle cx="300" cy="90" r="4" style="fill:var(--good)"/>
<text x="225" y="35" font-size="12" fill="currentColor">y = x|x|</text>
<text x="305" y="112" font-size="11" fill="currentColor">smooth, slope 0</text>
</svg>
<figcaption>Left: |x| ka graph 0 par V jaisa kona banata hai. Right: x|x| (x≥0 par x², x&lt;0 par −x²) 0 par chikna hai, tangent horizontal hai.</figcaption>
</figure>

Left graph me 0 ke left side slope $-1$ hai aur right side $+1$. Dono alag hain, isliye 0 par derivative nahi hai, jabki graph tuta nahi hai (continuous hai). Right graph me dono taraf slope 0 ki taraf jaata hai, isliye $x|x|$ ka derivative 0 par exist karta hai aur 0 hai. Yahi poore topic ka pehla idea hai: **continuous hona kaafi nahi, dono taraf ka slope bhi match hona chahiye.**

Doosra idea: koi bhi "achha" (smooth) function, ek point ke paas, ek polynomial jaisa dikhta hai. Pehle ek line se approximate karo, phir parabola se, phir cubic se — har step pe approximation aur achha hota jaata hai.

<figure class="fig">
<svg viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="190" x2="320" y2="190" style="stroke:var(--muted)"/>
<line x1="180" y1="5" x2="180" y2="205" style="stroke:var(--muted)"/>
<text x="183" y="205" font-size="10" fill="currentColor">0</text>
<text x="236" y="205" font-size="10" fill="currentColor">1</text>
<line x1="240" y1="187" x2="240" y2="193" style="stroke:var(--muted)"/>
<polyline points="60,185.9 90,183.3 120,179 150,171.8 180,160 210,140.5 240,108.5 270,55.5 288,8.5" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<line x1="120" y1="190" x2="288" y2="106" style="stroke:var(--bad)" stroke-width="1.8" stroke-dasharray="6,3"/>
<polyline points="60,160 90,171.2 120,175 150,171.2 180,160 210,141.2 240,115 270,81.2 288,57.4" fill="none" style="stroke:var(--good)" stroke-width="1.8" stroke-dasharray="2,2"/>
<circle cx="180" cy="160" r="3.5" fill="currentColor"/>
<text x="228" y="20" font-size="12" style="fill:var(--info)">y = eˣ</text>
<text x="294" y="110" font-size="11" style="fill:var(--bad)">1 + x</text>
<text x="294" y="62" font-size="11" style="fill:var(--good)">1+x+x²/2</text>
</svg>
<figcaption>eˣ (solid) ko x = 0 ke paas line 1 + x aur parabola 1 + x + x²/2 se approximate kiya. 0 ke paas parabola curve se lagbhag chipka hua hai.</figcaption>
</figure>

Dhyan do: teeno curves point $(0,1)$ par milte hain. Line sirf value aur slope match karti hai, isliye thoda door jaate hi alag ho jaati hai. Parabola curvature (doosra derivative) bhi match karta hai, isliye zyada door tak saath chalta hai. Taylor series isi idea ko infinite terms tak le jaati hai.

## Concept step-by-step

### 1. Derivative ka matlab aur one-sided derivatives
Derivative = ek point par slope. Point $a$ ke paas $h$ jitna aage jao, function kitna badla, uska ratio lo, aur $h\to0$ karo:
$$f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}.$$
Ye limit tabhi exist karti hai jab **left** ($h\to0^-$) aur **right** ($h\to0^+$) dono limits same hon. Inhe one-sided derivatives kehte hain: $f'(a^-)$ (left derivative) aur $f'(a^+)$ (right derivative).

Example: $f(x)=|x|$, $a=0$. Right side: $\frac{|h|-0}{h}=\frac{h}{h}=1$. Left side ($h<0$, to $|h|=-h$): $\frac{-h}{h}=-1$. $f'(0^+)=1\ne-1=f'(0^-)$, isliye $|x|$ 0 par differentiable nahi.

Dhyan do: one-sided derivative ka matlab hai "us side ka slope", na ki "us side ka function value".

### 2. Differentiable ⇒ continuous, par ulta nahi
Agar $f'(a)$ exist karta hai, to
$$f(a+h)-f(a)=\frac{f(a+h)-f(a)}{h}\cdot h\;\to\; f'(a)\cdot 0=0,$$
yaani $f(a+h)\to f(a)$: function continuous hai. Lekin ulta galat hai: $|x|$ aur ReLU $=\max(0,x)$ dono 0 par continuous hain (graph tuta nahi), par kona hai, isliye differentiable nahi.

ReLU: $x<0$ par $0$ (slope 0), $x>0$ par $x$ (slope 1). $f'(0^-)=0$, $f'(0^+)=1$ → not differentiable.

Dhyan do: "continuous hai to differentiable bhi hoga" — ye GATE ka sabse common trap hai. Hamesha slopes compare karo.

### 3. Piecewise function ke joint par: do equations
Agar $f(x)=\begin{cases}p(x), & x\le a\\ q(x), & x>a\end{cases}$ hai, to joint $a$ par differentiable hone ke liye **dono** chahiye:
1. Continuity: $p(a)=q(a)$.
2. Slope match: $p'(a)=q'(a)$.

Kyun dono? Agar sirf slope match ho par values alag hon, to graph me jump hai (jump par derivative ho hi nahi sakta, step 2 dekho). Agar values match hon par slope nahi, to kona hai.

Tiny example: $f(x)=x^2$ ($x\le1$), $f(x)=2x+c$ ($x>1$). Slopes: $2x=2$ at 1, aur $2$ → match. Continuity: $1=2+c$ → $c=-1$. To $c=-1$ par hi differentiable.

Dhyan do: do unknowns hon to do equations likho, ek continuity se, ek slope se. Ek skip kiya to answer galat.

### 4. $|g(x)|$ me kona kahan banta hai
$|g(x)|$ ka graph $g$ ke graph jaisa hi hai, bas jo hissa x-axis ke neeche tha wo upar flip ho jaata hai. Kona sirf wahan ban sakta hai jahan $g(a)=0$.
- Agar $g(a)=0$ aur $g'(a)\ne0$ (**simple root**, graph axis ko slant me cross karta hai), to paas me $g(x)\approx g'(a)(x-a)$, isliye $|g(x)|\approx|g'(a)|\,|x-a|$ — bilkul $|x|$ jaisa kona. Not differentiable.
- Agar $g'(a)=0$ bhi (double/triple root), to $g(x)\approx c(x-a)^2$ ya $c(x-a)^3$, aur $|g|$ chikna rehta hai.

Isliye: $x|x|$, $|x|^3$, $(\max(0,x))^2$ — teeno 0 par differentiable hain (derivative 0). Example: $|x|^3$ ka derivative $x>0$ par $3x^2$, $x<0$ par $-3x^2$; dono $\to0$. Asal me $\frac{d}{dx}|x|^3=3x|x|$.

Aur $\frac{d}{dx}\big(x|x|\big)$: $x>0$ par $x^2$ → $2x$; $x<0$ par $-x^2$ → $-2x$; dono ko ek saath likho to $2|x|$ (0 par bhi 0, sahi).

Counting example: $f(x)=|x^2-1|$. Roots $\pm1$, dono simple ($g'=2x=\pm2\ne0$) → 2 kone.

Dhyan do: kone gin rahe ho to har $|\cdot|$ ke andar ke simple roots gino; $|x^3|$ ya $|(x-2)^2|$ jaise multiple roots wale term kone nahi dete.

### 5. Derivative rules — aur wo kyun sahi hain
- **Product:** $(uv)'=u'v+uv'$. Kyun: $u$ thoda badla ($\Delta u$) aur $v$ thoda badla ($\Delta v$), to rectangle ka area $uv$ badhta hai $\Delta u\cdot v+u\cdot\Delta v+\Delta u\,\Delta v$; aakhri term bahut chhota hai, $h$ se divide karke $h\to0$ par gayab.
- **Chain:** $(f(g(x)))'=f'(g(x))\cdot g'(x)$. Kyun: $x$ badla → $g$ utna $g'$ guna badla → $f$ uska $f'$ guna badla. Rates multiply hote hain. "Bahar ka derivative (andar ko waisa hi rakh ke) × andar ka derivative."
- **Quotient:** $\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}$. Kyun: $\frac uv=u\cdot v^{-1}$; product + chain: $u'v^{-1}+u\cdot(-v^{-2}v')=\frac{u'v-uv'}{v^2}$.

Tiny examples:
- $\frac{d}{dx}\ln(x^2+1)=\frac{1}{x^2+1}\cdot2x$. At $x=1$: $\frac{2}{2}=1$.
- $\frac{d}{dx}\frac{x}{1+x}=\frac{1\cdot(1+x)-x\cdot1}{(1+x)^2}=\frac{1}{(1+x)^2}$.

Dhyan do: quotient rule ke numerator me **minus** hai aur order $u'v$ pehle. Chain rule me andar ka derivative bhoolna sabse common galti hai.

### 6. Higher derivatives aur pattern
$f''$ = derivative ka derivative, $f^{(n)}$ = $n$ baar differentiate kiya. Kabhi kabhi pattern dikhta hai. $f(x)=\frac{1}{1-x}=(1-x)^{-1}$:
- $f'=(-1)(1-x)^{-2}\cdot(-1)=(1-x)^{-2}$ (do minus cancel: ek power se, ek chain se $\frac{d}{dx}(1-x)=-1$)
- $f''=2(1-x)^{-3}$, $f'''=6(1-x)^{-4}$
- Pattern: $f^{(n)}(x)=\frac{n!}{(1-x)^{n+1}}$, isliye $f^{(n)}(0)=n!$. Example: $f^{(5)}(0)=120$.

Dhyan do: $\frac{1}{1+x}$ me signs alternate karte hain ($f^{(n)}(0)=(-1)^n n!$), $\frac1{1-x}$ me nahi.

### 7. Taylor series: function ko polynomial banao
Idea: $f(x)$ ko point $a$ ke paas polynomial $c_0+c_1(x-a)+c_2(x-a)^2+\dots$ se likhna hai, aur har derivative $a$ par match karna hai. $x=a$ rakho → $c_0=f(a)$. Ek baar differentiate karke $x=a$ → $c_1=f'(a)$. Do baar → $2c_2=f''(a)$. $n$ baar → $n!\,c_n=f^{(n)}(a)$. Isliye
$$f(x)=\sum_{n\ge0}\frac{f^{(n)}(a)}{n!}(x-a)^n,\qquad c_n=\frac{f^{(n)}(a)}{n!}\iff f^{(n)}(a)=n!\,c_n.$$
$a=0$ wali series ko **Maclaurin series** kehte hain.

Yaad rakhne wali series (sab $a=0$):

| Function | Series |
|---|---|
| $e^x$ | $1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\dots=\sum\frac{x^n}{n!}$ |
| $\sin x$ | $x-\frac{x^3}{6}+\frac{x^5}{120}-\dots$ (sirf odd powers) |
| $\cos x$ | $1-\frac{x^2}{2}+\frac{x^4}{24}-\dots$ (sirf even powers) |
| $\ln(1+x)$ | $x-\frac{x^2}{2}+\frac{x^3}{3}-\dots$, valid $-1<x\le1$ |
| $\frac1{1-x}$ | $1+x+x^2+\dots$, valid $\lvert x\rvert<1$ |

Tiny example: $\ln(1+x)$ me $x^3$ ka coefficient $c_3=\frac13$. To $f'''(0)=3!\cdot\frac13=2$. (Check: $f'=(1+x)^{-1}$, $f''=-(1+x)^{-2}$, $f'''=2(1+x)^{-3}$ → $f'''(0)=2$. ✓)

Dhyan do: coefficient aur derivative alag cheezen hain; $n!$ se multiply/divide karna mat bhoolo.

### 8. Series me substitute karna aur expansion point badalna
- $e^{2x}$: $e^u$ me $u=2x$ rakho: $\sum\frac{(2x)^n}{n!}$. $x^3$ ka coefficient $\frac{2^3}{3!}=\frac86=\frac43\approx1.33$. Andar ki power $2^3$ bhoolna common hai.
- $e^{-x^2}=1-x^2+\frac{x^4}{2}-\dots$ ($u=-x^2$).
- $\ln x$ about $a=1$: powers $(x-1)$ ki hongi. $f(1)=0$, $f'(1)=1$, $f''(1)=-1$, to $\ln x\approx(x-1)-\frac{(x-1)^2}{2}$. (Ye wahi hai jo $\ln(1+u)$ me $u=x-1$ rakhne se milta.)

**Square root shortcut:** $\sqrt{a^2+h}$, $f(t)=\sqrt t$ about $t=a^2$: $f=a$, $f'=\frac{1}{2\sqrt t}=\frac1{2a}$, $f''=-\frac14t^{-3/2}=-\frac1{4a^3}$. Second order (yahan $\frac1{2!}$ lagta hai):
$$\sqrt{a^2+h}\approx a+\frac{h}{2a}-\frac{1}{2!}\cdot\frac{h^2}{4a^3}=a+\frac{h}{2a}-\frac{h^2}{8a^3}.$$
Example: $\sqrt{4.2}$, $a=2$, $h=0.2$: $2+0.05-\frac{0.04}{64}=2.049375\approx2.0494$ (true $2.04939$).

Dhyan do: second-order term me $\frac{f''(a)}{2!}$ hai, sirf $f''(a)$ nahi.

### 9. Do series ka product: saare pairs collect karo
Agar $A(x)=\sum a_kx^k$ aur $B(x)=\sum b_kx^k$, to $A\cdot B$ me $x^n$ ka coefficient $=\sum_{k=0}^{n}a_kb_{n-k}$ — matlab har woh pair jiski powers ka jod $n$ ho.

Example: $e^x\cos x$ me $x^2$ ka coefficient. $e^x=1+x+\frac{x^2}{2}+\dots$, $\cos x=1-\frac{x^2}{2}+\dots$ Pairs with power-sum 2: $(1)\cdot(-\frac{x^2}{2})$, $(x)\cdot(0\cdot x)$, $(\frac{x^2}{2})\cdot1$ → $-\frac12+0+\frac12=0$.

Dhyan do: sirf "pehla × pehla" mat lo; har combination jiska power-sum $n$ ho, sab add karo.

### 10. Geometric series aur uska derivative
$S=1+r+r^2+\dots$. $rS=r+r^2+\dots$, subtract: $S-rS=1$ → $S=\frac1{1-r}$, sirf jab $|r|<1$ (warna terms bade hote jaate hain).
- $n=0$ se: $\sum_{n\ge0}r^n=\frac{1}{1-r}$.
- $n=1$ se (pehla term 1 hata do): $\sum_{n\ge1}r^n=\frac{r}{1-r}$.
- General: pehla term $\div(1-r)$.

Example: $\sum_{n\ge0}(\frac23)^n=\frac{1}{1/3}=3$; $\sum_{n\ge1}(\frac12)^n=\frac{1/2}{1/2}=1$.

**Differentiated geometric:** $\sum_{n\ge0}x^n=\frac1{1-x}$ ko differentiate karo: $\sum_{n\ge1}nx^{n-1}=\frac{1}{(1-x)^2}$. Dono side $x$ se multiply:
$$\sum_{n\ge1}nx^n=\frac{x}{(1-x)^2}.$$
Example: $\sum\frac{n}{2^n}$, $x=\frac12$: $\frac{1/2}{1/4}=2$.

Dhyan do: start index dekho ($n=0$ ya $n=1$), aur $\frac{1}{(1-x)^2}$ vs $\frac{x}{(1-x)^2}$ me farak ($x$ se multiply kiya ya nahi).

### 11. Telescoping series
Jab term $\frac{1}{n(n+k)}$ jaisa ho, partial fractions se todo:
$$\frac{1}{n(n+k)}=\frac1k\left(\frac1n-\frac1{n+k}\right).$$
(Check: $\frac1n-\frac1{n+k}=\frac{k}{n(n+k)}$, isliye $\frac1k$ chahiye.) Ab pehle kuch terms likho; zyada tar cancel ho jaate hain, sirf shuru ke kuch "survivors" bachte hain.

<figure class="fig">
<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
<text x="10" y="25" font-size="12" fill="currentColor">n</text>
<text x="10" y="55" font-size="12" fill="currentColor">+1/n</text>
<text x="10" y="90" font-size="12" fill="currentColor">−1/(n+2)</text>
<rect x="80" y="10" width="300" height="90" fill="none" style="stroke:var(--muted)"/>
<line x1="80" y1="35" x2="380" y2="35" style="stroke:var(--muted)"/>
<line x1="80" y1="68" x2="380" y2="68" style="stroke:var(--muted)"/>
<text x="105" y="27" font-size="12" fill="currentColor">1</text>
<text x="165" y="27" font-size="12" fill="currentColor">2</text>
<text x="225" y="27" font-size="12" fill="currentColor">3</text>
<text x="285" y="27" font-size="12" fill="currentColor">4</text>
<text x="345" y="27" font-size="12" fill="currentColor">5</text>
<text x="98" y="56" font-size="12" style="fill:var(--good)">+1</text>
<text x="155" y="56" font-size="12" style="fill:var(--good)">+1/2</text>
<text x="215" y="56" font-size="12" fill="currentColor">+1/3</text>
<text x="275" y="56" font-size="12" fill="currentColor">+1/4</text>
<text x="335" y="56" font-size="12" fill="currentColor">+1/5</text>
<text x="95" y="90" font-size="12" fill="currentColor">−1/3</text>
<text x="155" y="90" font-size="12" fill="currentColor">−1/4</text>
<text x="215" y="90" font-size="12" fill="currentColor">−1/5</text>
<text x="275" y="90" font-size="12" fill="currentColor">−1/6</text>
<text x="335" y="90" font-size="12" fill="currentColor">−1/7</text>
<line x1="120" y1="80" x2="212" y2="58" style="stroke:var(--bad)" stroke-width="1.5"/>
<line x1="180" y1="80" x2="272" y2="58" style="stroke:var(--bad)" stroke-width="1.5"/>
<line x1="240" y1="80" x2="332" y2="58" style="stroke:var(--bad)" stroke-width="1.5"/>
<text x="10" y="115" font-size="10" fill="currentColor">Har −1/m, do column baad wale +1/m ko kaat deta hai; sirf +1, +1/2 bachte.</text>
</svg>
<figcaption>Telescoping: Σ 1/(n(n+2)) = ½ Σ (1/n − 1/(n+2)). Red lines cancel hone wale pairs dikhati hain.</figcaption>
</figure>

$$\sum_{n\ge1}\frac{1}{n(n+2)}=\frac12\left(1+\frac12\right)=\frac34,\qquad \sum_{n\ge1}\frac{1}{n(n+1)}=1\cdot(1)=1.$$
Rule: gap $k$ ho to pehle $k$ positive terms bachte hain: $\frac1k\left(1+\frac12+\dots+\frac1k\right)$.

Dhyan do: $\frac12$ factor bhoolne se $\frac32$ aata hai (galat).

### 12. Series converge karti hai ya nahi
Infinite sum ek finite number tak pahunchta hai to **converge**, warna **diverge**.
- **n-th term test:** agar terms 0 ki taraf nahi jaate, to series diverge. Example: $\sum\frac{n}{n+1}$, terms $\to1$ → diverge.
- Lekin terms $\to0$ hona **kaafi nahi**: harmonic $\sum\frac1n$ diverge karti hai. Kyun: $\frac13+\frac14>\frac12$, $\frac15+\dots+\frac18>\frac12$, … aise infinite $\frac12$ ke groups ban jaate hain. (Partial sum lagbhag $\ln N$ jaisa badhta hai.)
- **p-series:** $\sum\frac1{n^p}$ converge iff $p>1$ (jaise $\sum\frac1{n^2}$ converge).
- **Geometric:** $|r|<1$ to converge.
- **Alternating series:** signs $+,-,+,-$ aur terms ka size ghatke 0 → converge. $\sum\frac{(-1)^{n+1}}{n}=1-\frac12+\frac13-\dots=\ln2$ (yahi $\ln(1+x)$ at $x=1$ hai).
- **Ratio test:** $\left|\frac{a_{n+1}}{a_n}\right|\to L<1$ → converge; $L>1$ → diverge. Example $\frac{n}{2^n}$: ratio $\frac{n+1}{2n}\to\frac12<1$ → converge.

Dhyan do: "$n$ badh raha hai to diverge" — galat; neeche ka $2^n$ bahut tez badhta hai.

## Solved examples

**Example 1 (MSQ, easy):** Kaun se functions $x=0$ par differentiable hain?
(A) $|x^2-x|$ (B) $|x|\sin x$ (C) $\cos|x|$ (D) $|x|+x$

**Soch:** Har option me $|\cdot|$ hai → andar wale ka 0 par root simple hai ya nahi, ya directly dono side slope nikalo.

**Solution:**
1. (A) $g=x^2-x$, $g(0)=0$, $g'(0)=-1\ne0$ → simple root → kona. Check: $x<0$ par $g>0$, $f=x^2-x$, slope $\to-1$; $x>0$ (chhota) par $g<0$, $f=x-x^2$, slope $\to+1$. Not differentiable.
2. (B) $x>0$: $f=x\sin x$, $f'=\sin x+x\cos x\to0$. $x<0$: $f=-x\sin x$, $f'\to-0=0$. Dono 0 → differentiable.
3. (C) $\cos$ even hai, $\cos|x|=\cos x$ har jagah → differentiable ($f'(0)=0$).
4. (D) $x>0$: $2x$, slope 2; $x<0$: $0$, slope 0 → kona. Not differentiable.
5. **Answer: (B), (C).**

**Galti kahan hoti hai:** (A) ko "polynomial hai, smooth hoga" soch ke select karna — bahar ka $|\cdot|$ simple root par kona banata hai. Ya (B) ko "|x| hai to kona" soch ke chhodna — $\sin x$ se multiply hone par kona flat ho jaata hai (jaise $x|x|$).

**Example 2 (MCQ, medium):** $f(x)=\begin{cases}ax^2+1, & x\le2\\ bx-3, & x>2\end{cases}$ $x=2$ par differentiable hai. $(a,b)=$?
(A) $(1,4)$ (B) $(2,6)$ (C) $(0,2)$ (D) koi pair nahi

**Soch:** Joint par do unknowns → do equations: continuity aur slope match.

**Solution:**
1. Slope match: $\frac{d}{dx}(ax^2+1)=2ax$ → at 2: $4a$. Right: $b$. So $b=4a$.
2. Continuity: $4a+1=2b-3$.
3. $b=4a$ rakho: $4a+1=8a-3$ → $4a=4$ → $a=1$, $b=4$.
4. Check: left value $4+1=5$, right $8-3=5$ ✓; slopes $4=4$ ✓. **Answer (A).**

**Galti kahan hoti hai:** (B) aur (C) dono sirf continuity satisfy karte hain ($9=9$, $1=1$); slope check skip kiya to inme se koi bhi pick ho sakta hai.

**Example 3 (NAT, medium):** $f(x)=e^x\sin x$. $f'''(0)$ = ?

**Soch:** Teen baar product rule lambi hai. Maclaurin series multiply karo, $x^3$ ka coefficient $c_3$ lo, phir $f'''(0)=3!\,c_3$.

**Solution:**
1. $e^x=1+x+\frac{x^2}{2}+\frac{x^3}{6}+\dots$, $\sin x=x-\frac{x^3}{6}+\dots$
2. $x^3$ ke pairs: $1\cdot(-\frac{x^3}{6})$ aur $\frac{x^2}{2}\cdot x$. ($x\cdot$ ($x^2$ term of $\sin$) $=0$, kyunki $\sin$ me $x^2$ nahi.)
3. $c_3=-\frac16+\frac12=\frac13$.
4. $f'''(0)=6\cdot\frac13=$ **2**.

**Galti kahan hoti hai:** $c_3=\frac13\approx0.33$ ko hi answer likh dena (coefficient ≠ derivative). Ya sirf $1\cdot(-\frac{x^3}{6})$ lekar $-1$ nikalna (pairs collect nahi kiye).

**Example 4 (NAT, medium):** $\sqrt{x}$ ka second-order Taylor polynomial $x=9$ ke around use karke $\sqrt{9.3}$ approximate karo (4 decimal).

**Soch:** "Second-order Taylor about 9" → $\sqrt{a^2+h}$ shortcut, $a=3$, $h=0.3$.

**Solution:**
1. $f(9)=3$, $f'(9)=\frac{1}{2\cdot3}=\frac16$, $f''(9)=-\frac{1}{4\cdot27}=-\frac1{108}$.
2. $P_2=3+\frac16(0.3)+\frac{1}{2!}\cdot\left(-\frac1{108}\right)(0.09)$.
3. $=3+0.05-0.000416\overline{6}=3.0495833\ldots$
4. **Answer ≈ 3.0496** (true $\sqrt{9.3}=3.04959$).

**Galti kahan hoti hai:** $\frac1{2!}$ bhool kar $0.09/108=0.000833$ ghatana → $3.0492$. Ya sirf first order → $3.05$.

**Example 5 (NAT, medium):** $\displaystyle\sum_{n=1}^{\infty}\frac{1}{n(n+3)}$ = ? (3 decimal)

**Soch:** $\frac{1}{n(n+k)}$ form → telescoping, gap $k=3$.

**Solution:**
1. $\frac{1}{n(n+3)}=\frac13\left(\frac1n-\frac1{n+3}\right)$.
2. Terms: $(1-\frac14)+(\frac12-\frac15)+(\frac13-\frac16)+(\frac14-\frac17)+\dots$ — $-\frac14$ chauthe term ke $+\frac14$ se cancel, etc.
3. Survivors: $1+\frac12+\frac13=\frac{11}{6}$.
4. Sum $=\frac13\cdot\frac{11}{6}=\frac{11}{18}\approx$ **0.611**.

**Galti kahan hoti hai:** $\frac13$ bhoolna → $\frac{11}6\approx1.833$. Ya survivors me sirf $1$ lena → $\frac13$.

**Example 6 (MCQ, hard):** $\displaystyle\sum_{n=1}^{\infty}\frac{n+1}{3^n}=$ ?
(A) $\frac54$ (B) $\frac34$ (C) $\frac94$ (D) $\frac{11}{4}$

**Soch:** Numerator ko todo: $\sum\frac{n}{3^n}+\sum\frac{1}{3^n}$. Pehla differentiated geometric, doosra simple geometric (dono $n=1$ se).

**Solution:**
1. $\sum_{n\ge1}nx^n=\frac{x}{(1-x)^2}$, $x=\frac13$: $\frac{1/3}{4/9}=\frac34$.
2. $\sum_{n\ge1}(\frac13)^n=\frac{1/3}{2/3}=\frac12$.
3. Total $=\frac34+\frac12=\frac54$. **Answer (A).**

**Galti kahan hoti hai:** (B): "+1" wala part chhod diya. (C): doosre part ko $n=0$ se liya ($\frac{1}{1-1/3}=\frac32$) → $\frac34+\frac32$. (D): $\frac{1}{(1-x)^2}=\frac94$ use kiya ($x$ se multiply bhoole) → $\frac94+\frac12$.

## Confusions clear karo

**Q:** Continuous aur differentiable me farak kya hai?
**A:** Continuous = graph me koi gap/jump nahi (pen uthaye bina bana sakte ho). Differentiable = graph chikna hai, koi nukila kona nahi. Har differentiable function continuous hai, par $|x|$ continuous hokar bhi differentiable nahi.

**Q:** $|x|^3$ me bhi $|x|$ hai, to kona kyun nahi?
**A:** Kona tab banta hai jab andar wala function axis ko slope ke saath cross kare (simple root). $x^3$ ka 0 par slope 0 hai, isliye flip karne par bhi graph flat hi milta hai; derivative $3x|x|\to0$ dono taraf.

**Q:** Taylor coefficient se derivative kaise nikalta hai?
**A:** $c_n=\frac{f^{(n)}(a)}{n!}$, isliye $f^{(n)}(a)=n!\,c_n$. Example: $c_4=\frac12$ to $f^{(4)}(0)=24\cdot\frac12=12$.

**Q:** Taylor aur Maclaurin me kya farak hai?
**A:** Maclaurin bas Taylor hai jab $a=0$. Agar question "about $x=1$" bole to powers $(x-1)$ ki likhni hain, $x$ ki nahi.

**Q:** Geometric sum me $\frac1{1-r}$ kab aur $\frac r{1-r}$ kab?
**A:** Formula = (pehla term)/(1 − r). $n=0$ se pehla term $r^0=1$; $n=1$ se pehla term $r$; $n=2$ se $r^2$.

**Q:** Terms 0 ki taraf ja rahe hain, to sum finite hoga na?
**A:** Zaroori nahi. $\sum\frac1n$ ke terms 0 ki taraf jaate hain par sum infinite hai. Terms 0 na jaayein to diverge pakka; jaayein to aur test lagao.

**Q:** Do series ko multiply karte waqt kitne terms lene chahiye?
**A:** Jitni power chahiye usse tak hi. $x^4$ chahiye to dono series $x^4$ tak likho, aur har pair jiski powers ka jod 4 ho, add karo. Zero coefficients (jaise $\cos$ me odd powers) ko bhi dhyan me rakho.

**Q:** Kai $|\cdot|$ terms ka sum ho to non-differentiable points kaise gine?
**A:** Har term ke simple roots ki list banao aur union lo. Alag-alag points par kone ek doosre ko cancel nahi karte. (Same point par same kona $+$ aur $-$ me ho, jaise $|x|-|x|$, to cancel ho sakta hai — aisa case dikhe to directly slopes check karo.)

## Khud try karo

**1.** $f(x)=|x^2-9|+|x-1|+|(x-2)^2|+|x^3|$ kitne points par differentiable **nahi** hai?

<details><summary>Answer dekho</summary>

- $|x^2-9|$: simple roots $x=\pm3$ → 2 kone.
- $|x-1|$: $x=1$ → 1 kona.
- $|(x-2)^2|=(x-2)^2$ (double root, always $\ge0$) → koi kona nahi.
- $|x^3|$: triple root → smooth.

Total **3** points ($-3, 1, 3$).

</details>

**2.** $e^{-x^2}$ ki Maclaurin series me $x^4$ ka coefficient kya hai, aur $f^{(4)}(0)$ kya hai?

<details><summary>Answer dekho</summary>

$e^u=1+u+\frac{u^2}{2}+\dots$, $u=-x^2$: $1-x^2+\frac{x^4}{2}-\dots$
Coefficient $=\frac12$. $f^{(4)}(0)=4!\cdot\frac12=$ **12**.

</details>

**3.** $\displaystyle\sum_{n=2}^{\infty}\left(\frac13\right)^n$ = ?

<details><summary>Answer dekho</summary>

Pehla term ($n=2$) $=\frac19$. Sum $=\frac{1/9}{1-1/3}=\frac{1/9}{2/3}=\frac16\approx$ **0.1667**.

</details>

**4.** $f(x)=(x^2+1)^3$. $f'(1)$ = ?

<details><summary>Answer dekho</summary>

Chain rule: $f'=3(x^2+1)^2\cdot2x$. At $x=1$: $3\cdot4\cdot2=$ **24**.

</details>

**5. (MSQ)** Kaun si series converge karti hain?
(A) $\sum\frac1{n^2}$ (B) $\sum\frac{n}{2n+1}$ (C) $\sum\frac{(-1)^n}{\sqrt n}$ (D) $\sum\frac{2^n}{n!}$

<details><summary>Answer dekho</summary>

- (A) p-series, $p=2>1$ → converge (sum $\frac{\pi^2}{6}\approx1.645$).
- (B) terms $\to\frac12\ne0$ → diverge.
- (C) alternating, $\frac1{\sqrt n}$ ghatke 0 → converge.
- (D) ratio $\frac{2}{n+1}\to0<1$ → converge (sum $e^2-1$).

**Answer: (A), (C), (D).**

</details>

## Ek page me
- Differentiable ⇒ continuous; ulta galat ($|x|$, ReLU 0 par kona).
- Joint par differentiable: continuity **aur** $f'(a^-)=f'(a^+)$ — dono equations likho.
- $|g(x)|$ me kona sirf simple root par ($g(a)=0$, $g'(a)\ne0$); $x|x|$, $|x|^3$, $(\max(0,x))^2$ smooth hain; $\frac{d}{dx}x|x|=2|x|$.
- Product $u'v+uv'$; quotient $\frac{u'v-uv'}{v^2}$; chain = bahar ka derivative × andar ka derivative.
- $\frac{d^n}{dx^n}\frac1{1-x}\Big|_0=n!$.
- Taylor: $c_n=\frac{f^{(n)}(a)}{n!}$, isliye $f^{(n)}(a)=n!\,c_n$.
- Series yaad: $e^x,\ \sin x,\ \cos x,\ \ln(1+x),\ \frac1{1-x}$; substitute karo to andar ki power bhi ($e^{2x}$ → $\frac{2^n}{n!}$).
- About $a$ expand karo to powers $(x-a)$ ki; second order me $\frac1{2!}$; $\sqrt{a^2+h}\approx a+\frac h{2a}-\frac{h^2}{8a^3}$.
- Product of series: $x^n$ coefficient $=\sum a_kb_{n-k}$ (saare pairs).
- Geometric = (pehla term)/(1−r), $|r|<1$; $\sum_{n\ge1}nx^n=\frac{x}{(1-x)^2}$.
- Telescoping: $\frac1{n(n+k)}=\frac1k(\frac1n-\frac1{n+k})$; $\sum\frac1{n(n+1)}=1$, $\sum\frac1{n(n+2)}=\frac34$.
- Terms $\to0$ kaafi nahi: $\sum\frac1n$ diverge, $\sum\frac{(-1)^n}{n}$ converge; $\ln(1+x)$ series $x=1$ par $\ln2$.

Revision ke liye **Short note** tab dekho.
