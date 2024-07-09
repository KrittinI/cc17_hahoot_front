import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTopic from "../hooks/useTopic";
import { HeartIconHover } from "../icons/heart";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";
import { useEffect } from "react";

export default function SearchBar({
  buttonText,
  setSeeAll,
  setSearch,
  topicId,
  setTopicId,
  setTitle,
  create,
}) {
  const { authUser } = useAuth();
  const { topic } = useTopic();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleClickTopic = (id, name) => {
    setTopicId(id);
    setTitle(name);
    setSeeAll(false);
    setSearch("");
  };

  useEffect(() => {
    const resultSearch = setTimeout(() => {
      setSearch(input);
    }, 1000);
    return () => {
      clearTimeout(resultSearch);
    };
  }, [input]);

  return (
    <div className="flex flex-col max-h-[80vh] gap-8 bg-white p-8 rounded-lg shadow-xl">
      <div className="flex flex-col gap-4 border-b border-gray-300 pb-4">
        {authUser && (
          <Button
            bg={`black`}
            width={`full`}
            onClick={() => {
              navigate(create);
            }}
          >
            {buttonText}
          </Button>
        )}
        <Input
          placeholder={"Search"}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />

        {authUser && (
          <Button
            bg={`red`}
            width={`full`}
            onClick={() => {
              navigate(`/myfavorite/users/${authUser?.id}`);
            }}
          >
            <div className="flex justify-center gap-2">
              <HeartIconHover />
              <h1>My Favorite</h1>
            </div>
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 max-h-[80vh] overflow-auto">
        <h1 className="sticky top-0 w-full text-font-title bg-white z-30">Topics</h1>
        <Button onClick={() => (setSeeAll(true), setTitle("All Topic"), setTopicId(0))} bg={topicId ? 'white' : 'lgreen'}>
          <div className="flex ">
            <img
              src="../src/assets/icon-hh.png"
              alt="logo"
              className="w-8 mr-6"
            />
            All Topic
          </div>
        </Button>
        {topic?.map((el) => (
          <Button
            key={el?.id}
            bg={el?.id !== topicId ? 'white' : 'lgreen'}
            onClick={() => handleClickTopic(el?.id, el?.topicName)}
          >
            <div className="flex ">
              <img
                src="../src/assets/icon-hh.png"
                alt="logo"
                className="w-8 mr-6"
              />
              {el?.topicName}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
