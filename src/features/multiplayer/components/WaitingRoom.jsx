/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../../icons/Logo";
import { IoPerson } from "react-icons/io5";
import { useState, useEffect } from "react";
import { LockIcon, UnlockIcon } from "../../../icons/Banned";
import { Triangle, Dimond, Circle, Square } from "../../../icons/kahoot";
import useQuestion from "../../../hooks/useQuestion";
import QRCode from "qrcode.react";

const playerColorMap = {
  0: "bg-darkblueDarker",
  1: "bg-darkredDarker",
  2: "bg-darkyellowDarker",
  3: "bg-darkgreenDarker",
};

export default function WaitingRoom({ roomId, players, isOwner, socket }) {
  const { setPlayQuestion } = useQuestion();

  const currentUrl = window.location.href;

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
      socket.emit("lockRoom", { roomId });
    } else {
      //locked to unlock
      socket.emit("unlockRoom", { roomId });
    }
    setRoomLock((prev) => !prev);
  };

  const handleFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // IE/Edge
      element.msRequestFullscreen();
    }
  };

  let playerCount = (players?.length ?? 0) - 1;
  if (playerCount === -1) playerCount = 0;

  return (
    <div className="bg-white px-2 w-full md:w-3/4 h-full rounded-lg shadow-xl gap-2 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-between h-full p-4 items-center w-full bg-transparent">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center w-full ">
            <Logo />
            <div className="flex items-center gap-2">
              {isOwner && (
                <button
                  className=" text-white flex justify-center bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                  onClick={handleLockRoom}
                >
                  {roomLock ? <LockIcon size={8} /> : <UnlockIcon size={8} />}
                </button>
              )}
              <div className="text-font-title text-black bg-lblue flex justify-center items-center rounded-md gap-4 py-2 px-4">
                <IoPerson className=" text-blue w-[40px] h-[40px]  flex justify-center align-middle" />
                {playerCount}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full justify-center items-center mt-4 md:mt-0">
            <div className="text-font-title-card-quiz  ">Game PIN</div>
            <div className="text-font-title text-blue border px-12 py-2 rounded-md shadow">
              {roomId}
            </div>
            <QRCode
              className="mt-2"
              value={currentUrl}
              size={125}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
          </div>
        </div>
        {isOwner && (
          <ul className="flex flex-wrap gap-4 p-4 bg-transparent justify-center">
            {playerCount === 0 ? (
              <div className="flex items-center justify-center text-2xl py-4 font-sans font-bold text-blue">
                {/* <div>Waiting for players . . .</div> */}
                <div className="rounded-full h-20 w-50 animate-ping">
                  <Logo />
                </div>
              </div>
            ) : (
              players
                ?.filter((p) => p !== authUser?.username)
                ?.map((player, index) => (
                  <li
                    key={index}
                    className={`p-3 px-6 rounded-lg shadow-2xl border-b last:border-b-0 ${playerColorMap[index % 4]
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
          <div className="flex flex-col items-center justify-center gap-6">
            <code className="text-font-title text-black">You&apos;re in!</code>
            <div className="flex space-x-2 justify-center gap-2 items-center">
              <div className=" animate-bounce [animation-delay:-0.4s]">
                <Triangle color="#60A5FA" />
              </div>
              <div className=" animate-bounce [animation-delay:-0.3s]">
                <Dimond color="#00CB4A" />
              </div>
              <div className="animate-bounce [animation-delay:-0.2s]">
                <Circle color="#FFDA45" />
              </div>
              <div className=" animate-bounce [animation-delay:-0.1s]">
                <Square color="#FB7185" />
              </div>
            </div>
          </div>
        )}

        {isOwner ? (
          <div className="flex justify-between w-full">
            <Button
              width="40"
              bg="black"
              onClick={() => (navigate(-1), setPlayQuestion([]))}
            >
              Back
            </Button>
            <button
              onClick={handleFullScreen}
              className="bg-darkgreen rounded-lg w-40 text-white font-bold h-auto"
            >
              Full Screen
            </button>
            <Button width="40" bg="blue" onClick={handleStartGame}>
              Start
            </Button>
          </div>
        ) : (
          <button
            onClick={handleFullScreen}
            className="bg-darkgreen rounded-lg w-40 text-white font-bold h-auto"
          >
            Full Screen
          </button>
        )}
      </div>
    </div>
  );
}
