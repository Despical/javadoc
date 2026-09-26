import {copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import {writeSeo} from "./seo.mjs";
import {renderIndex} from "./render-home.mjs";

const root = process.cwd();
const projects = JSON.parse(readFileSync(join(root, "projects.json"), "utf8"));
const page = renderIndex(projects);
const publicDir = join(root, "public");
mkdirSync(publicDir, {recursive: true});
writeFileSync(join(root, "index.html"), page);
writeFileSync(join(publicDir, "index.html"), page);
copyAssets(join(root, "assets"), join(publicDir, "assets"));
copyFileSync(join(root, "favicon.svg"), join(publicDir, "favicon.svg"));
writeSeo(root, projects);
writeSeo(publicDir, projects, root);
console.log(`Built homepage for ${projects.length} projects without refreshing project documentation.`);

function copyAssets(source, target) {
    mkdirSync(target, {recursive: true});
    for (const entry of readdirSync(source, {withFileTypes: true})) {
        const from = join(source, entry.name);
        const to = join(target, entry.name);
        if (entry.isDirectory()) copyAssets(from, to);
        else copyFileSync(from, to);
    }
}
