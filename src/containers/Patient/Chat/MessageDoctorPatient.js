import React, { Component } from 'react';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import * as actions from '../../../store/actions';
import _, { entries } from 'lodash';
import iconMessage from '../../../assets/images/Chat/chat_patient_doctor.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import GuestAvatar from '../../../assets/images/Chat/guest.png';
import BookingCareAvatar from '../../../assets/images/Chat/bookingcare_chat.png';
import { format } from 'timeago.js';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import './Style/MessageDoctorPatient.scss';
import './Style/Conversation.scss';

class MessageDoctorPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenConversation: false,
            isTyping: false,
            textMessage: null || '',
            arrMess: [],
            viewIndex: null,
            offset: 0,
            limit: 20,
            hasMore: false,
            fullListMess: false,
        };
        //
        this.ChatBox = React.createRef();
        this.MessIcon = React.createRef();
        this.Conversation = React.createRef();
        //
        this.textInput = React.createRef();
        this.messagesEndRef = React.createRef();
        this.messageContent = React.createRef();
        this.messageItem = React.createRef();
        //
        this.socket = io.connect('http://localhost:8090');
        this.handleClickOutSide = this.handleClickOutSide.bind(this);
    }
    async componentDidMount() {
        // EMIT USER ACTIVE
        if (this.props.userInfo?.id) {
            await this.socket.emit('add-new-user', this.props.userInfo?.id);
        }
        //GET USER ACTIVE
        this.socket.on('get-user-active', (users) => {
            console.log(users);
        });
        //
        this.socket.on('get-message', (message) => {
            if (message && message.senderId === this.props.inforDoctor?.id) {
                this.setState({
                    arrMess: [...this.state.arrMess, message],
                    textMessage: '',
                });
            }
        });
        //
        document.addEventListener('mousedown', this.handleClickOutSide);
        this.messageContent.current.addEventListener('scroll', this.handleScroll);
    }
    //UPDATE
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userInfo !== this.props.userInfo && this.props.userInfo?.id) {
            await this.socket.emit('add-new-user', this.props.userInfo.id);
        }
        //
        if (prevProps.Conversation !== this.props.Conversation) {
            this.setState({
                arrMess: [...this.props.Conversation, ...this.state.arrMess],
                viewIndex: this.props.Conversation.length - (this.state.limit - this.props.Conversation.length),
            });
        }
        //
        if (prevState.arrMess !== this.state.arrMess || prevState.isOpenConversation !== this.state.isOpenConversation) {
            this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }
    // UN MOUNTED
    async componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutSide);
        this.messageContent.current.removeEventListener('scroll', this.handleScroll);
        await this.socket.disconnect();
    }
    //
    handleClickOutSide = (e) => {
        if (this.Conversation.current && !this.Conversation.current.contains(e.target) && !this.MessIcon.current.contains(e.target)) {
            this.setState({
                isOpenConversation: false,
                arrMess: [],
                offset: 0,
            });
        }
    };
    //
    handleOpenConversation = async () => {
        //GET MESSAGE WHEN CHAT BOX OPEN
        if (this.props.userInfo?.id && !this.state.isOpenConversation) {
            await this.props.getMessagePatientDoctor({
                senderId: this.props.userInfo.id,
                receiverId: this.props.doctorId,
                offset: this.state.offset,
                limit: this.state.limit,
            });
            this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        //OPEN CHAT BOX
        this.setState((prevState) => ({
            isOpenConversation: !prevState.isOpenConversation,
            offset: 0,
            fullListMess: false,
            arrMess: prevState.isOpenConversation ? [] : prevState.arrMess,
        }));
        //
    };
    //
    sendMessageToServer = (senderId, receiverId, text) => {
        this.socket.emit('send-message', {
            text,
            senderId,
            receiverId,
            time: new Date().getTime(),
        });
    };
    //
    //INPUT TYPE
    handleOnChangeInput = (e) => {
        this.setState({
            isTyping: true,
            textMessage: e.target.textContent,
        });
    };
    // SENDING MESSAGE WWHEN PRESS ENTER
    handleSendingMessagePressEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.sendMessage();
        }
        //
    };
    //
    handleSendingMessageClick = () => {
        this.sendMessage();
    };
    //SEND MESSAGE
    sendMessage = () => {
        //
        if (this.state.textMessage.trim()) {
            this.sendMessageToServer(this.props.userInfo?.id, this.props.inforDoctor?.id, this.state.textMessage);
            this.setState(
                {
                    textMessage: '',
                    arrMess: [
                        ...this.state.arrMess,
                        {
                            senderId: _.get(this.props.userInfo, 'id', 'guest'),
                            text: this.state.textMessage,
                            time: new Date(),
                        },
                    ],
                },
                () =>
                    this.messageContent.current.scrollTo({
                        top: this.messageContent.current.scrollHeight,
                        behavior: 'smooth',
                    }),
            );
        } else {
            this.setState({
                textMessage: '',
            });
        }
        //
        this.textInput.current.textContent = null;
        this.textInput.current.focus();
    };
    //
    getMoreData = async () => {
        setTimeout(async () => {
            await this.props.getMessagePatientDoctor({
                senderId: this.props.userInfo.id,
                receiverId: this.props.doctorId,
                offset: this.state.offset,
                limit: this.state.limit,
            });
            this.setState({
                fullListMess: this.state.arrMess.length < this.state.limit + this.state.offset ? true : false,
                hasMore: false,
            });
        }, 200);
    };
    //SCROLL SEE HISTORY MESSAGE
    handleScroll = async (node) => {
        if (this.messageContent.current.scrollTop === 0 && !this.state.fullListMess && this.state.isOpenConversation) {
            this.setState((prevState) => ({
                offset: prevState.offset + this.state.limit,
                hasMore: true,
            }));
            await this.getMoreData();
        }
    };
    render() {
        return (
            <div className="container-message-patient-doctor">
                <div ref={this.MessIcon} className="img-message" onClick={this.handleOpenConversation}>
                    <img src={iconMessage} />
                </div>
                <ChatBox ref={this.Conversation} className={`conversation-patent-doctor ${this.state.isOpenConversation ? 'open' : 'close'}`}>
                    <header className="header">
                        <h4>{_.get(this.props.inforDoctor, 'DoctorInfo.name', 'Nhắn tin cùng bác sĩ')}</h4>
                        <CloseBtn onClick={this.handleOpenConversation}>
                            <FontAwesomeIcon icon={faXmark} />
                        </CloseBtn>
                    </header>
                    <div className="cotent-text" ref={this.messageContent}>
                        {this.state.hasMore && (
                            <Loading>
                                <ClipLoader className="loading" size={20} color={'#e4e4e4'} speedMultiplier={1} />
                            </Loading>
                        )}
                        {!!this.state.arrMess &&
                            this.state.arrMess.map((item, index) => {
                                item.text = item.text.replace(/^\s+|\s+$/g, '');
                                return (
                                    <div
                                        className={`conversation-message ${
                                            item.senderId === _.get(this.props.inforDoctor, 'id', 'null') ? 'doctor' : 'other'
                                        } ${index + 1}`}
                                        key={index}
                                        ref={index + 1 === this.state.viewIndex ? this.messagesEndRef : this.messageItem}
                                    >
                                        <img
                                            src={
                                                item.senderId === this.props.inforDoctor.id
                                                    ? _.get(this.props.inforDoctor, 'image', BookingCareAvatar)
                                                    : _.get(this.props.userInfo, 'image', 'false') || GuestAvatar
                                            }
                                        />
                                        <div className="text-and-time">
                                            <p className="text">{item.text}</p>
                                            <div className="time">{format(item.time)}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        {!this.state.arrMess.length && <NoneText>Bạn có thể đặt câu hỏi ở đây...</NoneText>}
                    </div>
                    <div className="input-text">
                        <div className="chat-input-wrapper">
                            <div
                                ref={this.textInput}
                                className="chat-input"
                                contentEditable={true}
                                data-placeholder="Typing..."
                                spellCheck={true}
                                suppressContentEditableWarning={true}
                                onInput={(e) => this.handleOnChangeInput(e)}
                                onKeyDown={(e) => this.handleSendingMessagePressEnter(e)}
                            ></div>
                        </div>
                        <FontAwesomeIcon icon={faPaperPlane} onClick={() => this.handleSendingMessageClick()} />
                    </div>
                </ChatBox>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        inforDoctor: state.admin.inforDoctor,
        userInfo: state.user.userInfo,
        Conversation: state.user.Conversation,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMessagePatientDoctor: (payload) => dispatch(actions.getMessagePatientDoctor(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDoctorPatient);

const ChatBox = styled.div``;
const Loading = styled.div`
    display: flex;
    justify-content: center;
`;
const CloseBtn = styled.button`
    border: none;
    background-color: transparent;
    margin-left: 5px;
    svg {
        color: #fff;
        font-size: 2.5rem;
    }
`;

const NoneText = styled.div`
    text-align: center;
    color: #9f9d9d;
    font-size: 1.5rem;
    &:hover {
        color: #ccc;
    }
`;
