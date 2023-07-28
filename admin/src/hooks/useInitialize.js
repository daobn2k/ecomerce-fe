import { settingsType } from 'constants/value.constants';
import { useEffect } from 'react';
import {
  setCategories,
  setContentFooter,
  setMassageRate,
  setPointRate,
  setPostRate,
  setPrivacy,
  setProvinces,
  setServices,
  setTeleLink,
} from 'redux/slices/resourcesSlice';
import { store } from 'redux/store';
import resourcesApi from 'services/subs/resources';
import { formatDataListApi, formatDataStringListApi } from 'utils/function.utils';

export const useInitialize = () => {
  const services = store.getState()?.resourceReducer?.services;
  const provinces = store.getState()?.resourceReducer?.provinces;
  const categories = store.getState()?.resourceReducer?.categories;
  const pointRate = store.getState()?.resourceReducer?.pointRate;
  const postRate = store.getState()?.resourceReducer?.postRate;
  const massageRate = store.getState()?.resourceReducer?.massageRate;
  const teleLink = store.getState()?.resourceReducer?.teleLink;
  const privacy = store.getState()?.resourceReducer?.privacy;
  const contentFooter = store.getState()?.resourceReducer?.contentFooter;

  const getResource = async () => {
    const res = await new resourcesApi().resources();

    if (res?.data?.success) {
      const { service = [], locationProvinces = [], categories, settings } = res?.data?.data;
      const dataServices = formatDataListApi(service);
      const dataProvinces = formatDataStringListApi(locationProvinces);
      const dataCategories = formatDataListApi(categories);
      const dataPostRate = settings?.find((i) => i.type === settingsType.post_rate)?.value;
      const dataPointRate = settings?.find((i) => i.type === settingsType.point_rate)?.value;
      const dataMassageRate = settings?.find((i) => i.type === settingsType.massage_rate)?.value;
      const dataTeleLink = settings?.find((i) => i.type === settingsType.tele_link)?.value;
      const dataPrivacy = settings?.find((i) => i.type === settingsType.privacy)?.value;
      const dataContentFooter = settings?.find((i) => i.type === settingsType.contentFooter)?.value;

      store.dispatch(setServices({ data: dataServices }));
      store.dispatch(setProvinces({ data: dataProvinces }));
      store.dispatch(setCategories({ data: dataCategories }));
      store.dispatch(setPointRate({ data: dataPointRate }));
      store.dispatch(setPostRate({ data: dataPostRate }));
      store.dispatch(setMassageRate({ data: dataMassageRate }));
      store.dispatch(setTeleLink({ data: dataTeleLink }));
      store.dispatch(setPrivacy({ data: dataPrivacy }));
      store.dispatch(setContentFooter({ data: dataContentFooter }));
    }
  };

  useEffect(() => {
    if (
      !services &&
      !provinces &&
      !categories &&
      !pointRate &&
      !postRate &&
      !massageRate &&
      !teleLink &&
      !privacy &&
      !contentFooter
    ) {
      getResource();
    }
  }, [services, provinces, categories, pointRate, postRate, massageRate, teleLink, privacy, contentFooter]);
};
