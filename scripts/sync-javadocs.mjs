import {cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import {tmpdir} from "node:os";
import {execFileSync} from "node:child_process";

const root = process.cwd();
const siteDir = join(root, "public");
const projects = JSON.parse(readFileSync(join(root, "projects.json"), "utf8"));

rmSync(siteDir, {recursive: true, force: true});
mkdirSync(siteDir, {recursive: true});
writeFileSync(join(siteDir, ".nojekyll"), "");
writeFileSync(join(siteDir, "CNAME"), "javadoc.despical.dev\n");
cpSync(join(root, "favicon.svg"), join(siteDir, "favicon.svg"), {force: true});

for (const project of projects) {
    validateProject(project);

    const tempDir = join(tmpdir(), `javadoc-${project.slug}-${Date.now()}`);
    const targetDir = join(siteDir, project.slug);

    console.log(`Cloning ${project.repo}#${project.branch}`);
    execFileSync("git", [
        "clone",
        "--depth",
        "1",
        "--branch",
        project.branch,
        project.repo,
        tempDir
    ], {stdio: "inherit"});

    mkdirSync(targetDir, {recursive: true});
    copyDirectoryContents(tempDir, targetDir, [".git", ".github", "CNAME"]);

    rmSync(tempDir, {recursive: true, force: true});

    if (!existsSync(join(targetDir, "index.html"))) {
        throw new Error(`${project.slug} did not contain an index.html in ${project.branch}`);
    }
}

writeFileSync(join(siteDir, "index.html"), renderIndex(projects));

function validateProject(project) {
    const missing = ["slug", "title", "repo", "branch"].filter((key) => !project[key]);
    if (missing.length > 0) {
        throw new Error(`Invalid project entry. Missing: ${missing.join(", ")}`);
    }
}

function renderIndex(projects) {
    const links = projects.map((project) => `
      <li data-href="./${escapeHtml(project.slug)}/">
        <a class="project-title" href="./${escapeHtml(project.slug)}/">${escapeHtml(project.title)}</a>
        <div class="project-links">
          <a class="icon-link footer-link-icon" href="${escapeHtml(project.repo.replace(/\.git$/, ""))}" target="_blank" aria-label="${escapeHtml(project.title)} on GitHub" title="GitHub">
            <img src="./assets/icons/github.svg" alt="" width="20" height="20">
          </a>${project.spigot ? `
          <a class="icon-link footer-link-icon" href="${escapeHtml(project.spigot)}" target="_blank" aria-label="${escapeHtml(project.title)} on SpigotMC" title="SpigotMC">
            <img src="./assets/icons/spigot.svg" alt="" width="20" height="20">
          </a>` : ""}${project.builtbybit ? `
          <a class="icon-link footer-link-icon" href="${escapeHtml(project.builtbybit)}" target="_blank" aria-label="${escapeHtml(project.title)} on BuiltByBit" title="BuiltByBit">
            <img src="./assets/icons/builtbybit.svg" alt="" width="20" height="20">
          </a>` : ""}
        </div>
      </li>`).join("");

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Despical's Javadocs</title>
  <meta name="description" content="Central website for generated API documentation for Despical's open source projects.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://javadoc.despical.dev/">
  <meta property="og:title" content="Despical's Javadocs">
  <meta property="og:description" content="Central website for generated API documentation for Despical's open source projects.">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Despical's Javadocs">
  <meta name="twitter:description" content="Central website for generated API documentation for Despical's open source projects.">
  <link rel="icon" href="./favicon.svg" type="image/svg+xml">
  <style>
    :root {
      --canvas: #141618;
      --paper: rgba(28, 32, 37, 0.92);
      --paper-strong: #1b1f25;
      --ink: #eef2f5;
      --muted: #aab4bd;
      --line: rgba(255, 255, 255, 0.1);
      --accent: #7cc7ff;
      --sans: "Segoe UI", "Trebuchet MS", ui-sans-serif, system-ui, sans-serif;
      --display: Bahnschrift, "Segoe UI", ui-sans-serif, system-ui, sans-serif;
      color-scheme: dark;
      font-family: var(--sans);
      background: var(--canvas);
      color: var(--ink);
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: linear-gradient(180deg, #171a1e 0%, #111316 100%);
    }

    main {
      width: min(940px, calc(100vw - 40px));
      padding: 56px 0;
    }

    h1 {
      margin: 0 0 12px;
      font-family: var(--display);
      font-size: clamp(2rem, 5vw, 4rem);
      line-height: 1;
    }

    p {
      margin: 0 0 32px;
      color: #c8d6e3;
      font-size: 1rem;
    }

    ul {
      display: grid;
      gap: 12px;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 16px 18px;
      background: var(--paper);
      transition: background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
      cursor: pointer;
    }

    li:hover,
    li:focus-within {
      border-color: rgba(124, 199, 255, 0.34);
      background: linear-gradient(180deg, rgba(124, 199, 255, 0.08), rgba(255, 255, 255, 0.03)), var(--paper);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.24), 0 0 0 4px rgba(124, 199, 255, 0.05);
      transform: translateY(-1px);
    }

    a {
      color: var(--accent);
      font-size: 1.08rem;
      font-weight: 700;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .project-title {
      min-width: 0;
    }

    .project-links {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 0 0 auto;
    }

    .project-links .icon-link {
      opacity: 0;
      pointer-events: none;
    }

    li:hover .project-links .icon-link,
    li:focus-within .project-links .icon-link {
      opacity: 1;
      pointer-events: auto;
    }

    .icon-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      width: 42px;
      height: 42px;
      min-width: 42px;
      min-height: 42px;
      overflow: hidden;
      line-height: 1;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.03);
      text-decoration: none;
      transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;
    }

    .icon-link:hover {
      border-color: rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-1px);
      text-decoration: none;
    }

    .icon-link img {
      display: block;
      width: 18px;
      height: 18px;
      object-fit: contain;
    }

    .site-footer {
      margin-top: 28px;
      padding-top: 8px;
      display: grid;
      gap: 16px;
    }

    .footer-separator {
      width: 100%;
      height: 1px;
      background: var(--line);
    }

    .footer-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
    }

    .footer-copy {
      color: #c8d6e3;
      font-size: 0.95rem;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }

    .footer-links {
      display: flex;
      align-items: center;
      justify-content: end;
      flex-wrap: wrap;
      gap: 10px;
    }

    .footer-link-icon {
      color: var(--muted);
    }

    .footer-link-icon:hover,
    .footer-link-icon:focus-visible {
      color: var(--ink);
    }

    @media (max-width: 640px) {
      main {
        width: min(940px, calc(100% - 24px));
        padding: 36px 0;
      }

      li,
      .footer-meta {
        align-items: flex-start;
        flex-direction: column;
      }

      li {
        gap: 14px;
        padding: 18px;
      }

      .project-title {
        font-size: 1rem;
      }

      .project-links {
        align-self: stretch;
        justify-content: flex-end;
      }

      .project-links .icon-link {
        opacity: 1;
        pointer-events: auto;
      }

      .site-footer {
        padding: 0;
        gap: 12px;
      }

      .footer-meta {
        width: 100%;
        gap: 14px;
        padding: 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.03);
      }

      .footer-links {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .footer-copy {
        width: 100%;
        text-align: center;
        font-size: 0.9rem;
        line-height: 1.6;
        white-space: normal;
      }

      .footer-links .footer-link-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: 0;
        min-height: 42px;
        padding: 10px 12px;
        border-radius: 999px;
      }

      .footer-links .footer-link-icon:first-child {
        grid-column: 1 / -1;
      }
    }
  </style>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-5EBQ47EQRX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "G-5EBQ47EQRX");
  </script>
</head>
<body>
  <main>
    <h1>Despical's Javadocs</h1>
    <p>Generated API documentation for Despical's open source projects.</p>
    <ul>${links}
    </ul>
    <footer class="site-footer">
      <div class="footer-separator"></div>
      <div class="footer-meta">
        <div class="footer-copy">© 2026 Berke "Despical" Akçen</div>
        <nav class="footer-links" aria-label="Footer links">
          <a class="icon-link footer-link-icon" href="https://github.com/Despical" aria-label="GitHub" title="GitHub">
            <img src="./assets/icons/github.svg" alt="" width="18" height="18">
          </a>
          <a class="icon-link footer-link-icon" href="https://www.spigotmc.org/resources/authors/despical.615094/" aria-label="SpigotMC" title="SpigotMC">
            <img src="./assets/icons/spigot.svg" alt="" width="18" height="18">
          </a>
          <a class="icon-link footer-link-icon" href="https://builtbybit.com/creators/despical.257098/" aria-label="BuiltByBit" title="BuiltByBit">
            <img src="./assets/icons/builtbybit.svg" alt="" width="18" height="18">
          </a>
          <a class="icon-link footer-link-icon" href="https://buymeacoffee.com/despical" aria-label="Buy Me a Coffee" title="Buy Me a Coffee">
            <img src="./assets/icons/buymeacoffee.svg" alt="" width="18" height="18">
          </a>
          <a class="icon-link footer-link-icon" href="https://patreon.com/despical" aria-label="Patreon" title="Patreon">
            <img src="./assets/icons/patreon.svg" alt="" width="18" height="18">
          </a>
        </nav>
      </div>
    </footer>
  </main>
  <script>
    for (const card of document.querySelectorAll("[data-href]")) {
      card.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
          return;
        }

        window.location.href = card.dataset.href;
      });
    }
  </script>
</body>
</html>
`;
}

function copyDirectoryContents(source, target, ignored = []) {
    mkdirSync(target, {recursive: true});

    for (const entry of readdirSync(source, {withFileTypes: true})) {
        if (ignored.includes(entry.name)) {
            continue;
        }

        const sourcePath = join(source, entry.name);
        const targetPath = join(target, entry.name);

        if (entry.isDirectory()) {
            copyDirectoryContents(sourcePath, targetPath);
        } else {
            cpSync(sourcePath, targetPath, {force: true});
        }
    }
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
