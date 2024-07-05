import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import ContianerCardQuiz from "../layouts/ContainerCardQuiz";
import HeroContianer from "../layouts/Hero";
import Modal from "../components/Modal";
import { useState } from "react";
// import PlayGameBox from "../components/PlayGameBox";
import EditProfileForm from "../features/userProfile/components/EditProfileForm";
import axios from "../config/axios";


export default function HomePage() {
  const { authUser } = useAuth()
  const [open, setOpen] = useState(false)
  const [hero, setHero] = useState(null)
  console.log(hero);
  useEffect(() => {
    const fetchHero = async () => {
      const res = await axios.get('/hero/Active')
      setHero(res.data.hero)
    }
    fetchHero()
    if (authUser?.username === null) {
      setOpen(true)
    }
  }, [authUser])


  return (
    <>
      <div className="">
        <HeroContianer hero={hero} />
        <ContianerCardQuiz hero={hero} />
        <Modal open={open} title={'Choose Your Avatar and Username'}>
          <EditProfileForm onSuccess={() => setOpen(false)} />
        </Modal>
      </div>
    </>
  );
}
