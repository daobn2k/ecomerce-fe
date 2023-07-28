import { paths } from 'constants/paths.constants';
import ListUser from 'pages/ListUser';
import SettingInfo from 'pages/SettingInfo';

const menu = [
  {
    label: 'Danh sách người dùng',
    path: paths.user,
    key: paths.user,
    element: <ListUser />,
  },
  // {
  //   label: 'Cài đặt',
  //   path: paths.settingInfo,
  //   key: paths.settingInfo,
  //   element: <SettingInfo />,
  // },
];
export default menu;
