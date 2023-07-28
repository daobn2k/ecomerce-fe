import { BranchesOutlined, CommentOutlined, DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { Col, Image, Row } from 'antd';
import ListTags from 'components/ListTags';
import { paths } from 'constants/paths.constants';
import { useNavigate } from 'react-router-dom';
import { formatPathToUrl } from 'utils/function.utils';
import HeaderReview from './HeaderReview';
import styles from './review-item.module.scss';

export const ReviewItem = (props) => {
  const { data, _id } = props;
  const navigate = useNavigate();
  const coverImage = data?.images[0];
  const onClickOriginPost = () => {
    navigate(`${paths.posts}/${_id}`);
  };
  return (
    <Row className={styles.rootReviewItem}>
      <HeaderReview
        createdBy={data?.createdBy}
        name={data?.createdBy?.username}
        rate={data?.reviewPoint}
        date={data?.createdAt}
        content={data?.content}
        isHiddenFollow={true}
        isShowViewCount={false}
      />
      <Row className={styles.imgGroup}>
        {coverImage ? (
          <Col span={data?.images?.length > 0 ? 16 : 24} className={styles.colLeft}>
            <Image src={formatPathToUrl(coverImage)} className={styles.imageLeft} />
          </Col>
        ) : null}
        {data?.images?.length > 0 ? (
          <Col span={8} className={styles.colRight}>
            {data?.images?.slice(1).map((item) => {
              return (
                <div
                  className={styles.imgReview}
                  style={{ height: `calc(100% / ${data?.images?.length - 1})` }}
                  key={item}
                >
                  <Image src={formatPathToUrl(item)} />
                </div>
              );
            })}
          </Col>
        ) : null}
      </Row>
      <Row>
        <ListTags title='Tags: ' data={data?.post?.tags} />
      </Row>
      <Row className={styles.rowCount}>
        <Row className={styles.rowCountLike}>
          <Row className={styles.like}>
            <LikeOutlined />
            {data?.likeCount}
          </Row>
          <Row className={styles.dislike}>
            <DislikeOutlined />
            {data?.dislikeCount}
          </Row>
        </Row>
        <Row className={styles.rowCountCommentShare}>
          <Row className={styles.comment}>
            {data?.commentCount}
            <CommentOutlined />
          </Row>
          <Row className={styles.original} onClick={onClickOriginPost}>
            Bài gốc <BranchesOutlined />
          </Row>
        </Row>
      </Row>
    </Row>
  );
};
