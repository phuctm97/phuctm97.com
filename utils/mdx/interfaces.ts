export interface Metadata {
  title: string;
  description: string;
  url: string;
  path: string;
  folder: string;
  slug: string;
}

export interface Frontmatter {
  title?: string;
  description?: string;
}

export interface Data {
  frontmatter?: unknown;
  metadata?: Metadata;
}
