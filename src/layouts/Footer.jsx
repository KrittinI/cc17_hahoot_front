import Logo from "../components/Logo";

export default function Footer() {
  return (
    <div className="bg-white mt-10 h-[136px] flex flex-col justify-center items-center ">
      <div className="text-sm mb-5">
        Copyright © 2025 BRIX Agency | All Rights Reserved
      </div>
      <Logo />
    </div>
  );
}
