import { FC, PropsWithChildren,  useState } from "react";
import { AuthContext } from "./Authcontext";



const AuthProvider: FC<PropsWithChildren> = ({children}) => {


    const [username, setUsername] = useState<string | null >(localStorage.getItem('username'))
    const [token, setToken] = useState<string | null > (localStorage.getItem('token'))


    const isAuthenticated = !!token;
    

    const login = (username: string, token: string) => {
        setUsername(username);
        setToken(token);
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
    } 

    const logout = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  setUsername(null);
  setToken(null);
}

    
    return(
        <AuthContext.Provider value={{username, token, login,isAuthenticated, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;