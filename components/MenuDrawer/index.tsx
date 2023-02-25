import ChatIcon from "@mui/icons-material/Chat";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import useScreenQuery from "hooks/useScreenQuery";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import useAuth from "../../hooks/useAuthContext";
import AccountListItemButton from "./AccountListItemButton";
import LoginListItemButton from "./LoginListItemButton";

const drawerWidth = 220;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: `calc(${theme.spacing(7)} + 1px)`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerContentWrapper = ({
  isLogin,
  user,
  signIn,
  signOut,
  open,
}: {
  isLogin: boolean;
  user: any;
  signIn: () => void;
  signOut: () => void;
  open: boolean;
}) => {
  const router = useRouter();
  return (
    <List>
      <ListItem key={"board"} disablePadding sx={{ display: "block" }}>
        {isLogin ? (
          <AccountListItemButton open={open} user={user} signOut={signOut} />
        ) : (
          <LoginListItemButton open={open} signIn={signIn} />
        )}
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={() =>
            router.push({
              pathname: `/`,
            })
          }
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText sx={{ opacity: open ? 1 : 0 }}>Board</ListItemText>
        </ListItemButton>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={() =>
            router.push({
              pathname: `/chats`,
            })
          }
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <ChatIcon />
          </ListItemIcon>
          <ListItemText sx={{ opacity: open ? 1 : 0 }}>Chat</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
};

interface props {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}
const CustomDrawer = ({ openMenu: open, setOpenMenu: setOpen }: props) => {
  const { signIn, isLogin, user, signOut } = useAuth();
  const { isSmallScreen } = useScreenQuery();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (isSmallScreen) {
    return (
      <>
        <MuiDrawer open={open} onClose={handleDrawerClose} anchor={"left"}>
          <DrawerContentWrapper
            open={open}
            isLogin={isLogin}
            user={user}
            signIn={signIn}
            signOut={signOut}
          />
        </MuiDrawer>
      </>
    );
  }
  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
    >
      <DrawerContentWrapper
        open={open}
        isLogin={isLogin}
        user={user}
        signIn={signIn}
        signOut={signOut}
      />
    </Drawer>
  );
};

export default CustomDrawer;
