# SQL: joins, subqueries, grouping and NULL

## Core ideas
- Logical order: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY.
- SQL tables are **bags**: duplicates stay unless DISTINCT is used.
- Inner join: matching pairs. LEFT keeps all left rows; FULL keeps unmatched rows from both sides.
- `ON` decides matching in an outer join; a filter on the right table in `WHERE` drops the NULL-padded rows.
- `NATURAL JOIN` equates **every** same-named column.
- `> ALL (S)` = greater than max(S); `> ANY (S)` = greater than min(S).
- `x NOT IN (S)` is never TRUE when S contains NULL; `NOT EXISTS` is NULL-safe.
- `COUNT(*)` counts rows; `COUNT(col)`, `SUM`, `AVG`, `MAX` ignore NULL. On no rows: COUNT = 0, others NULL.
- GROUP BY puts all NULL keys into one group; DISTINCT treats NULLs as equal.
- Three-valued logic: comparisons with NULL are UNKNOWN; WHERE and HAVING keep only TRUE.

## Shortcuts
| Expression | Value |
|---|---|
| NULL = NULL | UNKNOWN |
| TRUE OR UNKNOWN | TRUE |
| FALSE AND UNKNOWN | FALSE |
| NOT UNKNOWN | UNKNOWN |
| x BETWEEN a AND b | a ≤ x ≤ b (inclusive) |
| AVG(col) | SUM(col) / COUNT(col) |

## Traps
1. AVG dividing by all rows. Fix: divide by non-NULL count.
2. Treating `a > 2 OR a <= 2` as always true. Fix: NULL rows are UNKNOWN.
3. Turning UNKNOWN into FALSE before NOT. Fix: NOT UNKNOWN stays UNKNOWN.
4. Swapping ALL and ANY, or > and ≥ at the boundary value.
5. Matching NULL with NULL in a join condition.
6. Rewriting IN as a join: the join duplicates outer rows.
7. Expecting a row for an all-NULL group after a WHERE filter that removes those rows.
8. Applying HAVING before WHERE.

## Recall
- WHERE filters rows, HAVING filters groups.
- COUNT(*) ≥ COUNT(col) ≥ COUNT(DISTINCT col).
- NOT IN + NULL in list → empty result.
- > ALL ↔ > MAX, > ANY ↔ > MIN.
- LEFT JOIN rows = matches + unmatched left rows.
- Aggregate without GROUP BY → exactly one row.
- SELECT DISTINCT keeps one NULL; COUNT(DISTINCT col) skips it.
- SQLite note: no ALL/ANY and NULL allowed in non-integer PK unless NOT NULL; GATE uses standard SQL.
