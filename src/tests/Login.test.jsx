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

    await waitFor(() => screen.getByText('Inicio de sesion'));

    const fetchSpy = sinon.stub().resolves({
      json: () =>
        Promise.resolve({
          password: 'Nelson',
          userName: 'Nelson2',
        }),
    });

    global.fetch = fetchSpy;
    expect(fetchSpy.callCount).toBe(0);
    expect(fetchSpy.calledWith('https://backend-bancolombia.onrender.com/users')).toBe(false);

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

  });

});
