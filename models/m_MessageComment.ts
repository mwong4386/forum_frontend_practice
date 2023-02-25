import { serverTimestamp } from "firebase/firestore";

export const newMessageComment = (
  message: string,
  createdBy: string,
  createdByDisplayName: string | null | undefined
) => {
  return new m_MessageComment(
    undefined,
    message,
    createdBy ?? null,
    undefined,
    createdByDisplayName ?? null
  );
};

export class m_MessageComment {
  constructor(
    public id: string | undefined = undefined,
    public message: string,
    public createdBy: string | null = null,
    public createdAt: Date | undefined,
    public createdByDisplayName: string | null
  ) {}
}

export const messageCommentConverter = {
  toFirestore: function (m: m_MessageComment) {
    const { id, createdAt, ...rest } = m;
    return {
      createdAt: createdAt === undefined ? serverTimestamp() : createdAt,
      ...rest,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new m_MessageComment(
      snapshot.id,
      data.message,
      data.createdBy,
      data.createdAt.toDate(),
      data.createdByDisplayName
    );
  },
};
