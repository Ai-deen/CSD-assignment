import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod, sa } from '../actions/CartAction';
import { saveServicePaymentMethod } from "../actions/ServiceAction";
import CheckoutSteps from '../components/CheckoutSteps'
import "../styles/PaymentMethod.css"

const PaymentMethod = (props) => {

    const state = useSelector((state) => state);

    console.log("State:", state);

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    
    const servicecart = useSelector((state) => state.servicecart);
    const { serviceshippingAddress } = servicecart;

    if(!shippingAddress.address) {
        props.history.push('/shipping');
    }

    // if (!serviceshippingAddress.address) {
    //   props.history.push("/shipping");
    // }

    const [method, setMethod] = useState('PayPal');
    const dispatch = useDispatch();
    console.log(cart);
    console.log("servicecart" , servicecart);

    const submitMethod = (e) => {
      e.preventDefault();
      if (cart.cartItems && cart.cartItems.length > 0) {
        dispatch(savePaymentMethod(method));
        props.history.push("/placeorder");
      } else {
        dispatch(saveServicePaymentMethod(method));
        props.history.push("/placeservice");
      }
    };

    return (
      <div>
        <CheckoutSteps step1 step2 step3 />

        <div className="pay-method-container">
          <form className="form" onSubmit={submitMethod}>
            <div>
              <h1>Payment Method</h1>
            </div>

            <div className="select-method-ip">
              <input
                type="radio"
                id="paypal"
                value="PayPal"
                name="paymentMethod"
                required
                checked
                onChange={(e) => setMethod(e.target.value)}
              ></input>
              <label htmlFor="paypal">PayPal</label>
            </div>

            <div className="select-method-ip">
              <input
                type="radio"
                id="stripe"
                value="Stripe"
                name="paymentMethod"
                required
                onChange={(e) => setMethod(e.target.value)}
              ></input>
              <label htmlFor="stripe">Stripe</label>
            </div>

            <div className="select-method-ip">
              <input
                type="radio"
                id="cod"
                value="cod"
                name="paymentMethod"
                required
                onChange={(e) => setMethod(e.target.value)}
              ></input>
              <label htmlFor="stripe">COD</label>
            </div>

            <div>
              <label />
              <button className="submit-btn" type="submit">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default PaymentMethod
