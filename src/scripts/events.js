import { state } from "./state.js";
import { render, applyTheme, applySidebarState} from "./ui.js";
import { toggleTheme, toggleSidebarState, addFishStock, addFeedStock, addFeedUsage, addSale} from "./mutationsState.js";
import { saveState } from "./storage.js";
import { renderFormErrors, hasEnoughFeed, showBusinessError } from "./funky.js"

const main = document.querySelector("#main");


export function renderSidebar(sidebar, main) {
    sidebar.addEventListener("click", (e) => {
        const button = e.target.closest("button[data-page]");
        if (!button) return;

        state.ui.currentPage = button.dataset.page;
        saveState()
        render(main)
    })
}

export function renderTheme(themeToggle, themeIcon) {
    themeToggle.addEventListener("click",() => {
        toggleTheme()
        applyTheme(themeIcon)
    })
}

export function initSidebar(sidebarToggles, header) {
  // Toggle buttons
  sidebarToggles.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent bubbling to document
      toggleSidebarState();
      applySidebarState(header);
    });
  });

  // Click outside sidebar to close (mobile)
  document.addEventListener("click", (e) => {
    const isSidebarOpen = !header.classList.contains("collapsed");
    const clickedInsideSidebar = header.contains(e.target);

    if (isSidebarOpen && !clickedInsideSidebar) {
      toggleSidebarState(false); // force close
      applySidebarState(header);
    }
  });
}

export function submitForm() {
  document.addEventListener("submit", (e) => {
    console.log("SUBMIT CAUGHT");
    e.preventDefault();

    const form = e.target.closest("form");
    if (!form) return;


    //HTML constraint validation
  if (!form.checkValidity()) {
    renderFormErrors(form);
    return;
  }

  //Route by form ID
  switch (form.id) {
    case "fish-form":
      addFishStock({
        date: form.stockDate.value,
        quantity: Number(form.stockQuantity.value),
        averageSize: Number(form.stockAverageSize.value),
        cost: Number(form.stockCost.value),
      });

      saveState();
      render(main);
      form.reset();
      break;

    case "feed-form":
      addFeedStock({
        date: form.feedDate.value,
        feedType: form.feedType.value,
        quantity: Number(form.feedQuantity.value),
        cost: Number(form.feedCost.value),
      });

      saveState();
      render(main);
      form.reset();
      break;

    case "usage-form":
      const qty = Number(form.usageQuantity.value);
      const type = form.usageType.value;

      if (!hasEnoughFeed(type, qty)) {
        showBusinessError(form, "Not enough feed in stock");
        return;
      }

      addFeedUsage({
        date: form.usageDate.value,
        type,
        quantity: qty,
      });

      saveState();
      render(main);
      form.reset();
      break;

    case "sales-form":
      addSale({
        date: form.saleDate.value,
        quantity: Number(form.saleQuantity.value),
        averageSize: Number(form.saleSize.value),
        cost: Number(form.salePrice.value),
      });

      saveState();
      render(main);
      form.reset();
      break;

    case "report-form":
      const start = form.startDate.value;
      const end = form.endDate.value;

      renderReports({ start, end });
      break;
  }
  });
}