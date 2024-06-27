import SearchBar from "../components/SearchBar";
import EventForm from "../features/visitor/EventForm";
import SplitScreen from "../layouts/SplitScreen";

export default function AllEventPage() {
    return (
        <div className="w-[68%] mx-auto h-[auto]">
        <SplitScreen sizeRatio={70}>
          <EventForm />
          <SearchBar buttonText={`Create New Question`} />
        </SplitScreen>
      </div>
    )
}
