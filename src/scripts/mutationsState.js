import { state } from "./state.js";
import { saveState } from "./storage.js";


export function toggleTheme() {
  state.ui.theme = state.ui.theme === "light" ? "dark" : "light";
  saveState();
}


export function toggleSidebarState() {
  state.ui.sidebarCollapsed = !state.ui.sidebarCollapsed;
  saveState()
}


export function addFishStock({ date, quantity, averageSize, cost }) {
  state.fishStock.data.push({
    id: crypto.randomUUID(),
    date,
    quantity: Number(quantity),
    averageSize: Number(averageSize),
    cost: Number(cost),
  });

  state.fishStock.totalQuantity += Number(quantity);
  state.fishStock.totalCost += Number(cost);

  saveState();
}

export function addMortality({ date, pond, quantity, reason }) {
  state.mortality.data.push({
    id: crypto.randomUUID(),
    date,
    pond,
    quantity: Number(quantity),
    reason: reason || ""
  });

  saveState();
}


export function addFeedStock({ date, feedType,feedSize, quantity, cost }) {
  state.feedStock.data.push({
    id: crypto.randomUUID(),
    date,
    feedType,
    feedSize,
    quantity: Number(quantity),
    cost: Number(cost),
  });

  state.feedStock.totalQuantity += Number(quantity);
  state.feedStock.totalCost += Number(cost);
  saveState();
}

export function addFeedUsage({ date, type, usageSize, quantity, cost }) {
  state.feedUsage.data.push({
    id: crypto.randomUUID(),
    date,
    type,
    usageSize,
    quantity: Number(quantity),
    cost: Number(cost),
  });

  state.feedStock.totalQuantity += Number(quantity);
  state.feedStock.totalCost += Number(cost);
  saveState();
}


export function addSale({ date, quantity, averageSize, cost }) {

  state.sales.data.push({
    id: crypto.randomUUID(),
    date,
    quantity: Number(quantity),
    averageSize: Number(averageSize),
    cost: Number(cost)
  });

  state.sales.totalRevenue += Number(cost);
  saveState();
}
