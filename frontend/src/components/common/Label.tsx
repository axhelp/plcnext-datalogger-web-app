import React from 'react'

interface LabelProps {
    label: string
}
const Label = (props: LabelProps) => {
    const {label} = props;

    return (
        <label
            style={{
                width: "146px",
                display: "inline-block",
                paddingBottom: "10px"
            }}
        >
            {label}
        </label>
    )

};

export default Label
