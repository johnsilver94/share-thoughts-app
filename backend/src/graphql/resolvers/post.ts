import { Post } from "../../models/Post";

const postResolver = {
	Query: {
		sayHi: () => "Hello World!",
		async getPosts() {
			try {
				const posts = await Post.find();
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

export { postResolver };
