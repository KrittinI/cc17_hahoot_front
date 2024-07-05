import hhHero from "../assets/hh-hero.png"

export default function HeroContianer({ hero }) {
  return (
    <div className="mt-20 mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-10 px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2">
      {/* **************************** left container ************************* */}
      <div className="bg-white p-10 h-full rounded-lg">
        <div >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {hero?.title}
          </h2>
          <p className="mt-4 text-gray-500">{hero?.detail}</p>
        </div>
        {/* button see all */}
        {/* <div className="flex w-full items-center justify-start rounded-md border border-transparent py-3 text-base font-medium">
          <Button bg="black" width="60" mt="4">
            See All
          </Button>
        </div> */}
      </div>
      {/* **************************** left container ************************* */}

      {/* **************************** right container ************************* */}
      <div className="bg-white p-4 h-full rounded-lg">
        <div>
          <img
            src={hero?.eventPicture || hhHero}
            alt="hero-image"
            className="h-[240px] w-[800px]"
          />
        </div>
      </div>
      {/* **************************** right container ************************* */}
    </div>
  );
}
