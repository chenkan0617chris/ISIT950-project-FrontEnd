import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";
import { Login } from "./pages/Login";
import SearchResult from "./pages/SearchResult";
import RestaurantPage from "./pages/Restaurant";
import CartPage from "./pages/Cart";
import Register from "./pages/Register";
import OrderList from './pages/OrderList';
import Setting from "./pages/Setting";
import AddDish from "./pages/AddDish";
import OrderDetail from "./pages/OrderDetail";

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
    {
      path: '/orderDetails',
      element: <OrderDetail></OrderDetail>
    },
  ]);


export default router;