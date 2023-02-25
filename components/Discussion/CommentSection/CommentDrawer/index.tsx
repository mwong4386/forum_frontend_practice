import { Drawer } from "@mui/material";

interface props {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}
const drawerWidth = "300px";
const CommentDrawer = ({ open, onClose, children }: props) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={"right"}
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      {children}
    </Drawer>
  );
};

export default CommentDrawer;
