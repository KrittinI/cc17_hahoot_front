import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SplitScreen from "../layouts/SplitScreen";
import useQuestion from "../hooks/useQuestion";
import AllQuizzesLeft from "../features/questions/components/AllQuizzesLeft";
import { useEffect } from "react";
import questionApi from "../api/question";
import useAuth from "../hooks/useAuth";

export default function AllQuizPage() {
  const [title, setTitle] = useState("All Quiz");
  const [seeAll, setSeeAll] = useState(true);
  const [search, setSearch] = useState("");
  const [topicId, setTopicId] = useState(null);
  const [question, setQuestion] = useState([]);
  const { authUser } = useAuth();
  const { getQuestionByTopicId, setShowQuestion } = useQuestion();

  useEffect(() => {
    const fetchData = async () => {
      const res = await questionApi.getAllQuestion();
      setQuestion(res.data.questions);
    };
    fetchData();
  }, [authUser]);

  useEffect(() => {
    const isSeeAll = async () => {
      if (seeAll) {
        if (search) {
          setShowQuestion(question?.filter((el) => el.question.toLowerCase().includes(search)));
        } else {
          setShowQuestion(question);
        }
      } else {
        const quizTopic = (await getQuestionByTopicId(topicId)).data.questions;
        if (search) {
          setShowQuestion(quizTopic?.filter((el) => el.question.toLowerCase().includes(search)));
        } else {
          setShowQuestion(quizTopic);
        }
      }
    };
    isSeeAll();
  }, [seeAll, topicId, search, question]);

  return (
    <div className="w-[68%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={70}>
        <AllQuizzesLeft title={title} />
        <SearchBar
          buttonText={`Create New Question`}
          setSeeAll={setSeeAll}
          setSearch={setSearch}
          topicId={topicId}
          setTopicId={setTopicId}
          setTitle={setTitle}
          create={`/questions/create-question`}
        />
      </SplitScreen>
    </div>
  );
}
