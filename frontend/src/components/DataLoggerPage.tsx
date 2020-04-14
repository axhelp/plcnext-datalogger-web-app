import React from 'react';
import TextInput from './TextInput';
import Label from './Label';
import {useTextInput} from '../hooks/use-text-input';

interface DataLoggerPageProps {
    dataLoggerUrl: string
}

const DataLoggerPage = (props: DataLoggerPageProps) => {
    const {dataLoggerUrl} = props;
    const {value: fromValue, bind: bindFromValue} = useTextInput('');
    const {value: toValue, bind: bindToValue} = useTextInput('');

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();

        const urlWithQuery = `${dataLoggerUrl}?variableName=Arp.Plc.Eclr/I_2_IN01&from="${fromValue}"&to="${toValue}"`;
        fetch(urlWithQuery)
            .then((res) => {
                return res.json()
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
                                label={`From`}
                                placeholder={``}
                                maxLength={63}
                                name={`from`}
                                {...bindFromValue}
                            />
                            <TextInput
                                label={`From`}
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
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DataLoggerPage
