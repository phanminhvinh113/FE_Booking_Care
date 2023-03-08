import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderHome from '../containers/HomePage/HeaderHome';
import Footer from '../containers/HomePage/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { path } from '../utils';

class PageNotFound extends Component {
    constructor(props) {
        super(props);
    }
    //
    handleBackHome = () => {
        this.props.history.push(path.HOMEPAGE);
    };
    //

    render() {
        return (
            <div className="page-not-found">
                <HeaderHome />
                <div className="body-page container text-center mt-4 min-vh-100">
                    <h3>Rất tiết trang này không tồn tại!</h3>
                    <button className="btn btn-outline-secondary" onClick={this.handleBackHome}>
                        <FontAwesomeIcon icon={faHouse} />
                    </button>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageNotFound));
