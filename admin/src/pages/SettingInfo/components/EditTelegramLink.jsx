import { Button, Form, notification, Row } from 'antd';
import InputText from 'components/InputText';
import { settingsType } from 'constants/value.constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTeleLink } from 'redux/slices/resourcesSlice';
import settingApi from 'services/subs/setting';
import styles from './exchange-rate.module.scss';

const EditTelegramLink = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const teleLink = useSelector((state) => state?.resourceReducer?.teleLink) || [];

  const onFinish = async (values) => {
    const res = await new settingApi().editSettings({ value: values?.tele_link, type: settingsType.tele_link });

    if (res?.data?.success) {
      notification.success({ message: 'Thay đổi tỉ giá massage thành công' });
      dispatch(setTeleLink({ data: values?.tele_link }));
    }
  };

  useEffect(() => {
    if (teleLink) {
      form.setFieldValue(settingsType.tele_link, teleLink);
    }
  }, [teleLink]);

  return (
    <Form
      className={styles.form}
      form={form}
      name='form-info'
      onFinish={onFinish}
      initialValues={{
        rates: [
          {
            startPrice: 0,
            endPrice: 300000,
            point: 400,
          },
          {
            startPrice: 300000,
            endPrice: 500000,
            point: 700,
          },
          {
            startPrice: 500000,
            endPrice: 800000,
            point: 900,
          },
          {
            startPrice: 800000,
            endPrice: 1500000,
            point: 1200,
          },
          {
            startPrice: 150000,
            endPrice: null,
            point: 2200,
          },
        ],
      }}
    >
      <Row className={styles.itemForm}>
        <Form.Item
          className={styles.rowSearch}
          name={settingsType.tele_link}
          rules={[{ required: true, message: 'Nhập đường dẫn thư nội bộ' }]}
        >
          <InputText label='Thư nội bộ' placeholder='Nhập đường dẫn thư nội bộ' require />
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

export default EditTelegramLink;
