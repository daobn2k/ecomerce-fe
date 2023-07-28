import { Form, notification, Row, Typography } from 'antd';
import { ActionTable } from 'components/ActionTable';
import { hideLoading, showLoading } from 'components/Loading';
import StatusTag from 'components/StatusTag';
import TableCustomize from 'components/TableCustomize';
import { paths } from 'constants/paths.constants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import xVideoApi from 'services/subs/xvideo';
import { checkTimeNews } from 'utils/function.utils';
import HeaderSearch from './components/HeaderSearch';
import styles from './index.module.scss';
const ListXVideo = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const getXVideos = async (data) => {
    setLoading(true);
    const valuesForm = form.getFieldValue();

    const res = await new xVideoApi().getXVideo({ ...valuesForm, ...data, orderBy: 'createdAt', orderType: 'desc' });

    if (res?.status && res?.data?.success) {
      const { items = [], totalItems = 0, page, limit } = res?.data?.data;
      // data gì đó và set up
      setData(items);
      setPagination({ ...pagination, total: totalItems, page, pageSize: limit });
    }
    setLoading(false);
  };
  const onChangePage = (page, pageSize) => {
    getXVideos({ page, limit: pageSize });
  };

  const onFinish = (values) => {
    getXVideos({ ...values, page: 1 });
  };

  useEffect(() => {
    getXVideos({ page: pagination.page, limit: pagination.pageSize });
  }, []);

  // const onDeApprove = async (id) => {
  //   showLoading();
  //   const res = await new xVideoApi().approve(id, { status: 2 });
  //   if (res?.data?.success) {
  //     notification.success({ message: 'Xóa phim thành công' });
  //     getXVideos({ page: 1, limit: 20 });
  //   }
  //   hideLoading();
  // };

  const onRemove = async (id) => {
    showLoading();
    const res = await new xVideoApi().remove({ id });
    if (res?.data?.success) {
      notification.success({ message: 'Xóa phim thành công' });
      getXVideos({ page: 1, limit: 20 });
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
      title: 'Nội dung',
      dataIndex: 'content',
      width: 250,
      render: (value) => <Typography className={styles.content}>{value}</Typography>,
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
        <ActionTable onEdit={() => navigate(`${paths.xVideos}/${item?._id}`)} onRemove={() => onRemove(item?._id)} />
      ),
    },
  ];

  return (
    <>
      <Form className={styles.form} form={form} onFinish={onFinish} name='form-search-user'>
        <Row className={styles.Posts}>
          <HeaderSearch title='Danh sách phim sex' form={form} />
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

export default ListXVideo;
