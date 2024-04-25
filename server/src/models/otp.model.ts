import mongoose, { Model } from 'mongoose';

export interface OTPInterface {
	_id?: string;
	user: Object;
	otp: number;
}

const otpSchema = new mongoose.Schema<OTPInterface>(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		otp: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 20 });

export const Otp: Model<any> = mongoose.model('Otp', otpSchema);
