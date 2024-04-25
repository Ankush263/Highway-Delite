import mongoose, { Model } from 'mongoose';
import validator from 'validator';

export interface UserInterface {
	_id?: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	active: boolean;
}

const userSchema = new mongoose.Schema<UserInterface>(
	{
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: [true, 'User must have an email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'please provide a valid email'],
		},
		password: {
			type: String,
			required: [true, 'please provide a password'],
		},
		active: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export const User: Model<any> = mongoose.model('User', userSchema);
