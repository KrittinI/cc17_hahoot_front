import CommentCard from "../../components/CommentCard";
import CommentForm from "./CommentForm";

export default function CommentContainer() {
  return (
    <div className=" grid gap-y-4 bg-white p-8 rounded-lg h-[auto] shadow-xl">
      <CommentForm />
      <hr className="shadow-2 w-full text-blue" />
      <CommentCard />
    </div>
  );
}
