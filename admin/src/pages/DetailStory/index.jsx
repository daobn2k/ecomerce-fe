import { Button, Form, notification, Row } from 'antd';
import { HeaderForm } from 'components/HeaderForm';
import InputText from 'components/InputText';
import InputTextarea from 'components/InputTextArea';
import { hideLoading, showLoading } from 'components/Loading';
import ModalApprove from 'components/ModalApprove';
import ModalRejectApprove from 'components/ModalRejectApprove';
import QuillEditor from 'components/QuillEditor';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import xStoryApi from 'services/subs/xstory';
import styles from './index.module.scss';

const DetailStory = forwardRef(() => {
  const { id } = useParams();
  const modalRef = useRef();
  const [data, setData] = useState();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    showLoading();
    const res = await new xStoryApi().edit(id, values);
    if (res?.data?.success) {
      form.resetFields();
      notification.success({ message: 'Chỉnh sửa truyện thành công' });
      getDetailStory(id);
    }
    hideLoading();
  };
  const getDetailStory = async (id) => {
    showLoading();
    const res = await new xStoryApi().getDetail(id);
    if (res?.data?.success) {
      const story = res?.data?.data;
      form.setFieldsValue({ ...story });
      setData(story);
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

  const handleOnChange = (editor) => {
    form.setFieldValue('content', editor);
  };

  const onApprove = async (values, status) => {
    showLoading();
    // action
    const payload = { ...values, status: status ? status : 1 };
    const res = await new xStoryApi().approve(id, payload);
    if (res?.data?.success) {
      notification.success({ message: 'Phê duyệt bài viết thành công' });
      getDetailStory(id);
      onCancel();
    }
    hideLoading();
  };

  const showModal = () => modalRef.current.showModal();
  const onCancel = () => modalRef.current.handleCancel();

  return (
    <Row className={styles.editUser}>
      <HeaderForm title='Chi tiết truyện' status={data?.status} />
      <Form className={styles.form} form={form} onFinish={onFinish} name='DetailUser'>
        <Form.Item
          className={styles.rowSearch}
          name='title'
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <InputText label='Tiêu đề' require={true} placeholder='Nhập tiêu đề' />
        </Form.Item>
        <Form.Item
          className={styles.rowSearch}
          name='description'
          rules={[
            { required: true, message: 'Vui lòng nhập mô tả' },
            { min: 20, message: 'Vui lòng nhập mô tả trên 20 ký tự' },
          ]}
        >
          <InputTextarea label='Mô tả' require={true} placeholder='Nhập mô tả' />
        </Form.Item>

        <Form.Item
          className={styles.rowSearch}
          name='content'
          rules={[{ required: true, message: 'Vui lòng nhập nội dung truyện' }]}
        >
          <QuillEditor
            placeholder='Nội dung truyện'
            label='Nội dung truyện'
            handleOnChange={handleOnChange}
            require
            defaultValue={form.getFieldValue('content')}
          />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='password'>
          {data?.status === 0 && (
            <>
              <ModalApprove onSubmit={onApprove} modalRef={modalRef} onCancel={onCancel}>
                <Button className={styles.button} htmlType='button' onClick={showModal}>
                  Đồng ý duyệt truyện
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
            <>
              <Button className={styles.button} htmlType='submit'>
                Lưu chỉnh sửa
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
    </Row>
  );
});

export default DetailStory;
