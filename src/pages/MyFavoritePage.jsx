import { useState } from "react";
import SplitScreen from "../layouts/SplitScreen";
import SearchFavorite from "../features/myQuiz-Event/components/SearchFavorite";
import { useEffect } from "react";
import eventApi from "../api/event";
import questionApi from "../api/question";
import MyFavoriteQuizEvent from "../features/myQuiz-Event/components/MyFavoriteQuizEvent";
import UserContextProvider from "../contexts/UserContext";

export default function MyFavoritePage() {
  const [title, setTitle] = useState("Favorites");
  const [seeAll, setSeeAll] = useState(true);
  const [search, setSearch] = useState("");
  const [topicId, setTopicId] = useState(null);
  const [eventFav, setEventFav] = useState([]);
  const [quizFav, setquizFav] = useState([]);
  const [showCard, setShowCard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const event = await eventApi.getFavEvent();
      setEventFav(event?.data.events);

      const quiz = await questionApi.getFavQuestion();
      setquizFav(quiz?.data.questions);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (seeAll) {
      if (search) {
        const searhEvent = eventFav?.filter((el) =>
          el.eventName.toLowerCase().includes(search)
        );
        const searchQuiz = quizFav?.filter((el) =>
          el.question.toLowerCase().includes(search)
        );
        setShowCard([...searhEvent, ...searchQuiz]);
      } else {
        setShowCard([...eventFav, ...quizFav]);
      }
    } else {
      const eventTopic = eventFav?.filter((el) => el.topic.id === topicId);
      const quizTopic = quizFav?.filter((el) => el.topic.id === topicId);
      if (search) {
        const searhEvent = eventTopic?.filter((el) =>
          el.eventName.toLowerCase().includes(search)
        );
        const searchQuiz = quizTopic?.filter((el) =>
          el.question.toLowerCase().includes(search)
        );
        setShowCard([...searhEvent, ...searchQuiz]);
      } else {
        setShowCard([...eventTopic, ...quizTopic]);
      }
    }
  }, [quizFav, eventFav, search, seeAll, topicId]);

  return (
    <div>
      <div className="w-[66%] mx-auto h-[auto]">
        <UserContextProvider>
          <SplitScreen sizeRatio={70}>
            <MyFavoriteQuizEvent
              title={title}
              showCard={showCard}
              topicId={topicId}
            />
            <SearchFavorite
              setSeeAll={setSeeAll}
              setSearch={setSearch}
              setTopicId={setTopicId}
              setTitle={setTitle}
            />
          </SplitScreen>
        </UserContextProvider>
      </div>
    </div>
  );
}
