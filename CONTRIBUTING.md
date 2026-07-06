# Contributing

When contributing to this repository, please first discuss the change you wish
to make via an [issue](https://github.com/Despical/javadoc/issues/new) before
opening a pull request.

Please note that Despical's Javadocs has a [Code of Conduct](CODE_OF_CONDUCT.md).
Follow it in all your interactions with the project.

## Pull Request Process

If you want to help and do not know where to start, check the
[currently opened issues](https://github.com/Despical/javadoc/issues) before
creating a PR.

* Ensure you did not use tabs. Please use spaces for indentation.
* Respect the existing style of the generated index and helper scripts.
* Do not commit unrelated reformatting or generated churn.
* Keep diffs minimal. Disable save actions like full-file reformatting or
  import organization when they touch unrelated files.
* If you change the generated landing page template, regenerate `index.html`
  locally before submitting the change.

## Local Development

Install Node.js 22 or newer, then run:

```powershell
node scripts/sync-javadocs.mjs
node scripts/publish-root.mjs
```

`sync-javadocs.mjs` fetches the configured project Javadocs into `public/`.
`publish-root.mjs` copies the generated site files into the GitHub Pages root.

## Issue Process

When submitting an issue:

* Ensure your issue is not a duplicate.
* Keep the issue focused on this repository's site, scripts, generated output,
  or documentation.
* Include the affected URL, browser, viewport size, or workflow run when useful.
* Use separate issues for unrelated problems.

## Additional Resources

* [General GitHub documentation](https://help.github.com/)
* [GitHub pull request documentation](https://help.github.com/articles/creating-a-pull-request/)
