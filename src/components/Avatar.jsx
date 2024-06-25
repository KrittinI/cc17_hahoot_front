// import profileImg from '../assets/blank.png'

// export default function Avatar({ src, size = 2.5 }) {
//     return (
//         <img src={src || profileImg} alt="user" className="rounded-full shadow" style={{ width: `${size}rem`, height: `${size}rem` }} />
//     )
// }

export default function Avatar({ src }) {
  return (
    <div className="">
      <img
        className="w-[40px] h-[40px] rounded-full border-none"
        src={src || "src/assets/user.png"}
        alt="avatar"
      />
    </div>
  );
}
