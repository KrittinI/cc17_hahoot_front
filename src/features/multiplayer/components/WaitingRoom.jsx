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

  return (
    <div className="bg-white px-2 w-full md:w-3/4 h-full rounded-lg shadow-xl gap-2 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-between h-full p-4 items-center w-full bg-transparent">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center w-full ">
            {isOwner ? <Logo /> : <div></div>}
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
                {players?.length - 1}
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
            {players?.length === 1 ? (
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
                    className={`p-3 px-6 rounded-lg shadow-2xl border-b last:border-b-0 ${
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
          <div className="flex flex-col items-center justify-center gap-6">
            <code className="text-font-title text-black">You&apos;re in!</code>
            <div className="flex space-x-2 justify-center gap-2 items-center">
              <div className=" animate-bounce [animation-delay:-0.4s]">
                <Triangle color="#60A5FA" />
                {/* <svg
                  viewBox="0 0 32 32"
                  focusable="false"
                  stroke="#60A5FA"
                  strokeWidth="2px"
                  aria-labelledby="label-a149cdfd-d500-48ab-82c9-ce8f80f8656e"
                  aria-hidden="true"
                  className="icon__Svg-sc-xvsbpg-1 ipIYNE"
                  style={{ paintOrder: "stroke", width: "30", height: "30" }}
                >
                  <path
                    d="M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z"
                    style={{ fill: "#60A5FA" }}
                  ></path>
                </svg> */}
              </div>
              <div className=" animate-bounce [animation-delay:-0.3s]">
                <Dimond color="#00CB4A" />
                {/* <svg
                  viewBox="0 0 32 32"
                  focusable="false"
                  stroke="#00CB4A"
                  strokeWidth="2px"
                  aria-labelledby="label-781155b4-826c-4cd7-a360-9b04915ef98d"
                  aria-hidden="true"
                  className="icon__Svg-sc-xvsbpg-1 ipIYNE"
                  style={{ paintOrder: "stroke", width: "30", height: "30" }}
                >
                  <path
                    d="M4,16.0038341 L16,4 L28,16.0007668 L16,28 L4,16.0038341 Z"
                    style={{ fill: "#00CB4A" }}
                  ></path>
                </svg> */}
              </div>
              <div className="animate-bounce [animation-delay:-0.2s]">
                <Circle color="#FFDA45" />
                {/* <svg
                  viewBox="0 0 32 32"
                  focusable="false"
                  stroke="#FFDA45"
                  strokeWidth="2px"
                  aria-labelledby="label-c0599796-4596-4dbe-bcc2-e8ed9d0f2e9f"
                  aria-hidden="true"
                  className="icon__Svg-sc-xvsbpg-1 ipIYNE"
                  style={{ paintOrder: "stroke", width: "30", height: "30" }}
                >
                  <path
                    d="M16,27 C9.92486775,27 5,22.0751322 5,16 C5,9.92486775 9.92486775,5 16,5 C22.0751322,5 27,9.92486775 27,16 C27,22.0751322 22.0751322,27 16,27 Z"
                    style={{ fill: "#FFDA45" }}
                  ></path>
                </svg> */}
              </div>
              <div className=" animate-bounce [animation-delay:-0.1s]">
                <Square color="#FB7185" />
                {/* <svg
                  viewBox="0 0 32 32"
                  focusable="false"
                  stroke="#FB7185"
                  strokeWidth="2px"
                  aria-labelledby="label-21f46f6a-a0d3-4a52-b216-21541425fb95"
                  aria-hidden="true"
                  className="icon__Svg-sc-xvsbpg-1 ipIYNE"
                  style={{ paintOrder: "stroke", width: "30", height: "30" }}
                >
                  <path
                    d="M7,7 L25,7 L25,25 L7,25 L7,7 Z"
                    style={{ fill: "#FB7185" }}
                  ></path>
                </svg> */}
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
