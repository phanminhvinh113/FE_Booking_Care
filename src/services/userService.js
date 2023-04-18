import Cookies from 'js-cookie';
import axios from '../axios';
import instance from './interceptorService';
//

export const handleLogInUserService = (email, password) => {
    return axios.post('/api/login', { email, password });
};
//
export const handleLogOutUserService = (data) => {
    return axios.post('/api/logout', {
        data,
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
// CHECK EXIST FEILD VALUE
export const checkExistData = (field, value) => {
    return axios.get('/api/auth/check-exist', {
        params: {
            field,
            value,
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
export const commentEvaluteMical = (data) => {
    return axios.post('/api/comment-evalute', data);
};
//
export const getMessagePatientDoctorService = ({ senderId, receiverId, offset, limit }) => {
    return axios.get('/api/get_all_message', {
        params: {
            senderId,
            receiverId,
            limit,
            offset,
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
//
export const sendEmailOTPService = (email) => {
    return axios.post('/api/send_otp', {
        email,
    });
};
export const verifyOtpEmailService = (email, otp) => {
    return axios.post('/api/verify_otp', {
        email,
        otp,
    });
};
export const registerNewUserService = (data) => {
    return axios.post('/api/register', data);
};
