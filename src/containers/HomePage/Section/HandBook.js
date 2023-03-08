import React, { Component } from 'react';
import './Style/HandBook.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class HandBook extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 700,
            slidesToShow: 2,
            slidesToScroll: 2,
        };
        return (
            <div className="section_handbook">
                <h1 className="title_section">Cẩm nang</h1>
                <div className="specialty_content">
                    <Slider {...settings}>
                        <div style={{ display: 'flex' }}>
                            <img src="https://cdn.bookingcare.vn/fr/w300/2022/11/29/113110-nha-khoa-peace-7.jpg" />
                            <h3>5 địa chỉ niềng răng bằng vật liệu hãng 3M uy tín tại TPHCM</h3>
                        </div>
                        <div>
                            <img src="https://cdn.bookingcare.vn/fr/w300/2022/12/14/174230-bac-si-co-xuong-khop-phan-3.png" />
                            <h3>6 Bác sĩ khám Cơ Xương Khớp giỏi tại TPHCM (phần 3)</h3>
                        </div>
                        <div>
                            <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120933-tieu-hoa.jpg" />
                            <h3>5 địa chỉ nha khoa uy tín với bác sĩ trên 5 năm kinh nghiệm tại TP HCM</h3>
                        </div>
                        <div>
                            <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120741-tim-mach.jpg" />
                            <h3>Tim mạch</h3>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
