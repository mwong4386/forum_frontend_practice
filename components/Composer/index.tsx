import { forwardRef } from "react";
import CustomLexicalComposer from "./LexicalComposer";

export type LexicalHandle = {
  clearEditor: () => void;
};

interface props {
  onSubmit?: (text: string) => Promise<void>;
  disabled?: boolean;
  onChange?: (content: string) => void;
  maxHeight?: string;
}
const Composer = forwardRef<LexicalHandle, props>(
  ({ disabled, onSubmit, onChange, maxHeight }: props, ref: any) => {
    return (
      <CustomLexicalComposer
        ref={ref}
        disabled={disabled}
        onSubmit={onSubmit}
        onChange={onChange}
        maxHeight={maxHeight}
      />
    );
  }
);

export default Composer;
