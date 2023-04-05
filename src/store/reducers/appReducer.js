import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: '',
    handleFunc: null,
    dataFunc: null,
};

const initialState = {
    started: true,
    language: 'en',
    systemMenuPath: '/',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal,
    },
    positionHomePage: 0,
    postionSpecialtyPage: 0,
    positionDoctorPage: 0,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGING_LANGUAGE_APP:
            return {
                ...state,
                language: action.language,
            };
        case actionTypes.APP_START_UP_COMPLETE:
            return {
                ...state,
                started: true,
            };
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal,
                },
            };
        case actionTypes.GET_POSITION_HOME_PAGE:
            return {
                ...state,
                positionHomePage: action.prevY,
            };
        case actionTypes.GET_POSTION_SPECIALTY_PAGE:
            return {
                ...state,
                postionSpecialtyPage: action.scrollY,
            };
        case actionTypes.GET_POSITION_DOCTOR_PAGE:
            return {
                ...state,
                positionDoctorPage: action.scrollY,
            };
        default:
            return state;
    }
};

export default appReducer;
