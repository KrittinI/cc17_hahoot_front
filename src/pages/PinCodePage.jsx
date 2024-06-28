import { useState } from "react";
import PinForm from "../features/userProfile/components/Pinform";
import AvatarForm from "../features/playGames/AvatarForm";

export default function PinCodePage() {
  const [pin, setPin] = useState("");
//   const [pin, setPin] = useState("");
  return (
    <div className="flex justify-center items-center h-[calc(100vh-12rem)] w-full">
      {!pin ? <PinForm setPin={setPin} /> : <AvatarForm />}
    </div>
  );
}
