
export default function RoomAnswerCount({ roomAnswerCount }) {
    return (
        <div className="flex flex-row gap-2 mt-4">
            <div className="flex flex-col items-center justify-center bg-darkredDarker p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
                    {roomAnswerCount.A}
                </div>
                <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
                    ▲
                </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-darkblueDarker p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
                    {roomAnswerCount.B}
                </div>
                <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
                    ◆
                </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-darkyellowDarker p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
                    {roomAnswerCount.C}
                </div>
                <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
                    ●
                </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-darkgreenDarker p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
                    {roomAnswerCount.D}
                </div>
                <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
                    ■
                </div>
            </div>
        </div>
    )
}
