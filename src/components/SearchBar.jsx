
import useAuth from "../hooks/useAuth";
import { HeartIconHover } from "../icons/heart";
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
  { id: 10, topicName: "Common" },
  { id: 11, topicName: "Science" },
  { id: 12, topicName: "Manga" },
  { id: 13, topicName: "Movie" },
  { id: 14, topicName: "Geography" },
  { id: 15, topicName: "Music" },
  { id: 16, topicName: "Common" },
];

export default function SearchBar({ buttonText }) {
  const { authUser } = useAuth()
  return (
    <div className="flex flex-col h-[auto] gap-8 bg-white p-8 rounded-lg mb-6 ">
      <div className="flex flex-col gap-4 border-b border-gray-300 pb-4">
        {authUser &&
          <Button bg={`black`} width={`full`}>
            {buttonText}
          </Button>
        }
        <Input placeholder={"Search"} />

        {authUser &&
          <Button bg={`red`} width={`full`}>
            <div className="flex justify-center gap-2">
              <HeartIconHover />
              <h1>My Favorite</h1>
            </div>
          </Button>
        }
      </div>
      <div className="flex flex-col gap-2 max-h-[80vh] overflow-auto">
        <h1 className="sticky top-0 w-full text-font-title bg-white">Topics</h1>
        {topicMenu.map((topic) => (
          <Button key={topic.id} bg={`gray`}>
            <div className="flex ">
              <img src="../src/assets/icon-hh.png" alt="logo" className="w-8 mr-6" />
              {topic?.topicName}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
