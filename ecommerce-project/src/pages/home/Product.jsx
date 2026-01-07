import { formatMoney } from "../../utils/money";
import { useState, useEffect } from "react";
import axios from "axios";

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity,
    });
    await loadCart();
    setAddedToCart(true);
  };

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  useEffect(() => {
    if (!addedToCart) return;
    const timeoutId = setTimeout(() => {
      setAddedToCart(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [addedToCart]);

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img
          data-testid="product-image"
          className="product-image"
          src={product.image}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          data-testid="product-rating-stars-image"
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className={`added-to-cart ${addedToCart && "is-active"}`}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button
        data-testid="add-to-cart-button"
        className="add-to-cart-button button-primary"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
