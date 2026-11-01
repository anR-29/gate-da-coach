# Conditional probability and independence

## Core ideas
- $P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$, $P(B)>0$. "Given $B$" shrinks the sample space to $B$.
- With equally likely outcomes: $P(A\mid B)=|A\cap B|/|B|$.
- Multiplication rule: $P(A\cap B)=P(B)P(A\mid B)=P(A)P(B\mid A)$.
- Independent: $P(A\cap B)=P(A)P(B)$, equivalently $P(A\mid B)=P(A)$.
- Mutually exclusive: $P(A\cap B)=0$. If both have positive probability, they are **dependent**.
- If $A,B$ independent, so are $A^c,B$; $A,B^c$; $A^c,B^c$.
- $P(A\mid B)>P(A)\iff P(A\cap B)>P(A)P(B)\iff P(B\mid A)>P(B)$.

## Shortcuts
| Question | Check |
|---|---|
| Independent? | compare $P(A\cap B)$ with $P(A)P(B)$ |
| Exclusive? | is $P(A\cap B)=0$? |
| Given a table | divide by the row/column total of the given event |
| Union of independent events | $1-P(A^c)P(B^c)$ |

## Traps
1. **Denominator not restricted**: dividing by 36 (or 1) after "given". Fix: list the given outcomes and divide by their count.
2. **Reverse conditional**: $P(\text{bought}\mid\text{mobile})\ne P(\text{mobile}\mid\text{bought})$. Fix: the event after "given" goes in the denominator.
3. **Exclusive = independent**: false. Disjoint events tell you a lot about each other.
4. **Overlap = dependent**: false. Independent events with positive probability must overlap.
5. **"One toss left, so 1/2"**: "at least two heads" does not say which tosses were heads. Fix: enumerate the restricted space.
6. **Using $P(A)P(B)$ without independence being given or checked.**

## Recall
- $P(A\mid B)=P(A\cap B)/P(B)$
- Independent $\iff P(A\cap B)=P(A)P(B)\iff P(A\mid B)=P(A)$
- Disjoint and $P(A),P(B)>0$ ⇒ dependent
- Independence passes to complements
- $P(A\cup B)=1-P(A^c)P(B^c)$ for independent $A,B$
- Conditional on $B$: new sample space is $B$
