import Modal from "../components/Modal";
import useEvent from "../hooks/useEvent";

import CreateEventForm from "../features/form/CreateEventForm";
import SplitScreen from "../layouts/SplitScreen";

import CreateEventleft from "../features/events/components/CreateEventleft";
import CreateEventRight from "../features/events/components/CreateEventRight";
import { useState } from "react";

export default function CreateEventPage() {
  const [open, setOpen] = useState(true);

  const { singleEvent } = useEvent();

  return (
    <>
      <div className="h-[calc(100vh-164px)] flex justify-center w-[65%] mx-auto">
        {singleEvent ? (
          <SplitScreen sizeRatio={30}>
            <CreateEventleft event={singleEvent} />
            <CreateEventRight event={singleEvent} />
          </SplitScreen>
        ) : (
          <></>
        )}
      </div>
      <Modal open={open} title="Create Event" width={40} j="start">
        <CreateEventForm onClose={() => (setOpen(false), singleEvent(null))} />
      </Modal>
    </>

  );
}
