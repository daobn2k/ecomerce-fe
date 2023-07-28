import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, notification, Row, Space } from 'antd';
import InputText from 'components/InputText';
import SelectSearchInput from 'components/SelectSearchInput';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from 'redux/slices/resourcesSlice';
import settingApi from 'services/subs/setting';
import styles from './edit-categories.module.scss';

const EditCategories = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.resourceReducer?.categories) || [];

  const onFinish = (values) => {};
  const formatDataDynamic = (data = []) => {
    if (data?.length > 0) {
      return data.map((i) => ({ name: i.label, type: i?.data?.type, id: i.id }));
    }
    return [];
  };

  useEffect(() => {
    if (categories) {
      const data = formatDataDynamic(categories);
      form.setFieldValue('categories', data);
    }
  }, [categories]);

  const handleRemoveCategories = async (name) => {
    const data = categories[name];
    if (!data?.id) return;
    setLoading(true);

    const res = await new settingApi().deleteCategories(data?.id);

    if (res?.data?.success) {
      const newCategories = categories?.length > 0 ? categories?.filter((i, index) => index !== name) : [];
      dispatch(setCategories({ data: newCategories }));
    }
    setLoading(false);
  };

  const handleAdd = async (key) => {
    const field = form.getFieldValue('categories')[key];
    const { name, type, id } = field;
    if (!name || !type) return notification.error({ message: 'Vui lòng chọn đầy đủ dữ liệu trước khi tạo mới' });

    setLoading(true);
    let res;
    if (id) {
      res = await new settingApi().editCategories(id, { name, type });
    } else {
      res = await new settingApi().addCategories(field);
    }

    if (res?.data?.success) {
      notification.success({ message: 'Lưu thành công' });
    }
    setLoading(false);
  };
  return (
    <Form className={styles.form} form={form} onFinish={onFinish} name='form-info-categories'>
      <Form.List name='categories'>
        {(fields, { add, remove }) => (
          <>
            <Form.Item style={{ maxWidth: 330 }}>
              <Button type='primary' onClick={() => add({ name: '', type: null }, 0)} block icon={<PlusOutlined />}>
                Thêm phân loại
              </Button>
            </Form.Item>
            <Row className={styles.list}>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }} align='baseline'>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: 'Nhập tên phân loại' }]}
                      className={styles.rowSearch}
                    >
                      <InputText placeholder='Nhập tên phân loại' label='Tên phân loại' require />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      rules={[{ required: true, message: 'Nhập loại' }]}
                      className={styles.rowSearch}
                    >
                      <SelectSearchInput
                        options={[
                          { id: 'xvideo', label: 'xvideo' },
                          { id: 'xalbum', label: 'xalbum' },
                        ]}
                        label='Loại'
                        require
                        placeholder='Chọn loại'
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <Button
                        type='primary'
                        onClick={() => {
                          remove(name);
                          handleRemoveCategories(name);
                        }}
                        style={{ marginTop: 8, width: 'fit-content', background: 'red' }}
                        loading={loading}
                      >
                        Xóa
                      </Button>
                    ) : null}
                    <Button
                      type='primary'
                      style={{ marginTop: 8, width: 'fit-content' }}
                      loading={loading}
                      htmlType='button'
                      onClick={() => handleAdd(name)}
                    >
                      Lưu
                    </Button>
                  </Space>
                );
              })}
            </Row>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default EditCategories;
