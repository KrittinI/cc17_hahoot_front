import Logo from "../icons/Logo";

export default function Footer() {
  return (
    <div className="bg-white h-[100px] flex flex-col justify-center items-center gap-3">
      <div className="text-sm">
        Copyright © 2025 BRIX Agency | All Rights Reserved
      </div>
      <Logo />
    </div>
  );
}
