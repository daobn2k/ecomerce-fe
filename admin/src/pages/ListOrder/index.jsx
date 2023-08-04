import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, notification, Row, Typography } from 'antd';
import { ActionTable } from 'components/ActionTable';
import { hideLoading, showLoading } from 'components/Loading';
import TableCustomize from 'components/TableCustomize';
import { paths } from 'constants/paths.constants';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderApi from 'services/subs/order';
import productsApi from 'services/subs/products';
import { convertDateStringToLocal } from 'utils/function.utils';
import HeaderSearch from './components/HeaderSearch';
import styles from './index.module.scss';

const ListOrder = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const modalRef = useRef();

  const handlerGetUser = async (data) => {
    setLoading(true);
    const valuesForm = form.getFieldValue();
    const res = await new orderApi().get({
      page: pagination?.page,
      limit: pagination?.pageSize,
      ...valuesForm,
      ...data,
    });
    if (res?.status && res?.data?.result === 'SUCCESS') {
      const { data = [], totalItems = 0, page, limit } = res?.data;
      // data gì đó và set up
      setData(data);
      setPagination({ pageSize: limit, page, total: totalItems });
    }
    setLoading(false);
  };
  const onChangePage = (page, pageSize) => {
    handlerGetUser({ page, limit: pageSize });
  };

  const onValuesChange = () => {
    handlerGetUser({ page: 1 });
  };

  useEffect(() => {
    handlerGetUser();
  }, []);

  const onRemove = async (id) => {
    showLoading();
    const res = await new orderApi().remove(id);

    if (res?.data?.result === 'SUCCESS') {
      notification.success({ message: 'Xóa loại sản phẩm thành công' });
      handlerGetUser({ page: 1 });
    }
    hideLoading();
  };

  const columns = [
    {
      title: 'Số lượng',
      dataIndex: 'total_quantity',
      width: 150,
    },
    {
      title: 'Số tiền',
      dataIndex: 'total_price',
      width: 150,
    },
    {
      title: 'Địa chỉ nhận hàng',
      dataIndex: 'shipping_address',
      width: 150,
    },
    {
      title: 'Trạng thái ',
      dataIndex: 'status',
      width: 150,
      render: (item) => <>{<StatusItemProduct status={item} />}</>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'gender',
      width: 85,
      render: (_, item) => convertDateStringToLocal(item),
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, item) => (
        <Row className={styles.action}>
          <ActionTable onRemove={() => onRemove(item?._id)} onEdit={() => navigate(`${paths.orders}/${item._id}`)} />
        </Row>
      ),
    },
  ];
  return (
    <>
      <Form className={styles.form} form={form} onValuesChange={debounce(onValuesChange, 300)} name='form-search-user'>
        <Row className={styles.listUser}>
          <HeaderSearch title='Danh sách đơn hàng' form={form} modalRef={modalRef} />
          {/* <Row className={styles.formAction}>
            <Button type='primary' htmlType='button' onClick={() => navigate(paths.createOrders)}>
              Tạo đơn hàng
              <PlusCircleOutlined />
            </Button>
          </Row> */}
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

export default ListOrder;

export const StatusItemProduct = ({ status }) => {
  console.log(status, 'status');
  if (status === 'Pending') return <>Đang xử lý</>;
  if (status === 'Shipped') return <>Đang giao</>;
  if (status === 'Delivered') return <>Đã giao hàng</>;
};
