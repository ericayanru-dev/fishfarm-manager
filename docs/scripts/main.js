import { state } from "./state.js";
import { render } from "./ui.js";
import { renderSidebar } from "./events.js";

const sidebar = document.querySelector("#sidebar");
const sidebarToggle = document.querySelectorAll(".sidebar-toggle");
const header = document.querySelector("header")
const main = document.querySelector("#main");
const body = document.querySelector("body");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#themeIcon");
const searchForm = document.querySelector("#searchForm");



render(main);
renderSidebar(sidebar, main);

if (window.innerWidth <= 760) {
    document.querySelector("header").classList.add("collapsed");
}

// update the theme icon base on current theme and sidebar state
const updateThemeIcon = () => {
    const isDark = document.body.classList.contains("dark-theme");
    themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
}

// Apply dark theme if saved
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}

updateThemeIcon();

// Toggle sidebar collapsed 
sidebarToggle.forEach(btn => {
    btn.addEventListener("click", () => {
        header.classList.toggle("collapsed");
    })
})


// Toggle dark mode
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme")
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon()
})

// Expand sidebar when search form is clicked
searchForm.addEventListener("click", () => {
    if (header.classList.contains("collapsed")){
        header.classList.remove("collapsed");
        searchForm.querySelector("input").focus();
    }
})