import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@gmail.com",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    name: "Teacher",
    email: "teacher@gmail.com",
    password: "123456",
    role: "teacher",
  },
  {
    id: 3,
    name: "Student",
    email: "student@gmail.com",
    password: "123456",
    role: "student",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const login = (email, password) => {
    const foundUser = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return foundUser;
    }

    return null;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);