import axios from 'axios';
import { FETCH_USER } from './types.js'

const fetchUser = () => {
    axios.get("/api/current_user");
};