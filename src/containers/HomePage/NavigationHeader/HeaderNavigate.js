import React, { Component, Fragment } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import './Style/HeaderNavigate.scss';
class HeaderNavigate extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleOnBack = () => {
        this.props.history.goBack();
    };
    render() {
        return (
            <div className="header-navigate-home-page">
                <button onClick={this.handleOnBack}>
                    <FontAwesomeIcon icon={faLeftLong} />
                </button>
                <h5>{this.props.title}</h5>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderNavigate));
