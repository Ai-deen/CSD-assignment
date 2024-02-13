import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/PlaceOrder.css";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import { createdService } from "../actions/ServiceAction";
import { SERVICE_CREATE_RESET } from "../constants/ServiceConstant";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";



const PlaceService = (props) => {
  const servicecart = useSelector((state) => state.servicecart);
  console.log(servicecart);

  if (!servicecart.paymentMethod) {
    props.history.push("/payment");
  }

  const serviceCreate = useSelector((state) => state.serviceCreate);
  const { loading, success, error, service } = serviceCreate;

  // Calculate prices
  const toPrice = (num) => Number(num.toFixed(2));

  const itemsPrice = toPrice(10);
  const shippingPrice = itemsPrice > 100 ? toPrice(0) : toPrice(10);
  const taxPrice = toPrice(0.05 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeService = () => {
    // Check if all required fields are present
    if (
      servicecart.serviceshippingAddress &&
      servicecart.serviceshippingAddress.country &&
      servicecart.serviceshippingAddress.postalcode &&
      servicecart.serviceshippingAddress.city &&
      servicecart.serviceshippingAddress.address &&
      servicecart.serviceshippingAddress.fullName &&
      itemsPrice &&
      shippingPrice &&
      taxPrice &&
      totalPrice &&
      servicecart.vendor
    ) {
      // If all required fields are present, dispatch the createdService action
      dispatch(
        createdService({
          ...servicecart,
          vendorId: servicecart.vendor,
          serviceItems: servicecart.servicecartItems,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        })
      );
    } else {
      // If any required field is missing, log an error message indicating which field is missing
      console.error("Some required fields are missing:");
      if (
        !servicecart.serviceshippingAddress ||
        !servicecart.serviceshippingAddress.fullName
      ) {
        console.error("Shipping address or full name is missing");
      }
      if (
        !servicecart.serviceshippingAddress ||
        !servicecart.serviceshippingAddress.address
      ) {
        console.error("Shipping address is missing");
      }
      if (
        !servicecart.serviceshippingAddress ||
        !servicecart.serviceshippingAddress.city
      ) {
        console.error("City is missing");
      }
      if (
        !servicecart.serviceshippingAddress ||
        !servicecart.serviceshippingAddress.postalcode
      ) {
        console.error("Postal code is missing");
      }
      if (
        !servicecart.serviceshippingAddress ||
        !servicecart.serviceshippingAddress.country
      ) {
        console.error("Country is missing");
      }
      if (!itemsPrice) {
        console.error("Items price is missing");
      }
      if (!shippingPrice) {
        console.error("Shipping price is missing");
      }
      if (!taxPrice) {
        console.error("Tax price is missing");
      }
      if (!totalPrice) {
        console.error("Total price is missing");
      }
      if (!servicecart.vendor) {
        console.error("Vendor is missing");
      }
    }
  };
  //   dispatch(
  //     createdService({
  //       ...servicecart,
  //       serviceItems: servicecart.servicecartItems,
  //     })
  //   );
  // };
  console.log("out",service);

  useEffect(() => {
    if (success) {
      console.log("in", service);
      props.history.push(`/service/${service._id}`);
      dispatch({
        type: SERVICE_CREATE_RESET,
      });
    }
  }, [dispatch, service, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <div className="row-container">
        <div className="col-6">
          <ul>
            <li>
              <div className="card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>{" "}
                  {servicecart.serviceshippingAddress.fullName}
                </p>
                <p>
                  <strong>Address: </strong>{" "}
                  {servicecart.serviceshippingAddress.address},
                  {servicecart.serviceshippingAddress.city},
                  {servicecart.serviceshippingAddress.postalcode},
                  {servicecart.serviceshippingAddress.country}
                </p>
              </div>
            </li>

            <li>
              <div className="card-body">
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong> {servicecart.paymentMethod} <br />
                </p>
              </div>
            </li>

            <li>
              <div className="card-body">
                <h2>Service Items</h2>
                {/* <ul>
                  {servicecart.servicecartItems.map((item) => (
                    <li key={item}>
                      <div className="row1 order-row1">
                        <div className="small">
                          <img src={item.image} alt=""></img>
                        </div>

                        <p>
                          {item} x ${item.price} = ${item.price * item.qty}
                        </p>
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
                <h2>Order Summary</h2>
              </li>
              {/* <li>
                <p>Items</p>
                <p>${cart.itemsPrice.toFixed(2)}</p>
              </li>
              <li>
                <p>Shipping</p>
                <p>${cart.shippingPrice.toFixed(2)}</p>
              </li>
              <li>
                <p>Tax</p>
                <p>${cart.taxPrice.toFixed(2)}</p>
              </li>
              <li>
                <p>
                  <strong>Total</strong>
                </p>
                <p>
                  <strong>${cart.totalPrice.toFixed(2)}</strong>
                </p>
              </li> */}

              <li>
                <button
                  type="button"
                  onClick={placeService}
                  disabled={servicecart.servicecartItems.length === 0}
                  className="placeorder-btn"
                >
                  Place Service Order
                </button>
              </li>
              <li>
                {loading && <LoadingBox></LoadingBox>}
                {error && (
                  <MessageBox variant="danger">
                    <div>
                      <h1>{error}</h1>
                    </div>
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceService;


