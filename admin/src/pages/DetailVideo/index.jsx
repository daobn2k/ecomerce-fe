import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, notification, Row } from 'antd';
import clsx from 'clsx';
import DragFile from 'components/DragFile';
import { HeaderForm } from 'components/HeaderForm';
import InputText from 'components/InputText';
import InputTextarea from 'components/InputTextArea';
import ItemFileImage from 'components/ItemFileImage';
import { hideLoading, showLoading } from 'components/Loading';
import ModalApprove from 'components/ModalApprove';
import ModalRejectApprove from 'components/ModalRejectApprove';
import SelectSearchInput from 'components/SelectSearchInput';
import UploadFile from 'components/UploadFile';
import VideoReact from 'components/VideoReact';
import { paths } from 'constants/paths.constants';
import { debounce } from 'lodash';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import xVideoApi from 'services/subs/xvideo';
import { formatPathToListFile, formatPathToUrl } from 'utils/function.utils';
import styles from './index.module.scss';

const DetailVideo = forwardRef(() => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state?.resourceReducer?.categories) || [];
  const modalRef = useRef();
  const { id } = useParams();
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const dragFileRef = useRef();
  const [urlVideo, setUrlVideo] = useState();
  const [posters, setPosters] = useState([]);
  const onValuesChange = async (value, values) => {
    const name = Object.getOwnPropertyNames(value)[0];
    const { tags = [], title = '', content = '', category = '', video, poster } = values;

    showLoading();
    const formDataCreate = new FormData();
    formDataCreate.append('title', title);
    formDataCreate.append('content', content);
    formDataCreate.append('category', category);
    for (let i = 0; i < tags.length; i++) {
      formDataCreate.append('tags[]', tags[i]);
    }
    if (name === 'video') {
      formDataCreate.append('file', video?.file?.originFileObj);
    }
    if (name === 'poster') {
      formDataCreate.append('poster', poster?.file?.originFileObj);
    }
    const res = await new xVideoApi().edit(id, formDataCreate);

    if (res?.data?.success) {
      notification.success({ message: 'Chỉnh sửa phim sex thành công' });
      getDetailVideo(id);
    }
    hideLoading();
  };
  const getDetailVideo = async (id) => {
    const res = await new xVideoApi().getDetailXVideo(id);

    if (res?.data?.success) {
      const video = res?.data?.data;
      const poster = formatPathToListFile([video?.poster]);
      form.setFieldsValue({ ...video, category: video?.category?._id, poster });
      setData(video);
      setPosters(poster);
      setUrlVideo(video?.video);
    }
  };

  const onReset = () => {
    navigate(paths.user);

    form.resetFields();
  };

  useEffect(() => {
    if (id) {
      getDetailVideo(id);
    }
  }, [id]);

  const onApprove = async (values, status) => {
    showLoading();
    // action
    const payload = { ...values, status: status ? status : 1 };
    const res = await new xVideoApi().approve(id, payload);
    if (res?.data?.success) {
      notification.success({ message: 'Phê duyệt bài viết thành công' });
      getDetailVideo(id);
      onCancel();
    }
    hideLoading();
  };

  const showModal = () => modalRef.current.showModal();
  const onCancel = () => modalRef.current.handleCancel();

  const itemRenderFile = (_, file, files, { remove }) => {
    return <ItemFileImage file={file} />;
  };
  return (
    <Row className={styles.editUser}>
      <HeaderForm title='Chi tiết xvideos' status={data?.status} />
      <Form className={styles.form} form={form} onValuesChange={debounce(onValuesChange, 300)} name='DetailUser'>
        <Form.Item
          className={styles.rowSearch}
          name='title'
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <InputText label='Tiêu đề' require={true} placeholder='Nhập tiêu đề' />
        </Form.Item>
        <Form.Item
          className={styles.rowSearch}
          name='content'
          rules={[
            { required: true, message: 'Vui lòng nhập mô tả' },
            { min: 20, message: 'Vui lòng nhập mô tả trên 20 ký tự' },
          ]}
        >
          <InputTextarea label='Mô tả' require={true} placeholder='Nhập mô tả' />
        </Form.Item>
        <Form.Item
          className={styles.rowSearch}
          name='tags'
          rules={[
            {
              required: true,
              message: 'Hãy thêm một hoặc nhiều tags nữa',
            },
          ]}
        >
          <SelectSearchInput placeholder='Hãy thêm một hoặc nhiều tags nữa' mode='tags' label='Tags' require />
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
          <SelectSearchInput options={categories} label={'Phân loại'} require disabled={true} />
        </Form.Item>
        <Form.Item
          className={styles.rowSearch}
          name='video'
          rules={[{ required: true, message: 'Vui lòng chọn videos tải lên *' }]}
        >
          <DragFile
            customRequest={() => {}}
            accept={'video/x-msvideo,video/mp4,video/x-ms-wmv,video/x-matroska,video/x-flv, image/gif,video/quicktime'}
            itemRender={() => <></>}
            ref={dragFileRef}
            maxCount={1}
            label='Video gái gọi'
            require
          />
        </Form.Item>
        <Form.Item noStyle>
          <Row className={styles.video} style={{ marginTop: 16 }}>
            <VideoReact src={formatPathToUrl(urlVideo)} />
          </Row>
        </Form.Item>
        <Form.Item
          className={clsx(styles.rowSearch, styles.files)}
          name='poster'
          // rules={[{ required: true, message: 'Vui lòng chọn ảnh riêng tư' }]}
        >
          <UploadFile
            itemRender={itemRenderFile}
            customRequest={() => {}}
            label='Ảnh thumnail'
            multiple={false}
            maxCount={1}
            require
            fileList={posters}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh thumbnail tải lên</Button>
          </UploadFile>
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='password'>
          {data?.status === 0 && (
            <>
              <ModalApprove onSubmit={onApprove} modalRef={modalRef} onCancel={onCancel}>
                <Button className={styles.button} htmlType='button' onClick={showModal}>
                  Phê duyệt
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
        </Form.Item>
      </Form>
    </Row>
  );
});

export default DetailVideo;
