export default function CardBoxInProfile({ src, width = 20, size }) {
  return (
    <div
      className={`bg-white flex flex-col shadow-xl rounded-lg w-[${width}%]`}
    >
      <div className="bg-purple-400 h-[50%] rounded-t-lg">
        {/* <img src={src} /> */} picture
      </div>
      <div className="p-2">
        <div className={`text-${size}`}>title</div>
        <div className="flex justify-between">
          <div>icon1</div>
          <div>icon2</div>
          <div>icon3</div>
        </div>
      </div>
    </div>
  );
}
