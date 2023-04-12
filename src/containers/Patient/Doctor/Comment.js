import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import moment from 'moment';
import { commentEvaluteMical } from '../../../services/userService';
import { faReply, faStar } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolTip from '../../../components/Tippy/ToolTip';
import { ROLE_USER, manageActions } from '../../../utils';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenCommentForm: false,
            isOpenListReply: false,
            comment: '',
            feedbacks: [],
            type: manageActions.CREATE,
        };
        this.inputRef = React.createRef();
        this.date = moment().format('DD/MM/YYYY');
    }
    //
    componentDidMount() {}
    //
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.feedbacks !== this.props.feedbacks) {
            this.setState({
                feedbacks: this.props.feedbacks,
            });
        }
    }

    //
    handleReplyComment = () => {
        this.setState({
            isOpenCommentForm: !this.state.isOpenCommentForm,
        });
    };
    //
    handleOpenLisReply = () => {
        this.setState({
            isOpenListReply: !this.state.isOpenListReply,
        });
    };
    //
    handleOnChangeInput = (e) => {
        if (e.target.textContent) {
            this.setState({
                comment: e.target.textContent,
            });
        }
    };
    //
    handlePressEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.sendComment();
        }
    };
    //
    contentToolTip = (replies) => {
        if (!replies) return 'Chưa có bình luận';
        if (this.state.isOpenListReply) return 'Ẩn các bình luận';
        if (replies) return `Xem ${replies} bình luận`;
    };
    //
    getListReplies = (id) => {
        return this.props.feedbacks.filter((feedback) => feedback.parentId === id);
    };
    //
    sendComment = async () => {
        const { id } = this.props;
        const dataSend = {
            comment: this.state.comment,
            parentId: id,
            doctorId: +this.props?.doctorId,
            patientId: this.props.userInfo?.id,
            token: ROLE_USER.PATIENT,
            date: this.date,
            type: this.state.type,
        };
        const { data: response } = await commentEvaluteMical(dataSend);
        if (response && response.errCode === 0) {
            this.inputRef.current.textContent = '';
            this.setState({
                isOpenCommentForm: false,
                isOpenListReply: true,
            });
            await this.props.getFeedbackDoctor(this.props.doctorId);
        }
    };
    render() {
        const { feedback } = this.props;
        return (
            <Wrapper hiddenBorder={this.state.isOpenListReply} className={this.props.className ? this.props.className : null}>
                <Name>
                    {feedback.patient?.firstName} {feedback.patient?.lastName}
                </Name>
                <Rate>
                    {feedback?.rate}
                    {feedback?.rate && <FontAwesomeIcon icon={faStar} />}
                </Rate>
                <Date> Vào ngày {feedback?.date}</Date>
                <ReplyIcon>
                    <CommentText>{feedback?.comment}</CommentText>
                    {feedback.patientId !== this.props.userInfo?.id && (
                        <ToolTip content="Phản hồi" position="left">
                            <FontAwesomeIcon onClick={this.handleReplyComment} icon={faReply} className="reply" beat={true} />
                        </ToolTip>
                    )}

                    <ToolTip content={this.contentToolTip(feedback?.countReplies)} position="right" size="12">
                        <ViewCommnet>
                            {feedback?.countReplies > 0 && !this.state.isOpenListReply && (
                                <CountReplies>{feedback?.countReplies}</CountReplies>
                            )}
                            <FontAwesomeIcon onClick={this.handleOpenLisReply} icon={faCommentDots} className="comment" />
                        </ViewCommnet>
                    </ToolTip>
                </ReplyIcon>
                {this.state.isOpenCommentForm && (
                    <ReplyForm className="reply-form">
                        <Input
                            ref={this.inputRef}
                            withScroll="5px"
                            textContent={this.state.comment}
                            contentEditable={true}
                            data-placeholder="Typing..."
                            spellCheck={true}
                            data-lexical-editor={true}
                            suppressContentEditableWarning={true}
                            onInput={(e) => this.handleOnChangeInput(e)}
                            onKeyDown={(e) => this.handlePressEnter(e)}
                        ></Input>
                        <FontAwesomeIcon onClick={this.sendComment} className="send-btn" icon={faPaperPlane} />
                    </ReplyForm>
                )}
                {this.state.isOpenListReply && !!this.props.getListReplies.length && (
                    <ListReplies className="reply-list">
                        {this.props.getListReplies.map((feedback) => {
                            return (
                                <Comment
                                    hiddenBorderItem={this.state.isOpenListReply}
                                    className="reply-item"
                                    key={feedback.id}
                                    feedback={feedback}
                                    parentId={feedback.parentId}
                                    id={feedback.id}
                                    doctorId={this.props.doctorId}
                                    getListReplies={this.getListReplies(feedback.id)}
                                    userInfo={this.props.userInfo}
                                    getFeedbackDoctor={this.props.getFeedbackDoctor}
                                    feedbacks={this.props.feedbacks}
                                />
                            );
                        })}
                    </ListReplies>
                )}
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        feedbacks: state.admin.feedbacks,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFeedbackDoctor: (doctorId) => dispatch(actions.getFeedbackDoctorService(doctorId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

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
//STYLED
const Wrapper = styled.div`
    position: relative;
    z-index: 100;
    border-top: 1px solid #ccc;
    margin: 10px 0;
    .reply-item {
        border: none;
    }
`;
const Name = styled.strong`
    margin-right: 5px;
    font-style: italic;
    color: #333333db;
`;
const Rate = styled.span`
    margin-left: 20px;
    svg {
        margin-left: 5px;
        color: #ffc92b;
    }
`;
const Date = styled.span``;

const CommentText = styled.div`
    background-color: #eee;
    font-size: 1.8rem;
    padding: 5px 15px;
    border-radius: 12px;
`;
const ReplyIcon = styled.span`
    display: flex;
    align-items: center;
    margin-top: 15px;
    .reply {
        margin-top: 10px;
        margin-left: 40px;
        cursor: pointer;
        font-size: 1.7rem;
        &:hover {
            transition: all 0.4s linear;
        }
    }
`;

const ReplyForm = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 50px 0 0 10px;
    .send-btn {
        position: absolute;
        right: 22%;
        color: #339399;
        cursor: pointer;
        font-size: 1.7rem;
        &:hover {
            scale: 1.2;
            transition: all 0.3s linear;
        }
    }
`;
const Input = styled(scrollbar)`
    position: relative;
    margin: auto;
    border: none;
    outline: none;
    font-size: 1.7rem;
    display: flex;
    align-items: center;
    padding: 10px 32px;
    width: 60%;
    max-height: 180px;
    border-radius: 30px;
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
    span {
        background-color: transparent;
        color: #000;
        font-size: 1.8rem;
    }
`;
const ViewCommnet = styled.div`
    position: relative;
    .comment {
        cursor: pointer;
        margin-top: 10px;
        margin-left: 15px;
        font-size: 2.2rem;
    }
`;
const CountReplies = styled.span`
    position: absolute;
    top: -4px;
    right: -10px;
    height: 20px;
    width: 20px;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    background-color: #45c3d2;
`;
const ListReplies = styled.div`
    padding-left: 50px;
`;
