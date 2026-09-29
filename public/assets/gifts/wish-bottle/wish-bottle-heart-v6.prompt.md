# Wish heart production assets

Tool: built-in imagegen. Updated 2026-09-29.

## Progress sheet

Edit target: approved wish-bottle-heart-30-states-v5.png.
Output: wish-bottle-heart-30-states-v6.png (1145 × 1374, RGBA).

Production cleanup of this approved heart progress sheet. Preserve ALL 30 hearts and their existing exact liquid heights and three palettes, glass style, and complete pointed bottoms. Do not redesign or increase early fill levels. REMOVE ALL white/pink/magenta noisy pixels, matte fringes, debris and disconnected speckles outside the glass outlines. Clean smooth anti-aliased silhouette with genuinely transparent alpha outside each heart, no white halo. Retain glass rim and internal reflections. Arrange the same hearts in a strictly regular 5 columns x 6 rows sprite grid of equal square cells. Every heart exactly the same width and height and centered at the same coordinates within its cell. Whole sheet ratio 5:6. Each heart occupies at most 80% cell width and 80% cell height, leaving at least 10% TRANSPARENT padding on all four sides; do not cut the pointed bottom. No labels, numbers, divider lines, background, checkerboard, ground shadow, or exterior glow. Thirty states remain ordered row-major from tiny pale-pink bottom droplet to fully red. First ten pale pink, next ten deep pink, last ten ruby red. Only clean edges and normalize placement; preserve heights from the reference.

## Empty state

Output: wish-bottle-heart-empty-v6.png (1355 × 1161, RGBA).

Create ONE empty heart-shaped glass container icon, matching the refined silvery blush glass style of a premium pink wish-heart progress indicator. Perfectly symmetrical broad heart with complete pointed bottom, no neck or cap. Front view, silvery blush glass rim, pearly translucent interior and soft restrained white reflections at upper left and right. Absolutely NO liquid; this is the zero-progress state. Single centered heart on square genuinely transparent background, 12% clear padding on each side, same fixed front-facing proportions as a heart 210 wide by180 tall. No external glow, no debris, no particles, no white fringe, no text, no shadow or ground. Smooth clean antialiased contour, premium soft 3D UI icon.

## Integration

- Replies 1–30 map to row-major frames 0–29; zero uses the separate empty image.
- Equal display viewport: 229 × 220. Columns start at 0, 229, 458, 687, 916.
- Row crop origins: 20, 233, 453, 677, 895, 1115. The generated row gutters are not equal.
- SVG is only a PNG viewport and exterior silhouette trim to hide generated edge debris. It does not draw or mask liquid height.
- The sheet retains illustrated liquid levels from v5. These are approximately even, not guaranteed pixel-exact n/30 measurements.
- Earlier previews are retained, not deleted.
