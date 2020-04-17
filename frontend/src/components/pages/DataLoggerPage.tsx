import React, {useState} from 'react';
import TextInput from '../common/TextInput';
import Label from '../common/Label';
import {useTextInput} from '../../hooks/use-text-input';
import {Trend} from '../charts/Chart';
import {TimeSeries} from "pondjs";
import {useInterval} from "../../hooks/use-interval";
import {addMinutes} from "../../helpers/utils";

interface DataLoggerPageProps {
    dataLoggerUrl: string
}

const buildPoints = (dataItems: any[], columnName: string) => {
    const points = dataItems.map((dataItem) => {
        const timeStamp = new Date(dataItem.Timestamp);
        const value = dataItem[columnName];
        return [timeStamp, value, value]
    });
    return points.sort((a, b) => a[0] - b[0]);
};


const DataLoggerPage = (props: DataLoggerPageProps) => {
    const {dataLoggerUrl} = props;
    const {value: variableNameValue, bind: bindVariableNameValue} = useTextInput('Arp.Plc.Eclr/I_2_IN01');
    const {value: fromValue, bind: bindFromValue, setValue: setFromValue} = useTextInput('2020-04-17T13:30:00');
    const {value: toValue, bind: bindToValue, setValue: setToValue} = useTextInput('2020-04-17T13:31:00');
    const [timeSeries, setTimeSeries] = useState();
    const [isLiveUpdate, setLiveUpdate] = useState(false);

    const fetchDataLogger = (variableName: string, from: string, to: string) => {
        const urlWithQuery = `${dataLoggerUrl}?variableName=${variableName}&from=${from}&to=${to}`;
        fetch(urlWithQuery)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.items && data.items.length > 0) {
                    const points = buildPoints(data.items, variableNameValue);

                    const newTimeSeries = new TimeSeries({
                        name: "Value",
                        columns: ["time", "var1"],
                        points: points
                    });
                    //@ts-ignore
                    setTimeSeries(newTimeSeries)
                }
                else {
                    //@ts-ignore
                    setTimeSeries(null)
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

            fetchDataLogger(variableNameValue, newFromValue, newToValue)
        }

    }, 2000);

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        fetchDataLogger(variableNameValue, fromValue, toValue);
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
                                label={`Variable Name`}
                                placeholder={``}
                                maxLength={63}
                                name={`variable-name`}
                                {...bindVariableNameValue}
                            />
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
                        {
                            timeSeries &&
                            <Trend
                                timeSeries = {timeSeries}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DataLoggerPage
