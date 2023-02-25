import { Skeleton } from "@mui/material";
import useAuth from "hooks/useAuthContext";
import useScreenQuery from "hooks/useScreenQuery";
import { newMessageComment } from "models/m_MessageComment";
import messageCommentApi from "services/firebase/messageCommentApi";
import CommentDrawer from "./CommentDrawer";
import CommentItem from "./CommentItem";
import MultilineInput from "./MultilineInput";
import useComment from "./hooks/useComment";
interface props {
  discussionId?: string | undefined;
  messageId?: string | undefined;
  refreshMessage: () => void;
  onCloseDrawer?: () => void;
}

const CommentSection = ({
  discussionId,
  messageId,
  refreshMessage,
  onCloseDrawer,
}: props) => {
  const { loading, comments, refresh } = useComment(discussionId, messageId);
  const { isLogin, user } = useAuth();
  const { isSmallScreen } = useScreenQuery();

  const content =
    messageId !== undefined && discussionId !== undefined ? (
      <>
        {loading && (
          <div>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
        )}
        <div className="h-full flex flex-col overflow-hidden">
          <div className="overflow-y-auto flex-1">
            {!loading &&
              comments.map((comment) => {
                return <CommentItem key={comment.id} comment={comment} />;
              })}
          </div>
          <MultilineInput
            onSubmit={(message: string) => {
              if (messageId === undefined || discussionId === undefined) return;
              if (!user) return;
              messageCommentApi
                .create(
                  discussionId,
                  messageId,
                  newMessageComment(message, user.uid, user.displayName)
                )
                .then(() => {
                  refresh();
                  refreshMessage();
                });
            }}
            disabled={!isLogin}
          />
        </div>
      </>
    ) : (
      <></>
    );

  if (isSmallScreen) {
    return (
      <CommentDrawer open={messageId !== undefined} onClose={onCloseDrawer}>
        {content}
      </CommentDrawer>
    );
  }
  return content;
};

export default CommentSection;
