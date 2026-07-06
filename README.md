# Despical Javadocs

Central GitHub Pages site for Despical project Javadocs.

Published URLs:

- `https://javadoc.despical.dev/tnt-run/`
- `https://javadoc.despical.dev/command-framework/`

## How it works

The workflow in `.github/workflows/deploy.yml` clones each project's `javadoc` branch, copies the generated Javadoc files into `public/<project>/`, writes the custom domain file, and deploys the result with GitHub Pages.

Projects are configured in `projects.json`.

## Setup

1. Push this repository to GitHub.
2. In the repository settings, open **Pages** and set **Source** to **GitHub Actions**.
3. Set the custom domain to `javadoc.despical.dev`.
4. Add a DNS `CNAME` record:

   ```text
   javadoc.despical.dev -> <your-github-username>.github.io
   ```

The workflow runs on pushes to `main`, manually from GitHub Actions, and once per day.

## Adding another project

Add a new entry to `projects.json`:

```json
{
  "slug": "ProjectName",
  "title": "ProjectName",
  "repo": "https://github.com/Despical/ProjectName.git",
  "branch": "javadoc"
}
```
