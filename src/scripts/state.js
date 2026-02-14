// state.js

export const state = {
  // ======================
  // DATA (RAW RECORDS)
  // ======================

  fishStock: {
    totalQuantity: 0,
    totalCost: 0,
    data:[]
    /*
      {
        id: 1,
        date: "2026-02-01",
        quantity: 500,
        size: "fingerlings",
        notes: ""
      }
    */
  },

  feedStock: {
    totalQuantity: 0,
    totalCost: 0,
    data: []
    /*
      {
        id: 1,
        date: "2026-02-01",
        feedType: "pellet",
        quantityKg: 25,
        supplier: ""
      }
    */
  },

  feedUsage: {
    totalQuantity: 0,
    totalCost: 0,
    data: []
    /*
      {
        id: 1,
        date: "2026-02-02",
        feedType: "pellet",
        quantityKg: 3
      }
    */
  },

  sales: {
    totalRevenue: 0,
    data: []
    /*
      {
        id: 1,
        date: "2026-02-10",
        fishType: "catfish",
        quantity: 50,
        price: 30000
      }
    */
  },

  // ======================
  // UI STATE
  // ======================

  ui: {
    currentPage: "dashboard",   // dashboard | fish | feed | sales | reports
    sidebarCollapsed: false,
    theme: "light"              // light | dark
  }
};
