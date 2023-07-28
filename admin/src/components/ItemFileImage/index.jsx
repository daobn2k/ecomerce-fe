import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Row } from 'antd';
import styles from './index.module.scss';
const ItemFileImage = ({ file, onClick }) => {
  return (
    <Row className={styles.itemFileImage}>
      <Row className={styles.infoImage}>
        <Image src={file?.url} alt='' />
        {onClick && (
          <Row className={styles.icon} onClick={onClick}>
            <FontAwesomeIcon icon={faTimes} className={styles.removeIcon} />
          </Row>
        )}
      </Row>
    </Row>
  );
};

export default ItemFileImage;
