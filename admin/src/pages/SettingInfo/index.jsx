import { Row, Tabs } from 'antd';
import { HeaderForm } from 'components/HeaderForm';
import { useState } from 'react';
import EditCategories from './components/EditCategories';
import EditContentFooter from './components/EditContentFooter';
import EditExchangeRate from './components/EditExchangeRate';
import EditExchangeRateMassage from './components/EditExchangeRateMassage';
import EditPrivacy from './components/EditPrivacy';
import EditRateExtend from './components/EditRateExtend';
import EditServices from './components/EditServices';
import EditTelegramLink from './components/EditTelegramLink';
import styles from './index.module.scss';
const SettingInfo = () => {
  const [activeKey, setActiveKey] = useState('1');
  const onChangeTab = (e) => {
    setActiveKey(e);
  };

  const items = [
    {
      key: '1',
      label: `Cấu hình tỉ giá gái gọi`,
      children: <EditRateExtend />,
    },
    {
      key: '2',
      label: `Cấu hình tỉ giá`,
      children: <EditExchangeRate />,
    },
    {
      key: '3',
      label: `Cấu hình giá gia hạn massage`,
      children: <EditExchangeRateMassage />,
    },
    {
      key: '4',
      label: `Phân loại`,
      children: <EditCategories />,
    },
    {
      key: '5',
      label: `Dịch vụ`,
      children: <EditServices />,
    },
    {
      key: '6',
      label: `Thư nội bộ`,
      children: <EditTelegramLink />,
    },
    {
      key: '7',
      label: `Quy định`,
      children: <EditPrivacy />,
    },
    {
      key: '8',
      label: `Nội dung cuối trang`,
      children: <EditContentFooter />,
    },
  ];
  return (
    <Row className={styles.root}>
      <HeaderForm title='Cài đặt thông tin chung' />
      <Tabs items={items} onChange={onChangeTab} activeKey={activeKey} />
    </Row>
  );
};

export default SettingInfo;
