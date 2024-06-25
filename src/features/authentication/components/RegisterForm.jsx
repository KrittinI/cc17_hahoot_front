import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateRegister from "../validation/register-validator";
import authApi from "../../../api/auth";
import LinkButton from "../../../components/LinkButton";
import { useNavigate } from "react-router-dom";

const initialInput = {
  email: "",
  password: "",
  confirmPassword: "",
};

const initialInputError = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(true);
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitRegister = async (e) => {
    try {
      e.preventDefault();
      const errorMassage = validateRegister(input);
      if (errorMassage) {
        return setInputError(errorMassage);
      }

      setInputError({ ...initialInputError });

      const res = await authApi.register(input);
      setIsRegisterSuccess(false);
      if (res.request.status === 400) {
        setInputError((pre) => ({ ...pre, email: "Email already existed" }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickGoLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <form
      className=" bg-white w-72 shadow-xl rounded-lg p-4 flex flex-col gap-5"
      onSubmit={handleSubmitRegister}
    >
      {isRegisterSuccess ? (
        <>
          <Input
            name="email"
            placeholder="E-mail"
            position="center"
            value={input.email}
            onChage={onChangeInput}
            error={inputError.email}
          />
          <Input
            name="password"
            placeholder="Password"
            position="center"
            type="password"
            value={input.password}
            onChage={onChangeInput}
            error={inputError.password}
          />
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            position="center"
            type="password"
            value={input.confirmPassword}
            onChage={onChangeInput}
            error={inputError.confirmPassword}
          />
          <Button width="full" bg="black">
            Register
          </Button>
          <LinkButton
            onClick={handleClickGoLogin}
            text="Already a User?"
            linkButton="Login now"
          />
        </>
      ) : (
        <>
          <div>register success</div>
          <a href="https://mail.google.com/" target="_blank">
            please verify email
          </a>
        </>
      )}
    </form>
  );
}
