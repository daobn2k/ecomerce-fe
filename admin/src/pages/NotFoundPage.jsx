import { Result } from 'antd';
import { ButtonBackHome } from './UnAuthorizedPage';

const NotFoundPage = () => {
  return (
    <Result status='404' title='404' subTitle='Xin lỗi, trang bạn truy cập không tồn tại.' extra={<ButtonBackHome />} />
  );
};

export default NotFoundPage;
