import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Style/FeedBackDoctor.scss';

/////
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
                                    <div key={index} className="patient-feedback">
                                        <strong>{feedback?.patient?.firstName || ''}</strong>
                                        <span className="rate">
                                            {feedback?.rate || ''}
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                        <span className="date"> Vào ngày {feedback?.date || ''}</span>
                                        <div className="comment">{feedback?.comment || ''}</div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackDoctor);
