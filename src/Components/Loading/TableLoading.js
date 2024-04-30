import React from 'react';
import { Spinner } from 'react-bootstrap';

const TableLoading = ({spinner, colSpan, data}) => {
    return (
        (!data?.length || spinner) && (
            <tr>
                <td colSpan={colSpan} className='text-center'>
                    { 
                        spinner ?
                        <Spinner 
                            animation='border' 
                            role="status"
                        /> :
                        !data?.length && 'No Record Found'
                    }
                </td>
            </tr>
        )
    )
}
export default TableLoading