import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import OrderDetails from '../src/pages/OrderDetails.js';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureMockStore([thunk]);

describe('OrderDetails Component', () => {
  it('renders order details', async () => {
    const initialState = {
      orderDetails: {
        order: {
          _id: '123',
          shippingAddress: {
            fullName: 'John Doe',
            address: '123 Main St',
            city: 'City',
            postalcode: '12345',
            country: 'Country',
          },
          isDelivered: true,
          deliveredAt: '2022-01-01',
          paymentMethod: 'PayPal',
          isPaid: true,
          paidAt: '2022-01-02',
          orderItems: [
            {
              product: '1',
              name: 'Product 1',
              image: 'product1.jpg',
              qty: 2,
              price: 10,
            },
            {
              product: '2',
              name: 'Product 2',
              image: 'product2.jpg',
              qty: 1,
              price: 20,
            },
          ],
          itemsPrice: 40,
          shippingPrice: 10,
          taxPrice: 6,
          totalPrice: 56,
        },
        loading: false,
        error: null,
      },
      orderPay: {
        loading: false,
        error: null,
        success: false,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <OrderDetails match={{ params: { id: '123' } }} />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Order ID: 123')).toBeInTheDocument();
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Address: 123 Main St, City, 12345, Country')).toBeInTheDocument();
    expect(screen.getByText('Delivered at 2022-01-01')).toBeInTheDocument();
  
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
    expect(screen.getByText('Method: PayPal')).toBeInTheDocument();
    expect(screen.getByText('Paid at 2022-01-02')).toBeInTheDocument();

    expect(screen.getByText('Order Items')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Items')).toBeInTheDocument();
    expect(screen.getByText('$40.00')).toBeInTheDocument();
    expect(screen.getByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('Tax')).toBeInTheDocument();
    expect(screen.getByText('$6.00')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$56.00')).toBeInTheDocument();

    // Add more assertions based on your actual component structure
  });
});
