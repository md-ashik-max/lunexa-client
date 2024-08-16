import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../layout/Main";
import SignIn from "../pages/SignIn/SignIn";
import PrivetRoute from "./PrivetRoute";
import ProductDetails from "../pages/ProductDetails/ProductDetails";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>

        },
        {
          path:'/signIn',
          element:<SignIn></SignIn>
        },
        {
          path:'/productDetails/:id',
          element:<PrivetRoute><ProductDetails></ProductDetails></PrivetRoute>
        }
      ]

    }
])