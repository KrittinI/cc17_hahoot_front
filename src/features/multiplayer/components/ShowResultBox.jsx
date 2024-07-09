export default function ShowResultBox({ clientAnswerResult, score }) {
    return (
        <div className="bg-timeLeft text-white flex flex-col gap-4 text-center p-6 rounded-lg shadow-lg">
            <div className={`text-3xl ${clientAnswerResult ? "text-darkgreen" : "text-darkred"}`}>{clientAnswerResult ? "Correct" : "Incorrect"}</div>
            <div className={`text-5xl ${clientAnswerResult ? "text-darkgreen" : "text-darkred"}`}>{clientAnswerResult ? "✅" : "❌"}</div>
            {/* <div className="mt-2 text-2xl text-white">score:{score}</div> */}
        </div>
    )
}
