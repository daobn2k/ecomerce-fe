import { DatePicker } from 'antd';
import FormControlLabel from 'components/FormControlLabel';
import styles from './index.module.scss';
const DatePickerCustomize = (props) => {
  const { label, require, suffix, prefix, ...rest } = props;
  return (
    <FormControlLabel {...props}>
      <DatePicker {...rest} className={styles.date} />
    </FormControlLabel>
  );
};
export default DatePickerCustomize;
