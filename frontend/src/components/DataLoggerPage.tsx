import React, {useState} from 'react';
import TextInput from './TextInput';
import Label from './Label';
import {useTextInput} from '../hooks/use-text-input';
import {Trend} from './Chart';

interface DataLoggerPageProps {
    dataLoggerUrl: string
}

const DataLoggerPage = (props: DataLoggerPageProps) => {
    const {dataLoggerUrl} = props;
    const {value: variableNameValue, bind: bindVariableNameValue} = useTextInput('Arp.Plc.Eclr/I_2_IN01');
    const {value: fromValue, bind: bindFromValue} = useTextInput('2020-04-11');
    const {value: toValue, bind: bindToValue} = useTextInput('2020-04-18');
    const [dataLoggerDataItems, setDataLoggerDataItems] = useState([]);

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();

        const urlWithQuery = `${dataLoggerUrl}?variableName=${variableNameValue}&from="${fromValue}"&to="${toValue}"`;
        fetch(urlWithQuery)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data);
                setDataLoggerDataItems(data.items)
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
                        <Trend
                            data = {dataLoggerDataItems}
                        />
                        <ul>
                        {
                            dataLoggerDataItems?.map((item: any) => (
                                <li key={item.Timestamp}>
                                    {`${item.Timestamp} - ${item[variableNameValue]}`}
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DataLoggerPage
