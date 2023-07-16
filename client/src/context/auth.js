import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [auth, setAuth] = useState({
        user:null,
        token:"",
    });
    useEffect(() =>{
        const data = localStorage.getItem("auth");
        if(data){
            const parseDate = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseDate.user,
                token: parseDate.token,
            })
        }
    },[auth]);
    
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook
const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider}