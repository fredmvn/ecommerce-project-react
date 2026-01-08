import dayjs from "dayjs";
import axios from "axios";
import { formatMoney } from "../../utils/money";

export function DeliveryOption({ deliveryOption, cartItem, loadCart }) {
  let priceString = "FREE Shipping";

  if (deliveryOption.priceCents > 0) {
    priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
  }

  const updateDeliveryOption = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      deliveryOptionId: deliveryOption.id,
    });

    await loadCart();
  };

  return (
    <div
      key={deliveryOption.id}
      className="delivery-option"
      onClick={updateDeliveryOption}
    >
      <input
        type="radio"
        checked={deliveryOption.id === cartItem.deliveryOptionId}
        className="delivery-option-input"
        name={`delivery-option-${cartItem.productId}`}
        readOnly
      />
      <div>
        <div className="delivery-option-date">
          {dayjs(deliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
        </div>
        <div className="delivery-option-price">{priceString}</div>
      </div>
    </div>
  );
}
