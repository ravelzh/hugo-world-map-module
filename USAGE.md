# Usage & Configuration

## Basic Usage

```go
{{< world-map >}}
```

The map reads taxonomy terms from `destinationen` or `destinations` and highlights the matching countries.

## Shortcode Parameters

You can override settings directly in the shortcode:

```go
{{< world-map width="100%" maxWidth="800px" borderRadius="0" transparent="true" >}}
```

| Parameter | Description | Default |
|-----------|-------------|---------|
| `width` | CSS width | `calc(100vw - 4rem)` |
| `maxWidth` | Maximum width | `1024px` |
| `borderRadius` | Corner radius | `8px` |
| `transparent` | Transparent background | `false` |
| `dropShadow` | Enable map drop-shadow | `false` |
| `backgroundLight` | Light mode background | `#f0f9ff` |
| `backgroundDark` | Dark mode background | `#1f2937` |
| `mapFillLight` | Light mode country color | `#cbd5e1` |
| `mapFillDark` | Dark mode country color | `#374151` |
| `mapStroke` | Country border color | `white` |

## Hugo Configuration

All shortcode parameters can also be set globally:

```toml
# hugo.toml
[taxonomies]
  destinationen = "destinationen"

[module]
  [[module.imports]]
    path = "github.com/ravelzh/hugo-world-map-module"

[params.worldMap]
  # Size & Layout
  width = "100%"
  maxWidth = "1024px"
  borderRadius = "8px"
  
  # Colors
  backgroundLight = "#f0f9ff"
  backgroundDark  = "#1f2937"
  mapFillLight    = "#cbd5e1"
  mapFillDark     = "#374151"
  mapStroke       = "white"
  transparent     = false
  dropShadow      = false
```

## Country Mapping

The module maps your taxonomy terms to ISO country codes.

**Built-in mappings** include German & English names:
- "Albanien" → AL
- "Deutschland" → DE
- "Schweiz" → CH

### Custom mappings

Override in `data/country_map.yaml`:

```yaml
"Mein Land": "XX"
```

## i18n (Translations)

Customize the "Visited" tooltip label:

`i18n/de.toml`:
```toml
[world_map_visited]
other = "BEREIST"
```

## CSS Classes

| Class | Description |
|-------|-------------|
| `.wm-wrapper` | Main container |
| `.wm-visited` | Visited country path |
| `.wm-tooltip` | Tooltip element |
| `.wm-btn` | Zoom buttons |

## Performance

- Lazy loading via Intersection Observer
- GPU-accelerated transforms
- 60fps rendering with requestAnimationFrame
