/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../../icons/Logo";
import { useState, useEffect } from "react";

const playerColorMap = {
  0: "bg-darkblueDarker",
  1: "bg-darkredDarker",
  2: "bg-darkyellowDarker",
  3: "bg-darkgreenDarker",
};

export default function WaitingRoom({ roomId, players, isOwner, socket }) {
  const [roomLock, setRoomLock] = useState(false);
  const [lockStatus, setLockStatus] = useState("unlocked");

  useEffect(() => {
    socket.on("lockStatus", ({ status }) => {
      setLockStatus(status);
    });
  }, []);

  const { authUser } = useAuth();
  // authUser?.username;
  console.log("RoomID", roomId);
  console.log("inWaitingRoom=> socket=", socket);
  console.log("players in room =", players);
  const navigate = useNavigate();
  const handleStartGame = () => {
    socket.emit("startGame", roomId);
  };

  const handleLockRoom = () => {
    if (roomLock === false) {
      //unlocked to lock
      setRoomLock(() => true);
      socket.emit("lockRoom", { roomId });
    } else {
      //locked to unlock
      setRoomLock(() => false);
      socket.emit("unlockRoom", { roomId });
    }
  };

  return (
    <div className="bg-white w-full md:w-3/4 h-5/6 rounded-lg shadow-xl gap-2 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-between h-full p-4 items-center w-full bg-transparent">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center w-full h-24 bg-darkred">
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
          <div className="flex bg-transparent w-full items-center justify-between mt-4 md:mt-0">
            <div></div>
            <h2 className="mt-4 text-3xl font-bold ">Game PIN: {roomId}</h2>
            <button
              className="w-20 bg-black text-white"
              onClick={handleLockRoom}
            >
              {roomLock ? "Locked" : "Lock?"}
            </button>
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
