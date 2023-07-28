import { Form, Row } from 'antd';
import SelectSearchInput from 'components/SelectSearchInput';
import { listDateUploaded } from 'constants/value.constants';
import styles from './form-search.module.scss';

const FormSearch = () => {
  return (
    <Row className={styles.formSearch}>
      <Row className={styles.listFilterSearch}>
        <Form.Item className={styles.rowSearch} name='date'>
          <SelectSearchInput options={listDateUploaded} placeholder='Ngày đăng' allowClear />
        </Form.Item>
      </Row>
    </Row>
  );
};
export default FormSearch;
