import { postsResolver } from "./posts";
import { usersResolver } from "./users";
import { commentsResolver } from "./comments";

const resolvers = {
	Post: {
		likeCount: (parent: any) => parent.likes.length,
		commentCount: (parent: any) => parent.comments.length,
	},
	Query: {
		...postsResolver.Query,
	},
	Mutation: {
		...usersResolver.Mutation,
		...postsResolver.Mutation,
		...commentsResolver.Mutation,
	},
	Subscription: {
		...postsResolver.Subscription,
	},
};

export { resolvers };
