import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import EditProfileForm from "./EditProfileForm";

export default function EditProfileBox() {
  const [open, setOpen] = useState(false);
  return (
    <div className="pt-2 w-full">
      <Button bg={"black"} width={"full"} onClick={() => setOpen(true)}>
        Edit Profile
      </Button>
      <Modal
        title={`Edit Your Profile`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <EditProfileForm onSuccess={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
