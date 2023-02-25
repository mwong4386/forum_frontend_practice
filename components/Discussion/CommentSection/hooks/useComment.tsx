import { m_MessageComment } from "models/m_MessageComment";
import { useEffect, useState } from "react";
import messageCommentApi from "services/firebase/messageCommentApi";

const useComment = (
  discussionId: string | undefined,
  messageId: string | undefined
) => {
  const [comments, setComments] = useState<m_MessageComment[]>([]);
  const [loading, setLoading] = useState<boolean>(
    discussionId !== undefined && messageId !== undefined
  );
  useEffect(() => {
    if (discussionId === undefined || messageId === undefined) return;

    let unsubscribe: boolean = false;
    setLoading(true);
    messageCommentApi
      .getComments(discussionId, messageId)
      .then((data) => {
        if (unsubscribe) return;
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        if (unsubscribe) return;
        setLoading(false);
      });
    return () => {
      unsubscribe = true;
    };
  }, [discussionId, messageId]);

  const refresh = () => {
    if (discussionId === undefined || messageId === undefined) return;
    messageCommentApi
      .getComments(discussionId, messageId)
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return { comments, loading, refresh };
};

export default useComment;
