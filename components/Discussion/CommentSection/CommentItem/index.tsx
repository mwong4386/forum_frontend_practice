import { m_MessageComment } from "models/m_MessageComment";
import { fromNow } from "services/utils/date";

interface props {
  comment: m_MessageComment;
  onMessageClick?: () => void;
}
const CommentItem = ({ comment, onMessageClick }: props) => {
  return (
    <>
      <div
        className="py-2"
        onClick={() => {
          onMessageClick && onMessageClick();
        }}
      >
        <div className="flex flex-row justify-between">
          <div className="text-sm font-bold">
            {comment.createdByDisplayName}
          </div>
          <div className="text-sm">
            {fromNow(new Date(comment.createdAt as Date))}
          </div>
        </div>
        <div className="">{comment.message}</div>
      </div>
    </>
  );
};

export default CommentItem;
