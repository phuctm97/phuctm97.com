// Next.js defaults.
/// <reference types="next" />
/// <reference types="next/types/global" />

// Extra environment variables.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly VERCEL_ENV: "production" | "preview" | "development";
  }
}

// Additional React types.
declare namespace React {
  interface HTMLPropsWithoutChildren<T>
    extends Omit<HTMLProps<T>, "children"> {}
}

// Missing MDX and Unified types.
declare module "to-vfile" {
  import { VFile, VFileContents, VFileOptions } from "vfile";

  interface ToVFile {
    (input?: VFileContents | VFileOptions): VFile;
    readSync(path: string, encoding?: string): VFile;
  }

  const vfile: ToVFile;
  export default vfile;
}
declare module "@mdx-js/react" {
  export const MDXProvider: React.ComponentType<{ components: object }>;
}
declare module "*.mdx" {
  const MDXDocument: React.ComponentType<{ [key: string]: unknown }>;
  export default MDXDocument;
}
