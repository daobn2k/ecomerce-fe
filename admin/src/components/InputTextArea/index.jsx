import { Input } from 'antd';
import classNames from 'classnames';
import FormControlLabel from 'components/FormControlLabel';
import styles from './index.module.scss';

const InputTextarea = (props) => {
  const { className = '', placeholder = '', showCount, require, ...rest } = props;
  return (
    <>
      <FormControlLabel {...props}>
        <Input.TextArea
          className={classNames(styles.inputTextarea, {
            [className]: !!className,
          })}
          showCount={showCount}
          placeholder={placeholder}
          {...rest}
        />
      </FormControlLabel>
    </>
  );
};

InputTextarea.displayName = 'InputTextarea';

export default InputTextarea;
