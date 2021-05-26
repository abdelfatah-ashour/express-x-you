import axios from 'axios';
import { API } from '../utilities/KEYS';
export default axios.create({
  baseURL: API,
  withCredentials: true,
});
