/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly VERCEL_ENV: "production" | "preview" | "development";
  }
}
declare module "@mdx-js/react" {
  export const MDXProvider: React.ComponentType<{ components: object }>;
}
declare module "*.mdx" {
  const MDXDocument: React.ComponentType<any>;
  export default MDXDocument;
}
