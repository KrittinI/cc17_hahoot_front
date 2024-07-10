import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../../icons/Logo";

const playerColorMap = {
  0: "bg-darkblueDarker",
  1: "bg-darkredDarker",
  2: "bg-darkyellowDarker",
  3: "bg-darkgreenDarker",
};

export default function WaitingRoom({ roomId, players, isOwner, socket }) {
  const { authUser } = useAuth();
  // authUser?.username;
  console.log("RoomID", roomId);
  console.log("inWaitingRoom=> socket=", socket);
  console.log("players in room =", players);
  const navigate = useNavigate();
  const handleStartGame = () => {
    socket.emit("startGame", roomId);
  };

  return (
    <div className="bg-white w-full md:w-3/4 h-5/6 rounded-lg shadow-xl gap-2 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-between h-full p-4 items-center w-full bg-transparent">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center w-full h-24">
            {isOwner ? (
              <div className="text-3xl font-bold">👤 {players?.length - 1}</div>
            ) : (
              <div className="w-12"></div> // Placeholder div to keep space
            )}
            <Logo />
            {isOwner && players?.length > 2 ? (
              <Button width="20" bg="blue" onClick={handleStartGame}>
                Start
              </Button>
            ) : (
              <div className="w-20"></div> // Placeholder div to keep space
            )}
          </div>
          <div className="flex bg-transparent w-full justify-center mt-4 md:mt-0">
            <h2 className="text-3xl font-bold ">Game PIN: {roomId}</h2>
          </div>
        </div>
        {isOwner && (
          <ul className="flex flex-wrap gap-4 p-4 bg-transparent">
            {players?.length === 1 ? (
              <div className="flex items-center justify-center text-2xl py-4 font-sans font-bold text-blue">
                <div>Waiting for players . . .</div>
              </div>
            ) : (
              players
                ?.filter((p) => p !== authUser?.username)
                ?.map((player, index) => (
                  <li
                    key={index}
                    className={`p-3 shadow-2xl border-b last:border-b-0 ${
                      playerColorMap[index % 4]
                    }`}
                  >
                    <span className="text-2xl font-semibold text-white">
                      {player}
                    </span>
                  </li>
                ))
            )}
          </ul>
        )}

        {!isOwner && (
          <div className="flex flex-col items-center justify-center gap-16">
            <code className="text-5xl text-blue">You&apos;re in!</code>
            <span className="text-emerald-600 mt-6">
              Waiting for hosting to start the game...
            </span>
          </div>
        )}

        {isOwner ? (
          <div className="flex justify-around">
            <Button width="40" bg="black" onClick={() => navigate("/")}>
              Back!
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
