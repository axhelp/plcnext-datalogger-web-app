import React, {Component} from 'react';
import DataLoggerPage from './DataLoggerPage';
import {getDeviceHostAddress} from '../helpers/utils';

const dataLoggerUrl = `${getDeviceHostAddress()}/data-logger`;

class MainContentPanel extends Component {
    render() {
        return (
                <DataLoggerPage
                    dataLoggerUrl={dataLoggerUrl}
                />
        );
    }
}

export default MainContentPanel;
