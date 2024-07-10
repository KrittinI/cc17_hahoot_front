import useTopic from "../../../hooks/useTopic";
import { HeartIconHover } from "../../../icons/heart";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useState } from "react";
import { useEffect } from "react";
import Avatar from "../../../components/Avatar";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import hhIcon from "../../../assets/icon-hh.png"


export default function SearchFavorite({
  setSeeAll,
  setSearch,
  topicId,
  setTopicId,
  setTitle,
}) {
  const { topic } = useTopic();
  const [input, setInput] = useState("");
  const { authUser } = useAuth();
  const { profile, setProfile } = useUser();

  const handleClickTopic = (id, name) => {
    setTopicId(id);
    setTitle(name);
    setSeeAll(false);
    setSearch("");
  };

  useEffect(() => {
    if (authUser?.id === profile?.id) {
      setProfile(authUser);
    }
  }, [authUser, profile]);

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
          <div className="text-font-title">{profile?.username}</div>
          <Avatar size={"100"} src={profile?.profileImage} />
        </div>
        <div className="flex flex-col gap-4 border-b border-gray-300 pb-4">
          <Input
            placeholder={"Search"}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />

          <Button
            bg={`red`}
            width={`full`}
            onClick={() => window.location.reload()}
          >
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
          <Button bg={topicId !== 0 ? 'white' : 'lgreen'} onClick={() => (setSeeAll(true), setTitle("All Topic"), setTopicId(0))}>
            <div className="flex ">
              <img
                src={hhIcon}
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
                  src={hhIcon}
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
