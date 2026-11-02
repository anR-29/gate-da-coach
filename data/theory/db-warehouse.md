# Data warehousing, OLAP and data transformation

## Core ideas
- Fact table: foreign keys to dimensions + numeric measures. Dimension tables: descriptive attributes and hierarchy levels.
- Star: one denormalized table per dimension (fewer joins). Snowflake: normalized dimensions (less redundancy, more joins).
- Measures: additive (sales, quantity), semi-additive (balance, stock: not over time), non-additive (ratios, %).
- Concept hierarchy: street < city < state < country; day < month < quarter < year.
- Roll-up climbs a hierarchy; drill-down descends; slice fixes one dimension; dice restricts several; pivot rotates.
- Cuboids: $2^n$ without hierarchies; $\prod (L_i + 1)$ with $L_i$ levels.
- `CUBE(a, b, c)` rows when all combinations exist: $\prod (n_i + 1)$. `ROLLUP(a, b)`: (a, b) + (a) + ().
- Min-max: $v' = \frac{v - \min}{\max - \min}(\text{new\_max} - \text{new\_min}) + \text{new\_min}$. Z-score: $(v - \mu)/\sigma$. Decimal scaling: $v / 10^j$, smallest j with max|v'| < 1.
- Discretization: equal-width bins (width = (max − min)/k) or equal-frequency bins; smoothing by bin means, medians or boundaries.
- Sampling: SRSWOR ($\binom{N}{s}$ samples, P = s/N), SRSWR (P = $1 - (1 - 1/N)^s$), stratified, cluster.

## Shortcuts
| Question | Answer |
|---|---|
| CUBE rows, missing combos | Σ over grouping sets of distinct groups |
| ROLLUP of k columns | k + 1 grouping sets |
| Proportional stratum share | (stratum size / N) · s |
| Lossless reduction | run-length or dictionary coding |
| Lossy reduction | PCA truncation, wavelet thresholding, sampling |

## Traps
1. Forgetting the grand-total row or the "all" level (+1).
2. Using Π(nᵢ + 1) when some combinations are absent.
3. Using the CUBE formula for ROLLUP.
4. Swapping slice and dice, or roll-up and drill-down.
5. Summing a semi-additive measure over time.
6. Dividing by the variance instead of σ, or using n − 1 when told population.
7. Putting a bin boundary value in the wrong bin.
8. Fact table vs dimension table direction of foreign keys.

## Recall
- Cuboids: 2ⁿ, or Π(Lᵢ + 1) with hierarchies.
- CUBE rows (full data): Π(nᵢ + 1).
- ROLLUP(year, quarter) with 2 years × 4 quarters: 8 + 2 + 1 = 11.
- Z = (v − μ)/σ; min-max = (v − min)/(max − min).
- Equal width = (max − min)/k.
- SRSWR inclusion: 1 − (1 − 1/N)ˢ.
- Balance is semi-additive; margin % is non-additive.
