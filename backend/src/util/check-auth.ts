import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "";

function checkAuth(context: any) {
	const authHeader = context.req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split("Bearer ")[1];
		if (token) {
			try {
				const user = jwt.verify(token, SECRET_KEY);
				return user;
			} catch (error) {
				throw new AuthenticationError("Invalid/Expired token");
			}
		}
		throw new Error("Authentication token must be /Bearer [token]");
	}
	throw new Error("Authorization header must be provided");
}

export { checkAuth };
