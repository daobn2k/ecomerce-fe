import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Row } from 'antd';
import styles from './index.module.scss';

export const ActionTable = ({ onEdit, onRemove }) => {
  return (
    <Row className={styles.action}>
      <EditOutlined onClick={onEdit} />
      <Popconfirm
        title='Xóa bản ghi'
        description='Bạn có chắc muốn xóa bản ghi này?'
        onConfirm={onRemove}
        onCancel={() => {}}
        okText='Đồng ý'
        cancelText='Hủy'
      >
        <DeleteOutlined />
      </Popconfirm>
    </Row>
  );
};
