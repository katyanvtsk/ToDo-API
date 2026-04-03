import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "antd";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth.jsx";
import "../styles/Register.css";
import "../styles/base.css";

const Login = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorServer, setErrorServer] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/auth/login",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (response.ok) {
        const res = await response.json(); //токен пришёл

        if (res.token) {
          saveToken(res.token);
          navigate("/");
        } else {
          setErrorServer("Токен не получен");
        }
      } else {
        const errorData = await response.json();
        setErrorServer(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="registration-form">
      <h2 className="registration-form__title">Вход</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="registration-form__form"
      >
        <div className="registration-form__field">
          <label className="registration-form__lable">Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Введите email"
                className="registration-form__input"
              />
            )}
          />
        </div>

        <div className="registration-form__field">
          <label className="registration-form__lable">Пароль:</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Введите пароль"
                className="registration-form__input"
              />
            )}
          />
        </div>
        {errorServer && (
          <p className="registration-form__error">{errorServer}</p>
        )}
        <button type="submit" className="registration-form__button">
          Войти
        </button>
        {loading && <p className="registration-form__loading">Загрузка...</p>}
      </form>
    </div>
  );
};

export default Login;
