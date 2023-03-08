import React, { Component } from 'react';
import './Style/Footer.scss';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLocationDot, faMobileScreen } from '@fortawesome/free-solid-svg-icons';

class Footer extends Component {
    render() {
        return (
            <footer className="footer-app">
                <div className="footer_home_page">
                    <div className="content_footer container">
                        <div className="row">
                            <div className="col col-6">
                                <Link to="/">
                                    <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" width="200" height="44" />
                                </Link>
                                <div className="address_company">
                                    <h2>Công ty Cổ phần Công nghệ BookingCare</h2>
                                    <address>
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                                    </address>
                                    <address>
                                        <FontAwesomeIcon icon={faCheck} />
                                        28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                                    </address>
                                </div>
                                <div className="accreditation">
                                    <a href="#">
                                        <img
                                            src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg "
                                            width="78"
                                            height="30"
                                        />
                                    </a>
                                    <a href="#">
                                        <img
                                            src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg "
                                            width="78"
                                            height="30"
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className="col col-3">
                                <ul className="contact">
                                    <li>
                                        <a href="#">Liên hệ hợp tác</a>
                                    </li>
                                    <li>
                                        <a href="#">Gói chuyển đổi số doanh nghiệp</a>
                                    </li>
                                    <li>
                                        <a href="#">Tuyển dụng</a>
                                    </li>
                                    <li>
                                        <a href="#">Câu hỏi thường gặp</a>
                                    </li>
                                    <li>
                                        <a href="#">Điều khoản sử dụng</a>
                                    </li>
                                    <li>
                                        <a href="#">Chính sách Bảo mật</a>
                                    </li>
                                    <li>
                                        <a href="#">Quy trình hỗ trợ giải quyết khiếu nại</a>
                                    </li>
                                    <li>
                                        <a href="#">Quy chế hoạt động</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col col-3">
                                <div className="headquarters">
                                    <strong>Trụ sở tại Hà Nội</strong>
                                    <br />
                                    28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                                </div>
                                <div className="headquarters">
                                    <strong>Văn phòng tại TP Hồ Chí Minh</strong>
                                    <br />
                                    Số 01, Hồ Bá Kiện, Phường 15, Quận 10
                                </div>
                                <div className="headquarters support">
                                    <strong>Hỗ trợ khách hàng</strong>
                                    <br />
                                    support@bookingcare.vn (7h30 - 18h)
                                </div>
                            </div>
                        </div>
                        <span className="end_content">
                            <FontAwesomeIcon icon={faMobileScreen} />
                            <span style={{ margin: '0 0 0 5px' }}>
                                Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:{' '}
                            </span>
                            <span style={{ color: '#45c3d2' }}>Android/ iPhone/ iPadKhác</span>
                        </span>
                    </div>
                </div>
                <div className="footer_app">
                    <div className="container">
                        <div className="row">
                            <div className="col col-10">
                                <small>© 2022 BookingCare.</small>
                            </div>
                            <div className="col col-2">
                                <img
                                    className="nut-mxh"
                                    width="32"
                                    height="32"
                                    src="https://bookingcare.vn/themes/app1912/assets/img/social/facebook-square.svg"
                                />
                                <img
                                    className="nut-mxh"
                                    width="32"
                                    height="32"
                                    src="https://bookingcare.vn/themes/app1912/assets/img/social/youtube-square.svg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
