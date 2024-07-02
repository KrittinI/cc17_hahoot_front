import Modal from "../components/Modal";
import FormAddQuestion from "../components/FormAddQuestion";
import useQuestion from "../hooks/useQuestion";
import Add from "../icons/add";

export default function AddQuestionCard() {
  // const [open, setOpen] = useState(false);
  const { open, setOpen, setEdit } = useQuestion();
  const handleClickAdd = () => {
    setEdit(false);
    setOpen(true);
  };
  return (
    <>
      <div className="bg-white h-80 overflow-hidden w-72 rounded-xl shadow-lg">
        <div className="w-full h-64 flex justify-center items-center" role="button" onClick={handleClickAdd}>
          <Add />
        </div>

        <Modal open={open} onClose={() => setOpen(false)} title="add your question">
          <FormAddQuestion />
        </Modal>
      </div>
    </>
  );
}
