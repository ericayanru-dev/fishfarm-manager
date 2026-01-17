import { state } from "./state.js";
import { render } from "./ui.js";
import { renderSidebar } from "./events.js";

const sidebar = document.querySelector("#sidebar");
const main = document.querySelector("#main")

render(main)

renderSidebar(sidebar, main)
