import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import ContianerCardQuiz from "../layouts/ContainerCardQuiz";
import HeroContianer from "../layouts/Hero";
import ModalCardMini from "../components/Modal";
import { useState } from "react";
import PlayGameBox from "../components/PlayGameBox";

export default function HomePage() {
  const { authUser } = useAuth()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (authUser?.username === null) {
      setOpen(false)
    }
  }, [authUser])


  return (
    <>
      <div className="h-[calc(100vh-8rem)] ">
        <HeroContianer />
        <ContianerCardQuiz />
        <ModalCardMini open={open} title={'Choose Your Avatar and Username'}>
          <PlayGameBox width={80} />
        </ModalCardMini>
      </div>
    </>
  );
}
