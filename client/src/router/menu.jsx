import Home from '../pages/home/Home';
import ProductPage from '../pages/product/Product';
export const listMenus = [
  {
    path: '/',
    element: <Home />,
    children: [],
    name: 'Trang chủ',
  },
  {
    path: '/products',
    element: <ProductPage />,
    name: 'Sản phẩm',
  },
  {
    path: '/news',
    element: <ProductPage />,
    name: 'Tin tức',
  },
  {
    path: '/about',
    element: <ProductPage />,
    name: 'Giới thiệu',
  },
  {
    path: '/products',
    element: <ProductPage />,
    name: 'Liên hệ',
  },
  {
    path: '/cart',
    element: <ProductPage />,
    name: 'Giỏ hàng',
  },
];
