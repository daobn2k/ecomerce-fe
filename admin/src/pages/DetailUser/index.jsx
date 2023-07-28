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
    delete values.point;
    const res = await new userApi().editUser({
      id,
      params: {
        ...values,
        dob: values['dob'].format('YYYY'),
        role: role?.id ?? undefined,
        phone: values?.phone ?? undefined,
      },
    });
    if (res?.data?.result === 'SUCCESS') {
      notification.success({ message: res?.data?.message ?? 'Chỉnh sửa người dùng thành công' });
    }
    hideLoading();
  };
  const getDetailUser = async (id) => {
    const res = await new userApi().getUserDetail(id);

    if (res?.data?.result === 'SUCCESS') {
      const user = res?.data?.data;
      form.setFieldsValue({
        ...user,
        dob: user?.dob ? moment(user?.dob, 'YYYY') : null,
        role: optionsRole.find((ele) => ele.id === user?.role)?.value,
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
            name='username'
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <InputText label='Tên đăng nhập' require placeholder='Nhập tên đăng nhập' disabled={true} />
          </Form.Item>
          <Form.Item
            className={styles.rowSearch}
            name='gender'
            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
          >
            <SelectSearchInput label='Giới tính' options={listGender} require placeholder='Vui lòng chọn giới tính' />
          </Form.Item>
          <Form.Item
            className={styles.rowSearch}
            name='dob'
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
          >
            <DatePickerCustomize label='Năm sinh' require picker='year' placeholder='Chọn ngày sinh' />
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
