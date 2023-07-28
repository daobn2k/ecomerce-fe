const { Tabs } = require('antd');
const { default: ImageForm } = require('./ImagesForm');
const { default: InfoDetailPost } = require('./InfoDetailPost');

const TabsDetail = (props) => {
  const items = [
    {
      key: '1',
      label: `Thông tin massage`,
      children: <InfoDetailPost {...props} />,
    },
    {
      key: '2',
      label: `Thông tin ảnh và video massage`,
      children: <ImageForm {...props} />,
    },
  ];
  return <Tabs defaultActiveKey='1' items={items} />;
};

export default TabsDetail;
