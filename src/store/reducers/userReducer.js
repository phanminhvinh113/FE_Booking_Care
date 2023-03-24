import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    Conversation: null,
    patientInfo: null,
    listConversation: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.PROCESS_LOGOUT_SUCESS:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                patientInfo: null,
            };
        case actionTypes.PROCESS_LOGOUT_FALIED:
            return {
                ...state,
            };
        case actionTypes.FETCH_MESSAGE_PATIENT_DOCTOR_SUCCESS: {
            return {
                ...state,
                Conversation: action.data,
            };
        }
        case actionTypes.SELECT_CONVERSATION_PATIENT: {
            return {
                ...state,
                patientInfo: action.patientInfo,
            };
        }
        case actionTypes.FETCH_ALL_CONVERSATION_PATIENT_SUCCESS: {
            return {
                ...state,
                listConversation: action.data,
            };
        }
        case actionTypes.FETCH_ALL_CONVERSATION_PATIENT_FAILED: {
            return {
                ...state,
            };
        }
        case actionTypes.SORT_LIST_CONVERSATION: {
            return {
                ...state,
                listConversation: action.payload,
            };
        }
        default:
            return state;
    }
};

export default userReducer;
