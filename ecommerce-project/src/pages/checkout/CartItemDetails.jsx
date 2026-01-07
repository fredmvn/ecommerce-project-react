import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdating, setisUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const toggleEditInput = () => {
    setisUpdating(!isUpdating);
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            <input
              type="number"
              className={`edit-quantity-input ${isUpdating && "is-open"}`}
              value={quantity}
              min={0}
              onChange={(event) => {
                const inputValue = Number(event.target.value);
                setQuantity(inputValue);
              }}
            />
            <span className="quantity-label">{quantity}</span>
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={toggleEditInput}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
