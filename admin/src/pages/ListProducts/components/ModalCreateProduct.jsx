import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Row } from 'antd';
import InputText from 'components/InputText';
import InputTextarea from 'components/InputTextArea';
import ItemFileImage from 'components/ItemFileImage';
import ModalCustomize from 'components/ModalCustomize';
import UploadFile from 'components/UploadFile';
import { useUploadFiles } from 'hooks/useUploadFile';
import { debounce } from 'lodash';
import { SelectSearchCategory } from './FormSearch';
import styles from './modal-product.module.scss';

const ModalCreateProduct = ({ modalRef, onSubmit, children, onCancel }) => {
  return (
    <ModalCustomize
      title='Tạo mới sản phẩm'
      content={<ContentModalProduct onSubmit={onSubmit} onCancel={onCancel} />}
      ref={modalRef}
      isHiddenFooter
    >
      {children}
    </ModalCustomize>
  );
};

export default ModalCreateProduct;

export const ContentModalProduct = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const actionCancel = () => {
    onCancel && onCancel();
    form.resetFields();
  };
  const { images, onChangeFile, onRemoveItemFile } = useUploadFiles(form);

  const itemRender = (_, file, files, { remove }) => {
    return <ItemFileImage file={file} onClick={() => onRemoveItemFile(remove, file)} />;
  };
  return (
    <Form
      name='approve-modal'
      form={form}
      onFinish={(values) => onSubmit({ ...values, images })}
      className={styles.files}
    >
      <Form.Item
        name='name'
        rules={[
          { required: true, message: 'Vui lòng nhập tên sản phẩm' },
          { min: 6, message: 'Vui lòng nhập sản phẩm lớn hơn 6 ký tự' },
          { max: 256, message: 'Vui lòng nhập sản phẩm lớn hơn 256 ký tự' },
        ]}
      >
        <InputText label='Tên sản phẩm' placeholder='Nhập tên sản phẩm' require />
      </Form.Item>
      <Form.Item name='category_id' rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}>
        <SelectSearchCategory require />
      </Form.Item>
      <Form.Item name='origin' rules={[{ required: true, message: 'Vui lòng nhập xuất xứ' }]}>
        <InputText label='Xuất xứ' placeholder='Nhập xuất xứ' require />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[
          { required: true, message: 'Vui lòng nhập giá tiền' },
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
        <InputText label='Giá tiền' placeholder='Nhập giá tiền' require type='number' />
      </Form.Item>
      <Form.Item
        name='quantity'
        rules={[
          { required: true, message: 'Vui lòng nhập số lượng sản phẩm' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value < 1) {
                return Promise.reject('Không được nhập số sản phẩm nhỏ hơn 1');
              }
              if (value > 100) {
                return Promise.reject('Không được nhập số sản phẩm lớn hơn 100');
              }

              return Promise.resolve();
            },
          }),
        ]}
      >
        <InputText label='Số lượng' placeholder='Nhập số lượng' require type='number' />
      </Form.Item>
      <Form.Item
        name='description'
        rules={[
          { required: true, message: 'Nhập giới thiệu sản phẩm' },
          { max: 3000, message: 'Không nhập trên 3000 ký tự ' },
          { min: 50, message: 'Không được nhập mô tả nhỏ hơn 50 ký tự' },
        ]}
      >
        <InputTextarea label='Giới thiệu sản phẩm' placeholder='Nhập giới thiệu sản phẩm' require />
      </Form.Item>
      <Form.Item name='images' rules={[{ required: true, message: 'Chọn ảnh sản phẩm' }]}>
        <UploadFile
          customRequest={() => {}}
          itemRender={itemRender}
          multiple={true}
          label='Tải ảnh sản phẩm'
          require
          maxCount={10}
          onChange={debounce(onChangeFile, 100)}
          fileList={images}
        >
          <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
        </UploadFile>
      </Form.Item>
      <Form.Item name='btn'>
        <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <Button type='primary' htmlType='submit'>
            Đồng ý
          </Button>
          <Button onClick={actionCancel} htmlType='button'>
            Hủy
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};
