import React from 'react';
import { render, screen, fireEvent ,waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../src/Store.js';
import Register from '../src/pages/Register.js';
import '@testing-library/jest-dom/extend-expect';
const assert = require('assert');
describe('Register', () => {
  it('Valid registration', () => {
    const { getByLabelText, queryByText } = render(
      <Provider store={store}>
        <Router>
        <Register {...{ location: { search: "" } }} />
        </Router>
      </Provider>
    );
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('E-mail:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Address:'), { target: { value: '123 Main St' } });
    fireEvent.change(getByLabelText('Phone Number:'), { target: { value: '1234567890' } });
    fireEvent.change(getByLabelText('Location:'), { target: { value: 'City' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('Confirm Password:'), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByTestId('form'));
    expect(queryByText('Password does not match.')).toBeNull();
  });
  it('Invalid registration - Password mismatch',async () => {
    const { getByLabelText, queryByText } = render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('E-mail:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Address:'), { target: { value: '123 Main St' } });
    fireEvent.change(getByLabelText('Phone Number:'), { target: { value: '1234567890' } });
    fireEvent.change(getByLabelText('Location:'), { target: { value: 'City' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('Confirm Password:'), { target: { value: 'password' } });
    fireEvent.submit(screen.getByTestId('form'));
    await waitFor(() => {
      expect(screen.getByText('Password does not match.')).toBeInTheDocument();
    });
  });
});
