import Modal from "../components/Modal";
import useEvent from "../hooks/useEvent";

import CreateEventForm from "../features/form/CreateEventForm";
import SplitScreen from "../layouts/SplitScreen";

import { useNavigate } from "react-router-dom";
import CreateEventleft from "../features/events/components/CreateEventleft";
import CreateEventRight from "../features/events/components/CreateEventRight";
import { useState } from "react";

export default function CreateEventPage() {
  const [open, setOpen] = useState(true);

  const { singleEvent } = useEvent();
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-164px)] flex justify-center">
      {singleEvent ? (
        <SplitScreen sizeRatio={30} width={65}>
          <CreateEventleft event={singleEvent} />
          <CreateEventRight event={singleEvent} />
        </SplitScreen>
      ) : (
        <></>
      )}
      <Modal open={open} onClose={() => navigate("/events")} title="Create Event" width={40} j="start">
        <CreateEventForm onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
