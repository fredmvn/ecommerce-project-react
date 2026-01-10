import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutPage } from "./CheckoutPage";
import { MemoryRouter, Routes, Route } from "react-router";
import { formatMoney } from "../../utils/money";
import axios from "axios";

vi.mock("axios");

describe("CheckoutPage component", () => {
  let user, cart, loadCart, paymentSummary, deliveryOptions;

  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();
    paymentSummary = {
      totalItems: 4,
      productCostCents: 5365,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 5365,
      taxCents: 537,
      totalCostCents: 5902,
    };
    deliveryOptions = [
      {
        id: "1",
        deliveryDays: 7,
        priceCents: 0,
        createdAt: "2026-01-07T11:32:02.189Z",
        updatedAt: "2026-01-07T11:32:02.189Z",
        estimatedDeliveryTimeMs: 1768583333186,
      },
      {
        id: "2",
        deliveryDays: 3,
        priceCents: 499,
        createdAt: "2026-01-07T11:32:02.190Z",
        updatedAt: "2026-01-07T11:32:02.190Z",
        estimatedDeliveryTimeMs: 1768237733186,
      },
      {
        id: "3",
        deliveryDays: 1,
        priceCents: 999,
        createdAt: "2026-01-07T11:32:02.191Z",
        updatedAt: "2026-01-07T11:32:02.191Z",
        estimatedDeliveryTimeMs: 1768064933187,
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
  });

  it("works", async () => {
    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/delivery-options?expand=estimatedDeliveryTime")
        return { data: deliveryOptions };
      if (urlPath === "/api/payment-summary") return { data: paymentSummary };
    });

    render(
      <MemoryRouter>
        <CheckoutPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>
    );

    const lookInside = (element) => ({
      get: (testId) => within(element).getByTestId(testId),
      find: (testId) => within(element).findByTestId(testId),
    });

    // const cartQuantityLink = await screen.findByTestId("cart-quantity-link");
    const socksObj = cart[0];
    const basketballObj = cart[1];

    const socksElem = await screen.findByTestId(socksObj.productId);
    const basketballElem = await screen.findByTestId(basketballObj.productId);

    const assertCartItemDetails = (element, itemObj) => {
      const detailsMappings = {
        "product-name": itemObj.product.name,
        "product-price": formatMoney(itemObj.product.priceCents),
        "product-quantity": itemObj.quantity,
      };

      Object.entries(detailsMappings).forEach(([testId, expectedValue]) => {
        expect(lookInside(element).get(testId)).toHaveTextContent(
          expectedValue
        );
      });
    };

    // Check if cart item details are correct
    assertCartItemDetails(socksElem, socksObj);
    assertCartItemDetails(basketballElem, basketballObj);

    // Check if payment summary values are correct
    const summaryMappings = {
      "payment-summary-product-cost": formatMoney(
        paymentSummary.productCostCents
      ),
      "payment-summary-shipping-cost": formatMoney(
        paymentSummary.shippingCostCents
      ),
      "payment-summary-total-cost-before-tax": formatMoney(
        paymentSummary.totalCostBeforeTaxCents
      ),
      "payment-summary-tax-cost": formatMoney(paymentSummary.taxCents),
      "payment-summary-total-cost": formatMoney(paymentSummary.totalCostCents),
    };
    Object.entries(summaryMappings).forEach(([testId, expectedValue]) => {
      expect(screen.getByTestId(testId)).toHaveTextContent(expectedValue);
    });

    // Check if the delivery option selection ran properly
    const socksFirstOption = lookInside(socksElem).get("delivery-option-1");
    expect(
      lookInside(socksFirstOption).get("delivery-option-input")
    ).toBeChecked();

    const socksThirdOption = lookInside(socksElem).get("delivery-option-3");

    await user.click(socksThirdOption);

    expect(axios.put).toHaveBeenCalledWith(
      `/api/cart-items/${socksObj.productId}`,
      { deliveryOptionId: deliveryOptions[2].id }
    );

    expect(loadCart).toHaveBeenCalled();
  });
});
