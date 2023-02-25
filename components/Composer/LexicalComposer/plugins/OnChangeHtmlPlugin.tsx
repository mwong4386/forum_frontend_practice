import { $generateHtmlFromNodes } from "@lexical/html";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, LexicalEditor } from "lexical";

interface props {
  onChange?: (editorContent: string) => void;
}
const OnChangeHtmlPlugin = ({ onChange }: props) => {
  if (!onChange) return null;
  return (
    <OnChangePlugin
      onChange={(editorState: EditorState, editor: LexicalEditor) =>
        editorState.read(() => {
          onChange($generateHtmlFromNodes(editor, null));
        })
      }
    />
  );
};

export default OnChangeHtmlPlugin;
