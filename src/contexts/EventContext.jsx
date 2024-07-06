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
  const [open, setOpen] = useState(false);
  const getAllEvent = async () => {
    const res = await eventApi.getAllEvent();
    setEvent(res.data.events);
  };

  const getEventByUserId = async (id) => await eventApi.getEventByUserId(id);

  const getEventByTopic = async (topicId) =>
    await eventApi.getEventByTopic(topicId);

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

  useEffect(() => {
    getAllEvent();
  }, [authUser]);

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
  };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

/*  singleEvent,
    setSingleEvent, 
    #####เพื่อ รับ event ที่พึ่งสร้าง
    
    */
