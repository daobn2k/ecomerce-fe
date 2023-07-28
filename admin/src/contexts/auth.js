import { createContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(false);
  return <AuthContext.Provider value={{ setUser, user }}>{props.children}</AuthContext.Provider>;
};
export default AuthContext;
