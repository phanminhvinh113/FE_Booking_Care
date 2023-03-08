import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { emitter } from '../../../utils/emiiter';
import * as actions from '../../../store/actions';
import './Style/TableUser.scss';

class TableUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //
    // handleDeleteUser = () => {};
    ///////////////////////////// \\ RENDER DISPLAY \\ ////////////////////////////////////////
    async componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {}
    render() {
        const { dataAllUser } = this.props;
        dataAllUser.reverse();
        return (
            <div className="table-users-redux justify-content container mt-4 mb-4">
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                        {dataAllUser &&
                            dataAllUser.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td style={{ padding: 0 }}>
                                        <button
                                            style={{
                                                border: 'none',
                                                width: '25px',
                                                backgroundColor: 'transparent',
                                            }}
                                            onClick={() => this.props.handleEditUser(user.id)}
                                        >
                                            <FontAwesomeIcon icon={faPencil} style={{ color: '#F0A700' }} />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{
                                                border: 'none',
                                                width: '25px',
                                                backgroundColor: 'transparent',
                                            }}
                                            onClick={() => this.props.handleDeleteUser(user)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.admin.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUser: () => dispatch(actions.getAllUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
