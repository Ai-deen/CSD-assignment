import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsOrder, payOrder } from '../actions/OrderAction';
import axios from '../Axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../constants/OrderConstant';
import '../styles/PlaceOrder.css';
import '../styles/OrderDetails.css';

const API = 'http://localhost:4001';

const OrderDetails = (props) => {
  const orderID = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  const history = useHistory(); // Access to history for redirection

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

  const paypalButtonRef = useRef(null);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get(`${API}/api/config/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || (order && order._id !== orderID)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderID));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderID, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const markAsPaidHandler = () => {
    if (window.confirm('Are you sure to mark this order as paid?')) {
      const mockPaymentResult = {
        id: 'MOCK_PAYMENT_ID', // Mock payment ID
        status: 'completed', // Mock payment status
        update_time: new Date().toISOString(), // Mock update time
        email_address: 'mock@example.com', // Mock email address
      };
      dispatch(payOrder(order, mockPaymentResult)); // Dispatch payOrder with mock payment result
      history.push(`/order/${order._id}`); // Redirect to order details
    }
  };
  

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h3 id="order-id">Order ID: {order._id}</h3>
      <div className="row-container">
        <div className="col-6">
          <ul>
            <li>
              <div className="card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName}
                </p>
                <p>
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{order.shippingAddress.postalcode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered.</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card-body">
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong> {order.paymentMethod} <br />
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid.</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row1 order-row1">
                        <div className="small">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="min-30">
                          <Link to={`/products/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <p>{item.qty} x ${item.price} = ${item.price * item.qty}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-7">
          <div className="card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <p>Items</p>
                <p>${order.itemsPrice.toFixed(2)}</p>
              </li>
              <li>
                <p>Shipping</p>
                <p>${order.shippingPrice.toFixed(2)}</p>
              </li>
              <li>
                <p>Tax</p>
                <p>${order.taxPrice.toFixed(2)}</p>
              </li>
              <li>
                <p>
                  <strong>Total</strong>
                </p>
                <p>
                  <strong>${order.totalPrice.toFixed(2)}</strong>
                </p>
              </li>
              <div className="order-page-pay-btn">
                {!order.isPaid && (
                  <button type="button" className="btn btn-primary" onClick={markAsPaidHandler}>
                    Mark as Paid
                  </button>
                )}
                {order.isPaid && !sdkReady ? (
                  <MessageBox variant="success">Payment done!</MessageBox>
                ) : (
                  <>
                    {errorPay && <MessageBox variant="danger"></MessageBox>}
                    {loadingPay && <LoadingBox></LoadingBox>}
                    <div ref={paypalButtonRef}>
                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                    </div>
                  </>
                )}


              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
