import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, notification, Row } from 'antd';
import clsx from 'clsx';
import { HeaderForm } from 'components/HeaderForm';
import InputText from 'components/InputText';
import ItemFileImage from 'components/ItemFileImage';
import { hideLoading, showLoading } from 'components/Loading';
import ModalApprove from 'components/ModalApprove';
import ModalRejectApprove from 'components/ModalRejectApprove';
import SelectSearchInput from 'components/SelectSearchInput';
import UploadFile from 'components/UploadFile';
import { debounce } from 'lodash';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import xAlbumApi from 'services/subs/xablum';
import { formatPathToListFile, getUrlFile } from 'utils/function.utils';
import styles from './index.module.scss';

const DetailAlbum = forwardRef(() => {
  const { id } = useParams();
  const modalRef = useRef();
  const categories = useSelector((state) => state?.resourceReducer?.categories) || [];

  const [data, setData] = useState();
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);

  const onFinish = async (values) => {
    showLoading();
    const res = await new xAlbumApi().edit(id, { ...values, images: images.map((i) => i.name) });
    if (res?.data?.success) {
      form.resetFields();
      notification.success({ message: 'Chỉnh sửa ảnh sex thành công' });
      getDetailStory(id);
    }
    hideLoading();
  };
  const getDetailStory = async (id) => {
    showLoading();
    const res = await new xAlbumApi().getDetail(id);
    if (res?.data?.success) {
      const album = res?.data?.data;
      const images = formatPathToListFile(album?.images, 'images');
      setImages(images);
      form.setFieldsValue({ ...album, category: album?.category?._id });
      setData(album);
    }
    hideLoading();
  };

  const onReset = () => {
    form.setFieldsValue({ ...data });
  };

  useEffect(() => {
    if (id) {
      getDetailStory(id);
    }
  }, [id]);

  const onApprove = async (values, status) => {
    showLoading();
    // action
    const payload = { ...values, status: status ? status : 1 };
    const res = await new xAlbumApi().approve(id, payload);
    if (res?.data?.success) {
      notification.success({ message: 'Phê duyệt bài viết thành công' });
      getDetailStory(id);
      onCancel();
    }
    hideLoading();
  };

  const showModal = () => modalRef.current.showModal();
  const onCancel = () => modalRef.current.handleCancel();

  const customRequestFiles = async () => {};
  const onChangeFile = async ({ file, fileList }) => {
    if (file?.status === 'removed') return;
    showLoading();
    const formatRes = await getUrlFile(fileList);
    setImages([...formatPathToListFile(formatRes), ...images]);
    hideLoading();
  };

  const onRemoveItemFile = (callback, file) => {
    callback();
    const newListFiles = images?.filter((i) => i.uid !== file.uid);
    setImages(newListFiles);
    if (newListFiles?.length === 0) {
      form.setFieldValue('images', null);
    }
  };
  const itemRender = (_, file, files, { remove }) => {
    return <ItemFileImage file={file} onClick={() => onRemoveItemFile(remove, file)} />;
  };

  return (
    <Row className={styles.editUser}>
      <HeaderForm title='Chi tiết album' status={data?.status} />
      <Form className={styles.form} form={form} onFinish={onFinish} name='DetailUser'>
        <Form.Item className={styles.rowSearch} name='title' rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
          <InputText label='Tên' require={true} placeholder='Nhập tên' />
        </Form.Item>
        <Form.Item
          className={styles.rowSearch}
          name='tags'
          rules={[
            {
              required: true,
              message: 'Hãy thêm một hoặc nhiều tags nữa, dùng dấu phẩy để tách!',
            },
          ]}
        >
          <SelectSearchInput label='Tags' mode='tags' require={true} placeholder='Hãy thêm một hoặc nhiều tags nữa' />
        </Form.Item>
        <Form.Item
          className={styles.rowSearch}
          name='category'
          rules={[
            {
              required: true,
              message: 'Hảy chọn thể loại',
            },
          ]}
        >
          <SelectSearchInput options={categories} label={'Phân loại'} require />
        </Form.Item>
        <Form.Item
          className={clsx(styles.rowSearch, styles.files)}
          name='images'
          rules={[{ required: true, message: 'Vui lòng chọn công khai' }]}
        >
          <UploadFile
            itemRender={itemRender}
            customRequest={customRequestFiles}
            label='Ảnh công khai'
            multiple={true}
            require
            onChange={debounce(onChangeFile, 100)}
            fileList={images}
          >
            <Button icon={<UploadOutlined />} className={styles.btnUpload}>
              Chọn ảnh công khai tải lên 
            </Button>
          </UploadFile>
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='password'>
          {data?.status === 0 && (
            <>
              <ModalApprove onSubmit={onApprove} modalRef={modalRef} onCancel={onCancel}>
                <Button className={styles.button} htmlType='button' onClick={showModal}>
                  Đồng ý duyệt album
                </Button>
              </ModalApprove>
            </>
          )}
          {data?.status === 1 && (
            <>
              <ModalRejectApprove onSubmit={(values) => onApprove(values, 2)} modalRef={modalRef} onCancel={onCancel}>
                <Button className={styles.button} htmlType='button' onClick={showModal}>
                  Hủy duyệt
                </Button>
              </ModalRejectApprove>
            </>
          )}
          {data?.status !== 2 && (
            <Button className={styles.button} htmlType='submit'>
              Lưu chỉnh sửa
            </Button>
          )}
        </Form.Item>
      </Form>
    </Row>
  );
});

export default DetailAlbum;
