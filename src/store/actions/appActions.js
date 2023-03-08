import actionTypes from './actionTypes';

//
export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE,
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal,
});
export const changingLanguageApp = (dataLanguage) => ({
    type: actionTypes.CHANGING_LANGUAGE_APP,
    language: dataLanguage,
});
export const changingRedrect = (pathSystem) => ({
    type: actionTypes.CHANGING_LANGUAGE_APP,
    systemPathRedirect: pathSystem,
});
export const getPostionScrollHomePage = (prevY) => ({
    type: actionTypes.GET_POSITION_HOME_PAGE,
    prevY,
});
export const getPostionScrollSpecialtyPage = (scrollY) => ({
    type: actionTypes.GET_POSTION_SPECIALTY_PAGE,
    scrollY,
});
export const getPostionScrollDoctorPage = (scrollY) => ({
    type: actionTypes.GET_POSITION_DOCTOR_PAGE,
    scrollY: +scrollY,
});
