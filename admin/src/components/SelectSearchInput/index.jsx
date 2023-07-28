import { Select } from 'antd';
import EmptyData from 'components/EmptyData';
import FormControlLabel from 'components/FormControlLabel';
import styles from './index.module.scss';
const SelectSearchInput = (props) => {
  const { placeholder, options = [], label, suffix, require, prefix, textEmpty = '', ...rest } = props;
  return (
    <>
      <FormControlLabel {...props}>
        <Select
          className={styles.select}
          showSearch
          placeholder={placeholder}
          optionFilterProp='children'
          // filterOption={(input, option) =>
          //   option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
          //   option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          // }
          allowClear
          notFoundContent={<EmptyData description={textEmpty || 'Không có dữ liệu'} />}
          {...rest}
        >
          {' '}
          {options.map((option) => (
            <Select.Option key={option.id}>{option?.label}</Select.Option>
          ))}
        </Select>
      </FormControlLabel>
    </>
  );
};

export default SelectSearchInput;
