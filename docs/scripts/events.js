import { state } from "./state.js";
import { render } from "./ui.js";


export function renderSidebar(sidebar, main) {
    sidebar.addEventListener("click", (e) => {
        const button = e.target.closest("button[data-page]");
        if (!button) return;

        state.currentPage = button.dataset.page;
        render(main)
    })
}