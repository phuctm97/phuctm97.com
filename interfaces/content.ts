export interface Content {
  title: string;
  description: string;
  url: string;
  path: string;
  folder: string;
  slug: string;
}

export interface BlogPost extends Content {
  date: string;
  tags?: string[];
  cover: {
    url: string;
    width?: number;
    height?: number;
  };
}

export interface Cheatsheet extends Content {
  icon: {
    title: string;
    hex: string;
    source: string;
    svg: string;
    path: string;
  };
}
