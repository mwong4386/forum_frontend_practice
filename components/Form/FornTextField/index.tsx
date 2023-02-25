import { TextField as MuiTextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface props {
  name: string;
  control?: Control<any> | undefined;
  label: string;
}
export const FormTextField = ({ name, control, label }: props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <MuiTextField onChange={onChange} value={value} label={label} />
      )}
    />
  );
};
