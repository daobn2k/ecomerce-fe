import { paths } from 'constants/paths.constants';
import DetailCateogry from 'pages/DetailCateogry';
import DetailUser from 'pages/DetailUser';
import Notifications from 'pages/Notifications';

export const user = [
  {
    label: 'Chi tiết người dùng',
    path: `${paths.user}/:id`,
    key: `${paths.user}/:id`,
    element: <DetailUser />,
  },
  {
    label: 'Chi tiết loại sản phẩm dùng',
    path: `${paths.categories}/:id`,
    key: `${paths.categories}/:id`,
    element: <DetailCateogry />,
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
