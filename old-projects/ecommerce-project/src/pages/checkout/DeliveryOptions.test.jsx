import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import { DeliveryOptions } from "./DeliveryOptions";
import userEvent from "@testing-library/user-event";
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import axios from "axios";

vi.mock("axios");

describe("DeliveryOption component", () => {
  let loadCart, user, deliveryOptions, cartItem;

  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();
    deliveryOptions = [
      {
        id: "1",
        deliveryDays: 7,
        priceCents: 0,
        createdAt: "2026-01-07T11:32:02.189Z",
        updatedAt: "2026-01-07T11:32:02.189Z",
        estimatedDeliveryTimeMs: 1768509298922,
      },
      {
        id: "2",
        deliveryDays: 3,
        priceCents: 499,
        createdAt: "2026-01-07T11:32:02.190Z",
        updatedAt: "2026-01-07T11:32:02.190Z",
        estimatedDeliveryTimeMs: 1768163698922,
      },
      {
        id: "3",
        deliveryDays: 1,
        priceCents: 999,
        createdAt: "2026-01-07T11:32:02.191Z",
        updatedAt: "2026-01-07T11:32:02.191Z",
        estimatedDeliveryTimeMs: 1767990898922,
      },
    ];
    cartItem = {
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
    };
  });

  it("displays the delivery options correctly", () => {
    render(
      <DeliveryOptions
        loadCart={loadCart}
        deliveryOptions={deliveryOptions}
        cartItem={cartItem}
      />
    );

    deliveryOptions.forEach((option, i) => {
      const isFirstOption = i === 0;
      const optionElem = screen.getByTestId(`delivery-option-${option.id}`);
      const optionDate = within(optionElem).getByTestId("delivery-option-date");
      const optionPrice = within(optionElem).getByTestId(
        "delivery-option-price"
      );

      expect(optionElem).toBeInTheDocument();
      expect(optionDate).toHaveTextContent(
        dayjs(option.estimatedDeliveryTimeMs).format("dddd, MMMM D")
      );
      expect(optionPrice).toHaveTextContent(
        isFirstOption ? "FREE" : formatMoney(option.priceCents)
      );
    });
  });

  it("switches between delivery options", async () => {
    axios.put.mockResolvedValue({ data: { success: true } });

    render(
      <DeliveryOptions
        loadCart={loadCart}
        deliveryOptions={deliveryOptions}
        cartItem={cartItem}
      />
    );

    const firstOption = screen.getByTestId("delivery-option-1");
    const secondOption = screen.getByTestId("delivery-option-2");

    const firstOptionInput = within(firstOption).getByTestId(
      "delivery-option-input"
    );

    expect(firstOptionInput).toBeChecked();

    await user.click(secondOption); // Clicks second delivery option

    expect(axios.put).toHaveBeenCalledWith(
      `/api/cart-items/${cartItem.productId}`,
      {
        deliveryOptionId: deliveryOptions[1].id,
      }
    ); // Sends the new delivery option to the api

    await waitFor(() => {
      expect(loadCart).toHaveBeenCalled(); // Reloads the cart
    });
  });
});
