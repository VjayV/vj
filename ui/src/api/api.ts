import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/event`;

const fetchApi = axios.create({ baseURL: API_URL })
fetchApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('TOKEN====', token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log('ERRRR')
    return Promise.reject(error);
  });

export const listEvents = async () => {
  const response = await fetchApi.get(`${API_URL}/list`);
  return response.data.events;
};

export const createEvent = async (name: string, dates: string[]) => {
  const response = await fetchApi.post(API_URL, { name, dates });
  return response.data;
};

export const getEventById = async (id: string) => {
  const response = await fetchApi.get(`${API_URL}/${id}`);
  return response.data;
};

export const addVotes = async (id: string, name: string, votes: string[]) => {
  const response = await fetchApi.post(`${API_URL}/${id}/vote`, { name, votes });
  return response.data;
};

export const getEventResults = async (id: string) => {
  const response = await fetchApi.get(`${API_URL}/${id}/results`);
  return response.data;
};
