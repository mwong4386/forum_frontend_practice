export class m_Discussion {
  constructor(
    public id: string | undefined,
    public url: string | null,
    public topic: string,
    public type: string = "discussion",
    public replyCount: number,
    public createdBy: string,
    public createdAt: Date,
    public createdByDisplayName: string,
    public lastReplyBy: string,
    public lastReplyAt: Date,
    public lastReplyByDisplayName: string,
    public tags: string[] = []
  ) {}
}
export function newNormalDiscussion(
  topic: string,
  createdBy: string,
  createdByDisplayName: string | null | undefined
): m_Discussion {
  const timestamp = new Date();
  return new m_Discussion(
    undefined,
    null,
    topic,
    "discussion",
    0,
    createdBy,
    timestamp,
    createdByDisplayName || "",
    createdBy,
    timestamp,
    createdByDisplayName || "",
    []
  );
}
export class m_Discussion_Redirect {
  constructor(
    public id: string | undefined,
    public url: string,
    public topic: string,
    public type: string = "redirect",
    public createdBy: string,
    public createdAt: Date,
    public createdByDisplayName: string,
    public tags: string[] = [],
    public redirectUrl: string
  ) {}
}

export const discussionConverter = {
  toFirestore: function (m: m_Discussion) {
    const { id, ...rest } = m;
    return {
      ...rest,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    if (data.type === "redirect") {
      return new m_Discussion_Redirect(
        snapshot.id,
        data.url,
        data.topic,
        data.type,
        data.createdBy,
        data.createdAt.toDate(),
        data.createdByDisplayName,
        data.tags ? data.tags : [],
        data.redirectUrl
      );
    }
    return new m_Discussion(
      snapshot.id,
      data.url,
      data.topic,
      data.type,
      data.replyCount,
      data.createdBy,
      data.createdAt.toDate(),
      data.createdByDisplayName,
      data.lastReplyBy,
      data.lastReplyAt.toDate(),
      data.lastReplyDisplayName,
      data.tags ? data.tags : []
    );
  },
};
