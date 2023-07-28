import { BellOutlined } from '@ant-design/icons';
import { Badge, Popover, Row, Typography } from 'antd';
import { paths } from 'constants/paths.constants';
import { useNotification } from 'hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
const BellNotifications = () => {
    // effect handle notification
    return (
        <Row className={styles.root}>
            <Popover content={<InfoNotification />} title="Thông báo" trigger={['click']}>
                <Badge size="small" count={5} style={{ color: 'white' }}>
                    <BellOutlined size={24} style={{ fontSize: 20 }} />
                </Badge>
            </Popover>
        </Row>
    );
};

export default BellNotifications;

const InfoNotification = () => {
    const navigate = useNavigate();
    const viewAll = () => navigate(paths.notification);
    const { data } = useNotification();
    return (
        <Row className={styles.list}>
            {data?.map((ele) => {
                return (
                    <Row className={styles.item}>
                        <Typography className={styles.text}>{ele?.body}</Typography>
                    </Row>
                );
            })}
            <Row className={styles.viewAll} onClick={() => viewAll()}>
                {` Xem tất cả thông báo `}
            </Row>
        </Row>
    );
};
