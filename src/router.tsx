import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home.page";
import ErrorPage from "./pages/error.page";
import { Login } from "./pages/login.page";
import SearchResult from "./pages/searchResult.page";
import RestaurantPage from "./pages/restaurant.page";
import CartPage from "./pages/cart.page";
import Register from "./pages/register.page";
import OrderList from './pages/orderList.page';
import Setting from "./pages/setting.page";
import AddDish from "./pages/addDish.page";

const router = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>,
      errorElement: <ErrorPage />,
    },
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
      path: '/orderList',
      element: <OrderList></OrderList>
    },
    {
      path: '/setting',
      element: <Setting></Setting>
    },
    {
      path: '/addDish',
      element: <AddDish></AddDish>
    },
  ]);


export default router;