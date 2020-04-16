import React from 'react'

export interface MenuItemsGroup {
    id: string,
    name: string,
    href: string,
    items?: MenuItemsGroup[]
}

interface MenuProps {
    deviceName: string,
    deviceArticle: string,
    menuItemsGroups: MenuItemsGroup[]
}


export const Menu = (props: MenuProps) => {
    const {deviceName, deviceArticle, menuItemsGroups} = props;

    return (
        <div className='pxc-fcol' id='id_div_mainmenu'>
            <div className='cf pxc-fcol-flt'>
                <div className='pxc-p-boxed'>
                    <div className='pxc-filterpane'>
                        <a href='/'>
                            <p className='pxc-filtertitle centered' id='id_div_devdesignation'>
                                <span>{deviceName}</span>
                                <br/>
                                <span>{deviceArticle}</span>
                            </p>
                            <div id='id_div_devlogo'> </div>
                        </a>
                    </div>
                </div>

                {menuItemsGroups.map((menuItemGroup) => {
                    return <div className="pxc-p-boxed" key={menuItemGroup.id}>
                        <div className="c_btn_menuexpand c_btn_menu" id={menuItemGroup.id}
                             style={{backgroundPosition: "-97px -692px"}}> </div>
                        <div className="pxc-filterpane">
                            <p className="pxc-filtertitle c_menu_title"
                               id="id_menu_title_security">{menuItemGroup.name}</p>
                            <ul className="c_menu_list" id="id_menu_security">
                                {menuItemGroup.items?.map((menuItem) => {
                                    return <li key={menuItem.id}>
                                        <a id={menuItem.id} href={menuItem.href}>{menuItem.name}</a>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                })}
            </div>
            <div className='cf pxc-fcol-flt'>
            </div>
        </div>
    );
};
