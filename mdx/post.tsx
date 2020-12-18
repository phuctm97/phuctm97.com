import Post from "~components/Post";

type Metadata = Omit<React.ComponentProps<typeof Post>, "children">;

const post = (metadata: Metadata): React.FC => ({ children }) => (
  <Post {...metadata}>{children}</Post>
);

export default post;
