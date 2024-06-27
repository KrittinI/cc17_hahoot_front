import SearchBar from "../components/SearchBar";
import SplitScreen from "../layouts/SplitScreen";
import { useNavigate } from "react-router-dom";

export default function AllQuizPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/quiz-list");
  };
  return (
    <div className="w-[80%] mx-auto">
      <SplitScreen sizeRatio={70}>
        <div>Left</div>
        <SearchBar buttonText={`Create NewQuestion`} onClick={handleClick} />
      </SplitScreen>
    </div>
  );
}
