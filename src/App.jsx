import './App.css'
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Profilee from './pages/Profilee';
import Income from './pages/Income';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Security from './pages/Security';
import PageNotFound from './pages/PageNotFound';

function App() {
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <LogIn/>  },
        { path: "/login", element: <LogIn/> },
        { path: "/income", element: <Income/> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/profilee", element: <Profilee/> },
        { path: "/signup", element: <SignUp/> },
        // { path: "/login", element: <LogIn/> },
        { path: "/security", element: <Security/> }, 
      ],
    },
    { path: "*", element: <PageNotFound/> },
  ]);
  

  return    <RouterProvider router={router} />

}

export default App
