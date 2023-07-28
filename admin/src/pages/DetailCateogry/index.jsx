import { Button, Form, notification, Row, Typography } from 'antd';
import DatePickerCustomize from 'components/DatePicker';
import InputText from 'components/InputText';
import { hideLoading, showLoading } from 'components/Loading';
import SelectSearchInput from 'components/SelectSearchInput';
import { paths } from 'constants/paths.constants';
import { listGender, optionsRole } from 'constants/value.constants';
import moment from 'moment';
import { forwardRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import categoriesApi from 'services/subs/categories';
import userApi from 'services/subs/user';
import styles from './index.module.scss';

const DetailCateogry = forwardRef(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const provinces = useSelector((state) => state?.resourceReducer?.provinces) || [];
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    showLoading();
    delete values.point;
    const res = await new categoriesApi().edit({
      id,
      params: values,
    });
    if (res?.data?.result === 'SUCCESS') {
      notification.success({ message: res?.data?.message ?? 'Chỉnh sửa loại sản phẩm thành công' });
    }
    hideLoading();
  };
  const getDetailUser = async (id) => {
    const res = await new categoriesApi().detail(id);

    if (res?.data?.result === 'SUCCESS') {
      const caterory = res?.data?.data;
      form.setFieldsValue({
        ...caterory,
      });
    }
  };

  const onReset = () => {
    navigate(paths.categories);

    form.resetFields();
  };

  useEffect(() => {
    if (id) {
      getDetailUser(id);
    }
  }, [id]);
  return (
    <Row className={styles.editUser}>
      <HeaderForm title='Chi tiết loại sản phẩm' />
      <Form className={styles.form} form={form} onFinish={onFinish} name='DetailCateogry'>
        <Row className={styles.itemForm}>
          <Form.Item
            className={styles.rowSearch}
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm' }]}
          >
            <InputText label='Tên loại sản phẩm' require placeholder='Nhập tên loại sản phẩm' disabled={true} />
          </Form.Item>
        </Row>
        <Form.Item className={styles.rowSearch} name='password'>
          <Button className={styles.button} htmlType='submit'>
            Lưu
          </Button>
          <Button className={styles.button} htmlType='button' onClick={onReset}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
});

export default DetailCateogry;

export const HeaderForm = ({ title }) => {
  return (
    <Row className={styles.headerForm}>
      <Typography.Text className={styles.titleForm}>{title}</Typography.Text>
    </Row>
  );
};
