import React, {useRef} from 'react';

interface FileInputProps {
    label: string,
    name: string,
    value: string,
    onChange: () => void,
    setTextInput: (path: string) => void,
    uploadUrl: string
}

const FileInput = (props: FileInputProps) => {
    const {label, name, value, onChange, setTextInput, uploadUrl} = props;
    const inputRef = useRef();

    const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            fetch(uploadUrl, {
                method: 'POST',
                body: formData
            })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    const {filePath} = data;
                    setTextInput(filePath)
                })
        }
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            <h4>
                <span style={{float: "left"}}>
                    {label}
                </span>
            </h4>
            <br/><br/>
            <div
                className="pxc-f-gradbox"
                style={{
                    width: "600px"
                }}>
                <input
                    hidden
                    type="file"
                    name={name}
                    style={{
                        border: "1px solid #ccc",
                        fontSize: "14pt",
                        padding: "5px 10px",
                        width: "400px"
                    }}
                    onChange={onChangeFileInput}
                    //@ts-ignore
                    ref={inputRef}
                />
                <button
                    className="pxc-btn-pa"
                    onClick={(e) => {
                        e.preventDefault();
                        // @ts-ignore
                        inputRef.current.click();
                    }}
                >
                    <span>Browse...</span>
                </button>

                <input
                    type="text"
                    style={{
                        border: "1px solid #ccc",
                        width: "500px",
                        fontSize: "12px",
                        padding: "5px 10px"
                    }}
                    readOnly={true}
                    disabled={true}
                    value={value}
                    onChange={onChange}
                />
                <br/>
            </div>
            <br/>
        </div>
    )
};

export default FileInput
