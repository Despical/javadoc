# Despical's Javadocs

[![](https://github.com/Despical/javadoc/actions/workflows/deploy.yml/badge.svg)](https://github.com/Despical/javadoc/actions/workflows/deploy.yml)
[![Node.js 22](https://img.shields.io/badge/Node.js-22-339933.svg)](https://nodejs.org/)

Central website for generated API documentation for Despical's open source projects.

## Projects

* [TNTRun](https://javadoc.despical.dev/tnt-run/)
* [CommandFramework](https://javadoc.despical.dev/command-framework/)
* [SpigotSalesWebhook](https://javadoc.despical.dev/spigot-sales-webhook/)
* [Commons](https://javadoc.despical.dev/commons/)
* [InventoryFramework](https://javadoc.despical.dev/inventory-framework/)
* [FileItems](https://javadoc.despical.dev/file-items/)

---

## Local Development

Install Node.js 22 or newer, then run:

```powershell
node scripts/sync-javadocs.mjs
node scripts/publish-root.mjs
```

- `sync-javadocs.mjs` reads `projects.json`, clones each configured project's
  `javadoc` branch, and generates the site into `public/`.

- `publish-root.mjs` copies the generated site files from `public/` into the
  GitHub Pages root, including `index.html`, project directories, `CNAME`, and
  `favicon.svg`.

To preview local changes, open `index.html` in a browser after regenerating it.

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
