import { paths } from 'constants/paths.constants';
import DetailCateogry from 'pages/DetailCateogry';

export const categories = [
  {
    label: 'Chi tiết loại sản phẩm dùng',
    path: `${paths.categories}/:id`,
    key: `${paths.categories}/:id`,
    element: <DetailCateogry />,
  },

  {
    label: 'Tạo mới loại sản phẩm',
    path: `${paths.createCategory}`,
    key: `${paths.createCategory}`,
    element: <DetailCateogry />,
  },
];
