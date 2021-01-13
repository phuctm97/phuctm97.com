/**
 * A blog post's model.
 */
export interface Post {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: {
    url: string;
    width?: number;
    height?: number;
  };
  path: string;
  folder: string;
  slug: string;
}

/**
 * An object that has a `post` attached.
 */
export interface HasPost {
  post: Post;
}
