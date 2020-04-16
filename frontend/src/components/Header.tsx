import React from 'react'
import PxcLang from './PxcLang'
import ProjectName from './ProjectName'
import Brand from './Brand'

interface HeaderProps {
    deviceName?: string,
    projectName?: string
}

const Header = (props: HeaderProps) => {
    const {projectName} = props;

    return (
        <div id='page-header' className='header'>
            <div id='pxc-funcnav' className='cf nav'>
                <PxcLang/>
                <div className='pxc-func' id='id_div_login' style={{display: 'none'}}>
                    Login
                </div>
            </div>
            <div className='cf pxc-masthead'>
                <div className='pxc-r pxc-sl'>
                    <div className='pxc-r pxc-sr'>
                        <div className='cf pxc-bdy'>
                            <Brand/>
                            <div className='pxc-qsrch'>
                                <div id='id_div_header_center'>
                                    <ProjectName
                                        projectName={projectName}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
