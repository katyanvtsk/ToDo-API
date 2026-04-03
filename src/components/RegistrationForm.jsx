import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Radio } from "antd";
import "../styles/Register.css";
import "../styles/base.css";

const RegistrationForm = () => {
  const [errorServer, setErrorServer] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const data = { ...formData, age: parseInt(formData.age) };
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        const res = await response.json();
        console.log(res);
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
      <h2 className="registration-form__title">Регистрация</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="registration-form__form"
      >
        <div className="registration-form__field">
          <label className="registration-form__lable">Логин:</label>
          <Controller
            name="login"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Введите логин"
                className="registration-form__input"
              />
            )}
          />
        </div>

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
              validate: (value) => {
                if (value.length < 8) {
                  return "Минимум 8 символов";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Минимум 1 заглавная буква";
                }
                if (!/[a-z]/.test(value)) {
                  return "Минимум 1 прописная буква";
                }
                if (!/\d/.test(value)) {
                  return "Минимум 1 цифра";
                }
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                  return "Минимум 1 символ";
                }
                return true;
              },
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

        <div className="registration-form__field">
          <label className="registration-form__lable">Пол:</label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Обязательное поле" }}
            render={({ field }) => (
              <Radio.Group {...field} className="registration-form__radio">
                <Radio value="male" className="registration-form__radio-option">
                  Male
                </Radio>
                <Radio
                  value="female"
                  className="registration-form__radio-option"
                >
                  Female
                </Radio>
              </Radio.Group>
            )}
          />
          <p className="registration-form__error">{errors.gender?.message}</p>
        </div>

        <div className="registration-form__field">
          <label className="registration-form__lable"> Возраст:</label>
          <Controller
            name="age"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Введите возраст"
                className="registration-form__input"
              />
            )}
          />
        </div>
        <button type="submit" className="registration-form__button">
          Зарегистрироваться
        </button>
        {loading && (
          <p className="registration-form__loading">Регистрация...</p>
        )}
      </form>

      {errorServer && <p className="registration-form__error">{errorServer}</p>}
    </div>
  );
};

export default RegistrationForm;
