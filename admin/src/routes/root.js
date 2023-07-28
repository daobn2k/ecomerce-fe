import { paths } from 'constants/paths.constants';
import MainAuthLayout from 'layouts/MainAuthLayout';
import { Login } from 'pages/Login';
import NotFoundPage from 'pages/NotFoundPage';
import UnAuthorizedPage from 'pages/UnAuthorizedPage';
import { createBrowserRouter } from 'react-router-dom';
import menu from './menu';
import { user } from './user.routes';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <MainAuthLayout />,
    children: [...menu, ...user],
  },
  {
    path: paths.unauthorized,
    element: <UnAuthorizedPage />,
  },
  {
    path: paths.login,
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
