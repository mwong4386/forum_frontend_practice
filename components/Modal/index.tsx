import { Modal as MuiModal, Paper } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  width?: string;
}
const Modal = ({ open, setOpen, children, width }: props) => {
  return (
    <MuiModal open={open} onClose={() => setOpen(false)}>
      <Paper sx={{ ...style, width: width ?? style.width }}>{children}</Paper>
    </MuiModal>
  );
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "100%",
  p: 3,
};

export default Modal;
