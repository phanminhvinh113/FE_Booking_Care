import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _, { entries } from 'lodash';
import * as actions from '../../../store/actions';
import styled, { css } from 'styled-components';
import BackGroundChat from '../../../assets/images/Chat/chat-group.jpg';
import { format } from 'timeago.js';
import imgGuest from '../../../assets/images/Chat/guest.png';
import imgBookingCare from '../../../assets/images/Chat/bookingcare_chat.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';

import PropTypes from 'prop-types';

class ConversationMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            arrMessage: [],
            image: null,
            limit: 20,
            offset: 0,
            getMore: false,
            loading: false,
            fullMessage: false,
            scrollTo: 0,
        };
        //
        this.observer = null;
        this.InputRef = React.createRef();
        this.Message = React.createRef();
        this.targetRef = React.createRef();
        this.ChatBox = React.createRef();
        //
    }
    //
    async componentDidMount() {
        //
        this.props.socket.on('get-message', async (message) => {
            if (message && message.senderId === this.props.patientInfo?.User.id && message.receiverId === this.props.doctorInfo?.id) {
                this.setState(
                    {
                        arrMessage: [...this.state.arrMessage, message],
                        text: '',
                    },
                    () => {
                        this.ChatBox.current.scrollTop = this.ChatBox.current?.scrollHeight;
                    },
                );
            }
        });
        //
        this.Message.current?.scrollIntoView({ behavior: 'smooth' });
        //
        if (this.props.patientInfo && this.props.doctorInfo) {
            await this.getMessageFromServer(this.props.doctorInfo?.id, this.props.patientInfo?.User.id);
        }
        //
        this.ChatBox.current.scrollTop = this.ChatBox.current?.scrollHeight;
        //
        this.setState({
            scrollTo: this.ChatBox.current?.scrollHeight,
        });
        //
        this.intersectionObsever();
    }
    //
    async componentDidUpdate(prevProps, prevState, snapshot) {
        //
        if (prevState.arrMessage !== this.state.arrMessage) {
            // this.targetRef.current?.scrollIntoView({ behavior: 'smooth' });
            // console.log(this.targetRef.current);
        }
        //
        if (prevProps.patientInfo !== this.props.patientInfo) {
            this.state.arrMessage = [];
            this.state.offset = 0;
            this.state.scrollTo = this.ChatBox.current?.scrollHeight;
            console.log(this.ChatBox.current.scrollHeight);

            await this.getMessageFromServer(this.props.doctorInfo?.id, this.props.patientInfo?.User.id);

            this.ChatBox.current.scrollTop = this.ChatBox.current.scrollHeight;
            this.intersectionObsever();
        }
        //
        if (prevProps.Conversation !== this.props.Conversation && prevProps.patientInfo === this.props.patientInfo) {
            this.setState((prev) => ({
                arrMessage: [...this.props.Conversation.sort((a, b) => a.time - b.time), ...prev.arrMessage],
                fullMessage: this.props.Conversation.length < this.state.limit ? true : false,
                scrollTo: this.ChatBox.current.scrollHeight,
            }));
        }
    }
    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
    //GET MESSAGE FROM SEVER
    getMessageFromServer = async (senderId, receiverId) => {
        await this.props.getMessagePatientDoctor({ senderId, receiverId });
    };
    //
    handleOnChangeInput = (e) => {
        if (e.target.textContent) {
            this.setState({
                text: e.target.textContent,
            });
        }
    };
    //
    handlePressEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.sendMessage();
        }
    };
    //
    sendMessageToServer = (senderId, receiverId, text) => {
        if (senderId && receiverId && text) {
            this.props.socket.emit('send-message', {
                text,
                senderId,
                receiverId,
                time: new Date().getTime(),
            });
        }
    };
    //
    sendMessage = async () => {
        if (this.state.text.trim()) {
            this.sendMessageToServer(
                _.get(this.props.doctorInfo, 'id', 'null'),
                _.get(this.props.patientInfo?.User, 'id', 'null'),
                this.state?.text.trim(),
            );
            this.setState(
                {
                    arrMessage: [
                        ...this.state.arrMessage,
                        {
                            senderId: _.get(this.props.doctorInfo, 'id', 'null'),
                            text: this.state?.text.trim() || ' ',
                            time: new Date(),
                        },
                    ],
                    text: '',
                },
                () => {
                    this.ChatBox.current.scrollTop = this.ChatBox.current?.scrollHeight;
                },
            );

            this.pushPatientOnTopList(this.props.listConversation, this.props.patientInfo?.senderId);
        }
        if (!this.state.text.trim()) {
            this.setState({
                text: '',
            });
        }
        this.InputRef.current?.focus();
        this.InputRef.current.textContent = '';
    };
    // PUSH USER CHATTIN ON TOP
    pushPatientOnTopList = async (listConversation, targetPatientId) => {
        if (!listConversation.length || listConversation[0].senderId === targetPatientId) return;
        //
        listConversation.forEach((conversation, index) => {
            if (conversation.senderId === targetPatientId) {
                listConversation.unshift(listConversation.splice(index, 1)[0]);
            }
        });
        //
        this.props.sortListConversation(_.get(this.props.patientInfo, 'senderId', 'null'));
    };
    //
    getMoreMessage = async () => {
        this.setState({
            getMore: true,
            loading: true,
        });
        setTimeout(async () => {
            this.setState((prevState) => ({
                offset: prevState.offset + this.state.limit,
            }));
            if (this.props.doctorInfo && this.props.patientInfo) {
                await this.props.getMessagePatientDoctor({
                    senderId: this.props.doctorInfo?.id,
                    receiverId: this.props.patientInfo?.User.id,
                    limit: this.state.limit,
                    offset: this.state.offset,
                });
            }

            this.ChatBox.current.scrollTop = this.ChatBox.current?.scrollHeight - this.state.scrollTo;

            this.setState({
                getMore: false,
                loading: false,
            });
        }, 200);
    };
    //
    intersectionObsever = () => {
        const options = {
            threshold: 1,
        };
        this.observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting && !this.state.fullMessage) {
                await this.getMoreMessage();
            }
        }, options);
        this.targetRef.current && this.observer.observe(this.targetRef.current);
    };
    render() {
        return (
            <Wrapper>
                <Header>
                    {this.props.patientInfo && (
                        <>
                            <img src={_.get(this.props.patientInfo?.User, 'image', `${imgGuest}`) || imgGuest} />
                            <h2>
                                {_.get(this.props.patientInfo?.User, 'firstName', '') +
                                    ' ' +
                                    _.get(this.props.patientInfo?.User, 'lastName', '')}
                            </h2>
                        </>
                    )}
                    {!this.props.patientInfo && <h2>CHỌN BỆNH NHÂN</h2>}
                </Header>
                <MainChat ref={this.ChatBox} withScroll={'8px'}>
                    {this.state.loading && <ClipLoader size={22} color="#ccc" className="loading" />}
                    {this.state.arrMessage &&
                        this.state.arrMessage.map((item, index) => (
                            <MessItem
                                ref={index === 0 ? this.targetRef : this.Message}
                                key={index}
                                type={item.senderId === this.props.doctorInfo.id ? true : false}
                            >
                                <img
                                    src={
                                        item.senderId === this.props.doctorInfo?.id
                                            ? _.get(this.props.doctorInfo, 'image', `${imgBookingCare}`) || imgBookingCare
                                            : _.get(this.props.patientInfo.User, 'image', `${imgGuest}`) || imgGuest
                                    }
                                />
                                <WrapperTextTime>
                                    <Text type={item.senderId === this.props.doctorInfo?.id ? true : false}>{item.text}</Text>
                                    <Time>{format(item.time) !== 'just now' && format(item.time)}</Time>
                                </WrapperTextTime>
                            </MessItem>
                        ))}
                </MainChat>
                <InputChat>
                    <TypingInput
                        ref={this.InputRef}
                        withScroll={'5px'}
                        textContent={this.state.text}
                        contentEditable={this.props.patientInfo ? true : false}
                        data-placeholder="Typing..."
                        spellCheck={true}
                        data-lexical-editor={true}
                        suppressContentEditableWarning={true}
                        onInput={(e) => this.handleOnChangeInput(e)}
                        onKeyDown={(e) => this.handlePressEnter(e)}
                    ></TypingInput>
                    <FontAwesomeIcon icon={faPaperPlane} onClick={this.sendMessage} />
                </InputChat>
            </Wrapper>
        );
    }
}
//
ConversationMessage.propTypes = {};
//
const mapStateToProps = (state) => {
    return {
        doctorInfo: state.user.userInfo,
        Conversation: state.user.Conversation,
        patientInfo: state.user.patientInfo,
        listConversation: state.user.listConversation,
    };
};
//
const mapDispatchToProps = (dispatch) => {
    return {
        getMessagePatientDoctor: (requirement) => dispatch(actions.getMessagePatientDoctor(requirement)),
        sortListConversation: (newListConversation) => dispatch(actions.sortListConversation(newListConversation)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationMessage));

//                   STYLE                  /////
//
const scrollbar = styled.div`
    /* width */
    ::-webkit-scrollbar {
        width: ${(props) => props.withScroll};
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 8px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #ccc;
    }
`;
//MAIN CONVERSATION
const MainChat = styled(scrollbar)`
    display: grid;
    padding: 10px;
    overflow-y: overlay;
    height: 75%;
    .loading {
        margin: auto;
    }
`;
const MessItem = styled.div`
    display: flex;
    margin: 5px 0;
    flex-direction: ${(props) => (props.type ? 'row-reverse' : 'row')};
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
`;
const WrapperTextTime = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Text = styled.p`
    max-width: 500px;
    font-size: 1.6rem;
    margin: 15px 5px 5px 5px;
    padding: 10px 10px;
    border-radius: 8px;
    background-color: ${(props) => (props.type ? '#45c3d2' : '#ccc')};
    color: ${(props) => (props.type ? '#f1f1f1' : '#000')};
    display: flex;
    flex-wrap: wrap;
    overflow-wrap: anywhere;
`;
const Time = styled.div`
    font-size: 1.1rem;
`;

// INPUT
const Wrapper = styled.div`
    width: 100%;
    position: relative;
    background: url(${BackGroundChat});
`;
//
const Header = styled.header`
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #cccccc69;
    height: 10%;
    width: 100%;
    z-index: 2;
    img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
    h2 {
        margin: 0 10px;
        font-style: italic;
    }
`;

const InputChat = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #eee;
    width: 100%;
    background-color: #fff;
    padding: 20px 0;
    svg {
        font-size: 2.5rem;
        cursor: pointer;
        opacity: 0.7;
        margin-right: 20px;
        transition: all 0.3s ease-in-out;
        &:hover {
            color: #45c3d2;
            scale: 1.1;
        }
    }
`;
const TypingInput = styled(scrollbar)`
    border: none;
    outline: none;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    padding: 10px 30px;
    width: 80%;
    max-height: 150px;
    border-radius: 10px;
    box-shadow: 0 -5px 30px 0 rgba(0, 0, 0, 0.1);
    background-color: #dbdada;
    overflow-y: overlay;
    user-select: text;
    display: flex;
    flex-wrap: wrap;
    overflow-wrap: anywhere;
    &:empty:before {
        content: attr(data-placeholder);
        color: gray;
    }
`;
