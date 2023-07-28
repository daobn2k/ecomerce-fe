import { Form, notification, Row } from 'antd';
import { ActionTable } from 'components/ActionTable';
import { hideLoading, showLoading } from 'components/Loading';
import StatusTag from 'components/StatusTag';
import TableCustomize from 'components/TableCustomize';
import { paths } from 'constants/paths.constants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import xAlbumApi from 'services/subs/xablum';
import { checkTimeNews } from 'utils/function.utils';
import HeaderSearch from './components/HeaderSearch';
import styles from './index.module.scss';
const ListAlbum = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const getAlbums = async (data) => {
    setLoading(true);
    const res = await new xAlbumApi().get({ ...data, orderBy: 'createdAt', orderType: 'desc' });

    if (res?.status && res?.data?.success) {
      const { items = [], totalItems = 0, page, limit } = res?.data?.data;
      // data gì đó và set up
      setData(items);
      setPagination({ ...pagination, page, pageSize: limit, total: totalItems });
    }
    setLoading(false);
  };
  const onChangePage = (page, pageSize) => {
    const valuesForm = form.getFieldValue();
    getAlbums({ ...valuesForm, page, limit: pageSize });
  };

  const onValuesChange = (values) => {
    getAlbums({ ...values, page: 1 });
  };

  useEffect(() => {
    getAlbums({ page: pagination.page, limit: pagination.pageSize });
  }, []);
  const onRemove = async (id) => {
    showLoading();
    const res = await new xAlbumApi().remove(id);
    if (res?.data?.success) {
      notification.success({ message: 'Xóa album thành công' });
      getAlbums({ page: 1, limit: 20 });
    }
    hideLoading();
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: 150,
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      ellipsis: true,
      width: 100,
      render: (value) => value?.name,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      ellipsis: true,
      width: 100,
      render: (value) => value?.join(', '),
    },
    {
      title: 'Người tạo',
      key: 'author',
      dataIndex: 'author',
      width: 150,
      render: (value) => value?.username,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: 150,
      render: (value) => checkTimeNews(value),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 150,
      render: (value) => <StatusTag status={value} />,
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (ele, item) => (
        <ActionTable onEdit={() => navigate(`${paths.xAlbums}/${item?._id}`)} onRemove={() => onRemove(item?._id)} />
      ),
    },
  ];

  return (
    <>
      <Form className={styles.form} form={form} onValuesChange={onValuesChange} name='form-search-user'>
        <Row className={styles.Posts}>
          <HeaderSearch title='Danh sách album' form={form} />
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

export default ListAlbum;
