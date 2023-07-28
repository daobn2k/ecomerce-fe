import { Row, Typography } from 'antd';
import StatusTag from 'components/StatusTag';
import styles from './index.module.scss';
export const HeaderForm = ({ title, status }) => {
  return (
    <Row className={styles.headerForm}>
      <Typography.Text className={styles.titleForm}>{title}</Typography.Text>
      <StatusTag status={status} />
    </Row>
  );
};
