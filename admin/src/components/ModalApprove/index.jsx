import { Button, Form, Row } from 'antd';
import InputTextarea from 'components/InputTextArea';
import ModalCustomize from 'components/ModalCustomize';

const ModalApprove = ({ modalRef, onSubmit, children, onCancel }) => {
  return (
    <ModalCustomize
      title='Đồng ý phê duyệt'
      content={<ContentModalApprove onSubmit={onSubmit} onCancel={onCancel} />}
      ref={modalRef}
      isHiddenFooter
    >
      {children}
    </ModalCustomize>
  );
};

export default ModalApprove;

export const ContentModalApprove = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const actionCancel = () => {
    onCancel && onCancel();
    form.resetFields();
  };
  return (
    <Form name='approve-modal' form={form} onFinish={onSubmit}>
      <Form.Item name='note'>
        <InputTextarea label='Ghi chú' placeholder='Nhập chi chú' />
      </Form.Item>
      <Form.Item name='btn'>
        <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <Button type='primary' htmlType='submit'>
            Đồng ý
          </Button>
          <Button onClick={actionCancel} htmlType='button'>
            Hủy
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};
