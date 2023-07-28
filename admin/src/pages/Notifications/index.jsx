import { Col, Divider, Row, Typography } from 'antd';
import EmptyData from 'components/EmptyData';
import PaginationCustom from 'components/PaginationCustom';
import { useNotification } from 'hooks/useNotification';
import styles from './index.module.scss';
const Notifications = () => {
  const { data = [], pagination, onChangePage } = useNotification();
  return (
    <Row className={styles.root}>
      <Typography>Thông báo</Typography>
      <Divider />
      <Row className={styles.list} gutter={[16, { xs: 16, sm: 16, md: 24, lg: 32 }]}>
        {data?.length > 0 ? (
          data?.map((ele) => {
            return (
              <Col xs={24} sm={12} lg={8} xl={6}>
                <ItemNotification {...ele} />
              </Col>
            );
          })
        ) : (
          <EmptyData description='Không có thông báo' />
        )}
      </Row>
      <Row className={styles.rowPage}>
        <PaginationCustom {...pagination} onChange={onChangePage} />
      </Row>
    </Row>
  );
};

export default Notifications;

const ItemNotification = ({ src, name, content }) => {
  return (
    <Row className={styles.itemNotification}>
      <Typography className={styles.name}>{name}</Typography>
      <Typography className={styles.content}>{content}</Typography>
    </Row>
  );
};
