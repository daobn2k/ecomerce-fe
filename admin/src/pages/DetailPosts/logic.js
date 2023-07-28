import { hideLoading, showLoading } from 'components/Loading';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { default as postsApi } from 'services/subs/posts';
import { formatListApiToId } from 'utils/function.utils';

export const useLogicUploadGirl = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);
  const getDetail = async (id) => {
    showLoading();
    const res = await new postsApi().getDetail({ id });

    if (res?.data?.success) {
      const data = formatValueDetail(res?.data?.data);
      setData(data);
    }

    hideLoading();
  };

  const formatBody = (text = '') => {
    return text.split('-');
  };
  const formatValueDetail = (data) => {
    const body = formatBody(data?.body);
    return {
      ...data,
      yearOfBirth: moment(data?.yearOfBirth, 'YYYY'),
      body1: body[0],
      body2: body[1],
      body3: body[2],
      services: formatListApiToId(data?.services),
    };
  };
  return {
    getDetail,
    data,
  };
};
