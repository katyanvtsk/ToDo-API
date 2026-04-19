import { useNavigate } from "react-router";
import "../styles/base.css";
import "../styles/header.css";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="header">
      <h1 className="header__title">Todo List</h1>
      {token && (
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
