import hero from "../assets/hh-hero.png"
import CardQuizHome from "../components/CardQuizHome";

const cardQuiz = [
  { title: "1+1=?", imageSrc: hero },
  { title: "ช้างกี่มีปาก", imageSrc: hero },
  { title: "What is the biggest country in the world?", imageSrc: hero },
  { title: "Who is Donald Trump", imageSrc: hero },
]

const colorMap = ["red", "blue", "yellow", "green"]

export default function ContainerCardQuiz() {
  const randomNum = Math.floor(Math.random() * 4)
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {cardQuiz.map((card, index) =>
            <CardQuizHome
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              bg={colorMap[(index + randomNum) % 4]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
