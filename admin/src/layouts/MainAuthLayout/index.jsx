import { Layout, notification, Row } from 'antd';
import clsx from 'clsx';
import { paths } from 'constants/paths.constants';
import CustomizeHeader from 'layouts/CustomizeHeader';
import CustomizeSideBar from 'layouts/CustomizeSideBar';
import { Navigate, Outlet } from 'react-router-dom';
import { clearStorage, getToken, getUserProfile } from 'utils/storage.ultils';
import styles from './main.module.scss';
const { Content } = Layout;

const MainAuthLayout = () => {
  const token = getToken();
  const userStorage = getUserProfile();
  if (!token || userStorage.role === 2 || userStorage.role === 3) {
    clearStorage();
    notification.error({ message: 'Người dùng không có quyền đăng nhập vào admin' });
    return <Navigate to={paths.login} />;
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <CustomizeSideBar />
      <Content className={clsx('site-layout', styles.main)}>
        <CustomizeHeader />
        <Row className={styles.content}>
          <Outlet />
        </Row>
      </Content>
    </Layout>
  );
};
export default MainAuthLayout;
