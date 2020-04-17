import React, {Component} from 'react';
import DataLoggerPage from './DataLoggerPage';
import NotificationsPage from "./NotificationsPage";
import {getDeviceHostAddress} from '../../helpers/utils';
import {Route, Switch} from 'react-router-dom';


const dataLoggerUrl = `${getDeviceHostAddress()}/data-logger`;
const notificationsUrl = `${getDeviceHostAddress()}/notifications`;

class MainContentPanel extends Component {
    render() {
        return (
            <Switch>
                <Route
                    path='/'
                    exact
                >
                    <DataLoggerPage
                        dataLoggerUrl={dataLoggerUrl}
                    />
                </Route>
                <Route
                    path='/data-logger'
                    exact
                >
                    <DataLoggerPage
                        dataLoggerUrl={dataLoggerUrl}
                    />
                </Route>
                <Route
                    path='/notifications'
                    exact
                >
                    <NotificationsPage
                        notificationsUrl={notificationsUrl}
                    />
                </Route>
            </Switch>

        );
    }
}

export default MainContentPanel;
