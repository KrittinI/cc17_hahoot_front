import Modal from "../components/Modal";
import useEvent from "../hooks/useEvent";

import CreateEventForm from "../features/form/CreateEventForm";
import SplitScreen from "../layouts/SplitScreen";

import { useNavigate } from "react-router-dom";
import CreateEventleft from "../features/events/components/CreateEventleft";
import CreateEventRight from "../features/events/components/CreateEventRight";

export default function CreateEventPage() {
  const { open, setOpen, singleEvent } = useEvent();
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-164px)]">
      {singleEvent ? (
        <SplitScreen sizeRatio={30}>
          <CreateEventleft event={singleEvent} />
          <CreateEventRight event={singleEvent} />
        </SplitScreen>
      ) : (
        navigate("/events")
      )}
      <Modal open={open} onClose={() => setOpen(false)} title="Create Event" width={40}>
        <CreateEventForm />
      </Modal>
    </div>
  );
}
