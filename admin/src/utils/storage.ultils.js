export const setToken = (value) => {
    return localStorage.setItem('TOKEN', value);
};

export const getToken = () => {
    return localStorage.getItem('TOKEN') || '';
};

export const clearStorage = () => {
    return localStorage.clear();
};

export const clearSession = () => {
    return window.sessionStorage.clear();
};

export const getUserProfile = () => {
    try {
        const value = localStorage.getItem('USER_PROFILE');
        if (typeof value === 'string') {
            return JSON.parse(value);
        }
        return '';
    } catch (error) {
        return '';
    }
};

export const setUserProfile = (value) => {
    try {
        return localStorage.setItem('USER_PROFILE', JSON.stringify(value));
    } catch (error) {
        return false;
    }
};
