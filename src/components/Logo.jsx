// import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <div className="flex items-end w-[162px] ">
        <img
          className="w-[38px] h-[36px]"
          src="src/assets/icon-hh.png"
          alt="logo"
        />
        <h1 className="text-font-logo">Hahoot</h1>
      </div>
    </>
  );
}
