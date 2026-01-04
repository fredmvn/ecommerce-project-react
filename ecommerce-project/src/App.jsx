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

/* 6e. Rename header.css to Header.css so it matches the component's name. Check the git section to see if git detected the change.
  - If git detected the change, save the change into git (using Commit).
  - If git did not detect the change, this happens because on some operating systems (Windows and Mac), git is case-insensitive. That means header.css and Header.css are considered the same.
  - To fix this, rename header.css to something like header2.css. Save these changes into git (using Commit). Then, rename header2.css to Header.css and git will now detect the change. */

/* 6f. React Router has another component called <NavLink> that is useful for navigation links (links at the top of a page, usually in a header).
  - For an example, check apple.com and see the links at the top.
  - In Header.jsx, update all <Link>s to <NavLink>s (props are the same).
  - The special feature of <NavLink> is it knows which page is loaded. For example, if you're on the Orders page, it adds a class called active to the Orders link (className="orders-link active").
  - Inside Header.css, style the orders link so when it's active, "Orders" is underlined (Hint: .orders-link.active will style an element with the class orders-link and active. Use text-decoration: underline;)*/

/* 6g. We'll use React to change the icon in the tabs (this is called a favicon)
  - In index.html, look for <link rel="icon" href="...">. This sets the favicon. Copy this into HomePage, CheckoutPage, and OrdersPage.
  - In your browser, open supersimple.dev/images/home-favicon.png and download the image into the public folder. Do the same for supersimple.dev/images/cart-favicon.png and supersimple.dev/images/orders-favicon.png.
  - In HomePage set the href of the favicon to home-favicon.png (if we set href to a file name, Vite will look for the file in the public folder).
  - Update CheckoutPage to use cart-favicon.png and OrdersPage to use orders-favicon.png
  - In index.html, remove <link rel="icon" href="...">
  - Open the website and switch pages. Notice the favicon changes.*/

// 6h. Move the tracking page to React and add its favicon

// 6i. Using the Search section of VSCode (Ctrl + Shift + F on Windows or Command + Shift + F on Mac), find any other <a> elements in the code and replace them with the <Link> component.

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
