import { useEffect, useReducer } from "react";
import useGetMessages from "./useGetMessages";
import useGetTopic from "./useGetTopic";

export const ACTION_DISCUSSION = {
  SwitchDiscussion: "SwitchDiscussion",
  LoadMessages: "LoadMessages",
  UpdateMessageLoading: "UpdateMessageLoading",
  SwitchMessageToComment: "SwitchMessageToComment",
  UnloadComment: "UnloadComment",
  UpdateTopic: "UpdateTopic",
};
// export interface DiscussionState {
//   discussionId: string|undefined,
//   messages: m_DiscussionMessage[],
//   messageIdToComment: string | undefined,
//   topic: string | undefined,
// }
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_DISCUSSION.UnloadComment:
      return {
        ...state,
        messageIdToComment: undefined,
      };
    case ACTION_DISCUSSION.SwitchDiscussion:
      return {
        ...state,
        discussionId: action.payload.discussionId,
        messageIdToComment: undefined,
        messages: [],
        messagesLoading: action.payload.discussionId !== undefined,
      };
    case ACTION_DISCUSSION.LoadMessages:
      return {
        ...state,
        messages: action.payload.messages,
        messagesLoading: false,
        messageIDToComment: undefined,
      };
    case ACTION_DISCUSSION.SwitchMessageToComment:
      return {
        ...state,
        messageIdToComment: action.payload.messageIdToComment,
      };
    case ACTION_DISCUSSION.UpdateTopic:
      return {
        ...state,
        topic: action.payload.topic,
      };
    case ACTION_DISCUSSION.UpdateMessageLoading:
      return {
        ...state,
        messagesLoading: action.payload.loading,
      };
    default:
      return state;
  }
};

const useDiscussionState = (
  discussionId: string | undefined,
  topic: string | undefined
) => {
  const [state, dispatch] = useReducer(reducer, {
    discussionId: discussionId,
    topic: topic,
    messages: [],
    messagesLoading: discussionId !== undefined,
    messageIdToComment: undefined,
  });
  useGetTopic(discussionId, topic, dispatch);
  const { refresh: refreshMessage } = useGetMessages(discussionId, dispatch);
  useEffect(() => {
    dispatch({
      type: ACTION_DISCUSSION.SwitchDiscussion,
      payload: { discussionId: discussionId },
    });
  }, [discussionId]);

  return { state, dispatch, refreshMessage };
};

export default useDiscussionState;
