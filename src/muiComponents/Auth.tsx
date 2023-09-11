import React, { ReactNode, useContext, useState } from 'react'

interface AuthProviderProps{
    children:ReactNode;
}

interface AuthContextType {
    users: string | undefined;
    login: (username: string) => void;
    logout: () => void;
  }

export const AuthContext=React.createContext<AuthContextType|undefined>(undefined);

const AuthProvider:React.FC<AuthProviderProps>= ({children}) => {
    const [users,setUsers]=useState<string|undefined>(undefined);
    const login=(Username:string)=>
    {
       setUsers(Username);
    }
    const logout=()=>
    {
        setUsers(undefined);
    }
  return (
    <div>
        <AuthContext.Provider value={{users,login,logout}}>{children}</AuthContext.Provider>
    </div>
  )
}
export default AuthProvider
export const useAuth=()=>
{
    return useContext(AuthContext);
}