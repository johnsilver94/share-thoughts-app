import { model, Schema, Document } from "mongoose";

interface IPost extends Document {
	body: String;
	username: String;
	createdAt: String;
	comments: [body: String, username: String, createdAt: String];
	likes: [username: String, createdAt: String];
	user: Schema.Types.ObjectId;
}

const postSchema: Schema<IPost> = new Schema({
	body: String,
	username: String,
	createdAt: String,
	comments: [
		{
			body: String,
			username: String,
			createdAt: String,
		},
	],
	likes: [
		{
			username: String,
			createdAt: String,
		},
	],
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
});

const Post = model<IPost>("Post", postSchema);

//Midlewares
postSchema.pre<IPost>("save", function () {
	console.log(this.body);
});

postSchema.pre<IPost>("findOne", function () {
	console.log(this.body);
});

export { Post, IPost };
