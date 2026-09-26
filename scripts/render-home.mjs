import {readFileSync} from "node:fs";

const template = readFileSync(new URL("./homepage.html", import.meta.url), "utf8");
const categories = ["Frameworks", "Libraries", "Plugins", "Tools"];
const categoryLabels = {Frameworks: "Framework", Libraries: "Library", Plugins: "Plugin", Tools: "Tool"};

export function renderIndex(projects) {
    const ordered = [...projects].sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
    const cards = ordered.map((project) => {
        const slug = escapeHtml(project.slug);
        const title = escapeHtml(project.title);
        const category = categories.includes(project.category) ? project.category : "Tools";
        const projectIcon = project.icon ? `<img class="project-logo" src="${escapeHtml(project.icon)}" width="42" height="42" alt="">` : `<span class="project-symbol" aria-hidden="true">${escapeHtml(project.monogram ?? "{}")}</span>`;
        const external = (href, label, icon) => `<a class="source-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" aria-label="${title} on ${label}" title="${label}"><img src="./assets/icons/${icon}.svg" width="16" height="16" alt=""><span>${label}</span></a>`;
        return `<article class="project-card" data-category="${category}" data-search="${escapeHtml(`${project.title} ${project.description ?? ""} ${category}`.toLowerCase())}">
            <div class="card-top">${projectIcon}<span class="category-label">${categoryLabels[category]}</span></div>
            <h3><a class="project-title" href="./${slug}/">${title}</a></h3>
            <p class="project-description">${escapeHtml(project.description ?? "Explore the API documentation for this project.")}</p>
            <div class="card-bottom"><a class="reference-link" href="./${slug}/" aria-label="Open ${title} API reference">API reference <svg aria-hidden="true"><use href="#arrow-right"/></svg></a><div class="project-sources">${external(project.repo.replace(/\.git$/, ""), "GitHub", "github")}${project.spigot ? external(project.spigot, "SpigotMC", "spigot") : ""}${project.builtbybit ? external(project.builtbybit, "BuiltByBit", "builtbybit") : ""}${project.modrinth ? external(project.modrinth, "Modrinth", "modrinth") : ""}</div></div>
        </article>`;
    }).join("\n");
    const filters = categories.filter((category) => projects.some((p) => p.category === category)).map((category) => `<button class="filter" type="button" data-filter="${category}" aria-pressed="false">${category}<span>${projects.filter((p) => p.category === category).length}</span></button>`).join("\n");
    const structuredData = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Javadocs | Despical",
        url: "https://javadoc.despical.dev/",
        description: "API references for Despical's Java libraries, frameworks, and Minecraft plugins.",
        inLanguage: "en",
        author: {"@type": "Person", name: "Berke Akçen", alternateName: "Despical", url: "https://github.com/Despical"},
        mainEntity: {"@type": "ItemList", itemListElement: ordered.map((project, index) => ({
            "@type": "ListItem", position: index + 1, name: project.title,
            url: `https://javadoc.despical.dev/${project.slug}/`
        }))}
    }).replaceAll("<", "\\u003c");
    return template.replace("{{STRUCTURED_DATA}}", structuredData).replaceAll("{{PROJECT_COUNT}}", String(projects.length)).replace("{{FILTERS}}", filters).replace("{{PROJECT_CARDS}}", cards);
}

function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
