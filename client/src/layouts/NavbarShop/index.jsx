import { Row } from 'antd';
import MenuBar from './MenuBar';
import TopBar from './TopBar';

const NavbarShop = () => {
  return (
    <Row>
      <TopBar />
      <MenuBar />
    </Row>
  );
};

export default NavbarShop;
