import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../layout/Main";
import SignIn from "../pages/SignIn/SignIn";
import PrivetRoute from "./PrivetRoute";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import SignUp from "../pages/SignUp/SignUp";
import Search from "../pages/Search/Search";


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
          path:'/signUp',
          element:<SignUp></SignUp>
        },
        {
          path:'/productDetails/:id',
          element:<PrivetRoute><ProductDetails></ProductDetails></PrivetRoute>,
          loader: ({ params }) => fetch(`https://lunexa-server.vercel.app/product/${params.id}`)
        },
        {
          path:'/search',
          element:<PrivetRoute><Search></Search></PrivetRoute>,
        }
      ]

    }
])