import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  writeBatch,
} from "firebase/firestore";
import {
  m_MessageComment,
  messageCommentConverter,
} from "models/m_MessageComment";
import { firestore } from "./firebase";

const messageCommentApi = {
  create: async (
    discussionId: string,
    messageId: string,
    comment: m_MessageComment
  ) => {
    if (discussionId === undefined) return;
    const batch = writeBatch(firestore);

    const commentRef = doc(
      collection(
        firestore,
        "discussions",
        discussionId,
        "messages",
        messageId,
        "comments"
      ).withConverter(messageCommentConverter)
    );
    batch.set(commentRef, comment);

    const messageRef = doc(
      firestore,
      "discussions",
      discussionId,
      "messages",
      messageId
    );
    batch.update(messageRef, { commentNo: increment(1) });

    return await batch.commit();
  },

  getComments: async (discussionId: string, messageId: string) => {
    const snapshot = collection(
      firestore,
      "discussions",
      discussionId,
      "messages",
      messageId,
      "comments"
    ).withConverter(messageCommentConverter);
    const q = query(snapshot, orderBy("createdAt", "asc"));
    const docs = await getDocs(q);
    const m: m_MessageComment[] = [];
    docs.forEach((doc) => m.push(doc.data() as m_MessageComment));
    return m;
  },
};

export default messageCommentApi;
