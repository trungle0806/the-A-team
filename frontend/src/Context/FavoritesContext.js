import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

// Tạo FavoritesContext
const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated } = useAuth();

  // Kiểm tra nếu người dùng đã đăng nhập, lấy favorites từ localStorage
  useEffect(() => {
    if (isAuthenticated()) {
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites);
    }
  }, [isAuthenticated]); // Chạy lại khi trạng thái đăng nhập thay đổi

  // Lưu danh sách yêu thích vào localStorage khi favorites thay đổi
  useEffect(() => {
    if (isAuthenticated()) {
      localStorage.setItem("favorites", JSON.stringify(favorites)); // Lưu vào localStorage khi người dùng đã đăng nhập
    }
  }, [favorites, isAuthenticated]);

  // Thêm sản phẩm vào danh sách yêu thích
  const addToFavorites = (program) => {
    if (!isAuthenticated()) {
      toast.error(
        "Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích."
      );
      return;
    }

    // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích chưa
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.programId === program.programId)) {
        toast.info("Sản phẩm đã có trong danh sách yêu thích.");
        return prevFavorites;
      }
      const updatedFavorites = [...prevFavorites, program];
      toast.success("Sản phẩm đã được thêm vào danh sách yêu thích!");
      return updatedFavorites;
    });
  };

  // Xóa sản phẩm khỏi danh sách yêu thích
  const removeFromFavorites = (programId) => {
    if (!isAuthenticated()) {
      toast.error(
        "Bạn cần đăng nhập để xóa sản phẩm khỏi danh sách yêu thích."
      );
      return;
    }

    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (fav) => fav.programId !== programId
      );
      toast.success("Sản phẩm đã bị xóa khỏi danh sách yêu thích.");
      return updatedFavorites;
    });
  };

  // Đảm bảo rằng khi người dùng đăng xuất, danh sách yêu thích cũng sẽ bị xóa khỏi localStorage
  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.removeItem("favorites");
      setFavorites([]);
    }
  }, [isAuthenticated]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
