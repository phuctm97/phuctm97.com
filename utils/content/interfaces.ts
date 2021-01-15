export interface Metadata {
  title: string;
  description: string;
  url: string;
  path: string;
  folder: string;
  slug: string;
}

export interface Content {
  metadata: Metadata;
}
