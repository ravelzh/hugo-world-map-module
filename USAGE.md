# Usage & Configuration

This module provides the `world-map` shortcode for Hugo. It renders an interactive SVG world map that automatically highlights visited countries based on your content's taxonomies.

## 🟢 Basic Usage

To display the map, simply insert the shortcode in any markdown file. The map acts as a "canvas" that pulls data from your site's taxonomy terms (specifically `destinationen` or `destinations`).

```go
{{< world-map >}}
```

### Key Features
- **Responsive & Fluid**: The map is built to be strictly fluid. It expands to fill the available width (up to 1280px on desktop) and centers itself in the viewport, ensuring safe margins on all devices.
- **Interactive**: Support for Pan/Zoom (Mouse & Touch) and Tooltips.
- **Automatic Matching**: Matches taxonomy terms (e.g., "Albanien", "Turkey") to SVG ISO codes.

## 🌍 Configuration

Required data files in your project (or use the module's defaults):

### 1. `data/country_map.yaml` (Recommended for Mapping)
Use this to map your specific taxonomy term titles (especially if they are not English) to ISO-2 codes.
**The module now includes a comprehensive default set**, but you can override it in your project.

Example:
```yaml
Albanien: "AL"
Griechenland: "GR"
Turkey: "TR"
```

### 2. `data/iso_map.json` (Internal)
Contains standard English Name -> ISO mappings. Used as a fallback.

## 🎨 Customization

### i18n (Translations)
The module supports multilingual labels for the "Visited" text in tooltips.
Define the `world_map_visited` key in your site's `i18n` files:

`i18n/de.toml`:
```toml
[world_map_visited]
other = "BEREIST"
```

`i18n/en.toml`:
```toml
[world_map_visited]
other = "Visited"
```
*Fallback: If not defined, it defaults to `visited` or "(Visited)".*

### CSS Classes

| Class | Description |
| :--- | :--- |
| `.travel-map-wrapper` | The main container. **Do not set fixed widths**; it is designed to be fluid. |
| `.map-btn` | Zoom buttons. Styled with glassmorphism (transparent/blur). |
| `.visited-path` | SVG Path class for visited countries. |

### Layout Behavior
The map uses a **Smart Fluid Breakout** strategy:
- **Mobile**: 100% width of the content container.
- **Desktop**: Expands up to 1280px and centers in the viewport, breaking out of narrow text columns if necessary.

-----

## 💡 Advanced behavior

### Performance
The rendering uses `requestAnimationFrame` and CSS transforms (`translate3d`) to ensure 60fps performance even on lower-end devices. Assets are lightweight SVGs.

