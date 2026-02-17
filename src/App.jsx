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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/:id",
        element: <DetailProduct />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
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
