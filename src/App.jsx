import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Categoris from "./components/Categoris/Categoris";
import Brands from "./components/Brands/Brands";
import Notfound from "./components/Notfound/Notfound";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Productdetails from "./components/Productdetails/Productdetails";
import { Toaster } from "react-hot-toast";
import Branddetails from "./components/Branddetails/Branddetails";
import Checkout from "./components/Checkout/Checkout";
import Allorders from "./components/Allorders/Allorders";
import WishList from "./components/WishList/WishList";
//import { Offline } from "react-detect-offline";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Verifycode from "./components/Verifycode/Verifycode";
import Resetpassword from "./components/Resetpassword/Resetpassword";
function App() {
  const queryClient = new QueryClient();
  let route = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "Productdetails/:id/:category",
          element: (
            <ProtectedRoutes>
              <Productdetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "Categoris",
          element: (
            <ProtectedRoutes>
              <Categoris />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "Branddetails/:id",
          element: (
            <ProtectedRoutes>
              <Branddetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <Allorders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "verifycode",
          element: (
            <ProtectedAuth>
              <Verifycode />
            </ProtectedAuth>
          ),
        },
        {
          path: "forgetpassword",
          element: (
            <ProtectedAuth>
              <ForgetPassword />
            </ProtectedAuth>
          ),
        },
        {
          path: "resetpassword",
          element: (
            <ProtectedAuth>
              <Resetpassword />
            </ProtectedAuth>
          ),
        },
        {
          path: "logout",
          element: <Logout />,
        },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="right" reverseOrder={false} />

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={route}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        {/* <Offline>
          <div className="fixed bg-red-500 text-2xl font-semibold text-white py-2 rounded-md">
            your are offline check your connection
          </div>
        </Offline> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
