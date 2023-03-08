import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getFeedbackDoctor } from '../../../services/adminService';

import * as actions from '../../../store/actions';
import Footer from '../../HomePage/Footer';
import MessageDoctorPatient from '../Chat/MessageDoctorPatient';
import HeaderDefaultSection from '../HeaderDefaultSection';
import FeedBackDoctor from './FeedBackDoctor';
import InfoAttached from './InfoAttached';
import IntroduceDoctor from './IntroduceDoctor';
import MedicalExaminaltionSchedule from './MedicalExaminaltionSchedule';
import './Style/DoctorDetailInfo.scss';
//

/////
class DoctorDetailInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inforDoctor: {},
            feedbacks: [],
        };
    }

    //// DID MOUNT ////
    async componentDidMount() {
        document.body.scrollTop = this.props.positionDoctorPage;
        document.title = this.props.inforDoctor.DoctorInfo?.name;
        const { match, getDetailInfoDoctor } = this.props;
        if (match && match.params.id) {
            const [{ data: res }, res2] = await Promise.all([
                getFeedbackDoctor(match.params.id),
                getDetailInfoDoctor(match.params.id),
            ]);

            if (res && res.errCode === 0) {
                this.setState({
                    feedbacks: res.feedbacks,
                });
            }
        }
    }

    ///// DID UPDATE /////
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.inforDoctor !== this.props.inforDoctor) {
            this.setState({
                inforDoctor: this.props.inforDoctor,
            });
            document.title = this.props.inforDoctor.DoctorInfo?.name;
        }
    }
    //
    componentWillUnmount() {
        this.props.getPositionDoctorPage(document.body.scrollTop);
    }
    ///

    //// RENDER ///
    render() {
        const { match } = this.props;
        const { inforDoctor: doctor, feedbacks } = this.state;
        return (
            <div className="detail-info-doctor-id" id="detail-info-doctor" ref={this.myRef}>
                <header> {<HeaderDefaultSection nameTitle={doctor.DoctorInfo ? doctor.DoctorInfo.name : ' '} />}</header>
                <div className="body">
                    <IntroduceDoctor doctorId={match.params.id} inforDoctor={doctor} />
                    <div className="schedule-doctor-detail">
                        <div className="container">
                            <div className="content-schdule-detail">
                                <div className="schedule-range-time ">
                                    <MedicalExaminaltionSchedule doctorId={match.params.id} inforDoctor={doctor} />
                                </div>
                                <div className="info-price">
                                    <InfoAttached doctorId={match.params.id} inforDoctor={doctor} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-info">
                        <div
                            className="container"
                            dangerouslySetInnerHTML={{ __html: doctor && doctor.Markdown ? doctor.Markdown.contentHTML : ' ' }}
                        >
                            {/* {doctor.Markdown.contentHTML} */}
                        </div>
                    </div>
                    <div className="response-patient">
                        <FeedBackDoctor feedbacks={feedbacks} />
                    </div>
                    <div>
                        <MessageDoctorPatient />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        position: state.app.position,
        inforDoctor: state.admin.inforDoctor,
        positionDoctorPage: state.app.positionDoctorPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDetailInfoDoctor: (doctorId) => dispatch(actions.fetchDetailInfoDoctor(doctorId)),
        getPositionDoctorPage: (scrollY) => dispatch(actions.getPostionScrollDoctorPage(scrollY)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorDetailInfo));
