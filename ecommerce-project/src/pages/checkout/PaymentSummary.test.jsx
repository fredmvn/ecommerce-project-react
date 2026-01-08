import { it, expect, describe, vi, beforeEach } from "vitest";
import { useLocation, MemoryRouter } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { PaymentSummary } from "./PaymentSummary";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock("axios");

describe("PaymentSummary component", () => {
  let loadCart, user;

  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();
    vi.clearAllMocks();
  });

  it("calculates the correct amount of money", () => {
    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={{
            totalItems: 4,
            productCostCents: 5365,
            shippingCostCents: 0,
            totalCostBeforeTaxCents: 5365,
            taxCents: 537,
            totalCostCents: 5902,
          }}
        />
      </MemoryRouter>
    );

    const productCost = screen.getByTestId("payment-summary-product-cost");
    const shippingCost = screen.getByTestId("payment-summary-shipping-cost");
    const totalCostBeforeTax = screen.getByTestId(
      "payment-summary-total-cost-before-tax"
    );
    const taxCost = screen.getByTestId("payment-summary-tax-cost");
    const totalCost = screen.getByTestId("payment-summary-total-cost");

    expect(productCost).toHaveTextContent("$53.65");
    expect(shippingCost).toHaveTextContent("$0.00");
    expect(totalCostBeforeTax).toHaveTextContent("$53.65");
    expect(taxCost).toHaveTextContent("$5.37");
    expect(totalCost).toHaveTextContent("$59.02");
  });
  it("places to order correctly", async () => {
    const fakeOrder = { data: { id: "order-123" } };
    axios.post.mockResolvedValue(fakeOrder);

    render(
      <MemoryRouter>
        <Location />
        <PaymentSummary
          paymentSummary={{
            totalItems: 4,
            productCostCents: 5365,
            shippingCostCents: 0,
            totalCostBeforeTaxCents: 5365,
            taxCents: 537,
            totalCostCents: 5902,
          }}
          loadCart={loadCart}
        />
      </MemoryRouter>
    );

    const placeOrderBtn = screen.getByTestId("place-order-button");

    await user.click(placeOrderBtn);

    expect(axios.post).toHaveBeenCalledWith("/api/orders"); // calls the api

    await waitFor(() => {
      expect(loadCart).toHaveBeenCalled(); // loads the cart
      expect(screen.getByTestId("url-path")).toHaveTextContent("/orders"); // redirects to orders page
    });
  });
});

function Location() {
  const location = useLocation();
  return <div data-testid="url-path">{location.pathname}</div>;
}
