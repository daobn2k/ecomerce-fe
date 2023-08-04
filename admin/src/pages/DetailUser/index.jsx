import { Button, Form, notification, Row, Typography } from 'antd';
import DatePickerCustomize from 'components/DatePicker';
import InputText, { PasswordInput } from 'components/InputText';
import { hideLoading, showLoading } from 'components/Loading';
import SelectSearchInput from 'components/SelectSearchInput';
import { paths } from 'constants/paths.constants';
import { listGender, optionsRole } from 'constants/value.constants';
import moment from 'moment';
import { forwardRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userApi from 'services/subs/user';
import styles from './index.module.scss';

const DetailUser = forwardRef(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const provinces = useSelector((state) => state?.resourceReducer?.provinces) || [];
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    showLoading();

    const role = optionsRole.find((i) => i.value === values?.role || i.id === values?.role);
    const params = {
      ...values,
      role: role?.id ?? undefined,
    };
    let res;
    if (id) {
      res = await new userApi().editUser({
        id,
        params,
      });
    } else {
      res = await new userApi().addUser(params);
    }
    if (res?.data?.result === 'SUCCESS') {
      notification.success({ message: res?.data?.message });
      if (!id) {
        onReset();
      }
    } else {
      notification.error({ message: id ? 'Chỉnh sửa thất bại' : 'Tạo mới thất bại' });
    }
    hideLoading();
  };
  const getDetailUser = async (id) => {
    const res = await new userApi().getUserDetail(id);

    if (res?.data?.result === 'SUCCESS') {
      const user = res?.data?.data;
      form.setFieldsValue({
        ...user,
        role: optionsRole.find((ele) => ele.id === user?.role),
      });
    }
  };

  const onReset = () => {
    navigate(paths.user);

    form.resetFields();
  };

  useEffect(() => {
    if (id) {
      getDetailUser(id);
    }
  }, [id]);
  return (
    <Row className={styles.editUser}>
      <HeaderForm title='Chi tiết người dùng' />
      <Form className={styles.form} form={form} onFinish={onFinish} name='DetailUser'>
        <Row className={styles.itemForm}>
          <Form.Item
            className={styles.rowSearch}
            name='username'
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <InputText label='Tên đăng nhập' require placeholder='Nhập tên đăng nhập' disabled={id && true} />
          </Form.Item>
          {!id && (
            <Form.Item
              className={styles.rowSearch}
              name='password'
              rules={[
                { required: true, message: 'Vui lòng nhập tên mật khẩu' },
                { min: 6, message: 'Vui lòng nhập mật khẩu trên 6 ký tự' },
              ]}
            >
              <PasswordInput label='Mật khẩu' require={true} placeholder='Nhập mật khẩu' />
            </Form.Item>
          )}
          <Form.Item
            className={styles.rowSearch}
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
          >
            <InputText label='Họ và tên' require placeholder='Nhập họ và tên' disabled={id && true} />
          </Form.Item>
          <Form.Item
            className={styles.rowSearch}
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ email' },
              {
                type: 'email',
                message: 'Vui lòng nhập đúng định dạng email',
              },
            ]}
          >
            <InputText label='Email' require placeholder='Nhập địa chỉ email' />
          </Form.Item>
          <Form.Item
            className={styles.rowSearch}
            name='address'
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <InputText label='Địa chỉ' require placeholder='Nhập tên địa chỉ' />
          </Form.Item>
          <Form.Item
            className={styles.rowSearch}
            name='gender'
            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
          >
            <SelectSearchInput label='Giới tính' options={listGender} require placeholder='Vui lòng chọn giới tính' />
          </Form.Item>
          <Form.Item className={styles.rowSearch} name='phone'>
            <InputText label='Số điện thoại' placeholder='Nhập số điện thoại' type='tel' />
          </Form.Item>
          <Form.Item className={styles.rowSearch} name='role'>
            <SelectSearchInput label='Phân quyền tài khoản' options={optionsRole} />
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

export default DetailUser;

export const HeaderForm = ({ title }) => {
  return (
    <Row className={styles.headerForm}>
      <Typography.Text className={styles.titleForm}>{title}</Typography.Text>
    </Row>
  );
};
