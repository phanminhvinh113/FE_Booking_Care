import React, { Component } from 'react';
import moment from 'moment';
import { dateFormat } from '../../utils/constant';

/** For valid format please see <a href="https://momentjs.com/docs/#/displaying/">Moment format options</a> */

class FormattedDate extends Component {
    render() {
        const { format, value, ...otherProps } = this.props;
        var dFormat = format ? format : dateFormat.SEND_TO_SERVER;
        const formattedValue = value ? moment(value).format(dFormat) : null;
        return <span {...otherProps}>{formattedValue}</span>;
    }
}

export default FormattedDate;
