import { Processor, Settings } from "unified";

/**
 * A fake unified compiler/stringifier that outputs nothing, is useful to run only parse and transform.
 */
export default function compileNothing<P = Settings>(this: Processor<P>) {
  this.Compiler = () => "";
}
