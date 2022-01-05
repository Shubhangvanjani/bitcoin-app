import React,{ useContext, useState } from "react";
import { fakeAuthProvider } from "../auth";


let AuthContext = React.createContext(null)

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      console.log("Provider called.... ", newUser)
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      console.log("Provider called.... ", user)
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
}

export default AuthProvider;