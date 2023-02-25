import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Board from "../../components/Board";
import { m_Discussion } from "../../models/m_Discussion";
import discussionApi from "../../services/firebase/discussionApi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (process.env.NODE_ENV === "production") return { notFound: true };
  // Fetch data from external API
  const data = await discussionApi.getDiscussionsByUrl("chrome://extensions/");

  // Pass data to the page via props
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
};

const Tag = ({ data }: { data: m_Discussion[] }) => {
  const router = useRouter();
  const { tag } = router.query;
  const title = typeof tag === "string" ? `${tag as string} - Glur` : "Glur";
  const [selectDiscussion, setSelectDiscussions] = useState<
    m_Discussion | undefined
  >(undefined);
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen w-full grid grid-cols-[300px_auto_300px] text-white">
        <Board tag={tag as string | undefined} discussions={data} />
      </main>
    </>
  );
};

export default Tag;
