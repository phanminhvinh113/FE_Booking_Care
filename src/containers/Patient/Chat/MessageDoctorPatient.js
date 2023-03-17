import React, { Component } from 'react';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import iconMessage from '../../../assets/images/Chat/chat_patient_doctor.png';
import Conversation from './Conversation';
import './Style/MessageDoctorPatient.scss';
// const socket = io('ws://localhost:8090');

class MessageDoctorPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenConversation: false,
            text: '',
        };
        this.MessIcon = React.createRef();
        this.Conversation = React.createRef();
        this.socket = React.createRef();
        this.handleClickOutSide = this.handleClickOutSide.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutSide);
        if (this.props.userInfo?.id) {
            this.socket.current = io.connect('http://localhost:8090');
            if (this.props.userInfo?.id) {
                this.socket.current.emit('add-new-user', this.props.userInfo?.id);
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {}
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutSide);
    }
    //
    handleOpenConversation = () => {
        this.setState({
            isOpenConversation: !this.state.isOpenConversation,
        });
    };
    //
    handleClickOutSide = (e) => {
        if (this.Conversation && !this.Conversation.current.contains(e.target) && !this.MessIcon.current.contains(e.target)) {
            this.setState({
                isOpenConversation: false,
            });
        }
    };
    //
    sendMessageToServer = (senderId, receiverId, text) => {
        this.socket.current.emit('send-message', {
            text,
            senderId,
            receiverId,
        });
    };
    //
    render() {
        return (
            <div className="container-message-patient-doctor">
                <div ref={this.MessIcon} className="img-message" onClick={this.handleOpenConversation}>
                    <img src={iconMessage} />
                </div>
                <div ref={this.Conversation}>
                    <Conversation
                        Toggle={this.handleOpenConversation}
                        isOpen={this.state.isOpenConversation}
                        socket={this.socket.current}
                        sendMessage={this.sendMessageToServer}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDoctorPatient);
