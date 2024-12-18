import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo context
const AuthContext = createContext();

// Cung cấp context cho các component con
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  });

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth({ token, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth({ token: null, role: null });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setAuth({ token, role });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để truy cập vào context
export const useAuth = () => useContext(AuthContext);

export default AuthContext; // Thêm export mặc định AuthContext​23:12/-strong/-heart:>:o:-((:-h Xem trước khi gửiThả Files vào đây để xem lại trước khi gửi