import { notification } from 'antd';
import moment from 'moment';
import uploadApi from 'services/subs/upload';

export const checkTimeNews = (date) => {
  const dateTimeLocal = moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');

  const overDate = moment(dateTimeLocal);

  const curDate = moment();

  const minutes = curDate.diff(overDate, 'minutes');

  const hours = (minutes - (minutes % 60)) / 60;

  const days = (hours - (hours % 24)) / 24;

  if (days > 5) {
    return convertDateStringToLocal(date);
  }
  if (days >= 1 && days <= 5) {
    return `${days} ngày trước`;
  }
  if (hours > 0) {
    return `${hours} giờ trước`;
  }
  if (minutes > 10) {
    return `${minutes} phút trước`;
  }
  return 'Vừa xong';
};

export const getFileSize = (file) => {
  const fileSizeInBytes = file.size;
  const fileSizeInKB = fileSizeInBytes / 1024;
  const fileSizeInMB = fileSizeInKB / 1024;

  if (!fileSizeInMB) return '';
  if (fileSizeInMB < 1) {
    return fileSizeInKB.toFixed(2) + ' KB';
  } else {
    return fileSizeInMB.toFixed(2) + ' MB';
  }
};

export const findTextInTree = (tree, targetText) => {
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    if (typeof item?.key === 'string' && item?.key === targetText) {
      return item;
    } else if (Array.isArray(item.children) && item.children.length > 0) {
      const found = findTextInTree(item.children, targetText);
      if (found) {
        return found;
      }
    }
  }
  return false;
};

// dateString: YYYY-MM-DD HH:mm:ss
export const convertDateStringToLocal = (dateString, formatTime = 'DD/MM/YYYY') => {
  const dateUtc = moment.utc(dateString);
  const localDate = moment(dateUtc).local();
  return localDate.format(formatTime);
};

// dateString: DD-MM-YYYY HH:mm:ss
export const convertDateStringLocalToISOUTC = (dateString, formatOut = 'YYYY-MM-DD') => {
  const dateFormatFlex = moment(dateString, 'DD-MM-YYYY').format(formatOut);
  const dateFormatISO = moment(dateFormatFlex).toISOString();
  const dateformat = moment.utc(dateFormatISO).format(formatOut);
  return dateformat;
};

export const formatDataListApi = (data = []) => {
  if (data?.length > 0) {
    const newData = data.map((i) => {
      return {
        id: i._id,
        value: i._id,
        label: i.name,
        data: i,
      };
    });

    return newData;
  }
  return [];
};

export const formatDataUserListApi = (data = []) => {
  if (data?.length > 0) {
    const newData = data.map((i) => {
      return {
        id: i._id,
        value: i._id,
        label: i.username,
      };
    });

    return newData;
  }
  return [];
};

export const formatDataStringListApi = (data = []) => {
  if (data?.length > 0) {
    const newData = data.map((i) => {
      return {
        id: i,
        value: i,
        label: i,
      };
    });

    return newData;
  }
  return [];
};

export const formatListApiToId = (data = []) => {
  if (data?.length > 0) {
    const newData = data.map((i) => i._id);

    return newData;
  }
  return [];
};

// upload file
export const uploadFile = async (data) => {
  const res = await new uploadApi().uploadFile(data);

  if (res?.data?.success) {
    return res?.data?.data;
  } else {
    notification.error({ message: res?.message ?? 'Tải file lên thất bại' });
  }
};

export const getUrlFile = async (fileList = []) => {
  const formUpload = new FormData();
  fileList.map((file) => {
    formUpload.append('files', file.originFileObj);
  });

  const res = await new uploadApi().uploadFileMultiple(formUpload);
  console.log(res, 'res');
  if (res.data.data && res.status) {
    return res.data.data;
  }
};

export const formatPathToUrl = (path) => {
  return `${process.env.REACT_APP_API_URL}/${path}`;
};

export const formatPathToListFile = (paths, type) => {
  if (Array.isArray(paths) && paths.length > 0) {
    return paths.map((i, index) => {
      return {
        uid: i + index + type,
        status: 'done',
        name: i,
        url: i,
      };
    });
  }
  return [];
};

export const checkRoleUser = (role) => {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'Quản trị hệ thống';
    case 'ADMIN':
      return 'Quản trị viên';
    case 'USER':
      return 'Người dùng';
    default:
      return '';
  }
};

export const checkColorByName = (letter) => {
  letter = letter.toLowerCase();
  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const colors = [
    '#2ec930',
    '#11496',
    '#73ac26',
    '#b73655',
    '#7e6084',
    '#644ed0',
    '#8a6324',
    '#5a3911',
    '#7d941',
    '#bbda5',
    '#253e13',
    '#fa541c',
    '#614bcb',
    '#ec3292',
    '#8b2893',
    '#dfaa2f',
    '#54e9a4',
    '#d6b69a',
    '#a2c7e8',
    '#b01e9d',
    '#f7621',
    '#7c35eb',
    '#a63394',
    '#40a9d',
    '#59b229',
    '#a04a58',
  ];
  const index = letters.indexOf(letter);
  return colors[index];
};

export const formatContentTextArea = (content) => {
  return content ? content?.replace(/(?:\r\n|\r|\n)/g, '<br>') : '';
};

export const convertDataSelect = (obj) => {
  return {
    id: obj._id,
    value: obj._id,
    label: obj.name,
  };
};
