import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TrackingPage } from "./TrackingPage";
import { MemoryRouter, Routes, Route, useLocation } from "react-router";
import axios from "axios";

vi.mock("axios");

describe("TrackingPage component", () => {
  let cart, orders, user;
  const statusClass = "current-status";
  const pageTemplate = (orderId, productId, cart) => (
    <MemoryRouter initialEntries={[`/tracking/${orderId}/${productId}`]}>
      <Location />
      <Routes>
        <Route
          path="tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} />}
        />
        <Route path="/orders" element={<div>Orders Page</div>} />
      </Routes>
    </MemoryRouter>
  );

  beforeEach(() => {
    user = userEvent.setup();

    orders = [
      {
        id: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
        orderTimeMs: 1723456800000, // August 12, 2024
        totalCostCents: 3506,
        products: [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            estimatedDeliveryTimeMs: 1723716000000, // August 15, 2024
            product: {
              keywords: ["socks", "sports", "apparel"],
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: { stars: 4.5, count: 87 },
              priceCents: 1090,
              createdAt: "2026-01-07T11:32:02.189Z",
              updatedAt: "2026-01-07T11:32:02.189Z",
            },
          },
          {
            productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity: 2,
            estimatedDeliveryTimeMs: 1723456800000, // August 12, 2024
            product: {
              keywords: ["tshirts", "apparel", "mens"],
              id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              image:
                "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
              name: "Adults Plain Cotton T-Shirt - 2 Pack",
              rating: { stars: 4.5, count: 56 },
              priceCents: 799,
              createdAt: "2026-01-07T11:32:02.191Z",
              updatedAt: "2026-01-07T11:32:02.191Z",
            },
          },
        ],
        createdAt: "2026-01-07T11:32:02.189Z",
        updatedAt: "2026-01-07T11:32:02.189Z",
      },
      {
        id: "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
        orderTimeMs: 1718013600000, // June 10, 2024
        totalCostCents: 4190,
        products: [
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 2,
            estimatedDeliveryTimeMs: 1718618400000, // June 17, 2024
            product: {
              keywords: ["sports", "basketballs"],
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: { stars: 4, count: 127 },
              priceCents: 2095,
              createdAt: "2026-01-07T11:32:02.190Z",
              updatedAt: "2026-01-07T11:32:02.190Z",
            },
          },
        ],
        createdAt: "2026-01-07T11:32:02.190Z",
        updatedAt: "2026-01-07T11:32:02.190Z",
      },
    ];

    cart = [
      {
        id: 3,
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 3,
        deliveryOptionId: "1",
        createdAt: "2026-01-07T11:56:03.283Z",
        updatedAt: "2026-01-08T17:04:56.031Z",
        product: {
          keywords: ["socks", "sports", "apparel"],
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          image: "images/products/athletic-cotton-socks-6-pairs.jpg",
          name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          rating: {
            stars: 4.5,
            count: 87,
          },
          priceCents: 1090,
          createdAt: "2026-01-07T11:32:02.189Z",
          updatedAt: "2026-01-07T11:32:02.189Z",
        },
      },
      {
        id: 4,
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "1",
        createdAt: "2026-01-07T11:56:04.195Z",
        updatedAt: "2026-01-07T13:17:29.116Z",
        product: {
          keywords: ["sports", "basketballs"],
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          image: "images/products/intermediate-composite-basketball.jpg",
          name: "Intermediate Size Basketball",
          rating: {
            stars: 4,
            count: 127,
          },
          priceCents: 2095,
          createdAt: "2026-01-07T11:32:02.190Z",
          updatedAt: "2026-01-07T11:32:02.190Z",
        },
      },
    ];

    vi.useFakeTimers({ toFake: ["Date"] });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("renders the tracking product", async () => {
    const augustOrder = orders[0];
    const socksProduct = augustOrder.products[0];
    vi.setSystemTime(new Date("2024-08-13")); // August 13th, 2024
    axios.get.mockResolvedValue({ data: augustOrder }); // Modify axios.get to return the { data: order } object
    render(
      <MemoryRouter
        initialEntries={[
          `/tracking/${augustOrder.id}/${socksProduct.productId}`,
        ]}
      >
        <Routes>
          <Route
            path="tracking/:orderId/:productId"
            element={<TrackingPage cart={cart} />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    const deliveryDate = await screen.findByTestId("delivery-date");
    const productName = await screen.findByTestId("product-name");
    const productQuantity = await screen.findByTestId("product-quantity");
    const productImage = await screen.findByTestId("product-image");

    expect(deliveryDate).toBeInTheDocument();
    expect(productName).toHaveTextContent(socksProduct.product.name);
    expect(productQuantity).toHaveTextContent(socksProduct.quantity);
    expect(productImage).toHaveAttribute("src", socksProduct.product.image);
  });

  it("highlights the preparing label", async () => {
    const augustOrder = orders[0];
    const socksProduct = augustOrder.products[0];
    axios.get.mockResolvedValue({ data: augustOrder }); // Modify axios.get to return the { data: order } object

    // Sets the clock schedule to the exact time the order was placed (August 12, 2024)
    vi.setSystemTime(new Date(augustOrder.orderTimeMs));
    render(pageTemplate(augustOrder.id, socksProduct.productId, cart));

    // We wait for the elements to render and then check
    // Checks if it's preparing
    expect(await screen.findByTestId("label-preparing")).toHaveClass(
      statusClass
    );
    expect(await screen.findByTestId("label-shipped")).not.toHaveClass(
      statusClass
    );
    expect(await screen.findByTestId("label-delivered")).not.toHaveClass(
      statusClass
    );
  });

  it("highlights the shipped label", async () => {
    const augustOrder = orders[0];
    const socksProduct = augustOrder.products[0];
    axios.get.mockResolvedValue({ data: augustOrder }); // Modify axios.get to return the { data: order } object

    // Sets the clock schedule to the midpoint of the delivery time
    vi.setSystemTime(new Date("2024-08-14"));
    render(pageTemplate(augustOrder.id, socksProduct.productId, cart));

    // Checks if it was shipped
    expect(await screen.findByTestId("label-preparing")).not.toHaveClass(
      statusClass
    );
    expect(await screen.findByTestId("label-shipped")).toHaveClass(statusClass);
    expect(await screen.findByTestId("label-delivered")).not.toHaveClass(
      statusClass
    );
  });

  it("highlights the delivery label", async () => {
    const augustOrder = orders[0];
    const socksProduct = augustOrder.products[0];
    axios.get.mockResolvedValue({ data: augustOrder }); // Modify axios.get to return the { data: order } object

    // Sets the clock schedule to the delivery time
    vi.setSystemTime(new Date(socksProduct.estimatedDeliveryTimeMs));
    render(pageTemplate(augustOrder.id, socksProduct.productId, cart));

    // Checks if it was delivered
    expect(await screen.findByTestId("label-preparing")).not.toHaveClass(
      statusClass
    );
    expect(await screen.findByTestId("label-shipped")).not.toHaveClass(
      statusClass
    );
    expect(await screen.findByTestId("label-delivered")).toHaveClass(
      statusClass
    );
  });

  it("redirects to orders page", async () => {
    const augustOrder = orders[0];
    const socksProduct = augustOrder.products[0];
    render(pageTemplate(augustOrder.id, socksProduct.productId, cart));
    const ordersLink = await screen.findByTestId("back-to-orders-link");

    expect(screen.getByTestId("url-path")).toHaveTextContent(
      `/tracking/${augustOrder.id}/${socksProduct.productId}`
    ); // The path is "/tracking/:orderId/:productId" by default
    await user.click(ordersLink); // Clicks the link
    expect(screen.getByTestId("url-path")).toHaveTextContent("/orders"); // Updates to /orders after clicking the link
  });
});

function Location() {
  const location = useLocation();
  return <div data-testid="url-path">{location.pathname}</div>;
}
