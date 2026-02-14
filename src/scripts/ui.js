import { state } from "./state.js";
import { loadState } from "./storage.js";
import { totalFeedUsed, totalRevenue, totalFishStock } from "./funky.js";

loadState()

export function render(main) {

    const fishTotal = totalFishStock();
    const feedTotal = totalFeedUsed(state);

    switch (state.ui.currentPage) {
        case "dashboard":
            // The totals should be populated by totalAll which should contain the currentCircleTotal and
            // addToCircle if user want to include more update to the current circle but if the user
            // wants a new circle, total should be only currentCircleTotal

            // For table, table should contain only what information of the currentCirCle plus the 
            // addCircle if the user wants to include more to the currentCircle but if the user wants
            // a new circle, Table should be only currentCircle
            main.innerHTML = ` 
            <h1>Dashboard</h1>
            <div class="dashboard-cards">
            <ul class="dashboard-list">
            <li>Total Fish Stocked: ${fishTotal}</li>
            <li>Total Feed Used: ${feedTotal} kg</li>
            <li>Total Sales: ₦${state.sales.totalRevenue}</li>
            </ul>
            <img class="dashboard-img" src="images/text.jpg" alt="Italian Trulli">
            <div class="tables">
            <table class="data-table" id="sales-table">
            <caption>Recent Sales</caption>
            <thead>
                <tr>
                <th>Date</th>
                <th>Fish Type</th>
                <th>Quantity Sold</th>
                <th>Unit Price</th>
                <th>Total Revenue</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows injected by JS -->
            </tbody>
            </table>
            </div>
            </div>`;
            break;

        case "fish":
            main.innerHTML = `
            <h1>Fish Stock</h1>
            <div class="dashboard-lay">
            <form id="fish-form">
                <h2>Add Fish Purchase</h2>
                <div class="form-group">
                    <label for="stock-date">Purchase Date</label>
                    <input 
                    type="date" 
                    id="stock-date" 
                    name="stockDate" 
                    required
                    />
                    <span class="error"></span>
                </div>
                <div class="form-group">
                    <label for="supplier">Supplier</label>
                    <input
                    type = text
                    id="stock-supplier"
                    name="stockSupplier"
                    required>
                    <span class="error"></span>
                </div>
                 <div class="form-group">
                    <label for="stock-quantity">Quantity </label>
                    <input 
                    type="number" 
                    id="stock-quantity" 
                    name="stockQuantity"
                    min="1"
                    step="1"
                    required
                    />
                    <span class="error"></span>
                </div>
                <div class="form-group">
                    <label for="stock-averagesize">Average Size (kg)</label>
                    <input 
                    type="number" 
                    id="stock-averagesize" 
                    name="stockAverageSize"
                    min="0.1"
                    step="0.1"
                    required
                    />
                    <span class="error"></span>
                </div>
                <div class="form-group">
                    <label for="stock-cost">Total Cost</label>
                    <input 
                    type="number" 
                    id="stock-cost" 
                    name="stockCost"
                    min="1"
                    step="0.1"
                    required
                    />
                    <span class="error"></span>
                </div>
                <div class="form-group">
                    <label for="note">Note</label>
                    <textarea
                    id="stock-note"
                    name="stockNote">
                    </textarea>
                    <span class="error"></span>
                </div>
                <input type="submit" value="add">
            </form>
            <img class="dashboard-img" src="images/text.jpg" alt="Italian Trulli">
            </div>
            <div class="tables">
            <table class="data-table" id="fish-stock-table">
            <caption>fish-stock</caption>
            <thead>
                <tr>
                <th>Date</th>
                <th>Pond / Batch</th>
                <th>Fish Type</th>
                <th>Quantity</th>
                <th>Average Weight (kg)</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows injected by JS -->
            </tbody>
            </table>
            </div>`;
            break;

        case "feed":
            main.innerHTML = `
            <h1>Feed Stock</h1>
            <div class="dashboard-lay">
            <form id="feed-form">
                <h2>Add Feed Purchase</h2>
                <div class="form-group">
                    <label for="feed-date">Purchase Date</label>
                    <input 
                    type="date" 
                    id="feed-date" 
                    name="feedDate" 
                    required
                    />
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="supplier">Supplier</label>
                    <input
                    type = text
                    id="feed-supplier"
                    name="feedSupplier"
                    required>
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="feed-type">Feed Type</label>
                    <input 
                    type="text" 
                    id="feed-type" 
                    name="feedType" 
                    placeholder="e.g. Floating Pellet"
                    required
                    />
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="feed-quantity">Quantity (kg)</label>
                    <input 
                    type="number" 
                    id="feed-quantity" 
                    name="feedQuantity" 
                    min="0"
                    step="0.01"
                    required
                    />
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="feed-cost">Total Cost</label>
                    <input 
                    type="number" 
                    id="feed-cost" 
                    name="feedCost" 
                    min="0"
                    step="0.01"
                    required
                    />
                    <span class="error"></span>
                </div>
                <div class="form-group">
                    <label for="note">Note</label>
                    <textarea
                    id="feed-note"
                    name="feedNote">
                    </textarea>
                    <span class="error"></span>
                </div>

                <input type="submit" value="add">
            </form>
            <img class="dashboard-img" src="images/text.jpg" alt="Italian Trulli">
            </div>
            <div class="tables">
            <table class="data-table" id="feed-stock-table">
            <caption>feed-stock</caption>
            <thead>
                <tr>
                <th>Date</th>
                <th>Feed Type</th>
                <th>Quantity (kg)</th>
                <th>Unit Price</th>
                <th>Total Cost</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows injected by JS -->
            </tbody>
            </table>
            </div>`;
            break;

        case "usage":
            main.innerHTML = `
            <h1>Feed Usage</h1>
            <div class="dashboard-lay">
            <form id="usage-form">
                <h2>Add Feed Usage</h2>
                <div class="form-group">
                    <label for="usage-date">Date</label>
                    <input 
                    type="date" 
                    id="usage-date" 
                    name="usageDate" 
                    required
                    />
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="pond">Pond</label>
                    <input
                    type = text
                    id="pond"
                    name="pond"
                    required>
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="usage-type">Feed Type</label>
                    <input 
                    type="text" 
                    id="usage-type" 
                    name="usageType" 
                    placeholder="e.g. Floating Pellet"
                    required
                    />
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="usage-quantity">Quantity (kg)</label>
                    <input 
                    type="number" 
                    id="usage-quantity" 
                    name="usageQuantity" 
                    min="0"
                    step="0.01"
                    required
                    />
                    <span class="error"></span>
                </div>
                <!-- cost should be calculated automaticaly with the privoius
                feed stock price and the usage quantity -->
                <div class="form-group">
                    <label for="feed-cost">Total Cost</label>
                    <input 
                    type="number" 
                    id="feed-cost" 
                    name="feedCost" 
                    min="0"
                    step="0.01"
                    required
                    />
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="note">Note</label>
                    <textarea
                    id="usage-note"
                    name="usageNote">
                    </textarea>
                    <span class="error"></span>
                </div>

                <input type="submit" value="add">
            </form>
            <img class="dashboard-img" src="images/text.jpg" alt="Italian Trulli">
            </div>
            <div class="tables">
            <table class="data-table" id="feed-usage-table">
            <caption>Feed Usage</caption>
            <thead>
                <tr>
                <th>Date</th>
                <th>Pond</th>
                <th>Feed Type</th>
                <th>Quantity Used (kg)</th>
                <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows injected by JS -->
            </tbody>
            </table>
            </div>`;
            break;

        case "sales":
            main.innerHTML = `
            <h1>Sales</h1>
            <div class="dashboard-lay">
            <form id="sales-form">
                <h2>Add Sale</h2>
                <div class="form-group">
                    <label for="sale-date">Sale Date</label>
                    <input 
                    type="date" 
                    id="sale-date" 
                    name="saleDate" 
                    required
                    />
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="buyer">Buyer</label>
                    <input
                    type = text
                    id="buyer"
                    name="buyer"
                    required>
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="sale-quantity">Quantity</label>
                    <input 
                    type="number" 
                    id="sale-quantity" 
                    name="saleQuantity" 
                    min="0"
                    step="0.01"
                    required
                    />
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="sale-size">Average fish size(kg)</label>
                    <input 
                    type="number" 
                    id="sale-size" 
                    name="saleSize" 
                    min="0"
                    step="0.01"
                    required
                    />
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="sale-price">Total cost</label>
                    <input 
                    type="number" 
                    id="sale-price" 
                    name="salePrice" 
                    required
                    />
                    <span class="error"></span>
                </div>

                <div class="form-group">
                    <label for="note">Note</label>
                    <textarea
                    id="sale-note"
                    name="saleNote">
                    </textarea>
                    <span class="error"></span>
                </div>

                <input type="submit" value="add">
            </form>
            <img class="dashboard-img" src="images/text.jpg" alt="Italian Trulli">
            </div>
            <div class="tables">
            <table class="data-table" id="sales-table">
            <caption>Sales</caption>
            <thead>
                <tr>
                <th>Date</th>
                <th>Quantity Sold</th>
                <th>Average size</th>
                <th>Unit Price</th>
                <th>Total Revenue</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows injected by JS -->
            </tbody>
            </table>
            </div>`;
            break;

        case "reports":
            // for the feed report at the end of the table it should have a total price
            // of quantity in, quantity out, balanace 

            // for the sales report at the end of the table it should contain the
            // total Quantity Sold, Average size, Average price and total revenue
            main.innerHTML = `
            <h1>Reports</h1>
             <form id="report-form">
                <div class="form-group">
                    <label for="start-date">Start Date</label>
                    <input 
                    type="date" 
                    id="start-date" 
                    name="startDate" 
                    required
                    />
                    <span class="error"></span>
                </div>
                <div class="form-group">
                    <label for="end-date">End Date</label>
                    <input 
                    type="date" 
                    id="end-date" 
                    name="endDate" 
                    required
                    />
                    <span class="error"></span>
                </div>
                <input type="submit" value="Apply">
            </form>
            <div class="report-content">
            <div class="tables" >
            <table class="data-table" id="feed-stock-table">
            <caption> Feed Report</caption>
            <thead>
                <tr>
                <th>Date</th>
                <th>Feed Type</th>
                <th>Quantity in(kg)</th>
                <th>Quantity out(kg)</th>
                <th>Quantity remaing(kg)</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows injected by JS -->
            </tbody>
            <tfoot>
            <tr>
            <th colspan="4">Total price</th>
            <th id="feed-total"></th>
            </tr>
            </table>

            <table class="data-table" id="sales-table">
            <caption> Sales Report</caption>
            <thead>
                <tr>
                <th>Date</th>
                <th>Quantity Sold</th>
                <th>Average size</th>
                <th>Unit Price</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows injected by JS -->
            </tbody>
            <tfoot>
            <tr>
            <th colspan="4">Total Revenue</th>
            <th id="revenue-total"></th>
            </tfoot>
            </table>
            </div>
            <table class="report-table" id="report-table">
            <caption>Total Summary</caption>
            <thead>
                <tr>
                <th>Total Income</th>
                </tr>
                <tr>
                <th>Total Expenses</th>
                </tr>
                <tr>
                <th>Profit</th>
                </tr>
            </thead>
            </table>
            </div>`;
            break;

    }
}


export function applyTheme(themeIcon) {
  const isDark = state.ui.theme === "dark";

  document.body.classList.toggle("dark-theme", isDark);

  if (themeIcon) {
    themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
  }
}

export function applySidebarState(header) {
  header.classList.toggle("collapsed",
  state.ui.sidebarCollapsed === true
  );
}