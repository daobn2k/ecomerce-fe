import { Row, Spin, Typography } from 'antd';
import ModalCustomize from 'components/ModalCustomize/index.jsx';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import loadingManager from './LoadingManager.js';

const TIME_OUT = 1 * 60 * 1000;

export function showLoading(textLoading) {
  const ref = loadingManager.getDefault();
  if (ref) {
    ref?.current?.showLoading(textLoading);
  }
}

export function updateTextLoading(textLoading) {
  const ref = loadingManager.getDefault();
  if (ref) {
    ref?.current?.updateTextLoading(textLoading);
  }
}

export function hideLoading() {
  const ref = loadingManager.getDefault();
  if (ref) {
    ref?.current?.hideLoading();
  }
}

const Loading = forwardRef((props, ref) => {
  const timeOutRef = useRef(null);
  const modalRef = useRef(null);

  const [textLoading, setTextLoading] = useState('');

  React.useImperativeHandle(ref, () => ({
    hideLoading: hideLoadingParents,
    showLoading: showLoadingParents,
    updateTextLoading: updateTextLoadingParents,
  }));

  useEffect(() => {
    return () => {
      clearTimeout(timeOutRef.current);
    };
  }, []);

  const hideLoadingParents = () => {
    clearTimeout(timeOutRef.current);
    modalRef.current.handleCancel();
  };

  const showLoadingParents = (text) => {
    modalRef.current.handleCancel();
    timeOutRef.current = setTimeout(() => {
      modalRef.current.handleCancel();
    }, TIME_OUT);

    modalRef.current.showModal();
    setTextLoading(text ?? '');
  };

  const updateTextLoadingParents = (text) => {
    setTextLoading(text);
  };

  return (
    <ModalCustomize
      ref={modalRef}
      footer={null}
      isHiddenFooter
      content={
        <Row
          style={{
            display: 'flex',
            height: 150,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Spin />
          <Typography>{textLoading || 'Vui lòng chờ trong giây lát'}</Typography>
        </Row>
      }
    />
  );
});

export default Loading;
