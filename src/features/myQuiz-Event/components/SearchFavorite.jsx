import useTopic from "../../../hooks/useTopic";
import { HeartIconHover } from "../../../icons/heart";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useState } from "react";
import { useEffect } from "react";
import Avatar from "../../../components/Avatar";

export default function SearchFavorite({
  setSeeAll,
  setSearch,
  getTopic,
  setTitle,
}) {
  const { topic } = useTopic();
  const [input, setInput] = useState("");

  const handleClickTopic = (id, name) => {
    getTopic(id);
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
    <>
      <div className="flex flex-col h-[auto] gap-8 bg-white p-8 rounded-lg mb-6 ">
        <div className="flex flex-col justify-center items-center w-full gap-y-4">
          <div className="text-font-title">Username</div>
            <Avatar size={"100"} />
        </div>
        <div className="flex flex-col gap-4 border-b border-gray-300 pb-4">
          <Input
            placeholder={"Search"}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />

          <Button bg={`red`} width={`full`}>
            <div className="flex justify-center gap-2">
              <HeartIconHover />
              <h1>My Favorite</h1>
            </div>
          </Button>
        </div>
        <div className="flex flex-col gap-2 max-h-[80vh] overflow-auto">
          <h1 className="sticky top-0 w-full text-font-title bg-white">
            Topics
          </h1>
          <Button onClick={() => (setSeeAll(true), setTitle("All Topic"))}>
            <div className="flex ">
              <img
                src="../../src/assets/icon-hh.png"
                alt="logo"
                className="w-8 mr-6"
              />
              All Topic
            </div>
          </Button>
          {topic?.map((el) => (
            <Button
              key={el?.id}
              bg={`gray`}
              onClick={() => handleClickTopic(el?.id, el?.topicName)}
            >
              <div className="flex ">
                <img
                  src="../../src/assets/icon-hh.png"
                  alt="logo"
                  className="w-8 mr-6"
                />
                {el?.topicName}
              </div>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
