import CardQuizHome from "../components/CardQuizHome";

export default function ContainerCardQuiz({ hero }) {
  const randomNum = Math.floor(Math.random() * 4)
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <CardQuizHome
            data={hero?.question1}
            bg={(1 + randomNum) % 4}
          />
          <CardQuizHome
            data={hero?.question2}
            bg={(2 + randomNum) % 4}
          />
          <CardQuizHome
            data={hero?.question3}
            bg={(3 + randomNum) % 4}
          />
          <CardQuizHome
            data={hero?.question4}
            bg={(4 + randomNum) % 4}
          />
        </div>
      </div>
    </div>
  );
}
