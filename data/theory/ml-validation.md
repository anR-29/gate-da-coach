# Cross-validation and data leakage

## Core ideas
- **k-fold CV**: split into $k$ folds; for each fold, train on the other $k - 1$ and test on it. CV error = mean of the $k$ fold errors.
- **LOOCV**: $k = n$; $n$ fits, each on $n - 1$ points. Deterministic, nearly unbiased, can have high variance, expensive.
- Fits needed = folds × candidate settings, plus 1 if a final refit on all data is counted.
- Larger $k$: bigger training sets (less pessimistic), more fits.
- LOOCV for k-NN: classify each point from the **other** points only; 1-NN training error is always 0, LOOCV error is not.
- LOOCV for the mean predictor: residual $= \frac{n}{n-1}(y_i - \bar y)$, so MSE $= \left(\frac{n}{n-1}\right)^2 \times$ training MSE.
- **Leakage**: any information from validation/test rows (or from the future, or from the label) reaching training.
- Fit scalers, imputers, feature selection, oversampling and tuning **inside** each training fold.
- Related rows (same patient/user): group k-fold. Time series: forward chaining (train on past, test on later).
- Keep a test set untouched until the single final report.

## Shortcuts
| Setting | Number of fits |
|---|---|
| $k$-fold, $m$ candidates | $km$ (+1 refit) |
| LOOCV, $m$ candidates | $nm$ |
| Forward chaining, $t = a..b$ | $b - a + 1$ |

## Traps
1. Forgetting the final refit, or multiplying when the question says not to count it.
2. Using $n - 1$ fits for LOOCV (training size, not number of fits).
3. Letting a point be its own neighbour in LOOCV k-NN.
4. Reporting accuracy or a count when the error rate is asked.
5. Scaling or selecting features on the full data before CV.
6. Stratifying (label balance) when grouping (by patient) is what removes the leak.
7. Random folds on time series.
8. Blaming high bias for a high CV score that collapses in deployment; that pattern points to leakage.

## Recall
- k-fold: $k$ fits per setting; LOOCV: $n$ fits.
- CV error = average held-out error.
- LOOCV is deterministic.
- Preprocess inside each fold only.
- Group folds for related rows; forward chaining for time.
- Test set used once, at the end.
