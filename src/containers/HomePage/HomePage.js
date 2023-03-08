import React, { Component, Fragment } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { path, TITLE_BROWSWER } from '../../utils';
import { MoonLoader } from 'react-spinners';
import HeaderHome from './HeaderHome';
import BodyHome from './BodyHome';
import Specialty from './Section/Specialty';
import Facilities from './Section/Facilities';
import Doctors from './Section/Doctors';
import HandBook from './Section/HandBook';
import Media from './Section/Media';
import Download from './Download';
import Footer from './Footer';
import PageNotFound from '../../routes/PageNotFound';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            prevY: document.body.offsetTop,
            isLoading: true,
        };
        this.promises = [this.props.getTopClinic(8), this.props.getTopSpecialty(8), this.props.getDoctors(8)];
    }
    async componentDidMount() {
        document.body.scrollTop = this.props.positionHomePage;
        //
        document.title = TITLE_BROWSWER.Home_Page;
        //
        await Promise.all(this.promises);
        this.setState({
            isLoading: false,
        });
    }
    //
    async componentDidUpdate(prevProps, prevState, snapshot) {}
    //
    componentWillUnmount() {
        this.props.getPostionScrollHomePage(document.body.scrollTop);
    }
    //
    HomePage = () => (
        <div className="home-page-app">
            <div className="loading-home-page">
                <MoonLoader loading={this.state.isLoading} color="#0071BA" size={30} speedMultiplier={0.5} />
            </div>
            <HeaderHome />
            <BodyHome />
            <Specialty />
            <Facilities />
            <Doctors />
            <HandBook />
            <Media />
            <Download />
            <Footer />
        </div>
    );
    render() {
        return (
            <Switch>
                <Route exact path={path.HOMEPAGE} component={this.HomePage} />
                <Route component={PageNotFound} />
            </Switch>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        positionHomePage: state.app.positionHomePage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPostionScrollHomePage: (prevY) => dispatch(actions.getPostionScrollHomePage(prevY)),
        getDoctors: (limit) => dispatch(actions.getTopDoctorHomePage(limit)),
        getTopSpecialty: (limit) => dispatch(actions.fetchTopSpecialtyHome(limit)),
        getTopClinic: (limit) => dispatch(actions.fetchTopClinicHome(limit)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
