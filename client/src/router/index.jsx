import { createBrowserRouter } from 'react-router-dom';
import { paths } from '../constants/paths.constants';
import AppLayout from '../layouts/AppLayout';
import { listMenus } from './menu';
import NotFoundPage from './NotFoundPage';
import UnAuthorizedPage from './UnAuthorizedPage';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [...listMenus],
  },
  {
    path: paths.unauthorized,
    element: <UnAuthorizedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
