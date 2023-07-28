import { Form, notification, Row, Tag } from 'antd';
import { ActionTable } from 'components/ActionTable';
import { hideLoading, showLoading } from 'components/Loading';
import StatusPost from 'components/StatusPost';
import StatusTag from 'components/StatusTag';
import TableCustomize from 'components/TableCustomize';
import { paths } from 'constants/paths.constants';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postsApi from 'services/subs/posts';
import { checkTimeNews, convertDateStringToLocal } from 'utils/function.utils';
import HeaderSearch from './components/HeaderSearch';
import styles from './index.module.scss';
const Posts = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const handlerGetPosts = async (data) => {
    setLoading(true);
    const res = await new postsApi().getPosts({ ...data });

    if (res?.status && res?.data?.success) {
      const { items = [], totalItems = 0, page, limit } = res?.data?.data;
      // data gì đó và set up
      setData(items);
      setPagination({ ...pagination, total: totalItems, page, pageSize: limit });
    }

    setLoading(false);
  };
  const onChangePage = (page, pageSize) => {
    const valuesForm = form.getFieldValue();
    handlerGetPosts({ ...valuesForm, page, limit: pageSize, yearOfBirth: valuesForm['yearOfBirth']?.format('YYYY') });
  };

  const onFinish = (_, values) => {
    handlerGetPosts({
      ...values,
      ...pagination,
      limit: pagination.pageSize,
      yearOfBirth: values['yearOfBirth']?.format('YYYY'),
    });
  };

  useEffect(() => {
    handlerGetPosts({ page: pagination.page, limit: pagination.pageSize });
  }, []);

  const onRemove = async (id) => {
    const valuesForm = form.getFieldValue();
    showLoading();
    const res = await new postsApi().remove({ id });
    if (res?.data?.success) {
      notification.success({ message: 'Xóa bài viết thành công' });
      handlerGetPosts({ ...valuesForm, page: 1, limit: 20, yearOfBirth: valuesForm['yearOfBirth']?.format('YYYY') });
    }
    hideLoading();
  };
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Mã riêng tư',
      dataIndex: 'privateCode',
      width: 150,
      render: (value, item) => (
        <>
          {value}&nbsp;
          <span style={{ color: 'red' }}>
            ({item?.privateCodeInfo?.decryptedCode?.username}-
            {convertDateStringToLocal(item?.privateCodeInfo?.decryptedCode?.createdAt)})
          </span>
        </>
      ),
    },
    {
      title: 'Mã công khai',
      dataIndex: 'publicCode',
      width: 150,
      render: (value, item) => (
        <>
          {value}&nbsp;({item?.publicCodeInfo?.monthYear})
        </>
      ),
    },
    {
      title: 'Hạn bài viết',
      dataIndex: 'expireDate',
      width: 100,
      render: (expireDate) => convertDateStringToLocal(expireDate, 'DD/MM/YYYY hh:mm:ss'),
    },
    {
      title: 'Số ngày còn lại',
      dataIndex: 'expireDate',
      width: 125,
      render: (expireDate) =>
        moment(expireDate).diff(moment().utc(), 'day') > 0 ? (
          moment(expireDate).diff(moment().utc(), 'day')
        ) : (
          <Tag color='red'>Quá hạn</Tag>
        ),
    },
    {
      title: 'Hoạt động',
      dataIndex: 'status',
      width: 150,
      render: (value) => <StatusPost status={value} />,
    },
    {
      title: 'Trạng phê duyệt',
      dataIndex: 'isApprove',
      width: 150,
      render: (value) => (!value ? <Tag color='#fa541c'>Chưa xác minh</Tag> : <Tag color='#87d068'>Đã xác minh</Tag>),
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (ele, item) => (
        <ActionTable onEdit={() => navigate(`${paths.posts}/${item._id}`)} onRemove={() => onRemove(item?._id)} />
      ),
    },
  ];

  return (
    <>
      <Form className={styles.form} form={form} onValuesChange={onFinish} name='form-search-user'>
        <Row className={styles.Posts}>
          <HeaderSearch title='Danh sách gái gọi' form={form} />
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

export default Posts;
