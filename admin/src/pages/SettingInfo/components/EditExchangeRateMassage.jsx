import { Button, Form, notification, Row } from 'antd';
import InputText from 'components/InputText';
import { settingsType } from 'constants/value.constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMassageRate } from 'redux/slices/resourcesSlice';
import settingApi from 'services/subs/setting';
import styles from './exchange-rate.module.scss';

const EditExchangeRateMassage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const massageRate = useSelector((state) => state?.resourceReducer?.massageRate) || [];

  const onFinish = async (values) => {
    const res = await new settingApi().editSettings({ value: +values?.massage_rate, type: settingsType.massage_rate });

    if (res?.data?.success) {
      notification.success({ message: 'Thay đổi tỉ giá massage thành công' });
      dispatch(setMassageRate({ data: +values?.massage_rate }));
    }
  };

  useEffect(() => {
    if (massageRate) {
      form.setFieldValue(settingsType.massage_rate, massageRate);
    }
  }, [massageRate]);

  return (
    <Form
      className={styles.form}
      form={form}
      name='form-info'
      onFinish={onFinish}
    >
      <Row className={styles.itemForm}>
        <Form.Item
          className={styles.rowSearch}
          name={settingsType.massage_rate}
          rules={[{ required: true, message: 'Nhập tỉ giá gia hạn' }]}
        >
          <InputText label='Tỉ giá gia hạn massage' placeholder='Nhập tỉ giá gia hạn' type='number' require />
        </Form.Item>
      </Row>
      <Form.Item name='btn'>
        <Button type='primary' htmlType='submit' style={{ marginTop: 8, width: 128 }}>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditExchangeRateMassage;
