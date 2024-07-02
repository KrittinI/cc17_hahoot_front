import { createContext } from "react";
import authEvent from "../api/event";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
export const EventContext = createContext();

export default function EventContextProvider({ children }) {
  const [event, setEvent] = useState([]);
  const [eventTopic, setEventTopic] = useState([]);
  const [seeAll, setSeeAll] = useState(true);
  const [search, setSearch] = useState("");
  const [showEvent, setShowEvent] = useState([]);
  const { authUser } = useAuth();
  const getAllEvent = async () => {
    const res = await authEvent.getAllEvent();
    setEvent(res.data.events);
  };

  const getEventByUserId = async (id) => await authEvent.getEventByUserId(id);

  const getEventByTopic = async (topicId) => {
    const res = await authEvent.getEventByTopic(topicId);
    setEventTopic(res.data.events);
  };

  const getEvent = async (id) => await authEvent.getEventByEventId(id);

  const getFevEvent = async () => {
    const res = await authEvent.getFevEvent();
    return res.data.events;
  };

  const createEvent = async (body) => {
    await authEvent.create(body);
  };

  const editEvent = async (id, body) => {
    await authEvent.edit(id, body);
  };

  const deleteEvent = async (id) => {
    await authEvent.delete(id);
  };

  const isSeeAll = () => {
    if (seeAll) {
      if (search) {
        setShowEvent(
          event?.filter((el) => el.eventName.toLowerCase().includes(search))
        );
      } else {
        setShowEvent(event);
      }
    } else {
      if (search) {
        setShowEvent(
          eventTopic?.filter((el) =>
            el.eventName.toLowerCase().includes(search)
          )
        );
      } else {
        setShowEvent(eventTopic);
      }
    }
  };

  useEffect(() => {
    getAllEvent();
  }, [authUser]);

  useEffect(() => {
    isSeeAll();
  }, [seeAll, event, eventTopic, search]);

  const value = {
    event,
    eventTopic,
    showEvent,
    setSeeAll,
    setSearch,
    getEventByUserId,
    getEventByTopic,
    getEvent,
    getFevEvent,
    createEvent,
    editEvent,
    deleteEvent,
  };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}
