import { useState } from "react";
import Button from "../../components/Button";
import questionApi from "../../api/question";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import StarRating from "../../components/StarRating";
import { useEffect } from "react";

const initialInput = {
  comment: "",
  rate: "",
};

export default function CommentForm({ setLoading, setComments }) {
  const { authUser } = useAuth();
  const [input, setInput] = useState(initialInput);
  const { questionId } = useParams();

  //########### for star
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  useEffect(() => {
    setInput((prev) => ({ ...prev, rate: rating }));
  }, [rating]);

  const onPointerMove = (value, index) => console.log(value, index);

  //########### for star

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (input.comment) {
        const res = await questionApi.comment(+questionId, input);
        setComments((prev) => [{ ...res.data.comment, user: { profileImage: authUser?.profileImage, username: authUser?.username } }, ...prev]);
      }
      setRating(0);
    } catch (error) {
      console.log(error);
    } finally {
      setInput(initialInput);
      setLoading(false);
    }
  };

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
            ></textarea>
            <div className="mx-auto">
              <StarRating size={30} handleRating={handleRating} onPointerMove={onPointerMove} initialValue={rating} />
            </div>
            <Button width="full" bg="black">
              Add Comment
            </Button>
          </>
        </div>
      </form>
    </>
  );
}
