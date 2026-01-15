# Usage & Configuration

This module provides the `world-map` shortcode for Hugo. It renders an interactive SVG world map that automatically highlights visited countries based on your content's taxonomies.

## 🟢 Basic Usage

To display the map, simply insert the shortcode in any markdown file. The map acts as a "canvas" that pulls data from your site's taxonomy terms (specifically `destinationen` or `destinations`).

```go
{{< world-map >}}
```

### How it works
1. The module scans your taxonomy terms (e.g. `content/destinationen/albanien/_index.md`).
2. It matches the term title (e.g., "Albanien") to an ISO code using `data/country_map.yaml` (optional custom mapping) or `data/iso_map.json` (built-in English names).
3. If a match is found (e.g. "AL"), that country is colored on the map.
4. Clicking the country navigates to the taxonomy term page.

-----

## 🌍 Configuration

Required data files in your project or the module default:

### 1. `data/country_map.yaml` (Optional but Recommended)
Use this to map your specific taxonomy term titles (especially if they are not English) to ISO-2 codes.
Example:

```yaml
Albanien: "AL"
Griechenland: "GR"
Turkey: "TR"
```

### 2. `data/iso_map.json` (Included)
Contains standard English Name -> ISO mappings.

-----

## 🎨 Customization

The map is styled via CSS which is embedded in the shortcode, but scoped to `.travel-map-wrapper`. You can override these styles in your site's CSS.

### CSS Classes

| Class | Description |
| :--- | :--- |
| `.travel-map-wrapper` | The main container. Default height is `600px`. |
| `.visited-path` | SVG Path class for visited countries. |
| `#tt` | The tooltip element. |

### Example Override

 To make the map smaller:

```css
.travel-map-wrapper {
    height: 400px !important;
}
```

-----

## 💡 Advanced behavior

### Mobile Support
The map supports **Pinch-to-Zoom** and **Pan** gestures natively on mobile devices. It captures pointer events to provide a smooth "Google Maps-like" experience without interfering with page scrolling (unless you are dragging the map).

### Performance
The rendering uses `requestAnimationFrame` and CSS transforms (`translate3d`) to ensure 60fps performance even on lower-end devices.

