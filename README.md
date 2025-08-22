# 🚗 Car Rental Dashboard

A modern, professional React dashboard for car rental management, analytics, and smart car loan advising. This project features a clean UI, accessibility best practices, and robust functionality for both users and admins.

---

## ✨ Professional Features & Improvements

- **Modern UI/UX:**
  - All major components updated for clarity, accessibility, and visual appeal.
  - Responsive layouts, semantic HTML, and consistent color palette.
- **Component Updates:**
  - About, AppNavbar, HighlightedCarsPage, BookingCalculator, CarDetails, ContactPage, Dashboard, FilterSearch, Footer, PurchaseCalculator, ScrollToTop, SmartCarLoanAdvisor (JSX & CSS), StatisticsPage.
- **Global Styles:**
  - `App.css` and component CSS files professionally refined for modern look and feel.
- **Routing & Structure:**
  - Clean React Router setup in `App.jsx`.
  - Main entry (`main.jsx`) follows best practices.
- **Meta & SEO:**
  - `index.html` updated with SEO, Open Graph, and accessibility meta tags.
- **Project Hygiene:**
  - Comprehensive `.gitignore` for Node.js, Vite, editors, OS, and build artifacts.
- **Data & Persistence:**
  - Car data in `cars.json`.
  - Purchases saved in `localStorage`.
- **PDF Export:**
  - Loan schedules and summaries downloadable via PDF.
- **Statistics & Analytics:**
  - Interactive charts and tables for car brands, models, and values.

---

## 📦 Folder Structure

```bash
/src
  ├── components
  │   ├── About.jsx
  │   ├── AppNavbar.jsx
  │   ├── BookingCalculator.jsx
  │   ├── CarDetails.jsx
  │   ├── ContactPage.jsx
  │   ├── Dashboard.jsx
  │   ├── FilterSearch.jsx
  │   ├── Footer.jsx
  │   ├── HighlightedCarsPage.jsx
  │   ├── PurchaseCalculator.jsx
  │   ├── ScrollToTop.jsx
  │   ├── SmartCarLoanAdvisor.jsx
  │   ├── SmartCarLoanAdvisor.css
  │   ├── StatisticsPage.jsx
  ├── data
  │   └── cars.json
  ├── styles
  │   └── styles.css
  ├── App.jsx
  ├── App.css
  ├── main.jsx
```

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
git clone https://github.com/oGeorge88/car-rental-dashboard.git
cd car-rental-dashboard
```
2. **Install dependencies**
   ```bash
npm install
```
3. **Run the app**
   ```bash
npm start
```

---

## 🧩 Dependencies

| Package                     | Purpose                        |
| --------------------------- | ------------------------------ |
| `react-bootstrap`           | UI components                  |
| `jsPDF` + `jspdf-autotable` | PDF generation                 |
| `react-router-dom`          | Page routing                   |
| `bootstrap`                 | Styling                        |

---

## 🧠 Usage Guide

- Browse cars, view details, and calculate smart loan schedules.
- Export loan schedules to PDF.
- View statistics and analytics for your car inventory.
- All actions and pages feature a modern, accessible UI.

---

## 📝 Example Data

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

Confirmed purchases are stored in `localStorage`:
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

- Add authentication and backend database.
- Display purchase history with edit/delete options.
- Enhance PDF styling and branding.
- Add currency toggle (e.g., THB ⇌ USD).

---

## 🧑‍💻 Author

**George Obinna**  
Front-End Developer, AHSO Event Admin System Creator

---

## 📄 License

This project is licensed under the **MIT License**.
