import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, notification, Row, Tag } from 'antd';
import clsx from 'clsx';
import { ActionTable } from 'components/ActionTable';
import InputText from 'components/InputText';
import { hideLoading, showLoading } from 'components/Loading';
import ModalCustomize from 'components/ModalCustomize';
import TableCustomize from 'components/TableCustomize';
import { paths } from 'constants/paths.constants';
import { debounce } from 'lodash';
import { forwardRef, useImperativeHandle } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from 'services/subs/user';
import HeaderSearch from './components/HeaderSearch';
import styles from './index.module.scss';
const ListUser = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const modalRef = useRef();
  const formPointRef = useRef();

  const [dataEdit, setDataEdit] = useState(null);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const handlerGetUser = async (data) => {
    setLoading(true);
    const valuesForm = form.getFieldValue();
    const res = await new userApi().getUser({
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
    const res = await new userApi().remove(id);

    if (res?.data?.success) {
      notification.success({ message: 'Xóa người dùng thành công' });
      handlerGetUser({ page: 1 });
    }
    hideLoading();
  };

  const onChangePoint = async (values, item) => {
    const { newPoint } = values;
    console.log(item, 'item');
    const res = await new userApi().changePoint({ newPoint: +newPoint, toUserId: item?._id });
    if (res?.data?.success) {
      notification.success({ message: `Thay đổi điểm cho ${item?.username}` });
      handlerGetUser();
      onHide();
    }
  };
  const onHide = () => {
    modalRef.current.handleCancel();
  };
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      width: 150,
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
      dataIndex: 'status',
      width: 100,
      render: (value) => {
        console.log(value);

        return value ? <Tag color='#87d068'>Đang hoạt động</Tag> : <Tag color='#f50'>Không hoạt động</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, item) => (
        <Row className={styles.action}>
          <ActionTable onRemove={() => onRemove(item?._id)} onEdit={() => navigate(`${paths.user}/${item._id}`)} />
        </Row>
      ),
    },
  ];
  return (
    <>
      <Form className={styles.form} form={form} onValuesChange={debounce(onValuesChange, 300)} name='form-search-user'>
        <Row className={styles.listUser}>
          <HeaderSearch title='Danh sách loại sản phẩm' form={form} />
          <Row className={styles.formAction}>
            <Button type='primary' htmlType='button' onClick={() => navigate(paths.createUser)}>
              Tạo mới người dùng
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

export default ListUser;
