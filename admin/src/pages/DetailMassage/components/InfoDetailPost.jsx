import { Form, notification, Row } from 'antd';
import SelectDistrictCreate from 'components/common/SelectDistrictCreate';
import InputText from 'components/InputText';
import InputTextarea from 'components/InputTextArea';
import SelectSearchInput from 'components/SelectSearchInput';
import { listOrigin, statusPosts } from 'constants/value.constants';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import massageApi from 'services/subs/massage';
import postsApi from 'services/subs/posts';
import styles from './info-detail.module.scss';

const InfoDetailPost = (props) => {
  const { data } = props;
  const { id } = useParams();
  const [form] = Form.useForm();
  const provinces = useSelector((state) => state?.resourceReducer?.provinces) || [];
  const onChangeProvince = () => {
    form.setFieldValue('locationDistrict', null);
  };

  const onValuesChange = async (value, values) => {
    const name = Object.getOwnPropertyNames(value)[0];
    let data = { ...value };

    const res = await new massageApi().edit({ id, params: data });

    if (res?.data?.success) {
      notification.success({ message: 'Chỉnh sửa massage thành công' });
    } else {
      notification.error({ message: 'Chỉnh sửa massage thất bại' });
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
          <Form.Item className={styles.rowSearch} name='price' rules={[{ required: true, message: 'nhập giá' }]}>
            <InputText label='Giá' placeholder='Nhập giá' require />
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
          <Form.Item className={styles.rowSearch} name='services' rules={[{ required: true, message: 'Nhập dịch vụ' }]}>
            <SelectSearchInput label='Dịch vụ' mode='tags' require placeholder='Hãy thêm một hoặc nhiều dịch vụ nữa' />
          </Form.Item>
        </Row>
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
