import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderNavigate from './HeaderNavigate';
import { getAllSpecialty } from '../../../services/adminService';
import { Link } from 'react-router-dom';
import './Style/SpecialtyHeader.scss';
import { TITLE_BROWSWER } from '../../../utils';
class SpecialtyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllSpecialty: [],
        };
    }
    async componentDidMount() {
        //TITLE
        document.title = TITLE_BROWSWER.specialtys;
        // FETCH API
        const { data: res } = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                listAllSpecialty: res.data,
            });
        }
    }
    //
    render() {
        const { listAllSpecialty } = this.state;
        return (
            <div className="specialty-header-naviagte-home-page">
                <HeaderNavigate title={'Chuyên Khoa'} />
                <div className="body-specialty">
                    {!!listAllSpecialty.length &&
                        listAllSpecialty.map((item, index) => {
                            return (
                                <div key={index} className="specialty-item">
                                    <Link to={`/detail-specialty/${item.specialtyId}`}>
                                        <img src={item.image} />
                                        <span>{item.specialtyValue.valueVI}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyHeader);
