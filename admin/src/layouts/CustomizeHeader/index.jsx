// eslint-disable-next-line
import { DownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Row, Space, Typography } from 'antd';
import BellNotifications from 'components/BellNotifications';
import { hideLoading, showLoading } from 'components/Loading';
import { paths } from 'constants/paths.constants';
import { useNavigate } from 'react-router-dom';
import authApi from 'services/subs/auth';
import { checkRoleUser } from 'utils/function.utils';
import { clearStorage, getUserProfile } from 'utils/storage.ultils';
import styles from './header.module.scss';
const { Header } = Layout;

const CustomizeHeader = () => {
  const navigate = useNavigate();

  const user = getUserProfile();
  const onViewInfo = () => {
    navigate(`${paths.user}/${user?._id}`);
  };

  const onLogout = async () => {
    showLoading();
    const res = await new authApi().logout();
    if (res?.data?.success) {
      clearStorage();
      navigate(paths.login);
    }
    hideLoading();
  };

  const items = [
    { label: <Typography onClick={onViewInfo}>Xem thông tin cá nhân</Typography>, key: 'view-info' },
    { label: <Typography onClick={onLogout}>Thoát</Typography>, key: 'logout' },
  ];

  return (
    <div className={styles.divParentHeader}>
      <Header className={styles.header}>
        <Row className={styles.userInfo}>
          {/* <BellNotifications /> */}
          <Row className={styles.info}>
            <Typography className={styles.name}>{user.name}</Typography>
            <Typography className={styles.role}>{checkRoleUser(user.role)}</Typography>
          </Row>
          <Row className={styles.infoImage}>
            <Avatar
              shape='rounded'
              size={48}
              src='https://yt3.googleusercontent.com/inhxgLbhHuXL6IllrpCH9jw7jdb0aQLv4hpVdATYsBGJAwFYs8OpuvBKnKz-8M2eHp1oXvoyIQ=s900-c-k-c0x00ffffff-no-rj'
            />
            <Dropdown menu={{ items }}>
              <Space>
                <DownOutlined />
              </Space>
            </Dropdown>
          </Row>
        </Row>
      </Header>
    </div>
  );
};

export default CustomizeHeader;
