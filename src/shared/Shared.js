import { server } from "../configs/configs";

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

export const postDataToAPI = async (endpoint, formData) => {
  try {
    const response = await fetch(server + endpoint, {
      method: "POST",
      // Remove Content-Type header for formData
      body: formData,
    });

    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Response...", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle error or throw it to be caught by the caller
    throw error;
  }
};
