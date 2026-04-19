import { useForm, Controller } from "react-hook-form";
import { Input } from "antd";

import "../styles/Register.css";
import "../styles/base.css";
import { useLogin } from "../hooks/useAuth.js";

const Login = () => {
  const loginMutation = useLogin();
  const { isPending, isError, error } = loginMutation;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    loginMutation.mutate(formData);
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

        <button type="submit" className="registration-form__button">
          Войти
        </button>
        {isPending && <p className="registration-form__loading">Загрузка...</p>}
        {isError && <p className="registration-form__error">{error.message}</p>}
      </form>
    </div>
  );
};

export default Login;
