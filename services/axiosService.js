import axiosInstance from "./axiosInstance";

const axiosService = async (method, url, data = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default axiosService;