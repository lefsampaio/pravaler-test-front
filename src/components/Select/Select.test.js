
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import { Select } from './Select';

const select = (
    <Select data-testid="select">
        <option data-testid="select-option" value={2}>
        </option>
    </Select>
)

describe("<Select />", () => {
    it('Simulates selection', () => {
        const { getByTestId, getAllByTestId } = render(select);
        fireEvent.change(getByTestId('select'), { target: { value: 2 } })
        let options = getAllByTestId('select-option')
        expect(options[0].selected).toBeTruthy();
    })
});


