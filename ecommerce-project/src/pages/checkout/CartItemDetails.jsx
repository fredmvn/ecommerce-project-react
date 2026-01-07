import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useRef, useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const inputRef = useRef(null);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateItemQuantity = async () => {
    if (!quantity) return;
    await axios.put(`/api/cart-items/${cartItem.product.id}`, {
      quantity,
    });
    await loadCart();
    setIsUpdating(false);
    blurInput();
  };

  const blurInput = () => inputRef.current.blur();
  const focusInput = () => inputRef.current.focus();

  const toggleQuantityInput = () => {
    const nextValue = !isUpdating;
    setIsUpdating(nextValue);
    if (nextValue) focusInput();
    else blurInput();
  };

  const handleUpdateQuantity = () => {
    if (!isUpdating) toggleQuantityInput();
    else updateItemQuantity();
  };

  const handleInputValue = (e) => {
    const value = e.target.value;
    // /^\d*$/ is an only numbers regex
    if (/^\d*$/.test(value)) setQuantity(Number(value));
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
              ref={inputRef}
              type="text"
              className={`edit-quantity-input ${isUpdating && "is-open"}`}
              value={quantity}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={handleInputValue}
              onKeyDown={(event) => {
                const { key } = event;
                if (key === "Enter") updateItemQuantity();
                else if (key === "Escape") toggleQuantityInput();
              }}
            />
            <span className="quantity-label">{quantity}</span>
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={handleUpdateQuantity}
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
