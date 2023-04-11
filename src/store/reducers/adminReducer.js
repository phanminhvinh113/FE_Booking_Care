import actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    allUsers: [],
    userById: [],
    allDoctors: [],
    scheduleDoctorByDate: [],
    topSpecialtyHome: [],
    topClinicHome: [],
    inforDoctor: {},
    doctorsTopHome: [],
    topSpecialtyHome: [],
    topClinicHome: [],
    auth: {},
    feedbacks: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_API_START:
            return {
                ...state,
            };
        case actionTypes.FETCH_API_SUCCESS:
            return {
                ...state,
                data: action.data,
            };

        case actionTypes.FETCH_API_FAILED:
            return {
                ...state,
            };
        case actionTypes.FETCH_API_ALL_USER_SUCCESS:
            return {
                ...state,
                auth: {},
                allUsers: action.users,
            };
        case actionTypes.FETCH_API_ALL_USER_FAILED:
            return {
                ...state,
                auth: action.auth,
            };
        case actionTypes.FETCH_API_USER_ID_SUCCESS:
            return {
                ...state,
                userById: action.user,
            };
        case actionTypes.FETCH_API_USER_ID_FAILED:
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                allDoctors: action.doctors,
            };

        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            return {
                ...state,
            };
        case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.FETCH_DETAIL_INFO_DOCTOR_SUCESS: {
            return {
                ...state,
                inforDoctor: action.data,
            };
        }
        case actionTypes.FETCH_DETAIL_INFO_DOCTOR_FAILED: {
            return {
                ...state,
            };
        }
        case actionTypes.FETCH_FEEDBACK_DOCTOR_SUCCESS: {
            console.log(action.data);
            return {
                ...state,
                feedbacks: action.data,
            };
        }
        case actionTypes.SAVE_DETAIL_DOCTOR_FAILED:
            return {
                ...state,
            };
        case actionTypes.FETCH_SCHEDULE_DOCTOR_BY_DATE_SUCCESS:
            return {
                ...state,
                scheduleDoctorByDate: action.data,
            };

        case actionTypes.FETCH_SCHEDULE_DOCTOR_BY_DATE_FAILED:
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS:
            return {
                ...state,
                doctorsTopHome: action.doctors,
            };
        case actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED:
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_SPECIATLY_HOME_SUCCESS:
            return {
                ...state,
                topSpecialtyHome: action.data,
            };
        case actionTypes.FETCH_TOP_SPECIATLY_HOME_FAILED:
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_CLINIC_HOME_SUCCESS:
            return {
                ...state,
                topClinicHome: action.data,
            };
        case actionTypes.FETCH_TOP_CLINIC_HOME_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
