import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rate, Row, Typography } from 'antd';
import AvatarUser from 'components/AvatarUser';
import ListTags from 'components/ListTags';
import { paths } from 'constants/paths.constants';
import { useNavigate } from 'react-router-dom';
import { checkTimeNews, formatContentTextArea } from 'utils/function.utils';
import styles from './header.module.scss';

const HeaderReview = (props) => {
  const { rate, name, date, content, tags, viewCount, followers, createdBy, isShowViewCount = true } = props;

  const navigate = useNavigate();
  const onShowDetailUser = () => navigate(`${paths.user}/${createdBy?._id}`);

  const onClickTag = (e) => {
    navigate({
      pathname: paths.girls,
      search: `?tag=${e}`,
    });
  };
  return (
    <Row className={styles.headerReview}>
      <Row className={styles.headerReviewTop}>
        <AvatarUser size={48} name={createdBy?.username} fontSize={24} />
        <div className={styles.divInfo}>
          <div className={styles.topInfo}>
            <Typography.Text className={styles.name} onClick={onShowDetailUser}>
              {name}
            </Typography.Text>
            {date && (
              <>
                <Typography.Text> • </Typography.Text>
                <Typography.Text className={styles.date}>{checkTimeNews(date)}</Typography.Text>
              </>
            )}
          </div>
          {(rate || rate === 0) && <Rate value={rate} style={{ color: 'red' }} disabled={true} />}
          {followers && (
            <Typography className={styles.follow}>
              <span>{followers}</span> &nbsp;Người theo dõi
            </Typography>
          )}
          <>
            {isShowViewCount && (
              <Typography.Text className={styles.viewCount}>
                <FontAwesomeIcon icon={faEye} />
                {viewCount}
              </Typography.Text>
            )}
          </>
        </div>
      </Row>
      <div dangerouslySetInnerHTML={{ __html: formatContentTextArea(content) }} className={styles.content}></div>
      {tags && <ListTags data={tags} onClickTag={onClickTag} />}
    </Row>
  );
};

export default HeaderReview;
