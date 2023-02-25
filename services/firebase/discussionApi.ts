import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  discussionConverter,
  m_Discussion,
  m_Discussion_Redirect,
} from "../../models/m_Discussion";
import {
  discussionMessageConverter,
  m_DiscussionMessage,
} from "../../models/m_DiscussionMessage";
import { firestore } from "./firebase";

const discussionApi = {
  createWithMessage: async (
    discussion: m_Discussion,
    message: m_DiscussionMessage
  ) => {
    const batch = writeBatch(firestore);

    const ref = doc(
      collection(firestore, "discussions").withConverter(discussionConverter)
    );
    batch.set(ref, discussion);
    const discussionId = ref.id;
    const messagesRef = collection(
      firestore,
      "discussions",
      discussionId,
      "messages"
    ).withConverter(discussionMessageConverter);

    batch.set(doc(messagesRef), message);
    return await batch.commit();
  },

  create: async (message: m_Discussion_Redirect) => {
    const ref = collection(firestore, "discussions").withConverter(
      discussionConverter
    );

    return await addDoc(ref, message);
  },

  getDiscussions: async () => {
    const snapshot = collection(firestore, "discussions").withConverter(
      discussionConverter
    );
    const q = query(snapshot, orderBy("createdAt", "desc"));
    const docs = await getDocs(q);
    const m: m_Discussion[] = [];
    docs.forEach((doc) => m.push(doc.data() as m_Discussion));
    return m;
  },
  getDiscussionsById: async (id: string) => {
    const q = doc(firestore, "discussions", id).withConverter(
      discussionConverter
    );
    const docSnap = await getDoc(q);
    return docSnap.data();
  },

  getDiscussionsByUrl: async (url: string) => {
    const snapshot = collection(firestore, "discussions").withConverter(
      discussionConverter
    );
    const q = query(
      snapshot,
      where("url", "==", url),
      orderBy("createdAt", "desc")
    );
    const docs = await getDocs(q);
    const m: m_Discussion[] = [];
    docs.forEach((doc) => m.push(doc.data() as m_Discussion));
    return m;
  },

  getDiscussionByTags: async (tags: string[]) => {
    if (tags.length === 0) return;
    if (tags.length > 10) tags = tags.slice(0, 10);
    const snapshot = collection(firestore, "discussions").withConverter(
      discussionConverter
    );
    const q = query(
      snapshot,
      where("tags", "array-contains-any", tags),
      orderBy("createdAt", "desc")
    );
    const docs = await getDocs(q);
    const m: m_Discussion[] = [];
    docs.forEach((doc) => m.push(doc.data() as m_Discussion));
    return m;
  },

  subscribeDiscussions: (
    url: string,
    callback: (messages: m_Discussion[]) => void
  ) => {
    const snapshot = collection(firestore, "discussions").withConverter(
      discussionConverter
    );
    const q = query(
      snapshot,
      where("url", "==", url),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const m: m_Discussion[] = [];
      querySnapshot.forEach((doc) => m.push(doc.data() as m_Discussion));
      callback(m);
    });
    return unsubscribe;
  },
};

export default discussionApi;
