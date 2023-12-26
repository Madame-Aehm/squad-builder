import { AuthUser } from "@/@types";
import { GET_ACTIVE_USER } from "@/graphql/queries";
import { ApolloClient, useQuery } from "@apollo/client";
import { User } from "next-auth";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from "react";

interface AuthContext {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  userAuthenticated: (result: AuthUser) => void
  logout: () => void
}

type Me = {
  me: User
}
const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  
  const [user, setUser] = useState<User | null>(null);

  const { data, loading, error } = useQuery<Me>(GET_ACTIVE_USER);

  const userAuthenticated = (result: AuthUser) => {
    setUser(result.user);
    localStorage.setItem("token", result.token);
  }

  const logout = async() => {
    setUser(null);
    localStorage.removeItem("token");
  }
  console.log("active user", user);

  useEffect(() => {
    if (data) {
      setUser(data.me);
    }
  }, [data]);
  
  return (
    <AuthContext.Provider value={{ user, setUser, userAuthenticated, logout }}>
      { children }
    </AuthContext.Provider>)
}

export { AuthContext, AuthContextProvider }
