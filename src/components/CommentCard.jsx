import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import StarRating from "./StarRating";

export default function CommentCard({ comments }) {
  console.log(comments);
  const navigate = useNavigate();
  const handleClickAvatar = (id) => {
    navigate(`/users/${id}`);
  };
  return (
    <>
      {comments
        .sort((a, b) => b.id - a.id)
        .map((comment, index) => (
          <div key={index}>
            <div className="grid gap-y-4 bg-white shadow-xl p-4">
              <div className="min-h-10 text-font-body">{comment.comment}</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2" onClick={() => handleClickAvatar(comment?.user?.id)} role="button">
                  <Avatar src={comment?.user?.profileImage || comment?.user?.googleImage} />
                  <div className="text-blue">{comment?.user?.username}</div>
                </div>
                <StarRating readOnly={true} initialValue={comment?.rate} />
                {/* <div className="text-font-title-card text-blue">{comment?.rate}</div> */}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
