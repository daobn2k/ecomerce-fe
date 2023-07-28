import { Mentions } from 'antd';
import clsx from 'clsx';
import styles from './index.module.scss';
const MentionsCustom = (props) => {
    const { rows, options = [], placeholder, className } = props;
    return (
        <Mentions
            rows={rows}
            placeholder={placeholder}
            options={options}
            className={clsx(styles.mentions, { [className]: !!className })}
            {...props}
        />
    );
};

export default MentionsCustom;
