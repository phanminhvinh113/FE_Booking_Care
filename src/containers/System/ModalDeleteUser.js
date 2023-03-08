import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.scss';
import { updateUserService } from '../../services/userService';

class ModalDeleteUser extends Component {
    ///// /////////////////
    constructor(props) {
        super(props);
    }
    //// GET DATA USER FROM DATA BASE ///

    //// TOGGLE MODAL FORM //////
    toggle = () => this.props.handleToggle();

    /////////// SUBMIT FORM //////////

    handleSubmitForm = async () => {
        console.log(this.props.data);
        this.props.deleteUser(this.props.data);
    };

    ////// RENDER DISPLAY ///////////
    render() {
        return (
            <div className="text-center modal-edit-user">
                <Modal isOpen={this.props.isOpen} toggle={this.toggle} size="lg">
                    <ModalHeader toggle={this.toggle}>UPDATE USER</ModalHeader>
                    <ModalBody>
                        <div className="Notification">This Feild Will Delete Forever</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.handleSubmitForm}>
                            Delete
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteUser);
