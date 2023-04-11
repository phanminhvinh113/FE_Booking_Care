import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faReply, faStar } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolTip from '../../../components/Tippy/ToolTip';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            isOpenCommentForm: false,
            text: '',
        };
    }
    //
    componentDidMount() {}
    //
    componentDidUpdate(prevProps, prevState, snapshot) {}

    //
    handleReplyComment = () => {
        this.setState({
            isOpenCommentForm: !this.state.isOpenCommentForm,
        });
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
            console.log('press enter');
        }
    };
    render() {
        const { feedback } = this.props;
        return (
            <Wrapper>
                <Name>
                    {feedback.patient?.firstName} {feedback.patient?.lastName}
                </Name>
                <Rate>
                    {feedback?.rate}
                    <FontAwesomeIcon icon={faStar} />
                </Rate>
                <Date> Vào ngày {feedback?.date}</Date>
                <Reply>
                    <CommentText>{feedback?.comment}</CommentText>
                    <ToolTip content="Phản hồi" position="right">
                        <FontAwesomeIcon onClick={this.handleReplyComment} icon={faReply} className="reply" beat={true} />
                    </ToolTip>

                    <ToolTip content="Bình luận" position="right" size="12">
                        <FontAwesomeIcon icon={faCommentDots} className="comment" />
                    </ToolTip>
                </Reply>
                {/* <CommentReply>{feedback?.parentId && feedback?.id === feedback?.parentId && ()}</CommentReply> */}

                {!this.state.isOpenCommentForm && (
                    <ReplyForm className="reply-form">
                        <Input
                            withScroll="5px"
                            textContent={this.state.text}
                            contentEditable={true}
                            data-placeholder="Typing..."
                            spellCheck={true}
                            data-lexical-editor={true}
                            suppressContentEditableWarning={true}
                            onInput={(e) => this.handleOnChangeInput(e)}
                            onKeyDown={(e) => this.handlePressEnter(e)}
                        ></Input>
                        <FontAwesomeIcon className="send-btn" icon={faPaperPlane} />
                    </ReplyForm>
                )}
            </Wrapper>
        );
    }
}

Comment.propTypes = {};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
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
    border-top: 1px solid #ccc;
    margin: 10px 0;
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
const Reply = styled.span`
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
    .comment {
        cursor: pointer;
        margin-top: 10px;
        margin-left: 15px;
        font-size: 1.9rem;
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
