import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, notification, Row, Space } from 'antd';
import InputText from 'components/InputText';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostRate } from 'redux/slices/resourcesSlice';
import settingApi from 'services/subs/setting';
import styles from './rate-extend.module.scss';

const EditRateExtend = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const postRate = useSelector((state) => state?.resourceReducer?.postRate) || [];

  const onFinish = async (values) => {
    setLoading(true);
    const rates = values?.rates.map((i) => {
      return {
        ...i,
        point: +i?.point,
      };
    });
    const res = await new settingApi().editSettings({ value: rates, type: 'post_rate' });

    if (res?.data?.success) {
      notification.success({ message: 'Thay đổi tỉ giá gái gọi thành công' });
      dispatch(setPostRate({ data: rates }));
    }

    setLoading(false);
  };

  useEffect(() => {
    if (postRate) {
      form.setFieldValue('rates', postRate);
    }
  }, [postRate]);

  return (
    <Form className={styles.form} form={form} onFinish={onFinish} name='form-info'>
      <Form.List name='rates'>
        {(fields, { add, remove }) => (
          <>
            <Form.Item style={{ maxWidth: 330 }}>
              <Button type='primary' onClick={() => add({ name: '', type: null }, 0)} block icon={<PlusOutlined />}>
                Thêm tỉ giá gia hạn gái gọi
              </Button>
            </Form.Item>
            <Row className={styles.list}>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }} align='baseline'>
                    <Form.Item
                      {...restField}
                      name={[name, 'startPrice']}
                      rules={[{ required: true, message: 'Nhập giá bắt đầu' }]}
                      className={styles.rowSearch}
                    >
                      <InputText placeholder='Nhập giá bắt đầu' label='Giá bắt đầu' require />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'endPrice']} className={styles.rowSearch}>
                      <InputText placeholder='Nhập giá kết thúc' label='Giá kết thúc' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'point']}
                      rules={[{ required: true, message: 'Điểm' }]}
                      className={styles.rowSearch}
                    >
                      <InputText placeholder='Nhập điểm' label='Điểm' require />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <Button
                        type='primary'
                        onClick={() => remove(name)}
                        style={{ marginTop: 8, width: 'fit-content', background: 'red' }}
                      >
                        Xóa
                      </Button>
                    ) : null}
                  </Space>
                );
              })}
            </Row>
          </>
        )}
      </Form.List>
      <Form.Item name='btn'>
        <Button type='primary' htmlType='submit' style={{ marginTop: 8, width: 128 }} loading={loading}>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditRateExtend;
