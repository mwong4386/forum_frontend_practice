import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";
import useAuth from "hooks/useAuthContext";
import useScreenQuery from "hooks/useScreenQuery";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { m_Discussion } from "../../models/m_Discussion";
import BoardItem from "./BoardItem";
import CreateDiscussion from "./CreateDiscussion";
interface props {
  tag?: string | undefined;
  discussions: m_Discussion[];
  setOpenMenu?: Dispatch<SetStateAction<boolean>>;
}
const Board = ({ tag, discussions, setOpenMenu }: props) => {
  const { isSmallScreen } = useScreenQuery();
  const [openCreateDiscussion, setOpenCreateDiscussion] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const refresh = () => {
    router.replace(router.asPath);
  };
  return (
    <div className=" flex flex-col overflow-hidden h-full">
      <div className="flex items-end">
        {isSmallScreen && setOpenMenu && (
          <IconButton size="small" onClick={() => setOpenMenu(true)}>
            <MenuIcon fontSize="small" />
          </IconButton>
        )}
        <div className="font-bold text-2xl">Glur</div>
        <div className="flex-1 text-center font-bold text-l">{tag}</div>
        <IconButton onClick={refresh}>
          <RefreshIcon />
        </IconButton>
        {!!user && (
          <IconButton onClick={() => setOpenCreateDiscussion(true)}>
            <AddIcon />
          </IconButton>
        )}
      </div>
      <div className="overflow-y-auto py-3">
        <div className="flex flex-col gap-4">
          {discussions.map((item) => (
            <BoardItem key={item.id} data={item}></BoardItem>
          ))}
        </div>
      </div>
      <CreateDiscussion
        open={openCreateDiscussion}
        setOpen={() => setOpenCreateDiscussion(false)}
        user={user}
      />
    </div>
  );
};

export default Board;
