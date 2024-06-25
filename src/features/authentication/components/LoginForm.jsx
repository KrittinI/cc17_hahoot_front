import { useState, useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateLogin from "../validation/login-validator";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const initialInput = {
  email: "",
  password: "",
};

const initialInputError = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const { login, authApi } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const [isGoogleRegister, setIsGoogleRegister] = useState(true);
  const clientId =
    "363481062777-mcp0obbajfl7cga0sua955vko0rprrsu.apps.googleusercontent.com";

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
    data.password = res.profileObj.googleId;
    await login(data);
    navigate("/");
  };

  const onFailureLoginGoogle = (res) => {
    console.log(res);
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

  const navigateToRegister = () => {
    navigate("/register");
  };
  return (
    <form
      className=" bg-white w-72 shadow-xl rounded-lg p-4 flex flex-col gap-5"
      onSubmit={handleSubmitLogin}
    >
      {isGoogleRegister ? (
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
          <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={onSuccessLoginGoogle}
            onFailure={onFailureLoginGoogle}
            cookiePolicy={"single_host_origin"}
            className="flex justify-center"
          />
          <Button width="full" bg="black">
            Login
          </Button>
          <hr />
          <Button
            width="full"
            bg="blue"
            color="white"
            onClick={navigateToRegister}
          >
            Register
          </Button>
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign up with Google"
            onSuccess={onSuccessRegisterGoogle}
            onFailure={onFailureRegisterGoogle}
            cookiePolicy={"single_host_origin"}
            className="flex justify-center"
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
