import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Home from './pages/home.page';
import Title from './component/title.component';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn React/i);
  expect(linkElement).toHaveTextContent('Learn React');
});

test('check title component exist', () => {
  render(<Title />);
  const linkElement = screen.getByText(/Click N Crave/i);
  expect(linkElement).toHaveTextContent('Click N Crave');
});



