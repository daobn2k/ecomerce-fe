import { Form, Row } from 'antd';
import InputText from 'components/InputText';

import styles from './form-search.module.scss';

const FormSearch = ({ form }) => {
  return (
    <Row className={styles.formSearch}>
      <Row className={styles.listFilterSearch}>
        <Form.Item className={styles.rowSearch} name='search'>
          <InputText label='Nhập nội dung tìm kiếm' placeholder='Nhập nội dung tìm kiếm' />
        </Form.Item>
      </Row>
    </Row>
  );
};
export default FormSearch;
