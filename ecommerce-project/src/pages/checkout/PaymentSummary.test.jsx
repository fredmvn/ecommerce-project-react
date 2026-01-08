import { it, expect, describe, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import { PaymentSummary } from "./PaymentSummary";

vi.mock("axios");

describe("PaymentSummary component", () => {
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
});
