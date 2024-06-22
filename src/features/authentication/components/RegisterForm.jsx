import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateRegister from "../validation/register-validator";
import authApi from "../../../api/auth";

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

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const errorMassage = validateRegister(input);
      if (errorMassage) {
        return setInputError(errorMassage);
      }

      setInputError({ ...initialInputError });
      // const isEmailExist = await
      // if (input.email === isEmailExist) {
      //   setInputError(prev => {})
      // }

      await authApi.register(input);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className=" bg-white w-72 shadow-xl rounded-lg p-4 flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
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
    </form>
  );
}
