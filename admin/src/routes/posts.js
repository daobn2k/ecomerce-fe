import { paths } from 'constants/paths.constants';
import DetailPosts from 'pages/DetailPosts';

export const posts = [
  {
    label: 'Chi tiết gái gọi',
    path: `${paths.posts}/:id`,
    key: `${paths.posts}/:id`,
    element: <DetailPosts />,
  },
];
