import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
			id
			body
			createdAt
			username
			comments {
				id
				username
				createdAt
				body
			}
			likes {
				username
			}
			commentCount
			likeCount
		}
	}
`;

export const CREATE_POST_MUTATION = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createdAt
			username
			comments {
				id
				body
				username
				createdAt
			}
			likes {
				id
				username
				createdAt
			}
			commentCount
			likeCount
		}
	}
`;
