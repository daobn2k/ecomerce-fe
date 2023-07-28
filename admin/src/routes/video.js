import { paths } from 'constants/paths.constants';
import DetailAlbum from 'pages/DetailAlbum';
import DetailMassage from 'pages/DetailMassage';
import DetailReviews from 'pages/DetailReviews';
import DetailStory from 'pages/DetailStory';
import DetailVideo from 'pages/DetailVideo';

export const video = [
  {
    label: 'Chi tiết phim sex',
    path: `${paths.xVideos}/:id`,
    key: `${paths.xVideos}/:id`,
    element: <DetailVideo />,
  },

  {
    label: 'Chi tiết ảnh sex',
    path: `${paths.xAlbums}/:id`,
    key: `${paths.xAlbums}/:id`,
    element: <DetailAlbum />,
  },
  {
    label: 'Chi tiết truyện sex',
    path: `${paths.xStory}/:id`,
    key: `${paths.xStory}/:id`,
    element: <DetailStory />,
  },
  {
    label: 'Chi tiết đánh giá',
    path: `${paths.xReviews}/:id`,
    key: `${paths.xReviews}/:id`,
    element: <DetailReviews />,
  },
  {
    label: 'Chi tiết Massage',
    path: `${paths.massage}/:id`,
    key: `${paths.massage}/:id`,
    element: <DetailMassage />,
  },
];
