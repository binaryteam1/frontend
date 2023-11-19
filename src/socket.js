import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "http://13.234.215.187:5000"
    : "http://13.234.215.187:5000";

export const socket = io(URL);
