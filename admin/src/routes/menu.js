import { paths } from 'constants/paths.constants';
import { Dashboard } from 'pages/Dashboard';
import ListAlbum from 'pages/ListAlbum';
import ListRecharge from 'pages/ListRecharge';
import ListReviews from 'pages/ListReviews';
import ListTransactionHistory from 'pages/ListTransactionHistory';
import ListUser from 'pages/ListUser';
import ListXStory from 'pages/ListXStory';
import ListXVideo from 'pages/ListXVideo';
import Massage from 'pages/Massage';
import Posts from 'pages/Posts';
import SettingInfo from 'pages/SettingInfo';

const menu = [
  // { label: 'Trang chủ', path: paths.home, element: <Dashboard />, key: paths.home },

  {
    label: 'Danh sách gái gọi',
    path: `${paths.posts}`,
    key: `${paths.posts}`,
    element: <Posts />,
  },
  {
    label: 'Danh sách massage',
    path: `${paths.massage}`,
    key: `${paths.massage}`,
    element: <Massage />,
  },
  {
    label: 'Danh sách đánh giá',
    path: `${paths.xReviews}`,
    key: `${paths.xReviews}`,
    element: <ListReviews />,
  },
  {
    label: 'Danh sách phim sex',
    path: `${paths.xVideos}`,
    key: `${paths.xVideos}`,
    element: <ListXVideo />,
  },
  {
    label: 'Danh sách truyện sex',
    path: `${paths.xStory}`,
    key: `${paths.xStory}`,
    element: <ListXStory />,
  },
  {
    label: 'Danh sách ảnh sex',
    path: `${paths.xAlbums}`,
    key: `${paths.xAlbums}`,
    element: <ListAlbum />,
  },
  {
    label: 'Danh sách người dùng',
    path: paths.user,
    key: paths.user,
    element: <ListUser />,
  },
  {
    label: 'Lịch sử giao dịch',
    path: paths.transactionHistory,
    key: paths.transactionHistory,
    element: <ListTransactionHistory />,
  },
  {
    label: 'Cài đặt',
    path: paths.settingInfo,
    key: paths.settingInfo,
    element: <SettingInfo />,
  },
];
export default menu;
