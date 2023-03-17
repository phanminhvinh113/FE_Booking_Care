import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import GuestAvatar from '../../../assets/images/Chat/guest.png';
import BookingCareAvatar from '../../../assets/images/Chat/bookingcare_chat.png';
import { format } from 'timeago.js';
import styled, { css } from 'styled-components';
import './Style/Conversation.scss';
//
class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTyping: false,
            textMessage: null || '',
            arrMess: [
                // {
                //     id: _.get(this.props.inforDoctor, 'id', 'null'),
                //     text: 'Bác có thể đặt câu hỏi ở đây...',
                //     time: moment(new Date().getTime()).format(' DD/MM/YYYY - HH:mm'),
                // },
            ],
        };
        this.textInput = React.createRef();
        this.messagesEndRef = React.createRef();
        this.messageContent = React.createRef();
    }
    //
    componentDidMount() {
        this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    //
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.arrMess !== this.state.arrMess) {
            this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }
    //INPUT
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

    //
    sendMessage = () => {
        if (this.state.textMessage.trim()) {
            // Send message to server or display locally
            // this.props.socket.emit('send-message', {
            //     id: this.props.userInfo?.id || null,
            //     text: this.state.textMessage,
            // });
            this.props.sendMessage(this.props.userInfo?.id, this.props.inforDoctor?.id, this.state.textMessage);
            this.setState({
                textMessage: '',
                arrMess: [
                    ...this.state.arrMess,
                    {
                        id: 'guest',
                        //id: _.get(this.props.inforDoctor, 'id', 'null'),
                        text: this.state.textMessage,
                        time: new Date(),
                    },
                ],
            });
        }
        if (!this.state.textMessage.trim()) {
            this.setState({
                textMessage: '',
            });
        }
        this.textInput.current.textContent = null;
        this.textInput.current.focus();
    };
    //
    handleScrollContentMess = (e) => {
        // console.log(e);
        // document.body.endOfPage;
        // console.log(this.messageContent.current.endOfPage);
    };

    render() {
        return (
            <div ref={this.props.ref} className={`conversation-patent-doctor ${this.props.isOpen ? 'open' : 'close'}`}>
                <header className="header">
                    <h4>{_.get(this.props.inforDoctor, 'DoctorInfo.name', 'Nhắn tin cùng bác sĩ')}</h4>
                    <CloseBtn onClick={this.props.Toggle}>
                        <FontAwesomeIcon icon={faXmark} />
                    </CloseBtn>
                </header>
                <div className="cotent-text" ref={this.messageContent} onScroll={(e) => this.handleScrollContentMess(e)}>
                    {!!this.state.arrMess &&
                        this.state.arrMess.map((item) => {
                            item.text = item.text.replace(/^\s+|\s+$/g, '');
                            return (
                                <div
                                    className={`conversation-message ${
                                        item.id === _.get(this.props.inforDoctor, 'id', 'null') ? 'doctor' : 'other'
                                    }`}
                                    ref={this.messagesEndRef}
                                >
                                    <img
                                        src={
                                            item.id === this.props.inforDoctor.id
                                                ? _.get(this.props.inforDoctor, 'image', BookingCareAvatar)
                                                : _.get(this.props.userInfo, 'image', 'false') || GuestAvatar
                                        }
                                    />
                                    <div className="text-and-time">
                                        <p div className="text">
                                            {item.text}
                                        </p>
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
                            textContent={this.state.textMessage}
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        inforDoctor: state.admin.inforDoctor,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);

// Style
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
