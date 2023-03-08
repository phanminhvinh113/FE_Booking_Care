import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.scss';
import { updateUserService } from '../../services/userService';

class ModalEditUser extends Component {
    ///// /////////////////
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            gender: '',
            id: null,
        };
    }
    //// GET DATA USER FROM DATA BASE ///

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
    ////// COMPONENT MOUNTED /////////
    componentDidMount() {
        this.setState({
            id: this.props.data.id,
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
            email: this.props.data.email,
            address: this.props.data.address,
            gender: this.props.data.gender,
        });
    }
    ////////////// VALIDATE USER BEFORE SAVE ////
    checkValidateInput = (dataValidata) => {
        const arrInput = Object.keys(dataValidata);
        for (let stateInput of arrInput) {
            if (this.state[stateInput] === '') {
                return false;
            }
        }
        return true;
    };
    /////////// SUBMIT FORM //////////

    handleSubmitForm = async () => {
        const isValid = this.checkValidateInput(this.state);
        if (isValid) {
            await this.props.updateUser(this.state);
        } else {
            alert('Missing Parameters!');
        }
    };

    ////// RENDER DISPLAY ///////////
    render() {
        return (
            <div className="text-center modal-edit-user">
                <Modal isOpen={this.props.isOpen} toggle={this.toggle} size="lg" centered>
                    <ModalHeader toggle={this.toggle}>UPDATE USER</ModalHeader>
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
                                <div className="col-md-3 flex">
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
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmitForm}>
                            Save
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
