module.exports = {
	env: {
		es2020: true,
		node: true,
	},
	extends: ["eslint:recommended", "prettier"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 11,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint"],
	rules: {
		semi: ["warn", "always"],
		quotes: ["warn", "double"],
		"no-unused-vars": [
			"off",
			{
				vars: "local",
				args: "after-used",
				ignoreRestSiblings: false,
				caughtErrors: "none",
			},
		],
	},
};
