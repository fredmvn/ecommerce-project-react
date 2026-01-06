import { Route, Routes } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { ErrorPage } from "./pages/ErrorPage";
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

/* 6j. Create a folder src/assets/images. Open public/images, move the 4 logos at the bottom and the icons folder to src/assets/images (we usually save logos and icons in src/assets/images, but not favicons).
  - Using the Search section of VSCode, find where each logo and icon is used in the code, import the image, and insert it using src={...} instead of using a string for the src attribute.
  - (We don't do this for product images or ratings because each product can have a different image and rating. This makes importing difficult).*/

/* 6k. We'll add a 404 (Not Found) page. Create a page that displays the <Header> and message "Page not found" (style it however you want). 
  - Create a <Route> with path="*" (this matches any URL path), set the element to your 404 page. Add this route to the bottom of <Routes> (if the URL does not match any other route, it will display your 404 page). */

// 7a. In OrdersPage.jsx, use async await to load the data instead of promise.

/* 7b. In OrderSummary.jsx, separate the cart item details into a component:
  - Create a new component named CartItemDetails.
  - Move <img className="product-image"> and <div className="cart-item-details"> into this new component.
  - Hint: you'll need to use a fragment <></> since you'll be returning multiple elements from the component.*/

/* 7c. In OrderSummary.jsx, separate the delivery-date into a component:
  - Create a new component named DeliveryDate. Move the code that finds the selectedDeliveryOption into the component as well.*/

/* 7d. We saw useEffect runs twice due to <StrictMode>. In main.jsx, temporarily remove <StrictMode> and check that useEffect runs once.
  - Running twice helps us catch bugs. (Running useEffect twice should result in the same HTML being rendered. This is called idempotency).
  - This only happens in development. In production (the website is on the Internet), <StrictMode> doesn't do anything. Add <StrictMode> back. */

// 7e. In OrdersPage.jsx, separate the <div className="orders-grid"> into its own component, named OrdersGrid.

// 7f. In OrdersGrid, separate the <div className="order-header"> and <div className="order-details-grid"> into their own components.

// 7g. In CheckoutPage, separate the header into a component (did this in lesson 6 exercises). Pass in the cart as a prop, display the total quantity.

// 7h. Open the orders page in the browser and click a "Track package" button. The tracking page will not work because there's a <Header /> in the page and it needs the cart. Pass the cart into <Header /> using a prop. Check the page works.

// 7i. Find the "Track package" button in the code. It links to "/tracking". Update this so it links to `/tracking/${orderId}/${productId}` (insert the order and product ids into the string). Click "Track package", and notice the order id and product id are now in the URL.

/* 7j. In order for the URL /tracking/${orderId}/${productId} to work, we also need to update the Router. In App.jsx, update the Router so the tracking page uses path="tracking/:orderId/:productId"
  - :orderId and :productId are called URL params (parameters). We can replace them with any text, and this allows us to save an order id and a product id directly in the URL.
  - To get these values out of the URL, in the Tracking Page, use the hook: import { useParams } from 'react-router'; then at the top of the Tracking Page, run const params = useParams();
  - Try console.log(params); and open a tracking page. Notice params is an object that contains the orderld and productId from the URL.
  - Destructure const params into const { orderId, productId } */

/* 7k. Now, we'll load the data for the Tracking Page from the backend. Using axios, useEffect, and the orderId from the URL:
  - Make a request to `/api/orders/${orderId}?expand=products` this will load the order from the backend (with product details attached).
  - Instead of the dependency array [], use [orderId]. This will re-run useEffect if orderId changes (reload the order if orderId changes).
  - Save the order in useState with initial value of null. Before returning the HTML, check if the order is loaded using if (!order) { return null; }
  - After the order is loaded, replace the text in the HTML using the values in the order (skip the progress bar for now). Hint: get product details and delivery time using the productId and order.products.find()
  - Go to the orders page, click "Track package" for some other products /orders, and check that the details are correct. */

/* 7l. We'll calculate the progress (how close the product is to delivery).
  - First: orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs gets the total time required for delivery (totalDeliveryTimeMs).
  - Then const timePassedMs = dayjs().valueOf() -order.orderTimeMs; calculates the amount of time that has passed since creating the order.
  - Calculate (timePassedMs / totalDeliveryTimeMs) * 100 this gives us the delivery progress as a percent (50% = halfway, 100% = delivered).
  - If the progress is > 100%, set it to 100% (limit it to at most 100%).
  - Scroll down to the <div className="progress-bar"> and give it a prop style={{width: `${deliveryPercent}%` }}. Refresh, and check that the progress bar now reflects the delivery percent.
  - Temporarily update timePassedMs to totalDeliveryTimeMs * 0.3 and refresh. Check that the progress bar is updated. Change it back after.*/

// 7m. If the percent is >= 100, instead of "Arriving on" display "Delivered on".

/* 7n. We'll highlight the correct label based on the delivery percent:
  - Check if the delivery percent is < 33. Save it in a variable isPreparing
  - Check if the percent is >= 33 and < 100. Save it in a variable isshipped
  - Check if the percent is === 100. Save it in a variable isDelivered
  - Scroll down to the progress-label elements. If an element has the class current-status that means it will be highlighted in green.
  - For each progress-label, change className to a template string, and only add the class current-status if it is the current status. Example: `progress-label ${isPreparing && 'current-status'}`*/

// 7o. In 6k, we added a 404 page. Pass the cart into the Header in this page.

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
