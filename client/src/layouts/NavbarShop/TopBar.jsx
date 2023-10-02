import { Input, Row, Typography } from 'antd';
import styles from './top-bar.module.scss';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
const { Search } = Input;
const TopBar = () => {
  const onSearch = (e) => console.log(e);
  return (
    <Row className={styles.topBarContainer}>
      <Typography className={styles.logo}>YANG BOUTIQUE</Typography>
      <Typography className={styles.allProduct}>Tất cả sản phẩm</Typography>
      <Row className={styles.searchRow}>
        <div className={styles.searchInput}>
          <Search placeholder='Tìm kiếm sản phẩm' onSearch={onSearch} />
        </div>
        <UserOutlined />
        <ShoppingCartOutlined />
      </Row>
    </Row>
  );
};

export default TopBar;
