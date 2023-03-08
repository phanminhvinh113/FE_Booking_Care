import React, { Component } from 'react';
import './Style/Specialty.scss';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: this.props.listSpecialty,
        };
    }
    // DID MOUNT
    componentDidMount() {}
    //DID UPDATE
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                arrSpecialty: this.props.listSpecialty,
            });
        }
    }
    //
    handleViewDetailSpecialty = (specialtyId) => {
        this.props.getPostionScrollSpecialtyPage(0);
        this.props.history.push(`/detail-specialty/${specialtyId}`);
    };
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 700,
            slidesToShow: 4,
            slidesToScroll: 2,
        };
        const { listSpecialty } = this.props;
        return (
            <div className="section_specialty">
                <h1 className="title_section">Chuyên Khoa Phổ Biến</h1>
                <div className="specialty_content">
                    <Slider {...settings}>
                        {!!listSpecialty.length &&
                            listSpecialty.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => this.handleViewDetailSpecialty(item.specialtyId)}>
                                        <img src={item.image} />
                                        <h3>{item.name}</h3>
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
        listSpecialty: state.admin.topSpecialtyHome,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTopSpecialty: (limit) => dispatch(actions.fetchTopSpecialtyHome(limit)),
        getPostionScrollSpecialtyPage: (scrollY) => dispatch(actions.getPostionScrollSpecialtyPage(scrollY)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
