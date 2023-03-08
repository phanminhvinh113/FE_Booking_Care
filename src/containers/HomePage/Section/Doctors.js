import React, { Component } from 'react';
import * as actions from '../../../store/actions';
import './Style/Doctors.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class Doctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 0,
            doctorsArr: this.props.doctors,
        };
    }
    async componentDidMount() {}
    componentWillUnmount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctorsArr: this.props.doctors,
            });
        }
    }
    handleViewDetailDoctor = (doctor) => {
        this.props.getPositionDoctorPage(0);
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };

    render() {
        ///
        const settings = {
            dots: false,
            infinite: false,
            speed: 700,
            slidesToShow: 4,
            slidesToScroll: 2,
        };
        //

        ////
        return (
            <div className="section_doctors">
                <h1 className="title_section">Bác sĩ nổi bật tuần qua</h1>
                <div className="specialty_content">
                    <Slider {...settings}>
                        {this.state.doctorsArr.map((doctor, index) => {
                            return (
                                <div key={index} className="wrapper" onClick={() => this.handleViewDetailDoctor(doctor)}>
                                    <a>
                                        <div className="img-border">
                                            <img src={!!doctor && doctor.image} alt="" />
                                        </div>
                                        <h3>{doctor.DoctorInfo?.name}</h3>
                                        <h5>{doctor.DoctorInfo.specs.valueVI || ' '}</h5>
                                    </a>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctors: state.admin.doctorsTopHome,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctors: (limit) => dispatch(actions.getTopDoctorHomePage(limit)),
        getPositionDoctorPage: (scrollY) => dispatch(actions.getPostionScrollDoctorPage(scrollY)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctors));
