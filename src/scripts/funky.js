import { loadState } from "./storage.js";
import { state } from "./state.js";

loadState()
export function renderFormErrors(form) {
  const inputs = form.querySelectorAll("input, textarea, select");


  inputs.forEach(input => {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error")) return;

    error.textContent = "";

    if (!input.checkValidity()) {
      const v = input.validity;

      if (v.valueMissing) {
        error.textContent = "This field is required.";

      } else if (v.tooShort) {
        error.textContent = `Must be at least ${input.minLength} characters.`;

      } else if (v.tooLong) {
        error.textContent = `Must be no more than ${input.maxLength} characters.`;

      } else if (v.typeMismatch) {
        error.textContent = "Please enter a valid value.";

      } else if (v.rangeUnderflow) {
        error.textContent = `Value must be at least ${input.min}.`;

      } else if (v.rangeOverflow) {
        error.textContent = `Value must be no more than ${input.max}.`;

      } else if (v.patternMismatch) {
        error.textContent = "Invalid format.";

      } else {
        error.textContent = "Invalid input.";
      }
    }
  });
}



export function hasEnoughFeed(feedType, feedSize) {
  const stocked = state.feedStock.data
    .filter(f => f.feedType === feedType && f.feedSize === feedSize)
    .reduce((sum, f) => sum + Number(f.quantity), 0);

  const used = state.feedUsage.data
    .filter(u => u.feedType === feedType && u.feedSize === feedSize)
    .reduce((sum, u) => sum + Number(u.quantity), 0);

  return stocked - used;
}

export function showBusinessError(form, message) {
  let box = form.querySelector(".business-error");
  if (!box) {
    box = document.createElement("div");
    box.className = "business-error";
    form.prepend(box);
  }
  box.textContent = message;
}

export function totalFishStock() {

  const stocked = state.fishStock.data.reduce(
    (sum, f) => sum + Number(f.quantity),
    0
  );

  const sold = state.sales.data.reduce(
    (sum, s) => sum + Number(s.quantity),
    0
  );

  const mortality = state.mortality.data.reduce(
    (sum, m) => sum + Number(m.quantity),
    0
  );

  return stocked - sold - mortality;
}

export const totalFishStockCost = (state) =>
  state.fishStock.data.reduce(
    (sum, record) => sum + Number(record.cost),
    0
  );

export const totalFeedUsed = (state) =>
  state.feedUsage.data.reduce(
    (sum, record) => sum + Number(record.quantity),
    0
  );

export const totalFeedCost = (state) =>
  state.feedUsage.data.reduce(
    (sum, record) => sum + Number(record.cost),
    0
  );

export const totalRevenue = (state) =>
  state.sales.data.reduce(
    (sum, sale) => sum + Number(sale.cost),
    0
  );


export function getFeedUnitPrice(feedType, feedSize, quantity) {
  const relevantStock = state.feedStock.data.filter(
    f => f.feedType === feedType && f.feedSize === feedSize
  );

  const totalKg = relevantStock.reduce(
    (sum, f) => sum + Number(f.quantity),
    0
  );

  const totalCost = relevantStock.reduce(
    (sum, f) => sum + Number(f.cost),
    0
  );

  if (totalKg === 0) return 0;

  const unitPrice = totalCost / totalKg;
  return unitPrice * Number(quantity);
}



export function initFeedUsagePreview() {
  const form = document.querySelector("#usage-form");
  if (!form) return;

  const typeInput = form.querySelector("#usage-type");
  const sizeInput = form.querySelector("#usage-size");
  const qtyInput = form.querySelector("#usage-quantity");

  const previewEl = form.querySelector("#usage-cost");
  const hiddenCostInput = form.querySelector("#feed-cost");

  [typeInput, sizeInput, qtyInput].forEach(input => {
    input.addEventListener("input", handlePreview);
  });

  function handlePreview() {
    const feedType = typeInput.value;
    const feedSize = Number(sizeInput.value);
    const quantity = Number(qtyInput.value);

    // Do nothing until all required inputs exist
    if (!feedType && !feedSize && !quantity) {
      previewEl.textContent = "₦0.00";
      hiddenCostInput.value = "";
      return;
    }

    const cost = getFeedUnitPrice(feedType, feedSize, quantity);

    previewEl.textContent = `₦${cost.toFixed(2)}`;
    hiddenCostInput.value = cost;
  }
}

