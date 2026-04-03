import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router";
import "../styles/base.css";
import "../styles/header.css";

const Header = () => {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="header">
      <h1 className="header__title">Todo List</h1>
      {isAuth() && (
        <button
          onClick={handleLogout}
          className="header__button button__logout"
        >
          Выйти
        </button>
      )}
    </div>
  );
};

export default Header;
