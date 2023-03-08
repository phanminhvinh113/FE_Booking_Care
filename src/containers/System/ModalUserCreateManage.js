import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emiiter';
import '../App.scss';

class ModalUser extends Component {
    ///// /////////////////
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            address: '',
            gender: '',
            phonenumber: '',
        };
        this.listenToEmiiter();
    }

    //// TOGGLE MODAL FORM //////
    toggle = () => this.props.handleToggle();

    ////// HANDLE ONCHANGE INPUT ///////
    handleOnchangeInput = async (e, id) => {
        const copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    ///// VALIDATE USER INFO /////
    checkValidateInput = () => {
        const arrInput = Object.keys(this.state);
        for (let stateInput of arrInput) {
            if (!this.state[stateInput]) {
                return false;
            }
        }
        return true;
    };

    ////// REFRESH DATA FORM MODAL AFTER CREATE /////
    listenToEmiiter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            /// RESET STATE
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                address: '',
                gender: '',
                phonenumber: '',
            });
        });
    }
    // refreshDataForm = () => {
    //     const copyInputArr = Object.keys(this.state);
    //     const copyInputObject = { ...this.state };
    //     copyInputArr.forEach((data) => {
    //         copyInputObject[data] = '';
    //         this.setState({
    //             ...copyInputObject,
    //         });
    //     });
    // };

    //// SUBMIT FORM //////////

    handleSubmitForm = () => {
        const isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewUser(this.state);
            !this.props.isOpen && this.refreshDataForm();
        } else {
            alert('Missing Parameters!');
        }
    };
    //// HANDLE CANCEL CREATE /////////
    handleCancleSubmit = async () => {
        //this.refreshDataForm();
        this.toggle();
    };

    ////// COMPONENT MOUNTED /////////
    componentDidMount() {}

    ////// RENDER DISPLAY ///////////
    render() {
        return (
            <div className="text-center modal-new-user">
                <Modal isOpen={this.props.isOpen} toggle={this.toggle} size="lg" centered>
                    <ModalHeader toggle={this.handleCancleSubmit}>CREATE NEW USER</ModalHeader>
                    <ModalBody>
                        <div className="">
                            <form className="row g-3 needs-validation" noValidate>
                                <div className="col col-md-6">
                                    <label htmlFor="validationCustom01" className="form-label">
                                        First name
                                    </label>
                                    <input
                                        onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                                        type="text"
                                        value={this.state.firstName}
                                        className="form-control"
                                        id="validationCustom01"
                                        placeholder="David..."
                                        required
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                </div>
                                <div className="col col-md-6">
                                    <label htmlFor="validationCustom02" className="form-label">
                                        Last name
                                    </label>
                                    <input
                                        onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                                        type="text"
                                        value={this.state.lastName}
                                        className="form-control"
                                        id="validationCustom02"
                                        placeholder="Nguyen..."
                                        required
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                </div>
                                <div className="col col-md-6">
                                    <label htmlFor="validationCustom02" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        onChange={(e) => this.handleOnchangeInput(e, 'password')}
                                        type="password"
                                        value={this.state.password}
                                        className="form-control"
                                        id="validationCustom02"
                                        placeholder="Password..."
                                        required
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                </div>
                                <div className="col col-md-6">
                                    <label htmlFor="validationCustom02" className="form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        onChange={(e) => this.handleOnchangeInput(e, 'confirmPassword')}
                                        type="password"
                                        value={this.state.confirmPassword}
                                        className="form-control"
                                        id="validationCustom02"
                                        placeholder="Confirm..."
                                        required
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="validationCustomUsername" className="form-label">
                                        Email
                                    </label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text" id="inputGroupPrepend">
                                            @
                                        </span>
                                        <input
                                            onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                            type="email"
                                            value={this.state.email}
                                            className="form-control"
                                            id="validationCustomUsername"
                                            placeholder="example@gmail.com"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                        />
                                        <div className="invalid-feedback">Please choose a username.</div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="validationCustom03" className="form-label">
                                        Address
                                    </label>
                                    <input
                                        onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                        type="text"
                                        value={this.state.address}
                                        className="form-control"
                                        id="validationCustom03"
                                        required
                                    />
                                    <div className="invalid-feedback">Please provide a valid city.</div>
                                </div>
                                <div className="col-md-4 flex">
                                    <label htmlFor="validationCustom04" className="form-label">
                                        Gender
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
                                        <option value={0}>Female</option>
                                        <option value={1}>Male</option>
                                    </select>
                                    <div className="invalid-feedback">Please select a valid state.</div>
                                </div>
                                <div className="col-md-6 ">
                                    <label htmlFor="validationCustom05" className="form-label">
                                        Your Phone
                                    </label>
                                    <input
                                        onChange={(e) => this.handleOnchangeInput(e, 'phonenumber')}
                                        type="text"
                                        value={this.state.phonenumber}
                                        className="form-control"
                                        id="validationCustom05"
                                        placeholder="+84..."
                                        required
                                    />
                                    <div className="invalid-feedback">Please provide a valid zip.</div>
                                </div>
                                <div className="col-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                        <label className="form-check-label" htmlFor="invalidCheck">
                                            Agree to terms and conditions
                                        </label>
                                        <div className="invalid-feedback">You must agree before submitting.</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmitForm}>
                            Create
                        </Button>{' '}
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
