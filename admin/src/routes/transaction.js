import { paths } from 'constants/paths.constants';
import DetailTransactionHistory from 'pages/DetailTransactionHistory';

export const transaction = [
  {
    label: 'Chi tiết giao dịch',
    path: `${paths.transactionHistory}/:id`,
    key: `${paths.transactionHistory}/:id`,
    element: <DetailTransactionHistory />,
  },
];
