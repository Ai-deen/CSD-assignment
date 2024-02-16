import React from "react";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import RegisterVendor from "../pages/RegisterVendor";
import RegisterDelivery from "../pages/RegisterDelivery";
import ShippingAddress from "../pages/ShippingAddress";
import PaymentMethod from "../pages/PaymentMethod";
import PlaceOrder from "../pages/PlaceOrder";
import OrderDetails from "../pages/OrderDetails";
import OrderHistory from "../pages/OrderHistory";
import UserProfile from "../pages/UserProfile";
import VendorProfile from "../pages/VendorProfile";
import PrivateRoute from "./PrivateRoute";
import SearchResults from "../pages/SearchResults";
import AllProducts from "../adminpages/AllProducts";
import CategoryBasedPage from "../pages/CategoryBasedPage";
import VendorHome from "../vendorpages/VendorHome";
import ProductForm from "../vendorpages/ProductForm";
import ServicePage from '../pages/Service';
import VendorList from '../pages/ServicerList'
import ManageProducts from "../vendorpages/ManageProducts";
import deliveryHome from "../deliverypages/deliveryHome";
import ManageServices from "../vendorpages/Manageservices";
import VendorHeader from "../vendorpages/VendorHeader";
import ServiceShippingAddress from "../pages/ServiceShippingAddress";
import PlaceService from "../pages/PlaceService";
import ServiceDetails from "../pages/ServiceDetails";
import Wishlist from "../pages/Wishlist";
import AdminHome from "../adminpages/AdminHome";
import About from "../pages/AboutUs";
import Contact from "../pages/ContactUs";
import UserList from "../adminpages/AllUsers";
import VendorList_a from "../adminpages/AllVendors";
import DeliveryPersons_a from "../adminpages/AllDeliveryPeople";
// import AdminHeader from "../adminpages/AdminHeader";

const App = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const vendorSignin = useSelector((state) => state.vendorSignin);
  const { vendorInfo, loading, error } = vendorSignin;
  
  return (
    console.log(userInfo),
    <>
      <Router>
        <>{vendorInfo ? <VendorHeader /> : <Header />}</>
        {/* <>{userInfo && userInfo.isAdmin ? <AdminHeader /> : <Header />}</> */}

        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/vendorhome" component={VendorHome} exact></Route>
          <Route path="/deliveryhome" component={deliveryHome} exact></Route>
          <Route path="/add-product" component={ProductForm} />
          <Route path="/manage-products" component={ManageProducts} />
          <Route path="/manage-services" component={ManageServices} />
          <Route exact path="/cart/:id?" component={Cart}></Route>
          <Route exact path="/signin" component={SignIn}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route
            exact
            path="/registerVendor"
            component={RegisterVendor}
          ></Route>
          <Route
            exact
            path="/registerDelivery"
            component={RegisterDelivery}
          ></Route>
          <Route path="/products/product/:id" component={ProductPage}></Route>
          <Route
            path="/serviceshipping"
            component={ServiceShippingAddress}
          ></Route>
          <Route path="/shipping" component={ShippingAddress}></Route>
          <Route path="/payment" component={PaymentMethod}></Route>
          <Route path="/placeorder" component={PlaceOrder}></Route>
          <Route path="/placeservice" component={PlaceService}></Route>
          <Route path="/order/:id" component={OrderDetails}></Route>
          <Route path="/service/:id" component={ServiceDetails}></Route>
          <Route path="/orderhistory" component={OrderHistory}></Route>
          <Route path="/wishlist" component={Wishlist} />
          <PrivateRoute path="/profile" component={UserProfile}></PrivateRoute>
          <PrivateRoute path="/vendor-profile" component={VendorProfile}></PrivateRoute>
          <Route path="/searchresults/:query" component={SearchResults} exact></Route>
          <Route path="/servicerList" component={VendorList} />
          <Route path="/services/:vendorId" component={ServicePage} />
          <Route path="/category/:cat" component={CategoryBasedPage} exact ></Route>

          <Route path="/adminhome" component={AdminHome}/>
          <Route path="/admin/users" component={UserList}/>
          <Route path="/admin/vendors" component={VendorList_a}/>
          <Route path="/admin/deliverypeople" component={DeliveryPersons_a}/>
          {/* <Route path="/users_a/:id" component={UserDetails_a} /> */}

          <Route path="/productlist" component={AllProducts}></Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
