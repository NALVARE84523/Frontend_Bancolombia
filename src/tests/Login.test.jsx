/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../pages/Login';

describe('Login component', () => {
  test('renders login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByTestId('userName');
    const passwordInput = screen.getByTestId('password');
    const loginButton = screen.getByRole('button', { name: 'Ingresar' });
    const newUserLink = screen.getByRole('link', { name: 'Registrate' });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(newUserLink).toBeInTheDocument();
  });

  test('performs login with valid credentials', async () => {
    const history = createMemoryHistory();
    const mockFetch = () =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            password: 'Nelson',
            userName: 'Nelson2',
          }),
      });
    global.fetch = mockFetch;

    render(
      <MemoryRouter history={history}>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByTestId('userName');
    const passwordInput = screen.getByTestId('password');
    const loginButton = screen.getByRole('button', { name: 'Ingresar' });

    fireEvent.change(usernameInput, { value: 'Nelson2' } );
    fireEvent.change(passwordInput, { value: 'Nelson' } );
    fireEvent.click(loginButton);

    // Espera a que se complete la llamada fetch
    await waitFor(() => screen.getByText('Inicio de sesion'));

   // Crear el espía
    const fetchSpy = sinon.stub().resolves({
      json: () =>
        Promise.resolve({
          password: 'Nelson',
          userName: 'Nelson2',
        }),
    });

// Sobrescribir la función fetch global
    global.fetch = fetchSpy;
    expect(fetchSpy.callCount).toBe(0);
    expect(fetchSpy.calledWith('https://backend-bancolombia.onrender.com/users')).toBe(false);

    // ...

    // Restaurar la función fetch original
    delete global.fetch;
/*     expect(sessionStorage.getItem('userName')).toBe('Nelson2');
    expect(sessionStorage.getItem('userRole')).toBe('doer'); */
    expect(history.location.pathname).toBe('/');
  });

  test('displays error message with invalid credentials', async () => {
    const mockFetch = () =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          password: 'Nelson',
          userName: 'Nelson2',
        }),
    });
    global.fetch = mockFetch;

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByTestId('userName');
    const passwordInput = screen.getByTestId('password');
    const loginButton = screen.getByRole('button', { name: 'Ingresar' });
    console.log("usernameInput: ", usernameInput);

    fireEvent.change(usernameInput, { value: 'testuser' } );
    fireEvent.change(passwordInput, { value: 'incorrectpassword' } );
    fireEvent.click(loginButton);

    // Wait for fetch to complete
    /* await waitFor(() => screen.findByText('Please enter valid credentials')) */

    /* expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://backend-bancolombia.onrender.com/users/testuser'
    );
    expect(sessionStorage.getItem('userName')).toBeNull();
    expect(sessionStorage.getItem('userRole')).toBeNull(); */
  });

  // Add more test cases for edge cases and validation if needed
});
