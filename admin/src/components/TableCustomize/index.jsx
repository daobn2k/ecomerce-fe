import { Table } from 'antd';
import clsx from 'clsx';
import styles from './index.module.scss';

const TableCustomize = (props) => {
  const { columns, data, pagination, className, ...rest } = props;

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ ...pagination, current: pagination?.page, showSizeChanger: false }}
      className={clsx(styles.table, { [className]: !!className })}
      scroll={{ y: 550, x: 'auto' }}
      {...rest}
    />
  );
};

export default TableCustomize;
