import { Form, Row } from 'antd';
import InputText from 'components/InputText';
import SelectSearchInput from 'components/SelectSearchInput';
import { listApprove } from 'constants/value.constants';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import userApi from 'services/subs/user';
import { formatDataUserListApi } from 'utils/function.utils';
import styles from './form-search.module.scss';

const FormSearch = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const handlerGetUser = async (data) => {
    setLoading(true);
    const res = await new userApi().getUserAll({
      page: pagination?.page,
      limit: pagination?.pageSize,
      orderType: 'desc',
      orderBy: 'username',
      ...data,
    });
    if (res?.status && res?.data?.success) {
      const { items = [], totalItems = 0, page, limit } = res?.data?.data;
      // data gì đó và set up
      const data = formatDataUserListApi(items);
      setData(data);
      setPagination({ pageSize: limit, page, total: totalItems });
    }
    setLoading(false);
  };

  useEffect(() => {
    handlerGetUser();
  }, []);

  const onSearch = (value) => {
    handlerGetUser({ search: value.trim() });
  };
  return (
    <Row className={styles.formSearch}>
      <Row className={styles.listFilterSearch}>
        <Form.Item className={styles.rowSearch} name='user'>
          <SelectSearchInput
            placeholder='Chọn người dùng'
            label='Người dùng'
            loading={loading}
            options={data}
            onSearch={debounce(onSearch, 500)}
          />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='status'>
          <SelectSearchInput placeholder='Chọn trạng thái' label='Trạng thái' options={listApprove} />
        </Form.Item>
        <Form.Item className={styles.rowSearch} name='content'>
          <InputText label='Nhập nội dung tìm kiếm' placeholder='Nhập nội dung tìm kiếm' />
        </Form.Item>
      </Row>
    </Row>
  );
};
export default FormSearch;
