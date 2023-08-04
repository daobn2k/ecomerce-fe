import { paths } from 'constants/paths.constants';
import DetailCateogry from 'pages/DetailCateogry';
import DetailOrder from 'pages/DetailOrder';

export const orders = [
  {
    label: 'Chi tiết đơn hàng',
    path: `${paths.orders}/:id`,
    key: `${paths.orders}/:id`,
    element: <DetailOrder />,
  },

  {
    label: 'Tạo mới đơn hàng',
    path: `${paths.createOrders}`,
    key: `${paths.createOrders}`,
    element: <DetailOrder />,
  },
];
