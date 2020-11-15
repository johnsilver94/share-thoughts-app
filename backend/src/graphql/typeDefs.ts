import { gql } from "apollo-server";

const typeDefs = gql`
	type Post {
		id: ID!
		body: String!
		username: String!
		createdAt: String!
	}
	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	input LoginInput {
		username: String!
		password: String!
	}

	type Query {
		sayHi: String!
		getPosts: [Post]
		getPost(postId:ID!)
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(loginInput: LoginInput): User!
	}
`;

export { typeDefs };
