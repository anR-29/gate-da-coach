# ER to relations, keys and integrity

## Core ideas
- Strong entity: one table; composite attribute: flatten into columns; derived attribute: not stored.
- Multivalued attribute: its own table (owner key, value). Keeping it inline breaks 1NF.
- 1:N relationship: no table; put the key of the "one" side as a foreign key in the "many" side.
- 1:1: foreign key on either side; with total participation on **both** sides the two entities merge into one table.
- M:N or n-ary relationship: its own table; key = union of the participating keys (descriptive attributes are not in the key).
- Weak entity: own table, key = owner key + partial key; the identifying relationship needs no table.
- Superkey: determines every attribute. Candidate key: minimal superkey. Primary key: the chosen candidate key.
- Entity integrity: no PK attribute is NULL. Referential integrity: each FK value is NULL or matches a referenced key.
- An instance can **disprove** a key (duplicate values) but never prove one.

## Shortcuts
| Construct | Tables added |
|---|---|
| Strong entity | 1 |
| Weak entity | 1 (key: owner + partial) |
| Multivalued attribute | 1 |
| M:N, ternary | 1 |
| 1:N, 1:1 | 0 (FK) |
| 1:1 total on both sides | merge the two entities |

Superkeys of R with n attributes and keys K1, K2: $2^{n-|K_1|} + 2^{n-|K_2|} - 2^{n-|K_1 \cup K_2|}$.

## Traps
1. Giving every 1:N its own table. Fix: FK on the many side.
2. Putting the FK on the "one" side. Fix: the many side holds it, or you need a multivalued column.
3. Using a weak entity's partial key alone. Fix: always add the owner key.
4. Adding superkey counts without subtracting the overlap. Fix: inclusion-exclusion.
5. Thinking a NULL FK violates referential integrity. Fix: NULL needs no match unless NOT NULL is declared.
6. Forgetting that cascaded deletes fire further actions (SET NULL, CASCADE) in other tables.
7. Thinking an FK must reference a different table. Fix: self-references (manager → employee) are allowed.

## Recall
- Minimum tables = strong + weak + multivalued + M:N/n-ary (1:N and 1:1 fold in).
- 1:1 with total participation on both sides → one table.
- Weak entity key = owner key + partial key.
- PK: unique + NOT NULL; FK: NULL or a match.
- Deleting a referenced row can violate RESTRICT; inserting into the referenced table never can.
- Superkeys with one key of size k in n attributes: $2^{n-k}$.
