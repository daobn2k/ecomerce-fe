import { Button, Divider, Form, notification, Row, Typography } from 'antd';
import clsx from 'clsx';
import InputText, { PasswordInput } from 'components/InputText';
import { hideLoading, showLoading } from 'components/Loading';
import { paths } from 'constants/paths.constants';
import AuthContext from 'contexts/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from 'services/subs/auth';
import { setToken, setUserProfile } from 'utils/storage.ultils';
import styles from './index.module.scss';
export const Login = () => {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleLogin(values);
  };

  const handleLogin = async (values) => {
    showLoading();
    const res = await new authApi().login({ ...values });

    if (res?.data?.result === 'SUCCESS') {
      setUser(res?.data?.data);
      setUserProfile(res?.data?.data);
      notification.success({ message: 'Đăng nhập thành công' });
      form.resetFields();
      navigate(paths.products);
    }

    hideLoading();
  };

  return (
    <Row className={styles.login}>
      <Row className={clsx(styles.paperForm)}>
        <TopLogin />
        <Form className={styles.form} form={form} onFinish={onFinish}>
          <Form.Item
            className={styles.rowSearch}
            name='username'
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <InputText label='Tên đăng nhập' require={true} placeholder='Nhập tên đăng nhập' />
          </Form.Item>
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
          <Form.Item className={styles.rowSearch} name='password'>
            <Button className={styles.button} htmlType='submit'>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Row>
  );
};

const TopLogin = () => {
  return (
    <Row className={styles.topLogin}>
      <Typography className={styles.title}>Đăng nhập</Typography>
      <Divider />
    </Row>
  );
};
