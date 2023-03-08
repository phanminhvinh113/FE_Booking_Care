import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import './Style/SearchHome.scss';

class SpecialtySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialtySearching: this.props.Specialtys,
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { Specialtys } = this.props;
        if (prevProps.Specialtys !== Specialtys) {
            this.setState({
                listSpecialtySearching: Specialtys,
            });
        }
    }
    //
    handleViewSpecialty = (specialtyId) => {
        this.props.getPostionScrollSpecialtyPage(0);
        this.props.history.push(`/detail-specialty/${specialtyId}`);
    };
    //

    render() {
        const { listSpecialtySearching } = this.state;
        return (
            <>
                {!!listSpecialtySearching.length && <h5 className="header-menu-search">Chuyên khoa</h5>}
                {listSpecialtySearching.map((specialty, index) => {
                    return (
                        <a onClick={() => this.handleViewSpecialty(specialty.specialtyId)} key={index} className="item-specialty">
                            <img src={specialty.image} alt="" />
                            <span>{specialty.name}</span>
                        </a>
                    );
                })}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPostionScrollSpecialtyPage: (scrollY) => dispatch(actions.getPostionScrollSpecialtyPage(scrollY)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecialtySearch));
