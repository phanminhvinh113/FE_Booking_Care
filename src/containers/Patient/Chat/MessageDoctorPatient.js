import React, { Component } from 'react';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import * as actions from '../../../store/actions';
import iconMessage from '../../../assets/images/Chat/chat_patient_doctor.png';
import Conversation from './Conversation';
import './Style/MessageDoctorPatient.scss';

class MessageDoctorPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenConversation: false,
            text: '',
        };
        this.MessIcon = React.createRef();
        this.Conversation = React.createRef();
        this.socket = io.connect('http://localhost:8090');
        this.handleClickOutSide = this.handleClickOutSide.bind(this);
    }
    async componentDidMount() {
        // LISTEN EVENT MOUSE CLICK OUTSIDE
        document.addEventListener('mousedown', this.handleClickOutSide);
        // EMIT USER ACTIVE
        if (this.props.userInfo?.id) {
            await this.socket.emit('add-new-user', this.props.userInfo?.id);
        }
        //GET USER ACTIVE
        this.socket.on('get-user-active', (users) => {
            console.log(users);
        });
    }
    //UPDATE
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userInfo !== this.props.userInfo && this.props.userInfo?.id) {
            await this.socket.emit('add-new-user', this.props.userInfo.id);
        }
    }
    // UN MOUNTED
    async componentWillUnmount() {
        await this.socket.disconnect();
        document.removeEventListener('mousedown', this.handleClickOutSide);
    }
    //
    handleOpenConversation = async () => {
        //GET MESSAGE WHEN CHAT BOX OPEN
        if (this.props.userInfo?.id && !this.state.isOpenConversation) {
            await this.props.getMessagePatientDoctor(this.props.userInfo.id, this.props.doctorId);
        }
        //OPEN CHAT BOX
        this.setState({
            isOpenConversation: !this.state.isOpenConversation,
        });
    };
    //
    handleClickOutSide = (e) => {
        if (this.Conversation.current && !this.Conversation.current.contains(e.target) && !this.MessIcon.current.contains(e.target)) {
            this.setState({
                isOpenConversation: false,
            });
        }
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
                        socket={this.socket}
                        sendMessage={this.sendMessageToServer}
                        Conversation={this.props.Conversation}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        Conversation: state.user.Conversation,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMessagePatientDoctor: (senderId, receiverId) => dispatch(actions.getMessagePatientDoctor(senderId, receiverId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDoctorPatient);
