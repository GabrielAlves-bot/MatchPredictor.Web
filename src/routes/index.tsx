import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import configData from '../../config.json';
import { Matches } from "../pages/Matches";
import { MasterPage } from "../pages/MasterPage/index.";
import { Predictions } from "../pages/Predictions";

function AppRoutes(){
    return(
        <BrowserRouter basename={`/${configData.appName}`}>
            <Routes>
                <Route element={<MasterPage poolName="Copa Do Mundo 2026" />}>
                    <Route path="/" element={<Navigate to="/Predictions" />} />
                    <Route path="/Predictions" element={<Predictions />} />
                    <Route path="/Matches" element={<Matches />} />
                </Route>
                
                {/* <Route path="/Error" element={<Error />} />
                <Route path="/NotFound" element={<NotFound />} />
                <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;