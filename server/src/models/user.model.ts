import mongoose, { Model } from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export interface UserInterface {
	_id?: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	active: boolean;
	correctPassword: () => boolean;
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

userSchema.methods.correctPassword = async function (
	candidatePassword: string,
	userPassword: string
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

export const User: Model<any> = mongoose.model('User', userSchema);
