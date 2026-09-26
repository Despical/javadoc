import {examples, pickExampleIndex} from "./code-examples.js";

function showCodeExample() {
    let previous = null;
    try { previous = localStorage.getItem("javadocs:last-example"); } catch { /* Storage may be unavailable. */ }
    const index = pickExampleIndex(previous, Math.random());
    const example = examples[index];
    try { localStorage.setItem("javadocs:last-example", String(index)); } catch { /* Rendering works without storage. */ }
    document.querySelector(".code-filename").textContent = example.filename;
    const pre = document.querySelector(".code-window pre");
    pre.setAttribute("aria-label", `${example.project}: ${example.label} Java example`);
    pre.dataset.exampleId = example.id;
    const code = pre.querySelector("code");
    code.replaceChildren();
    const lines = example.code.split("\n");
    const blankLines = Math.max(0, 9 - lines.length);
    const topLines = Math.floor(blankLines / 2);
    const displayLines = [
        ...Array(topLines).fill(""),
        ...lines,
        ...Array(blankLines - topLines).fill("")
    ];
    displayLines.forEach((line, index) => {
        const row = document.createElement("span");
        row.className = "code-line";
        const number = document.createElement("span");
        number.className = "line-number";
        number.setAttribute("aria-hidden", "true");
        number.textContent = String(index + 1).padStart(2, "0");
        row.append(number);
        const content = document.createElement("span");
        content.className = "code-text";
        // Highlight tokens with text nodes, so code cannot become HTML.
        const tokens = line.match(/\/\/.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|@[A-Za-z]+|\b(?:import|public|void|new|return|boolean|int|double|true|false)\b|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*|\s+|[^]/g) ?? [];
        for (const token of tokens) {
            const part = document.createElement("span");
            if (token.startsWith("//")) part.className = "syntax-comment";
            else if (/^["']/.test(token) || /^\d/.test(token)) part.className = "syntax-orange";
            else if (token.startsWith("@") || /^(import|public|void|new|return|boolean|int|double|true|false)$/.test(token)) part.className = "syntax-purple";
            else if (/^[A-Z][A-Za-z]+$/.test(token)) part.className = "syntax-blue";
            part.textContent = token;
            content.append(part.className ? part : document.createTextNode(token));
        }
        row.append(content);
        code.append(row);
    });
    const reference = document.querySelector(".code-reference");
    reference.href = example.href;
    const label = reference.querySelector("span");
    const divider = document.createElement("span");
    divider.className = "path-divider";
    divider.textContent = "/";
    const text = document.createElement("span");
    text.append(example.project, divider, example.label);
    label.replaceChildren(text);
}

showCodeExample();

const search = document.querySelector("#project-search");
const cards = [...document.querySelectorAll(".project-card")];
const filters = [...document.querySelectorAll(".filter")];
const count = document.querySelector(".result-count");
const empty = document.querySelector(".empty-state");
let category = "all";

function updateProjects() {
    const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const card of cards) {
        const matches = (category === "all" || card.dataset.category === category) && words.every((word) => card.dataset.search.includes(word));
        card.hidden = !matches;
        if (matches) visible++;
    }
    count.textContent = `${visible} ${visible === 1 ? "project" : "projects"}`;
    empty.hidden = visible !== 0;
    for (const filter of filters) {
        const active = filter.dataset.filter === category;
        filter.classList.toggle("is-active", active);
        filter.setAttribute("aria-pressed", String(active));
    }
}

search.addEventListener("input", updateProjects);
for (const filter of filters) {
    filter.addEventListener("click", () => {
        category = filter.dataset.filter;
        updateProjects();
    });
}
document.querySelector(".reset-filters").addEventListener("click", () => {
    category = "all";
    search.value = "";
    updateProjects();
    search.focus();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !event.target.closest("input,textarea,select,[contenteditable]")) {
        event.preventDefault();
        search.focus();
    }
    if (event.key === "Escape" && document.activeElement === search) {
        search.value = "";
        updateProjects();
    }
});
const backToTop = document.querySelector(".back-to-top");
const updateBackToTop = () => backToTop.classList.toggle("is-visible", window.scrollY > 400);
window.addEventListener("scroll", updateBackToTop, {passive: true});
updateBackToTop();
backToTop.addEventListener("click", () => {
    document.querySelector("#hero-title").focus({preventScroll: true});
    window.scrollTo({top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"});
});
updateProjects();

