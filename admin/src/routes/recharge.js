import { paths } from 'constants/paths.constants';
import DetailRecharge from 'pages/DetailTransactionHistory';

export const recharge = [
  {
    label: 'Chi tiết nạp tiền',
    path: `${paths.recharge}/:id`,
    key: `${paths.recharge}/:id`,
    element: <DetailRecharge />,
  },
];
