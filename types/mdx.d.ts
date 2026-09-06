import type { ComponentType } from "react";

declare module "*.mdx" {
  export const meta: Record<string, unknown>;
  const MDXContent: ComponentType<Record<string, unknown>>;
  export default MDXContent;
}
