import { useRouter } from "next/router";
import { ReactNode, createContext, useEffect, useState } from "react";

interface HistoryContextType {
  peek: () => string | undefined;
  back: () => void;
}

export const HistoryContext = createContext<HistoryContextType>({
  peek: () => undefined,
  back: () => {},
});

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<string[]>([]);
  // it is not the same as the history of browser, as the user can directly go to the page by typing the url, refreshing browser etc.
  // it serve as a helper to hide the back button when it is empty
  const { asPath, back: routerBack, beforePopState } = useRouter();
  const push = (path: string) => {
    setHistory((prev) => [...prev, path]);
  };
  const pop2stack = () => {
    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop();
      newHistory.pop();
      return newHistory;
    });
  };
  const peek = () => {
    return history[history.length - 2];
  };

  const back = () => {
    routerBack();
  };

  useEffect(() => {
    // beforePopState only trigger when back to react page
    beforePopState(({ url, as, options, ...rest }) => {
      pop2stack();
      return true;
    });
  }, []);

  useEffect(() => {
    push(asPath);
  }, [asPath]);

  return (
    <HistoryContext.Provider
      value={{
        peek,
        back,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
