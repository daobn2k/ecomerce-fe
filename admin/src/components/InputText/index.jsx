import Input from 'antd/lib/input/Input';
import Password from 'antd/lib/input/Password';
import clsx from 'clsx';
import FormControlLabel from 'components/FormControlLabel';
import styles from './index.module.scss';

const InputText = (props) => {
  const {
    className = '',
    placeholder = '',
    suffix = null,
    prefix = null,
    allowClear = false,
    require,
    ...rest
  } = props;

  return (
    <div>
      <FormControlLabel {...props}>
        <Input
          className={clsx({
            [styles.inputText]: !suffix && !prefix,
            [styles.hasIcon]: !!suffix || !!prefix,
            [className]: !!className,
          })}
          placeholder={placeholder}
          suffix={suffix}
          prefix={prefix}
          allowClear={allowClear}
          {...rest}
        />
      </FormControlLabel>
    </div>
  );
};

InputText.displayName = 'InputText';

export default InputText;

export const PasswordInput = (props) => {
  const {
    className = '',
    placeholder = '',
    suffix = null,
    prefix = null,
    allowClear = false,
    label,
    require,
    ...rest
  } = props;

  return (
    <FormControlLabel {...props}>
      <Password
        className={clsx({
          [styles.inputText]: !suffix && !prefix,
          [styles.hasIcon]: !!suffix || !!prefix,
          [className]: !!className,
        })}
        placeholder={placeholder}
        suffix={suffix}
        prefix={prefix}
        allowClear={allowClear}
        {...rest}
      />
    </FormControlLabel>
  );
};
