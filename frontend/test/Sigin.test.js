import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../src/Store.js'
import SignIn from '../src/pages/SignIn.js';
const assert = require("assert");
describe("Sign In", () => {
  it("Valid email format", () => {
    const { getByLabelText, queryByText } = render(
      <Provider store={store}>
        <Router> 
        <SignIn {...{ location: { search: "" } }} />
        </Router>
      </Provider>
    );
    const emailInput = getByLabelText("E-mail:");
    fireEvent.change(emailInput, { target: { value: 'ankitakumari@iitbhilai.ac.in' } });
    fireEvent.submit(screen.getByTestId('form'));
    assert.equal(queryByText('Please enter a valid email address.'), null);
  });
  it("Invalid email format", () => {
    const { getByLabelText, queryByText } = render(
      <Provider store={store}>
        <Router> 
          <SignIn />
        </Router>
      </Provider>
    );
    const emailInput = getByLabelText("E-mail:");
    fireEvent.change(emailInput, { target: { value: 'ankita_kumariiitbhilai.ac.in' } });
    fireEvent.submit(screen.getByTestId('form')); 
    assert.notEqual(queryByText('Please enter a valid email address.'), null);
  });
});

