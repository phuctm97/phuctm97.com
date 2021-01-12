import { BLOG_DIR } from "@/next-blog/constants";

/**
 * Checks if a file is a blog post.
 * @param absPath Absolute path to the file
 */
export default function isPost(absPath: string) {
  return absPath.startsWith(BLOG_DIR);
}
