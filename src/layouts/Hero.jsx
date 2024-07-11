import hhHero from "../assets/homepage.mov";

export default function HeroContainer({ hero }) {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-10 px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2">
      {/* **************************** left container ************************* */}
      <div className="bg-white p-4 h-full rounded-lg flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {hero?.title}
        </h2>
        <p className="px-2 text-gray-500">{hero?.detail}</p>
      </div>
      {/* **************************** left container ************************* */}
      {/* **************************** right container ************************* */}
      <div className="bg-white p-4 h-full rounded-lg">
        <video
          src={hero?.eventPicture || hhHero}
          alt="hero-video"
          className="h-[240px] w-[800px]"
          controls
          autoPlay
          muted
        />
      </div>
      {/* **************************** right container ************************* */}
    </div>
  );
}
