import {cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import {tmpdir} from "node:os";
import {execFileSync} from "node:child_process";

const root = process.cwd();
const siteDir = join(root, "public");
const projects = JSON.parse(readFileSync(join(root, "projects.json"), "utf8"));
const generatedAt = new Date().toISOString();

rmSync(siteDir, {recursive: true, force: true});
mkdirSync(siteDir, {recursive: true});
writeFileSync(join(siteDir, ".nojekyll"), "");
writeFileSync(join(siteDir, "CNAME"), "javadoc.despical.dev\n");

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

writeFileSync(join(siteDir, "index.html"), renderIndex(projects, generatedAt));

function validateProject(project) {
    const missing = ["slug", "title", "repo", "spigot", "branch"].filter((key) => !project[key]);
    if (missing.length > 0) {
        throw new Error(`Invalid project entry. Missing: ${missing.join(", ")}`);
    }
}

function renderIndex(projects, generatedAt) {
    const links = projects.map((project) => `
      <li>
        <a href="./${escapeHtml(project.slug)}/">${escapeHtml(project.title)}</a>
        <div class="project-links">
          <a class="icon-link" href="${escapeHtml(project.repo.replace(/\.git$/, ""))}" aria-label="${escapeHtml(project.title)} on GitHub" title="GitHub">
            <img src="./assets/icons/github.svg" alt="" width="20" height="20">
          </a>
          <a class="icon-link" href="${escapeHtml(project.spigot)}" aria-label="${escapeHtml(project.title)} on SpigotMC" title="SpigotMC">
            <img src="./assets/icons/spigot.svg" alt="" width="20" height="20">
          </a>
        </div>
      </li>`).join("");

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Despical Javadocs</title>
  <style>
    :root {
      color-scheme: light dark;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f7f7f4;
      color: #1d2329;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
    }

    main {
      width: min(760px, calc(100vw - 40px));
      padding: 56px 0;
    }

    h1 {
      margin: 0 0 12px;
      font-size: clamp(2rem, 5vw, 4rem);
      line-height: 1;
    }

    p {
      margin: 0 0 32px;
      color: #5a6470;
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
      border: 1px solid #d7d9d6;
      border-radius: 8px;
      padding: 16px 18px;
      background: #ffffff;
    }

    a {
      color: #075f8f;
      font-size: 1.08rem;
      font-weight: 700;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .project-links {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 0 0 auto;
    }

    .icon-link {
      display: inline-grid;
      width: 36px;
      height: 36px;
      place-items: center;
      border: 1px solid #d7d9d6;
      border-radius: 8px;
      color: #1d2329;
      background: #f8fafb;
    }

    .icon-link:hover {
      border-color: #8fcfff;
      background: #eef8ff;
      text-decoration: none;
    }

    .icon-link img {
      display: block;
    }

    footer {
      margin-top: 28px;
      color: #68727d;
      font-size: 0.85rem;
    }

    @media (max-width: 520px) {
      li {
        align-items: flex-start;
        flex-direction: column;
      }

      .project-links {
        align-self: stretch;
      }
    }

    @media (prefers-color-scheme: dark) {
      :root {
        background: #151719;
        color: #f4f0e8;
      }

      p,
      footer {
        color: #aeb6bf;
      }

      li {
        background: #20252a;
        border-color: #39414a;
      }

      a {
        color: #7cc7ff;
      }

      .icon-link {
        border-color: #39414a;
        color: #f4f0e8;
        background: #171b1f;
      }

      .icon-link:hover {
        border-color: #5faee8;
        background: #1b2831;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Despical's Javadocs</h1>
    <p>Generated API documentation for open source Despical projects.</p>
    <ul>${links}
    </ul>
    <footer>Last synced: ${escapeHtml(formatGeneratedAt(generatedAt))}</footer>
  </main>
</body>
</html>
`;
}

function formatGeneratedAt(value) {
    return new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Istanbul",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).format(new Date(value));
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
