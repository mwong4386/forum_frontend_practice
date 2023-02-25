import { HistoryContext } from "contexts/historyContext";
import { useContext } from "react";

export const useHistoryContext = () => {
  return useContext(HistoryContext);
};
