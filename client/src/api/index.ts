import axios from 'axios';

// const URL = `http://localhost:8000`;
const URL = `https://highway-delite-pdfa.onrender.com`;

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

export const generateOTP = (token: string) =>
	USER_API.post(
		'/getOTP',
		{},
		{ headers: { Authorization: `Bearer ${token}` } }
	);

export const matchOTP = (token: string, otp: string) =>
	USER_API.post(
		'/matchOTP',
		{ otp },
		{ headers: { Authorization: `Bearer ${token}` } }
	);

export const getUser = (_token: string | null) =>
	USER_API.get('/', { headers: { Authorization: `Bearer ${_token}` } });

export const resetPassword = (
	_token: string,
	details: { currentPassword: string; password: string }
) =>
	USER_API.patch('/resetPassword', details, {
		headers: { Authorization: `Bearer ${_token}` },
	});
