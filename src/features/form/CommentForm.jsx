import { useState } from "react";
import Button from "../../components/Button";
import questionApi from "../../api/question";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const initialInput = {
  comment: ""
};

export default function CommentForm({ setLoading, setComments }) {
  const { authUser } = useAuth()
  const [input, setInput] = useState(initialInput);
  const { questionId } = useParams()
  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      console.log(questionId);
      if (input.comment) {
        const res = await questionApi.comment(+questionId, input)
        console.log(res.data.comment);
        setComments(prev => [{ ...res.data.comment, user: { profileImage: authUser?.profileImage } }, ...prev])
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInput(initialInput)
      setLoading(false)
    }
  }

  return (
    <>
      <h2 className="text-center text-font-title">Comments</h2>
      <form onSubmit={handleSubmitComment}>
        <div className="grid gap-y-6">
          <>
            <textarea
              name="comment"
              className="block w-full resize-none shadow p-2 focus:outline-blue"
              rows={5}
              placeholder={`what's on your mind?`}
              value={input.comment}
              onChange={onChangeInput}
            >
            </textarea>
            <Button width="full" bg="black">
              Add Comment
            </Button>
          </>
        </div>
      </form>
    </>
  );
}
