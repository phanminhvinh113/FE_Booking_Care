import { toast } from 'react-toastify';
import { handleLogOutUserService } from '../../services/userService';
import actionTypes from './actionTypes';

import crypto from 'crypto';
console.log(crypto.createHash('sha256', '123abc'));

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
