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
        this.socket = React.createRef();
    }
    componentDidMount() {
        if (this.props.userInfo?.id) {
            this.socket.current = io.connect('http://localhost:8090');
            if (this.props.userInfo?.id) {
                this.socket.current.emit('add-new-user', this.props.userInfo?.id);
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {}
    componentWillUnmount() {}
    handleOpenConversation = () => {
        this.setState({
            isOpenConversation: !this.state.isOpenConversation,
        });
    };
    sendMessageToServer = (senderId, receiverId, text) => {
        this.socket.current.emit('send-message', {
            text,
            senderId,
            receiverId,
        });
       
    };
    render() {
        return (
            <div className="container-message-patient-doctor">
                <div className="img-message" onClick={this.handleOpenConversation}>
                    <img src={iconMessage} />
                </div>
                <div>
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
