import React, {useState} from 'react';
import TextInput from './TextInput';
import Label from './Label';
import {useTextInput} from '../hooks/use-text-input';
import {Trend} from './Chart';
import {TimeSeries} from "pondjs";

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
    const {value: fromValue, bind: bindFromValue} = useTextInput('2020-04-17T13:30:00');
    const {value: toValue, bind: bindToValue} = useTextInput('2020-04-17T13:31:00');
    const [timeSeries, setTimeSeries] = useState();

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();

        const urlWithQuery = `${dataLoggerUrl}?variableName=${variableNameValue}&from=${fromValue}&to=${toValue}`;
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
                                {...bindFromValue}
                            />
                            <TextInput
                                label={`To`}
                                placeholder={``}
                                maxLength={63}
                                name={`to`}
                                {...bindToValue}
                            />
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
