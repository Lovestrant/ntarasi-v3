// utils/analytics.js
import ReactGA from "react-ga";

let startTime = null;

export const initializeReactGA = () => {
  ReactGA.initialize("G-Y6QWVTQ87M");
  ReactGA.pageview(window.location.pathname);
};

export const startTimer = () => {
  startTime = new Date().getTime();
};

export const trackTimeSpent = () => {
  if (startTime) {
    const currentTime = new Date().getTime();
    const timeSpent = Math.round((currentTime - startTime) / 1000); // Convert to seconds
    ReactGA.event({
      category: "User",
      action: "Time Spent",
      value: timeSpent,
    });
  }
};

export const selectedCategory = (categoryTitle) => {
  if (categoryTitle) {
    ReactGA.event({
      category: "Game Details",
      action: "Game Category Selected",
      value: categoryTitle,
    });
  }
};
