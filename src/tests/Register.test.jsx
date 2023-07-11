/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register';

describe('Register', () => {
  test('renders Register component', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const registerElement = screen.getByTestId('registro');
    expect(registerElement).toBeInTheDocument();
  });

  test('validates form and shows error messages', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    
    const registerButton = screen.getByTestId('registrarme');
    fireEvent.click(registerButton);

    expect(() => screen.getByText(/Please enter the value in/i)).toThrow();
  });

  test('validates email format and shows error message', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const registerButton = screen.getByTestId('registrarme');
    fireEvent.click(registerButton);

    expect(() => screen.getByText(/Please enter the valid email/i)).toThrow();
  });
});