import React, {useState} from 'react';
import TextInput from '../common/TextInput';
import Label from '../common/Label';
import {useTextInput} from '../../hooks/use-text-input';
import {Table} from "../common/Table";

import {useInterval} from "../../hooks/use-interval";
import {addMinutes} from "../../helpers/utils";

interface NotificationsPageProps {
    notificationsUrl: string
}

interface Notification {
    id: number
    timestamp: string
    notificationName: string
    senderName: string
    severity: string
    payloadString: string
    payloadXml: string
}

const buildNotificationsTableItems = (notifications: Notification[]): string[][] => {
    return notifications.map((notification) => {
        return [notification.timestamp, notification.senderName, notification.severity, notification.payloadString]
    })
};


const NotificationsPage = (props: NotificationsPageProps) => {
    const {notificationsUrl} = props;
    const {value: fromValue, bind: bindFromValue, setValue: setFromValue} = useTextInput('2020-04-17T13:30:00');
    const {value: toValue, bind: bindToValue, setValue: setToValue} = useTextInput('2020-04-17T13:31:00');
    const [isLiveUpdate, setLiveUpdate] = useState(false);
    const [notifications, setNotifications]: [Notification[], any] = useState([]);

    const fetchNotifications = (from: string, to: string) => {
        const urlWithQuery = `${notificationsUrl}?from=${from}&to=${to}`;
        fetch(urlWithQuery)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.items && data.items.length > 0) {
                    setNotifications(data.items)
                }
                else {
                }

            })
            .catch((e) => {
                console.log(e)
            })
    };

    useInterval(() => {
        if (isLiveUpdate) {
            const newToValue = (new Date).toISOString();
            const newFromValue = (addMinutes(new Date, -10)).toISOString();

            setToValue(newToValue);
            setFromValue(newFromValue);

            fetchNotifications(newFromValue, newToValue)
        }

    }, 2000);

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        fetchNotifications(fromValue, toValue);
    };

    return (
        <div className="cf pxc-grid-4">
            <h1>
                <span>Configuration</span>
            </h1>
            <div className="pxc-plt-ctrl">
                <div className="pxc-p-plain">
                    <div className="pxc-f-gradbox">
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                label={`From`}
                                placeholder={``}
                                maxLength={63}
                                name={`from`}
                                disabled={isLiveUpdate}
                                {...bindFromValue}
                            />
                            <TextInput
                                label={`To`}
                                placeholder={``}
                                maxLength={63}
                                name={`to`}
                                disabled={isLiveUpdate}
                                {...bindToValue}
                            />
                            <div className="form_group">
                                <Label
                                    label={`Live update`}
                                />
                                <input
                                    type="checkbox"
                                    name="live_update"
                                    value="true"
                                    checked={isLiveUpdate}
                                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                        setLiveUpdate(e.currentTarget.checked)
                                    }}
                                />
                            </div>
                            <div className="form_group">
                                <Label
                                    label={`Query`}
                                />
                                <button
                                    type="submit"
                                    className="pxc-btn-pa"
                                >
                                    <span>Query</span>
                                </button>
                            </div>
                        </form>
                        <Table
                            headerItems={['Timestamp', 'Sender', 'Severity', 'Payload']}
                            dataItems={buildNotificationsTableItems(notifications)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NotificationsPage
