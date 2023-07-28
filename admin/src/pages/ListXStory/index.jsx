import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Form, notification, Popconfirm, Row } from 'antd';
import { ActionTable } from 'components/ActionTable';
import { hideLoading, showLoading } from 'components/Loading';
import StatusTag from 'components/StatusTag';
import TableCustomize from 'components/TableCustomize';
import { paths } from 'constants/paths.constants';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import xStoryApi from 'services/subs/xstory';
import { checkTimeNews } from 'utils/function.utils';
import HeaderSearch from './components/HeaderSearch';
import styles from './index.module.scss';

const ListXStory = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const getXStory = async (data) => {
    setLoading(true);
    const valuesForm = form.getFieldValue();

    const res = await new xStoryApi().get({ ...valuesForm, ...data, orderBy: 'createdAt', orderType: 'desc' });

    if (res?.status && res?.data?.success) {
      const { items = [], totalItems = 0, page, limit } = res?.data?.data;
      // data gì đó và set up
      setData(items);
      setPagination({ ...pagination, page, pageSize: limit, total: totalItems });
    }
    setLoading(false);
  };
  const onChangePage = (page, pageSize) => {
    getXStory({ page, limit: pageSize });
  };

  const onValuesChange = (values) => {
    getXStory({ ...values, page: 1, limit: pagination.pageSize });
    setPagination({ ...pagination, page: 1 });
  };

  useEffect(() => {
    getXStory({ page: pagination.page, limit: pagination.pageSize });
  }, []);
  // const onDeApprove = async (id) => {
  //   showLoading();
  //   const res = await new xStoryApi().approve(id, { status: 2 });
  //   if (res?.data?.success) {
  //     notification.success({ message: 'Hủy bài viết thành công' });
  //     getXStory({ page: 1, limit: 20 });
  //   }
  //   hideLoading();
  // };
  const onRemove = async (id) => {
    showLoading();
    const res = await new xStoryApi().remove({ id });
    if (res?.data?.success) {
      notification.success({ message: 'Xóa bài viết thành công' });
      getXStory({ page: 1, limit: 20 });
    }
    hideLoading();
  };
  const columns = useMemo(() => {
    return [
      {
        title: 'Tiêu đề',
        dataIndex: 'title',
        width: 150,
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        ellipsis: true,
        width: 200,
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
          <ActionTable onEdit={() => navigate(`${paths.xStory}/${item?._id}`)} onRemove={() => onRemove(item?._id)} />
        ),
      },
    ];
  }, [data, pagination]);
  return (
    <>
      <Form className={styles.form} form={form} onValuesChange={onValuesChange} name='form-search-user'>
        <Row className={styles.Posts}>
          <HeaderSearch title='Danh sách truyện sex' form={form} />
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

export default ListXStory;
