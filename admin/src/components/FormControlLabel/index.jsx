import { Row, Typography } from 'antd';
import styles from './index.module.scss';

const FormControlLabel = (props) => {
  const { suffix = null, prefix = null, label = '', require, children } = props;
  return (
    <>
      {label && (
        <Row className={styles.rowLabel}>
          <Row display='flex'>
            {suffix && suffix}
            <Typography className={styles.title}>{label}</Typography>
            {require && <Typography className={styles.require}> &nbsp;*</Typography>}
            {prefix && prefix}
          </Row>
        </Row>
      )}
      {children}
    </>
  );
};
export default FormControlLabel;
