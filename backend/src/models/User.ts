import { model, Schema, Document } from "mongoose";
import { nextTick } from "process";

interface IUser extends Document {
	_doc: any;
	username: string;
	password: string;
	email: string;
	createdAt: string;
}

const userSchema: Schema<IUser> = new Schema({
	username: String,
	password: String,
	email: { type: String, unique: true },
	createdAt: String,
});

const User = model<IUser>("User", userSchema);

interface IUserRegister {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface IUserLogin {
	username: string;
	password: string;
}

export { User, IUser, IUserRegister, IUserLogin };
