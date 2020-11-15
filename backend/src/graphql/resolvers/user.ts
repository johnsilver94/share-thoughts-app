import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";
import {
	validateRegisterInput,
	validateLoginInput,
} from "../../util/validators";
import { IUser, User } from "../../models/User";

const SECRET_KEY = process.env.SECRET_KEY || "";

function generateToken(user: IUser) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		SECRET_KEY,
		{ expiresIn: "1h" }
	);
}

const userResolver = {
	Mutation: {
		async login(
			_: any,
			{ loginInput: { username, password } }: any,
			context: any,
			info: any
		) {
			const { errors, valid } = validateLoginInput({ username, password });
			const user = await User.findOne({ username });

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			if (!user) {
				errors.general = "User not found";
				throw new UserInputError("User not found", { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = "Wrong credentials";
				throw new UserInputError("Wrong credentials", { errors });
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user._id,
				token,
			};
		},
		async register(
			_: any,
			{ registerInput: { username, email, password, confirmPassword } }: any,
			context: any,
			info: any
		) {
			const { valid, errors } = validateRegisterInput({
				username,
				email,
				password,
				confirmPassword,
			});
			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await User.findOne({ username });
			if (user) {
				throw new UserInputError("Username is taken", {
					errors: {
						username: "This username is taken",
					},
				});
			}

			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString(),
			});

			const res = await newUser.save();

			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
	},
};

export { userResolver };
