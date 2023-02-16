import AuthLayout from 'layout/AuthLayout';
import { lazy } from 'react';

import Loadable from 'components/Loadable';

const Login = Loadable(lazy(() => import('pages/Authentication/Login')));
const Register = Loadable(lazy(() => import('pages/Authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'signup',
            element: <Register />
        }
    ]
};

export default LoginRoutes;
