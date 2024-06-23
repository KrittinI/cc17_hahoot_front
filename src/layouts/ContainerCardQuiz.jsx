import { CardQuiz } from "../components/CardBox";
export default function ContainerCardQuiz() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <CardQuiz
            imageSrc="src/assets/hh-hero.png"
            title="Which number is an example of a square number?"
            bg="red"
          />
          <CardQuiz
            imageSrc="src/assets/hh-hero.png"
            title="Which number is an example of a square number?"
            bg="blue"
          />
          <CardQuiz
            imageSrc="src/assets/hh-hero.png"
            title="Which number is an example of a square number?"
            bg="yellow"
          />
          <CardQuiz
            imageSrc="src/assets/hh-hero.png"
            title="Which number is an example of a square number?"
            bg="green"
          />
        </div>
      </div>
    </div>
  );
}
