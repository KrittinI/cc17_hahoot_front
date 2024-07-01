import { createContext } from "react";
import authEvent from "../api/event";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
export const EventContext = createContext();

export default function EventContextProvider({ children }) {
  const [event, setEvent] = useState([]);
  const [eventTopic, setEventTopic] = useState([]);
  const { authUser } = useAuth();
  const getAllEvent = async () => {
    const res = await authEvent.getAllEvent();
    setEvent(res.data.events);
  };

  const getEventByUserId = async (id) => {
    const res = await authEvent.getEventByUserId(id);
    return res.data.events;
  };

  const getEventByTopic = async (topicId) => {
    const res = await authEvent.getEventByTopic(topicId);
    setEventTopic(res.data.events);
  };

  const getEvent = async (id) => {
    const res = await authEvent.getEventByEventId(id);
    return res.data;
  };

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

  useEffect(() => {
    getAllEvent();
  }, [authUser]);

  const value = {
    event,
    eventTopic,
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
