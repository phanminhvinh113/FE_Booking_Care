import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import { BeatLoader, DotLoader, PulseLoader } from 'react-spinners';
import moment from 'moment';
import { saveInfoBookingMedicalService } from '../../../services/adminService';
import './Style/ModalBooking.scss';

/////
class ModalBooking extends Component {
    constructor(props) {
        super(props);
        const { dateBooking, infoDoctor } = this.props;
        this.state = {
            isSending: false,
            nameDoctor: infoDoctor.lastName + ' ' + infoDoctor.firstName,
            emailDoctor: infoDoctor.email,
            email: '',
            date: dateBooking.date,
            time: dateBooking.timeTypeData,
            timeType: dateBooking.timeType,
            backdrop: true,
            namePatient: '',
            address: '',
            gender: '',
            phonenumber: '',
            reason: '',
            infoDoctor: infoDoctor,
        };
    }
    //// DID MOUNT ////
    async componentDidMount() {}
    //
    toggle = () => this.props.toggle();
    ///// DID UPDATE /////
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { dateBooking, infoDoctor, isLoggedIn, userInfo } = this.props;
        if (prevProps.dateBooking !== dateBooking) {
            this.setState({
                date: dateBooking.date,
                time: dateBooking.timeTypeData,
                timeType: dateBooking.timeType,
                email: isLoggedIn ? userInfo?.email : '',
                namePatient: isLoggedIn ? userInfo?.firstName + ' ' + userInfo?.lastName : '',
            });
        }
        if (prevProps.infoDoctor !== infoDoctor) {
            this.setState({
                infoDoctor,
                nameDoctor: infoDoctor.lastName + +infoDoctor.firstName,
            });
        }
    }
    //
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    //
    handleOnchangeInput = async (e, id) => {
        const copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };
    ///
    //// HANDLE CANCEL CREATE /////////
    handleCancleSubmit = () => {
        //this.refreshDataForm();
        this.toggle();
        this.setState({
            emailDoctor: '',
            email: '',
            date: '',
            time: '',
            namePatient: '',
            address: '',
            gender: '',
            phonenumber: '',
            reason: '',
            infoDoctor: {},
        });
    };
    //
    checkValidateInput = () => {
        const arrInput = ['email', 'namePatient', 'address', 'gender', 'phonenumber', 'reason'];
        for (let stateInput of arrInput) {
            if (!this.state[stateInput]) {
                toast.error(`Missing: ${this.capitalizeFirstLetter(stateInput)}`);
                return false;
            }
        }
        return true;
    };

    //
    handleSubmitFormBooking = async () => {
        const { email, phonenumber, address, timeType, date, time, reason, gender, namePatient, nameDoctor, emailDoctor } = this.state;
        if (this.checkValidateInput()) {
            this.toggle();
            this.setState({
                isSending: true,
            });

            const { data: res } = await saveInfoBookingMedicalService({
                emailDoctor,
                nameDoctor,
                doctorId: this.props.doctorId,
                email,
                phonenumber,
                address,
                timeType,
                time,
                date,
                gender,
                reason,
                namePatient,
            });

            if (res) {
                if (res.errCode === 1) {
                    toast.error(res.message, {
                        theme: 'light',
                    });
                } else if (res.errCode === 0) {
                    toast.success(res.message);
                } else if (res.errCode !== 0) {
                    toast.error('falied! try again ');
                }
                this.setState({
                    isSending: false,
                    email: '',
                    date: '',
                    time: '',
                    timeType: '',
                    namePatient: '',
                    address: '',
                    gender: '',
                    phonenumber: '',
                    reason: '',
                    infoDoctor: this.props.infoDoctor,
                });
            }
        }
    };

    //// RENDER ///
    render() {
        const { infoDoctor, time, date, nameDoctor, isSending } = this.state;
        const { isOpen } = this.props;
        const { DoctorInfo, positionData, firstnamePatient } = infoDoctor;

        return (
            <Fragment>
                {isSending && (
                    <div>
                        <div className="background-loading-sending-email">
                            <DotLoader className="loading-model-booking" loading={isSending} size={65} color="#45c3d2" />
                            <div className="sending">
                                <p> Sending </p>
                                <BeatLoader loading={isSending} size={7} color="#fff" />
                            </div>
                        </div>
                    </div>
                )}
                <Modal
                    isOpen={isOpen}
                    toggle={this.props.toggle}
                    backdrop={this.props.backdrop}
                    centered
                    size="lg"
                    className="modal-booking-schedule-medical"
                >
                    <ModalHeader toggle={this.toggle} className="header">
                        <div className="left">
                            <img src={infoDoctor.image && infoDoctor.image} />
                        </div>
                        <div className="right">
                            <header>ĐẶT LỆNH KHÁM BỆNH: </header>
                            <h3>
                                {positionData && positionData.valueVI && positionData.valueVI + ': '}
                                {nameDoctor}
                                {firstnamePatient && firstnamePatient}
                            </h3>
                            <div className="day-booking">
                                <span>{!!time && time.valueVI} </span>
                                <span>{!!date && this.capitalizeFirstLetter(moment(date).format('dddd - DD/MM/YYYY'))}</span>
                            </div>
                            <div className="mt-2">Giá Khám: {DoctorInfo && DoctorInfo.price && DoctorInfo.price.valueVI}đ </div>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <form className="row g-3 needs-validation" noValidate>
                                <div className="col col-12">
                                    <input
                                        onChange={(e) => this.handleOnchangeInput(e, 'namePatient')}
                                        type="text"
                                        value={this.state.namePatient}
                                        className="form-control"
                                        id="validationCustom01"
                                        placeholder="Trần Văn Phú"
                                        required
                                    />
                                    <label htmlFor="validationCustom01" className="form-label">
                                        Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú
                                    </label>
                                    <div className="valid-feedback">Looks good!</div>
                                </div>
                                <div className="col col-12">
                                    <input
                                        onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                        type="email"
                                        value={this.state.email}
                                        className="form-control"
                                        id="validationCustom01"
                                        placeholder="TranPhu@gmail.com"
                                        required
                                    />
                                    <label htmlFor="validationCustom01" className="form-label">
                                        Hãy nhập chính xác email của bạn!
                                    </label>
                                    <div className="valid-feedback">Looks good!</div>
                                </div>

                                <div className="col-md-12">
                                    <input
                                        onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                        type="text"
                                        value={this.state.address}
                                        className="form-control"
                                        id="validationCustom03"
                                        placeholder="Thôn, Xã, Phường, Huyện, Thị Trấn , Tỉnh Thành Phố ..."
                                        required
                                    />
                                    <label htmlFor="validationCustom03" className="form-label">
                                        Địa chỉ bản thân (bắt buộc)
                                    </label>
                                    <div className="invalid-feedback">Please provide a valid city.</div>
                                </div>

                                <div className="col-12 ">
                                    <input
                                        onChange={(e) => this.handleOnchangeInput(e, 'phonenumber')}
                                        type="text"
                                        value={this.state.phonenumber}
                                        className="form-control"
                                        id="validationCustom05"
                                        placeholder="+84..."
                                        required
                                    />
                                    <label htmlFor="validationCustom05" className="form-label">
                                        Số điện thoại để liên hệ (bắt buộc)
                                    </label>
                                    <div className="invalid-feedback">Số điện thoại.</div>
                                </div>
                                <div className="col col-12">
                                    <input
                                        onChange={(e) => this.handleOnchangeInput(e, 'reason')}
                                        type="text"
                                        value={this.state.reason}
                                        className="form-control"
                                        id="validationCustom02"
                                        placeholder="Lí do khám bệnh"
                                        required
                                    />
                                    <label htmlFor="validationCustom02" className="form-label">
                                        Lí do khám bệnh
                                    </label>
                                    <div className="valid-feedback">Looks good!</div>
                                </div>

                                <div className="col-md-4 flex">
                                    <label htmlFor="validationCustom04" className="form-label">
                                        Giới tính
                                    </label>
                                    <select
                                        className="form-select"
                                        id="validationCustom04"
                                        required
                                        onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                                        value={this.state.gender}
                                    >
                                        <option disabled value="">
                                            Choose...
                                        </option>
                                        <option value={'F'}>Female</option>
                                        <option value={'M'}>Male</option>
                                        <option value={'O'}>Other</option>
                                    </select>
                                    <div className="invalid-feedback">Please select a valid state.</div>
                                </div>
                                <div className="col-12">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="invalidCheck"
                                            required
                                            defaultChecked
                                        />
                                        <label className="form-check-label" htmlFor="invalidCheck">
                                            Bạn có sử dụng bảo hiểm (tư nhân)?
                                        </label>
                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmitFormBooking}>
                            Đặt lịch khám
                        </Button>
                        <Button color="secondary" onClick={this.handleCancleSubmit}>
                            Hủy bỏ
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
