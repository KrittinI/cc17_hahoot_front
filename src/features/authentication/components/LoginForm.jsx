import { useState, useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateLogin from "../validation/login-validator";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import authApi from "../../../api/auth";

const initialInput = {
  email: "",
  password: "",
};

const initialInputError = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const clientId =
    "363481062777-mcp0obbajfl7cga0sua955vko0rprrsu.apps.googleusercontent.com";

  const onClickCloseForm = () => {
    navigate("/");
  };

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const errorMassage = validateLogin(input);
      if (errorMassage) {
        return setInputError(errorMassage);
      }
      const res = await authApi.register(input);
      if (res.request.status === 400) {
        setInputError((pre) => ({
          ...pre,
          email: "Email or password incorrect",
          password: "Email or password incorrect",
        }));
      }
      setInputError({ ...initialInputError });
      await login(input);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "profile email",
      });
    };
    gapi.load("client:auth2", initClient);
  }, [clientId]);

  const onSuccessLoginGoogle = async (res) => {
    const data = {};
    data.email = res.profileObj.email;
    // data.password = res.profileObj.googleId;
    data.googlePassword = res.profileObj.googleId;
    await login(data);
    navigate("/");
  };

  const onFailureLoginGoogle = (res) => {
    console.log(res);
  };

  const navigateToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      {/* <div className="flex justify-center items-center h-[calc(100vh-8rem)] bg-black opacity-40 relative"></div> */}

      <form
        className=" bg-white w-72 shadow-xl rounded-lg p-5 flex justify-center items-center flex-col gap-3 relative"
        onSubmit={handleSubmitLogin}
      >
        <h2 className="text-center mb-2 font-bold text-black text-3xl">
          Login
        </h2>
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
        <>
          <Input
            name="email"
            placeholder="E-mail"
            position="center"
            value={input.email}
            onChange={onChangeInput}
            error={inputError.email}
          />

          <Input
            name="password"
            placeholder="Password"
            position="center"
            type="password"
            value={input.password}
            onChange={onChangeInput}
            error={inputError.password}
          />

          <Button width="full" bg="black">
            Login
          </Button>
          <GoogleLogin
            clientId={clientId}
            buttonText="Continue with Google"
            onSuccess={onSuccessLoginGoogle}
            onFailure={onFailureLoginGoogle}
            cookiePolicy={"single_host_origin"}
            className="flex justify-center w-full"
          />
          <hr className="shadow-2 w-full" />
          <Button
            width="full"
            bg="blue"
            color="white"
            onClick={navigateToRegister}
          >
            Register
          </Button>
        </>
      </form>
    </>
  );
}
