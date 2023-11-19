import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://scraper-backend-yg6r.onrender.com"
    : "https://scraper-backend-yg6r.onrender.com";

export const socket = io(URL);
