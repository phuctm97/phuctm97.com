import { Processor, Settings } from "unified";

/**
 * A fake unified compiler that outputs nothing, is useful to run only parse and transform.
 */
export default function fakeCompiler<P = Settings>(this: Processor<P>) {
  this.Compiler = () => "";
}
