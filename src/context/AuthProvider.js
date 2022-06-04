import {useHistory} from "react-router-dom";
import {auth} from "../firebase/config";
import React, {createContext, useEffect, useState} from "react";
import {Spin} from "antd";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
  const history = useHistory();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log({user})
      if (user) {
        const {displayName, email, uid, photoURL} = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL
        });
        setIsLoading(false);
        history.push('/');
        return;
      }
      setIsLoading(false);
      history.push('/login');
    })

    return () => {
      unsubscribed();
    }
  }, [history])

  return (
    <AuthContext.Provider value={{user}}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  )
}
