import { Form, Row } from 'antd';
import SelectSearchInput from 'components/SelectSearchInput';
import {
  listApprove,
  listExpired,
  listHeight,
  listPrice,
  listStatusPosts,
  listWeight,
} from 'constants/value.constants';

import SelectDistrict from 'components/common/SelectDistrict';
import DatePickerCustomize from 'components/DatePicker';
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
        {/* <Form.Item className={styles.rowSearch} name='locationProvince'>
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
        <Form.Item className={styles.rowSearch} name='price'>
          <SelectSearchInput label='Giá' options={listPrice} placeholder='Giá' allowClear />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='yearOfBirth'>
          <DatePickerCustomize label='Năm sinh' picker='year' placeholder='Chọn ngày sinh' format='YYYY' />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='height'>
          <SelectSearchInput label='Chiều cao' options={listHeight} placeholder='Chiều cao' allowClear />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='weight'>
          <SelectSearchInput label='Cân nặng' options={listWeight} placeholder='Cân nặng' allowClear />
        </Form.Item> */}
        <Form.Item className={styles.rowSearch} name='isApprove'>
          <SelectSearchInput label='Tình trạng phê duyệt' options={listApprove} placeholder='Tình trạng phê duyệt' />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='status'>
          <SelectSearchInput label='Trạng thái' options={listStatusPosts} placeholder='Trạng thái' />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='isExpired'>
          <SelectSearchInput label='Hạn đăng' options={listExpired} placeholder='Hạn đăng' />
        </Form.Item>
      </Row>
    </Row>
  );
};
export default FormSearch;
