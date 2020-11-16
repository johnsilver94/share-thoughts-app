import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../util/graphql";

function PostForm() {
	const { values, onChange, onSubmit } = useForm(createPost, { body: "" });

	const [addPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY,
			});
			data.getPosts = [result.data.createPost, ...data.getPosts];
			proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
			values.body = "";
		},
	});

	function createPost() {
		addPost();
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				<h2>Create a post:</h2>
				<Form.Field>
					<Form.Input
						placeholder="Hi World!"
						name="body"
						onChange={onChange}
						value={values.body}
					/>
					<Button type="submit" color="teal">
						Submit
					</Button>
				</Form.Field>
			</Form>
			{error && (
				<div className="ui error message" style={{ marginBottom: 20 }}>
					<ul className="list">
						<li>{error.graphQLErrors[0].message}</li>
					</ul>
				</div>
			)}
		</>
	);
}

export default PostForm;
