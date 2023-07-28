import { Button, Form, notification, Popconfirm, Row, Tag } from 'antd';
import { ActionTable } from 'components/ActionTable';
import { hideLoading, showLoading } from 'components/Loading';
import TableCustomize from 'components/TableCustomize';
import { paths } from 'constants/paths.constants';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reviewApi from 'services/subs/review';
import HeaderSearch from './components/HeaderSearch';
import styles from './index.module.scss';
const ListReviews = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const handlerGetReviews = async (data) => {
    setLoading(true);
    const res = await new reviewApi().getReviews({
      page: pagination?.page,
      limit: pagination?.pageSize,
      orderType: 'desc',
      orderBy: 'createdAt',
      ...data,
    });
    if (res?.status && res?.data?.success) {
      const { items = [], totalItems = 0, page, limit } = res?.data?.data;
      // data gì đó và set up
      setData(items);
      setPagination({ pageSize: limit, page, total: totalItems });
    }
    setLoading(false);
  };
  const onChangePage = (page, pageSize) => {
    const valuesForm = form.getFieldValue();

    handlerGetReviews({ ...valuesForm, page, limit: pageSize });
  };

  const onValuesChange = (_, values) => {
    handlerGetReviews({ ...values, page: 1 });
  };

  useEffect(() => {
    handlerGetReviews();
  }, []);

  const onRemove = async (id) => {
    showLoading();
    const res = await new reviewApi().remove({ id });

    if (res?.data?.success) {
      const valuesForm = form.getFieldValue();
      notification.success({ message: 'Xóa đánh giá thành công' });
      handlerGetReviews({ ...valuesForm, page: 1 });
    }
    hideLoading();
  };

  const columns = [
    {
      title: 'Bài viết',
      dataIndex: 'post',
      ellipsis: true,
      width: 250,
      render: (value) => (
        <Row onClick={() => navigate(`${paths.posts}/${value?._id}`)} style={{ cursor: 'pointer' }}>
          {value?.title}
        </Row>
      ),
    },
    {
      title: 'Người đánh giá',
      dataIndex: 'createdBy',
      value: 100,
      render: (value) => (
        <Row onClick={() => navigate(`${paths.user}/${value?._id}`)} style={{ cursor: 'pointer' }}>
          {value?.username}
        </Row>
      ),
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      width: 200,
    },
    {
      title: 'Điểm đánh giá',
      dataIndex: 'reviewPoint',
      width: 150,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value) => (!value ? <Tag color='#fa541c'>Chưa xác minh</Tag> : <Tag color='#87d068'>Đã xác minh</Tag>),
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      render: (_, item) => (
        <ActionTable onRemove={() => onRemove(item?._id)} onEdit={() => navigate(`${paths.xReviews}/${item._id}`)} />
      ),
    },
  ];
  return (
    <>
      <Form className={styles.form} form={form} onValuesChange={debounce(onValuesChange, 300)} name='form-search-user'>
        <Row className={styles.listUser}>
          <HeaderSearch title='Danh sách đánh giá' form={form} />
          <TableCustomize
            columns={columns}
            data={data}
            pagination={{ ...pagination, onChange: onChangePage }}
            loading={loading}
            scroll={{ y: 550 }}
          />
        </Row>
      </Form>
    </>
  );
};

export default ListReviews;
