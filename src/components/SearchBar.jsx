import Button from "./Button";
import Input from "./Input";

const topicMenu = [
    { id: 0, topicName: "All Topic" },
    { id: 1, topicName: "Mathematis" },
    { id: 2, topicName: "Coding" },
    { id: 3, topicName: "English" },
    { id: 4, topicName: "Sports" },
    { id: 5, topicName: "Science" },
    { id: 6, topicName: "Manga" },
    { id: 7, topicName: "Movie" },
    { id: 8, topicName: "Geography" },
    { id: 9, topicName: "Music" },
    { id: 10, topicName: "Common" }
]

export default function SearchBar({ buttonText }) {
    return (
        <div className="flex flex-col min-h-[calc(100vh-64px)] gap-8 bg-white p-8 rounded-lg mb-6 ">
            <div className="flex flex-col gap-4 border-b border-gray-300 pb-4">
                <Button bg={`black`} width={`full`}>{buttonText}</Button>
                <Input placeholder={`Search`} />
                <Button bg={`gray`} width={`full`}>My Favorite</Button>
            </div>
            <div className="flex flex-col gap-2 max-h-[80vh] overflow-auto">
                <h1 className="sticky top-0 w-full bg-blue">Topic</h1>
                {topicMenu.map(topic =>
                    <Button key={topic.id} bg={`gray`}>
                        {topic?.topicName}
                    </Button>
                )}
                {topicMenu.map(topic =>
                    <Button key={topic.id} bg={`gray`}>
                        {topic?.topicName}
                    </Button>
                )}
            </div>
        </div>
    )
}
