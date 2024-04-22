import { createBrowserRouter } from "react-router-dom";
import Order from "./pages/order.page";
import Home from "./pages/home.page";
import ErrorPage from "./pages/error.page";
import { Login } from "./pages/login.page";
import SearchResult from "./pages/searchResult.page";

const router = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>,
      errorElement: <ErrorPage />,
    },
    {
      path: '/order',
      element: <Order></Order>
    },
    {
      path: 'auth/login',
      element: <Login></Login>
    },
    {
      path: 'search',
      element: <SearchResult></SearchResult>
    }
    
  ]);


export default router;