import { Tag } from 'antd';

const StatusTag = ({ status }) => {
  if (status === 0) return <Tag color='#fa541c'>Chưa xác minh</Tag>;
  if (status === 1) return <Tag color='#87d068'>Đã xác minh</Tag>;
  if (status === 2) return <Tag color='#a8071a'>Đã Hủy</Tag>;
};
export default StatusTag;
