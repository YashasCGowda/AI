import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App.jsx';

test('renders AI Healthcare Assistant header', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const headerElement = screen.getByText(/AI Healthcare Assistant/i);
  expect(headerElement).toBeInTheDocument();
});
