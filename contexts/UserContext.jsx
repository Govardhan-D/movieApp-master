import {useState, useEffect, createContext} from 'react';
import { getCurrentUser } from '../services/appwrite';

export const AuthContext = createContext();

export default function AuthenticationProvider({children}){
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState("")
    const [loading, setLoading] = useState(true);
    const refreshUser = async() => {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }
    useEffect(() => {
        refreshUser();
    },
    [])
    return(
        <AuthContext.Provider value={{user,loading, userId, setUserId,refreshUser}}>
            {children}
        </AuthContext.Provider>
    )
}
