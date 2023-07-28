import { Avatar } from 'antd';
import clsx from 'clsx';
import { useMemo } from 'react';
import { checkColorByName } from 'utils/function.utils';
import { getUserProfile } from 'utils/storage.ultils';
import styles from './index.module.scss';
const AvatarUser = (props) => {
  const { src, shape, className, name = '', fontSize } = props;

  const user = getUserProfile();
  const letter = useMemo(() => {
    return name ? name?.charAt(0) : user?.username && user?.username?.charAt(0);
  }, [name, user]);

  const color = useMemo(() => {
    return checkColorByName(letter ?? '');
  }, [letter]);

  return (
    <Avatar
      {...props}
      className={clsx('avatar', styles.avatarUser, { [className]: !!className })}
      shape={shape ?? 'rounded'}
      src={src ? src : undefined}
      style={{ backgroundColor: color, fontSize }}
    >
      {letter}
    </Avatar>
  );
};

export default AvatarUser;
