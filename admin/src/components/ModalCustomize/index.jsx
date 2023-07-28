import { Button, Modal } from 'antd';
import clsx from 'clsx';
import { forwardRef, useImperativeHandle, useState } from 'react';
import './index.scss';
const ModalCustomize = (props, ref) => {
  const { children, content, title, isDelete, onSubmit, isHiddenFooter, ...rest } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);

  const showModal = (item) => {
    setIsModalOpen(true);
    setData(item);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setData(null);
  };

  useImperativeHandle(ref, () => ({ handleCancel, showModal }), []);
  return (
    <>
      {children}
      <Modal
        title={title}
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        {...rest}
        className={clsx('modal-custom', { 'modal-delete': isDelete })}
        footer={
          !isHiddenFooter && (
            <>
              <Button className='modal-btn_cancel' onClick={handleCancel} htmlType='button'>
                Cancel
              </Button>
              <Button className='modal-btn_oke' onClick={() => onSubmit(data)} htmlType='button'>
                Đồng ý
              </Button>
            </>
          )
        }
      >
        {content}
      </Modal>
    </>
  );
};
export default forwardRef(ModalCustomize);
