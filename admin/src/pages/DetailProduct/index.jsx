import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, notification, Row, Typography } from 'antd';
import clsx from 'clsx';
import InputText from 'components/InputText';
import InputTextarea from 'components/InputTextArea';
import ItemFileImage from 'components/ItemFileImage';
import { hideLoading, showLoading } from 'components/Loading';
import UploadFile from 'components/UploadFile';
import { paths } from 'constants/paths.constants';
import { useUploadFiles } from 'hooks/useUploadFile';
import { debounce } from 'lodash';
import { SelectSearchCategory } from 'pages/ListProducts/components/FormSearch';
import { forwardRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productsApi from 'services/subs/products';
import { convertDataSelect, formatPathToListFile } from 'utils/function.utils';
import styles from './index.module.scss';

const DetailProduct = forwardRef(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { images, onChangeFile, onRemoveItemFile, setImages } = useUploadFiles(form);

  const onSubmit = async (values) => {
    showLoading();
    let res;
    const params = {
      ...values,
      category_id: values.category_id.id,
      images: images?.length ? images.map((i) => i.url) : [],
    };

    console.log(params, 'params');
    if (id) {
      res = await new productsApi().edit({
        id,
        params,
      });
    } else {
      res = await new productsApi().add(params);
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
    const res = await new productsApi().detail(id);

    if (res?.data?.result === 'SUCCESS') {
      const product = res?.data?.data;
      form.setFieldsValue({
        ...product,
        images: formatPathToListFile(product?.images),
        category_id: convertDataSelect(product.category_id),
      });
      setImages(formatPathToListFile(product?.images));
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
  const itemRender = (_, file, files, { remove }) => {
    return <ItemFileImage file={file} onClick={() => onRemoveItemFile(remove, file)} />;
  };

  return (
    <Row className={styles.editUser}>
      <HeaderForm title={id ? 'Chi tiết sản phẩm' : 'Tạo mới sản phẩm'} />
      <Form className={clsx(styles.form, styles.files)} form={form} onFinish={onSubmit} name='DetailUser'>
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
            { min: 50, message: 'Không được nhập mô tả nhỏ hơn 20 ký tự' },
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

export default DetailProduct;

export const HeaderForm = ({ title }) => {
  return (
    <Row className={styles.headerForm}>
      <Typography.Text className={styles.titleForm}>{title}</Typography.Text>
    </Row>
  );
};
