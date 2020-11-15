import { User, IUser } from "../../models/User";
import { Post } from "../../models/Post";
import { checkAuth } from "../../util/check-auth";
import { AuthenticationError, UserInputError } from "apollo-server";

const postsResolver = {
	Query: {
		sayHi: () => "Hello World!",
		async getPosts() {
			try {
				const posts = await Post.find().sort({ createdAt: -1 });
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getPost(_: any, { postId }: any) {
			try {
				const post = await Post.findById(postId);
				if (post) {
					return post;
				} else {
					throw new Error("Post not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createPost(_: any, { body }: any, context: any) {
			const user: IUser = new User(checkAuth(context));

			if (body.trim() === "") {
				throw new Error("Post body must not be empty");
			}
			const newPost = new Post({
				body,
				user: user.ids,
				username: user.username,
				createdAt: new Date().toISOString(),
			});

			const post = await newPost.save();

			context.pubSub.publish("NEW_POST", { newPost: post });

			return post;
		},
		async deletePost(_: any, { postId }: any, context: any) {
			const user: IUser = new User(checkAuth(context));

			try {
				const post = await Post.findById(postId);
				if (user.username === post?.username) {
					await post.deleteOne();
					return "post deleted succesfully";
				} else {
					throw new AuthenticationError("Action not allowed");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async likePost(_: any, { postId }: any, context: any) {
			const { username } = new User(checkAuth(context));

			const post = await Post.findById(postId);

			if (post) {
				if (post.likes.find((like) => like.username === username)) {
					post.likes = post.likes.filter((like) => like.username !== username);
				} else {
					post.likes.push({ username, createdAt: new Date().toISOString() });
				}
				await post.save();
				return post;
			} else throw new UserInputError("Post not found");
		},
	},
	Subscription: {
		newPost: {
			subscribe: (_: any, __: any, { pubSub }: any) =>
				pubSub.asyncIterator("NEW_POST"),
		},
	},
};

export { postsResolver };
