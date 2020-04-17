import React from 'react';

export interface TableProps {
    headerItems: string[]
    dataItems: string[][]
}

export const Table = (props: TableProps) => {
    const {headerItems, dataItems} = props;
    return (
        <div className="cf pxc-cnt pxc-mod-main-table-alt-rows">
            <table
                className="pxc-tbl-zebra"
                style={{display: 'table'}}
            >
                <tbody>
                <tr className="exclude" style={{height: '40px'}}>
                    {
                        headerItems.map((columnName) => (
                            <th key={columnName}>{columnName}</th>
                            )
                        )
                    }
                </tr>
                {
                    dataItems.map((row) => (
                        <tr className="odd" key={`${row}`}>
                            {
                                row.map((cellContent) => (
                                    <td key={cellContent}>{cellContent}</td>
                                ))
                            }
                        </tr>

                    ))
                }
                </tbody>
            </table>
        </div>
    )
};
