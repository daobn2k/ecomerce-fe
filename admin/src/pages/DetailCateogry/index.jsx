import { Button, Form, notification, Row, Typography } from 'antd';
import InputText from 'components/InputText';
import InputTextarea from 'components/InputTextArea';
import { hideLoading, showLoading } from 'components/Loading';
import { paths } from 'constants/paths.constants';
import { forwardRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import categoriesApi from 'services/subs/categories';
import styles from './index.module.scss';

const DetailCateogry = forwardRef(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const provinces = useSelector((state) => state?.resourceReducer?.provinces) || [];
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    showLoading();
    delete values.point;
    let res;
    if (id) {
      res = await new categoriesApi().edit({
        id,
        params: values,
      });
    } else {
      res = await new categoriesApi().add(values);
    }

    if (res?.data?.result === 'SUCCESS') {
      notification.success({ message: res?.data?.message });
      if (!id) {
        onReset();
      }
    }
    hideLoading();
  };
  const getDetailUser = async (id) => {
    const res = await new categoriesApi().detail(id);

    if (res?.data?.result === 'SUCCESS') {
      const caterory = res?.data?.data;
      form.setFieldsValue(caterory);
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
        <Form.Item
          className={styles.rowSearch}
          name='name'
          rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm' }]}
        >
          <InputText label='Tên loại sản phẩm' require placeholder='Nhập tên loại sản phẩm' />
        </Form.Item>
        <Form.Item
          className={styles.rowSearch}
          name='description'
          rules={[{ required: true, message: 'Vui lòng nhập thông tin loại sản phẩm' }]}
        >
          <InputTextarea label='Thông tin loại sản phẩm' require placeholder='Nhập thông tin loại sản phẩm' />
        </Form.Item>
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
