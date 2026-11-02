# Choosing a machine learning method

## Core ideas
- Start from the target. Real-valued quantity → **regression**. Label from a finite set → **classification**, even when the labels are digits. No target → **unsupervised** (clustering, PCA, density estimation).
- A predicted probability of a yes/no event is still classification (train with cross-entropy).
- Supervised methods need input–target pairs; unsupervised methods use features only.
- **Generative**: model $P(x \mid y)$ and $P(y)$, classify with Bayes' rule (Naive Bayes, LDA, QDA). Can generate $x$.
- **Discriminative**: model $P(y \mid x)$ or a boundary directly (logistic regression, SVM, perceptron, kNN, trees, MLP).
- Gaussian classes with shared covariance → linear boundary (posterior is logistic). Different covariances → quadratic.
- Naive Bayes assumes conditional independence of features given the class; strong with little data and many features.
- Distance-based methods (kNN, k-means, SVM with RBF) need feature scaling.
- Linear regression is linear in the weights: add $x^2$, $\log x$ features to fit curves.

## Shortcuts
| Need | Typical choice |
|---|---|
| Continuous target | linear / ridge regression |
| Binary target with probabilities | logistic regression |
| Readable if–then rules | shallow decision tree |
| Few examples, many sparse features | Naive Bayes |
| Max-margin boundary | SVM |
| Groups without labels | k-means, hierarchical |
| Compress features | PCA |
| Projection that separates labelled classes | LDA |

## Traps
1. Calling digit or star labels regression because they are numbers (C10). Fix: ask whether 4.6 makes sense.
2. Calling click-probability prediction regression. Fix: the labels are 0/1.
3. "Logistic regression is regression." Fix: it is a classifier.
4. Swapping generative and discriminative (Naive Bayes ↔ logistic regression) (C2).
5. Using k-means when labels exist, or kNN (supervised) when they do not.
6. Using PCA as a classifier. Fix: it ignores labels.
7. Assuming shared-covariance Gaussians give a quadratic boundary. Fix: linear; quadratic needs different covariances.

## Recall
- Real target → regression; finite labels → classification; no target → unsupervised.
- Generative: $P(x \mid y)P(y)$; discriminative: $P(y \mid x)$.
- Naive Bayes is generative; logistic regression is its discriminative partner.
- Shared-covariance Gaussian classes → linear boundary (LDA); different → quadratic (QDA).
- kNN, k-means: scale features first.
- Decision tree = readable rules.
- Probability of a binary event → classification with log loss.
