import { Button, Form, Row } from 'antd';
import SelectDistrict from 'components/common/SelectDistrict';
import InputText from 'components/InputText';
import SelectSearchInput from 'components/SelectSearchInput';
import { useSelector } from 'react-redux';

import styles from './form-search.module.scss';

const FormSearch = ({ form }) => {
  const provinces = useSelector((state) => state?.resourceReducer?.provinces) || [];

  const onChangeProvince = () => {
    form.setFieldValue('locationDistrict', null);
  };
  return (
    <Row className={styles.formSearch}>
      <Row className={styles.listFilterSearch}>
        <Form.Item className={styles.rowSearch} name='username'>
          <SelectSearchInput placeholder='Chọn người dùng' label='Người dùng' />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='rank'>
          <SelectSearchInput placeholder='Chọn hạng' label='Hạng' />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='locationProvince'>
          <SelectSearchInput
            label='Thành phố'
            placeholder='Chọn thành phố'
            options={provinces}
            allowClear
            onChange={onChangeProvince}
          />
        </Form.Item>
        <Form.Item className={styles.rowSearch} dependencies={['locationProvince']} noStyle>
          {(props) => {
            const province = props.getFieldValue('locationProvince');
            if (!province) return;
            return (
              <Form.Item className={styles.rowSearch} name='locationDistrict'>
                <SelectDistrict
                  label='Quận / huyện'
                  province={province}
                  placeholder='Vui lòng chọn quận / huyện'
                  disabled={!province}
                />
              </Form.Item>
            );
          }}
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='text'>
          <InputText label='Nhập nội dung tìm kiếm' placeholder='Nhập nội dung tìm kiếm' />
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
