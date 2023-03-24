import axios from '../axios';
import instance from './interceptorService';
//

export const handleLogInUserService = (email, password) => {
    return axios.post('/api/login', { email, password });
};
//
export const handleLogOutUserService = (data) => {
    return instance.post('/api/logout', {
        data,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
    });
};

export const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

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
//
export const evaluateMedicalDoctor = (data) => {
    return axios.post('/api/evaluate-doctor', data);
};
//
export const getMessagePatientDoctorService = (senderId, receiverId) => {
    return axios.get('/api/get_all_message', {
        params: {
            senderId,
            receiverId,
        },
    });
};
export const getAllConversationDoctorService = (doctorId) => {
    return axios.get('/api/get_conversation_doctor', {
        params: {
            doctorId,
        },
    });
};
