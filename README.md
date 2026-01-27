# Hugo World Map Module

Interactive SVG world map for Hugo. Highlights visited countries based on taxonomy terms.

**Demo:** [go-offroad.ch/map](https://go-offroad.ch/map)

## Features

- 🚀 Lazy loading & 60fps performance
- 📱 Pinch-to-zoom & pan on mobile
- 🔗 Auto-links taxonomy terms to countries
- 🎨 Sharp SVG at any zoom level
- 🔒 Self-hosted, no tracking

## Installation

### 1. Add the module

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/ravelzh/hugo-world-map-module"

[taxonomies]
  destinationen = "destinationen"  # German
  # OR: destinations = "destinations"  # English
```

### 2. Download

```bash
hugo mod get -u
hugo mod tidy
```

## Usage

```go
{{< world-map >}}
```

The map automatically finds taxonomy terms in `destinationen` or `destinations` and colors the matching countries.

### Create content with destinations

```markdown
---
title: "Albania Trip"
destinationen:
  - Albanien
---
```

The module maps "Albanien" → ISO code "AL" → colors Albania on the map.

## Configuration

See [USAGE.md](USAGE.md) for:
- Custom country mappings
- i18n translations
- CSS customization

## License

Apache License 2.0 - [LICENSE](LICENSE)

**Author:** Martin Vögeli ([@ravelzh](https://github.com/ravelzh))
