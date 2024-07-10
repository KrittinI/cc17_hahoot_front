import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

export default function CommentCard({ comments }) {
  const navigate = useNavigate()
  const handleClickAvatar = (id) => {
    console.log(id);
    navigate(`/users/${id}`)
  }
  return (
    <>
      {
        comments.map((comment, index) =>
          <div key={index}>
            <div className="grid gap-y-4 bg-white shadow-xl p-4">
              <div className="min-h-10 text-font-body">
                {comment.comment}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2" onClick={() => handleClickAvatar(comment?.user?.id)} role="button">
                  <Avatar src={comment?.user?.profileImage || comment?.user?.googleImage} />
                  <div className="text-blue">{comment?.user?.username}</div>
                </div>
                <div className="text-font-title-card text-blue">{comment?.rate}</div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
