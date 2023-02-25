import { formatDistanceToNow } from "date-fns";

export const fromNow = (timestamp: Date) => {
  return formatDistanceToNow(timestamp, { addSuffix: true });
};
