import { IUserRegister, IUserLogin } from "../models/User";

function validateRegisterInput(userRegister: IUserRegister) {
	const errors: any = {};
	if (userRegister.username.trim() === "") {
		errors.username = "Username must not be empty";
	}
	if (userRegister.email.trim() === "") {
		errors.email = "Email must not be empty";
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!userRegister.email.match(regEx)) {
			errors.email = "Email must be a valid email address";
		}
	}
	if (userRegister.password === "") {
		errors.password = "Password must not empty";
	} else if (userRegister.password !== userRegister.confirmPassword) {
		errors.confirmPassword = "Passwords must match";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
}

function validateLoginInput(userLogin: IUserLogin) {
	const errors: any = {};

	if (userLogin.username.trim() === "") {
		errors.username = "Username must not be empty";
	}
	if (userLogin.password.trim() === "") {
		errors.password = "Password must not be empty";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
}

export { validateRegisterInput, validateLoginInput };
