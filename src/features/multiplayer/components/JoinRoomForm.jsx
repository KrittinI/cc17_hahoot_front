import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Logo from "../../../icons/Logo";

export default function JoinRoomForm({
  socket,
  roomId,
  setRoomId,
  name,
  setName,
}) {
  const navigate = useNavigate();

  const handleJoinRoom = (event) => {
    event.preventDefault();
    if (!name) alert("Please Enter nickname");
    if (!roomId) alert("Please Enter PIN");
    socket.on("lockStatus", ({ status }) => {
      if (status === "locked") {
        alert("This Room is Locked");
        return;
      }
    });
    if (name.trim() && roomId.trim()) {
      socket.emit("joinRoom", { roomId, name });
    }
  };

  return (
    <div className="bg-white w-72 shadow-xl rounded-lg p-5 flex justify-center items-center flex-col gap-3 relative">
      <h2 className="text-center font-bold text-black text-3xl">
        <Logo />
      </h2>
      <form onSubmit={handleJoinRoom} className="flex flex-col gap-4 w-full">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter nickname"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-center"
        />
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Game PIN"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-center"
        />
        <Button width="full" bg="blue">
          OK, go!
        </Button>
      </form>
      <Button width="full" bg="black" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </div>
  );
}
