import { VFile } from "vfile";

export const getData = <T = any>(file: VFile) => file.data as T;
