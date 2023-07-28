import { paths } from 'constants/paths.constants';
import MainAuthLayout from 'layouts/MainAuthLayout';
import { Login } from 'pages/Login';
import NotFoundPage from 'pages/NotFoundPage';
import UnAuthorizedPage from 'pages/UnAuthorizedPage';
import { createBrowserRouter } from 'react-router-dom';
import menu from './menu';
import { posts } from './posts';
import { recharge } from './recharge';
import { transaction } from './transaction';
import { user } from './user.routes';
import { video } from './video';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <MainAuthLayout />,
    children: [...menu, ...user, ...posts, ...transaction, ...recharge, ...video],
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
