import React, { Component } from 'react';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './Style/DoctorDetailInfo.scss';
import '../Specialty/Style/SpecialtyDetailInfo.scss';

/////
class IntroduceDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inforDoctor: this.props.inforDoctor,
        };
    }
    //// DID MOUNT ////
    async componentDidMount() {}

    ///// DID UPDATE /////
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.inforDoctor !== this.props.inforDoctor) {
            this.setState({
                inforDoctor: this.props.inforDoctor,
            });
        }
    }
    //
    handleViewDoctorInSpecialty = () => {
        this.props.history.push(`/detail-doctor/${this.props.doctorId}`);
        this.props.getPostionScrollSpecialtyPage(document.body.scrollTop);
        this.props.getPositionDoctorPage(0);
    };
    //// RENDER ///
    render() {
        const { inforDoctor: doctor } = this.state;
        const { specialty } = this.props;

        return (
            <div className="intro-doctor-page">
                <div className="container intro-doctor ">
                    <div className="left">
                        <img src={doctor.image && doctor.image} />
                        {specialty && (
                            <div>
                                <div onClick={this.handleViewDoctorInSpecialty} className="more-info-doctor">
                                    Xem thêm
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="right">
                        {!specialty && <h1>{!!doctor.DoctorInfo && doctor.DoctorInfo.name}</h1>}
                        {specialty && (
                            <a onClick={this.handleViewDoctorInSpecialty}>{!!doctor.DoctorInfo && doctor.DoctorInfo.name}</a>
                        )}
                        <div className="description-intro">{!!doctor && !!doctor.Markdown && doctor.Markdown.description}</div>
                        {specialty && (
                            <div className="location">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>{doctor && doctor.DoctorInfo && doctor.DoctorInfo.province.valueVI}</span>
                            </div>
                        )}
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
    return {
        getPostionScrollSpecialtyPage: (scrollY) => dispatch(actions.getPostionScrollSpecialtyPage(scrollY)),
        getPositionDoctorPage: (scrollY) => dispatch(actions.getPostionScrollDoctorPage(scrollY)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IntroduceDoctor));
