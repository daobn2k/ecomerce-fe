import { Form, Row } from 'antd';
import DatePickerCustomize from 'components/DatePicker';
import InputText from 'components/InputText';
import SelectSearchInput from 'components/SelectSearchInput';
import { useEffect, useState } from 'react';
import categoriesApi from 'services/subs/categories';
import { formatDataListApi } from 'utils/function.utils';
import styles from './form-search.module.scss';

const FormSearch = (props) => {
  return (
    <Row className={styles.formSearch}>
      <Row className={styles.listFilterSearch}>
        <Form.Item className={styles.rowSearch} name='category_id'>
          <SelectSearchCategory />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='created_at'>
          <DatePickerCustomize label='Ngày tạo' placeholder='Chọn tạo' />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='key_word'>
          <InputText label='Nhập nội dung tìm kiếm' placeholder='Nhập nội dung tìm kiếm' />
        </Form.Item>
      </Row>
    </Row>
  );
};
export default FormSearch;

export const SelectSearchCategory = (props) => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const res = await new categoriesApi().get({
      page: 1,
      limit: 100,
    });
    if (res?.status && res?.data?.result === 'SUCCESS') {
      const { data = [] } = res?.data;
      // data gì đó và set up
      setCategories(formatDataListApi(data));
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <SelectSearchInput label='Loại sản phẩm' placeholder='Tìm kiếm loại sản phẩm' options={categories} {...props} />
  );
};
