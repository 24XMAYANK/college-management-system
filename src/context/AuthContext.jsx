import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// Demo users
const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@gmail.com",
    password: "123456",
    role: "admin",
  },
 {
  id: "2",
  name: "Rajesh Sir",
  email: "teacher@gmail.com",
  password: "123456",
  role: "teacher",
  teacherId: "1",
},
{
  id: "1",
  name: "Rahul Sharma",
  email: "student@gmail.com",
  password: "123456",
  role: "student",
  studentId: "1",
},
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check previously logged-in user
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        const loggedUser = JSON.parse(savedUser);

        if (loggedUser && loggedUser.role) {
          setUser(loggedUser);
        }
      }
    } catch (error) {
      console.error("Unable to restore login:", error);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  // Login
  const login = (email, password) => {
    const enteredEmail = String(email || "")
      .trim()
      .toLowerCase();

    const enteredPassword = String(password || "");

    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() === enteredEmail &&
        item.password === enteredPassword
    );

    if (!foundUser) {
      return null;
    }

    const loggedUser = {
  id: foundUser.id,
  name: foundUser.name,
  email: foundUser.email,
  role: foundUser.role,
  studentId: foundUser.studentId || null,
  teacherId: foundUser.teacherId || null,
};

    setUser(loggedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(loggedUser)
    );

    return loggedUser;
  };

  // Logout
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
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};