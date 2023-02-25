import { useEffect } from "react";
import discussionApi from "services/firebase/discussionApi";
import { ACTION_DISCUSSION } from "./useDiscussionState";

const useGetTopic = (
  discussionId: string | undefined,
  default_topic: string | undefined,
  dispatch: (value: any) => void
) => {
  useEffect(() => {
    if (default_topic !== undefined) {
      dispatch({
        type: ACTION_DISCUSSION.UpdateTopic,
        payload: { topic: default_topic },
      });
    }
    if (discussionId === undefined) return;
    let unsubscribe: boolean = false;
    discussionApi
      .getDiscussionsById(discussionId)
      .then((messages) => {
        if (unsubscribe) return;
        dispatch({
          type: ACTION_DISCUSSION.UpdateTopic,
          payload: { topic: messages?.topic },
        });
      })
      .catch((err: any) => {
        if (unsubscribe) return;
        console.log(err.message);
      });
    return () => {
      unsubscribe = true;
    };
  }, [discussionId, default_topic]);

  return {};
};

export default useGetTopic;
