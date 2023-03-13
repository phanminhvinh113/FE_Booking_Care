import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router';
import brcypt from 'bcryptjs';
import * as actions from '../../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { handleLogInUserService } from '../../services/userService';
import { auth, path, ROLE_USER, TITLE_BROWSWER } from '../../utils/constant';
import './Login.scss';
import { Link } from 'react-router-dom';

class Login extends Component {
    ///////////////////\\INITIAL VALUES\\///////////////////////////////////
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            isHidden: false,
            errMessage: '',
            isErrLogin: false,
            notification: null,
        };
    }
    //
    componentDidMount() {
        document.title = TITLE_BROWSWER.Login;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {}
    //

    ///////////////////\\HANDLE VALUE INPUT\\////////////////////////////

    handleOnchangeUserName = (e) => {
        if (e.keyCode === 13) {
            this.handleLogIn();
        }
        this.setState({
            isErrLogin: false,
            userName: e.target.value,
        });
    };
    // PASSWORD
    handleOnchangePassword = (e) => {
        if (e.keyCode === 13) {
            this.handleLogIn();
        }
        this.setState({
            isErrLogin: false,
            passWord: e.target.value,
        });
    };
    // HASH PASSSWORD
    hashPassword = async (password) => {
        try {
            const hash = brcypt.hashSync(password, this.salt);
            return hash;
        } catch (error) {
            alert(error);
        }
    };
    //
    sessionStorageToken = (name, token) => {
        sessionStorage.removeItem(name);
        sessionStorage.setItem(name, token);
    };
    //////////////////\\HANDLE LOGIN USER\\/////////////////////
    handleLogIn = async () => {
        try {
            const { data } = await handleLogInUserService(this.state.userName, this.state.passWord);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message ? data.message : data.Message,
                    isErrLogin: true,
                });
            } else if (data && data.errCode === 0) {
                ////\IF ACCOUNT CORRECT\////
                if (data.user.roleId === ROLE_USER.ADMIN) {
                    this.props.history.push(path.ADMIN_REDIRECT_LOGGIN);
                }
                //
                if (data.user.roleId === ROLE_USER.DOCTOR) {
                    this.props.history.push(path.DOCTOR_REDIRECT_LOGGIN);
                }
                //
                if (data.user.roleId === ROLE_USER.PATIENT) {
                    this.props.history.push(path.HOMEPAGE);
                }
                //
                this.setState({
                    isErrLogin: false,
                });
                //
                const { access_token } = data?.token;
                this.sessionStorageToken('access_token', access_token);
                //
                await this.props.userLogInSucces(data.user);
            }
        } catch (error) {
            this.setState({
                errMessage: error,
                isErrLogin: true,
            });
        }
    };
    //

    ////////////////\\HANDLE HIDDEN PASSWORD\\/////////////////
    handleHidePassword = () => {
        this.setState({
            isHidden: !this.state.isHidden,
        });
    };
    //////////////////////////\\RENDER DISPLAY\\/////////////////////////////
    render() {
        return (
            <div className="container_login_background">
                <div className="login_form ">
                    <div className="header">
                        <h2>Login</h2>
                    </div>
                    <div className="content">
                        <div className="Email">
                            <label htmlFor="Email">UserName</label>
                            <input
                                type={'email'}
                                id="Email"
                                value={this.state.userName}
                                className="form-control"
                                placeholder="Example@gmail.com"
                                onChange={(e) => this.handleOnchangeUserName(e)}
                                onKeyUp={(e) => this.handleOnchangeUserName(e)}
                            />
                        </div>
                        <div className="Password">
                            <label htmlFor="Password">Password</label>
                            <input
                                type={!this.state.isHidden ? 'password' : 'text'}
                                id="Password"
                                className="form-control passWord_Input"
                                placeholder="Password..."
                                value={this.state.passWord}
                                onChange={(e) => this.handleOnchangePassword(e)}
                                onKeyUp={(e) => this.handleOnchangePassword(e)}
                            />
                            {this.state.passWord && (
                                <FontAwesomeIcon
                                    className="eyeSlash"
                                    icon={this.state.isHidden ? faEye : faEyeSlash}
                                    onClick={this.handleHidePassword}
                                />
                            )}
                        </div>
                        {this.state.isErrLogin && <div className="errMessage">{this.state.errMessage}</div>}

                        <footer>
                            <button onClick={this.handleLogIn} className="btn">
                                Log In
                            </button>
                        </footer>
                        <div className="btnLogIn">
                            <div className="fb_icon">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </div>
                            <div className="gg_icon">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="register">
                            <Link to={path.REGISTER}>Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//////////////////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        auth: state.admin.auth,
    };
};

///////////////////////DISPATCH////////////////////////////
const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.userLoginFail()),
        userLogInSucces: (userInfo) => dispatch(actions.userLogInSucces(userInfo)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
