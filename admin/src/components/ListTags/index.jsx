import { Row, Typography } from 'antd';
import styles from './index.module.scss';

const ListTags = (props) => {
    const { data = [], titleTag = 'Tags', onClickTag } = props;

    return (
        <Row className={styles.listTags}>
            <Row className={styles.tags}>
                <Row>
                    <Typography className={styles.titleTag}>{titleTag}:</Typography>
                </Row>
                {data.map((e) => {
                    return (
                        <div key={`${e}-tags`} onClick={() => onClickTag && onClickTag(e)}>
                            <TagItem tag={e} />
                        </div>
                    );
                })}
            </Row>
        </Row>
    );
};

export default ListTags;

const TagItem = ({ tag }) => {
    return (
        <div className={styles.tagItem}>
            <Typography className={styles.txt}>{tag}</Typography>
        </div>
    );
};
