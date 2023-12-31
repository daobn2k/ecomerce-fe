import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, notification, Row } from 'antd';
import { ActionTable } from 'components/ActionTable';
import { hideLoading, showLoading } from 'components/Loading';
import TableCustomize from 'components/TableCustomize';
import { paths } from 'constants/paths.constants';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import categoriesApi from 'services/subs/categories';
import { convertDateStringToLocal } from 'utils/function.utils';
import HeaderSearch from './components/HeaderSearch';
import styles from './index.module.scss';
const ListCategory = () => {
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
    const res = await new categoriesApi().get({
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
    const res = await new categoriesApi().remove(id);

    if (res?.data?.success) {
      notification.success({ message: 'Xóa loại sản phẩm thành công' });
      handlerGetUser({ page: 1 });
    }
    hideLoading();
  };

  const columns = [
    {
      title: 'Tên loại sản phẩm ',
      dataIndex: 'name',
      width: 150,
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
          <ActionTable
            onRemove={() => onRemove(item?._id)}
            onEdit={() => navigate(`${paths.categories}/${item._id}`)}
          />
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
            <Button type='primary' htmlType='button' onClick={() => navigate(paths.createCategory)}>
              Tạo mới loại sản phẩm
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

export default ListCategory;
