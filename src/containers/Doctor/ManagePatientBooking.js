import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import emitter from '../../utils/emiiter';
import moment from 'moment';
import DatePicker from '../../components/Input/DatePicker';
import LoadingOverlay from 'react-loading-overlay';
import { getListPatientBooking } from '../../services/adminService';
import ModalSendBillMedical from './Modal/ModalSendBillMedical';
import './Style/ManagePatientBooking.scss';
class ManagePatientBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            listPatient: [],
            isOpenModal: false,
            infoPatient: {},
            isLoading: false,
        };
    }
    //
    async componentDidMount() {
        await this.getListPatient();
    }
    //
    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0] !== 'Invalid Date' ? date[0] : new Date(),
            },
            async () => {
                await this.getListPatient();
            },
        );
    };
    //
    getListPatient = async () => {
        const { id } = this.props.doctorInfo;
        const dateSend = moment(this.state.currentDate).startOf('day').valueOf(this.state.currentDate);
        const { data: res } = await getListPatientBooking(id, dateSend);
        if (res && res.errCode === 0) {
            this.setState({
                listPatient: res.data,
            });
        }
    };
    //
    handleInvoicingPatient = (user) => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            infoPatient: user,
        });
    };
    handleLoadingSending = () => {
        this.setState({
            isLoading: !this.state.isLoading,
        });
    };
    ///////////////////////////// \\ RENDER DISPLAY \\ ////////////////////////////////////////
    render() {
        const { currentDate, listPatient, isLoading } = this.state;
        const { doctorInfo } = this.props;
        const { firstName, lastName } = doctorInfo;
        return (
            <LoadingOverlay active={isLoading} spinner text="Loading ...">
                <div className="manage-list-schedule-patient-booking">
                    <div className="title">
                        DANH S??CH B???NH NH??N C???A B??C S?? {lastName} {firstName}:
                    </div>
                    <div className="list-patient mt-4 container">
                        <div className="row">
                            <div className="col col-4 " style={{ margin: '0 auto' }}>
                                <DatePicker
                                    className="form-control"
                                    value={currentDate}
                                    minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                    onChange={this.handleOnChangeDatePicker}
                                />
                            </div>
                        </div>
                        <div className="table-list-patient mt-4">
                            <table id="customers">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Time</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Gender</th>
                                        <th>Phone Number</th>
                                        <th colSpan={2}>Actions</th>
                                    </tr>
                                    {!!listPatient.length &&
                                        listPatient.map((user, index) => {
                                            const { patientData, timeTypeDataBooking, patientId } = user;
                                            const { genderData } = patientData;
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{timeTypeDataBooking.valueVI}</td>
                                                    <td>{patientData.firstName}</td>
                                                    <td>{patientData.address}</td>
                                                    <td>{genderData.valueVI}</td>
                                                    <td>{patientData.phonenumber}</td>
                                                    <td style={{ padding: '5px 15px', textAlign: 'center' }}>
                                                        <button
                                                            className="btn-bill"
                                                            onClick={() => this.handleInvoicingPatient(user)}
                                                        >
                                                            Xu???t h??a ????n
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                            {!listPatient.length && (
                                <div className="title mt-4">KH??NG C?? B???NH NH??N N??O ?????T L???CH V??O NG??Y N??Y</div>
                            )}
                        </div>
                        <ModalSendBillMedical
                            handleToggle={this.handleInvoicingPatient}
                            infoPatient={this.state.infoPatient}
                            isOpen={this.state.isOpenModal}
                            getListPatient={this.getListPatient}
                            handleLoadingSending={this.handleLoadingSending}
                        />
                    </div>
                </div>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        doctorInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatientBooking);
