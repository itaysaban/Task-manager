import { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
  
    return (
      <AuthContext.Provider value={{ username, password, setUsername, setPassword }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;