import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../../App.scss';
import { CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import { completeConfirmMedicalService } from '../../../services/adminService';
import { toast } from 'react-toastify';

class ModalSendBillMedical extends Component {
    ///// /////////////////
    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            patientId: '',
            email: '',
            image: '',
            urlImage: '',
            isDownloadImage: false,
            isOpenImage: false,
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.infoPatient !== this.props.infoPatient && this.props.infoPatient) {
            const { patientData, id, doctorId, token, timeType, patientId } = this.props.infoPatient;
            const { firstName, lastName } = this.props.doctorInfo;
            const nameDoctor = lastName + firstName;
            console.log(this.props.infoPatient);
            this.setState({
                email: patientData.email,
                patientId,
                doctorId,
                token,
                timeType,
                namePatient: patientData.firstName,
                nameDoctor,
            });
        }
    }
    //// TOGGLE MODAL FORM //////
    toggle = () => this.props.handleToggle();

    ////// HANDLE ONCHANGE INPUT ///////
    handleOnchangeInput = (e) => {
        const copyState = { ...this.state };
        copyState[e.target.name] = e.target.value;
        this.setState(
            {
                ...copyState,
            },
            () => console.log(this.state),
        );
    };
    //
    hanldeOnSelectImageBill = async (e) => {
        this.setState({
            isDownloadImage: true,
        });
        const file = e.target.files[0];
        if (file) {
            const base64 = await CommonUtils.convertBase64(file);
            this.setState({
                image: base64,
                urlImage: URL.createObjectURL(file),
            });
        }
    };
    //
    handlePreviewImage = () => {
        this.setState({
            isOpenImage: false,
        });
    };
    //
    handleOnClosePreview = () => {
        this.setState({
            isOpenImage: false,
        });
    };
    ///// VALIDATE USER INFO /////

    //// SUBMIT FORM //////////

    handleSubmitForm = async () => {
        this.toggle();
        this.props.handleLoadingSending();
        const { data: res } = await completeConfirmMedicalService(this.state);
        if (res && res.errCode === 0) {
            this.props.handleLoadingSending();
            toast.success(res.message);
            this.setState({
                doctorId: '',
                patientId: '',
                email: '',
                image: '',
                urlImage: '',
                isDownloadImage: false,
                isOpenImage: false,
            });
            await this.props.getListPatient();
        } else {
            toast.error(res.message);
        }
    };
    //// HANDLE CANCEL CREATE /////////
    handleCancleSubmit = async () => {
        this.setState({
            doctorId: '',
            patientId: '',
            email: '',
            image: '',
            urlImage: '',
            isDownloadImage: false,
            isOpenImage: false,
        });
        this.toggle();
    };

    ////// COMPONENT MOUNTED /////////

    ////// RENDER DISPLAY ///////////
    render() {
        return (
            <div className="text-center modal-new-user">
                <Modal isOpen={this.props.isOpen} toggle={this.toggle} size="lg" centered>
                    <ModalHeader toggle={this.handleCancleSubmit}>BILL</ModalHeader>
                    <ModalBody>
                        <div className="">
                            <form className="row g-3 needs-validation" noValidate>
                                <div className="col col-12">
                                    <label>Email Bệnh Nhân</label>
                                    <input
                                        type="text"
                                        className="form-control "
                                        name="email"
                                        placeholder="email@"
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnchangeInput(e)}
                                    />
                                </div>
                                <div className="col col-6">
                                    <label>Hóa đơn</label>
                                    <input
                                        type="file"
                                        className="form-control "
                                        onChange={(e) => this.hanldeOnSelectImageBill(e)}
                                    />
                                </div>
                                <div className="col-6">
                                    {this.state.isDownloadImage && (
                                        <>
                                            <div
                                                className="preview-image mt-2"
                                                onClick={this.handlePreviewImage}
                                                style={{
                                                    backgroundImage: `url(${this.state.urlImage}) `,
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                }}
                                            ></div>
                                            {this.state.isOpenImage && (
                                                <Lightbox
                                                    mainSrc={this.state.urlImage}
                                                    onCloseRequest={this.handleOnClosePreview}
                                                />
                                            )}
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmitForm}>
                            Send
                        </Button>
                        <Button color="secondary" onClick={this.handleCancleSubmit}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalSendBillMedical);
