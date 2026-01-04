import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import "./App.css";

/* 6a. In the checkout page, split up the header into a separate component called CheckoutHeader.
- Since CheckoutHeader is not shared (it's only used on the checkout page), save it in the pages folder instead of components folder.
- Rename checkout-header.css to CheckoutHeader.css. Update the imports so each component imports the css file with the same name. */

/* 6b. When there are multiple components for a page, we usually group them together into a folder.
- Inside the pages folder, create a folder named checkout, and move all components and CSS related to the checkout page into this folder.
- Update all your imports (for example in App.jsx) and test the website.*/

// 6c. In CheckoutHeader replace all <a> elements with <Link> components.

// 6d. Save the changes from the previous exercises into git. For the rest of the exercises, save changes into git after each exercise.

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
