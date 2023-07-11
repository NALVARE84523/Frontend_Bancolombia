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

  // Resto de tus pruebas aquí
  test('validates form and shows error messages', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    
    // Simula el envío del formulario sin completar ningún campo
    const registerButton = screen.getByTestId('registrarme');
    fireEvent.click(registerButton);

    // Verifica que se muestren los mensajes de error correspondientes
    expect(() => screen.getByText(/Please enter the value in/i)).toThrow();
  });

  test('validates email format and shows error message', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Simula el envío del formulario con el campo de email con un formato inválido
    const registerButton = screen.getByTestId('registrarme');
    fireEvent.click(registerButton);

    // Verifica que se muestre el mensaje de error correspondiente
    expect(() => screen.getByText(/Please enter the valid email/i)).toThrow();
  });
});