import { Route, Routes } from "react-router-dom"
import Login from "../screens/Auth/Login"
import SignUp from "../screens/Auth/SignUp"

export const AuthRoutes = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
        </Routes>
    )
}