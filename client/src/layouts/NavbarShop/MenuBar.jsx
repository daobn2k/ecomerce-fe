import { Row, Typography } from 'antd';
import { listMenus } from '../../router/menu';
import styles from './menu-bar.module.scss';
const MenuBar = () => {
  return (
    <Row className={styles.menuBarContainer}>
      {listMenus.map((ele, key) => {
        return (
          <div key={key} className={styles.itemMenu}>
            <Typography className={styles.itemMenuLabel}>{ele.name}</Typography>
          </div>
        );
      })}
    </Row>
  );
};

export default MenuBar;
