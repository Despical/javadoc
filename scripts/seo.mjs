import {readdirSync, readFileSync, writeFileSync} from "node:fs";
import {join, relative} from "node:path";

const origin = "https://javadoc.despical.dev/";

export function writeSeo(siteDir, projects, documentationDir = siteDir) {
    const urls = new Set([origin]);
    for (const project of projects) {
        collect(join(documentationDir, project.slug));
    }
    const entries = [...urls].sort().map((url) => `  <url><loc>${url.replaceAll("&", "&amp;")}</loc></url>`);
    writeFileSync(join(siteDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`);
    writeFileSync(join(siteDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}sitemap.xml\n`);
    return urls.size;

    function collect(directory) {
        for (const entry of readdirSync(directory, {withFileTypes: true})) {
            const file = join(directory, entry.name);
            if (entry.isDirectory()) {
                if (!["class-use", "index-files", "legal", "resources", "script-dir", "script-files"].includes(entry.name)) collect(file);
                continue;
            }
            // Include documentation, not duplicate use indexes or navigation pages.
            if (!/^(?:[A-Z].*|index|overview-summary|package-summary|module-summary)\.html$/.test(entry.name)) continue;
            const page = readFileSync(file, "utf8");
            if (/index-redirect-page|IndexRedirectWriter/.test(page)) continue;
            const path = relative(documentationDir, file).replaceAll("\\", "/").replace(/index\.html$/, "");
            urls.add(new URL(path, origin).href);
        }
    }
}
