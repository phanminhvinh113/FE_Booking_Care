import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import ChatGroup from './ChatGroup';
import ConversationMessage from './ConversationMessage';
import PropTypes from 'prop-types';

class ManageConversationDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.doctorInfo,
        };
        this.socket = io.connect('http://localhost:8090');
    }
    async componentDidMount() {
        //
        const { doctorInfo } = this.props;
        //
        if (doctorInfo?.id) {
            await this.socket.emit('add-new-user', doctorInfo.id);
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {}
    async componentWillUnmount() {
        await this.socket.disconnect();
    }
    //
    pushConversationOnTop = (items) => {
        if (items[0] === targetItem) return;
        items.forEach((element, index) => {
            if (element.senderId === this.props.patientInfo?.senderId) {
                items.unshift(items.splice(index, 1));
            }
        });
        return items;
    };
    //
    render() {
        return (
            <Wrapper>
                <ChatGroup socket={this.socket} pushConversationOnTop={this.pushConversationOnTop} />
                <ConversationMessage socket={this.socket} />
            </Wrapper>
        );
    }
}

//PROPS TYPE
ManageConversationDoctor.propTypes = {};
//
const mapStateToProps = (state) => {
    return {
        doctorInfo: state.user.userInfo,
        patientInfo: state.user.patientInfo,
    };
};
//
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageConversationDoctor));

//STYLE
const Wrapper = styled.div`
    position: fixed;
    top: 40px;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
`;
