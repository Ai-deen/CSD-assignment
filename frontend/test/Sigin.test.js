// import React, { Component } from 'react';
// import { fireEvent, render, rtlRender, screen, waitFor } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import {store} from '../src/Store.js';
// import SignIn from '../src/pages/SignIn.js';
// import * as UserAction from '../src/actions/UserAction';
// import '@testing-library/jest-dom/extend-expect'; 

// jest.mock('../src/actions/UserAction', () => ({
//   ...jest.requireActual('../src/actions/UserAction'),
//   signin: jest.fn(),
//   signinVendor: jest.fn(),
// }));
// jest.mock('axios');
// const mockedHistoryPush = jest.fn();
  
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useHistory: () => ({
//     push: mockedHistoryPush,
//   }),
// }));


// describe('SignIn', () => {
//   it('renders Sign In form correctly', () => {
//     rtlRender(
//       <Provider store={store}>
//         <Router>
//           <SignIn />
//         </Router>
//       </Provider>
//     );
//     expect(screen.getByText('Sign In As')).toBeInTheDocument();
    
//   }); 

//   it('handles user sign in correctly',async () => {
//     rtlRender(
//       <Provider store={store}>
//         <Router>
//           <SignIn />
//         </Router>
//       </Provider>
//     );

//     const emailInput = screen.getByPlaceholderText(/Enter email/i);
//     const passwordInput = screen.getByPlaceholderText(/Enter password/i);
//     const signInButton = screen.getByText(/Sign In/i);

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password' } });

//     fireEvent.click(signInButton);

//     // Wait for the asynchronous sign-in action to complete
//     await waitFor(() => {
//       expect(UserAction.signin).toHaveBeenCalledWith(
//         'user',
//         'test@example.com',
//         'password'
        
//       );
//     });

//     // Ensure the user is redirected after successful sign-in
//     expect(mockedHistoryPush).toHaveBeenCalledWith('/');
//   });

//   // Add more tests as needed
// });

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

