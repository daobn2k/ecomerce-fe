import { hideLoading, showLoading } from 'components/Loading';
import { useState } from 'react';
import { formatPathToListFile, getUrlFile } from 'utils/function.utils';

export const useUploadFiles = (form) => {
  const [images, setImages] = useState([]);
  const handleFile = async (file, fileList) => {
    const newFiles = fileList?.length > 0 ? fileList?.filter((i) => i.lastModified) : [];

    if (newFiles?.length > 0) {
      const res = await getUrlFile(newFiles);
      if (res) {
        const formatRes = formatPathToListFile(res);
        return formatRes;
      }
    }
  };

  const onChangeFile = async ({ file, fileList }) => {
    if (file?.status === 'removed') return;
    showLoading();
    const formatRes = await handleFile(file, fileList);
    setImages([...formatRes, ...images]);
    hideLoading();
  };

  const onRemoveItemFile = (callback, file) => {
    callback();
    const newListFiles = images?.filter((i) => i.uid !== file.uid);
    setImages(newListFiles);
    if (newListFiles?.length === 0) {
      console.log(1);
      form.setFieldValue('images', []);
    }
  };

  return {
    onRemoveItemFile,
    onChangeFile,
    images,
    setImages,
  };
};
