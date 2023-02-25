import { useEffect, useState } from "react";
import discussionMessageApi from "services/firebase/discussionMessageApi";

const useLike = (
  discussionId: string | undefined,
  messageId: string | undefined,
  userId: string | undefined
) => {
  const [isLike, setIsLike] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (
      discussionId === undefined ||
      messageId === undefined ||
      userId === undefined
    )
      return;
    let unsubscribe: boolean = false;
    discussionMessageApi
      .getMessageEmotions(discussionId, messageId, userId)
      .then((emotion) => {
        if (unsubscribe) return;
        setIsLike(emotion?.isLike);
        setLoading(false);
      })
      .catch((err: any) => {
        if (unsubscribe) return;
        console.log(err.message);
        setLoading(false);
      });
    return () => {
      unsubscribe = true;
      setIsLike(undefined);
    };
  }, [discussionId, messageId, userId]);

  const refresh = () => {
    if (!discussionId) return;
    if (!messageId) return;
    if (!userId) return;
    discussionMessageApi
      .getMessageEmotions(discussionId, messageId, userId)
      .then((emotion) => {
        setIsLike(emotion?.isLike);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  return { isLike, loading, refresh };
};

export default useLike;
