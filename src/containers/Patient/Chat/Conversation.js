import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import GuestAvatar from '../../../assets/images/Chat/guest.png';
import BookingCareAvatar from '../../../assets/images/Chat/bookingcare_chat.png';
import { format } from 'timeago.js';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import './Style/Conversation.scss';
//
class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTyping: false,
            textMessage: null || '',
            arrMess: [],
            viewIndex: null,
            offset: 0,
            limit: 10,
            hasMore: false,
            fullListMess: false,
        };
        this.textInput = React.createRef();
        this.targetMess = React.createRef();
        this.messageRef = React.createRef();
        this.messageContent = React.createRef();
    }
    // DID MOUNT
    componentDidMount() {
        //
        this.props.socket.on('get-message', (message) => {
            if (message && message.senderId === this.props.inforDoctor?.id) {
                this.setState(
                    {
                        arrMess: [...this.state.arrMess, message],
                        textMessage: '',
                    },
                    () => {
                        this.messageRef.current?.scrollIntoView({ behavior: 'smooth' });
                    },
                );
            }
        });
        //
        if (this.props.Conversation) {
            this.setState({
                arrMess: [...this.props.Conversation, ...this.state.arrMess],
            });
        }
        //
        this.messageContent.current.addEventListener('scroll', this.handleScroll);
    }
    //UPDATE STATE
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.Conversation !== this.props.Conversation) {
            this.setState({
                arrMess: [...this.props.Conversation, ...this.state.arrMess],
            });
        }
        //
    }
    //UN MOUNT
    componentWillUnmount() {
        this.messageContent.current.removeEventListener('scroll', this.handleScroll);
    }
    // CLICK OUT SIDE

    //SCROLL SEE HISTORY MESSAGE
    handleScroll = async () => {
        console.log(this.messageContent.current.scrollHeight);
        if (this.messageContent.current.scrollTop === 0 && !this.state.fullListMess) {
            //
            this.setState((prevState) => ({
                offset: prevState.offset + this.state.limit,
                hasMore: true,
            }));
            //GET DATA
            setTimeout(async () => {
                await this.props.getMessagePatientDoctor({
                    senderId: this.props.userInfo.id,
                    receiverId: this.props.doctorId,
                    offset: this.state.offset,
                    limit: this.state.limit,
                });
            }, 1000);
            //
            if (this.props.arrMess.length < this.state.offset + this.state.limit) {
                this.setState({
                    fullListMess: true,
                    hasMore: false,
                });
            }
            //
            console.log(this.messageContent.current?.scrollHeight);
            console.log(this.messageContent.current?.scrollTop);
        }
    };
    //INPUT TYPE
    handleOnChangeInput = (e) => {
        this.setState({
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
    handleSendingMessageClick = () => this.sendMessage();
    //SEND MESSAGE
    sendMessage = () => {
        //
        if (this.state.textMessage.trim()) {
            this.props.sendMessage(this.props.userInfo?.id, this.props.inforDoctor?.id, this.state.textMessage);
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
                () => {
                    this.messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
                },
            );
        }
        //
        if (!this.state.textMessage.trim()) {
            this.setState({
                textMessage: '',
            });
        }
        //
        this.textInput.current.textContent = null;
        this.textInput.current.focus();
    };
    //CLOSE CHAT BOX
    handleCloseChatBox = () => {
        this.setState({
            arrMess: [],
            offset: 0,
            fullListMess: false,
        });
    };
    render() {
        return (
            <ChatBox ref={this.Conversation} className={`conversation-patent-doctor ${this.props.isOpen ? 'open' : 'close'}`}>
                <header className="header">
                    <h4>{_.get(this.props.inforDoctor, 'DoctorInfo.name', 'Nhắn tin cùng bác sĩ')}</h4>
                    <CloseBtn onClick={this.props.Toggle}>
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
                                    key={index}
                                    className={`conversation-message ${
                                        item.senderId === _.get(this.props.inforDoctor, 'id', 'null') ? 'doctor' : 'other'
                                    }`}
                                    ref={index === 0 ? this.targetMess : this.messageRef}
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

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);

// Style
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
