import axios from 'axios';

const BASE_URL = 'https://opentdb.com';

export default axios.create({ baseURL: BASE_URL });
