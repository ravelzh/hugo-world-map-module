# World Map for Hugo

Interactive SVG world map module for Hugo. Automatically highlights visited countries based on taxonomy terms.

**Demo:** [go-offroad.ch/map](https://go-offroad.ch/map)

## Features

- 🚀 **High Performance:** GPU-accelerated, lazy loading, optimized with Hugo Pipes (minified CSS/JS).
- 📱 **Mobile Ready:** Touch-friendly pinch-to-zoom and panning.
- 🎨 **Themable:** Native Dark Mode support and transparent backgrounds.
- 🔗 **Smart Linking:** Auto-links countries to your content pages.

## Installation

**Requirements:** Hugo Extended v0.120.0+ (Golang 1.20+)

### 1. Add Module

Add to your `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/ravelzh/hugo-world-map-module"

[taxonomies]
  destinations = "destinations"  # English
  # OR: destinationen = "destinationen"  # German
```

### 2. Download

```bash
hugo mod get -u
hugo mod tidy
```

## Usage

Simply add the shortcode to any page:

```go
{{< world-map >}}
```

### Customization

You can configure the map via `hugo.toml` (global) or shortcode parameters (page-specific).

#### Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `transparent` | Bool | `false` | Removes background and border. |
| `dropShadow` | Bool | `false` | Adds a drop-shadow (ideal for transparent mode). |
| `width` | String | `calc(100vw - 4rem)` | Map width. |
| `maxWidth` | String | `1024px` | Maximum width constraint. |
| `mapStrokeLight` | Color | `black` | Border color in Light Mode. |
| `mapStrokeDark` | Color | `white` | Border color in Dark Mode. |
| `mapFillLight` | Color | `#cbd5e1` | Country fill color (Light). |
| `mapFillDark` | Color | `#374151` | Country fill color (Dark). |

#### Example: Transparent & Shadow

```go
{{< world-map transparent="true" dropShadow="true" >}}
```

#### Global Config (hugo.toml)

```toml
[params.worldMap]
  transparent = true
  dropShadow = true
  mapStrokeLight = "#333"
  mapStrokeDark = "#eee"
```

## Content Mapping

The map looks for terms in `destinationen` or `destinations`.

**Example Content (`content/trips/albania.md`):**
```yaml
---
title: "Trip to Albania"
destinationen: ["Albanien"]
---
```
*Result:* Albania is highlighted and linked.

**Mappings:**
- Standard: English/German names are built-in (e.g., "Switzerland", "Schweiz" -> CH).
- Custom: Add to `data/country_map.yaml`:
  ```yaml
  "My Custom Name": "CH"
  ```

## License

Apache License 2.0 - [LICENSE](LICENSE)
