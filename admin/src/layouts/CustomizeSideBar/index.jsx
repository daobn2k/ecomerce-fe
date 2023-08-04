import { Menu, Row, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import clsx from 'clsx';
import { paths } from 'constants/paths.constants';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import menu from 'routes/menu';
import styles from './index.module.scss';

const CustomizeSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(null);

  const onClick = (event) => {
    const data = menu.find((i) => i.key === event.key);
    setCurrent(data?.key);
    navigate(data.path);
  };

  useEffect(() => {
    if (location?.pathname) {
      setCurrent(`/${location?.pathname.split('/')[1]}`);
    }
  }, [location]);
  const onClickLogo = () => navigate(paths.user);
  return (
    <Sider className={clsx(styles.sideBar)}>
      <Row className={styles.logo}>
        <Typography className={styles.logoText} onClick={onClickLogo}>
          Yang Boutique
        </Typography>
      </Row>
      <Menu mode='inline' items={menu} className={styles.menuSideBar} onClick={onClick} selectedKeys={[current]} />
    </Sider>
  );
};

export default CustomizeSideBar;
