import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import localization from 'moment/locale/vi';
import * as actions from '../../store/actions';
import Select from 'react-select';
import DatePicker from '../../components/Input/DatePicker';
import FormattedDate from '../../components/Formating/FormattedDate';
import './Style/ScheduleDoctor.scss';
import { dateFormat } from '../../utils';
import { toast } from 'react-toastify';
import { bulkCreateScheduleService } from '../../services/adminService';
class ScheduleDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: [],
            dataAllDoctors: [],
            selectedDoctor: '',
            currentDate: new Date(),
            minDate: new Date(),
            doctorId: null,
            roleId: this.props.userInfo.roleId || ' ',
        };
    }
    async componentDidMount() {
        const { userInfo } = this.props;
        if (this.state.roleId === 'R2') {
            this.setState({
                doctorId: userInfo.id || null,
                selectedDoctor: {
                    value: userInfo.lastName,
                    label: userInfo.lastName,
                    id: userInfo.id,
                },
            });
            await this.props.fetchTimeSchedule('TIME');
        }
        if (this.state.roleId === 'R1') {
            await Promise.all([this.props.getAllDoctor(), this.props.fetchTimeSchedule('TIME')]);
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.TimeSchedule !== this.props.TimeSchedule) {
            const { TimeSchedule } = this.props;
            const data = TimeSchedule.map((item) => ({ ...item, isSelected: false }));
            this.setState({
                schedule: data,
            });
        }
        if (prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                dataAllDoctors: this.props.allDoctors,
            });
        }
    }
    ///// HANDLE CHANGE SELECT DOCTOR  ////
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    /// HANDLE ON CHANGE DATE PICKER ///////
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0] !== 'Invalid Date' ? date[0] : new Date(),
        });
    };
    //// HANDLE SELECT TIME RANGE /////
    handleSelectedRangeTime = async (id) => {
        const { schedule } = this.state;
        schedule.forEach((item) => {
            if (item.keyMap === id) {
                item.isSelected = !item.isSelected;
            }
        });
        this.setState({
            schedule: schedule,
        });
    };
    ////
    handleSaveSchedule = async () => {
        const { schedule, selectedDoctor, currentDate, roleId } = this.state;
        // format date
        const formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        const dateDateSend = moment(currentDate).startOf('day').valueOf();
        console.log(dateDateSend);
        /// filter range time
        let dataScheduleSelected = schedule.filter((item) => item.isSelected);

        dataScheduleSelected = dataScheduleSelected.map((item) => {
            return { doctorId: selectedDoctor.id, timeType: item.keyMap, date: dateDateSend };
        });

        // validate data
        if (!dataScheduleSelected.length) {
            toast('Invalid selected range time', { autoClose: 1500 });
        } else if (!selectedDoctor.id) {
            toast('Please choose Doctor!');
        } else if (!formatDate) {
            toast('Pick a date, please!');
        } else {
            const { data: response } = await bulkCreateScheduleService({
                arrSchedule: dataScheduleSelected,
                doctorId: selectedDoctor.id,
                date: dateDateSend,
            });
            toast.success(response.message, { autoClose: 1500 });
        }
        if (roleId === 'R1') {
            this.setState({
                schedule: this.state.schedule.map((item) => ({ ...item, isSelected: false })),
                selectedDoctor: null || '',
                currentDate: new Date(),
            });
        } else if (roleId === 'R2') {
            this.setState({
                schedule: this.state.schedule.map((item) => ({ ...item, isSelected: false })),
            });
        }
    };
    ///////////////////////////// \\ RENDER DISPLAY \\ ////////////////////////////////////////
    render() {
        const { dataAllDoctors, schedule } = this.state;
        const option = dataAllDoctors.map((doctor) => {
            const nameDoctor = doctor.lastName + ' ' + doctor.firstName;
            return {
                value: nameDoctor,
                label: nameDoctor,
                id: doctor.id,
            };
        });
        return (
            <div className="manage-schedule-doctor-system">
                <div className="title">MANAGE SCHEDULE </div>
                <div className="content-schedule mt-4">
                    <div className="container">
                        <div className="row">
                            {this.state.roleId === 'R1' && (
                                <>
                                    <div className="col col-6">
                                        Choose doctor
                                        <Select
                                            value={this.state.selectedDoctor}
                                            options={option}
                                            onChange={this.handleChangeSelect}
                                        />
                                    </div>
                                    <div className="col col-6">
                                        Pick a day
                                        <DatePicker
                                            className="form-control"
                                            onChange={this.handleOnChangeDatePicker}
                                            minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                            value={this.state.currentDate}
                                        />
                                    </div>
                                </>
                            )}
                            {this.state.roleId === 'R2' && (
                                <div className="d-flex justify-content-center">
                                    <div className="col col-12 w-25">
                                        Pick a day
                                        <DatePicker
                                            className="form-control"
                                            onChange={this.handleOnChangeDatePicker}
                                            minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                            value={this.state.currentDate}
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="col col-12  schedule-time-doctor">
                                {/* <FormattedDate value={this.state.currentDate} /> */}
                                {schedule &&
                                    schedule.map((time) => {
                                        return (
                                            <button
                                                className={
                                                    time.isSelected
                                                        ? 'btn btn-outline-secondary btn-selected'
                                                        : 'btn btn-schedule'
                                                }
                                                key={time.keyMap}
                                                onClick={() => this.handleSelectedRangeTime(time.keyMap)}
                                            >
                                                {time.valueEN}
                                            </button>
                                        );
                                    })}
                            </div>
                            <div className="col col-12  schedule-time-doctor">
                                <button className="btn btn-primary" onClick={this.handleSaveSchedule}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        TimeSchedule: state.admin.data,
        allDoctors: state.admin.allDoctors,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTimeSchedule: (type) => dispatch(actions.fetchApiStart(type)),
        getAllDoctor: () => dispatch(actions.getAllDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
