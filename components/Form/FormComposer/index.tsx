import Composer, { LexicalHandle } from "components/Composer";
import { forwardRef } from "react";
import { Control, Controller } from "react-hook-form";

interface props {
  name: string;
  control?: Control<any> | undefined;
  maxHeight?: string;
}
const FormComposer = forwardRef<LexicalHandle, props>(
  ({ name, control, maxHeight }: props, ref) => {
    return (
      <>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <Composer
              ref={ref}
              onChange={(content: string) => {
                onChange(content);
              }}
              maxHeight={maxHeight}
            />
          )}
        />
      </>
    );
  }
);

export default FormComposer;
