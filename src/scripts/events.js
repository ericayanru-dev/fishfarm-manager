import { state } from "./state.js";
import { render, applyTheme, applySidebarState} from "./ui.js";
import { toggleTheme, toggleSidebarState, addFishStock, addFeedStock, addFeedUsage, addSale, addMortality} from "./mutationsState.js";
import { saveState } from "./storage.js";
import { renderFormErrors, hasEnoughFeed, showBusinessError, totalFishStock, getFeedUnitPrice } from "./funky.js"

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
    
    case "mortality-form": {
      const qty = Number(form.mortalityQuantity.value);

      if (qty > totalFishStock()) {
        showBusinessError(form, "Mortality exceeds available fish stock");
        return;
      }

      addMortality({
        date: form.mortalityDate.value,
        pond: form.mortalityPond.value,
        quantity: qty,
        reason: form.mortalityReason.value
      });

      render(main);
      form.reset();
      break;
    }


    case "feed-form":
      addFeedStock({
        date: form.feedDate.value,
        feedType: form.feedType.value,
        feedSize: Number(form.feedSize.value),
        quantity: Number(form.feedQuantity.value),
        cost: Number(form.feedCost.value),
      });

      saveState();
      render(main);
      form.reset();
      break;

    case "usage-form":
      const size = Number(form.usageSize.value);
      const type = form.usageType.value;
      const qyt = Number(form.usageQuantity.value)
      const totalCost = getFeedUnitPrice(type, size, qyt)

      if ( qyt > hasEnoughFeed(type, size)) {
        showBusinessError(form, "Not enough feed in stock");
        return;
      }
      getFeedUnitPrice(type, size, qyt)

      addFeedUsage({
        date: form.usageDate.value,
        type,
        usageSize: Number(form.usageSize.value),
        quantity: Number(form.usageQuantity.value),
        cost: totalCost
      });

      saveState();
      render(main);
      form.reset();
      break;

    case "sales-form":
      const quantity = Number(form.saleQuantity.value);
      if (quantity > totalFishStock()) {
        showBusinessError(form, "Not enough fish in stock");
        return;
      }
      
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