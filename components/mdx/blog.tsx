import BlogPostLayout from "~layouts/blog";

const createBlogPost = (props: any): React.FC => ({ children }) => (
  <BlogPostLayout {...props}>{children}</BlogPostLayout>
);

export default createBlogPost;
