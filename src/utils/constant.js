export const path = {
    HOME: '/',
    HOMEPAGE: '/home',
    REGISTER: '/register',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    DOCTOR: '/doctor',
    PATIENT: '/patient',
    DETAILDOCTOR: '/detail-doctor/:id',
    DETAILSPECIALTY: '/detail-specialty/:id',
    VERIFYBOOKING: '/verify-booking',
    SPECIALTYHEADER: '/specialty',
    DOCTORHEADER: '/doctor_header',
    HEALTHFACILITIESHEADER: '/health_facilities',
    EXAMINATIONPACKAGEHEADER: '/examination_package',
    COMFIRM_BOOKING_MEDICAL: '/confirm-booking-medical',
    ADMIN_REDIRECT_LOGGIN: '/system/user-manage',
    DOCTOR_REDIRECT_LOGGIN: '/doctor/manage/patient',
    NOT_FIND_PAGE: '/404',
};

export const languages = {
    VI: 'vi',
    EN: 'en',
};

export const manageActions = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    CREATE: 'CREATE',
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY',
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N',
};
export const ROLE_USER = {
    ADMIN: 'R1',
    DOCTOR: 'R2',
    PATIENT: 'R3',
};
export const auth = {
    AUTH_FAILED: 'Not Authorization',
    TOKEN_EXPRIE: 'jwt expired',
};
export const TITLE_BROWSWER = {
    Login: 'Log In',
    Register: ' Register Account',
    Home_Page: ' Booking Care - Nền tảng y tế',
    doctor_seacrch: 'Tìm kiếm bác sĩ',
    specialtys: 'Chuyên Khoa',
    clinic_search: 'Tìm kiếm phòng khám',
};
export const VALIDATE = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
};

export const VALIDATE_CONTENT = {
    Is_Required: 'Vui lòng nhập trường này.',
    Is_Email: 'Email Không Đúng Định Dạng.',
    Include_Number: 'Phải bao gồm cả số.',
    Not_Include_Number: 'Không được nhập số.',
    Include_Special_Character: 'Phải có ít nhất 1 kí tự đặc biệt.',
    Not_Include_Include_Special_Character: 'Không được nhập kí tự đặc biệt.',
    Include_Character: 'Phải nhập chữ.',
    Not_Include_Character: ' Không được nhập chữ.',
    Confirm_Password: 'Mật khẩu nhập lại không đúng.',
};
