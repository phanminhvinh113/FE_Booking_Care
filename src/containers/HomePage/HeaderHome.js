import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AavatarUser from './User/AavatarUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import { languages, path } from '../../utils/constant';
import { changingLanguageApp } from '../../store/actions';
import SideBarNav from './SideBar/SideBarNav';
import './Style/HomeHeader.scss';
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    changeLanguage = (language) => {
        this.props.changingLanguageAppRedux(language);
    };
    render() {
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="header">
                            <SideBarNav />
                            <div className="logo"></div>
                        </div>
                        <div className="body">
                            <div>
                                <Link to={path.SPECIALTYHEADER}>
                                    <FormattedMessage id="homeHeader.specialty" />
                                </Link>
                                <span>
                                    <FormattedMessage id="homeHeader.Find_out_doctor_by_specialty" />
                                </span>
                            </div>
                            <div>
                                <Link to={path.HEALTHFACILITIESHEADER}>
                                    <FormattedMessage id="homeHeader.Health_facilities" />
                                </Link>
                                <span>
                                    <FormattedMessage id="homeHeader.Choose_hospital_clinic" />
                                </span>
                            </div>
                            <div>
                                <Link to={path.DOCTORHEADER}>
                                    <FormattedMessage id="homeHeader.Doctor" />
                                </Link>
                                <span>
                                    <FormattedMessage id="homeHeader.Choose_a_good_doctor" />
                                </span>
                            </div>
                            <div>
                                <Link to={path.EXAMINATIONPACKAGEHEADER}>
                                    <FormattedMessage id="homeHeader.Checkup_package" />
                                </Link>
                                <span>
                                    <FormattedMessage id="homeHeader.General_health_check" />
                                </span>
                            </div>
                        </div>
                        <div className="footer">
                            <FontAwesomeIcon icon={faCircleQuestion} style={{ color: ' #45c3d2' }} />
                            <span>
                                <FormattedMessage id="homeHeader.Help" />
                            </span>
                        </div>
                        <div className="language">
                            <div className={this.props.language === languages.VI ? 'vi active' : 'vi'}>
                                <span onClick={() => this.changeLanguage(languages.VI)}>VN</span>
                            </div>
                            <div className={this.props.language === languages.EN ? 'en active' : 'en'}>
                                <span onClick={() => this.changeLanguage(languages.EN)}>EN</span>
                            </div>
                        </div>
                        {!this.props.isLoggedIn && (
                            <div className="loggin">
                                <Link to={path.LOGIN}>Login</Link>
                            </div>
                        )}
                        {this.props?.isLoggedIn && <AavatarUser />}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changingLanguageAppRedux: (language) => dispatch(changingLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
