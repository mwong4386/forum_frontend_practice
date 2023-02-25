import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
const useNProgress = () => {
  const { events } = useRouter();
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    const routeChangeStart = () => {
      NProgress.start();
    };
    const routeChangeComplete = () => {
      NProgress.done(false);
    };
    const routeChangeError = () => {
      NProgress.done(false);
    };

    events.on("routeChangeStart", routeChangeStart);
    events.on("routeChangeComplete", routeChangeComplete);
    events.on("routeChangeError", routeChangeError);

    return () => {
      events.off("routeChangeStart", routeChangeStart);
      events.off("routeChangeComplete", routeChangeComplete);
      events.off("routeChangeError", routeChangeError);
    };
  }, []);
};

export default useNProgress;
