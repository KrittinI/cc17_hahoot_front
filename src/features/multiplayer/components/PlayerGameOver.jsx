import Button from "../../../components/Button";

export default function PlayerGameOver({ score }) {
    return (
        <div className="flex flex-col items-center justify-center h-auto bg-gray-500 text-white rounded-lg">
            <div className="bg-gray-900 p-8 rounded-lg shadow-md text-center">
                <h1 className="text-4xl font-bold mb-4">The Game is Over</h1>
                <p className="text-2xl mb-4">Your Score: {score}</p>
                <div className="flex flex-col items-center justify-center gap-6">
                    <Button bg="red" width="60">
                        Send to your E-mail
                    </Button>
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
    )
}
