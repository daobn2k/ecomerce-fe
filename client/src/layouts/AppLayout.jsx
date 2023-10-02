import { Row } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './app-layout.module.scss';
import FooterShop from './FooterShop';
import NavbarShop from './NavbarShop';
const AppLayout = () => {
  return (
    <Row className={styles.appRoot}>
      <NavbarShop />
      <Outlet />
      <FooterShop />
    </Row>
  );
};

export default AppLayout;
