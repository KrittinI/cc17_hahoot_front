import { useState } from "react";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Input";

export default function PlayerGameOver({ score, handleSendMail }) {
  const { authUser } = useAuth();
  const [isSendMail, setIsSendMail] = useState(false);
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");

  const sendMail = async () => {
    setIsSendMail(true);
    handleSendMail(authUser?.email);
  };

  const handleSendMailClient = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      setInputError("E-mail is not allowed to be empty.");
    } else if (!input.includes("@gmail.com")) {
      setInputError("Email is not formatted correctly");
    } else {
      handleSendMail(input);
      setIsSendMail(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto bg-gray-500 text-white rounded-lg">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">The Game is Over</h1>
        <p className="text-2xl mb-4">Your Score: {score}</p>
        <div className="flex flex-col items-center justify-center gap-6">
          {authUser ? (
            isSendMail ? null : (
              <Button bg="black" width="60" onClick={sendMail}>
                Send to your E-mail
              </Button>
            )
          ) : isSendMail ? null : (
            <form
              onSubmit={handleSendMailClient}
              className="w-60 flex flex-col gap-4 text-black"
            >
              <Input
                placeholder="Fill E-mail to send result"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                error={inputError}
              />
              <Button bg="black" width="60">
                Send to your E-mail
              </Button>
            </form>
          )}
          <Button
            bg="blue"
            width="60"
            onClick={() => window.location.reload(true)}
          >
            Play again
          </Button>
        </div>
      </div>
    </div>
  );
}
