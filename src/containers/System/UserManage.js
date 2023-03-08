import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalUserCreate from './ModalUserCreateManage';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import { emitter } from '../../utils/emiiter';
import { createNewUserService, deleteUserService, getUserIdServive, updateUserService } from '../../services/userService';
import './userManage.scss';
import { auth } from '../../utils';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: this.props.dataAllUser,
            userInfo: {},
            userDelete: {},
            isOpenCreateModal: false,
            isOpenEditModal: false,
            isOpenDeleteModal: false,
        };
    }
    //////////////////////// COMPONENT MOUNTED /////////////////////////////

    async componentDidMount() {
        await this.props.getAllUser();
        if (
            this.props.auth.errCode === -2 ||
            this.props.auth.message === auth.AUTH_FAILED ||
            this.props.auth.message === auth.TOKEN_EXPRIE
        ) {
            this.props.processLogout();
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataAllUser !== this.props.dataAllUser) {
            this.setState({
                arrUsers: this.props.dataAllUser,
            });
        }
        if (
            this.props.auth.errCode === -2 ||
            this.props.auth.message === auth.AUTH_FAILED ||
            this.props.auth.message === auth.TOKEN_EXPRIE
        ) {
            this.props.processLogout();
        }
    }

    ////////// HANDLE ON MODAL TO ADD NEW USER //////

    handleAddNewUserModal = () => {
        this.setState({
            isOpenCreateModal: !this.state.isOpenCreateModal,
        });
    };
    /////////// HANDLE TOGGLE MODAL ////////

    handleToggleModal = () => {};

    //////////// CREATE NEW USER /////

    createNewUser = async (data) => {
        try {
            const response = await createNewUserService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenCreateModal: !this.state.isOpenCreateModal,
                });
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
            await this.getAllUsers();
        } catch (error) {
            alert(error);
        }
    };
    //////// HANDLE EDIT USER /////
    handleEditUser = async (user) => {
        if (user) {
            const response = await getUserIdServive(user.id);
            this.setState({
                isOpenEditModal: !this.state.isOpenEditModal,
                userInfo: response.users,
            });
        }
    };
    ////// OPEN MODAL EDIT ///////
    handleEditUserModal = async () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal,
        });
    };
    //// HANDLE UPDATE USER ///
    handleUpdateUser = async (data) => {
        await updateUserService(data);
        this.getAllUsers();
        this.setState({
            isOpenEditModal: false,
        });
    };
    ////// OPEN MODAL DELETE USER ///
    handleDeleteUserModal = (user) => {
        this.setState({
            isOpenDeleteModal: !this.state.isOpenDeleteModal,
            userDelete: user,
        });
    };
    ///// DELETE USER VIA ID USER  ///////////
    handleDeleteUser = async (user) => {
        const response = await deleteUserService(user.id);
        if (response && response.errCode === 0) {
            await this.getAllUsers();
            this.setState({
                isOpenDeleteModal: !this.state.isOpenDeleteModal,
            });
        }
    };
    ///////////////////////////// \\ RENDER DISPLAY \\ ////////////////////////////////////////
    render() {
        const dataAllUsers = this.state.arrUsers;
        return (
            <div className="justify-content container ">
                <div className="title text-center">Manage users</div>
                {/*   MODAL CREATE USER */}
                <ModalUserCreate
                    isOpen={this.state.isOpenCreateModal}
                    handleToggle={this.handleAddNewUserModal}
                    createNewUser={this.createNewUser}
                    size="lg"
                />
                {/*   MODAL EDIT USER */}
                {this.state.isOpenEditModal && (
                    <ModalEditUser
                        isOpen={this.state.isOpenEditModal}
                        handleToggle={this.handleEditUserModal}
                        data={this.state.userInfo}
                        updateUser={this.handleUpdateUser}
                    />
                )}
                {/*   MODAL DELETE USER */}
                {this.state.isOpenDeleteModal && (
                    <ModalDeleteUser
                        isOpen={this.state.isOpenDeleteModal}
                        handleToggle={this.handleDeleteUserModal}
                        data={this.state.userDelete}
                        deleteUser={this.handleDeleteUser}
                    />
                )}
                <button type="button" className="btn btn-primary mt-2 px-3" onClick={() => this.handleAddNewUserModal()}>
                    <FontAwesomeIcon className="me-2" icon={faPlus} />
                    ADD NEW USER
                </button>
                <div
                    className="moda fadel"
                    id="ModalAddNewUser"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                ></div>
                <div className="table-content mt-4  ">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                            {dataAllUsers &&
                                dataAllUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td style={{ padding: 0 }}>
                                            <button
                                                style={{
                                                    border: 'none',
                                                    width: '25px',
                                                    backgroundColor: 'transparent',
                                                }}
                                                onClick={() => this.handleEditUser(user)}
                                            >
                                                <FontAwesomeIcon icon={faPencil} style={{ color: '#F0A700' }} />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                style={{
                                                    border: 'none',
                                                    width: '25px',
                                                    backgroundColor: 'transparent',
                                                }}
                                                onClick={() => this.handleDeleteUserModal(user)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.admin.auth,
        dataAllUser: state.admin.allUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUser: () => dispatch(actions.getAllUser()),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
