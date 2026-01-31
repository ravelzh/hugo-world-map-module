# Usage & Configuration

## Basic Usage

Add the shortcode to any page:

```go
{{< world-map >}}
```

The map automatically reads taxonomy terms from `destinations` (or `destinationen`) and highlights matching countries.

## Shortcode Parameters

You can override settings directly in the shortcode:

```go
{{< world-map width="100%" maxWidth="800px" transparent="true" dropShadow="true" >}}
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `transparent` | Bool | `false` | Removes background and border. |
| `dropShadow` | Bool | `false` | Adds a drop-shadow (ideal for transparent mode). |
| `width` | String | `calc(100vw - 4rem)` | Map width. |
| `maxWidth` | String | `1024px` | Maximum width constraint. |
| `borderRadius` | String | `8px` | Corner radius (if border is visible). |
| `mapStrokeLight` | Color | `black` | Border color in Light Mode. |
| `mapStrokeDark` | Color | `white` | Border color in Dark Mode. |
| `mapFillLight` | Color | `#cbd5e1` | Country fill color (Light). |
| `mapFillDark` | Color | `#374151` | Country fill color (Dark). |
| `taxonomies` | String | `destinations` | Comma-separated taxonomies. |

## Hugo Configuration

Settings can be defined globally in `hugo.toml`:

```toml
[params.worldMap]
  # Layout
  width = "100%"
  maxWidth = "1024px"
  # Colors
  transparent = false
  dropShadow = false
  mapStrokeLight = "black"
  mapStrokeDark = "white"
  # Data
  taxonomies = ["destinationen", "destinations"] # Default taxonomies to scan
```

## Configuration Example

To display visited countries using a custom taxonomy (e.g., "land"):

1. **Configure Hugo (`hugo.toml`):**
   ```toml
   [taxonomies]
     land = "land"

   [params.worldMap]
     taxonomies = ["land"]
   ```

2. **Add Content:**
   In your content file (e.g., `content/posts/morocco-trip.md`):
   ```yaml
   ---
   title: "My Trip to Morocco"
   land: ["Morocco"] # Must match the country name or mapped name
   ---
   ```

## Country Mapping

The module maps taxonomy terms to ISO codes.

- **Standard:** Built-in English/German names (e.g., "Switzerland", "Schweiz" -> CH).
- **Custom:** Override in `data/country_map.yaml`:
  ```yaml
  "My Custom Name": "CH"
  ```

## i18n (Translations)

Customize the tooltip label (default: "Visited").

`i18n/de.toml`:
```toml
[world_map_visited]
other = "BEREIST"
```

## CSS Classes

For advanced styling via custom CSS:

| Class | Description |
|-------|-------------|
| `.wm-wrapper` | Main container |
| `.wm-visited` | Visited country path |
| `.wm-tooltip` | Tooltip element |
| `.wm-btn` | Zoom buttons |
