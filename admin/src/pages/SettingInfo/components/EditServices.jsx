import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, notification, Row, Space } from 'antd';
import InputText from 'components/InputText';
import { hideLoading, showLoading } from 'components/Loading';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setServices } from 'redux/slices/resourcesSlice';
import settingApi from 'services/subs/setting';
import styles from './edit-services.module.scss';

const EditServices = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const services = useSelector((state) => state?.resourceReducer?.services) || [];

  const onValuesChange = (_, values) => {};
  const formatDataDynamic = (data = []) => {
    if (data?.length > 0) {
      return data.map((i) => ({ name: i.label, id: i.id }));
    }
    return [];
  };

  useEffect(() => {
    if (services) {
      const data = formatDataDynamic(services);

      form.setFieldValue('services', data);
    }
  }, [services]);

  const handleRemove = async (name) => {
    const data = services[name];
    if (!data?.id) return;
    showLoading(true);

    const res = await new settingApi().deleteServices(data?.id);

    if (res?.data?.success) {
      const newServices = services?.length > 0 ? services?.filter((i, index) => index !== name) : [];
      dispatch(setServices({ data: newServices }));
    }
    hideLoading(false);
  };

  const handleAdd = async (key) => {
    showLoading(true);
    const services = form.getFieldValue('services');
    const field = services?.[key];
    const { name, id } = field;
    if (!name) return notification.error({ message: 'Vui lòng chọn đầy đủ dữ liệu trước khi tạo mới' });

    let res;
    if (id) {
      res = await new settingApi().editServices(id, { name });
    } else {
      res = await new settingApi().addServices(field);
    }
    if (res?.data?.success) {
      notification.success({ message: 'Lưu thành công' });
      dispatch(setServices({ data: services }));
    }
    hideLoading(false);
  };
  return (
    <Form className={styles.form} form={form} onValuesChange={debounce(onValuesChange, 500)} name='form-info-services'>
      <Form.List name='services'>
        {(fields, { add, remove }) => (
          <>
            <Form.Item style={{ maxWidth: 330 }}>
              <Button type='primary' onClick={() => add({ name: '', type: null }, 0)} block icon={<PlusOutlined />}>
                Thêm dịch vụ
              </Button>
            </Form.Item>
            <Row className={styles.list}>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }} align='baseline'>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Nhập tên dịch vụ' }]}
                    className={styles.rowSearch}
                  >
                    <InputText placeholder='Nhập tên dịch vụ' label='Tên dịch vụ' require />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <Button
                      type='primary'
                      onClick={() => {
                        remove(name);
                        handleRemove(name);
                      }}
                      style={{ marginTop: 8, width: 'fit-content', background: 'red' }}
                    >
                      Xóa
                    </Button>
                  ) : null}
                  <Button
                    type='primary'
                    style={{ marginTop: 8, width: 'fit-content', marginRight: 96 }}
                    htmlType='button'
                    onClick={() => handleAdd(name)}
                  >
                    Lưu
                  </Button>
                </Space>
              ))}
            </Row>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default EditServices;
