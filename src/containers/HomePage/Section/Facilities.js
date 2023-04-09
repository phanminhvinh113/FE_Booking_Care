import React, { Component } from 'react';
import './Style/Facilities.scss';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

class Facilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: this.props.topClinic,
        };
    }
    async componentDidMount() {}
    async componentDidUpdate(prevProps) {
        if (prevProps.topClinic !== this.props.topClinic) {
            this.setState({
                listClinic: this.props.topClinic,
            });
        }
    }
    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 700,
            slidesToShow: 4,
            slidesToScroll: 2,
        };
        const { listClinic } = this.state;
        return (
            <div className="section_facilites">
                <h1 className="title_section">Cơ sở y tế nổi bật</h1>
                <div className="specialty_content">
                    <Slider {...settings}>
                        {!!listClinic.length &&
                            listClinic.map((clinic, index) => {
                                return (
                                    <Link key={index}>
                                        <img src={clinic.image} />
                                        <h3>{clinic.name}</h3>
                                    </Link>
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
        topClinic: state.admin.topClinicHome,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Facilities);
