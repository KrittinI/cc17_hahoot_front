import { Circle, Dimond, Square, Triangle } from "../../../icons/kahoot";
export default function RoomAnswerCount({ roomAnswerCount, currentQuestion }) {
  return (
    <div className="flex flex-row gap-2 mt-4">
      <div className="flex flex-col items-center justify-center bg-darkred p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
          {roomAnswerCount.A}
        </div>
        <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
          <Triangle />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-darkblue p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
          {roomAnswerCount.B}
        </div>
        <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
          <Dimond />
        </div>
      </div>
      {
        currentQuestion.choice3 &&
        <div className="flex flex-col items-center justify-center bg-darkyellow p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
            {roomAnswerCount.C}
          </div>
          <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
            <Circle />
          </div>
        </div>
      }
      {
        currentQuestion.choice4 &&
        <div className="flex flex-col items-center justify-center bg-darkgreen p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
            {roomAnswerCount.D}
          </div>
          <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
            <Square />
          </div>
        </div>
      }
    </div>
  );
}
