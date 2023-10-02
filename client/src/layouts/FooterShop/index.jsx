import { FacebookOutlined, PhoneOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import clsx from 'clsx';
import styles from './footer.module.scss';
const FooterShop = () => {
  return (
    <div className={clsx(styles.footerContainer)}>
      <div className={clsx(styles.rowTitleFooter)}>
        <Typography className={styles.titleFooter}>HỖ TRỢ - CHÍNH SÁCH MUA HÀNG</Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ maxWidth: 1200, width: '100%' }}>
          <Col span={6}>
            <ListItemFooter
              data={[{ label: 'Phương thức thanh toán' }, { label: 'Chính sách giao hàng' }]}
              title='Hỗ trợ khách hàng'
            />
          </Col>
          <Col span={6}>
            <ListItemFooter
              data={[
                { label: 'Chính sách đổi hàng' },
                { label: 'Chính sách trả hàng' },
                { label: 'Chính sách thanh toán' },
              ]}
              title='Chính sách Mua hàng
            '
            />
          </Col>
          <Col span={6}>
            <ListItemFooter
              data={[
                { label: 'Thông tin liên hệ' },
                { label: 'Hệ thống cửa hàng' },
                { label: 'Giới thiệu' },
                { label: 'Tuyển dụng' },
                { label: 'Tin tức' },
              ]}
              title='Địa chỉ cửa hàng - Liên hệ'
            />
          </Col>
          <Col span={6}>
            <ListItemFooter
              data={[
                { label: 'Địa Chỉ Cửa Hàng', icon: <UsergroupAddOutlined /> },
                { label: '0942858890', icon: <PhoneOutlined /> },
                { label: 'Yang Boutique Việt Nam', icon: <FacebookOutlined /> },
              ]}
              title='Cộng đồng'
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FooterShop;

const ListItemFooter = ({ data = [], title = '' }) => {
  return (
    <>
      <Typography className={styles.titleListItem}>{title}</Typography>
      <div className={styles.listItemFooter}>
        {data?.length &&
          data.map((ele, key) => {
            return (
              <div className={styles.itemFooter} key={key + ele.label}>
                {ele?.icon && <div className={styles.itemIcon}>{ele?.icon}</div>}
                <Typography className={styles.itemLabel}>{ele?.label}</Typography>
              </div>
            );
          })}
      </div>
    </>
  );
};
