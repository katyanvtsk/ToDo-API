import { useEffect, useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const saveToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  const isAuth = () => {
    return !!token;
  };

  const logout = () => {
    setToken(null);

    localStorage.removeItem("token");
  };

  return { token, setToken, saveToken, isAuth, logout };
};

export default useAuth;
