import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateRegister from "../validation/register-validator";
import authApi from "../../../api/auth";
import LinkButton from "../../../components/LinkButton";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import MailIcon from "../../../icons/mail";

const clientId =
  "363481062777-mcp0obbajfl7cga0sua955vko0rprrsu.apps.googleusercontent.com";

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
  const [isGoogleRegister, setIsGoogleRegister] = useState(true);

  const navigate = useNavigate();

  const onClickCloseForm = () => {
    navigate("/");
  };

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
      setIsGoogleRegister(false);
      if (res.request.status === 400) {
        setInputError((pre) => ({ ...pre, email: "Email already existed" }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccessRegisterGoogle = async (res) => {
    const data = {};
    data.email = res.profileObj.email;
    data.password = res.profileObj.googleId;
    data.confirmPassword = res.profileObj.googleId;
    data.profileImage = res.profileObj.imageUrl;
    await authApi.register(data);
    setIsGoogleRegister(false);
  };

  const onFailureRegisterGoogle = (res) => {
    console.log(res);
  };

  const handleClickGoLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <form
        className="bg-white w-72 shadow-xl rounded-lg p-5 flex justify-center items-center flex-col gap-3 absolute"
        onSubmit={handleSubmitRegister}
      >
        <div role="button" className="absolute top-1 right-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-red"
            onClick={onClickCloseForm}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        {isGoogleRegister ? (
          <>
            <h2 className="text-center mb-2 font-bold text-black text-3xl">
              Register
            </h2>
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
            <hr className="shadow-2 w-full py-1" />
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign Up with Google"
              onSuccess={onSuccessRegisterGoogle}
              onFailure={onFailureRegisterGoogle}
              cookiePolicy={"single_host_origin"}
              className="flex justify-center w-full"
            />
            <LinkButton
              onClick={handleClickGoLogin}
              text="Already a User?"
              linkButton="Login now"
            />
          </>
        ) : (
          <>
            <MailIcon />
            <hr className="shadow-2 w-full" />
            <a
              href="https://mail.google.com/"
              target="_blank"
              className="text-black hover:text-darkblue"
            >
              Please verify email
            </a>
          </>
        )}
      </form>
    </>
  );
}
