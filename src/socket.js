import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'scraper-backend-yg6r.onrender.com';

export const socket = io(URL, {transports: ['websocket']});