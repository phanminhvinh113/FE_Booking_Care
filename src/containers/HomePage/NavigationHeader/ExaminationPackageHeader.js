import React, { Component, Fragment } from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ExamiationPackageHeader extends Component {
    render() {
        return <div>ExamiationPackageHeader</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(ExamiationPackageHeader);
