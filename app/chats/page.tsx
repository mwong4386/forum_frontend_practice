import Head from "next/head";
import { notFound } from "next/navigation";

const Chats = ({}: {}) => {
  if (process.env.NODE_ENV === "production") return notFound();
  return (
    <>
      <Head>
        <title>Chat - Glur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        Under construction and Evaluation: 1. mui cannot do ssr 2. use hook
        cannot use directly in app, need to put use client directive on top of
        file
      </div>
    </>
  );
};

export default Chats;
