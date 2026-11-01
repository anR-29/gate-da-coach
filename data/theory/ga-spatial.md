# Spatial and figure reasoning

## Core ideas
- **Map colouring:** list adjacent pairs (shared line, not a point). A ring of regions needs 2 colours if even, 3 if odd; a region touching the whole ring adds one more.
- **Cube nets:** in a straight run of squares, alternate squares are opposite. Squares sharing an edge in the net are adjacent on the cube. A 2 × 2 block or 5+ in a row cannot fold.
- **Dice views:** with a common top face, the side faces read in a ring; faces two steps apart in the ring are opposite. Never assume "sum = 7" unless told.
- **Paper folding:** each unfold **reflects** holes across that crease. k folds → up to $2^k$ holes from one punch.
- **Rotation 90° clockwise** (grid with max index m): $(x, y) \to (m - y,\ x)$. Rows become columns.
- **Mirror (vertical mirror):** $(x, y) \to (m - x,\ y)$; water image: $(x, m - y)$.
- **Mirror clock:** actual = 12:00 − shown, computed as 11:60 − shown so the borrowed hour is not lost.
- **Counting triangles** with lines from one apex crossed by k transversal lines and n apex lines: $k \cdot \binom{n}{2}$.
- **Counting squares** in an $m \times n$ grid: $\sum_k (m-k+1)(n-k+1)$.
- **Cross-sections of a cube:** corner cut → equilateral triangle; parallel to a face → square; through centre ⟂ space diagonal → regular hexagon. Tilted cut of a cylinder's curved surface → ellipse.

## Shortcuts
| Figure task | First move |
|---|---|
| Rotation / mirror | follow one distinctive cell or corner |
| Assembling pieces | match area first, then shape; check if flips are allowed |
| Nets | strike out any with a 2 × 2 block |
| Folding | unfold in reverse order, one crease at a time |

## Traps
1. **Odd ring coloured with 2 colours.** Fix: count ring length; odd → 3.
2. **Diagonal regions assumed adjacent** when a centre region separates them. Fix: list shared lines only.
3. **90° rotation without swapping coordinates** (gives a mirror). Fix: a rotation always swaps x and y.
4. **Wrong rotation direction.** Fix: clockwise sends the top row to the right column.
5. **Mirror-clock borrow error** (12:00 − 4:37 = 8:23). Fix: use 11:60.
6. **Holes translated, not reflected.** Fix: keep the same distance from the crease on the other side.
7. **Mirror piece accepted** when flipping is not allowed. Fix: rotate the candidate, never flip.
8. **Farthest net square picked as opposite.** Fix: alternate squares in a line.

## Recall
- Odd ring → 3 colours; plus a hub → 4.
- Net: alternate squares in a line are opposite.
- 90° CW: (x, y) → (m − y, x).
- Vertical mirror: (x, y) → (m − x, y).
- Mirror clock: 11:60 − shown.
- Squares in 4 × 3 grid = 12 + 6 + 2 = 20.
- Cube corner cut → equilateral triangle.
