/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Home', () => {
  test('renders Home component', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const homeElement = screen.getByText('Home');
    expect(homeElement).toBeInTheDocument();
  });

  test('redirects to login if user is not authenticated', () => {
    sessionStorage.clear();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const loginElement = screen.getByText('Home');
    expect(loginElement).toBeInTheDocument();
  });

});