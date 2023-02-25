import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalHandle } from "components/Composer";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import { forwardRef, useImperativeHandle } from "react";

interface props {}
const ExposeHandlePlugin = forwardRef<LexicalHandle, props>(({}, ref) => {
  const [editor] = useLexicalComposerContext();

  useImperativeHandle(ref, () => {
    return {
      clearEditor: () =>
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined),
    };
  });
  return null;
});

export default ExposeHandlePlugin;
