import { Pagination } from 'antd';
import styles from './index.module.scss';
const PaginationCustom = (props) => {
  const { total, limit, page, ...rest } = props;
  return (
    <Pagination
      total={total}
      defaultPageSize={limit}
      defaultCurrent={page}
      current={page}
      className={styles.pagination}
      showQuickJumper
      {...rest}
    />
  );
};

export default PaginationCustom;
