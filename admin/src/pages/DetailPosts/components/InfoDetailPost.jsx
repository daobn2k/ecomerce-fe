import { Form, notification, Row } from 'antd';
import clsx from 'clsx';
import SelectDistrictCreate from 'components/common/SelectDistrictCreate';
import DatePickerCustomize from 'components/DatePicker';
import InputText from 'components/InputText';
import InputTextarea from 'components/InputTextArea';
import SelectSearchInput from 'components/SelectSearchInput';
import { listOrigin, statusPosts } from 'constants/value.constants';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import postsApi from 'services/subs/posts';
import styles from './info-detail.module.scss';

const InfoDetailPost = (props) => {
  const { data } = props;
  const { id } = useParams();
  const [form] = Form.useForm();
  const services = useSelector((state) => state?.resourceReducer?.services) || [];
  const provinces = useSelector((state) => state?.resourceReducer?.provinces) || [];
  const onChangeProvince = () => {
    form.setFieldValue('locationDistrict', null);
  };

  const onValuesChange = async (value, values) => {
    const name = Object.getOwnPropertyNames(value)[0];
    let data = { ...value };

    if (name === 'yearOfBirth') {
      data = { [name]: +value[name].format('YYYY') };
    }
    if (['height', 'weight', 'price'].includes(name)) {
      data = { [name]: +value[name] };
    }
    if (name === 'body1') {
      data = { body: `${value[name]}-${values['body2']}-${values['body-3']}` };
    }
    if (name === 'body2') {
      data = { body: `${values['body1']}-${value[name]}-${values['body-3']}` };
    }
    if (name === 'body3') {
      data = { body: `${values['body1']}-${values['body2']}-${value[name]}` };
    }
    const res = await new postsApi().editPosts({ id, params: data });

    if (res?.data?.success) {
      notification.success({ message: 'Chỉnh sửa gái gọi thành công' });
    } else {
      notification.error({ message: 'Chỉnh sửa gái gọi thất bại' });
    }
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);
  return (
    <Row className={styles.infoDetail}>
      <Form className={styles.form} form={form} onValuesChange={debounce(onValuesChange, 500)} name='form-info'>
        <Row className={styles.itemForm}>
          <Form.Item
            className={styles.rowSearch}
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
          >
            <InputText label='Tên' require={true} placeholder='Nhập tên' />
          </Form.Item>
          <Form.Item
            className={styles.rowSearch}
            name='title'
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <InputText label='Tiêu đề' require={true} placeholder='Nhập tiêu đề' />
          </Form.Item>
          <Form.Item
            className={styles.rowSearch}
            name='yearOfBirth'
            rules={[{ required: true, message: 'Chọn năm sinh' }]}
          >
            <DatePickerCustomize label='Năm sinh' require picker='year' placeholder='Chọn năm sinh' />
          </Form.Item>
          <Form.Item
            className={styles.rowSearch}
            name='status'
            rules={[{ required: true, message: 'Chọn trạng thái hoạt động' }]}
          >
            <SelectSearchInput
              label='Trạng thái hoạt động'
              options={statusPosts}
              placeholder='Vui lòng chọn trạng thái hoạt động'
              require
            />
          </Form.Item>
          <Form.Item className={styles.rowSearch} name='born' rules={[{ required: true, message: 'Chọn xuất xứ' }]}>
            <SelectSearchInput label='Xuất xứ' options={listOrigin} placeholder='Vui lòng chọn xuất xứ' require />
          </Form.Item>
          <Form.Item className={styles.rowSearch} name='height' rules={[{ required: true, message: 'Chọn chiều cao' }]}>
            <InputText label='Chiều cao' placeholder='Nhập chiều cao' type='number' require />
          </Form.Item>
          <Form.Item className={styles.rowSearch} name='weight' rules={[{ required: true, message: 'Chọn cân nặng' }]}>
            <InputText label='Cân nặng' placeholder='Nhập cân nặng' type='number' require />
          </Form.Item>

          <Form.Item
            className={styles.rowSearch}
            name='locationProvince'
            rules={[{ required: true, message: 'Chọn thành phố' }]}
          >
            <SelectSearchInput
              label='Tỉnh / Thành phố'
              options={provinces}
              placeholder='Vui lòng chọn tỉnh / thành phố '
              require
              onChange={onChangeProvince}
            />
          </Form.Item>
          <Form.Item className={styles.rowSearch} dependencies={['locationProvince']} noStyle>
            {(props) => {
              const province = props.getFieldValue('locationProvince');
              if (!province) return;
              return (
                <Form.Item
                  className={styles.rowSearch}
                  name='locationDistrict'
                  rules={[{ required: true, message: 'Chọn quận huyện' }]}
                >
                  <SelectDistrictCreate
                    label='Quận / huyện'
                    province={province}
                    placeholder='Vui lòng chọn quận / huyện'
                    require
                    disabled={!province}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>

          <Form.Item className={styles.rowSearch} name='address'>
            <InputText label='Địa chỉ' placeholder='Nhập địa chỉ' />
          </Form.Item>
          <Form.Item className={styles.rowSearch} name='price' rules={[{ required: true, message: 'Chọn giá' }]}>
            <InputText label='Giá' placeholder='Nhập giá' type='number' require />
          </Form.Item>
          <Form.Item
            className={styles.rowSearch}
            name='phone'
            rules={[{ required: true, message: 'Chọn số điện thoại' }]}
          >
            <InputText label='Số điện thoại' placeholder='Nhập số điện thoại' type='tel' require />
          </Form.Item>
          <Form.Item className={styles.rowSearch} name='pass'>
            <InputText label='Pass' placeholder='Nhập pass' />
          </Form.Item>
          <Form.Item className={styles.rowSearch} name='workTime'>
            <InputText label='Làm việc' placeholder='Nhập giờ làm việc' />
          </Form.Item>
          <Form.Item className={styles.rowSearch} name='services' rules={[{ required: true, message: 'Chọn dịch vụ' }]}>
            <SelectSearchInput
              label='Dịch vụ'
              options={services || []}
              placeholder='Vui lòng chọn dịch vụ'
              mode='multiple'
              require
            />
          </Form.Item>
        </Row>
        <Row className={clsx(styles.itemForm, styles.itemFormBody)}>
          <Form.Item
            className={styles.rowSearch}
            name='body1'
            rules={[{ required: true, message: 'Nhập số đo vòng 1' }]}
          >
            <InputText label='Vòng 1' placeholder='Nhập số đo vòng 1' type='tel' require />
          </Form.Item>
          <Form.Item
            className={styles.rowSearch}
            name='body2'
            rules={[{ required: true, message: 'Nhập số đo vòng 2' }]}
          >
            <InputText label='Vòng 2' placeholder='Nhập số đo vòng 2' type='tel' require />
          </Form.Item>
          <Form.Item
            className={styles.rowSearch}
            name='body3'
            rules={[{ required: true, message: 'Nhập số đo vòng 3' }]}
          >
            <InputText label='Vòng 3' placeholder='Nhập số đo vòng 3' type='tel' require />
          </Form.Item>
        </Row>
        {/* tags , mô tả */}
        <Form.Item
          className={styles.rowSearch}
          name='content'
          rules={[
            { required: true, message: 'Vui lòng nhập giới thiệu' },
            { min: 20, message: 'Vui lòng nhập giới thiệu trên 20 ký tự' },
          ]}
        >
          <InputTextarea label='Mô tả' require={true} placeholder='Nhập mô tả' />
        </Form.Item>
        <Form.Item
          className={styles.rowSearch}
          name='tags'
          rules={[
            {
              required: true,
              message: 'Hãy thêm một hoặc nhiều tags nữa, dùng dấu phẩy để tách!',
            },
          ]}
        >
          <SelectSearchInput label='Tags' mode='tags' require={true} placeholder='Hãy thêm một hoặc nhiều tags nữa' />
        </Form.Item>
      </Form>
    </Row>
  );
};

export default InfoDetailPost;
