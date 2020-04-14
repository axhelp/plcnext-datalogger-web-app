import React, { useState } from 'react'


export const useTextInput = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        set: () => setValue(""),
        bind: {
            value,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
            }
        }
    };
};
