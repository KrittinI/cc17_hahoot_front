import { createContext } from "react";
import eventApi from "../api/event";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export const EventContext = createContext();

export default function EventContextProvider({ children }) {
  const { authUser } = useAuth();

  const [event, setEvent] = useState([]);
  const [singleEvent, setSingleEvent] = useState(null);
  const [isCreated, setIsCreated] = useState(null);
  const [eventQuestion, setEventQuestion] = useState([]);
  const [eventTopic, setEventTopic] = useState([]);
  const [seeAll, setSeeAll] = useState(true);
  const [search, setSearch] = useState("");
  const [showEvent, setShowEvent] = useState([]);
  const [open, setOpen] = useState(false);
  const getAllEvent = async () => {
    const res = await eventApi.getAllEvent();
    setEvent(res.data.events);
  };

  const getEventByUserId = async (id) => await eventApi.getEventByUserId(id);

  const getEventByTopic = async (topicId) => await eventApi.getEventByTopic(topicId);

  const getEvent = async (id) => await eventApi.getEventByEventId(id);

  const createEvent = async (body) => {
    return await eventApi.create(body);
  };

  const editEvent = async (id, body) => {
    await eventApi.edit(id, body);
  };

  const deleteEvent = async (id) => {
    await eventApi.delete(id);
  };
  const isSeeAll = () => {
    if (seeAll) {
      if (search) {
        setShowEvent(event?.filter((el) => el.eventName.toLowerCase().includes(search)));
      } else {
        setShowEvent(event);
      }
    } else {
      if (search) {
        setShowEvent(eventTopic?.filter((el) => el.eventName.toLowerCase().includes(search)));
      } else {
        setShowEvent(eventTopic);
      }
    }
  };

  useEffect(() => {
    getAllEvent();
  }, [authUser, isCreated]);

  useEffect(() => {
    isSeeAll();
  }, [seeAll, event, eventTopic, search]);

  const value = {
    event,
    getEventByUserId,
    getEventByTopic,
    getEvent,
    createEvent,
    editEvent,
    deleteEvent,
    open,
    setOpen,
    singleEvent,
    setSingleEvent,
    setEvent,
    eventQuestion,
    setEventQuestion,
    isCreated,
    setIsCreated,
  };
  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}
