import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

const playerColorMap = {
    0: "bg-darkblueDarker",
    1: "bg-darkredDarker",
    2: "bg-darkyellowDarker",
    3: "bg-darkgreenDarker"
}

export default function WaitingRoom({ roomId, players, isOwner, socket }) {

    const navigate = useNavigate()
    const handleStartGame = () => {
        socket.emit("startGame", roomId);
    };

    return (
        <div className="bg-white w-3/4 h-5/6 rounded-lg shadow-xl gap-3 flex flex-col items-center justify-center">
            <div className="flex flex-col justify-between h-full p-4 items-center">
                <h2 className="text-2xl font-bold ">PIN Code: {roomId}</h2>
                <ul className=" bg-transparent rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {players.map((player, index) => (
                        <li
                            key={index}
                            className={`flex items-center justify-between p-4 rounded-lg border-b last:border-b-0 ${playerColorMap[index % 4]}`}
                        >
                            <span className="text-2xl font-semibold text-white">
                                {player}
                            </span>
                        </li>
                    ))}
                </ul>
                {isOwner ? (
                    <div className="flex justify-around w-full">
                        <Button width="60" bg="black" onClick={() => navigate('/')}>
                            Back!
                        </Button>
                        <Button width="60" bg="blue" onClick={handleStartGame}>
                            Start Game!
                        </Button>
                    </div>
                ) : <div></div>
                }
            </div>
        </div>
    )
}
