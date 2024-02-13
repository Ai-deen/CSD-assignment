import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/OrderAction";
import { listServiceMine } from "../actions/ServiceAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../styles/OrderHistory.css";
import InfoIcon from "@material-ui/icons/Info";

const OrderHistory = (props) => {
  const dispatch = useDispatch();

  // Fetching orders and services data from Redux store
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading: orderLoading, error: orderError, orders } = orderMineList;

  const serviceMineList = useSelector((state) => state.serviceMineList);
  const {
    loading: serviceLoading,
    error: serviceError,
    services,
  } = serviceMineList;

  // Fetch order and service data on component mount
  useEffect(() => {
    dispatch(listOrderMine());
    dispatch(listServiceMine());
  }, [dispatch]);

  return (
    <div className="orderhistory-container">
      <div className="orders">
        <h1>Order History</h1>
        {/* Render loading state */}
        {orderLoading ? (
          <LoadingBox />
        ) : orderError ? (
          // Render error message if there's an error
          <MessageBox variant="danger">{orderError}</MessageBox>
        ) : (
          // Render orders table if data is available
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>$ {order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="order-details-btn"
                      onClick={() => props.history.push(`/order/${order._id}`)}
                    >
                      <InfoIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Display service history table */}
      <div className="services">
        <h1>Service History</h1>
        {serviceLoading ? (
          <LoadingBox />
        ) : serviceError ? (
          <MessageBox variant="danger">{serviceError}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td>{service._id}</td>
                  <td>{service.createdAt.substring(0, 10)}</td>
                  <td>$ {service.totalPrice}</td>
                  <td>
                    {service.isPaid ? service.paidAt.substring(0, 10) : "No"}
                  </td>
                  <td>
                    {service.isDelivered
                      ? service.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="order-details-btn"
                      onClick={() =>
                        props.history.push(`/service/${service._id}`)
                      }
                    >
                      <InfoIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
