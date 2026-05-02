import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import configData from '../../config.json';
import { Matches } from "../pages/Matches";
import { MasterPage } from "../pages/MasterPage/index.";
import { Predictions } from "../pages/Predictions";
import { Login } from "../pages/Login";
import paths from "./paths";
import { AuthProvider } from "../context/AuthContext";
import { PrivateRouteGuard } from "../guards/PrivateRouteGuard";
import { PublicOnlyRouteGuard } from "../guards/PublicOnlyRouteGuard";

function AppRoutes() {
    return (
        <BrowserRouter basename={`/${configData.appName}`}>
            <AuthProvider>
                <Routes>
                    <Route element={<PublicOnlyRouteGuard />}>
                        <Route path={paths.login} element={<Login />} />
                    </Route>

                    <Route element={<PrivateRouteGuard />}>
                        <Route element={<MasterPage poolName="Copa Do Mundo 2026" />}>
                            <Route path={paths.predictions} element={<Predictions />} />
                            <Route path={paths.matches} element={<Matches />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to={paths.predictions} replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default AppRoutes;