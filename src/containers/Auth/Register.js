import { faUser, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled, { keyframes } from 'styled-components';
import Poppins_Bold from '../../assets/font/Poppins-Bold.ttf';
import Poppins_Medium from '../../assets/font/Poppins-Medium.ttf';
import Poppins_Regular from '../../assets/font/Poppins-Regular.ttf';
import registerBackground from '../../assets/images/register_background.webp';
import { TITLE_BROWSWER, VALIDATE, VALIDATE_CONTENT } from '../../utils';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hiddenPass: true,
            hiddenComfirmPass: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: {},
            openErrorMess: false,
        };
    }
    componentDidMount() {
        document.title = TITLE_BROWSWER.Register;
        console.log(this.state.error);
    }
    // HANDLE CHANGE INPUT
    handleChangeInput = (e) => {
        // if (this.state.error.hasOwnProperty(e.target.name)) {
        //     delete this.state.error[e.target.name];
        // }
        if (!e.target.value.startsWith(' ')) {
            this.setState({
                [e.target.name]: e.target.value,
                error: { ...this.state.error, [e.target.name]: true },
            });
        }
    };

    // VALIDATE WHEN BLUR INPUT
    validateOnBlur = (e, options) => {
        //
        let error_mess = '';
        //
        for (let option of Object.keys(options)) {
            //
            let check = this.validationOptions(this.state[e.target.name], options[option])[option];
            //
            if (check() === VALIDATE_CONTENT.Is_Required) {
                return this.setState({
                    error: { ...this.state.error, [e.target.name]: check() },
                });
            }
            //
            if (check() !== true && check()) {
                error_mess = error_mess.concat(' ', check());
            }
        }
        //
        this.setState({
            error: { ...this.state.error, [e.target.name]: error_mess ? error_mess : true },
        });
    };

    // VALIDATION INPUT
    validationOptions = (value, require) => ({
        isRequired: () => (value ? true : VALIDATE_CONTENT.Is_Required),
        minLength: () => (value.length >= require ? true : `Phải có ít nhất ${require} kí tự.`),
        isEmail: () => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? true : VALIDATE_CONTENT.Is_Email),
        includeNumber: () =>
            /[0-9]/.test(value) ? (require ? true : VALIDATE_CONTENT.Not_Include_Number) : !require ? true : VALIDATE_CONTENT.Include_Number,
        includeSpecialCharacters: () =>
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
                ? require
                    ? true
                    : VALIDATE_CONTENT.Not_Include_Include_Special_Character
                : !require
                ? true
                : VALIDATE_CONTENT.Include_Special_Character,
        includeCharacters: () =>
            /[a-zA-Z]/.test(value)
                ? require
                    ? true
                    : VALIDATE_CONTENT.Not_Include_Character
                : !require
                ? true
                : VALIDATE_CONTENT.Include_Character,

        confirmPassword: () => (value === require ? true : VALIDATE_CONTENT.Confirm_Password),
    });
    // PERMISS SUBMIT
    permissSubmit = () => {
        if (Object.keys(this.state.error).length !== 5) return false;
        for (let element of Object.keys(this.state.error)) {
            if (this.state.error[element] !== true) return false;
        }
        return true;
    };
    //
    //RENDER
    render() {
        return (
            <Container>
                <Wrapper>
                    <Title>REGISRER</Title>
                    <WrapperFill>
                        <Lable>First Name</Lable>
                        {this.state.error.hasOwnProperty(VALIDATE.firstName) && this.state?.error[VALIDATE.firstName] !== true && (
                            <ErrMessage>{this.state?.error[VALIDATE.firstName]}</ErrMessage>
                        )}
                        <IconInput>
                            <FontAwesomeIcon icon={faUser} />
                            <InputFill
                                value={this.state.firstName}
                                type="text"
                                placeholder="John"
                                name="firstName"
                                onChange={(e) => this.handleChangeInput(e)}
                                onBlur={(e) =>
                                    this.validateOnBlur(e, {
                                        isRequired: true,
                                        minLength: 2,
                                        includeNumber: false,
                                        includeSpecialCharacters: false,
                                        includeCharacters: true,
                                    })
                                }
                            />
                            {this.state.error.hasOwnProperty(VALIDATE.firstName) && this.state.error[VALIDATE.firstName] !== true && (
                                <FontAwesomeIcon className="error_icon" icon={faCircleExclamation} />
                            )}
                        </IconInput>
                    </WrapperFill>
                    <WrapperFill>
                        <Lable>Last Name</Lable>
                        {this.state.error.hasOwnProperty(VALIDATE.lastName) && this.state?.error[VALIDATE.lastName] !== true && (
                            <ErrMessage>{this.state?.error[VALIDATE.lastName]}</ErrMessage>
                        )}
                        <IconInput>
                            <FontAwesomeIcon icon={faUser} />
                            <InputFill
                                value={this.state.lastName}
                                type="text"
                                placeholder="David"
                                name="lastName"
                                onChange={(e) => this.handleChangeInput(e)}
                                onBlur={(e) =>
                                    this.validateOnBlur(e, {
                                        isRequired: true,
                                        minLength: 2,
                                        includeNumber: false,
                                        includeSpecialCharacters: false,
                                        includeCharacters: true,
                                    })
                                }
                            />
                            {this.state.error.hasOwnProperty(VALIDATE.lastName) && this.state?.error[VALIDATE.lastName] !== true && (
                                <FontAwesomeIcon className="error_icon" icon={faCircleExclamation} />
                            )}
                        </IconInput>
                    </WrapperFill>
                    <WrapperFill>
                        <Lable>Email</Lable>
                        {this.state.error.hasOwnProperty(VALIDATE.email) && this.state?.error[VALIDATE.email] !== true && (
                            <ErrMessage>{this.state?.error[VALIDATE.email]}</ErrMessage>
                        )}
                        <IconInput>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <InputFill
                                value={this.state.email}
                                type="email"
                                placeholder="John@email.com"
                                name="email"
                                onChange={(e) => this.handleChangeInput(e)}
                                onBlur={(e) =>
                                    this.validateOnBlur(e, {
                                        isRequired: true,
                                        isEmail: true,
                                    })
                                }
                            />
                            {this.state.error.hasOwnProperty(VALIDATE.email) && this.state?.error[VALIDATE.email] !== true && (
                                <FontAwesomeIcon className="error_icon" onClick={this.handleOpenErrMess} icon={faCircleExclamation} />
                            )}
                        </IconInput>
                    </WrapperFill>
                    <WrapperFill>
                        <Lable>Password</Lable>
                        {this.state.error.hasOwnProperty(VALIDATE.password) && this.state?.error[VALIDATE.password] !== true && (
                            <ErrMessage>{this.state?.error[VALIDATE.password]}</ErrMessage>
                        )}
                        <IconInput>
                            <FontAwesomeIcon icon={faLock} />
                            <InputFill
                                value={this.state.password}
                                type={this.state.hiddenPass ? 'password' : 'text'}
                                placeholder="Password..."
                                name="password"
                                onChange={(e) => this.handleChangeInput(e)}
                                onBlur={(e) =>
                                    this.validateOnBlur(e, {
                                        isRequired: true,
                                        minLength: 6,
                                        includeNumber: true,
                                        includeSpecialCharacters: true,
                                        includeCharacters: true,
                                    })
                                }
                            />
                            {!_.isEmpty(this.state.error) &&
                                this.state.error.hasOwnProperty(VALIDATE.password) &&
                                this.state?.error[VALIDATE.password] !== true && (
                                    <FontAwesomeIcon className="error_icon" icon={faCircleExclamation} />
                                )}
                            {this.state.password.trim() && (
                                <FontAwesomeIcon
                                    onClick={() => {
                                        this.setState({
                                            hiddenPass: !this.state.hiddenPass,
                                        });
                                    }}
                                    className="hidden_pass"
                                    icon={this.state.hiddenPass ? faEyeSlash : faEye}
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            )}
                        </IconInput>
                    </WrapperFill>
                    <WrapperFill>
                        <Lable>Confirm Password</Lable>
                        {this.state.error.hasOwnProperty(VALIDATE.confirmPassword) && this.state?.error[VALIDATE.confirmPassword] !== true && (
                            <ErrMessage>{this.state?.error[VALIDATE.confirmPassword]}</ErrMessage>
                        )}
                        <IconInput>
                            <FontAwesomeIcon icon={faLock} />
                            <InputFill
                                value={this.state.confirmPassword}
                                type={this.state.hiddenComfirmPass ? 'password' : 'text'}
                                placeholder="Confirm Password..."
                                name="confirmPassword"
                                disabled={this.state.password ? false : true}
                                onChange={(e) => this.handleChangeInput(e)}
                                onBlur={(e) => this.validateOnBlur(e, { isRequired: true, confirmPassword: this.state.password })}
                            />
                            {!_.isEmpty(this.state.error) &&
                                this.state.error.hasOwnProperty(VALIDATE.confirmPassword) &&
                                this.state?.error[VALIDATE.confirmPassword] !== true && (
                                    <FontAwesomeIcon className="error_icon" icon={faCircleExclamation} />
                                )}
                            {this.state.confirmPassword && (
                                <FontAwesomeIcon
                                    onClick={() =>
                                        this.setState({
                                            hiddenComfirmPass: !this.state.hiddenComfirmPass,
                                        })
                                    }
                                    className="hidden_pass"
                                    icon={this.state.hiddenComfirmPass ? faEyeSlash : faEye}
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            )}
                        </IconInput>
                    </WrapperFill>
                    <SubmitBtn disabled={this.permissSubmit() ? false : true} onClick={this.permissSubmit}>
                        ĐĂNG KÍ
                    </SubmitBtn>
                </Wrapper>
            </Container>
        );
    }
}
////

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

///////////////////////DISPATCH////////////////////////////
const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));

// kEY FRAME
const keyFramesWidth = keyframes`
    0%{
        width: 0%;
    }
    100%{
        width:100%;
    }
`;
// STYLE
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: url(${registerBackground});
    background-size: cover;
    background-position: center;
`;
const Wrapper = styled.div`
    margin: auto;
    padding: 40px 55px;
    min-width: 500px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
`;

const ErrMessage = styled.div`
    display: inline-flex;
    margin-left: 4px;
    border: 1px solid #c80000;
    padding: 5px 10px;
    color: #c80000;
    max-width: 325px;
    font-size: 1.2rem;
`;
const IconInput = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .error_icon {
        color: #c80000;
        cursor: pointer;
        height: 15px;
        width: 15px;
    }

    svg {
        font-size: 1.6rem;
        color: #adadad;
        margin-left: 10px;
    }

    .hidden_pass {
        cursor: pointer;
    }
`;
const WrapperFill = styled.div`
    position: relative;
    padding-top: 10px;
    padding-bottom: 3px;
    border-bottom: 2px solid #d9d9d9;
    width: 100%;

    ::after {
        transition: width 0.4s linear;
    }

    &:focus-within {
        ${IconInput} {
            svg:first-child {
                color: #1d9393;
            }
        }
        ::after {
            content: '';
            position: absolute;
            bottom: -1px;
            width: 100%;
            height: 2px;
            background-color: #7f7f7f;
            animation: ${keyFramesWidth} 0.4s linear;
        }
    }
`;
const Title = styled.header`
    @font-face {
        font-family: 'Poppins-Bold';
        src: url(${Poppins_Bold}) format('ttf');
        font-style: normal;
    }
    margin-bottom: 30px;
    font-weight: 700;
    font-size: 39px;
    color: #1d9393;
    line-height: 1.2;
    text-align: center;
`;
const Lable = styled.span`
    @font-face {
        font-family: 'Poppins-Regular';
        src: url(${Poppins_Regular}) format('ttf');
        font-style: normal;
    }
    font-weight: 500;
    font-size: 14px;
    color: #838181;
    line-height: 1.5;
`;

const InputFill = styled.input`
    @font-face {
        font-family: 'Poppins-Medium';
        src: url(${Poppins_Medium}) format('ttf');
        font-style: normal;
    }
    font-weight: 500;
    border: none;
    outline: none;
    font-size: 16px;
    color: #333;
    line-height: 1.2;
    width: 100%;
    padding: 10px 5px 10px 20px;

    ::placeholder {
        color: #adadad;
    }
    &:focus {
        border: none;
    }
    :disabled {
        opacity: 0.9;
        cursor: not-allowed;
    }
    :-webkit-autofill {
        -webkit-box-shadow: 0 0 0 50px white inset; /* Change the color to your own background color */
        -webkit-text-fill-color: inherit;
    }
`;
const SubmitBtn = styled.button`
    @font-face {
        font-family: 'Poppins-Medium';
        src: url(${Poppins_Medium}) format('ttf');
        font-style: normal;
    }
    font-weight: 500;
    border: 1px solid #eee;
    font-size: 16px;
    color: #fffffff2;
    line-height: 1.2;
    text-transform: uppercase;
    text-align: center;
    padding: 10px 20px;
    background-color: #45c3d2;
    border-radius: 10px;
    margin: 25px 10px 0 0;
    float: right;
    transition: all 0.3s linear;
    :hover {
        scale: 1.1;
        opacity: 1.6;
    }
    :disabled {
        scale: 1;
        cursor: not-allowed;
        :hover {
            opacity: 0.8;
        }
    }
`;
