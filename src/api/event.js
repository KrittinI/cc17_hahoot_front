import axios from "../config/axios";
const authEvent = {};

authEvent.create = async (body) => axios.post("/events", body);
authEvent.edit = async (id, body) => axios.patch(`/events/${id}`, body);
authEvent.delete = async (id) => axios.delete(`/events/${id}`);

authEvent.getAllEvent = async () => axios.get("/events");
authEvent.getEventByUserId = async (id) => axios.get(`/events/users/${id}`);
authEvent.getEventByTopic = async (topicId) =>
  axios.get(`/events/topic/${topicId}`);
authEvent.getFavEvent = async () => axios.get("/events/favorite");
authEvent.getEventByEventId = async (id) => axios.get(`/events/${id}`);

export default authEvent;
