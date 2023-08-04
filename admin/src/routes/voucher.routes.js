import { paths } from 'constants/paths.constants';
import DetailVoucher from 'pages/DetailVoucher';

export const vouchers = [
  {
    label: 'Tạo mới mã khuyến mãi',
    path: `${paths.createVouchers}`,
    key: `${paths.createVouchers}`,
    element: <DetailVoucher />,
  },
  {
    label: 'Chi tiết mã khuyến mãi',
    path: `${paths.vouchers}/:id`,
    key: `${paths.vouchers}/:id`,
    element: <DetailVoucher />,
  },
];
