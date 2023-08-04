import { paths } from 'constants/paths.constants';
import MainAuthLayout from 'layouts/MainAuthLayout';
import { Login } from 'pages/Login';
import NotFoundPage from 'pages/NotFoundPage';
import UnAuthorizedPage from 'pages/UnAuthorizedPage';
import { createBrowserRouter } from 'react-router-dom';
import { categories } from './categories.routes';
import menu from './menu';
import { products } from './product.routes';
import { user } from './user.routes';
import { vouchers } from './voucher.routes';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <MainAuthLayout />,
    children: [...menu, ...user, ...products, ...categories, ...vouchers],
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
