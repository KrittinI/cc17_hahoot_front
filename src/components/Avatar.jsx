import profileImg from "../assets/user.png";

const sizeMap = {
  40: "w-[40px] h-[40px]",
  60: "w-[60px] h-[60px]",
  80: "w-[80px] h-[80px]",
  100: "w-[100px] h-[100px]",
  200: "w-[200px] h-[200px]",
};

const selectMap = {
  true: "outline outline-blue",
  false: ""
}

export default function Avatar({ src, size = 40, select = false }) {
  return (
    <div className="">
      <img
        className={`${sizeMap[size]} rounded-full border-none  hover:shadow-xl ${selectMap[select]}`}
        src={src || profileImg}
        alt="avatar"
      />
    </div>
  );
}
