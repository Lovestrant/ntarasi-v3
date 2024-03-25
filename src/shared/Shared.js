import { server } from "../configs/configs";
import axios from "axios";

export const fetchDataFromAPI = async (endpoint, requestData) => {
  try {
    const response = await fetch(server + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        dataType: "json",
        // Add any additional headers here if required
      },
      body: JSON.stringify(requestData),
    });

    console.log("response.....", response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle error or throw it to be caught by the caller
    throw error;
  }
};

export const postDataToAPI = async (endpoint, formData, retryCount = 3) => {
  try {
    const response = await axios.post(server + endpoint, formData);

    if (response.status === 200) {
      const data = response.data;
      console.log("Response...", data);
      return data;
    } else {
      throw new Error("Network response was not OK");
    }
  } catch (error) {
    if (error.response && error.response.status === 403 && retryCount > 0) {
      console.log("Forbidden error, retrying request...");
      return postDataToAPI(endpoint, formData, retryCount - 1);
    } else {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
};
