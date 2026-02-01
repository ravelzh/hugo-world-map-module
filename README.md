# World Map for Hugo

Interactive SVG world map module for Hugo. Automatically highlights visited countries based on taxonomy terms.

**Demo:** [go-offroad.ch/countries/](https://go-offroad.ch/countries/)

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

# Optional: Configure Taxonomies
[params.worldMap]
  taxonomies = ["destinations", "land"]

[taxonomies]
  destinations = "destinations"
  land = "land" 
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

See [USAGE.md](USAGE.md) for detailed configuration options (Parameters, Colors, Country Mapping).

## Credits

SVG world map from [SimpleMaps](https://simplemaps.com/resources/svg-world) (free for commercial and personal use).

## License

Apache License 2.0 - [LICENSE](LICENSE)

**Author:** Martin Vögeli ([@ravelzh](https://github.com/ravelzh))
