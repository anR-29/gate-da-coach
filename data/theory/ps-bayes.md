# Total probability and Bayes theorem

## Core ideas
- Partition $H_1,\dots,H_k$ (disjoint, cover everything). Draw the tree before substituting.
- Total probability: $P(E)=\sum_i P(E\mid H_i)\,P(H_i)$ — every branch is weighted by its prior.
- Bayes: $P(H_j\mid E)=\dfrac{P(E\mid H_j)P(H_j)}{\sum_i P(E\mid H_i)P(H_i)}$.
- Numerator = the **one branch the question asks about**; denominator = **all** branches leading to $E$.
- Posteriors over the partition sum to 1 — a quick check.
- Base rate: with a rare condition, even an accurate test gives a small $P(D\mid +)$.
- Sensitivity $=P(+\mid D)$; specificity $=P(-\mid D^c)$; false-positive rate $=1-$specificity.

## Shortcuts
| Step | Write |
|---|---|
| 1 | priors $P(H_i)$ (must sum to 1) |
| 2 | likelihoods $P(E\mid H_i)$ |
| 3 | products $P(E\mid H_i)P(H_i)$ = branch weights |
| 4 | $P(E)$ = sum of products |
| 5 | posterior = asked branch / sum |

Odds form: posterior odds = prior odds × $\dfrac{P(E\mid H)}{P(E\mid H^c)}$.

## Traps
1. **Unweighted denominator**: averaging rates (2%, 3%, 5%) ignores output shares. Fix: multiply each by its prior.
2. **Wrong branch in the numerator**: asked for machine C but used B's product. Fix: circle the hypothesis named after "given … the probability that it came from".
3. **Sensitivity ≠ posterior**: $P(+\mid D)=0.95$ does not mean $P(D\mid+)=0.95$.
4. **Ignoring the base rate**: 1% prevalence with 95%/5% test gives only about 16%.
5. **Stopping at the numerator** (joint probability) and forgetting to divide by $P(E)$.
6. **Transfer problems**: after moving a ball, the second urn's size changes; weight both transfer branches.

## Recall
- $P(E)=\sum P(E\mid H_i)P(H_i)$
- $P(H\mid E)=P(E\mid H)P(H)/P(E)$
- Posteriors sum to 1
- $P(D\mid+)=\dfrac{s\pi}{s\pi+(1-c)(1-\pi)}$ ($s$ = sensitivity, $c$ = specificity, $\pi$ = prevalence)
- Small $\pi$ ⇒ small $P(D\mid+)$ even for good tests
- Posterior odds = prior odds × likelihood ratio
