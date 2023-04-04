import { faUser, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled, { css, keyframes } from 'styled-components';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { signUpWithPhoneNumber } from './firebase';
import Poppins_Bold from '../../assets/font/Poppins-Bold.ttf';
import Poppins_Medium from '../../assets/font/Poppins-Medium.ttf';
import Poppins_Regular from '../../assets/font/Poppins-Regular.ttf';
import registerBackground from '../../assets/images/register_background.webp';
import { path, TITLE_BROWSWER, VALIDATE, VALIDATE_CONTENT } from '../../utils';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { checkExistData, registerNewUserService, sendEmailOTPService, verifyOtpEmailService } from '../../services/userService';
import { ClipLoader } from 'react-spinners';
import OtpInput from 'react-otp-input';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

//
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: 'Email',
            hiddenPass: true,
            hiddenComfirmPass: true,
            firstName: '',
            lastName: '',
            email: '',
            otp: '',
            show_modal_verify: false,
            Verified_mail: false,
            sending_otp: false,
            get_otp: false,
            phone: '',
            password: '',
            confirmPassword: '',
            error: {},
            openErrorMess: false,
        };
    }
    componentDidMount() {
        document.title = TITLE_BROWSWER.Register;
    }
    //
    handleChangeModeRegister = () => {
        this.setState((prevState) => ({
            option: prevState.option === 'Email' ? 'Phone' : 'Email',
            hiddenPass: true,
            hiddenComfirmPass: true,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            error: {},
            openErrorMess: false,
        }));
    };
    // HANDLE CHANGE INPUT
    handleChangeInput = (e) => {
        if (!e.target.value.startsWith(' ')) {
            this.setState({
                [e.target.name]: e.target.value,
                error: { ...this.state.error, [e.target.name]: true },
            });
        }
    };
    // VALIDATE WHEN BLUR INPUT
    validateOnBlur = async (e, options) => {
        let error_mess = '';
        for (let option of Object.keys(options)) {
            let check = this.validationOptions(this.state[e.target.name], options[option])[option];
            if (check() === VALIDATE_CONTENT.Is_Required) {
                return this.setState({
                    error: { ...this.state.error, [e.target.name]: check() },
                });
            }
            if (check() !== true && check()) {
                error_mess = error_mess.concat(' ', check());
            }
        }

        if (!error_mess && options.isExistData) {
            e.persist();
            const { data: response } = await checkExistData(e.target.name, e.target.value);
            if (response && response.errCode === 0 && response.isExist) error_mess = error_mess.concat(response.message);
            else if (response?.errCode !== 0) error_mess = error_mess.concat('Xảy ra lỗi khi kiểm tra email của bạn!');
        }
        //
        this.setState({
            error: { ...this.state.error, [e.target?.name]: error_mess ? error_mess : true },
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
        isExistData: () => (value && require ? true : false),
    });
    // PERMISS SUBMIT
    permissSubmit = async () => {
        if (Object.keys(this.state.error).length !== 5) return false;
        for (let element of Object.keys(this.state.error)) {
            if (this.state.error[element] !== true || !this.state[element]) return false;
        }
        return true;
    };
    //
    handleSubmit = async () => {
        await this.handleVerifyEmail();
    };
    //
    handleOnChangePhone = (value) => {
        this.setState({
            phone: value,
        });
    };
    //
    handleVerifyPhoneNumer = async () => {
        if (this.state.phone) {
            const result = await signUpWithPhoneNumber(this.state.phone);
            console.log(result);
            result?.verificationId ? alert('SEND OTP SUCE') : alert('FAILED');
        } else {
            toast.error('Send OTP Failed!');
        }
    };
    //
    handleSendOtpVerify = async () => {
        if (!this.state.email && this.state.error['email'] !== true) return;
        if (this.state.get_otp && !this.state.show_modal_verify) {
            this.setState({
                show_modal_verify: true,
            });
            return;
        }
        this.setState({
            sending_otp: true,
        });
        //
        const { data: response } = await sendEmailOTPService(this.state.email);
        //
        if (response && response.errCode === 0) {
            console.log(response);
            this.setState({
                sending_otp: false,
                get_otp: true,
                show_modal_verify: true,
            });
            toast.success('Vui lòng kiểm tra Email của bạn để lấy mã xác minh!');
        }
    };
    // HANDLE HIDDEN MODAL
    handleHiddenModal = () => {
        this.setState((prevState) => ({
            show_modal_verify: !prevState.show_modal_verify,
        }));
    };
    //
    onChangeOtp = (otp) => {
        console.log(otp);
        this.setState({ otp });
    };
    //
    createNewUser = async () => {
        const { firstName, lastName, email, password } = this.state;
        const { data: res } = await registerNewUserService({ firstName, lastName, email, password });
        //
        if (res && res.errCode === 0) {
            toast.success('Đăng ký thành công');
            this.setState({
                option: 'Email',
                hiddenPass: true,
                hiddenComfirmPass: true,
                firstName: '',
                lastName: '',
                email: '',
                otp: '',
                show_modal_verify: false,
                Verified_mail: false,
                sending_otp: false,
                get_otp: false,
                phone: '',
                password: '',
                confirmPassword: '',
                error: {},
                openErrorMess: false,
            });
        }
        //
        if (res && res.errCode !== 0) toast('Đăng ký thất bại!');
        //
    };
    verifyOtp = async () => {
        const { data: response } = await verifyOtpEmailService(this.state.email, this.state.otp);
        if (response && response.errCode === 0) await this.createNewUser();

        if (response.errCode !== 0 && response.errCode === 1) toast('Mã bạn nhập bị sai! Vui lòng thử lại');

        if (response.errCode !== 0 && response.errCode === 2) toast('Mã đã hết hạn! Bạn có thể lấy mã mới');

        if (response.errCode !== 0 && response.errCode !== 1 && response.errCode !== 2) toast('Đã xãy ra lỗi! Vui lòng thử lại');
    };
    // MODAL VERIFY OTP EMAIL OR PHONE
    ModalVerifySignIn = (props) => {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: '#1d9393' }} id="contained-modal-title-vcenter">
                        Vui lòng nhập mã từ được gửi trong hòm thư để xác nhận Email!
                    </Modal.Title>
                </Modal.Header>
                <ModalVerify>
                    <Modal.Body>
                        <OtpInput
                            className="input-otp"
                            value={this.state.otp}
                            onChange={this.onChangeOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                        />
                    </Modal.Body>
                </ModalVerify>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleSendOtpVerify}>
                        {this.state.sending_otp ? <ClipLoader size={15} color="#fff" /> : 'Get Key'}
                    </Button>
                    <BtnVerify disabled={this.state.otp.length === 6 ? false : true} onClick={this.verifyOtp}>
                        Verify
                    </BtnVerify>
                </Modal.Footer>
            </Modal>
        );
    };
    //
    //RENDER
    render() {
        return (
            <Container>
                <div id="recaptcha-container"></div>
                <Wrapper>
                    <Title>REGISRER</Title>
                    <Option>
                        <OptionButton onClick={this.handleChangeModeRegister} $mode={this.state.option === 'Email' ? 'active' : 'visible'}>
                            Đăng kí với Email
                        </OptionButton>
                        <span>/</span>
                        <OptionButton onClick={this.handleChangeModeRegister} $mode={this.state.option === 'Phone' ? 'active' : 'visible'}>
                            Đăng kí với SĐT
                        </OptionButton>
                    </Option>
                    <WrapperFill>
                        <Lable>First Name</Lable>
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
                            {this.state.error.hasOwnProperty(VALIDATE.firstName) && this.state?.error[VALIDATE.firstName] !== true && (
                                <ErrMessage>{this.state?.error[VALIDATE.firstName]}</ErrMessage>
                            )}
                        </IconInput>
                    </WrapperFill>
                    <WrapperFill>
                        <Lable>Last Name</Lable>
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
                            {this.state.error.hasOwnProperty(VALIDATE.lastName) && this.state?.error[VALIDATE.lastName] !== true && (
                                <ErrMessage>{this.state?.error[VALIDATE.lastName]}</ErrMessage>
                            )}
                        </IconInput>
                    </WrapperFill>
                    <WrapperFill>
                        <Lable>{this.state.option}</Lable>
                        {this.state.option === 'Email' && (
                            <>
                                <IconInput>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <InputFill
                                        value={this.state.email}
                                        type="email"
                                        placeholder="John@email.com"
                                        name="email"
                                        onChange={(e) => this.handleChangeInput(e)}
                                        onBlur={async (e) =>
                                            this.validateOnBlur(e, {
                                                isRequired: true,
                                                isEmail: true,
                                                isExistData: true,
                                            })
                                        }
                                    />
                                    {this.state.error.hasOwnProperty(VALIDATE.email) && this.state?.error[VALIDATE.email] !== true && (
                                        <FontAwesomeIcon className="error_icon" onClick={this.handleOpenErrMess} icon={faCircleExclamation} />
                                    )}
                                    {this.state.error.hasOwnProperty(VALIDATE.email) && this.state?.error[VALIDATE.email] !== true && (
                                        <ErrMessage>{this.state?.error[VALIDATE.email]}</ErrMessage>
                                    )}
                                </IconInput>
                            </>
                        )}
                        {this.state.option === 'Phone' && (
                            <>
                                <PhoneInputWrapper>
                                    <PhoneInput
                                        country="vn"
                                        placeholder="Enter phone number"
                                        value={this.state.phone}
                                        onChange={(value) => this.handleOnChangePhone(value)}
                                    />
                                    <VerifyPhoneNumber onClick={this.handleVerifyPhoneNumer}>Send Code</VerifyPhoneNumber>
                                </PhoneInputWrapper>
                            </>
                        )}
                    </WrapperFill>
                    <WrapperFill>
                        <Lable>Password</Lable>
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
                            {this.state.error.hasOwnProperty(VALIDATE.password) && this.state?.error[VALIDATE.password] !== true && (
                                <ErrMessage>{this.state?.error[VALIDATE.password]}</ErrMessage>
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
                            {this.state.error.hasOwnProperty(VALIDATE.confirmPassword) &&
                                this.state?.error[VALIDATE.confirmPassword] !== true && (
                                    <ErrMessage>{this.state?.error[VALIDATE.confirmPassword]}</ErrMessage>
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
                    <SubmitBtn disabled={this.permissSubmit() ? false : true} onClick={this.handleSendOtpVerify}>
                        {this.state.sending_otp ? <ClipLoader size={20} color="#fff" /> : 'ĐĂNG KÍ'}
                    </SubmitBtn>
                    <SignInBtn>
                        <Link to={path.LOGIN}>Đăng Nhập</Link>
                    </SignInBtn>

                    <this.ModalVerifySignIn show={this.state.show_modal_verify} onHide={this.handleHiddenModal} />
                </Wrapper>
            </Container>
        );
    }
}
//
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
//
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
    min-width: 550px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
`;
const ErrMessage = styled.div`
    position: absolute;
    top: 12px;
    right: 20px;
    display: none;
    margin-left: 4px;
    border: 1px solid #c80000;
    padding: 5px 5px;
    color: #c80000;
    max-width: 325px;
    font-size: 1.2rem;
`;

const IconInput = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        font-size: 1.6rem;
        color: #adadad;
        margin-left: 10px;
    }
    .error_icon {
        z-index: 1000;
        color: #c80000;
        cursor: pointer;
        font-size: 1.6rem;
        &:hover + ${ErrMessage} {
            display: inline-flex;
        }
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
const Option = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
        margin: 0 5px;
    }
`;
const OptionButton = styled.button`
    font-weight: 500;
    font-size: 14px;
    line-height: 1.5;
    border: none;
    padding: 2px 6px;
    background-color: transparent;

    ${(props) => {
        switch (props.$mode) {
            case 'active':
                return css`
                    color: #838181;
                    border-bottom: 1px solid #838181;
                `;
            case 'visible':
                return css`
                    color: #ccc;
                `;
            default:
                return css`
                    color: #818383;
                    border: 1px solid #000;
                `;
        }
    }}
    &:hover {
        color: '#838383';
    }
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
    position: relative;
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
    min-width: 106px;
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
        scale: 1.02;
        opacity: 1.6;
    }
    :disabled {
        opacity: 0.9;
        cursor: not-allowed;
    }
    /* :disabled {
        scale: 1;
        cursor: not-allowed;
        :hover {
            opacity: 0.8;
        }
    } */
`;
const PhoneInputWrapper = styled.div`
    margin: 10px 0;
    position: relative;
    .react-tel-input .form-control {
        width: 100%;
        height: 40px;
    }
`;
const VerifyPhoneNumber = styled.button`
    @font-face {
        font-family: 'Poppins-Medium';
        src: url(${Poppins_Medium}) format('ttf');
        font-style: normal;
    }
    position: absolute;
    right: 2px;
    top: 4px;
    border: none;
    padding: 6px;
    border-radius: 8px;
    background-color: #ccc;
    color: #757575;
    font-weight: 500;
`;
const VerifyEmailBtn = styled.div`
    @font-face {
        font-family: 'Poppins-Medium';
        src: url(${Poppins_Medium}) format('ttf');
        font-style: normal;
    }
    position: absolute;
    right: 2px;
    border: none;
    padding: 8px 6px;
    border-radius: 8px;
    background-color: #ccc;
    color: #757575;
    font-weight: 500;
    min-width: 75px;
    display: flex;
    align-content: center;
    justify-content: center;
    cursor: pointer;
`;
const SignInBtn = styled.button`
    @font-face {
        font-family: 'Poppins-Medium';
        src: url(${Poppins_Medium}) format('ttf');
        font-style: normal;
    }
    border: none;
    background-color: transparent;
    margin-top: 40px;
    font-size: 1.8rem;
    a {
        font-weight: 500;
        color: #1d9393;
        outline: none;
        text-decoration: none;
    }
`;
const ModalVerify = styled.div`
    display: flex;
    .modal-body {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    input {
        width: 4rem !important;
        height: 4rem;
        margin: 0 5px;
        font-size: 2rem;
        border-radius: 4px;
        border: 2px solid rgba(0, 0, 0, 0.8);
        &:focus-visible {
            border-color: #1d9393 !important;
        }
        &:active {
            border-color: #1d9393 !important;
        }
    }
    .modal-title {
        color: #1d9393;
    }
`;
const BtnVerify = styled.button`
    border: none;
    background: #1d9393 !important;
    color: #fff;
    font-size: 1.4rem;
    padding: 8px 15px !important;
    border-radius: 5px;
    font-weight: 500 !important;
    :disabled {
        cursor: not-allowed;
        background-color: #ccc !important;
    }
`;
