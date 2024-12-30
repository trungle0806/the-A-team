import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo Context để quản lý thông tin xác thực
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("authToken"),
    role: localStorage.getItem("role"),
    user: null, // Lưu trữ user trong state
  });

  // Hàm đăng nhập, lưu trữ token, role và user vào localStorage
  const login = (token, role, user) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin user
    setAuth({ token, role, user });
  };

  // Hàm đăng xuất, xóa thông tin xác thực
  const logout = () => {
    localStorage.clear(); // Xóa tất cả dữ liệu khỏi localStorage
    setAuth({ token: null, role: null, user: null }); // Reset state auth
  };

  // Hàm kiểm tra xem người dùng đã đăng nhập hay chưa
  const isAuthenticated = () => {
    return !!auth.token; // Kiểm tra xem có token không
  };

  // Hàm kiểm tra quyền của người dùng, chuyển cả 2 giá trị về chữ thường để so sánh
  const hasRole = (role) => {
    const userRole = auth.role ? auth.role.toLowerCase() : "";
    return userRole === role.toLowerCase(); // So sánh quyền
  };

  useEffect(() => {
    // Kiểm tra dữ liệu trong localStorage
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");
    const userString = localStorage.getItem("user");

    console.log(
      "AuthContext useEffect - token, role, user from localStorage:",
      token,
      role,
      userString
    );

    let user = null;
    if (userString) {
      try {
        user = JSON.parse(userString); // Thử phân tích user từ localStorage
        console.log("Parsed user:", user);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }

    if (token && role && user) {
      setAuth({ token, role, user });
    } else {
      console.log("No valid user data found in localStorage.");
    }
  }, []); // Chạy khi component được mount

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, isAuthenticated, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
