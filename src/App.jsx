import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import store, { persistedStore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import RegisterProvider from "./contexts/register/RegisterProvider";
import HomeLayout from "./layout/HomeLayout";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true, // akan ditampilkan outlet
        element: <Home />,
      },
    ],
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
