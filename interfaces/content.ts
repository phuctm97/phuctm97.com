export interface Content {
  frontmatter: {
    title?: string;
    description?: string;
  };
  metadata: {
    title: string;
    description: string;
    url: string;
    path: string;
    folder: string;
    slug: string;
  };
}
