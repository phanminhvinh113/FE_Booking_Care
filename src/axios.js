import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as action from './store/actions';
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    },
    // params: {
    //     nonce: '123',
    //     stime: new Date().getTime(),
    //     sessionId: '123',
    // },
    withCredentials: true,
});
// REFRESH TOKEN
const refreshToken = () => {
    return instance.post('/api/refresh-token');
};
//
instance.interceptors.request.use(
    (config) => {
        const access_token = sessionStorage.getItem('access_token');
        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    },
);
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        //
        const originalConfig = error.config;
        //

        //
        if (error.response && error.response.status === 401 && !originalConfig._retry && error.response?.data.errCode === 1) {
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
            }
            console.log(data);
            if (data.errCode === 2 && data.message === 'invalid signature') action.processLogout();
            else action.processLogout();
        }
        return Promise.reject(error);
    },
);
// const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
//     const error = new Error();
//     error.httpStatusCode = httpStatusCode;
//     error.statusCode = statusCode;
//     error.errorMessage = errorMessage;
//     error.problems = problems;
//     error.errorCode = errorCode + "";
//     return error;
// };

// export const isSuccessStatusCode = (s) => {
//     // May be string or number
//     const statusType = typeof s;
//     return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
// };

// instance.interceptors.response.use(
//     (response) => {
//         // Thrown error for request with OK status code
//         const { data } = response;
//         if (data.hasOwnProperty('s') && !isSuccessStatusCode(data['s']) && data.hasOwnProperty('errmsg')) {
//             return Promise.reject(
//                 createError(response.status, data['s'], data['errmsg'], null, data['errcode'] ? data['errcode'] : ''),
//             );
//         }

//         // Return direct data to callback
//         if (data.hasOwnProperty('s') && data.hasOwnProperty('d')) {
//             return data['d'];
//         }
//         // Handle special case
//         if (data.hasOwnProperty('s') && _.keys(data).length === 1) {
//             return null;
//         }
//         return response.data;
//     },
//     (error) => {
//         const { response } = error;
//         if (response == null) {
//             return Promise.reject(error);
//         }

//         const { data } = response;

//         if (data.hasOwnProperty('s') && data.hasOwnProperty('errmsg')) {
//             return Promise.reject(createError(response.status, data['s'], data['errmsg']));
//         }

//         if (data.hasOwnProperty('code') && data.hasOwnProperty('message')) {
//             return Promise.reject(createError(response.status, data['code'], data['message'], data['problems']));
//         }

//         return Promise.reject(createError(response.status));
//     },
// );

export default instance;
