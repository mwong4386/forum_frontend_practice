import { ACTION_DISCUSSION } from "components/Discussion/hooks/useDiscussionState";
import { useEffect } from "react";
import discussionMessageApi from "../../../services/firebase/discussionMessageApi";

const useGetMessages = (
  discussionId: string | undefined,
  dispatch: (value: any) => void
) => {
  useEffect(() => {
    if (!discussionId) return;
    let unsubscribe: boolean = false;
    discussionMessageApi
      .getMessages(discussionId)
      .then((messages) => {
        if (unsubscribe) return;
        dispatch({
          type: ACTION_DISCUSSION.LoadMessages,
          payload: { messages },
        });
      })
      .catch((err: any) => {
        if (unsubscribe) return;
        console.log(err.message);
        dispatch({
          type: ACTION_DISCUSSION.UpdateMessageLoading,
          payload: { loading: false },
        });
      });
    return () => {
      unsubscribe = true;
    };
  }, [discussionId]);

  const refresh = () => {
    if (!discussionId) return;
    discussionMessageApi
      .getMessages(discussionId)
      .then((messages) => {
        dispatch({
          type: ACTION_DISCUSSION.LoadMessages,
          payload: { messages },
        });
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  };

  return { refresh };
};

export default useGetMessages;
