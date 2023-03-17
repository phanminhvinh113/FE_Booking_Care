const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    GET_POSITION_HOME_PAGE: 'GET_POSITION_PREV_PAGE',
    GET_POSTION_SPECIALTY_PAGE: 'GET_POSTION_SPECIALTY_PAGE',
    GET_POSITION_DOCTOR_PAGE: 'GET_POSITION_DOCTOR_PAGE',
    ///// Change language
    CHANGING_LANGUAGE_APP: 'CHANGING_LANGUAGE_APP',

    // USER MANGAGE
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    //User LogIn
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT_SUCESS: 'PROCESS_LOGOUT_SUCESS',
    PROCESS_LOGOUT_FALIED: 'PROCESS_LOGOUT_FALIED',

    //ADMIN
    FETCH_API_START: 'FETCH_API_START',
    FETCH_API_SUCCESS: 'FETCH_API_SUCCESS',
    FETCH_API_FAILED: 'FETCH_API_FAILED',

    CREATE_USER_SUCCESS: 'SAVE_USER_SUCCESS',
    CREATE_USER_FAILED: 'SAVE_USER_FAILED',

    FETCH_API_ALL_USER_SUCCESS: 'FETCH_API_ALL_USER_SUCCESS',
    FETCH_API_ALL_USER_FAILED: 'FETCH_API_ALL_USER_FAILED',

    FETCH_API_USER_ID_SUCCESS: 'FETCH_API_USER_ID_SUCCESS',
    FETCH_API_USER_ID_FAILED: 'FETCH_API_USER_ID_FAILED',

    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',

    // Doctors
    FETCH_TOP_DOCTOR_HOME_SUCCESS: 'FETCH_TOP_DOCTOR_HOME_SUCCESS',
    FETCH_TOP_DOCTOR_HOME_FAILED: 'FETCH_TOP_DOCTOR_HOME_FAILED',

    FETCH_ALL_DOCTOR_SUCCESS: 'FETCH_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAILED: 'FETCH_ALL_DOCTOR_FAILED',

    SAVE_DETAIL_DOCTOR_SUCCESS: 'SAVE_DETAIL_DOCTOR_SUCCESS',
    SAVE_DETAIL_DOCTOR_FAILED: 'SAVE_DETAIL_DOCTOR_FAILED',

    FETCH_SCHEDULE_DOCTOR_BY_DATE_SUCCESS: 'FETCH_SCHEDULE_DOCTOR_BY_DATE_SUCCESS',
    FETCH_SCHEDULE_DOCTOR_BY_DATE_FAILED: 'FETCH_SCHEDULE_DOCTOR_BY_DATE_FAILED',

    FETCH_DETAIL_INFO_DOCTOR_SUCESS: 'FETCH_DETAIL_INFO_DOCTOR_SUCESS',
    FETCH_DETAIL_INFO_DOCTOR_FAILED: 'FETCH_DETAIL_INFO_DOCTOR_FAILED',
    // Specialty
    FETCH_TOP_SPECIATLY_HOME: 'FETCH_TOP_SPECIATLY_HOME',
    FETCH_TOP_SPECIATLY_HOME_SUCCESS: 'FETCH_TOP_SPECIATLY_HOME_SUCCESS',
    FETCH_TOP_SPECIATLY_HOME_FAILED: 'FETCH_TOP_SPECIATLY_HOME_FAILED',
    // clinic
    FETCH_TOP_CLINIC_HOME_SUCCESS: 'FETCH_TOP_CLINIC_HOME_SUCCESS',
    FETCH_TOP_CLINIC_HOME_FAILED: 'FETCH_TOP_CLINIC_HOME_FAILED',
});

export default actionTypes;
