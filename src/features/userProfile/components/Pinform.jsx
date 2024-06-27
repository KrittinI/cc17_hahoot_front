import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Logo from "../../../icons/Logo";
// import AvatarBox from "../../playGames/AvatarBox";
import AvatarForm from "../../playGames/AvatarForm";
import { useState } from "react";
import ModalSecond from "../../playGames/ModalSecond";

export default function PinForm() {
  const [openModal, setOpenModal] = useState(false);


  //   const [input, setInput] = useState();
  //   const [error, setError] = useState("");

  //   const handleClickEnter = async () => {
  //     try {
  //       const data = { ...input };
  //       if (data.pin === null) {
  //         return setError("invalid PIN code");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const handleChangeInput = (e) => {
  //     setError("");
  //     setInput({ ...input, [e.target.name]: e.target.value });
  //   };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 ">
      <Input
        // value={input?.pin}
        name={`pin`}
        // onChange={handleChangeInput}
        placeholder={`Pin Code`}
      />
      {/* {error && <p className="text-darkred">{error}</p>} */}
      {/* <div className="grid grid-cols-3 gap-2" role="button"></div> */}

      {/* <Button bg={`black`} width={`full`} onClick={handleClickEnter}> */}
      <Button bg={`black`} width={`full`} onClick={()=>setOpenModal(true)}>
        Enter
      </Button>
      <ModalSecond
        openModal={openModal}
        title={<Logo />}
        onClose={() => setOpenModal(false)}
      >
        <AvatarForm onSuccess={() => setOpenModal(false)} />
      </ModalSecond>
    </div>
  );
}
