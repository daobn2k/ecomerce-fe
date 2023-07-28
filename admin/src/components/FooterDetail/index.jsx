import { Row } from 'antd';
import styles from './index.module.scss';

export const FooterForm = ({ children }) => {
  return <Row className={styles.footerDetail}>{children}</Row>;
};
