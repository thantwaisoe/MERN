import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import PageNotFound from './components/PageNotFound';
// import all routes
import Password from './components/Password';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';
import Username from './components/Username';



// root routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <Username/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/recovery',
        element: <Recovery/>
    },
    {
        path: '/password',
        element: <Password/>
    },
    {
        path: '/profile',
        element: <Profile/>
    },
    {
        path: '/reset',
        element: <Reset/>
    },
    {
        path: '*',
        element: <PageNotFound/>
    }
])
export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
