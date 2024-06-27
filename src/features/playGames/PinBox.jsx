import { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Logo from "../../icons/Logo";
import PinForm from "../userProfile/components/Pinform";

export default function PinBox() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button bg="black" onClick={() => setOpen(true)}>
        Play
      </Button>
      <Modal open={open} title={<Logo />} onClose={() => setOpen(false)}>
        <PinForm onSuccess={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
