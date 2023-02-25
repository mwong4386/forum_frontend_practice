import { useRouter } from "next/router";
import { m_Discussion } from "../../models/m_Discussion";
import { fromNow } from "../../services/utils/date";

interface Props {
  data: m_Discussion;
}

const BoardItem = ({ data }: Props) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col cursor-pointer"
      onClick={() =>
        router.push(
          {
            pathname: `/discussions/${data.id}`,
            query: { topic: data.topic },
          },
          `/discussions/${data.id}`, //not show query in url
          { shallow: true }
        )
      }
    >
      <div className="flex justify-between items-end">
        <div className="text-sm font-bold">{data.createdByDisplayName}</div>
        <div className="text-sm">{fromNow(new Date(data.lastReplyAt))}</div>
      </div>
      <div className="flex justify-between">{data.topic}</div>
    </div>
  );
};

export default BoardItem;
