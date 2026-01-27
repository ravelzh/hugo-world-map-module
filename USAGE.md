# Usage & Configuration

## Basic Usage

```go
{{< world-map >}}
```

The map reads taxonomy terms from `destinationen` or `destinations` and highlights the matching countries.

## Hugo Configuration

```toml
# hugo.toml
[taxonomies]
  destinationen = "destinationen"

[module]
  [[module.imports]]
    path = "github.com/ravelzh/hugo-world-map-module"
```

## Country Mapping

The module maps your taxonomy terms to ISO country codes.

**Built-in mappings** include German & English names:
- "Albanien" → AL
- "Deutschland" → DE
- "Schweiz" → CH
- etc.

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

`i18n/en.toml`:
```toml
[world_map_visited]
other = "Visited"
```

## CSS Classes

| Class | Description |
|-------|-------------|
| `.wm-wrapper` | Main container |
| `.wm-visited` | Visited country path |
| `.wm-tooltip` | Tooltip element |
| `.wm-btn-zoom-in/out` | Zoom buttons |

## Performance

- Lazy loading via Intersection Observer
- GPU-accelerated transforms
- 60fps rendering with requestAnimationFrame
