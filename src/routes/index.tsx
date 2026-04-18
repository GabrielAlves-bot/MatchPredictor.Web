import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MasterPage } from "../page/MasterPage/index.";
import configData from '../../config.json';
import { Predictions } from "../features/Predictions/pages";
import { Matches } from "../features/Matches/pages";

function AppRoutes(){
    return(
        <BrowserRouter basename={`/${configData.appName}`}>
            <Routes>
                <Route element={<MasterPage />}>
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