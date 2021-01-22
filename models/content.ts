import { Record } from "~/utils/lang/obj";

export interface Frontmatter {
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export interface Content<T extends object = Record> {
  metadata: {
    title: string;
    description: string;
    url: string;
    path: string;
    folder: string;
    slug: string;
  } & T;
}

export interface Plugin<T extends object = Record> {
  (frontmatter: Frontmatter, content: Content): Content<T>;
}

export type BlogPost = Content<{
  date: string;
  tags: string[];
  cover: {
    url: string;
    width?: number;
    height?: number;
  };
}>;
