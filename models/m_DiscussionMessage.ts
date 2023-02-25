import { serverTimestamp } from "firebase/firestore";

export const newDiscussionMessage = (
  message: string,
  createdBy: string,
  createdByDisplayName: string | null | undefined
) => {
  return new m_DiscussionMessage(
    undefined,
    message,
    createdBy,
    undefined,
    createdByDisplayName || ""
  );
};

export class m_DiscussionMessage {
  constructor(
    public id: string | undefined,
    public message: string,
    public createdBy: string | null = null,
    public createdAt: Date | undefined,
    public createdByDisplayName: string,
    public commentNo: number = 0,
    public likeNo: number = 0,
    public dislikeNo: number = 0
  ) {}
}

export const discussionMessageConverter = {
  toFirestore: function (m: m_DiscussionMessage) {
    const { id, createdAt, ...rest } = m;
    return {
      createdAt: createdAt === undefined ? serverTimestamp() : createdAt,
      ...rest,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new m_DiscussionMessage(
      snapshot.id,
      data.message,
      data.createdBy,
      data.createdAt.toDate(),
      data.createdByDisplayName,
      data.commentNo,
      data.likeNo,
      data.dislikeNo
    );
  },
};
