// import profileImg from "../assets/blank.png";

export default function Avatar({ src, size = 2.5 }) {
  return (
    <img
      src={src}
      alt="user"
      className="rounded-full shadow"
      style={{ width: `${size}rem`, height: `${size}rem` }}
    />
  );
}
