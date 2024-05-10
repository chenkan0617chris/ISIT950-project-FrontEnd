import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
//Home page
import Home from './pages/Home.page';
import Title from './component/title.component';
import Subtitle from './component/subtitle.component';
import BeMember from './component/beMember.component';
import SearchForm from './component/searchForm.component';
import MyAppBar from './component/appBar.component';
import Footer from './component/footer.component';
//Login page
import LoginForm from './component/login.component';


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

test('check subtitle component exist', () => {
  render(<Subtitle />);
  const subtitleElement = screen.getByText(/Satisfy Your/i);
  expect(subtitleElement).toBeInTheDocument();
});

test('check beMember component exist', () => {
  render(<BeMember />);
  const linkElement = screen.getByText(/Be a member/i);
  expect(linkElement).toBeInTheDocument();
});

test('check it shows 2 inputs and a button at homepage', () => {
  const mock=jest.fn();
  render(<SearchForm onSubmit={mock} />);
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('check there are 9 buttons exist on the bar', () => {
  render(<MyAppBar />);
  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(9);
});

test('check it shows correct contents in 9 buttons on the bar in correct order', () => {
  render(<MyAppBar />);
  const buttons = screen.getAllByRole('button');
  const buttonLabels = ['Tracking', 'Menu', 'History', 'Cart', 'Membership', 'Home', 'About', 'Contact', 'login'];
  buttons.forEach((button, index) => {
    expect(button.textContent).toBe(buttonLabels[index]);
  });
});

test('check it shows correct contact number on the footer', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/123456789/i);
  expect(linkElement).toHaveTextContent('123456789');
});

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    defaults: {
      baseURL: '',
      headers: {
        post: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    },
    post: jest.fn((url, data) => Promise.resolve({ data: {} })),
  },
}));

test('check it shows 1 inputs, 1 password input and a sign-in button at loginpage', () => {
  const setOpen = jest.fn();
  const setSnack = jest.fn();
  render(<LoginForm setOpen={setOpen} setSnack={setSnack} />);
  const inputEmail = screen.getAllByRole('textbox');
  const inputPassword = screen.queryAllByLabelText(/password/i);
  const button = screen.getByRole('button', { name: /sign in/i });
  expect(inputEmail).toHaveLength(1);
  expect(inputPassword).toHaveLength(2);
  expect(button).toBeInTheDocument();
});
