import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useHistoryContext } from "hooks/useHistoryContext";
import useScreenQuery from "hooks/useScreenQuery";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import {
  m_DiscussionMessage,
  newDiscussionMessage,
} from "../../../models/m_DiscussionMessage";
import discussionMessageApi from "../../../services/firebase/discussionMessageApi";
import Composer from "../../Composer";
import DiscussionItem from "./DiscussionItem";
interface props {
  id?: string;
  topic?: string;
  commentId?: string;
  todoMessage: m_DiscussionMessage[];
  loading: boolean;
  isLogin: boolean;
  user: any;

  onClick_Comment?: (messageId: string, isSelect: boolean) => void;
  onClick_Like?: (
    messageId: string,
    isLike: boolean | undefined,
    callBack?: () => void
  ) => void;
  onClick_Dislike?: (
    messageId: string,
    isLike: boolean | undefined,
    callBack?: () => void
  ) => void;
  refreshMessage: () => void;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}

const DiscussionSection = ({
  id,
  commentId,
  topic,
  todoMessage,
  loading,
  isLogin,
  user,

  onClick_Comment,
  onClick_Like,
  onClick_Dislike,
  refreshMessage,
  setOpenMenu,
}: props) => {
  const router = useRouter();
  const { back, peek } = useHistoryContext();
  const { isSmallScreen } = useScreenQuery();
  if (id === undefined)
    return <div className="flex flex-col px-2 h-full bg-zinc-800"></div>;
  return (
    <div className=" h-full flex justify-center overflow-hidden">
      <div className="max-w-3xl flex flex-col flex-1 h-full overflow-hidden">
        <div className="flex flex-row pt-2">
          {peek() !== undefined && (
            <IconButton size="small" onClick={back}>
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
          )}
          {isSmallScreen && (
            <IconButton size="small" onClick={() => setOpenMenu(true)}>
              <MenuIcon fontSize="small" />
            </IconButton>
          )}
          <div className="flex-1 text-center font-bold text-l">{topic}</div>
        </div>
        <div className="overflow-y-auto flex-1">
          {loading && <div>Loading...</div>}
          {todoMessage.map((item) => {
            return (
              <DiscussionItem
                key={item.id}
                discussionId={id}
                userId={user?.uid}
                isSelect={commentId === item.id}
                message={item}
                refreshMessage={refreshMessage}
                onClick_Comment={onClick_Comment}
                onClick_Like={onClick_Like}
                onClick_Dislike={onClick_Dislike}
              />
            );
          })}
        </div>
        <div>
          {isLogin && (
            <Composer
              onSubmit={async (text: string) => {
                await discussionMessageApi.create(
                  id,
                  newDiscussionMessage(text, user.uid, user.displayName)
                );
                refreshMessage();
              }}
              maxHeight="50vh"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionSection;
