import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderNavigate from './HeaderNavigate';
import { getAllClinicService, getTopClinicHome } from '../../../services/adminService';
import './Style/HealthFacilitiesHeader.scss';
import { TITLE_BROWSWER } from '../../../utils';

class HealthFacilitiesHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTopClinic: [],
            listClinicSearched: [],
            listAllClinic: [],
            searchInput: '',
            resultSearch: false,
        };
        this.timeoutId = null;
        this.promises = [getTopClinicHome(8), getAllClinicService()];
    }
    async componentDidMount() {
        document.title = TITLE_BROWSWER.clinic_search;
        const [{ data: res }, { data: response }] = await Promise.all(this.promises);
        if (res && res.errCode === 0) {
            this.setState({
                listTopClinic: res.data,
            });
        }
        if (response && response.errCode === 0) {
            this.setState({
                listAllClinic: res.data,
            });
        }
    }

    // HANDLE SEARCH DOCTOR //
    handleOnChangeSearchFacilitie = (e) => {
        const searchInput = e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => {
            const { listAllClinic } = this.state;
            if (!searchInput || searchInput.startsWith(' ')) {
                this.setState({
                    listClinicSearched: [],
                    resultSearch: false,
                });
            } else {
                const listClinicSearched = listAllClinic.filter((item) => {
                    let searchValue = item.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return !!searchValue.toLowerCase().includes(searchInput.toLowerCase());
                });
                this.setState({
                    listClinicSearched,
                    resultSearch: true,
                });
            }
        }, 700);
    };

    render() {
        const { listTopClinic, listClinicSearched, resultSearch } = this.state;

        return (
            <div className="health-facilities-header-home-page" style={{ marginTop: '100px' }}>
                <HeaderNavigate title={'Bệnh Viện, Phòng Khám'} />
                <div className="search-clinic">
                    <input
                        type={'text'}
                        placeholder="Tìm phòng khám, cở sở y tế"
                        onChange={(e) => this.handleOnChangeSearchFacilitie(e)}
                    />
                </div>
                <div className="list-clinic-search">
                    {resultSearch && <h3> Danh sách tìm kiếm</h3>}
                    {listClinicSearched &&
                        listClinicSearched.map((clinic, index) => {
                            return (
                                <div key={index} className="clinic-item-search">
                                    <Link to={`/detail-clinic/${clinic.id}`} key={index}>
                                        <img src={clinic.image} />
                                        <span>{clinic.name}</span>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
                <div className="clinic-outstanding">
                    <h3>Phòng khám nổi bật tuần qua</h3>
                    {listTopClinic &&
                        listTopClinic.map((clinic, index) => {
                            return (
                                <div key={index} className="clinic-item">
                                    <Link to={`/detail-clinic/${clinic.id}`}>
                                        <img src={clinic.image} />
                                        <span>{clinic.name}</span>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthFacilitiesHeader);
