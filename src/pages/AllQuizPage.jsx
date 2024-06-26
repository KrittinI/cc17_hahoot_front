import SearchBar from "../components/SearchBar";
import SplitScreen from "../layouts/SplitScreen";

export default function AllQuizPage() {
    return (
        <div className="w-[80%] mx-auto">
            <SplitScreen sizeRatio={70}>
                <div>Left</div>
                <SearchBar buttonText={`Create NewQuestion`} />
            </SplitScreen>
        </div>
    )
}
