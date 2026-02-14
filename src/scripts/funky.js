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



export function hasEnoughFeed(type, qty) {
  const total = state.feedStock.data
    .filter(f => f.feedType === type)
    .reduce((sum, f) => sum + f.quantity, 0);

  const used = state.feedUsage.data
    .filter(u => u.type === type)
    .reduce((sum, u) => sum + u.quantity, 0);

  return total - used >= qty;
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
  
  const total = state.fishStock.data
    .reduce((sum, f) => sum + f.quantity, 0);

  const used = state.sales.data
    .reduce((sum, u) => sum + u.quantity, 0);

  return total - used;
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
    (sum, sale) => sum + Number(sale.amount),
    0
  );
