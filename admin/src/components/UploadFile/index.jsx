import { Upload } from 'antd';
import FormControlLabel from 'components/FormControlLabel';
import styles from './index.module.scss';
const UploadFile = (props) => {
  const { children, label, require, ...rest } = props;
  return (
    <FormControlLabel {...props}>
      <Upload {...rest} className={styles.upload}>
        {children}
      </Upload>
    </FormControlLabel>
  );
};
export default UploadFile;
