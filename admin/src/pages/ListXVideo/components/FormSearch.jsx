import { Button, Form, Row } from 'antd';
import SelectSearchInput from 'components/SelectSearchInput';
import { listDateUploaded, listQuality } from 'constants/value.constants';
import { useSelector } from 'react-redux';
import styles from './form-search.module.scss';

const FormSearch = () => {
  const categories = useSelector((state) => state?.resourceReducer?.categories) || [];

  return (
    <Row className={styles.formSearch}>
      <Row className={styles.listFilterSearch}>
        <Form.Item className={styles.rowSearch} name='quality'>
          <SelectSearchInput placeholder='Chất lượng' options={listQuality} allowClear />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='category'>
          <SelectSearchInput options={categories} placeholder='Thể loại' allowClear />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='date'>
          <SelectSearchInput options={listDateUploaded} placeholder='Ngày đăng' allowClear />
        </Form.Item>
      </Row>
      <Row className={styles.listFilterAction}>
        <Form.Item className={styles.rowSearch} name='submit'>
          <Button className={styles.button} htmlType='submit'>
            Tìm kiếm
          </Button>
        </Form.Item>
      </Row>
    </Row>
  );
};
export default FormSearch;
