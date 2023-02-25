import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface props {
  signIn: () => void;
  open: boolean;
}
export default function LoginListItemButton({ signIn, open }: props) {
  return (
    <div>
      <ListItemButton
        onClick={signIn}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText sx={{ opacity: open ? 1 : 0 }}>
          Signin with Google
        </ListItemText>
      </ListItemButton>
    </div>
  );
}
