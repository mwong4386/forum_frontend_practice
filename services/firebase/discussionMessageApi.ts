import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  setDoc,
  where,
} from "firebase/firestore";
import { messageReactionConverter } from "models/m_Reaction";
import {
  discussionMessageConverter,
  m_DiscussionMessage,
} from "../../models/m_DiscussionMessage";
import { firestore } from "./firebase";

const discussionMessageApi = {
  create: async (
    discussionId: string | undefined,
    message: m_DiscussionMessage
  ) => {
    if (discussionId === undefined) return;
    const snapshot = collection(
      firestore,
      "discussions",
      discussionId,
      "messages"
    ).withConverter(discussionMessageConverter);
    return await addDoc(snapshot, message);
  },

  getMessages: async (discussionId: string) => {
    const snapshot = collection(
      firestore,
      "discussions",
      discussionId,
      "messages"
    ).withConverter(discussionMessageConverter);
    const q = query(snapshot, orderBy("createdAt", "asc"));
    const docs = await getDocs(q);
    const m: m_DiscussionMessage[] = [];
    docs.forEach((doc) => m.push(doc.data() as m_DiscussionMessage));
    return m;
  },

  getMessageEmotions: async (
    discussionId: string,
    messageId: string,
    userId: string
  ) => {
    const query = doc(
      firestore,
      "discussions",
      discussionId,
      "messages",
      messageId,
      "emotions",
      userId
    ).withConverter(messageReactionConverter);
    const docSnap = await getDoc(query);
    return docSnap.data();
  },

  likeMessage: async (
    discussionId: string,
    messageId: string,
    userId: string
  ) => {
    const emotionRef = doc(
      firestore,
      "discussions",
      discussionId,
      "messages",
      messageId,
      "emotions",
      userId
    );
    await setDoc(emotionRef, { isLike: true }, { merge: true });

    //TODO: move this to a firebase function
    await discussionMessageApi.updateCount(discussionId, messageId);
  },

  dislikeMessage: async (
    discussionId: string,
    messageId: string,
    userId: string
  ) => {
    const emotionRef = doc(
      firestore,
      "discussions",
      discussionId,
      "messages",
      messageId,
      "emotions",
      userId
    );
    await setDoc(emotionRef, { isLike: false }, { merge: true });

    //TODO: move this to a firebase function
    await discussionMessageApi.updateCount(discussionId, messageId);
  },

  deleteLikeAndDislike: async (
    discussionId: string,
    messageId: string,
    userId: string
  ) => {
    const emotionRef = doc(
      firestore,
      "discussions",
      discussionId,
      "messages",
      messageId,
      "emotions",
      userId
    );
    await deleteDoc(emotionRef);
    await discussionMessageApi.updateCount(discussionId, messageId);
  },
  updateCount: async (discussionId: string, messageId: string) => {
    const messageRef = doc(
      firestore,
      "discussions",
      discussionId,
      "messages",
      messageId
    );
    const emotionCollection = collection(
      firestore,
      "discussions",
      discussionId,
      "messages",
      messageId,
      "emotions"
    );
    await runTransaction(firestore, async (transaction) => {
      const messageDoc = await transaction.get(messageRef);
      if (!messageDoc.exists()) {
        throw "Message does not exist";
      }
      const likeQuery = query(emotionCollection, where("isLike", "==", true));
      const dislikeQuery = query(
        emotionCollection,
        where("isLike", "==", false)
      );
      const likeSnapshot = await getCountFromServer(likeQuery);
      const dislikeSnapshot = await getCountFromServer(dislikeQuery);
      transaction.update(messageRef, {
        likeNo: likeSnapshot.data().count,
        dislikeNo: dislikeSnapshot.data().count,
      });
    });
  },
};

export default discussionMessageApi;
