import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { paths } from '../constants/paths.constants';

const UnAuthorizedPage = () => {
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={<ButtonBackHome />}
    />
  );
};

export default UnAuthorizedPage;

export const ButtonBackHome = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(paths.home);
  };
  return (
    <Button type='primary' onClick={onClick}>
      Back Home
    </Button>
  );
};
