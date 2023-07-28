import { hideLoading, showLoading } from 'components/Loading';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import massageApi from 'services/subs/massage';

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
    const res = await new massageApi().detail(id);

    if (res?.data?.success) {
      const data = formatValueDetail(res?.data?.data);
      setData(data);
    }

    hideLoading();
  };
  const formatValueDetail = (data) => {
    return {
      ...data,
    };
  };
  return {
    getDetail,
    data,
  };
};
