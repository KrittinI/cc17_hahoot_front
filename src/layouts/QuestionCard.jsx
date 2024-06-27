export default function QuestionCard({ question, image }) {
  return (
    <>
      <div className="bg-white h-80 w-72 overflow-hidden">
        <div className="w-full h-64">
          <img className="object-cover w-full h-full" src={image} alt="รูป" />
        </div>
        <div>
          <p>{question}</p>
        </div>
      </div>
    </>
  );
}
