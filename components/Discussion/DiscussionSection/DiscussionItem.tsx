import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import IconButton from "@mui/material/IconButton";
import { sanitize } from "dompurify";
import { fromNow } from "services/utils/date";
import { m_DiscussionMessage } from "../../../models/m_DiscussionMessage";
import useLike from "./hooks/useLike";
interface props {
  message: m_DiscussionMessage;
  isSelect?: boolean;
  userId?: string;
  discussionId?: string;

  refreshMessage?: () => void;
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
}
const DiscussionItem = ({
  message,
  discussionId,
  userId,
  isSelect,

  refreshMessage,
  onClick_Comment,
  onClick_Like,
  onClick_Dislike,
}: props) => {
  const { isLike, refresh } = useLike(discussionId, message?.id, userId);

  return (
    <div className="flex flex-col py-2 gap-1">
      <div className="flex flex-row justify-between leading-7 gap-x-2">
        <div className="flex flex-row flex-wrap gap-x-2">
          <div className="truncate">{message.createdByDisplayName}</div>
          <div className="flex flex-row ">
            <div>
              <IconButton
                size="small"
                onClick={() => {
                  onClick_Like &&
                    onClick_Like(message.id as string, isLike, () => {
                      refresh();
                      refreshMessage && refreshMessage();
                    });
                }}
              >
                {!!isLike ? (
                  <ThumbUpIcon fontSize="small" />
                ) : (
                  <ThumbUpAltOutlinedIcon fontSize="small" />
                )}
              </IconButton>
              <span>{message.likeNo === 0 ? "" : message.likeNo}</span>
            </div>
            <div>
              <IconButton
                size="small"
                onClick={() => {
                  onClick_Dislike &&
                    onClick_Dislike(message.id as string, isLike, () => {
                      refresh();
                      refreshMessage && refreshMessage();
                    });
                }}
              >
                {isLike !== undefined && !isLike ? (
                  <ThumbDownIcon fontSize="small" />
                ) : (
                  <ThumbDownAltOutlinedIcon fontSize="small" />
                )}
              </IconButton>
              <span>{message.dislikeNo === 0 ? "" : message.dislikeNo}</span>
            </div>
            <div>
              <IconButton
                size="small"
                onClick={() => {
                  onClick_Comment &&
                    onClick_Comment(message.id as string, !!isSelect);
                }}
              >
                {isSelect ? (
                  <QuestionAnswerIcon fontSize="small" />
                ) : (
                  <QuestionAnswerOutlinedIcon fontSize="small" />
                )}
              </IconButton>
              <span>{message.commentNo === 0 ? "" : message.commentNo}</span>
            </div>
          </div>
        </div>
        <div className="min-w-fit">
          {fromNow(new Date(message.createdAt as Date))}
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitize(message.message),
        }}
      />
    </div>
  );
};

export default DiscussionItem;
