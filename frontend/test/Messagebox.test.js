import React from 'react';
import { render } from '@testing-library/react';
import MessageBox from '../src/components/MessageBox';
import '@testing-library/jest-dom/extend-expect'; 

describe('MessageBox Component', () => {
    it('renders with default "info" variant', () => {
        const { getByText, container } = render(
            <MessageBox>
                This is an info message.
            </MessageBox>
        );

        const messageBox = container.firstChild;
        expect(messageBox).toHaveClass('alert-info');
        expect(getByText(/This is an info message./i)).toBeInTheDocument();
    });

    it('renders with "success" variant', () => {
        const { getByText, container } = render(
            <MessageBox variant="success">
                This is a success message.
            </MessageBox>
        );

        const messageBox = container.firstChild;
        expect(messageBox).toHaveClass('alert-success');
        expect(getByText(/This is a success message./i)).toBeInTheDocument();
    });

});
