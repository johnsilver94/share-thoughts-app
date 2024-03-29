import React, { useContext } from "react";
import { Card, Image, Button, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { AuthContext } from "../util/auth";

function PostCard({
	post: {
		body,
		createdAt,
		id,
		username,
		comments,
		likes,
		likeCount,
		commentCount,
	},
}) {
	const { user } = useContext(AuthContext);

	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="https://react.semantic-ui.com/images/avatar/large/molly.png"
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment(createdAt).fromNow()}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton user={user} post={{ id, likes, likeCount }} />
				<Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
					<Button color="blue" basic>
						<Icon name="comments" />
					</Button>
					<Label as="a" basic color="blue" pointing="left">
						{commentCount}
					</Label>
				</Button>
				{user && user.username === username && <DeleteButton postId={id} />}
			</Card.Content>
		</Card>
	);
}

export default PostCard;
