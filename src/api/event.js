import axios from "../config/axios";
const eventApi = {};

eventApi.create = async (body) => axios.post("/events", body);
eventApi.edit = async (id, body) => axios.patch(`/events/${id}`, body);
eventApi.delete = async (id) => axios.delete(`/events/${id}`);

eventApi.getAllEvent = async () => axios.get("/events");
eventApi.getEventByUserId = async (id) => axios.get(`/events/users/${id}`);
eventApi.getEventByTopic = async (topicId) =>
  axios.get(`/events/topic/${topicId}`);
eventApi.getFavEvent = async () => axios.get("/events/favorite");
eventApi.getEventByEventId = async (id) => axios.get(`/events/${id}`);
eventApi.createFev = async (id) => axios.post(`/events/${id}/favorite`);
eventApi.deleteFav = async (id) => axios.delete(`/events/${id}/favorite`);

export default eventApi;
