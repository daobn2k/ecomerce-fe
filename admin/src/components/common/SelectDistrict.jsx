import SelectSearchInput from 'components/SelectSearchInput';
import { useEffect, useState } from 'react';
import postsApi from 'services/subs/posts';
import { formatDataStringListApi } from 'utils/function.utils';

const SelectDistrict = (props) => {
  const { province } = props;

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (province) {
      getOptionsDistrict(province);
    }
  }, [province]);

  const getOptionsDistrict = async (locationDistrict) => {
    const res = await new postsApi().getDistrict({ locationDistrict });
    if (res?.data?.success) {
      setOptions(formatDataStringListApi(res?.data?.data));
    }
  };

  return <SelectSearchInput {...props} options={province ? options : []} />;
};

export default SelectDistrict;
