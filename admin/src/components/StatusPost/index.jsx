import { Tag } from 'antd';
import { postStatus } from 'constants/value.constants';

const StatusPost = ({ status }) => {
  if (status === postStatus.active) return <Tag color='#fa541c'>Đang hoạt động</Tag>;
  if (status === postStatus.busy) return <Tag color='#87d068'>Đang bận</Tag>;
  if (status === postStatus.expired) return <Tag color='#a8071a'>Đã hết hạn</Tag>;
  if (status === postStatus.lock) return <Tag color='#a8071a'>Đã khóa</Tag>;
};
export default StatusPost;
