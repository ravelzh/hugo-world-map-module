# Hugo World Map Module

A modern, high-performance, and interactive SVG world map module for Hugo websites. It visualizes visited countries based on your taxonomy terms.

Map Preview: [go-offroad.ch](https://go-offroad.ch)

## 🌟 Features

* **🚀 High Performance:** Uses `requestAnimationFrame`, lazy loading via Intersection Observer, and optimized CSS transforms for 60fps rendering.
* **📱 Mobile Optimized:** Native-like **Pinch-to-Zoom** and **Pan** with smart scroll passthrough.
* **🔗 Content Integrated:** Automatically links taxonomy terms (Destinations) to map countries.
* **🎨 Sharp & Clean:** Vector-based (SVG) rendering that stays crisp at any zoom level.
* **🔒 Privacy:** Self-hosted SVG, no external tracking or API calls.
* **⚡ Lazy Loading:** Map initializes only when scrolled into viewport.

## Demo
A live demo is available at [go-offroad.ch/map](https://go-offroad.ch/map).

## 📦 Installation

This project is packaged as a Hugo Module.

### 1. Initialize your project (if not already done)
If your Hugo project is not yet a Go module, initialize it:
```bash
hugo mod init github.com/your-username/your-project-name
````

### 2. Add the Module

Add the following to your site configuration file:

**`hugo.toml`**

```toml
[module]
  [[module.imports]]
    path = "github.com/ravelzh/hugo-world-map-module"
```

**OR `config.yaml`**

```yaml
module:
  imports:
    - path: github.com/ravelzh/hugo-world-map-module
```

### 3. Download dependencies

Run the following command in your terminal:

```bash
hugo mod get github.com/ravelzh/hugo-world-map-module
hugo mod tidy
```

## 🚀 Quick Start

To display the map, simply use the `world-map` shortcode in your Markdown content.

```go
{{< world-map >}}
```

The map will automatically look for taxonomy terms in `destinationen` or `destinations` and colorize the corresponding countries.

## 📖 Configuration & Usage

The module works out-of-the-box but relies on correct mapping between your content titles and ISO codes.

👉 **[Read the full USAGE documentation here](USAGE.md)**.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ravelzh/hugo-world-map-module/issues).

## 📄 License

Licensed under the Apache License, Version 2.0. - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Martin Vögeli**

- **Demo**: [go-offroad.ch](https://go-offroad.ch)
- **GitHub**: [@ravelzh](https://github.com/ravelzh)
