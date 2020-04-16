import React from 'react'

interface DeviceNameProps {
    deviceName: string
}

const DeviceName = (props: DeviceNameProps) => {
    const {deviceName} = props;

    return (
        <div id='c_glb_device_name' className='ellipsis'>
            <span className='c_glb_device_name'> </span>
            <span title=''>: {deviceName}</span>
        </div>
    )
};

export default DeviceName
