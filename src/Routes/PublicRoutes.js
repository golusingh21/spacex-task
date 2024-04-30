import React, {Suspense} from 'react';
import { Routes, Route } from "react-router-dom"
import FullPageLoading from '../Components/Loading/FullPageLoading';
const SpaceXList =  React.lazy(()=>import ('../Pages/SpaceX/SpaceXList'));

const PublicRoutes = () => {
    return(
        <Suspense fallback={<FullPageLoading/>}>
            <Routes>
                <Route path="/" element={<SpaceXList/>}/>
            </Routes>
        </Suspense>
    )
}
export default PublicRoutes;