export interface Content {
  title: string;
  description: string;
  url: string;
  path: string;
  folder: string;
  slug: string;
}

export interface BlogPost extends Content {
  publishedDate: Date;
  tags: string[];
}
