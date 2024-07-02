import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import ContianerCardQuiz from "../layouts/ContainerCardQuiz";
import HeroContianer from "../layouts/Hero";
import Modal from "../components/Modal";
import { useState } from "react";
// import PlayGameBox from "../components/PlayGameBox";
import EditProfileForm from "../features/userProfile/components/EditProfileForm";

export default function HomePage() {
  const { authUser } = useAuth()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (authUser?.username === null) {
      setOpen(true)
    }
  }, [authUser])


  return (
    <>
      <div className="h-[calc(100vh-8rem)] ">
        <HeroContianer />
        <ContianerCardQuiz />
        <Modal open={open} title={'Choose Your Avatar and Username'}>
          <EditProfileForm onSuccess={() => setOpen(false)} />
        </Modal>
      </div>
    </>
  );
}
