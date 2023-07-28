import { Button, Form, notification } from 'antd';
import QuillEditor from 'components/QuillEditor';
import { settingsType } from 'constants/value.constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContentFooter } from 'redux/slices/resourcesSlice';
import settingApi from 'services/subs/setting';
import styles from './exchange-rate.module.scss';

const EditContentFooter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const contentFooter = useSelector((state) => state?.resourceReducer?.contentFooter) || [];

  const onFinish = async (values) => {
    const res = await new settingApi().editSettings({ value: values?.contentFooter, type: settingsType.contentFooter });

    if (res?.data?.success) {
      notification.success({ message: 'Thay đổi quy định' });
      dispatch(setContentFooter({ data: values?.contentFooter }));
    }
  };

  useEffect(() => {
    if (contentFooter) {
      form.setFieldValue(settingsType.contentFooter, contentFooter);
    }
  }, [contentFooter]);

  const handleOnChange = (editor) => {
    form.setFieldValue(settingsType.contentFooter, editor);
  };

  return (
    <Form
      className={styles.form}
      form={form}
      name='form-info'
      onFinish={onFinish}
    >
      <Form.Item
        className={styles.rowSearch}
        name={settingsType.contentFooter}
        rules={[{ required: true, message: 'Vui lòng nhập nội dung cuối trang' }]}
      >
        <QuillEditor
          placeholder='Nhập nội dung cuối trang'
          label='Nội dung cuối trang'
          handleOnChange={handleOnChange}
          require
          defaultValue={contentFooter}
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

export default EditContentFooter;
