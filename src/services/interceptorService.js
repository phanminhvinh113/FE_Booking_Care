import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
// REFRESH ACCESS TOKEN
const refreshToken = () => {
    return instance.post('/api/refresh-token');
};
//
// INTERCEPTORS
instance.interceptors.request.use(
    (config) => {
        const access_token = sessionStorage.getItem('access_token');
        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }
        console.log('OK!');
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    },
);
//
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        //
        const originalConfig = error.config;
        //
        if (error.response && error.response.status === 401 && !originalConfig._retry) {
            //
            originalConfig._retry = true;
            // REFRESH TOKEN
            const { data } = await refreshToken();
            // Make a call to your refresh token endpoint to get a new token
            if (data.errCode === 0 && data.newAccessToken) {
                // Save the new access token and refresh token in local storage
                sessionStorage.setItem('access_token', data.newAccessToken);
                // Update the original request with the new access token
                instance.defaults.headers.common['Authorization'] = `Bearer ${data.newAccessToken}`;
                // Retry the original request
                return instance(originalConfig);
            } else {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);
export default instance;
