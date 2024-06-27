import AddQuestionCard from "../layouts/AddQuestionCard";
import QuestionCard from "../layouts/QuestionCard";

export default function QuestionsPage() {
  const allCreatedQuestion = [
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbosTKI2WfU58KMf8Y0hskeEhEWxBBDYnsjw&s", question: "where is my name" },
  ];
  return (
    <>
      <div className="flex flex-col w-[80%] h-full justify-center items-center gap-3 mt-4 mb-4 mx-auto">
        <div className="bg-white w-44 h-20 flex items-center justify-center text-3xl">
          <h1>New Quiz</h1>
        </div>
        <div className="grid grid-cols-4  gap-4">
          <AddQuestionCard />
          {allCreatedQuestion.map((ques, index) => {
            return <QuestionCard question={ques.question} image={ques.image} key={index} />;
          })}
        </div>
      </div>
    </>
  );
}
