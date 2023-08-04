import { Col, Image, notification, Row, Typography } from 'antd';
import TableCustomize from 'components/TableCustomize';
import { StatusItemProduct } from 'pages/ListOrder';
import { forwardRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import orderApi from 'services/subs/order';
import { convertDateStringToLocal } from 'utils/function.utils';
import styles from './index.module.scss';

const DetailOrder = forwardRef(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
      width: 150,
      render: (item) => <>{item.name}</>,
    },
    {
      title: 'Ảnh sản phẩm',
      dataIndex: 'product',
      width: 150,
      render: (item) => (
        <>
          <Image src={item?.images[0]} width={64} height={64} />
        </>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: 150,
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      width: 150,
    },
  ];

  const getDetail = async () => {
    const res = await new orderApi().detail(id);

    if (res.data.result === 'SUCCESS') {
      setData(res.data.data);
    } else {
      notification.error({ message: 'Lấy thông tin chi tiết thất bại' });
    }
  };

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);
  return (
    <Row className={styles.editUser}>
      <HeaderForm title='Chi tiết đơn hàng' />
      <Row className={styles.listItem}>
        <ItemComponent title='Mã đơn hàng' value={data?.code} />
        <ItemComponent title='Tên người tạo' value={data?.create_uid?.name} />
        <ItemComponent title='Tổng tiền' value={data?.total_price ?? 0} />
        <ItemComponent title='Tổng số lượng' value={data?.total_quantity} />
        <ItemComponent title='Địa chỉ nhận hàng' value={data?.shipping_address} />
        <ItemComponent title='Trạng thái đơn hàng' value={<StatusItemProduct status={data?.status} />} />
        <ItemComponent title='Mã Voucher' value={data?.voucher_code} />
        <ItemComponent title='Ngày tạo' value={convertDateStringToLocal(data?.createdAt)} />
      </Row>
      <Row className={styles.viewProduct}>
        <Typography className={styles.title}>Danh sách sản phẩm đã đặt</Typography>
        <TableCustomize columns={columns} data={data?.items ?? []} loading={loading} />
      </Row>
    </Row>
  );
});

export default DetailOrder;

export const HeaderForm = ({ title }) => {
  return (
    <Row className={styles.headerForm}>
      <Typography.Text className={styles.titleForm}>{title}</Typography.Text>
    </Row>
  );
};

const ItemComponent = ({ value, title }) => {
  return (
    <Col xs={24} md={12} lg={8}>
      <Typography className={styles.titleView}>
        {title}: <span className={styles.valueView}>{value}</span>
      </Typography>
    </Col>
  );
};
