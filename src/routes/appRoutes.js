import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Header from "../layout/Header";
import Home from "../screens/App/Home"

export const AppRoutes = () => {
    let location = useLocation();
    return(
        <div>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Navigate to="/home" state={{ from: location }} replace />}></Route>
                <Route path="/home" element={<Home></Home>}></Route>
                {/* <Route path="/signup" element={<SignUp></SignUp>}></Route> */}
            </Routes>
        </div>
    )
}