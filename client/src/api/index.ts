import axios from 'axios';

const URL = `http://localhost:8000`;

const USER_URL = `${URL}/api/v1/user`;

const USER_API = axios.create({ baseURL: USER_URL });

export const signup = (_details: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}) => USER_API.post('/signup', _details);

export const login = (_details: { email: string; password: string }) =>
	USER_API.post('/login', _details);

export const getUser = (_token: string | null) =>
	USER_API.get('/', { headers: { Authorization: `Bearer ${_token}` } });
