import {cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from "node:fs";
import {join} from "node:path";

const root = process.cwd();
const publicDir = join(root, "public");
const manifestPath = join(root, ".javadocs-manifest.json");
const projects = JSON.parse(readFileSync(join(root, "projects.json"), "utf8"));
const previousManifest = readPreviousManifest();
const currentSlugs = projects.map((project) => project.slug);

for (const slug of previousManifest.slugs ?? []) {
    if (!currentSlugs.includes(slug)) {
        rmSync(join(root, slug), {recursive: true, force: true});
    }
}

for (const slug of currentSlugs) {
    const source = join(publicDir, slug);
    const target = join(root, slug);

    if (!existsSync(source)) {
        throw new Error(`Missing generated Javadoc directory: public/${slug}`);
    }

    rmSync(target, {recursive: true, force: true});
    copyDirectoryContents(source, target);
}

for (const file of ["index.html", ".nojekyll", "CNAME", "favicon.svg"]) {
    const target = join(root, file);
    rmSync(target, {force: true});
    cpSync(join(publicDir, file), target, {force: true});
}

writeFileSync(manifestPath, `${JSON.stringify({slugs: currentSlugs}, null, 2)}\n`);

function readPreviousManifest() {
    if (!existsSync(manifestPath)) {
        return {
            slugs: ["TNTRun", "CommandFramework"]
        };
    }

    return JSON.parse(readFileSync(manifestPath, "utf8"));
}

function copyDirectoryContents(source, target) {
    mkdirSync(target, {recursive: true});

    for (const entry of readdirSync(source, {withFileTypes: true})) {
        const sourcePath = join(source, entry.name);
        const targetPath = join(target, entry.name);

        if (entry.isDirectory()) {
            copyDirectoryContents(sourcePath, targetPath);
        } else {
            cpSync(sourcePath, targetPath, {force: true});
        }
    }
}
