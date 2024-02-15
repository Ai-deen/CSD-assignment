import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link
import { listProducts } from '../../actions/ProdcutActions';
import ProductList from '../../components/ProductList';
import Slider from 'react-slick';
import "../../styles/Home.css";
import Product from '../../components/Product';
import carousel from '../../images/carousel kass.png';

const AdminHome = () => {
    return(
        <div>
            <ul>Users</ul>
            <ul>Vendors</ul>
            <ul>DeliveryPeople</ul>
        </div>
    )
}

export default AdminHome;
