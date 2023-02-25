import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { LexicalHandle } from "components/Composer";
import FormComposer from "components/Form/FormComposer";
import { FormTextField } from "components/Form/FornTextField";
import { User } from "firebase/auth";
import { newNormalDiscussion } from "models/m_Discussion";
import { newDiscussionMessage } from "models/m_DiscussionMessage";
import { Dispatch, SetStateAction, useRef } from "react";
import { useForm } from "react-hook-form";
import discussionApi from "services/firebase/discussionApi";
import CustomDialogTitle from "./CustomDialogTitle";

interface formModel {
  topic: string;
  message: string;
}
interface props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User | null;
}
const CreateDiscussion = ({ open, setOpen, user }: props) => {
  const lexicalRef = useRef<LexicalHandle>(null);
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
    control,
  } = useForm<formModel>({
    defaultValues: {
      topic: "",
      message: "",
    },
  });

  const onSubmit = (data: formModel) => {
    if (user === null) return;
    discussionApi.createWithMessage(
      newNormalDiscussion(data.topic, user.uid, user.displayName),
      newDiscussionMessage(data.message, user.uid, user.displayName)
    );
    reset({ topic: "", message: "" });
    lexicalRef.current && lexicalRef.current.clearEditor();
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth={true}
      maxWidth="md"
    >
      <CustomDialogTitle onClose={() => setOpen(false)}>
        Start new topic
      </CustomDialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-2">
          <FormTextField name={"topic"} control={control} label={"Topic"} />
          <FormComposer
            ref={lexicalRef}
            name={"message"}
            control={control}
            maxHeight="50vh"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="contained" color="success" type="submit">
            Publish
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateDiscussion;
