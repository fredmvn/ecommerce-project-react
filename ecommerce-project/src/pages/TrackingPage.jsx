import { Header } from "../components/Header";
import { Link } from "react-router";
import "./TrackingPage.css";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
    };
    fetchTrackingData();
  }, [orderId]);

  if (!order) return null;

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  const deliveryPercent = Math.min(
    (timePassedMs / totalDeliveryTimeMs) * 100,
    100
  );

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link
            data-testid="back-to-orders-link"
            className="back-to-orders-link link-primary"
            to="/orders"
          >
            View all orders
          </Link>

          <div className="delivery-date" data-testid="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on" : "Arriving on"}{" "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info" data-testid="product-name">
            {orderProduct.product.name}
          </div>

          <div className="product-info" data-testid="product-quantity">
            Quantity: {orderProduct.quantity}
          </div>

          <img
            className="product-image"
            data-testid="product-image"
            src={orderProduct.product.image}
          />

          <div className="progress-labels-container">
            <div
              data-testid="label-preparing"
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div
              data-testid="label-shipped"
              className={`progress-label ${isShipped && "current-status"}`}
            >
              Shipped
            </div>
            <div
              data-testid="label-delivered"
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
