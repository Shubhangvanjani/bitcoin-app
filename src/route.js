import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { AppRoutes } from "./routes/appRoutes";
import { AuthRoutes } from "./routes/authRoutes";

function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {

      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
  
    return children;
}

const RootRoutes = () => {
    let location = useLocation();
    return(
        <Routes>
            <Route path="/*" element={
                <RequireAuth>
                    <AppRoutes></AppRoutes>
                </RequireAuth>
            }> </Route>
            <Route path="/auth/*" element={
                <AuthRoutes></AuthRoutes>
            }></Route>
            <Route path="/auth" element={
                <Navigate to="/auth/login" state={{ from: location }} replace />
            }></Route>
        </Routes>
    )
}

export default RootRoutes
