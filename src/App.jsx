import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import store, { persistedStore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import RegisterProvider from "./contexts/register/RegisterProvider";

import Home from "./pages/Home";
import Product from "./pages/Product";
import MainLayout from "./layout/MainLayout";
import DetailProduct from "./pages/DetailProduct";
import Error from "./pages/Error";
import CheckoutProduct from "./pages/CheckoutProduct";
import HistoryOrder from "./pages/HistoryOrder";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./layout/AdminLayout";
import AdminProductList from "./pages/AdminProductList";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PrivateRoute from "./routes/PrivateRoutes";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <DetailProduct /> },

      {
        element: <PrivateRoute />,
        children: [
          { path: "checkout-product/:id", element: <CheckoutProduct /> },
          { path: "history-order", element: <HistoryOrder /> },
          { path: "detail-order/:id", element: <OrderDetail /> },
          { path: "profile", element: <Profile /> },
        ],
      },

      { path: "*", element: <Error /> },
    ],
  },

  {
    path: "/dashboard/admin",
    element: <PrivateRoute requireAdmin={true} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "product-list", element: <AdminProductList /> },
        ],
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <RegisterProvider>
          <RouterProvider router={router} />
        </RegisterProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
