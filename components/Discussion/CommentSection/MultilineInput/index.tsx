import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useForm } from "react-hook-form";

interface formModel {
  message: string;
}
interface props {
  onSubmit?: (value: string) => void;
  disabled?: boolean;
}
const MultilineInput = ({ onSubmit, disabled }: props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<formModel>({
    defaultValues: {
      message: "",
    },
  });

  return (
    <>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
        onSubmit={handleSubmit((data: formModel) => {
          onSubmit && onSubmit(data.message);
          reset({ message: "" });
        })}
      >
        <InputBase
          sx={{ flex: 1 }}
          placeholder="write your comment here"
          inputProps={{ "aria-label": "Input your comment here" }}
          multiline
          maxRows={4}
          {...register("message")}
          disabled={disabled}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="send"
          disabled={isSubmitting || !isDirty || disabled}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default MultilineInput;
