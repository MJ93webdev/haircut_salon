import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    },[])

return(
    <AuthContext.Provider value={{ currentUser }}>
        {!loading && children}
    </AuthContext.Provider>
)


}