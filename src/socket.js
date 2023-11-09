

import { io } from 'socket.io-client';

let URL;

if (process.env.NODE_ENV === 'production') {
  // Use the production URL
  URL = 'http//localhost:5000';
} else {
  // Use the development URL
  URL = 'http//localhost:5000';
}

export const socket = io(URL);
