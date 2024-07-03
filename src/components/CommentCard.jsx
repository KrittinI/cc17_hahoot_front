import Avatar from "./Avatar";

export default function CommentCard() {
  return (
    <>
      <div className="grid gap-y-4 bg-white shadow-xl p-4">
        <div className="min-h-10 text-font-body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
          veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Adipisci, veniam.
        </div>
        <div className="flex justify-between items-center">
          <div>
            <Avatar />
          </div>
          <div className="text-font-title-card text-blue">Title</div>
        </div>
      </div>

      <div className="grid gap-y-4 bg-white shadow-xl p-4">
        <div className="min-h-10 text-font-body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
          veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Adipisci, veniam.
        </div>
        <div className="flex justify-between items-center">
          <div>
            <Avatar />
          </div>
          <div className="text-font-title-card text-blue">Title</div>
        </div>
      </div>
    </>
  );
}
