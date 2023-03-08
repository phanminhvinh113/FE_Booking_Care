import axios from '../axios';
//

export const handleLogInUserService = (email, password) => {
    return axios.post('/api/login', { email, password });
};

export const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`, {
        headers: {
            access_token: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
    });
};
export const refreshToken = () => {
    return axios.post('/api/refresh-token');
};

// export const getAllUsersInterCeptor = axios.interceptors.request.use(
//     async (config) => {
//         // if (config.url.indexOf('/login') >= 0 || config.url.indexOf('/refresh-token') >= 0) {
//         //     return config;
//         // }
//         const accessToken = sessionStorage.getItem('access_token');
//         const { exp } = jwtDecode(accessToken);
//         if (exp < new Date().getTime() / 1000) {
//             const { newAccessToken } = await refreshToken();
//             sessionStorage.setItem('access_token', newAccessToken);
//             await getAllUsers('ALL');
//         } else {
//             await getAllUsers('ALL');
//         }
//         return config;
//     },
//     (error) => {
//         Promise.reject(error);
//     },
// );
export const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
};

export const getUserIdServive = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

export const updateUserService = (data) => {
    return axios.put('/api/update-user', data);
};

export const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        },
    });
};
//// GET ALL CODE ///
export const getAllCode = (inputType) => {
    return axios.get('/api/allcode', {
        params: {
            type: inputType,
        },
    });
};
//
export const searchAllService = (inputSearch) => {
    return axios.get('/api/searchAll', {
        params: {
            s: inputSearch,
        },
    });
};
export const evaluateMedicalDoctor = (data) => {
    return axios.post('/api/evaluate-doctor', data);
};
//////// GET TOP DOCTORS /////
// export const getTopDoctorHomeService = (limit) => {
//     return axios.get('/api/top-doctor-home', {
//         params: {
//             limit: limit,
//         },
//     });
// };
