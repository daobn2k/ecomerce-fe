import { paths } from 'constants/paths.constants';
import ListCategory from 'pages/ListCategory';
import ListUser from 'pages/ListUser';
import SettingInfo from 'pages/SettingInfo';

const menu = [
  {
    label: 'Danh sách người dùng',
    path: paths.user,
    key: paths.user,
    element: <ListUser />,
  },
  {
    label: 'Danh sách loại sản phẩm',
    path: paths.categories,
    key: paths.categories,
    element: <ListCategory />,
  },
  // {
  //   label: 'Cài đặt',
  //   path: paths.settingInfo,
  //   key: paths.settingInfo,
  //   element: <SettingInfo />,
  // },
];
export default menu;
