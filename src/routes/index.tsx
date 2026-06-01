import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import configData from '../../config.json';
import { Matches } from "../pages/Matches";
import { Predictions } from "../pages/Predictions";
import { Login } from "../pages/Login";
import paths from "./paths";
import { AuthProvider } from "../context/AuthContext";
import { PrivateRouteGuard } from "../guards/PrivateRouteGuard";
import { PublicOnlyRouteGuard } from "../guards/PublicOnlyRouteGuard";
import { PoolProvider } from "../context/PoolContext";
import { UserProvider } from "../context/UserContext";
import { ActivePoolGuard } from "../guards/ActivePoolGuard";
import { PoolSelector } from "../pages/PoolSelector";
import { MasterPageWrapper } from "./Wrapper/MasterPageWrapper";
import { Standings } from "../pages/Standings";
import { Rules } from "../pages/Rules";
import { UserPredictions } from "../pages/UserPredictions";
import { Deadline } from "../pages/Deadline";

function AppRoutes() {
    return (
        <BrowserRouter basename={`/${configData.appName}`}>
            <AuthProvider>
                <UserProvider>
                    <PoolProvider>
                        <Routes>
                            <Route element={<PublicOnlyRouteGuard />}>
                                <Route path={paths.login} element={<Login />} />
                            </Route>

                            <Route element={<PrivateRouteGuard />}>
                                <Route path={paths.selectPool} element={<PoolSelector />} />

                                <Route element={<ActivePoolGuard />}>
                                    <Route element={<MasterPageWrapper />}>
                                        <Route path={paths.predictions} element={<Predictions />} />
                                        <Route path={paths.matches} element={<Matches />} />
                                        <Route path={paths.standings} element={<Standings />} />
                                        <Route path={paths.rules} element={<Rules />} />
                                        <Route path={paths.userPredictions} element={<UserPredictions />} />
                                        <Route path={paths.deadlines} element={<Deadline championshipId={1} />} />
                                    </Route>
                                </Route>
                            </Route>

                            <Route path="*" element={<Navigate to={paths.predictions} replace />} />
                        </Routes>
                    </PoolProvider>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default AppRoutes;