import { state } from "./state.js";
import { render } from "./ui.js";


export function renderSidebar(sidebar, main) {
    sidebar.addEventListener("click", (e) => {
        if (!e.target.dataset.page) return;

        state.currentPage = e.target.dataset.page;
        render(main)
    })
}