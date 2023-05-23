import { useRoutes } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import Tracking from './Tracking';

const TrackingRoutes = {
    path: '/tracking/:productid',
    element: <Tracking />,
};


export default function ThemeRoutes() {
    return useRoutes([MainRoutes, LoginRoutes, TrackingRoutes]);
}
