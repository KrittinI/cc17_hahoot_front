import profileImg from '../assets/user.png'

// export default function Avatar({ src, size = 2.5 }) {
//     return (
//         <img src={src || profileImg} alt="user" className="rounded-full shadow" style={{ width: `${size}rem`, height: `${size}rem` }} />
//     )
// }

const sizeMap = {
  40: "w-[40px] h-[40px]",
  60: "w-[60px] h-[60px]",
  80: "w-[80px] h-[80px]",
  100: "w-[100px] h-[100px]",
}

export default function Avatar({ src, size = 40 }) {
  return (
    <div className="">
      <img
        className={`${sizeMap[size]} rounded-full border-none`}
        src={src || profileImg}
        alt="avatar"
      />
    </div>
  );
}
