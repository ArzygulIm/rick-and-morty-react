import axios from 'axios';

const API = 'https://rickandmortyapi.com/api';

export const getAllCharacters = (page: number = 1) =>
  axios.get(`${API}/character?page=${page}`);

export const getCharacterById = (id: number) =>
  axios.get(`${API}/character/${id}`);

export const getCharacterByUrl = (url: string) =>
  axios.get(url);

export const getAllLocations = (page: number = 1) =>
  axios.get(`${API}/location?page=${page}`);

export const getLocationById = (id: number) =>
  axios.get(`${API}/location/${id}`);

export const getLocationByUrl = (url: string) =>
  axios.get(url);

export const getEpisodeByUrl = (url: string) =>
  axios.get(url);

export const getAllEpisodes = (page: number = 1) =>
  axios.get(`${API}/episode?page=${page}`);

export const getEpisodeById = (id: number) =>
  axios.get(`${API}/episode/${id}`);