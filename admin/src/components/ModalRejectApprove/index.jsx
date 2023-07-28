import { ContentModalApprove } from 'components/ModalApprove';
import ModalCustomize from 'components/ModalCustomize';

const ModalRejectApprove = ({ modalRef, onSubmit, children, onCancel }) => {
  return (
    <ModalCustomize
      title='Hủy phê duyệt'
      content={<ContentModalApprove onSubmit={onSubmit} onCancel={onCancel} />}
      ref={modalRef}
      isHiddenFooter
    >
      {children}
    </ModalCustomize>
  );
};

export default ModalRejectApprove;
