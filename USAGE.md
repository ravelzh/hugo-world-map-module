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
