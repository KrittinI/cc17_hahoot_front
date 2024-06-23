// import { Button } from "../components/Button";

const heroCard = [
  {
    heroTitle: "We are  Hahoot !",
    heroDescription:
      " The walnut wood card tray is precision milled to perfectly fit a stack of Focus cards. The powder coated steel divider separates active cards from new ones, or can be used to archive important task lists.",
    heroImage: "src/assets/hh-hero.png",
  },
];

export default function HeroContianer() {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      {/* **************************** left container ************************* */}
      <div className="bg-white p-10 h-full rounded-lg">
        {heroCard.map((heroCard) => (
          <>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {heroCard.heroTitle}
            </h2>
            <p className="mt-4 text-gray-500">{heroCard.heroDescription}</p>
          </>
        ))}
        {/* button see all */}
        {/* <div className="flex w-full items-center justify-start rounded-md border border-transparent py-3 text-base font-medium">
          <Button bg="black" width="60" mt="4">
            See All
          </Button>
        </div> */}
       
      </div>
      {/* **************************** left container ************************* */}

      {/* **************************** right container ************************* */}
      <div className="bg-white p-10 h-full rounded-lg">
        {heroCard.map((heroCard) => (
          <>
            <img
              src={heroCard.heroImage}
              alt="hero-image"
              className="h-[240px] w-[800px]"
            />
          </>
        ))}
      </div>
      {/* **************************** right container ************************* */}
    </div>
  );
}
