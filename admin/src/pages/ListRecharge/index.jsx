import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Form, notification, Row, Tag } from 'antd';
import { hideLoading, showLoading } from 'components/Loading';
import ModalCustomize from 'components/ModalCustomize';
import TableCustomize from 'components/TableCustomize';
import { paths } from 'constants/paths.constants';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from 'services/subs/user';
import HeaderSearch from './components/HeaderSearch';
import styles from './index.module.scss';
const ListRecharge = () => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 100,
  });
  const [loading, setLoading] = useState(false);

  const handlerGetUser = async (data) => {
    setLoading(true);
    const res = await new userApi().getUser(data);
    if (res?.status && res?.data?.success) {
      const { items = [], totalItems = 0 } = res?.data?.data;
      // data gì đó và set up
      setData(items);
      setPagination({ ...pagination, total: totalItems });
    } else {
      notification.error({ message: res?.data?.data?.error?.message ?? 'Lấy danh sách người dùng lỗi' });
    }
    setLoading(false);
  };
  const onChangePage = (page, pageSize) => {
    setPagination({ page, pageSize });

    const valuesForm = form.getFieldValue();

    handlerGetUser({ ...valuesForm, page, limit: pageSize });
  };

  const onFinish = (values) => {
    handlerGetUser({ ...values, page: 1 });
  };

  useEffect(() => {
    handlerGetUser({ page: pagination.page, limit: pagination.pageSize });
  }, []);

  const onRemove = (item) => {
    modalRef.current.showModal(item);
  };

  const onSubmitDelete = async (item) => {
    showLoading();
    const res = await new userApi().deletePosts({ id: item?._id });

    if (res?.data?.success) {
      notification.success({ message: 'Xóa gái gọi thành công' });
      const valuesForm = form.getFieldValue();

      handlerGetUser({ ...valuesForm, ...pagination });

      modalRef.current.handleCancel();
    } else {
      notification.error({ message: 'Xóa gái gọi thất bại' });
    }
    hideLoading();
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Tên',
      dataIndex: 'username',
      width: 150,
    },
    {
      title: 'Hạng',
      dataIndex: 'level',
      width: 70,
    },
    {
      title: 'Năm Sinh',
      dataIndex: 'yearOfBirth',
      width: 85,
      render: (values) => {
        return <>{values ? moment(values, 'YYYY').format('YYYY') : ''}</>;
      },
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      width: 85,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      width: 100,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isOnline',
      width: 100,
      render: (value) => (value ? <Tag color='#87d068'>Đang hoạt động</Tag> : <Tag color='#f50'>Không hoạt động</Tag>),
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, item) => <ActionTable onRemove={onRemove} onEdit={() => navigate(`${paths.user}/${item._id}`)} />,
    },
  ];
  return (
    <>
      <Form className={styles.form} form={form} onFinish={onFinish} name='form-search-user'>
        <Row className={styles.ListRecharge}>
          <HeaderSearch title='Lịch sử nạp tiền' form={form} />
          <TableCustomize
            columns={columns}
            data={data}
            pagination={{ ...pagination, onChange: onChangePage }}
            loading={loading}
          />
        </Row>
      </Form>
      <ModalCustomize
        title='Xóa gái gọi '
        content='Bạn có muốn xóa gái gọi  này không?'
        ref={modalRef}
        isDelete
        onSubmit={onSubmitDelete}
      />
    </>
  );
};

export default ListRecharge;

const ActionTable = ({ onEdit, onRemove }) => {
  return (
    <Row className={styles.action}>
      <EditOutlined onClick={onEdit} />
      <DeleteOutlined onClick={onRemove} />
    </Row>
  );
};
