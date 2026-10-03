import axiosService from "./axiosService";

export const addMoodAPI = async (data) => {
  return await axiosService("POST", "/moods", data);
};

export const getMoodsAPI = async () => {
  return await axiosService("GET", "/moods");
};

export const deleteMoodAPI = async (id) => {
  return await axiosService("DELETE", `/moods/${id}`);
};

export const updateMoodAPI = async (id, data) => {
  return await axiosService("PUT", `/moods/${id}`, data);
};

// Add Download Record
export const addDownloadAPI = async (data) => {
  return await axiosService("POST", "/downloads", data);
};

// Get Download Records
export const getDownloadsAPI = async () => {
  return await axiosService("GET", "/downloads");
};

// Delete Download Record
export const deleteDownloadAPI = async (id) => {
  return await axiosService("DELETE", `/downloads/${id}`);
};