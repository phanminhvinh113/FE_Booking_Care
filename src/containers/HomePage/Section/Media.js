import React, { Component } from 'react';
import './Style/Media.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Media extends Component {
    render() {
        return (
            <div className="section_media_home_page">
                <div className="content_media">
                    <h2 className="title_media">Truyền thông nói về BookingCare</h2>
                    <div className="video">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="YouTube video player"
                            frameBorder={0}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Media);
