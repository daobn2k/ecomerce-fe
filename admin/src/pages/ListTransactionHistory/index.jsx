import { Form, Row } from 'antd';
import TableCustomize from 'components/TableCustomize';
import { paths } from 'constants/paths.constants';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import transactionsApi from 'services/subs/transaction';
import { convertDateStringToLocal } from 'utils/function.utils';
import HeaderSearch from './components/HeaderSearch';
import styles from './index.module.scss';
const ListTransactionHistory = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleGetTransaction = async (data) => {
    setLoading(true);
    const res = await new transactionsApi().transactions({ ...data, orderType: 'desc', orderBy: 'createdAt' });
    if (res?.status && res?.data?.success) {
      const { items = [], totalItems = 0, page, limit = 20 } = res?.data?.data;
      // data gì đó và set up
      setData(items);
      setPagination({ ...pagination, page, pageSize: limit, total: totalItems });
    }
    setLoading(false);
  };
  const onChangePage = (page, pageSize) => {
    const valuesForm = form.getFieldValue();
    handleGetTransaction({ ...valuesForm, page, limit: pageSize });
  };

  const onValuesChange = (_, values) => {
    handleGetTransaction({ ...values, page: 1, limit: pagination.pageSize });
  };

  useEffect(() => {
    handleGetTransaction({ page: pagination.page, limit: pagination.pageSize });
  }, []);

  const columns = [
    {
      title: 'Người tạo',
      dataIndex: 'user',
      ellipsis: true,
      width: 100,
      render: (value) => (
        <div onClick={() => navigate(`${paths.user}/${value?._id}`)} style={{ cursor: 'pointer' }}>
          {value?.username ?? ''}
        </div>
      ),
    },
    {
      title: 'Điểm',
      dataIndex: 'changePoint',
      width: 100,
    },
    {
      title: 'Tổng điểm',
      dataIndex: 'currentPoint',
      width: 100,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: 100,
      render: (values) => {
        return <>{convertDateStringToLocal(values)}</>;
      },
    },
    {
      title: 'Thông báo',
      dataIndex: 'message',
      width: 200,
    },
    
  ];
  return (
    <>
      <Form className={styles.form} form={form} onValuesChange={debounce(onValuesChange, 300)} name='form-search-user'>
        <Row className={styles.ListTransactionHistory}>
          <HeaderSearch title='Lịch sử giao dịch' form={form} />
          <TableCustomize
            columns={columns}
            data={data}
            pagination={{ ...pagination, onChange: onChangePage }}
            loading={loading}
          />
        </Row>
      </Form>
    </>
  );
};

export default ListTransactionHistory;