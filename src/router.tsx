import { createBrowserRouter } from "react-router-dom";
import Order from "./pages/Order.page";
import Home from "./pages/Home.page";
import ErrorPage from "./pages/Error.page";

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
    
  ]);


export default router;