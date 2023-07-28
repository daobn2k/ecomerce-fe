import { UploadOutlined } from '@ant-design/icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, notification, Row } from 'antd';
import clsx from 'clsx';
import DragFile from 'components/DragFile';
import FormControlLabel from 'components/FormControlLabel';
import ItemFileImage from 'components/ItemFileImage';
import { hideLoading, showLoading } from 'components/Loading';
import UploadFile from 'components/UploadFile';
import VideoReact from 'components/VideoReact';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import postsApi from 'services/subs/posts';
import { formatPathToListFile, formatPathToUrl, getUrlFile } from 'utils/function.utils';
import styles from './images.module.scss';
const ImagesForm = (props) => {
  const { data } = props;
  const [form] = Form.useForm();
  const dragFileRef = useRef();
  const [urlVideo, setUrlVideo] = useState();
  const [urlImages, setUrlImages] = useState([]);
  const [privacyImages, setPrivacyImages] = useState([]);
  const [coverImage, setCoverImage] = useState([]);

  useEffect(() => {
    if (data) {
      getDetail(data);
    }
  }, [data]);
  const getDetail = async (data) => {
    const images = formatPathToListFile(data?.images, 'images');
    const privacyImages = formatPathToListFile(data?.privacyImages, 'privacy');
    const coverImage = formatPathToListFile([data?.coverImage], 'coverImage');

    setUrlVideo(data?.video);
    setUrlImages(images);
    setPrivacyImages(privacyImages);
    setCoverImage(coverImage);
    form.setFieldsValue({ video: data?.video, images, privacyImages, coverImage });
  };

  const onFinish = async () => {
    showLoading();
    const params = {
      images: urlImages.map((i) => i.name),
      privacyImages: privacyImages.map((i) => i.name),
      video: urlVideo ?? '',
      coverImage: coverImage[0]?.name,
    };

    const res = await new postsApi().editPosts({ id: data?._id, params });
    if (res?.data?.success) {
      notification.success({ message: 'Chỉnh sửa thành công' });
    }
    hideLoading();
  };

  const customRequestVideos = (e) => {
    dragFileRef.current.hiddenUpload('none');
  };
  const onChangeVideo = async ({ fileList }) => {
    const res = await getUrlFile(fileList);
    if (res) {
      setUrlVideo(res[0]);
    }
  };

  const onRemoveItemFile = (callback, file) => {
    callback();
    const newListFiles = urlImages?.filter((i) => i.uid !== file.uid);
    setUrlImages(newListFiles);
    if (newListFiles?.length === 0) {
      form.setFieldValue('images', null);
    }
  };
  const itemRender = (_, file, files, { remove }) => {
    return <ItemFileImage file={file} onClick={() => onRemoveItemFile(remove, file)} />;
  };
  const onRemoveItemFilePrivacy = (_, file) => {
    const newListFiles = privacyImages?.filter((i) => i.uid !== file.uid);
    setPrivacyImages(newListFiles);
    if (newListFiles?.length === 0) {
      form.setFieldValue('privacyImages', null);
    }
  };
  const itemRenderPrivacy = (_, file, files, { remove }) => {
    return <ItemFileImage file={file} onClick={() => onRemoveItemFilePrivacy(remove, file)} />;
  };

  const customRequestFiles = async () => {};
  const onChangeFile = async ({ file, fileList }) => {
    if (file?.status === 'removed') return;

    showLoading();
    const formatRes = await handleFile(file, fileList);
    setUrlImages([...formatRes, ...urlImages]);
    hideLoading();
  };

  const handleFile = async (file, fileList) => {
    const newFiles = fileList?.length > 0 ? fileList?.filter((i) => i.lastModified) : [];

    if (newFiles?.length > 0) {
      const res = await getUrlFile(newFiles);
      if (res) {
        const formatRes = formatPathToListFile(res);
        return formatRes;
      }
    }
  };
  const onChangeFilePrivate = async ({ file, fileList }) => {
    if (file?.status === 'removed') return;

    showLoading();
    const formatRes = await handleFile(file, fileList);
    setPrivacyImages([...formatRes, ...privacyImages]);
    hideLoading();
  };

  const onRemoveVideo = () => {
    setUrlVideo('');
    form.setFieldValue('video', null);
  };

  const onRemoveAvatar = (_, file) => {
    const newListFiles = coverImage?.filter((i) => i.uid !== file.uid);
    setCoverImage(newListFiles);
    if (newListFiles?.length === 0) {
      form.setFieldValue('coverImage', null);
    }
  };
  const itemRenderAvatar = (_, file, files, { remove }) => {
    return <ItemFileImage file={file} onClick={() => onRemoveAvatar(remove, file)} />;
  };

  const customRequestAvatar = () => {};

  const onChangeAvatar = async ({ file, fileList }) => {
    if (file?.status === 'removed') return;

    showLoading();
    const formatRes = await handleFile(file, fileList);

    console.log(formatRes, 'formatRes');
    setCoverImage(formatRes);
    hideLoading();
  };

  return (
    <Row className={styles.editGirl}>
      <Form form={form} onFinish={onFinish} className={styles.form}>
        <Form.Item
          className={clsx(styles.rowSearch, styles.files)}
          name='coverImage'
          rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện' }]}
        >
          <UploadFile
            itemRender={itemRenderAvatar}
            customRequest={customRequestAvatar}
            label='Ảnh đại diện'
            multiple={true}
            require
            onChange={debounce(onChangeAvatar, 100)}
            fileList={coverImage}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />} className={styles.btnUpload}>
              Chọn ảnh đại diện{' '}
            </Button>
          </UploadFile>
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
            fileList={urlImages}
          >
            <Button icon={<UploadOutlined />} className={styles.btnUpload}>
              Chọn ảnh công khai tải lên <span className={styles.code}>(MÃ ẢNH CÔNG KHAI:{data?.publicCode} )</span>
            </Button>
          </UploadFile>
        </Form.Item>
        <Form.Item
          className={clsx(styles.rowSearch, styles.files)}
          name='privacyImages'
          rules={[{ required: true, message: 'Vui lòng chọn ảnh bảo mật' }]}
        >
          <UploadFile
            itemRender={itemRenderPrivacy}
            customRequest={customRequestFiles}
            label='Danh sách ảnh bảo mật'
            multiple={true}
            require
            onChange={debounce(onChangeFilePrivate, 100)}
            fileList={privacyImages}
          >
            <Button icon={<UploadOutlined />} className={styles.btnUpload}>
              Chọn ảnh bảo mật tải lên <span className={styles.code}>(MÃ ẢNH BẢO MẬT:{data?.privateCode} )</span>
            </Button>
          </UploadFile>
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='video'>
          {!urlVideo ? (
            <DragFile
              customRequest={customRequestVideos}
              accept={
                'video/x-msvideo,video/mp4,video/x-ms-wmv,video/x-matroska,video/x-flv, image/gif,video/quicktime'
              }
              itemRender={() => <></>}
              ref={dragFileRef}
              maxCount={1}
              onChange={debounce(onChangeVideo, 100)}
              label='Video gái gọi'
            />
          ) : (
            <>
              <FormControlLabel label='Video gái gọi' />
              <Row className={styles.video}>
                <VideoReact src={formatPathToUrl(urlVideo)} />
                <Row className={styles.icon}>
                  <FontAwesomeIcon icon={faTimes} onClick={onRemoveVideo} className={styles.removeIcon} />
                </Row>
              </Row>
            </>
          )}
        </Form.Item>
        <Form.Item name='btn'>
          <Button htmlType='submit'>Lưu chỉnh sửa</Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default ImagesForm;
