import { Form, Row } from 'antd';
import InputText from 'components/InputText';
import SelectSearchInput from 'components/SelectSearchInput';
import { optionsRole } from 'constants/value.constants';

import styles from './form-search.module.scss';

const FormSearch = ({ form }) => {
  return (
    <Row className={styles.formSearch}>
      <Row className={styles.listFilterSearch}>
        <Form.Item className={styles.rowSearch} name='requestRole'>
          <SelectSearchInput
            label='Yêu cầu'
            placeholder='Chọn yêu cầu'
            options={optionsRole.filter((i) => i.id !== 1)}
            allowClear
          />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='search'>
          <InputText label='Nhập nội dung tìm kiếm' placeholder='Nhập nội dung tìm kiếm' />
        </Form.Item>
      </Row>
      {/* <Row className={styles.listFilterAction}>
        <Form.Item className={styles.rowSearch} name='submit'>
          <Button className={styles.button} htmlType='submit'>
            Tìm kiếm
          </Button>
        </Form.Item>
      </Row> */}
    </Row>
  );
};
export default FormSearch;
