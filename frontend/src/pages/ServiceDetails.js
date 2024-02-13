import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/PlaceOrder.css";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsService, payService } from "../actions/ServiceAction";
import "../styles/OrderDetails.css";
import axios from "../Axios";
import { PayPalButton } from "react-paypal-button-v2";
import { SERVICE_PAY_RESET } from "../constants/ServiceConstant";

const API = "http://localhost:4001";

const ServiceDetails = (props) => {
  const serviceID = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const serviceDetails = useSelector((state) => state.serviceDetails);
  const { service, loading, error } = serviceDetails;
    const dispatch = useDispatch();
    console.log(service);

  const servicePay = useSelector((state) => state.servicePay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = servicePay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get(API + "/api/config/paypal");
      const script = document.createElement("script");

      console.log(data);
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!service || successPay || (service && service._id != serviceID)) {
      dispatch({
        type: SERVICE_PAY_RESET,
      });
      dispatch(detailsService(serviceID));
    } else {
      if (!service.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, serviceID, sdkReady, service]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payService(service, paymentResult));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h3 id="order-id">SERVICE ID: {service._id}</h3>
      <div className="row-container">
        <div className="col-6">
          <ul>
            <li>
              <div className="card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>{" "}
                  {service.serviceshippingAddress.fullName}
                </p>
                <p>
                  <strong>Address: </strong>{" "}
                  {service.serviceshippingAddress.address},
                  {service.serviceshippingAddress.city},
                  {service.serviceshippingAddress.postalcode},
                  {service.serviceshippingAddress.country}
                </p>
                {service.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {service.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered.</MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="card-body">
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong> {service.paymentMethod} <br />
                </p>
                {service.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {service.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid.</MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="card-body">
                <h2>Order Items</h2>
                {/* <ul>
                  {service.serviceItems.map((item) => (
                    <li key={item._id}>
                      <div className="row1 order-row1">
                        <div className="small">
                          <img src={item.image} alt=""></img>
                        </div>
                        
                      </div>
                    </li>
                  ))}
                </ul> */}
              </div>
            </li>
          </ul>
        </div>

        <div className="col-7">
          <div className="card-body">
            <ul>
              <li>
                <h2>Service Summary</h2>
              </li>
              <li>
                <p>Items</p>
                <p>${service.itemsPrice.toFixed(2)}</p>
              </li>
              <li>
                <p>Shipping</p>
                <p>${service.shippingPrice.toFixed(2)}</p>
              </li>
              <li>
                <p>Tax</p>
                <p>${service.taxPrice.toFixed(2)}</p>
              </li>
              <li>
                <p>
                  <strong>Total</strong>
                </p>
                <p>
                  <strong>${service.totalPrice.toFixed(2)}</strong>
                </p>
              </li>

              <div className="order-page-pay-btn">
                {service.isPaid && !sdkReady ? (
                  <MessageBox variant="success">Payment done!</MessageBox>
                ) : (
                  <>
                    {errorPay && <MessageBox variant="danger"></MessageBox>}
                    {loadingPay && <LoadingBox></LoadingBox>}
                    <PayPalButton
                      amount={service.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
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

export default ServiceDetails;
