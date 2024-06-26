import SearchBar from "../components/SearchBar";
import SplitScreen from "../layouts/SplitScreen";

export default function AllEventPage() {
    return (
        <div className="w-[80%] mx-auto">
            <SplitScreen sizeRatio={70}>
                <div>Left</div>
                <SearchBar buttonText={`Create NewEvent`} />
            </SplitScreen>
        </div>
    )
}
