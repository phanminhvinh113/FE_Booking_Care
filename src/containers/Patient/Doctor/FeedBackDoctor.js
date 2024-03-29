import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import './Style/FeedBackDoctor.scss';

class FeedBackDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbacks: this.props.feedbacks,
        };
    }
    //// DID MOUNT ////
    async componentDidMount() {}
    ///// DID UPDATE /////
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.feedbacks !== this.props.feedbacks) {
            this.setState({
                feedbacks: this.props.feedbacks,
            });
        }
    }
    //
    getListReplies = (id) => {
        return this.props.feedbacks.filter((feedback) => feedback.parentId === id);
    };
    //// RENDER ///
    render() {
        return (
            <div className="feedback-patient-for-doctor ">
                <div className="container mt-4">
                    <h2> Phản hồi của bệnh nhân sau khi khám</h2>
                    <div className="list-feedbacks mt-4">
                        {!!this.state.feedbacks.length &&
                            this.state.feedbacks.map((feedback, index) => {
                                return (
                                    feedback.parentId === 0 && (
                                        <Comment
                                            key={feedback.id}
                                            feedback={feedback}
                                            parentId={feedback.parentId}
                                            id={feedback.id}
                                            doctorId={this.props.doctorId}
                                            getListReplies={this.getListReplies(feedback.id)}
                                        />
                                    )
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        feedbacks: state.admin.feedbacks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackDoctor);
