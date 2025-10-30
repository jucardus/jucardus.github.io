# The jekyll-relative-links plugin
[ [inicio](https://github.com/jucardus/jucardus.github.io/blob/main/index.md) · [índice](https://github.com/jucardus/jucardus.github.io/blob/main/indice.md) · [etiquetas](https://github.com/jucardus/jucardus.github.io/blob/main/etiquetas.md) · [actividad](https://github.com/jucardus/jucardus.github.io/blob/main/actividad.md) · [compartir](https://x.com/intent/tweet?text=The+jekyll-relative-links+plugin+%E2%80%94+Seg%C3%BAn+Grok%2C+GitHub%2C+Plugins%2C+Plugins+para+GitHub%0A%0A%E2%86%92+https%3A%2F%2Fgithub.com%2Fjucardus%2Fjucardus.github.io%2Fblob%2Fmain%2Ft%2Fh%2Fe%2Fthe-jekyll-ralative-links-plugin.md%0A%0A%23github_jucardus%0A%23plugins_jucardus%0A%23plugins_para_github_jucardus%0A%23segun_grok_jucardus) ]

### Overview

The **jekyll-relative-links** plugin is a popular Jekyll plugin designed to simplify linking between pages in a Jekyll site, particularly when using relative paths in Markdown files. It automatically converts links that point to `.md` (Markdown) files into links to their rendered `.html` equivalents. This is especially useful for sites hosted on GitHub Pages, where the default permalink style (e.g., `permalink: pretty`) strips `.html` extensions from URLs, but raw Markdown links would otherwise point to source files instead of the built output.

Without this plugin, a link like `[My Page](./other-page.md)` in your Markdown would resolve to the raw `.md` file (which might 404 on the live site), rather than the generated `/other-page/` URL. The plugin fixes this by processing links during the build process.

It's maintained by Ben Balter (a GitHub engineer) and is lightweight, with no major dependencies beyond Jekyll itself.

### Key Features

- **Automatic Link Conversion**: Scans Markdown content and rewrites relative links to `.md` files as proper rendered URLs (e.g., `./other-page.md` → `/other-page/`).
- **Support for Collections and Posts**: When enabled, it handles links from posts or custom collections (e.g., `_my_collection/item.md`).
- **Liquid Filter**: Provides a `rellinks` filter for use in Liquid templates. This can process content that's already been run through Jekyll's `markdownify` filter, converting links in HTML output.
  - Example: `{{ content | markdownify | rellinks }}`
- **Configuration Options**: Highly customizable via your `_config.yml` file under the `relative_links` key.
  - `enabled: false` to disable globally.
  - `collections: true` to include collection items.
  - `posts: true` to include blog posts.
- **GitHub-Flavored Markdown Compatibility**: Ensures links work in both the built site and GitHub's preview of raw Markdown files.

### Installation

1. **Add to Gemfile** (recommended for bundling):
   ```
   group :jekyll_plugins do
     gem "jekyll-relative-links"
   end
   ```
   Then run `bundle install`.

2. **For Older Jekyll Versions** (< 3.5.0): Use the `gems` key in `_config.yml` instead of `plugins`:
   ```
   gems:
     - jekyll-relative-links
   ```

3. **For GitHub Pages**: Since GitHub Pages supports a limited set of plugins, this one is whitelisted and works out-of-the-box—just add it to your Gemfile.

The latest version (as of recent releases) is 0.7.0, available on RubyGems.

### Usage Examples

- **Basic Markdown Link**:
  In `index.md`:
  ```
  [Link to about page](./about.md)
  ```
  With the plugin: Renders as `<a href="/about/">Link to about page</a>`.

- **With Fragments/Titles**:
  ```
  [Section](#header)
  [Link with title](./about.md "About Us")
  ```
  The plugin preserves fragments (`#header`) and titles.

- **In Liquid**:
  ```
  {% assign processed_content = page.content | markdownify | rellinks %}
  {{ processed_content }}
  ```

- **Configuration in `_config.yml`**:
  ```
  plugins:
    - jekyll-relative-links

  relative_links:
    enabled: true
    collections: true
  ```

### Limitations and Notes

- It only processes relative links (not absolute or external ones).
- Works best with `permalink: pretty` or similar styles that omit `.html`.
- For links in excerpts or already-processed content, use the `rellinks` filter explicitly.
- There's a separate, unrelated plugin by thomedes with a similar name, which focuses on Liquid macros for relative paths—stick to Ben Balter's version for the standard use case.

### Recent Updates

The plugin is actively maintained. The latest release (v0.7.0) includes fixes for:
- Links with titles but no fragments.
- Relative links in excerpts.

For full details, check the official GitHub repository: [benbalter/jekyll-relative-links](https://github.com/benbalter/jekyll-relative-links). If you're building a site with internal cross-links, this plugin saves a ton of manual URL maintenance! If you have a specific setup or issue, feel free to share more details.

~ Grok ~

[#github](https://github.com/jucardus/jucardus.github.io/blob/main/g/i/github.md)  
[#plugins-para-github](https://github.com/jucardus/jucardus.github.io/blob/main/p/l/plugins-para-github.md)  
[#plugins](https://github.com/jucardus/jucardus.github.io/blob/main/p/l/plugins.md)  
[#segun-grok](https://github.com/jucardus/jucardus.github.io/blob/main/s/e/segun-grok.md)
