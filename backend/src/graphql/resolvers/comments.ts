import { checkAuth } from "../../util/check-auth";
import { User } from "../../models/User";
import { Post } from "../../models/Post";
import { AuthenticationError, UserInputError } from "apollo-server";

const commentsResolver = {
	Mutation: {
		async createComment(
			_: any,
			{ postId, body }: { postId: string; body: string },
			context: any
		) {
			const { username } = new User(checkAuth(context));

			if (body.trim() === "") {
				throw new UserInputError("Empty comment", {
					errors: { body: "Comment body must be not empty" },
				});
			}

			const post = await Post.findById(postId);

			if (post) {
				post.comments.unshift({
					body,
					username,
					createdAt: new Date().toISOString(),
				});

				await post.save();
				return post;
			} else throw new UserInputError("Post not found");
		},
		async deleteComment(
			_: any,
			{ postId, commentId }: { postId: string; commentId: string },
			context: any
		) {
			const { username } = new User(checkAuth(context));

			const post = await Post.findById(postId);

			if (post) {
				const commentIndex = post.comments.findIndex((c) => c.id === commentId);

				if (post.comments[commentIndex].username === username) {
					post.comments.splice(commentIndex, 1);
					await post.save();
					return post;
				} else {
					throw new AuthenticationError("Action not allowed");
				}
			} else {
				throw new UserInputError("Post not ound");
			}
		},
	},
};

export { commentsResolver };
