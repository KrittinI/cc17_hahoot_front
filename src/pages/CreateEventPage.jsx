import Modal from "../components/Modal";
import useEvent from "../hooks/useEvent";

import CreateEventForm from "../features/form/CreateEventForm";
import SplitScreen from "../layouts/SplitScreen";

export default function CreateEventPage() {
  const { open, setOpen } = useEvent();
  return (
    <div className="h-[calc(100vh-164px)]">
      <SplitScreen>
        <div>eie</div>
        <div>eiei</div>
      </SplitScreen>
      <Modal open={open} onClose={() => setOpen(false)} title="Create Event" width={40}>
        <CreateEventForm />
      </Modal>
    </div>
  );
}
