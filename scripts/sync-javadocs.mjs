import {copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import {tmpdir} from "node:os";
import {execFileSync} from "node:child_process";
import {writeSeo} from "./seo.mjs";
import {renderIndex} from "./render-home.mjs";

const root = process.cwd();
const siteDir = join(root, "public");
const projects = JSON.parse(readFileSync(join(root, "projects.json"), "utf8"));

rmSync(siteDir, {recursive: true, force: true});
mkdirSync(siteDir, {recursive: true});
writeFileSync(join(siteDir, ".nojekyll"), "");
writeFileSync(join(siteDir, "CNAME"), "javadoc.despical.dev\n");
copyFileSync(join(root, "favicon.svg"), join(siteDir, "favicon.svg"));
copyDirectoryContents(join(root, "assets"), join(siteDir, "assets"));

for (const project of projects) {
    validateProject(project);

    const targetDir = join(siteDir, project.slug);

    if (project.branch) {
        const tempDir = join(tmpdir(), `javadoc-${project.slug}-${Date.now()}`);

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
    } else {
        const sourceDir = join(root, project.slug);

        if (!existsSync(join(sourceDir, "index.html"))) {
            throw new Error(`${project.slug} did not contain a committed index.html`);
        }

        console.log(`Using committed Javadocs for ${project.slug}`);
        copyDirectoryContents(sourceDir, targetDir);
    }

    if (!existsSync(join(targetDir, "index.html"))) {
        throw new Error(`${project.slug} did not contain an index.html after synchronization`);
    }
}

writeFileSync(join(siteDir, "index.html"), renderIndex(projects));
console.log(`Generated sitemap with ${writeSeo(siteDir, projects)} documentation URLs.`);

function validateProject(project) {
    const missing = ["slug", "title", "repo"].filter((key) => !project[key]);
    if (missing.length > 0) {
        throw new Error(`Invalid project entry. Missing: ${missing.join(", ")}`);
    }
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
            copyFileSync(sourcePath, targetPath);
        }
    }
}
