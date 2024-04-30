import React, {forwardRef} from 'react';
import { Spinner } from 'react-bootstrap';
import './Style.scss';

const FullPageLoading = forwardRef(({spinner, animation='border', position='absolute', ...rest})=>{
    return(
        spinner ?
        <div className='page-loading' style={{position}}>
            <Spinner 
                animation={animation} 
                role="status"
                {...rest}
            >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div> 
        : ''
    )
})

export default FullPageLoading;