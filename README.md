
# 🚗 Car Purchase Calculator App

This React-based web application allows users to **calculate loan schedules** for car purchases with customizable inputs like **down payment**, **loan term**, **interest rate**, and optional **insurance**. It also supports **flat or reducing interest** models and provides **PDF exports** of the payment schedule. Users can **confirm purchases**, which are saved in `localStorage`.

---

## ✨ Features

* 🔢 **Loan Payment Calculator**:

  * Supports **flat** and **reducing balance** interest calculations.
  * Accepts down payments as **THB amount** or **percentage**.
  * Customizable **loan duration** and **interest rate**.
  * Optional **insurance premium** (2% of car price).

* 📅 **Monthly Amortization Schedule**:

  * Detailed monthly breakdown: principal, interest, total payment, and remaining balance.

* 📄 **PDF Export**:

  * Downloadable loan summary and payment schedule using `jsPDF`.

* 💾 **LocalStorage Transactions**:

  * Confirmed purchases are saved locally with details like date, car name/model, and total cost.

* 🛒 **Car Details Integration**:

  * Displays car details dynamically from `cars.json`.
  * Integrated into a `CarDetails` page using route params.

---

## 📦 Folder Structure

```bash
/src
├── components
│   └── PurchaseCalculator.jsx    # Loan calculator logic and UI
├── pages
│   └── CarDetails.jsx            # Renders car info + calculator
├── data
│   └── cars.json                 # Static car dataset
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/car-purchase-calculator.git
cd car-purchase-calculator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm start
```

---

## 🧩 Dependencies

| Package                     | Purpose                        |
| --------------------------- | ------------------------------ |
| `react-bootstrap`           | UI components                  |
| `jsPDF` + `jspdf-autotable` | PDF generation                 |
| `prop-types`                | Type validation for components |
| `react-router-dom`          | Page routing                   |
| `bootstrap`                 | Styling                        |

---

## 🧠 Usage Guide

1. Navigate to a car details page (e.g., `/car/2`).
2. View car specifications (model, price, year, etc.).
3. In the "Purchase this Car" section:

   * Enter down payment (as % or THB).
   * Set loan term and interest rate.
   * Select interest type (flat or reducing).
   * Optionally include insurance.
4. Click **Calculate** to view the schedule.
5. Click **Confirm Purchase** to save.
6. Click **Export to PDF** for a downloadable summary.

---

## 📝 Example

**Input:**

* Car Price: 600,000 THB
* Down Payment: 20%
* Loan Term: 36 months
* Interest: 5%
* Interest Type: Reducing Balance

**Output:**

* Monthly Payment: \~17,980 THB
* Insurance: 12,000 THB
* Total Cost: \~660,000 THB
* PDF with full schedule available for download

---

## 📁 Sample Data Format (`cars.json`)

```json
{
  "Cars": [
    {
      "Cid": 1,
      "NameMMT": "Toyota Corolla",
      "Model": "Altis",
      "Yr": "2021",
      "Prc": "600,000",
      "Currency": "THB",
      "Province": "Bangkok",
      "Upd": "2025-07-01",
      "Img300": "/images/corolla.jpg"
    }
  ]
}
```

---

## 🔒 Data Persistence

* **Confirmed Purchases** are stored in `localStorage`:

  ```json
  {
    "carName": "Toyota Corolla",
    "carModel": "Altis",
    "amount": 660000,
    "date": "2025-07-05T12:34:56.789Z",
    "type": "purchase"
  }
  ```

---

## 📌 TODO / Improvements

* Add **authentication** and backend database.
* Display **purchase history** with edit/delete options.
* Enhance PDF styling and branding.
* Add currency toggle (e.g., THB ⇌ USD).

---

## 🧑‍💻 Author

**George Obinna**
Front-End Developer, AHSO Event Admin System Creator

---

## 📄 License

This project is licensed under the **MIT License**.
