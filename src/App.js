import React from "react";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Register from "./components/register";
import Username from "./components/username";
import Password from "./components/password";
import Reset from "./components/reset";
import PageNotFound from "./components/pagenotfound";
import Recovery from "./components/recovery";
import Profile from "./components/profile";
import {AuthorizeUser, ProtectRoute} from './middleware/auth';

/** root routes */
const router = createBrowserRouter([
     {
          path: '/',
          element: <Username />
     },
     {
          path: '/register',
          element: <Register />
     },
     {
          path: '/password',
          element: <ProtectRoute><Password /></ProtectRoute>
     },
     {
          path: '/reset',
          element: <Reset />
     },
     {
          path: '*',
          element: <PageNotFound />
     },
     {
          path: '/recovery',
          element: <Recovery />
     },
     {
          path: '/profile',
          element: <AuthorizeUser><Profile /></AuthorizeUser>
     },
])
function App(){
     return(
          <div>
           <RouterProvider router={router}>

           </RouterProvider>
          </div>
     )
}
export default App;