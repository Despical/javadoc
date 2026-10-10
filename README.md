# Despical's Javadocs

[![](https://github.com/Despical/javadoc/actions/workflows/deploy.yml/badge.svg)](https://github.com/Despical/javadoc/actions/workflows/deploy.yml)
[![Node.js 22](https://img.shields.io/badge/Node.js-22-339933.svg)](https://nodejs.org/)

Central website for generated API documentation for Despical's open source projects.

## Projects

* [TNTRun](https://javadoc.despical.dev/tnt-run/)
* [WhackMe](https://javadoc.despical.dev/whack-me/)
* [KOTL](https://javadoc.despical.dev/kotl/)
* [CommandFramework](https://javadoc.despical.dev/command-framework/)
* [SpigotSalesWebhook](https://javadoc.despical.dev/spigot-sales-webhook/)
* [Commons](https://javadoc.despical.dev/commons/)
* [InventoryFramework](https://javadoc.despical.dev/inventory-framework/)
* [FileItems](https://javadoc.despical.dev/file-items/)
* [Particle Text](https://javadoc.despical.dev/particle-text/)
* [Maze Engine](https://javadoc.despical.dev/maze-engine/)
* [MusicBot](https://javadoc.despical.dev/music-bot/)

---

## Local Development

Install Node.js 22 or newer and Java 25, then run:

```powershell
node scripts/sync-javadocs.mjs
node scripts/publish-root.mjs
```

- `sync-javadocs.mjs` reads `projects.json`, clones each configured project
  branch or uses its committed Javadocs when no branch is set, and generates
  the site into `public/`.
  Projects with a `javadoc` configuration generate documentation from their
  source branch using the Gradle wrapper before copying the configured output
  directory. Particle Text, Maze Engine, and MusicBot use this flow to stay up to date with `main`.

- `publish-root.mjs` copies the generated site files from `public/` into the
  GitHub Pages root, including `index.html`, project directories, `CNAME`, and
  `favicon.svg`.

For homepage-only changes, run `node scripts/build-home.mjs`. This updates the
root and `public/` homepage without fetching or replacing any project documentation.
Edit `scripts/homepage.html`, `assets/home.css`, and `assets/home.js` for the design;
project descriptions, categories, and display order live in `projects.json`.
The builders also refresh `sitemap.xml` and `robots.txt` from the actual documentation
pages. Redirect entrypoints and duplicate class-use/navigation indexes are omitted.
`assets/code-examples.js` contains the hero examples and their source references;
`assets/social-icon.png` is the square sharing image based on `favicon.svg`.

Serve the repository with `python -m http.server 4180 --bind 127.0.0.1` and open
`http://127.0.0.1:4180/` to preview the homepage and the existing API references.

---

## Security

We prioritize user privacy and application integrity. Please do not open public issues for discovered vulnerabilities.

Read [SECURITY.md](SECURITY.md) for responsible disclosure reporting.

---

## Contributing

We welcome Pull Requests from the community. To help us maintain clean project history and formatting, please follow these guidelines:

* **No tabs:** Use spaces exclusively for indentation.
* **Style consistency:** Respect the established code architecture and style templates.
* **Version control cleanliness:** Do not increment project version numbers in example configurations within your PR.
* **Minimal diffs:** Disable automated reformat-on-save settings that affect untouched files.

Learn more via our formal [Contribution Guidelines](CONTRIBUTING.md).

---

## License

This project is licensed under the [GPL-3.0 License](http://www.gnu.org/licenses/gpl-3.0.html).
