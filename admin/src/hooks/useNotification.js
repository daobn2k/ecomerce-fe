import { useEffect, useState } from 'react';
import { setCountNumber, setNotifications } from 'redux/slices/notificationSlice';
import { store } from 'redux/store';
import notificationApi from 'services/subs/notification';

export const useNotification = () => {
    // const dispatch = store.dispatch();
    // const numberNotification = store.getState().notificationReducer.countNumber;
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    // func get notification
    const getNotifications = async (page) => {
        setLoading(true);
        const payload = {
            ...pagination,
            page,
        };
        const res = await new notificationApi().getNotification(payload);
        if (res?.data?.success) {
            const { items = [], totalItems = 0, limit = 5, page = 1 } = res?.data?.data;
            setPagination({ limit, page, total: totalItems });
            // dispatch(setCountNumber(totalItems));
            setData(items);
        }
        setLoading(false);
    };
    //
    useEffect(() => {
        getNotifications();
    }, []);

    const onReadNotification = (number) => {
        // dispatch(setCountNumber(number));
    };

    const onChangePage = (page) => {
        getNotifications(page);
    };

    return {
        onReadNotification,
        getNotifications,
        // numberNotification,
        pagination,
        data,
        loading,
        onChangePage,
    };
};
