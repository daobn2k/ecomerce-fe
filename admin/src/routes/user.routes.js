import { paths } from 'constants/paths.constants';
import DetailUser from 'pages/DetailUser';
import Notifications from 'pages/Notifications';

export const user = [
  {
    label: 'Tạo mới người dùng',
    path: `${paths.createUser}`,
    key: `${paths.createUser}`,
    element: <DetailUser />,
  },
  {
    label: 'Chi tiết người dùng',
    path: `${paths.user}/:id`,
    key: `${paths.user}/:id`,
    element: <DetailUser />,
  },
  {
    label: 'Tạo mới người dùng',
    path: `${paths.useCreate}`,
    key: `${paths.useCreate}`,
    element: <DetailUser />,
  },
  {
    label: 'Thông báo',
    path: `${paths.notification}`,
    key: `${paths.notification}`,
    element: <Notifications />,
  },
];
