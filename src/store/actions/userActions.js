import { toast } from 'react-toastify';
import { getAllConversationDoctorService, getMessagePatientDoctorService, handleLogOutUserService } from '../../services/userService';
import actionTypes from './actionTypes';
import { SignOutSocial } from '../../containers/Auth/firebase';
export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});
export const userLogInSucces = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
});
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = (user) => async (dispatch, getState) => {
    try {
        const { data } = await handleLogOutUserService(user);
        if (data.errCode === 0) {
            dispatch({
                type: actionTypes.PROCESS_LOGOUT_SUCESS,
            });
        } else {
            dispatch({
                type: actionTypes.PROCESS_LOGOUT_SUCESS,
            });
            toast.warn('UNAUTHROZATION');
        }
    } catch (error) {
        dispatch({
            type: actionTypes.PROCESS_LOGOUT_SUCESS,
        });
    }
};
export const getListConversationPatient = (doctorId) => async (dispatch, getState) => {
    try {
        const { data: res } = await getAllConversationDoctorService(doctorId);
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.FETCH_ALL_CONVERSATION_PATIENT_SUCCESS,
                data: res.data,
            });
        } else {
            dispatch({
                type: actionTypes.FETCH_ALL_CONVERSATION_PATIENT_FAILED,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_ALL_CONVERSATION_PATIENT_FAILED,
        });
    }
};
export const getMessagePatientDoctor = (payload) => async (dispatch, getState) => {
    try {
        const { data: res } = await getMessagePatientDoctorService(payload);
        if (res && res.errCode === 0)
            dispatch({
                type: actionTypes.FETCH_MESSAGE_PATIENT_DOCTOR_SUCCESS,
                data: res.data,
            });
        else
            dispatch({
                type: actionTypes.FETCH_MESSAGE_PATIENT_DOCTOR_FAILED,
            });
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_MESSAGE_PATIENT_DOCTOR_FAILED,
        });
    }
};

export const selectConversationPatient = (patientInfo) => ({
    type: actionTypes.SELECT_CONVERSATION_PATIENT,
    patientInfo,
});

export const sortListConversation = (targetUser) => {
    return {
        type: actionTypes.SORT_LIST_CONVERSATION,
        payload: targetUser,
    };
};
