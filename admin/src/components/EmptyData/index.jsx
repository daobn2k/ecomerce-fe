import { Empty, Row } from 'antd';

const EmptyData = (props) => {
    return (
        <Row
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Empty {...props} />
        </Row>
    );
};

export default EmptyData;
