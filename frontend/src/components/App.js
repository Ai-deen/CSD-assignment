import React from "react";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import RegisterVendor from "../pages/RegisterVendor";
import ShippingAddress from "../pages/ShippingAddress";
import PaymentMethod from "../pages/PaymentMethod";
import PlaceOrder from "../pages/PlaceOrder";
import OrderDetails from "../pages/OrderDetails";
import OrderHistory from "../pages/OrderHistory";
import UserProfile from "../pages/UserProfile";
import PrivateRoute from "./PrivateRoute";
import SearchResults from "../pages/SearchResults";
import AllProducts from "../pages/Admin/AllProducts";
import CategoryBasedPage from "../pages/CategoryBasedPage";
import VendorHome from "../vendorpages/VendorHome";
import ProductForm from "../vendorpages/ProductForm";
import ManageProducts from "../vendorpages/ManageProducts";

const App = () => {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/vendorhome" component={VendorHome} exact></Route>
          <Route path="/add-product" component={ProductForm} />
          <Route path='/manage-products' component={ManageProducts} />
          <Route exact path="/cart/:id?" component={Cart}></Route>
          <Route exact path="/signin" component={SignIn}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route
            exact
            path="/registerVendor"
            component={RegisterVendor}
          ></Route>
          <Route path="/products/product/:id" component={ProductPage}></Route>
          <Route path="/shipping" component={ShippingAddress}></Route>
          <Route path="/payment" component={PaymentMethod}></Route>
          <Route path="/placeorder" component={PlaceOrder}></Route>
          <Route path="/order/:id" component={OrderDetails}></Route>
          <Route path="/orderhistory" component={OrderHistory}></Route>
          <PrivateRoute path="/profile" component={UserProfile}></PrivateRoute>
          <Route
            path="/searchresults/:query"
            component={SearchResults}
            exact
          ></Route>

          <Route
            path="/category/:cat"
            component={CategoryBasedPage}
            exact
          ></Route>

          {/* Admin sectiojn routes */}

          <Route path="/productlist" component={AllProducts}></Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
