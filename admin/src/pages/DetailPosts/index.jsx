import { Button, notification, Row } from 'antd';
import clsx from 'clsx';
import { hideLoading, showLoading } from 'components/Loading';
import ModalApprove from 'components/ModalApprove';
import ModalRejectApprove from 'components/ModalRejectApprove';
import { HeaderForm } from 'pages/DetailUser';
import { useRef } from 'react';
import postsApi from 'services/subs/posts';
import TabsDetail from './components/TabsDetail';
import styles from './index.module.scss';
import { useLogicUploadGirl } from './logic';

const DetailPosts = () => {
  const { getDetail, data } = useLogicUploadGirl();

  return (
    <>
      <Row className={styles.editPost}>
        <HeaderForm title='Chi tiết GG' />
        <TabsDetail getDetail={getDetail} data={data} />
      </Row>
      {!data?.isApprove && <ApprovePost getDetail={getDetail} data={data} />}
      {data?.isApprove && <DeApprovePost getDetail={getDetail} data={data} />}
    </>
  );
};

export default DetailPosts;

const DeApprovePost = ({ data, getDetail }) => {
  const modalRef = useRef();

  const onApprove = async (values) => {
    showLoading();
    // action
    const payload = { ...values };
    const res = await new postsApi().deApprove(data?._id, payload);
    if (res?.data?.success) {
      notification.success({ message: 'Phê duyệt bài viết thành công' });
      getDetail(data?._id);
      onCancel();
    }
    hideLoading();
  };

  const showModal = () => modalRef.current.showModal();
  const onCancel = () => modalRef.current.handleCancel();

  return (
    <ModalRejectApprove onSubmit={onApprove} modalRef={modalRef} onCancel={onCancel}>
      <Button className={clsx(styles.button, styles.reject)} htmlType='button' onClick={showModal}>
        Hủy Duyệt
      </Button>
    </ModalRejectApprove>
  );
};

const ApprovePost = ({ data, getDetail }) => {
  const modalRef = useRef();

  const onApprove = async (values) => {
    showLoading();
    // action
    const payload = { ...values };
    const res = await new postsApi().approve(data?._id, payload);
    if (res?.data?.success) {
      notification.success({ message: 'Phê duyệt bài viết thành công' });
      getDetail(data?._id);
      onCancel();
    }
    hideLoading();
  };

  const showModal = () => modalRef.current.showModal();
  const onCancel = () => modalRef.current.handleCancel();

  return (
    <ModalApprove onSubmit={onApprove} modalRef={modalRef} onCancel={onCancel}>
      <Button className={styles.button} htmlType='button' onClick={showModal}>
        Đồng ý duyệt
      </Button>
    </ModalApprove>
  );
};
