import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { auth, CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-image-lightbox/style.css';
import './Style/UserRedux.scss';
import TableUser from './TableUser';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            isOpenImage: false,
            isDownloadImage: false,
            isEditUser: false,
            isChangeImgae: false,
            ////
            urlImage: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            role: '',
            position: '',
            image: '',
        };
        this.promises = [
            this.props.getApiStart('GENDER'),
            this.props.getApiStart('ROLE'),
            this.props.getApiStart('POSITION'),
            this.props.getAllUser(),
        ];
    }
    ////////////
    async componentDidMount() {
        await Promise.all(this.promises);
        if (
            this.props.auth.errCode === -2 ||
            this.props.auth.message === auth.AUTH_FAILED ||
            this.props.auth.message === auth.TOKEN_EXPRIE
        ) {
            this.props.processLogout();
        }
        console.log(this.getCookie('refresh_token'));
    }
    /////////
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { dataUser } = this.props;
        if (
            this.props.auth.errCode === -2 ||
            this.props.auth.message === auth.AUTH_FAILED ||
            this.props.auth.message === auth.TOKEN_EXPRIE
        ) {
            this.props.processLogout();
        }
        if (prevProps.dataUser !== dataUser) {
            if (dataUser[0].type === 'GENDER')
                this.setState({
                    genderArr: dataUser,
                });
            if (dataUser[0].type === 'ROLE')
                this.setState({
                    roleArr: dataUser,
                });
            if (dataUser[0].type === 'POSITION')
                this.setState({
                    positionArr: dataUser,
                });
        }
    }
    // GET DATA FROM COOKIES
    getCookie(cookieName) {
        const name = cookieName + '=';
        const decodedCookie = decodeURIComponent(document.cookie);

        let ca = decodedCookie.split(';');
        console.log(decodedCookie, ca);
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
    //// HANDLE CHANGE INPUT /////
    handleOnChangeInput = (e, id) => {
        const copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    ///// HANDLE UP LOAD IMAGE ////
    handleChangeImage = async (e) => {
        this.setState({
            isDownloadImage: true,
            isChangeImgae: true,
        });
        const file = e.target.files[0];
        if (file) {
            const base64 = await CommonUtils.convertBase64(file);
            this.setState({
                urlImage: URL.createObjectURL(file),
                image: base64,
            });
        }
    };

    /////// PREVIEW IMAGE //////
    handlePreviewImage = () => {
        this.setState({
            isOpenImage: true,
        });
    };
    ////// VALIDATE SUBMIT FORM ////////

    checkValidateInput = () => {
        const arrInput = ['firstName', 'lastName', 'email', 'password', 'address', 'phonenumber', 'gender', 'role', 'position'];
        for (let stateInput of arrInput) {
            if (!this.state[stateInput] || this.state[stateInput] === 'null') {
                toast.warn(`Missing Parameters: ${stateInput}`, {
                    autoClose: 1500,
                });

                return false;
            }
        }

        return true;
    };

    /////// HANDLE SUBMIT FORM ///////////
    handleSubmitForm = async () => {
        const isValid = this.checkValidateInput();
        if (isValid) {
            await this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.image,
            });
            await this.props.getAllUser();
            this.setState(
                {
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phonenumber: '',
                    gender: '',
                    role: '',
                    position: '',
                    urlImage: '',
                    image: '',
                    isDownloadImage: false,
                    isChangeImgae: false,
                },
                () => {
                    console.log('state after add new user:', this.state);
                },
            );
        }
    };
    // HANDLE UPDATE USER //
    handleUpdateUser = async () => {
        const isValid = this.checkValidateInput();
        if (isValid) {
            const dataUserUpdate = {
                id: this.props.dataUserById.id,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
            };
            this.state.isChangeImgae && (dataUserUpdate.image = this.state.image);
            await this.props.updateUser(dataUserUpdate);
            await this.props.getAllUser();
            this.setState(
                {
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phonenumber: '',
                    gender: '',
                    role: '',
                    position: '',
                    urlImage: '',
                    image: '',
                    isEditUser: false,
                    isDownloadImage: false,
                    isChangeImgae: false,
                },
                () => {
                    console.log('state after update:', this.state);
                },
            );
        }
    };
    ///// HANDLE GET A USER THROUGH ID /////
    handleGetUserById = async (id) => {
        await this.props.getDataUserById(id);
        const dataUser = this.props.dataUserById;
        let imageBase64 = '';
        if (dataUser.image) {
            imageBase64 = Buffer.from(dataUser.image, 'base64').toString('binary');
        }
        this.setState(
            {
                isEditUser: true,
                email: dataUser.email,
                password: 'password',
                firstName: dataUser.firstName,
                lastName: dataUser.lastName,
                address: dataUser.address,
                phonenumber: dataUser.phonenumber,
                gender: dataUser.gender,
                role: dataUser.roleId,
                position: dataUser.positionId,
                image: dataUser.image || '',
                isDownloadImage: true,
                urlImage: imageBase64,
            },
            () => {
                console.log('state when get user:', this.state);
            },
        );
    };

    /////////////////////////////////////////////
    render() {
        const { isEditUser, email, password, firstName, lastName, phonenumber, gender, role, position, address } = this.state;

        return (
            <div className="container mt-4">
                <form className="row g-3 ">
                    <div className="col col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputPassword"
                            value={firstName}
                            onChange={(e) => this.handleOnChangeInput(e, 'firstName')}
                        />
                    </div>
                    <div className="col col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputPassword"
                            value={lastName}
                            onChange={(e) => this.handleOnChangeInput(e, 'lastName')}
                        />
                    </div>
                    <div className="col col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            value={email}
                            onChange={(e) => this.handleOnChangeInput(e, 'email')}
                            disabled={isEditUser}
                        />
                    </div>
                    <div className="col col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            value={password}
                            onChange={(e) => this.handleOnChangeInput(e, 'password')}
                            disabled={isEditUser}
                        />
                    </div>
                    <div className=" col col-6">
                        <label htmlFor="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="..."
                            value={address}
                            onChange={(e) => this.handleOnChangeInput(e, 'address')}
                        />
                    </div>

                    <div className="col col-md-4">
                        <label htmlFor="inputZip" className="form-label">
                            Phone Number
                        </label>
                        <input
                            type={isEditUser ? 'password' : 'tex'}
                            className="form-control"
                            id="inputZip"
                            value={!isEditUser && phonenumber}
                            onChange={(e) => this.handleOnChangeInput(e, 'phonenumber')}
                            disabled={isEditUser}
                        />
                    </div>
                    <div className="col col-md-3">
                        <label htmlFor="inputState" className="form-label">
                            Gender
                        </label>
                        <select
                            id="inputState"
                            className="form-select"
                            onChange={(e) => this.handleOnChangeInput(e, 'gender')}
                            value={gender}
                        >
                            <option selected value="">
                                Choose...
                            </option>
                            {this.state.genderArr.map((item, index) => (
                                <option key={index} value={item.keyMap}>
                                    {item.valueEN}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col col-md-3">
                        <label htmlFor="inputState" className="form-label">
                            Role
                        </label>
                        <select
                            id="inputState"
                            className="form-select"
                            defaultValue={this.state}
                            onChange={(e) => this.handleOnChangeInput(e, 'role')}
                            value={role}
                        >
                            <option selected value="">
                                Choose...
                            </option>
                            {this.state.roleArr.map((item, index) => (
                                <option key={index} value={item.keyMap}>
                                    {item.valueEN}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col col-md-3">
                        <label htmlFor="inputState" className="form-label">
                            Position
                        </label>
                        <select
                            id="inputState"
                            className="form-select"
                            onChange={(e) => this.handleOnChangeInput(e, 'position')}
                            value={position}
                        >
                            <option selected value="">
                                Choose...
                            </option>
                            {this.state.positionArr.map((item, index) => (
                                <option key={index} value={item.keyMap}>
                                    {item.valueEN}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-3 mb-3">
                        <label htmlFor="formFile" className="form-label">
                            Image
                        </label>
                        <input className="form-control" type="file" id="formFile" onChange={(e) => this.handleChangeImage(e)} />
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
                                        onCloseRequest={() => this.setState({ isOpenImage: false })}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </form>
                <button
                    className={isEditUser ? 'btn btn-warning' : 'btn btn-primary'}
                    onClick={isEditUser ? this.handleUpdateUser : this.handleSubmitForm}
                >
                    {isEditUser ? 'Save' : 'Add'}
                </button>
                <TableUser handleEditUser={this.handleGetUserById} dataAllUser={this.props.dataAllUser} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataUser: state.admin.data,
        dataUserById: state.admin.userById,
        dataAllUser: state.admin.allUsers,
        auth: state.admin.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getApiStart: (type) => dispatch(actions.fetchApiStart(type)),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        getDataUserById: (id) => dispatch(actions.getUserId(id)),
        updateUser: (user) => dispatch(actions.updateUser(user)),
        getAllUser: () => dispatch(actions.getAllUser()),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
