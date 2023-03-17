import axios from '../axios';
import * as queryString from 'query-string';

const adminService = {
    login(loginBody) {
        return axios.post(`/admin/login`, loginBody);
    },
};
/// TOP DOCTOR HOME PAGE ///

export const getTopDoctorHomeService = (limit) => {
    return axios.get('/api/top-doctor-home', {
        headers: {
            key: 'List_Top_Doctor',
        },
        params: {
            limit: limit,
        },
    });
};
/// GET ALL DOCTOR SERVICE ///
export const getAllDoctorService = () => {
    return axios.get('/api/get-all-doctor');
};

/// SAVE DETAIL DOCTOR ///
export const saveDetailInfoDoctorService = (data) => {
    return axios.post('/api/save-infor-personal-doctor', data);
};

// GET DETAIL INFO DOCTOR ///
export const getDetailInfoDoctor = (doctorId) => {
    return axios.get('/api/get-detail-info-doctor', {
        params: {
            id: doctorId,
        },
    });
};
// GET FEEDBACK DOCTOR
export const getFeedbackDoctor = (doctorId) => {
    return axios.get('/api/feedback-doctor', {
        params: {
            doctorId,
        },
    });
};
//// BULK SCHEDULE DATA DOCTOR ///
export const bulkCreateScheduleService = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};
//// GET SCHEDULE DOCTOR BY DATE /////
export const getScheduleDoctorByDateService = (doctorId, date) => {
    return axios.get('/api/get-schedule-doctor-by-date', {
        params: {
            doctorId,
            date,
        },
    });
};
//
export const completeConfirmMedicalService = (data) => {
    return axios.post('/api/complete-confirm-medical', data);
};
/// GET LIST PATIENT  /////
export const getListPatientBooking = (doctorId, date) => {
    return axios.get('/api/get-list-patient-booking-medical', {
        params: {
            doctorId,
            date,
        },
    });
};
// POST INFO FORM BOOKING SCHEDULE MEDICAL

export const saveInfoBookingMedicalService = (data) => {
    return axios.post('/api/post-info-booking-medical', data);
};
// VERIFY INFO FROM CLIENT THROUNG EMAIL SENDING

export const postVerifyBookingSchedule = (data) => {
    return axios.post('/api/verify-booking-patient', data);
};
///// SPECIALTY ////
export const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty');
};
export const postInfoSpecialty = (data) => {
    return axios.post('/api/post-or-save-info-specialty', data);
};
export const getSpecialtyById = (id) => {
    return axios.get('/api/get-specialty-by-id', {
        params: {
            id: id,
        },
    });
};
export const getTopSpecialtyHome = (limit) => {
    return axios.get('/api/get-top-specialty', {
        headers: {
            key: 'List_Top_Specialty',
        },
        params: {
            limit: limit,
        },
    });
};
export const getDoctorBelongSpecialtyByProvince = (provinceId, type) => {
    return axios.get('/api/get-info-doctor-belong-specialty-by-province', {
        params: {
            provinceId,
            type,
        },
    });
};
//// CLINIC ////
export const postInfoClinic = (data) => {
    return axios.post('/api/post-info-clinic', data);
};
export const getTopClinicHome = (limit) => {
    return axios.get('/api/get-top-clinic-home', {
        headers: {
            key: 'List_Top_Clinic',
        },
        params: {
            limit,
        },
    });
};
export const getAllClinicService = () => {
    return axios.get('/api/get-all-clinic');
};
////

export default adminService;
