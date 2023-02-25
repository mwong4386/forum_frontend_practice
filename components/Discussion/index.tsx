import CommentSection from "components/Discussion/CommentSection/";
import DiscussionSection from "components/Discussion/DiscussionSection/";
import useAuth from "hooks/useAuthContext";
import { Dispatch, SetStateAction } from "react";
import discussionMessageApi from "services/firebase/discussionMessageApi";
import useDiscussionState, {
  ACTION_DISCUSSION,
} from "./hooks/useDiscussionState";

interface props {
  discussionId: string | undefined;
  topic: string | undefined;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}
const Discussion = ({ discussionId, topic, setOpenMenu }: props) => {
  const { state, dispatch, refreshMessage } = useDiscussionState(
    discussionId,
    topic
  );
  const { isLogin, user } = useAuth();
  return (
    <>
      <div className="px-2 h-screen bg-slate-100 dark:bg-zinc-800 overflow-hidden">
        <DiscussionSection
          id={state.discussionId as string | undefined}
          commentId={state.messageIdToComment as string | undefined}
          topic={state.topic}
          todoMessage={state.messages}
          loading={state.messagesLoading}
          refreshMessage={refreshMessage}
          isLogin={isLogin}
          user={user}
          setOpenMenu={setOpenMenu}
          onClick_Comment={(messageId: string, isSelect: boolean) => {
            if (isSelect) {
              dispatch({
                type: ACTION_DISCUSSION.UnloadComment,
              });
            } else {
              dispatch({
                type: ACTION_DISCUSSION.SwitchMessageToComment,
                payload: { messageIdToComment: messageId },
              });
            }
          }}
          onClick_Like={(
            messageId: string,
            isLike: boolean | undefined,
            callBack?: () => void
          ) => {
            if (!user) return;
            if (!isLike) {
              // Add like or Change the dislike to like
              discussionMessageApi
                .likeMessage(
                  state.discussionId as string,
                  messageId,
                  user?.uid as string
                )
                .then(() => callBack && callBack());
            } else {
              // Remove like
              discussionMessageApi
                .deleteLikeAndDislike(
                  state.discussionId as string,
                  messageId,
                  user?.uid as string
                )
                .then(() => callBack && callBack());
            }
          }}
          onClick_Dislike={(
            messageId: string,
            isLike: boolean | undefined,
            callBack?: () => void
          ) => {
            if (!user) return;
            if (isLike || isLike === undefined) {
              // Add like or Change the like to dislike
              discussionMessageApi
                .dislikeMessage(
                  state.discussionId as string,
                  messageId,
                  user?.uid as string
                )
                .then(() => callBack && callBack());
            } else {
              // Remove dislike
              discussionMessageApi
                .deleteLikeAndDislike(
                  state.discussionId as string,
                  messageId,
                  user?.uid as string
                )
                .then(() => callBack && callBack());
            }
          }}
        />
      </div>
      <div className="pt-2 px-2 hidden lg:block bg-gray-150 dark:bg-zinc-900">
        <CommentSection
          discussionId={state.discussionId as string}
          messageId={state.messageIdToComment as string | undefined}
          refreshMessage={refreshMessage}
          onCloseDrawer={() => {
            dispatch({
              type: ACTION_DISCUSSION.UnloadComment,
            });
          }}
        />
      </div>
    </>
  );
};

export default Discussion;
