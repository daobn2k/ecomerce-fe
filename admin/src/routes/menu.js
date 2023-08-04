import { paths } from 'constants/paths.constants';
import ListCategory from 'pages/ListCategory';
import ListProducts from 'pages/ListProducts';
import ListUser from 'pages/ListUser';
import ListVoucher from 'pages/ListVoucher';

const menu = [
  {
    label: 'Quản lý sản phẩm',
    path: paths.products,
    key: paths.products,
    element: <ListProducts />,
  },

  {
    label: 'Quản lý loại sản phẩm',
    path: paths.categories,
    key: paths.categories,
    element: <ListCategory />,
  },
  {
    label: 'Quản lý người dùng',
    path: paths.user,
    key: paths.user,
    element: <ListUser />,
  },
  {
    label: 'Quản lý đơn hàng',
    path: paths.orders,
    key: paths.orders,
    element: <ListUser />,
  },
  {
    label: 'Quản lý voucher',
    path: paths.vouchers,
    key: paths.vouchers,
    element: <ListVoucher />,
  },

  // {
  //   label: 'Cài đặt',
  //   path: paths.settingInfo,
  //   key: paths.settingInfo,
  //   element: <SettingInfo />,
  // },
];
export default menu;
