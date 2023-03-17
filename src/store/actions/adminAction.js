import actionTypes from './actionTypes';
import { getAllCode, getAllUsers, updateUserService, createNewUserService, refreshToken } from '../../services/userService';
import { toast } from 'react-toastify';
import {
    getAllDoctorService,
    getDetailInfoDoctor,
    getScheduleDoctorByDateService,
    saveDetailInfoDoctorService,
    getTopClinicHome,
    getTopDoctorHomeService,
    getTopSpecialtyHome,
} from '../../services/adminService';
import { auth } from '../../utils';
import jwtDecode from 'jwt-decode';

export const fetchApiStart = (inputType) => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await getAllCode(inputType);
            if (res) {
                dispatch(fetchApiSuccess(res.data));
            } else {
                dispatch(fetchApiFailed());
            }
        } catch (error) {
            dispatch(fetchApiFailed());
        }
    };
};
export const fetchApiSuccess = (dataOuput) => ({
    type: actionTypes.FETCH_API_SUCCESS,
    data: dataOuput,
});
export const fetchApiFailed = () => ({
    type: actionTypes.FETCH_API_FAILED,
});
/////// CREATE NEW USER ////////
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success(res.message, {
                    theme: 'light',
                    autoClose: 1000,
                });
                dispatch(createUserSuccess());
            } else {
                toast.error(res.message, {
                    theme: 'light',
                });
                dispatch(createUserFailed());
            }
        } catch (error) {
            dispatch(createUserFailed());
            toast.error('Failed!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };
};
export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});
/////// GET ALL USERS /////////
export const getAllUser = () => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(getAllUserSuccess(res.users));
            } else {
                dispatch(getAllUserFailed({ errCode: -2, message: auth.AUTH_FAILED }));
            }
        } catch (error) {
            dispatch(getAllUserFailed({ errCode: -2 }));
        }
    };
};

//
export const getAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_API_ALL_USER_SUCCESS,
    users,
});
export const getAllUserFailed = (message) => ({
    type: actionTypes.FETCH_API_ALL_USER_FAILED,
    auth: message,
});
////////// GET USER BY ID /////////
export const getUserId = (userId) => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await getAllUsers(userId);
            if (res && res.errCode === 0) {
                dispatch(getUserIdSuccess(res.users));
            } else {
                toast.error('Something Wrong!');
                dispatch(getUserIdFailed());
            }
        } catch (error) {
            toast.error('Get User Failed!');
            dispatch(getUserIdFailed());
        }
    };
};

export const getUserIdSuccess = (user) => ({
    type: actionTypes.FETCH_API_USER_ID_SUCCESS,
    user,
});
export const getUserIdFailed = () => ({
    type: actionTypes.FETCH_API_USER_ID_FAILED,
});

// UPDATE USER //
export const updateUser = (user) => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await updateUserService(user);
            if (res && res.errCode === 0) {
                toast.success('Updated!', {
                    autoClose: 1000,
                });
            } else {
                toast.error('Something Wrong!');
            }
        } catch (error) {
            toast.error('Update User Failed!');
        }
    };
};

//// GET ALL DOCTOR ////
export const getAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await getAllDoctorService();
            if (res && res.errCode === 0) {
                dispatch(getAllDoctorSuccess(res.doctors));
            } else {
                dispatch(getAllDoctorFailed());
            }
        } catch (error) {
            dispatch(getAllDoctorFailed());
        }
    };
};
export const getAllDoctorSuccess = (doctors) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    doctors,
});
export const getAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
});
// GET DETAIL INFO DOCTOR
export const fetchDetailInfoDoctor = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await getDetailInfoDoctor(doctorId);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DETAIL_INFO_DOCTOR_SUCESS,
                    data: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_DETAIL_INFO_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_DETAIL_INFO_DOCTOR_FAILED,
            });
        }
    };
};
/// SAVE DETAIL INFO DOCTOR ////
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await saveDetailInfoDoctorService(data);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
                toast.success(res.message);
            } else {
                toast.error('Something Wrong!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            toast.error('Failed!');
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
        }
    };
};

// GET SCHEDULE DOCTOR BY DATE /////
export const fetchScheduleDoctorByDate = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await getScheduleDoctorByDateService(doctorId, date);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_DOCTOR_BY_DATE_SUCCESS,
                    data: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_DOCTOR_BY_DATE_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_SCHEDULE_DOCTOR_BY_DATE_FAILED,
            });
        }
    };
};
// GET TOP DOCTOR HOME PAGE ///
export const getTopDoctorHomePage = (limit) => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await getTopDoctorHomeService(limit);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS,
                    doctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED,
            });
        }
    };
};
// GET TOP SPECIALTY HOME PAGE
export const fetchTopSpecialtyHome = (limit) => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await getTopSpecialtyHome(limit);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_SPECIATLY_HOME_SUCCESS,
                    data: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_SPECIATLY_HOME_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_TOP_SPECIATLY_HOME_FAILED,
            });
        }
    };
};
//GET TOP CLINIC HOME PAGE
export const fetchTopClinicHome = (limit) => {
    return async (dispatch, getState) => {
        try {
            const { data: res } = await getTopClinicHome(limit);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_CLINIC_HOME_SUCCESS,
                    data: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_CLINIC_HOME_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_TOP_CLINIC_HOME_FAILED,
            });
        }
    };
};
