import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import _ from 'lodash';
import localization from 'moment/locale/vi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faHandPointUp } from '@fortawesome/free-regular-svg-icons';
import { getScheduleDoctorByDateService } from '../../../services/adminService';
import ModalBooking from './ModalBooking';
import './Style/MedicalExaminationSchedule.scss';

/////
class MedicalExaminationSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            currentDay: moment(new Date()).startOf('day').valueOf(),
            scheduleDoctorByDate: [],
            isOpenModalBooking: false,
            nameDoctor: '',
            dateSlected: {},
            infoDoctor: this.props.inforDoctor,
        };
    }
    //// DID MOUNT ////
    async componentDidMount() {
        // console.log('VN: ', moment(new Date()).format('dddd - DD/MM'));
        // console.log('EN: ', moment(new Date()).locale('en').format('ddd- DD/MM'));
        let arrDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                object.lable = 'Hôm nay' + ' - ' + moment(new Date()).add(i, 'days').format('DD/MM');
            } else {
                object.lable = this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'));
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDay.push(object);
        }
        const { data: response } = await getScheduleDoctorByDateService(this.props.doctorId, this.state.currentDay);
        this.setState({
            allDays: arrDay,
            scheduleDoctorByDate: response.data,
        });
    }
    ///// DID UPDATE /////
    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { inforDoctor } = this.props;
        if (prevProps.inforDoctor !== inforDoctor) {
            this.setState({
                inforDoctor,
            });
        }
    }
    /// CAPITAL FIRST LECTER ////
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    /////
    handleOnChangeSelectDate = async (e) => {
        const date = e.target.value;
        const { data: response } = await getScheduleDoctorByDateService(this.props.doctorId, date);
        this.setState({
            scheduleDoctorByDate: response.data,
        });
    };
    //
    handleBookingSchdule = (data) => {
        if (data) {
            const { date, timeType, timeTypeData } = data;
            this.setState({
                dateSlected: { date, timeType, timeTypeData },
            });
        }
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking,
        });
    };
    //
    handleSendingEmailBooking = () => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking,
        });
    };
    //// RENDER ///
    render() {
        const { allDays, scheduleDoctorByDate } = this.state;
        return (
            <div className="schedule-medical-booking-doctor">
                <div className="day-of-week">
                    <select className="select" onChange={(e) => this.handleOnChangeSelectDate(e)}>
                        {allDays &&
                            allDays.length &&
                            allDays.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.lable}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="calendar mt-3">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <strong> ĐẶT LỊCH KHÁM</strong>
                </div>
                <div className="range-time">
                    {scheduleDoctorByDate &&
                        !!scheduleDoctorByDate.length &&
                        scheduleDoctorByDate.map((item, index) => (
                            <button key={index} onClick={() => this.handleBookingSchdule(item)}>
                                {item.timeTypeData.valueVI}
                            </button>
                        ))}
                    {!scheduleDoctorByDate.length && (
                        <span style={{ color: '#3384c5', fontStyle: 'italic', paddingTop: '10px' }}>
                            Không có lịch hẹn trong thời gian này! Quý khách có thể chọn một ngày khác
                        </span>
                    )}
                </div>
                <div className="price-booked">
                    Chọn và đặt
                    <span>
                        <FontAwesomeIcon icon={faHandPointUp} />
                    </span>
                    (Phí đặt lịch 0 <sup>đ</sup>)
                </div>
                <ModalBooking
                    isOpen={this.state.isOpenModalBooking}
                    toggle={this.handleBookingSchdule}
                    infoDoctor={this.props.inforDoctor}
                    dateBooking={this.state.dateSlected}
                    doctorId={this.props.doctorId}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalExaminationSchedule);
