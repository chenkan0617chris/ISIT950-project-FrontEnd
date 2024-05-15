import { createBrowserRouter } from "react-router-dom";
import Order from "./pages/order.page";
import Home from "./pages/home.page";
import ErrorPage from "./pages/error.page";
import { Login } from "./pages/login.page";
import SearchResult from "./pages/searchResult.page";
import RestaurantPage from "./pages/restaurant.page";
import CartPage from "./pages/cart.page";
import Register from "./pages/register.page";
import History from './pages/history.page';

const router = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>,
      errorElement: <ErrorPage />,
    },
    // {
    //   path: '/order',
    //   element: <Order></Order>
    // },
    {
      path: '/auth/login',
      element: <Login></Login>
    },
    {
      path: '/auth/register',
      element: <Register></Register>
    },
    {
      path: '/search',
      element: <SearchResult></SearchResult>
    },
    {
      path: '/restaurant',
      element: <RestaurantPage></RestaurantPage>
    },
    {
      path: '/cart',
      element: <CartPage></CartPage>
    },
    {
      path: '/history',
      element: <History></History>
    },
  ]);


export default router;