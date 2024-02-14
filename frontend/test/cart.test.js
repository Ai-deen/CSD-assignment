import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../src/Store.js';
import Cart from '../src/pages/Cart.js';
import '@testing-library/jest-dom';

const assert = require("assert");

describe("Cart Component", () => {
  it("Renders cart items correctly", async () => {
    render(
      <Provider store={store}>
        <Router> 
          <Cart match={{ params: { id: 'mockId' } }} location={{ search: '?qty=2' }} />
        </Router>
      </Provider>
    );


    // Continue with assertions
    expect(screen.getByText("Back to home")).toBeInTheDocument();
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Proceed to Checkout")).toBeInTheDocument();
  });

});
