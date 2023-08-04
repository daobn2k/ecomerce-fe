import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, notification, Row, Typography } from 'antd';
import { ActionTable } from 'components/ActionTable';
import { hideLoading, showLoading } from 'components/Loading';
import TableCustomize from 'components/TableCustomize';
import { paths } from 'constants/paths.constants';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import voucherApi from 'services/subs/voucher';
import { convertDateStringToLocal } from 'utils/function.utils';
import HeaderSearch from './components/HeaderSearch';
import styles from './index.module.scss';

const ListVoucher = () => {
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

  const handlerGetVoucher = async (data) => {
    setLoading(true);
    const valuesForm = form.getFieldValue();
    const res = await new voucherApi().get({
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
    handlerGetVoucher({ page, limit: pageSize });
  };

  const onValuesChange = () => {
    handlerGetVoucher({ page: 1 });
  };

  useEffect(() => {
    handlerGetVoucher();
  }, []);

  const onRemove = async (id) => {
    showLoading();
    const res = await new voucherApi().remove(id);

    if (res?.data?.result === 'SUCCESS') {
      notification.success({ message: 'Xóa loại mã ưu đãi thành công' });
      handlerGetVoucher({ page: 1 });
    }
    hideLoading();
  };

  const columns = [
    {
      title: 'Tên mã ưu đãi',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Loại mã ưu đãi',
      dataIndex: 'category_id',
      width: 150,
      render: (item) => <>{item?.name}</>,
    },
    {
      title: 'Giới thiệu mã ưu đãi',
      dataIndex: 'description',
      width: 150,
    },
    {
      title: 'Ảnh mã ưu đãi',
      dataIndex: 'coverImage',
      width: 150,
    },
    {
      title: 'Xuất xứ',
      dataIndex: 'origin',
      width: 150,
    },
    {
      title: 'Trạng thái mã ưu đãi',
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
          <ActionTable onRemove={() => onRemove(item?._id)} onEdit={() => navigate(`${paths.vouchers}/${item._id}`)} />
        </Row>
      ),
    },
  ];
  return (
    <>
      <Form className={styles.form} form={form} onValuesChange={debounce(onValuesChange, 300)} name='form-search-user'>
        <Row className={styles.listUser}>
          <HeaderSearch title='Danh sách mã ưu đãi' form={form} modalRef={modalRef} />
          <Row className={styles.formAction}>
            <Button type='primary' htmlType='button' onClick={() => navigate(paths.createVouchers)}>
              Tạo mới mã ưu đãi
              <PlusCircleOutlined />
            </Button>
          </Row>
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

export default ListVoucher;

const StatusItemProduct = ({ status }) => {
  const checkStatus = () => {
    switch (status) {
      case '1':
        return 'Còn hàng';
      default:
        return 'Hết hàng';
    }
  };
  return (
    <div>
      <Typography>{checkStatus()}</Typography>
    </div>
  );
};
