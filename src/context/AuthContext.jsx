import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ErrorAlert from "../components/ErrorAlert"

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            if(user){
                const fetchUser = async ()=>{
                    try{
                        const userRef = doc(db,"users",user.uid);
                        const userSnap = await getDoc(userRef);
                        if(userSnap.exists()){
                            setCurrentUser({id:userSnap.id, ...userSnap.data()});
                            setLoading(false);
                        }
                    }catch(error){
                        console.log("ERROR!")
                        console.log("code: ",error.code)
                        console.log("code: ",error.message)
                        setError(error)
                    }
                };
                fetchUser();
            }else{
                setCurrentUser(null);
                setLoading(false);

            }
        });
        return unsubscribe;
    },[])
    useEffect(()=>{
        console.log(currentUser);
    },[currentUser])

return(
    <AuthContext.Provider value={{ currentUser }}>
        {!loading && children}
        {error && <ErrorAlert msg={error} />}
    </AuthContext.Provider>
)


}