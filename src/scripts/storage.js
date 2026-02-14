import { state } from "./state.js";


const STORAGE_KEY = "fishFarmAppState";

export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save state:", error);
  }
}


export function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return;

    // Merge, don’t replace
    Object.assign(state, JSON.parse(stored));
  } catch (error) {
    console.error("Failed to load state:", error);
  }
}
