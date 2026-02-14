import { render, applyTheme, applySidebarState } from "./ui.js";
import { renderSidebar, renderTheme, initSidebar, submitForm } from "./events.js";
import { loadState } from "./storage.js";

const sidebar = document.querySelector("#sidebar");
const sidebarToggles = document.querySelectorAll(".sidebar-toggle");
const header = document.querySelector("header")
const main = document.querySelector("#main");
const body = document.querySelector("body");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#themeIcon");
const searchForm = document.querySelector("#searchForm");


loadState()
render(main);
applyTheme(themeIcon)
if (window.innerWidth <= 760) {
    document.querySelector("header").classList.add("collapsed");
}
applySidebarState(header);

renderSidebar(sidebar, main);
initSidebar(sidebarToggles, header);
// Toggle dark mode
renderTheme(themeToggle, themeIcon)

// validate and submit form
submitForm()

// Expand sidebar when search form is clicked
searchForm.addEventListener("click", () => {
    if (header.classList.contains("collapsed")) {
        header.classList.remove("collapsed");
        searchForm.querySelector("input").focus();
    }
})
