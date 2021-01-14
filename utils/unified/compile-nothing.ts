import { Processor, Settings } from "unified";

export default function compileNothing<P = Settings>(this: Processor<P>) {
  this.Compiler = () => "";
}
