import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Style/SearchHome.scss';
import SpecialtySearch from './SpecialtySearch';
import DoctorSearch from './DoctorSearch';
import ClinicSearch from './ClinicSearch';
import { searchAllService } from '../../../services/userService';
import BeatLoader from 'react-spinners/BeatLoader';
class SearchHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuSeacrhHidden: true,
            statePlaceholder: 0,
            isLoading: true,
            listDoctorSearching: [],
            listClinicSearching: [],
            listSpecialtySearching: [],
        };
        this.timerInput = null;
        this.timerPlaceHolder = null;
        this.placeholderText = ['Tìm kiếm bác sĩ', 'Tìm bệnh viện', 'Tìm chuyên khoa'];
    }
    componentDidMount() {
        this.changePlaceholderSearch();
        const { Doctors, Clinics, Specialtys } = this.props;
        this.setState({
            isLoading: false,
            listDoctorSearching: Doctors,
            listClinicSearching: Clinics,
            listSpecialtySearching: Specialtys,
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { Doctors, Clinics, Specialtys } = this.props;
        if (prevProps.Doctors !== Doctors || prevProps.Clinics !== Clinics || prevProps.Specialtys !== Specialtys) {
            this.setState({
                listDoctorSearching: Doctors,
                listClinicSearching: Clinics,
                listSpecialtySearching: Specialtys,
            });
        }
    }
    // PLACEHOLDER
    changePlaceholderSearch = () => {
        this.timerPlaceHolder = setInterval(() => {
            this.setState({
                statePlaceholder: ++this.state.statePlaceholder,
            });
        }, 2500);
    };
    // DISPLAY OR HIDDEN MENU SEARCh
    handleHidenMenu = () => {
        this.setState({
            menuSeacrhHidden: true,
        });
    };
    handleOpennMenu = () => {
        this.setState({
            menuSeacrhHidden: false,
        });
    };
    //// ONCHANGE SEACRH //
    handleOnChangeSearch = (e) => {
        const inputSearch = e.target.value;
        //
        if (this.timerPlaceHolder && inputSearch) {
            clearInterval(this.timerPlaceHolder);
        } else {
            this.changePlaceholderSearch();
        }
        //
        if (this.timerInput) {
            clearTimeout(this.timerInput);
        }
        this.timerInput = setTimeout(async () => {
            this.setState({
                isLoading: true,
            });
            const { data: res } = await searchAllService(inputSearch.trim());
            if (res && res.errCode === 0) {
                const { dataClinic, dataDoctor, dataSpecialty } = res;
                this.setState({
                    isLoading: false,
                    listClinicSearching: dataClinic,
                    listDoctorSearching: dataDoctor,
                    listSpecialtySearching: dataSpecialty,
                });
            }
        }, 700);
    };
    //
    render() {
        const { menuSeacrhHidden, listDoctorSearching, listClinicSearching, listSpecialtySearching, isLoading } = this.state;
        return (
            <div className="search-home-page">
                <button>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input
                    type="search"
                    placeholder={this.placeholderText[this.state.statePlaceholder % this.placeholderText.length]}
                    onChange={(e) => this.handleOnChangeSearch(e)}
                    onClick={this.handleOpennMenu}
                    onBlur={this.handleHidenMenu}
                />
                <div className={!menuSeacrhHidden ? 'content-searching' : 'content-searching hidden'}>
                    <BeatLoader loading={this.state.isLoading} color="#36d7b7" size={10} speedMultiplier={1} />
                    {!isLoading && (
                        <div>
                            {!listClinicSearching.length && !listDoctorSearching.length && !listSpecialtySearching.length && (
                                <div>Không tìm thấy</div>
                            )}
                            <div className="specialty">
                                <SpecialtySearch Specialtys={listSpecialtySearching} />
                            </div>
                            <div className="doctor">
                                <DoctorSearch Doctors={listDoctorSearching} />
                            </div>
                            <div className="clinic">
                                <ClinicSearch Clinics={listClinicSearching} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        Doctors: state.admin.doctorsTopHome,
        Clinics: state.admin.topClinicHome,
        Specialtys: state.admin.topSpecialtyHome,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchHome);
