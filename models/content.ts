import { Record } from "~/utils/lang/obj";

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

export type BlogPost = Content<{
  date: string;
  tags: string[];
  cover: {
    url: string;
    width?: number;
    height?: number;
  };
}>;
