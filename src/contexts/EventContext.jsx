import { createContext } from "react";
import authEvent from "../api/event";
export const EventContext = createContext();

export default function EventContextProvider({ children }) {
  const getAllEvent = async () => {
    const res = await authEvent.getAllEvent();
    return res.data;
  };

  const getEventByUserId = async (id) => {
    const res = await authEvent.getEventByUserId(id);
    return res.data;
  };

  const getEventByTopic = async (id) => {
    const res = await authEvent.getEventByTopic(id);
    return res.data;
  };

  const getEvent = async (id) => {
    const res = await authEvent.getEventByEventId(id);
    return res.data;
  };

  const getFevEvent = async () => {
    const res = await authEvent.getFevEvent();
    return res.data;
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

  const value = {
    getAllEvent,
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
