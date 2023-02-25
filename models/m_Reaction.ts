export class m_Reaction {
  constructor(
    public id: string | undefined,
    public isLike: boolean | undefined
  ) {}
}

export const messageReactionConverter = {
  toFirestore: function (m: m_Reaction) {
    const { id, ...rest } = m;
    return {
      ...rest,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new m_Reaction(snapshot.id, data.isLike);
  },
};
