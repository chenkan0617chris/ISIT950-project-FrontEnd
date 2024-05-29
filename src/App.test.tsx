import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { RED, WHITE } from "./utils/constant";
import React from 'react';
//Home page
import Home from './pages/Home';
import Title from './component/title.component';
import Subtitle from './component/subtitle.component';
import BeMember from './component/beMember.component';
import SearchForm from './component/searchForm.component';
import MyAppBar from './component/appBar.component';
import Footer from './component/footer.component';

//Login page
import { act } from 'react-dom/test-utils';
import LoginForm from './component/login.component';
import { login } from './service/api'; 
import RestaurantCard, { Restaurant } from './component/restaurantCard.component';

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

test('verify form elements have correct default value', () => {
  const mock=jest.fn();
  render(<SearchForm onSubmit={mock} />);
  const nameinputs = screen.getByPlaceholderText(/search by name/i);
  const mininputs = screen.getByPlaceholderText(/search by min/i);
  expect(nameinputs).toBeInTheDocument();
  expect(mininputs).toBeInTheDocument();
});


test('check it shows a button at homepage', () => {
  const mock=jest.fn();
  render(<SearchForm onSubmit={mock} />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});

test('check there are 6 buttons exist and shows correct content on the bar for customer', () => {
  sessionStorage.setItem('userInfo', JSON.stringify({ type: 'customers' }));
  render(<MyAppBar />);
  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(6);
  const expectedPages = ['Home', 'Search', 'Order List', 'Cart', 'Setting', 'logout'];
  expectedPages.forEach(page => {
    const button = screen.getByRole('button', { name: new RegExp(page, 'i') });
    expect(button).toBeInTheDocument();
  });
});

test('check there are 6 buttons exist and shows correct content on the bar for restaurants', () => {
  sessionStorage.setItem('userInfo', JSON.stringify({ type: 'restaurants' }));
  render(<MyAppBar />);
  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(6);
  const expectedPages = ['Home', 'Order List', 'Menu', 'Add dish', 'Setting', 'logout'];
  expectedPages.forEach(page => {
    const button = screen.getByRole('button', { name: new RegExp(page, 'i') });
    expect(button).toBeInTheDocument();
  });
});

test('check there are 3 buttons exist and shows correct content on the bar for deliveryPerson', () => {
  sessionStorage.setItem('userInfo', JSON.stringify({ type: 'deliveryPerson' }));
  render(<MyAppBar />);
  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(3);
  const expectedPages = ['Home', 'Order List', 'logout'];
  expectedPages.forEach(page => {
    const button = screen.getByRole('button', { name: new RegExp(page, 'i') });
    expect(button).toBeInTheDocument();
  });
});

test('check there are links with correct text', () => {
  render(<Footer />);
  const aboutUsLink = screen.getByRole('link', { name: /About Us/i });
  const deliveryLink = screen.getByRole('link', { name: /Delivery/i });
  const helpSupportLink = screen.getByRole('link', { name: /Help & Support/i });
  const tcLink = screen.getByRole('link', { name: /T&C/i });

  expect(aboutUsLink).toBeInTheDocument();
  expect(deliveryLink).toBeInTheDocument();
  expect(helpSupportLink).toBeInTheDocument();
  expect(tcLink).toBeInTheDocument();

  expect(aboutUsLink).toHaveAttribute('href', '/');
  expect(deliveryLink).toHaveAttribute('href', '/');
  expect(helpSupportLink).toHaveAttribute('href', '/');
  expect(tcLink).toHaveAttribute('href', '/');
});

test('check there is contact information', () => {
  render(<Footer />);
  const contactInfo = screen.getByText(/Contact: \+123456789/i);
  expect(contactInfo).toBeInTheDocument();
});

jest.mock('./service/api', () => ({
  login: jest.fn(),
}));

describe('LoginForm', () => {
  const mockSetOpen = jest.fn();
  const mockSetSnack = jest.fn();

  beforeEach(() => {
    render(<LoginForm setOpen={mockSetOpen} setSnack={mockSetSnack} />);
  });

  test('check the LoginForm component', () => {
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Type")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  test('check there is a "Sign In" button', () => {
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
  });

  test('check there is a "Register Now" link', () => {
    const registerLink = screen.getByRole('link', { name: /register now/i });
    expect(registerLink).toBeInTheDocument();
  });
});

const mockHandleClick = jest.fn();

const mockRestaurant: Restaurant = {
    title: "Test Restaurant",
    description: "This is a test restaurant",
    image: "./images/test.png",
    price: 25,
    postcode: 12345,
    category: "Fast Food",
    rating: 4.5,
};

beforeEach(() => {
    sessionStorage.setItem('userInfo', JSON.stringify({ postcode: 12340 }));
});

describe('RestaurantCard component', () => {
  test('check the restaurant card with main elements', () => {
    render(<RestaurantCard handleClick={mockHandleClick} restaurant={mockRestaurant} />);
    
    const titleElement = screen.getByText(mockRestaurant.title);
    expect(titleElement).toBeInTheDocument();
    
    if (mockRestaurant.description) {
      const descriptionElement = screen.getByText(mockRestaurant.description);
      expect(descriptionElement).toBeInTheDocument();
    }

    const categoryElement = screen.getByText(mockRestaurant.category!);
    expect(categoryElement).toBeInTheDocument();

    const ratingElement = screen.getByText(mockRestaurant.rating.toFixed(1));
    expect(ratingElement).toBeInTheDocument();

    const priceElement = screen.getByText(`$${mockRestaurant.price}`);
    expect(priceElement).toBeInTheDocument();
});

  test('calls handleClick when the button is clicked', () => {
    render(<RestaurantCard handleClick={mockHandleClick} restaurant={mockRestaurant} />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(mockHandleClick).toHaveBeenCalled();
  });

});

