import ContianerCardQuiz from "../layouts/ContainerCardQuiz";
import HeroContianer from "../layouts/Hero";

export default function HomePage() {
  return (
    <>
      <div className="h-[calc(100vh-8rem)]">
        <HeroContianer />
        <ContianerCardQuiz />
      </div>
    </>
  );
}
