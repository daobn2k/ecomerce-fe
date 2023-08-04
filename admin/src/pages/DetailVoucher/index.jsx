import { Button, Form, notification, Row, Typography } from 'antd';
import clsx from 'clsx';
import DatePickerCustomize from 'components/DatePicker';
import InputText from 'components/InputText';
import { hideLoading, showLoading } from 'components/Loading';
import { paths } from 'constants/paths.constants';
import moment from 'moment';
import { SelectUser } from 'pages/ListVoucher/components/FormSearch';
import { forwardRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import voucherApi from 'services/subs/voucher';
import { convertDataSelect, convertDateStringToLocal } from 'utils/function.utils';
import { getUserProfile } from 'utils/storage.ultils';
import styles from './index.module.scss';

const DetailVoucher = forwardRef(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userProfile = getUserProfile();

  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    showLoading();
    let res;
    const params = {
      ...values,
      create_uid: userProfile._id,
      recive_uid: values?.recive_uid?.id,
    };
    if (id) {
      res = await new voucherApi().edit({
        id,
        params,
      });
    } else {
      res = await new voucherApi().add(params);
    }
    if (res.data.result === 'SUCCESS') {
      notification.success({ message: res.data.message });
      if (!id) {
        navigate(paths.products);
      }
    } else {
      notification.error({ message: res.data.message });
    }
    hideLoading();
  };

  const getDetail = async (id) => {
    const res = await new voucherApi().detail(id);

    if (res?.data?.result === 'SUCCESS') {
      const voucher = res?.data?.data;
      form.setFieldsValue({
        ...voucher,
        active_date: voucher.active_date ? moment(voucher.active_date) : null,
        recive_uid: convertDataSelect(voucher.recive_uid),
      });
    }
  };

  const onReset = () => {
    navigate(paths.user);

    form.resetFields();
  };

  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);

  return (
    <Row className={styles.editUser}>
      <HeaderForm title={id ? 'Chi tiết mã ưu đãi' : 'Tạo mới mã ưu đãi'} />
      <Form className={clsx(styles.form, styles.files)} form={form} onFinish={onSubmit} name='DetailUser'>
        <Form.Item
          name='name'
          rules={[
            { required: true, message: 'Vui lòng nhập tên mã ưu đãi' },
            { min: 6, message: 'Vui lòng nhập mã ưu đãi lớn hơn 6 ký tự' },
            { max: 256, message: 'Vui lòng nhập mã ưu đãi lớn hơn 256 ký tự' },
          ]}
        >
          <InputText label='Tên mã ưu đãi' placeholder='Nhập tên mã ưu đãi' require />
        </Form.Item>
        <Form.Item
          name='discount'
          rules={[
            { required: true, message: 'Vui lòng nhập giá tiền giảm' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value < 0) {
                  return Promise.reject('Không được nhập số tiền nhỏ hơn 0');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <InputText label='Giảm giá' placeholder='Nhập giá tiền giảm' require type='number' />
        </Form.Item>
        <Form.Item
          className={styles.rowSearch}
          name='active_date'
          rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn' }]}
        >
          <DatePickerCustomize label='Ngày hết hạn' require placeholder='Ngày hết hạn' format='DD-MM-YYYY' />
        </Form.Item>
        <Form.Item
          className={styles.rowSearch}
          name='recive_uid'
          rules={[{ required: true, message: 'Vui lòng chọn người nhận' }]}
        >
          <SelectUser label='Người nhận' require placeholder='Chọn người nhận' />
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

export default DetailVoucher;

export const HeaderForm = ({ title }) => {
  return (
    <Row className={styles.headerForm}>
      <Typography.Text className={styles.titleForm}>{title}</Typography.Text>
    </Row>
  );
};
