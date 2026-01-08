import { DeliveryOption } from "./DeliveryOption";

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        return (
          <DeliveryOption
            deliveryOption={deliveryOption}
            cartItem={cartItem}
            loadCart={loadCart}
          />
        );
      })}
    </div>
  );
}
