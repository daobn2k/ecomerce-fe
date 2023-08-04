import { paths } from 'constants/paths.constants';
import DetailProduct from 'pages/DetailProduct';

export const products = [
  {
    label: 'Chi tiết sản phẩm',
    path: `${paths.products}/:id`,
    key: `${paths.products}/:id`,
    element: <DetailProduct />,
  },
  {
    label: 'Tạo mới sản phẩm',
    path: `${paths.createProduct}`,
    key: `${paths.createProduct}`,
    element: <DetailProduct />,
  },
];
