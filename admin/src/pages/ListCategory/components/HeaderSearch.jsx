import { Row, Typography } from 'antd';
import FormSearch from './FormSearch';
import styles from './header-search.module.scss';

const HeaderSearch = (props) => {
  const { title } = props;
  return (
    <Row className={styles.headerSearch}>
      <Typography className={styles.title}>{title}</Typography>
      <FormSearch {...props} />
    </Row>
  );
};
export default HeaderSearch;
