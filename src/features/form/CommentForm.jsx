import { useState } from "react";
import Button from "../../components/Button";

const initialInput = {
  comment: "",
};

export default function CommentForm() {
  const [input, setInput] = useState(initialInput);
  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2 className="text-center text-font-title">Comments</h2>
      <form>
        <div className="grid gap-y-6">
          <>
            <textarea
              className="block w-full resize-none shadow p-2 focus:outline-blue"
              rows={5}
              placeholder={`what's on your mind?`}
              value={input.comment}
              onChange={onChangeInput}
            ></textarea>

            <Button width="full" bg="black">
              Add Comment
            </Button>
          </>
        </div>
      </form>
    </>
  );
}
