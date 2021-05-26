import { io } from 'socket.io-client';
import { API } from '../utilities/KEYS';
export const socket = io(API, {
  transports: ['websocket'],
  withCredentials: true,
});
