import { AuthUser } from "@/@types";
import { User } from "next-auth";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

interface AuthContext {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  userAuthenticated: (result: AuthUser) => void
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  
  const [user, setUser] = useState<User | null>(null);

  const userAuthenticated = (result: AuthUser) => {
    setUser(result.user);
    localStorage.setItem("token", result.token);
  }
  
  return (
    <AuthContext.Provider value={{ user, setUser, userAuthenticated }}>
      { children }
    </AuthContext.Provider>)
}

export { AuthContext, AuthContextProvider }
