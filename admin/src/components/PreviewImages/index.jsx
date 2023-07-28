import { Col, Row } from 'antd';
import { formatPathToUrl } from 'utils/function.utils';
import styles from './index.module.scss';
const PreviewImage = ({ data }) => {
  return (
    <Row className={styles.filePreview} gutter={[16, { xs: 16, sm: 16, md: 24, lg: 32 }]}>
      {Array.isArray(data) && data?.length > 0
        ? data.map((item) => {
            return (
              <Col xs={24} sm={12} lg={8} xl={6}>
                <img alt='' src={formatPathToUrl(item)} style={{ borderRadius: 8, height: 300, width: '100%' }} />
              </Col>
            );
          })
        : null}
    </Row>
  );
};

export default PreviewImage;
