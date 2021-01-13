import { URL } from "url";
import { Post } from "@/next-blog/interfaces";

/**
 * Generates `cover` for a blog post based on its metadata.
 * @param metadata The blog post's metadata, should has `title` and (optional) `cover`
 */
export default function generateCover(metadata: any): Post["cover"] {
  const { cover, title } = metadata;
  if (cover && cover.url) return { url: cover.url };

  const url = new URL(
    encodeURIComponent(`${title}.jpg`),
    "https://img.phuctm97.com/api/v2/"
  );

  const icons: string[] = (cover && cover.icons) || [];
  for (let icon of icons) {
    url.searchParams.append("icons", icon);
  }

  return {
    url: url.toString(),
    width: 1200,
    height: 630,
  };
}
