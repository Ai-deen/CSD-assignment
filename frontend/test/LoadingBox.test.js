import React from 'react';
import { render } from '@testing-library/react';
import LoadingBox from '../src/components/LoadingBox';
import '@testing-library/jest-dom/extend-expect';
describe('LoadingBox Component', () => {
    it('renders without crashing', () => {
        render(<LoadingBox />);
    });

    it('renders the loop icon', () => {
        const { getByTestId } = render(<LoadingBox />);
        const loopIcon = getByTestId('loop-icon');
        expect(loopIcon).toBeInTheDocument();
    });
});
