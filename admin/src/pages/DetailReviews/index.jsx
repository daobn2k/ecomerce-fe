import { Button, notification, Row } from 'antd';
import clsx from 'clsx';
import { hideLoading, showLoading } from 'components/Loading';
import ModalApprove from 'components/ModalApprove';
import ModalRejectApprove from 'components/ModalRejectApprove';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import reviewApi from 'services/subs/review';
import { ReviewItem } from './components/ReviewItem';
import styles from './index.module.scss';
const DetailReviews = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);
  const getDetail = async (id) => {
    showLoading(true);
    const res = await new reviewApi().getDetailReviews(id);
    if (res?.data?.success) {
      setData(res?.data?.data);
    }
    hideLoading(false);
  };
  return (
    <Row className={styles.root}>
      <ReviewItem {...data} />
      {!data?.data?.status && <ApprovePost getDetail={getDetail} data={data} />}
      {data?.data?.status && <DeApprovePost getDetail={getDetail} data={data} />}
    </Row>
  );
};
export default DetailReviews;

const DeApprovePost = ({ data, getDetail }) => {
  const modalRef = useRef();

  const showModal = () => modalRef.current.showModal();
  const onCancel = () => modalRef.current.handleCancel();

  const onApprove = async () => {
    const res = await new reviewApi().changeStatus(data?.data?._id, { status: false });
    if (res?.data?.success) {
      getDetail(data?.data?._id);
      notification.success({ message: 'Hủy duyệt đánh giá thành công' });
      onCancel();
    }
  };

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
  const showModal = () => modalRef.current.showModal();
  const onCancel = () => modalRef.current.handleCancel();

  const onApprove = async () => {
    const res = await new reviewApi().changeStatus(data?.data?._id, { status: true });
    if (res?.data?.success) {
      getDetail(data?.data?._id);
      notification.success({ message: 'Phê duyệt đánh giá thành công' });
      onCancel();
    }
  };

  return (
    <ModalApprove onSubmit={onApprove} modalRef={modalRef} onCancel={onCancel}>
      <Button className={styles.button} htmlType='button' onClick={showModal}>
        Đồng ý duyệt
      </Button>
    </ModalApprove>
  );
};
