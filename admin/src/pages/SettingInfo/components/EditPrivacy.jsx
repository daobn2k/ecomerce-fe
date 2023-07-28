import { Button, Form, notification, Row } from 'antd';
import QuillEditor from 'components/QuillEditor';
import { settingsType } from 'constants/value.constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMassageRate, setPrivacy } from 'redux/slices/resourcesSlice';
import settingApi from 'services/subs/setting';
import styles from './exchange-rate.module.scss';

const EditPrivacy = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const privacy = useSelector((state) => state?.resourceReducer?.privacy) || [];

  const onFinish = async (values) => {
    const res = await new settingApi().editSettings({ value: values?.privacy, type: settingsType.privacy });

    if (res?.data?.success) {
      notification.success({ message: 'Thay đổi quy định' });
      dispatch(setPrivacy({ data: values?.privacy }));
    }
  };

  useEffect(() => {
    if (privacy) {
      form.setFieldValue(settingsType.privacy, privacy);
    }
  }, [privacy]);

  const handleOnChange = (editor) => {
    form.setFieldValue(settingsType.privacy, editor);
  };

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
      <Form.Item
        className={styles.rowSearch}
        name={settingsType.privacy}
        rules={[{ required: true, message: 'Vui lòng nhập nội dung quy định' }]}
      >
        <QuillEditor
          placeholder='Nhập quy định'
          label='Quy định'
          handleOnChange={handleOnChange}
          require
          defaultValue={privacy}
        />
      </Form.Item>
      <Form.Item name='btn'>
        <Button type='primary' htmlType='submit' style={{ marginTop: 8, width: 128 }}>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPrivacy;
