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
            userActive: [],
        };
        this.socket = React.createRef();
    }
    componentDidMount() {
        const { doctorInfo } = this.props;
        //console.log(this.props.doctorInfo);
        if (this.props.doctorInfo?.id) {
            this.socket.current = io.connect('http://localhost:8090');
            if (doctorInfo) {
                this.socket.current.emit('add-new-user', doctorInfo?.id);
                this.socket.current.on('get-user-active', (user) => {
                    this.setState(
                        {
                            userActive: user,
                        },
                        () => {
                            console.log(this.state.userActive);
                        },
                    );
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {}
    componentWillUnmount() {}
    render() {
        return (
            <Wrapper>
                <ChatGroup socket={this.socket} />
                <ConversationMessage socket={this.socket.current} />
            </Wrapper>
        );
    }
}

//
ManageConversationDoctor.propTypes = {};
//
const mapStateToProps = (state) => {
    return {
        doctorInfo: state.user.userInfo,
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
